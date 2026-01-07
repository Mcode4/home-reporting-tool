from fastapi import APIRouter, HTTPException, Response
from app.db.database import get_db
from app.models.user import User, UserInfo
from sqlite3 import IntegrityError

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: User):
    conn = get_db()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            (user.email, user.password,)
        )
        conn.commit()
    except IntegrityError:
        raise HTTPException(status_code=400, detail="User already exists")
    finally:
        conn.close()

    return {"message": "User created"}

@router.post('/login')
def login(user: User):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=?",
        (user.email,)
    )

    db_user = cursor.fetchone()

    if not db_user:
        conn.close()
        raise HTTPException(status_code=404, detail="User doesn't exist")
    
    if db_user["password"] != user.password:
        conn.close()
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    conn.close()
    return {"message": "Login Successful"}

@router.patch('/additional-info')
def additional_info(userInfo: UserInfo):
    conn = get_db()
    cursor = conn.cursor()

    if not userInfo.name and not userInfo.phone:
        conn.close()
        raise HTTPException(status_code=400, detail="No data to update")

    cursor.execute(
        "SELECT * FROM users WHERE id=?",
        (userInfo.id,)
    )

    db_user = cursor.fetchone()

    if not db_user:
        raise HTTPException(status_code=400, detail="User doesn't exist")
    
    if userInfo.name:
        cursor.execute(
            "UPDATE users SET name=? WHERE id=?",
            (userInfo.name, userInfo.id,)
        )

    if userInfo.phone:
        cursor.execute(
            "UPDATE users SET phone_number=? WHERE id=?",
            (userInfo.phone, userInfo.id,)
        )
        
    conn.commit()
    conn.close()
    return {"message": "User info successfully added"}