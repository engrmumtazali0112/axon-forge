from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings


def normalize_db_url(url: str) -> str:
    """Make sure SQLAlchemy uses the psycopg (v3) driver (same rule as main.py)."""
    if url.startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://"):]
    if url.startswith("postgresql://"):
        url = "postgresql+psycopg://" + url[len("postgresql://"):]
    return url


if not settings.DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set. Add it to backend/.env")

# PostgreSQL (Neon) engine.
# sslmode / channel_binding come from the URL's query string — nothing else is needed.
# No MySQL "charset" connect arg: PostgreSQL doesn't accept it.
engine = create_engine(
    normalize_db_url(settings.DATABASE_URL),
    pool_pre_ping=True,       # Neon closes idle connections; verify before use
    pool_size=5,              # Connection pool size
    max_overflow=10,          # Extra connections beyond pool_size
    pool_recycle=300,         # Recycle connections every 5 minutes
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
