import sqlite3
import psycopg2
import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parents[2] / ".env"
print("Looking for .env at:", env_path)
print("Exists:", env_path.exists())

load_dotenv(env_path)

print("POSTGRES_URL loaded:", bool(os.getenv("POSTGRES_URL")))

SQLITE_DB = "report_tool_db.db"
POSTGRES_URL = os.environ["POSTGRES_URL"]
SCHEMA = os.environ.get("SCHEMA", "public")

print("POSTGRES_URL value:", POSTGRES_URL)
print("RAW POSTGRES_URL repr:", repr(POSTGRES_URL))
print("SCHEMA:", repr(SCHEMA))



# -----------------------
# CONNECT
# -----------------------
sqlite3_conn = sqlite3.connect(SQLITE_DB)
sqlite3_conn.row_factory = sqlite3.Row
sqlite3_cur = sqlite3_conn.cursor()

pg_conn = psycopg2.connect(POSTGRES_URL)
pg_cur = pg_conn.cursor()
pg_cur.execute(f'CREATE SCHEMA IF NOT EXISTS {SCHEMA} AUTHORIZATION "user";')

try:
    # -----------------------
    # CREATE TABLES
    # -----------------------

    pg_cur.execute(f"""
        CREATE TABLE IF NOT EXISTS {SCHEMA}.users (
            id INTEGER PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT,
            phone_number BIGINT
        )
    """)

    pg_cur.execute(f"""
        CREATE TABLE IF NOT EXISTS {SCHEMA}.property (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            country TEXT NOT NULL,
            zip INTEGER NOT NULL,
            bedroom_size INTEGER NOT NULL,
            bathroom_size INTEGER NOT NULL,
            owner_id INTEGER NOT NULL,
            details jsonb,
            pinned INTEGER DEFAULT 0,
            FOREIGN KEY (owner_id) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        )
    """)

    pg_cur.execute(f"""
        CREATE TABLE IF NOT EXISTS {SCHEMA}.images (
            id INTEGER PRIMARY KEY,
            property_id INTEGER NOT NULL,
            default_filename TEXT NOT NULL,
            filename TEXT NOT NULL,
            filepath TEXT NOT NULL,
            content_type TEXT,
            size INTEGER,
            uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (property_id) REFERENCES property(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        )
    """)

    pg_conn.commit()

    # -----------------------
    # FETCH SQLITE DATA
    # -----------------------
    sqlite3_cur.execute("SELECT * FROM users")
    user_rows = sqlite3_cur.fetchall()

    sqlite3_cur.execute("SELECT * FROM property")
    property_rows = sqlite3_cur.fetchall()

    sqlite3_cur.execute("SELECT * FROM images")
    images_rows = sqlite3_cur.fetchall()

    # -----------------------
    # DISABLE FK CHECKS (FASTER)
    # -----------------------
    # pg_cur.execute("SET session_replication_role = replica;")

    # -----------------------
    # INSERT USERS
    # -----------------------
    for row in user_rows:
        pg_cur.execute(
            f"""
            INSERT INTO {SCHEMA}.users (id, email, password, name, phone_number)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING
            """,
            (
                row["id"],
                row["email"],
                row["password"],
                row["name"],
                row["phone_number"],
            ),
        )

    # -----------------------
    # INSERT PROPERTIES
    # -----------------------
    for row in property_rows:
        pg_cur.execute(
            f"""
            INSERT INTO {SCHEMA}.property (
                id, name, address, city, state, country, zip,
                bedroom_size, bathroom_size, owner_id, details,
                pinned
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s::jsonb, %s)
            ON CONFLICT (id) DO NOTHING
            """,
            (
                row["id"],
                row["name"],
                row["address"],
                row["city"],
                row["state"],
                row["country"],
                row["zip"],
                row["bedroom_size"],
                row["bathroom_size"],
                row["owner_id"],
                row["details"] or "{}",
                row["pinned"]
            ),
        )

    # -----------------------
    # INSERT IMAGES
    # -----------------------
    for row in images_rows:
        pg_cur.execute(
            f"""
            INSERT INTO {SCHEMA}.images (
                id, property_id, default_filename, filename, filepath,
                content_type, size, uploaded_at
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING
            """,
            (
                row["id"],
                row["property_id"],
                row['default_filename'],
                row["filename"],
                row["filepath"],
                row["content_type"],
                row["size"],
                row["uploaded_at"],
            ),
        )

    # -----------------------
    # RESTORE FK CHECKS
    # -----------------------
    # pg_cur.execute("SET session_replication_role = DEFAULT;")

    # -----------------------
    # SET UP AUTO-INCREMENT (SERIAL STYLE)
    # -----------------------

    pg_cur.execute(f"""
        CREATE SEQUENCE IF NOT EXISTS {SCHEMA}.users_id_seq OWNED BY {SCHEMA}.users.id;
        ALTER TABLE {SCHEMA}.users ALTER COLUMN id SET DEFAULT nextval('{SCHEMA}.users_id_seq');
        SELECT setval('{SCHEMA}.users_id_seq', COALESCE((SELECT MAX(id) FROM {SCHEMA}.users), 1));
    """)

    pg_cur.execute(f"""
        CREATE SEQUENCE IF NOT EXISTS {SCHEMA}.property_id_seq OWNED BY {SCHEMA}.property.id;
        ALTER TABLE {SCHEMA}.property ALTER COLUMN id SET DEFAULT nextval('{SCHEMA}.property_id_seq');
        SELECT setval('{SCHEMA}.property_id_seq', COALESCE((SELECT MAX(id) FROM {SCHEMA}.property), 1));
    """)

    pg_cur.execute(f"""
        CREATE SEQUENCE IF NOT EXISTS {SCHEMA}.images_id_seq OWNED BY {SCHEMA}.images.id;
        ALTER TABLE {SCHEMA}.images ALTER COLUMN id SET DEFAULT nextval('{SCHEMA}.images_id_seq');
        SELECT setval('{SCHEMA}.images_id_seq', COALESCE((SELECT MAX(id) FROM {SCHEMA}.images), 1));
    """)

    # -----------------------
    # FINAL COMMIT
    # -----------------------
    pg_conn.commit()

    print("✅ Migration completed successfully")

except Exception as e:
    pg_conn.rollback()
    print("❌ Migration failed:", e)
    raise

finally:
    sqlite3_conn.close()
    pg_conn.close()