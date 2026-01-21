import os
from fastapi import HTTPException
from app.db.database import get_db

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
    conn = get_db()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "SELECT id, filepath FROM images WHERE property_id=?",
            (property_id,)
        )
        rows = cursor.fetchall()

        for image_id, filepath in rows:
            if filepath and os.path.exists(filepath):
                os.remove(filepath)
        
        cursor.execute(
            "DELETE FROM images WHERE property_id = ?",
            (property_id,),
        )
        conn.commit()
        return len(rows)
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    finally:
        conn.close()