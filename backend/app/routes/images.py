import os
import uuid
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.routes.auth import get_current_user
from app.db.database import get_db
from fastapi.responses import FileResponse
from app.utils.image_utils import delete_image_by_id, delete_images_by_property
from dotenv import load_dotenv
from pathlib import Path

import os
from psycopg2.extras import RealDictCursor
import psycopg2

env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(env_path)

UPLOAD_ROOT = "app/uploads/properties"

router = APIRouter(prefix="/images", tags=["Images"])

PROJECT_ENV = os.environ.get("PROJECT_ENV", "development")

def get_pg_db():
    return psycopg2.connect(
        os.environ["POSTGRES_URL"],
        cursor_factory=RealDictCursor
    )

@router.post("/upload/{property_id}")
def upload_property_image(
    property_id: int,
    file: UploadFile = File(...),
    current_user: int = Depends(get_current_user)
):
    if PROJECT_ENV == "production":
        # Validate user
        conn = get_pg_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM property WHERE id=%s", (property_id,)
        )
        curr_prop = cursor.fetchone()

        if curr_prop["owner_id"] != current_user["id"]:
            print(f'Current Property:{curr_prop} User ID:{current_user["id"]}')
            raise HTTPException(status_code=401, detail="User not authorized to add image to property")


        # Validate file type
        if file.content_type not in {"image/jpeg", "image/png", "image/webp, image/jpg"}:
            raise HTTPException(status_code=400, detail="Invalid image type")
        
        # Secure folder per property
        property_dir = os.path.join(UPLOAD_ROOT, str(property_id))
        os.makedirs(property_dir, exist_ok=True)
        
        # Safe unique filename
        ext = os.path.splitext(file.filename)[1]
        filename = f"{uuid.uuid4()}{ext}"
        filepath = os.path.join(property_dir, filename)

        # Save file to disk
        with open(filepath, "wb") as f:
            f.write(file.file.read())

        # Save metadata to DB
        cursor.execute(
            """
            INSERT INTO images (property_id, default_filename, filename, filepath, content_type, size)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (
                property_id,
                f'{file.filename}',
                filename,
                filepath,
                file.content_type,
                os.path.getsize(filepath),
            ),
        )
        conn.commit()
        image_id = cursor.lastrowid
        conn.close()

        return {
            "id": image_id,
            "property_id": property_id,
            "filename": filename
        }
    else:
        # Validate user
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM property WHERE id=?", (property_id,)
        )
        curr_prop = cursor.fetchone()

        if curr_prop["owner_id"] != current_user["id"]:
            print(f'Current Property:{curr_prop} User ID:{current_user["id"]}')
            raise HTTPException(status_code=401, detail="User not authorized to add image to property")


        # Validate file type
        if file.content_type not in {"image/jpeg", "image/png", "image/webp, image/jpg"}:
            raise HTTPException(status_code=400, detail="Invalid image type")
        
        # Secure folder per property
        property_dir = os.path.join(UPLOAD_ROOT, str(property_id))
        os.makedirs(property_dir, exist_ok=True)
        
        # Safe unique filename
        ext = os.path.splitext(file.filename)[1]
        print(f'default filename: {file.filename}')
        filename = f"{uuid.uuid4()}{ext}"
        filepath = os.path.join(property_dir, filename)

        # Save file to disk
        with open(filepath, "wb") as f:
            f.write(file.file.read())

        # Save metadata to DB
        cursor.execute(
            """
            INSERT INTO images (property_id, default_filename, filename, filepath, content_type, size)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                property_id,
                f'{file.filename}',
                filename,
                filepath,
                file.content_type,
                os.path.getsize(filepath),
            ),
        )
        conn.commit()
        image_id = cursor.lastrowid
        conn.close()

        return {
            "id": image_id,
            "property_id": property_id,
            "filename": filename
        }


@router.get("/{id}")
def get_image_by_id(
    id: int,
    current_user: int = Depends(get_current_user)
):
    if PROJECT_ENV == "production":
        conn = get_pg_db()
        cursor = conn.cursor()
        
        cursor.execute(
            """
            SELECT 
                filepath,
                property_id
            FROM images
            WHERE id = %s
            """,
            (id,),
        )
        row = cursor.fetchone()
        print(f'ROW PROP ID: {row['property_id']}')

        cursor.execute(
            "SELECT * FROM property WHERE id=%s", (row['property_id'],)
        )
        curr_prop = cursor.fetchone()

        if curr_prop["owner_id"] != current_user["id"]:
            print(f"roperty:{curr_prop} User ID:{current_user["id"]}")
            raise HTTPException(status_code=401, detail="User not authorized to add image to property")

        

        print(f'Row:{row}')
        conn.close()

        if not row:
            raise HTTPException(status_code=404, detail="Image not found")

        return FileResponse(row["filepath"])
    else:
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT 
                filepath,
                property_id
            FROM images
            WHERE id = ?
            """,
            (id,),
        )
        row = cursor.fetchone()
        print(f'ROW PROP ID: {row['property_id']}')

        cursor.execute(
            "SELECT * FROM property WHERE id=?", (row['property_id'],)
        )
        curr_prop = cursor.fetchone()

        if curr_prop["owner_id"] != current_user["id"]:
            print(f"roperty:{curr_prop} User ID:{current_user["id"]}")
            raise HTTPException(status_code=401, detail="User not authorized to add image to property")

        

        print(f'Row:{row[0]}')
        conn.close()

        if not row:
            raise HTTPException(status_code=404, detail="Image not found")

        return FileResponse(row[0])

@router.delete("/{image_id}")
def delete_image(
    image_id: int,
    user_id: int = Depends(get_current_user)
):
    if PROJECT_ENV == 'production':
        conn = get_pg_db()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM images WHERE id=%s", (image_id,)
        )
        image = cursor.fetchone()
        cursor.execute(
            "SELECT * FROM property WHERE id=%s", (image["property_id"],)
        )
        curr_prop = cursor.fetchone()

        deleted = delete_images_by_property(image_id)

        if curr_prop["owner_id"] != user_id:
            print(f"Image:{image} Property:{curr_prop} User ID:{user_id}")
            raise HTTPException(status_code=401, detail="User not authorized to add image to property")
        

        if not deleted:
            raise HTTPException(status_code=404, detail="Image not found")
        
        return {"message": "image deleted"}
    else:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM images WHERE id=?", (image_id,)
        )
        image = cursor.fetchone()
        cursor.execute(
            "SELECT * FROM property WHERE id=?", (image["property_id"],)
        )
        curr_prop = cursor.fetchone()

        deleted = delete_images_by_property(image_id)

        if curr_prop["owner_id"] != user_id:
            print(f"Image:{image} Property:{curr_prop} User ID:{user_id}")
            raise HTTPException(status_code=401, detail="User not authorized to add image to property")
        

        if not deleted:
            raise HTTPException(status_code=404, detail="Image not found")
        
        return {"message": "image deleted"}

@router.put("/replace/{image_id}")
def replace_image(
    image_id: int,
    file: UploadFile = File(...),
    user_id: int = Depends(get_current_user)
):
    if PROJECT_ENV == 'production':
        conn = get_pg_db()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM images WHERE id=%s", (image_id,)
        )
        image = cursor.fetchone()
        cursor.execute(
            "SELECT * FROM property WHERE id=%s", (image["property_id"],)
        )
        curr_prop = cursor.fetchone()

        if curr_prop["owner_id"] != user_id:
            print(f"Image:{image} Property:{curr_prop} User ID:{user_id}")
            raise HTTPException(status_code=401, detail="User not authorized to add image to property")
        
        delete_image_by_id(image_id)
        return upload_property_image
    else:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM images WHERE id=?", (image_id,)
        )
        image = cursor.fetchone()
        cursor.execute(
            "SELECT * FROM property WHERE id=?", (image["property_id"],)
        )
        curr_prop = cursor.fetchone()

        if curr_prop["owner_id"] != user_id:
            print(f"Image:{image} Property:{curr_prop} User ID:{user_id}")
            raise HTTPException(status_code=401, detail="User not authorized to add image to property")
        
        delete_image_by_id(image_id)
        return upload_property_image