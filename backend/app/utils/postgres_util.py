import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from pathlib import Path

PROJECT_ENV = os.environ.get("PROJECT_ENV", "development")
SCHEMA = os.environ.get("SCHEMA", "public")

env_path = Path(__file__).resolve().parents[3] / ".env"
print("Looking for .env at:", env_path)
print("Exists:", env_path.exists())

load_dotenv(env_path)

def get_pg_db():
    return psycopg2.connect(
        os.environ["POSTGRES_URL"],
        cursor_factory=RealDictCursor
    )


LOAD_SCHEMA = 