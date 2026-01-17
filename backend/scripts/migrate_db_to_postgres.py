import sqlite3
import psycopg2
import os

SQLITE_DB = "report_tool_db.db"
POSTGRES_URL = os.environ["POSTGRES_URL"]

# -----------------------
# CONNECT
# -----------------------
sqlite3_conn = sqlite3.connect(SQLITE_DB)
sqlite3_conn.row_factory = sqlite3.Row
sqlite3_cur = sqlite3_conn.cursor()

pg_conn = psycopg2.connect(POSTGRES_URL)
pg_cur = pg_conn.cursor()

try:
    # -----------------------
    # CREATE TABLES
    # -----------------------

    pg_cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT,
            phone_number BIGINT
        )
    """)

    pg_cur.execute("""
        CREATE TABLE IF NOT EXISTS property (
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
            details TEXT,
            FOREIGN KEY (owner_id) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        )
    """)

    pg_cur.execute("""
        CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY,
            property_id INTEGER NOT NULL,
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
    pg_cur.execute("SET session_replication_role = replica;")

    # -----------------------
    # INSERT USERS
    # -----------------------
    for row in user_rows:
        pg_cur.execute(
            """
            INSERT INTO users (id, email, password, name, phone_number)
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
            """
            INSERT INTO property (
                id, name, address, city, state, country, zip,
                bedroom_size, bathroom_size, owner_id, details
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                row["details"],
            ),
        )

    # -----------------------
    # INSERT IMAGES
    # -----------------------
    for row in images_rows:
        pg_cur.execute(
            """
            INSERT INTO images (
                id, property_id, filename, filepath,
                content_type, size, uploaded_at
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING
            """,
            (
                row["id"],
                row["property_id"],
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
    pg_cur.execute("SET session_replication_role = DEFAULT;")

    # -----------------------
    # SET UP AUTO-INCREMENT (SERIAL STYLE)
    # -----------------------

    pg_cur.execute("""
        CREATE SEQUENCE IF NOT EXISTS users_id_seq OWNED BY users.id;
        ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_id_seq');
        SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1));
    """)

    pg_cur.execute("""
        CREATE SEQUENCE IF NOT EXISTS property_id_seq OWNED BY property.id;
        ALTER TABLE property ALTER COLUMN id SET DEFAULT nextval('property_id_seq');
        SELECT setval('property_id_seq', COALESCE((SELECT MAX(id) FROM property), 1));
    """)

    pg_cur.execute("""
        CREATE SEQUENCE IF NOT EXISTS images_id_seq OWNED BY images.id;
        ALTER TABLE images ALTER COLUMN id SET DEFAULT nextval('images_id_seq');
        SELECT setval('images_id_seq', COALESCE((SELECT MAX(id) FROM images), 1));
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