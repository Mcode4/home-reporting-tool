import os
from psycopg2 import IntegrityError as PostgresError
import psycopg2

PROJECT_ENV = os.environ.get("PROJECT_ENV", "development")

def get_pg_db():
    return psycopg2.connect(
        os.environ["POSTGRES_URL"],
        cursor_factory=RealDictCursor
    )