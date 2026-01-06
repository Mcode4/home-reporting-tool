from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import init_db
from app.routes.auth import router as auth_router
from app.routes.property import router as property_router

app = FastAPI(title="Report Tool API")

init_db()

app.include_router(auth_router)
app.include_router(property_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=[""],
)

@app.get("/")
def health_check():
    return {"status": "API running"}