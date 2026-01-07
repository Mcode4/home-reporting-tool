from fastapi import APIRouter, HTTPException, Response
from app.db.database import get_db
from app.models.user import User, UserInfo
from sqlite3 import IntegrityError
from passlib.context import CryptContext
from app.utils.jwt import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/register")
def register(user: User):
    conn = get_db()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            (user.email, hash_password(user.password),)
        )
        conn.commit()
    except IntegrityError:
        raise HTTPException(status_code=400, detail="User already exists")
    finally:
        conn.close()

    return {"message": "User created"}

@router.post('/login')
def login(user: User, response: Response):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=?",
        (user.email,)
    )

    db_user = cursor.fetchone()
    conn.close()

    if not db_user:
        raise HTTPException(status_code=404, detail="User doesn't exist")
    
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token({"user_id": db_user["id"]})

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=60*60, # 1 hour
        samesite="lax",
        secure=False # True if using HTTPS
    )
    
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