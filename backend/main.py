from fastapi import FastAPI, Response, Cookie, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import init_db, get_db
from app.routes.auth import router as auth_router
from app.routes.property import router as property_router
from app.utils.jwt import decode_access_token
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Report Tool API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(auth_router)
app.include_router(property_router)

@app.get("/")
def health_check():
    return {"status": "API running"}

@app.get("/session")
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
    db_user = cursor.fetchone()
    conn.close()

    if not db_user:
        # user no longer exists: clear cookie and return 401
        response.delete_cookie("access_token", path="/")
        raise HTTPException(status_code=401, detail="User not found")

    return {"user_id": user_id, "email": db_user["email"]}
