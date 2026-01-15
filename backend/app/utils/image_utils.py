import os
import shutil
from fastapi import UploadFile
from app.db.database import get_db

UPLOAD_DIR = "app/uploads/properties"

async def save_image(property_id: int, file: UploadFile) -> str:
    """Save uploaded image to disk"""
    # Create directory if it doesn't exist
    property_dir = os.path.join(UPLOAD_DIR, str(property_id))
    os.makedirs(property_dir, exist_ok=True)

    # Save file
    file_path = os.path.join(property_dir, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path

def delete_image_by_id(image_id: int):
    conn = get_db()
    cursor = conn.cursor()

    try:
        # Fetch image path
        cursor.execute(
            "SELECT filepath FROM images WHERE id=?",
            (image_id,)
        )
        row = cursor.fetchone()

        if not row:
            return False
        
        filepath = row[0]

        # Delete file from disk
        if filepath and os.path.exists(filepath):
            os.remove(filepath)

        # Delete DB record
        cursor.execute(
            "DELETE FROM images WHERE id=?",
            (image_id,)
        )

        conn.commit()
        return True
    finally:
        conn.close()

def delete_images_by_property(property_id: int):
    """Delete all images for a property"""
    property_dir = os.path.join(UPLOAD_DIR, str(property_id))
    if os.path.exists(property_dir):
        shutil.rmtree(property_dir)