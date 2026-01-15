import os
import sys
from sqlalchemy import create_engine, MetaData, Table, select, text, Integer
from sqlalchemy.exc import SQLAlchemyError

SQLITE_PATH = os.getenv("SQLITE_PATH", "/home/user/Documents/home-reporting-tool/backend/report_tool_db.db")
POSTGRES_URL = os.getenv("POSTGRES_URL")  # e.g. "postgresql://user:pass@host:5432/dbname"

if not POSTGRES_URL:
    print("Set POSTGRES_URL environment variable (postgresql://user:pass@host:port/db).")
    sys.exit(1)

sqlite_engine = create_engine(f"sqlite:///{SQLITE_PATH}")
pg_engine = create_engine(POSTGRES_URL)

sqlite_meta = MetaData()
pg_meta = MetaData()

print("Reflecting SQLite schema...")
sqlite_meta.reflect(bind=sqlite_engine)

# Copy table definitions
print("Translating schema to Postgres...")
for table in sqlite_meta.sorted_tables:
    # skip SQLite internal tables
    if table.name.startswith("sqlite_"):
        continue
    # copy table to new MetaData (SQLAlchemy >=1.4 supports to_metadata / tometadata)
    try:
        new_table = table.tometadata(pg_meta)
    except AttributeError:
        # fallback: construct a new Table via reflection string (less common)
        cols = [c.copy() for c in table.columns]
        Table(table.name, pg_meta, *cols)
pg_meta.create_all(bind=pg_engine)
print("Created tables in Postgres (if not present).")

# Copy data table-by-table
print("Copying data...")
with sqlite_engine.connect() as sconn, pg_engine.connect() as pconn:
    for table in sqlite_meta.sorted_tables:
        if table.name.startswith("sqlite_"):
            continue
        print(f" - {table.name}")
        rows = sconn.execute(select(table)).fetchall()
        if not rows:
            continue

        # target table object from pg_meta
        tgt = pg_meta.tables.get(table.name)
        if tgt is None:
            print(f"   skipping {table.name} (no target found)")
            continue

        # convert Row objects to dicts
        dict_rows = [dict(r) for r in rows]
        try:
            pconn.execute(tgt.insert(), dict_rows)
            pconn.commit()
        except SQLAlchemyError as e:
            print(f"   insert failed for {table.name}: {e}")
            pconn.rollback()

    # adjust sequences for serial/identity PKs (best-effort)
    for table in pg_meta.sorted_tables:
        pk_cols = [c for c in table.columns if c.primary_key and isinstance(c.type, Integer)]
        for col in pk_cols:
            seq_sql = text(
                "SELECT setval(pg_get_serial_sequence(:tbl,:col), COALESCE(MAX(\"%s\"),0)) FROM \"%s\"" % (col.name, table.name)
            )
            try:
                pconn.execute(seq_sql, {"tbl": table.name, "col": col.name})
            except Exception:
                # ignore if no sequence exists
                pass

print("Done.")