from fastapi import APIRouter, HTTPException, Depends, Response, Cookie
from app.db.database import get_db
from app.models.property import Property
from app.routes.auth import get_current_user
from app.utils.image_utils import delete_images_by_property
import json

import os
from dotenv import load_dotenv
from pathlib import Path
from psycopg2.extras import RealDictCursor
import psycopg2

env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(env_path)


router = APIRouter(prefix="/property", tags=["Property"])

PROJECT_ENV = os.environ.get("PROJECT_ENV", "development")
print(f'PROJECT ENV: {PROJECT_ENV}')

def get_pg_db():
    return psycopg2.connect(
        os.environ["POSTGRES_URL"],
        cursor_factory=RealDictCursor
    )

def deep_merge(original, patch):
    for key, value in patch.items():
        if (
            key in original
            and isinstance(value, dict)
        ):
            deep_merge(original[key], value)
        else:
            original[key] = value
    return original

@router.get("/all")
def all_properties(current_user = Depends(get_current_user)):
    print(f'PROJECT ENV: {PROJECT_ENV}')
    if PROJECT_ENV == 'production':
        conn = get_pg_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM property WHERE owner_id=%s",
            (current_user["id"],)
        )
        properties = cursor.fetchall()
        conn.close()

        if not properties:
            raise HTTPException(status_code=404, detail="User properties not found")

        result = []
        for row in properties:
            p = dict(row)
            if p.get("details"):
                try:
                    p["details"] = json.loads(p["details"])
                except Exception:
                    pass
            result.append(p)

        return {"properties": result}
    else:
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM property WHERE owner_id=?",
            (current_user["id"],)
        )
        properties = cursor.fetchall()
        conn.close()

        if not properties:
            raise HTTPException(status_code=404, detail="User properties not found")

        result = []
        for row in properties:
            p = dict(row)
            if p.get("details"):
                try:
                    p["details"] = json.loads(p["details"])
                except Exception:
                    pass
            result.append(p)

        return {"properties": result}

@router.get("/{id}")
def get_property_by_id(id: int, current_user = Depends(get_current_user)):
    if PROJECT_ENV == 'production':
        conn = get_pg_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM property WHERE id=%s", (id,))
        curr_prop = cursor.fetchone()
        conn.close()

        if not curr_prop:
            raise HTTPException(status_code=404, detail=f"Property with ID {id} not found")
        
        if curr_prop["owner_id"] != current_user["id"]:
            raise HTTPException(status_code=403, detail="You do not have permission to access this property")
        
        prop = dict(curr_prop)
        if prop.get("details"):
            try:
                prop["details"] = json.loads(prop["details"])
            except Exception:
                pass

        return {"property": prop}
    else:
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM property WHERE id=?", (id,))
        curr_prop = cursor.fetchone()
        conn.close()

        if not curr_prop:
            raise HTTPException(status_code=404, detail=f"Property with ID {id} not found")
        
        if curr_prop["owner_id"] != current_user["id"]:
            raise HTTPException(status_code=403, detail="You do not have permission to access this property")
        
        prop = dict(curr_prop)
        if prop.get("details"):
            try:
                prop["details"] = json.loads(prop["details"])
            except Exception:
                pass

        return {"property": prop}

@router.post("/add")
def add_property(property: Property, current_user = Depends(get_current_user)):
    if PROJECT_ENV == 'production':
        conn = get_pg_db()
        cursor = conn.cursor()

        try:
            owner_id = current_user["id"]

            details = None
            if getattr(property, "details", None) is not None:
                details = json.dumps(property.details)

            cursor.execute(
                """
                INSERT INTO property
                (name, address, city, state, country, zip, bedroom_size, bathroom_size, owner_id, details)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    property.name,
                    property.address,
                    property.city,
                    property.state,
                    property.country,
                    property.zip,
                    property.bedrooms,
                    property.bathrooms,
                    owner_id,
                    details
                )
            )

            property_id = cursor.lastrowid
            conn.commit()

            cursor.execute(
                """
                SELECT
                    id,
                    name,
                    address,
                    city,
                    state,
                    zip,
                    bedroom_size,
                    bathroom_size,
                    owner_id,
                    details
                FROM property
                WHERE id = %s
                """,
                (property_id,)
            )

            row = cursor.fetchone()

            if not row:
                raise HTTPException(status_code=404, detail="Property not found")

            # build response and deserialize details if present
            property_dict = {
                "id": row[0],
                "name": row[1],
                "address": row[2],
                "city": row[3],
                "state": row[4],
                "zip": row[5],
                "bedrooms": row[6],
                "bathrooms": row[7],
                "owner_id": row[8],
                "details": None
            }

            if row[9]:
                try:
                    property_dict["details"] = json.loads(row[9])
                except Exception:
                    property_dict["details"] = row[9]

            return property_dict

        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

        finally:
            conn.close()
    else:
        conn = get_db()
        cursor = conn.cursor()

        try:
            owner_id = current_user["id"]

            # serialize details if provided else store None
            details = None
            if getattr(property, "details", None) is not None:
                details = json.dumps(property.details)

            cursor.execute(
                """
                INSERT INTO property
                (name, address, city, state, country, zip, bedroom_size, bathroom_size, owner_id, details)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    property.name,
                    property.address,
                    property.city,
                    property.state,
                    property.country,
                    property.zip,
                    property.bedrooms,
                    property.bathrooms,
                    owner_id,
                    details
                )
            )

            property_id = cursor.lastrowid
            conn.commit()

            cursor.execute(
                """
                SELECT
                    id,
                    name,
                    address,
                    city,
                    state,
                    zip,
                    bedroom_size,
                    bathroom_size,
                    owner_id,
                    details
                FROM property
                WHERE id = ?
                """,
                (property_id,)
            )

            row = cursor.fetchone()

            if not row:
                raise HTTPException(status_code=404, detail="Property not found")

            # build response and deserialize details if present
            property_dict = {
                "id": row[0],
                "name": row[1],
                "address": row[2],
                "city": row[3],
                "state": row[4],
                "zip": row[5],
                "bedrooms": row[6],
                "bathrooms": row[7],
                "owner_id": row[8],
                "details": None
            }

            if row[9]:
                try:
                    property_dict["details"] = json.loads(row[9])
                except Exception:
                    property_dict["details"] = row[9]

            return property_dict

        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

        finally:
            conn.close()

@router.patch("/edit/{id}")
def edit_property(id: int, property: Property, current_user = Depends(get_current_user)):
    if PROJECT_ENV == 'production':
        conn = get_pg_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM property WHERE id=%s",
            (id,)
        )
        curr_prop = cursor.fetchone()

        if not curr_prop:
            conn.close()
            raise HTTPException(
                status_code=404,
                detail=f"Property with ID {id} not found"
            )
        
        if curr_prop["owner_id"] != current_user["id"]:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to access this property"
            )

        cursor.execute(
            """
            UPDATE property
            SET name=%s, address=%s, city=%s, state=%s, zip=%s, bedroom_size=%s, bathroom_size=%s
            WHERE id=%s
            """,
            (
                property.name,
                property.address,
                property.city,
                property.state,
                property.zip,
                property.bedrooms,
                property.bathrooms,
                id,
            )
        )

        conn.commit()
        conn.close()

        return {"message": "Property edited successfully"}
    else:
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM property WHERE id=?",
            (id,)
        )
        curr_prop = cursor.fetchone()

        if not curr_prop:
            conn.close()
            raise HTTPException(
                status_code=404,
                detail=f"Property with ID {id} not found"
            )
        
        if curr_prop["owner_id"] != current_user["id"]:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to access this property"
            )

        cursor.execute(
            """
            UPDATE property
            SET name=?, address=?, city=?, state=?, zip=?, bedroom_size=?, bathroom_size=?
            WHERE id=?
            """,
            (
                property.name,
                property.address,
                property.city,
                property.state,
                property.zip,
                property.bedrooms,
                property.bathrooms,
                id,
            )
        )

        conn.commit()
        conn.close()

        return {"message": "Property edited successfully"}

@router.delete("/{property_id}")
def delete_property(property_id: int, current_user = Depends(get_current_user)):
    if PROJECT_ENV == 'production':
        conn = get_pg_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM property WHERE id=%s",
            (property_id,)
        )
        curr_prop = cursor.fetchone()

        if not curr_prop:
            conn.close()
            raise HTTPException(
                status_code=404,
                detail=f"Property with ID {property_id} not found"
            )
        
        if curr_prop["owner_id"] != current_user["id"]:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to access this property"
            )

        try:
            cursor.execute(
                "DELETE FROM property WHERE id=?",
                (property_id,)
            )

            delete_images_by_property(property_id)
            
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))


        conn.commit()
        conn.close()

        return {"message": "Property deleted"}
    else:
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM property WHERE id=?",
            (property_id,)
        )
        curr_prop = cursor.fetchone()

        if not curr_prop:
            conn.close()
            raise HTTPException(
                status_code=404,
                detail=f"Property with ID {property_id} not found"
            )
        
        if curr_prop["owner_id"] != current_user["id"]:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to access this property"
            )

        try:
            cursor.execute(
                "DELETE FROM property WHERE id=?",
                (property_id,)
            )

            delete_images_by_property(property_id)
            
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))


        conn.commit()
        conn.close()

        return {"message": "Property deleted"}

@router.patch("/details/{id}")
def update_property_details(id: int, details: dict, current_user = Depends(get_current_user)):
    if PROJECT_ENV == 'production':
        conn = get_pg_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM property WHERE id=%s",
            (id,)
        )
        curr_prop = cursor.fetchone()

        if curr_prop["owner_id"] != current_user["id"]:
            print(f'Curr_prop:{curr_prop["owner_id"]} User_Id:{current_user["id"]}')
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to add advanced details to this property"
            )

        try:
            # merged = deep_merge(curr_prop, details)
            cursor.execute(
                """
                UPDATE property
                SET details = %s::jsonb
                WHERE id = %s
                """,
                (json.dumps(details), id)
                # (json.dumps(merged), id)
            )

            conn.commit()
        except Exception as e:
            conn.rollback()
            raise HTTPException(status_code=400, detail=f"Error occured: {str(e)}")
            # conn.rollback - Revert all changes in this trasaction to its last committed state
        finally:
            conn.close()
        
        return {"message": "Extra property details successfully added"}
    else:
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM property WHERE id=?",
            (id,)
        )
        curr_prop = cursor.fetchone()

        if curr_prop["owner_id"] != current_user["id"]:
            print(f'Curr_prop:{curr_prop["owner_id"]} User_Id:{current_user["id"]}')
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to add advanced details to this property"
            )

        try:
            cursor.execute(
                """
                UPDATE property
                SET details = json_patch(
                    COALESCE(details, '{}'),
                    ?
                )
                WHERE id = ?
                """,
                (json.dumps(details), id)
                # COALESCE - If details exist, use it else use {}
                # json_patch(existing, new)
                # json.dumps(details) - Converts it into a JSON string
            )

            conn.commit()
        except Exception as e:
            conn.rollback()
            raise HTTPException(status_code=400, detail=f"Error occured: {str(e)}")
            # conn.rollback - Revert all changes in this trasaction to its last committed state
        finally:
            conn.close()
        
        return {"message": "Extra property details successfully added"}