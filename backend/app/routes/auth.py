from fastapi import APIRouter, HTTPException, Response
from app.db.database import get_db
from app.models.user import User, UserInfo
from sqlite3 import IntegrityError
from passlib.context import CryptContext
from app.utils.jwt import create_access_token
import hashlib

router = APIRouter(prefix="/auth", tags=["Auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ---------- Password helpers ----------

def _prehash(password: str) -> str:
    """
    Pre-hash the password using SHA-256 to remove bcrypt's 72-byte limit.
    """
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def hash_password(password: str) -> str:
    if not isinstance(password, str):
        raise HTTPException(status_code=400, detail="Invalid password format")

    password = password.strip()
    password = _prehash(password)

    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    if not isinstance(plain_password, str):
        raise HTTPException(status_code=400, detail="Invalid password format")

    plain_password = _prehash(plain_password)

    return pwd_context.verify(plain_password, hashed_password)


# ---------- Routes ----------

@router.post("/register")
def register(user: User):
    conn = get_db()
    cursor = conn.cursor()

    try:
        hashed_password = hash_password(user.password)

        cursor.execute(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            (user.email.strip(), hashed_password)
        )
        conn.commit()

    except IntegrityError:
        raise HTTPException(status_code=400, detail="User already exists")

    finally:
        conn.close()

    return {"message": "User created"}


@router.post("/login")
def login(user: User, response: Response):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=?",
        (user.email.strip(),)
    )
    db_user = cursor.fetchone()
    conn.close()

    if not db_user:
        raise HTTPException(status_code=404, detail="User doesn't exist")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"user_id": db_user["id"]})

    # --- SET COOKIE ---
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=60*60,
        samesite="none",  # required for cross-site cookies
        secure=True,      # required with SameSite=None (needs HTTPS)
        path="/"
    )

    # Return a normal JSON response (cookie already set on `response`)
    return {"message": "Login successful"}

