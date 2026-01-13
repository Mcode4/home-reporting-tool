from fastapi import APIRouter, HTTPException
from app.db.database import get_db
from app.models.property import Property
import json

router = APIRouter(prefix="/property", tags=["Property"])

@router.get("/all/{user_id}")
def all_properties(user_id: int):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM property WHERE user_id=?",
        (user_id,)
    )
    properties = cursor.fetchall()
    conn.close()

    if not properties:
        raise HTTPException(status_code=404, detail="User properties not found")

    return {
        "properties": [dict(row) for row in properties]
    }

@router.get("/{id}")
def get_property_by_id(id: int):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM property WHERE id=?",
        (id,)
    )
    curr_prop = cursor.fetchone()
    conn.close()

    if not curr_prop:
        raise HTTPException(
            status_code=404,
            detail=f"Property with ID {id} not found"
        )

    return {"property": dict(curr_prop)}

@router.post("/add")
def add_property(property: Property):
    conn = get_db()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO property
            (name, address, city, state, zip, bedroom_size, bathroom_size, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                property.name,
                property.address,
                property.city,
                property.state,
                property.zip,
                property.bedrooms,
                property.bathrooms,
                property.user_id,
            )
        )
        conn.commit()

    except Exception:
        raise HTTPException(status_code=400, detail="Property could not be created")

    finally:
        conn.close()

    return {"message": "Property created successfully"}

@router.patch("/edit/{id}")
def edit_property(id: int, property: Property):
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

@router.delete("/{id}")
def delete_property(id: int):
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

    cursor.execute(
        "DELETE FROM property WHERE id=?",
        (id,)
    )

    conn.commit()
    conn.close()

    return {"message": "Property deleted successfully"}

@router.patch("/details/{id}")
def update_property_details(id: int, details: dict):
    conn = get_db()
    cursor = conn.cursor()

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