from fastapi import APIRouter, HTTPException, Response, Cookie
from app.db.database import get_db
from app.models.user import User, UserInfo
from sqlite3 import IntegrityError
from passlib.context import CryptContext
from app.utils.jwt import create_access_token, decode_access_token
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
    # Dev: use Lax + secure=False so cookies work over HTTP.
    # In production with HTTPS switch to SameSite=None + secure=True.
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=60*60,
        samesite="none",    # dev-friendly
        secure=True,      # not HTTPS in dev
        path="/"
    )

    # Return a normal JSON response (cookie already set on `response`)
    return {"message": "Login successful"}

# ---------- Verify User ----------
@router.get("/session")
def get_current_user(
    response: Response,
    access_token: str | None = Cookie(None, alias="access_token")
):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    payload = decode_access_token(access_token)
    if not payload:
        # invalid token: remove cookie and return 401
        response.delete_cookie("access_token", path="/")
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("user_id")
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        # user no longer exists: clear cookie and return 401
        response.delete_cookie("access_token", path="/")
        raise HTTPException(status_code=401, detail="User not found")

    return {
        "id": user["id"],
        "email": user["email"]
    }