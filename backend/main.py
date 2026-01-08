from fastapi import FastAPI, Response, Cookie, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import init_db
from app.routes.auth import router as auth_router
from app.routes.property import router as property_router
from app.utils.jwt import decode_access_token
from dotenv import load_dotenv

load_dotenv()


app = FastAPI(title="Report Tool API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.options("/{path:path}")
def options_handler(path: str):
    return Response(status_code=200)

init_db()

app.include_router(auth_router)
app.include_router(property_router)

@app.get("/")
def health_check():
    return {"status": "API running"}

@app.get("/session")
def get_current_user(access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = decode_access_token(access_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return {"user_id": payload["user_id"]}