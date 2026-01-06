from fastapi import APIRouter, HTTPException
from app.db.database import get_db
from app.models.user import User, UserInfo

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: User):
    conn = get_db()
    cursor = conn.cursor()

    try:
        conn.execute(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            (user.email, user.password,)
        )
        conn.commit()
    except Exception:
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
        (user.email)
    )

    db_user = cursor.fetchone()

    if not db_user:
        raise HTTPException(status_code=400, detail="User doesn't exist")
    
    cursor.execute(
        "SELECT * FROM user WHERE email=? AND password=?",
        (user.email, user.password,)
    )

    db_user = cursor.fetchone()
    conn.close()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
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