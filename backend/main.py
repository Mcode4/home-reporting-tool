from fastapi import FastAPI, Response, Cookie, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import init_db, get_db
from app.routes.auth import router as auth_router, get_current_user
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
def session(current_user = Depends(get_current_user)):
    return {
        "id": current_user["id"],
        "email": current_user["email"]
    }

@app.delete("/session")
def logout_user(response: Response):
    response.set_cookie(
        key="access_token",
        value="",
        httponly=True,
        max_age=0,
        samesite="none",
        secure=True,
        path="/"
    )

    return {"message": "Logged out successfully"}