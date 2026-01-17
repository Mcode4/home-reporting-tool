from fastapi import FastAPI, Response, Cookie, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import init_db, get_db
from app.routes import router as api_router

from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Report Tool API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_origin=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(api_router)

