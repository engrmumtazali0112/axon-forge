from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# MySQL engine
# Note: MySQL requires charset specification for Unicode support
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,       # Verify connections before using
    pool_size=10,             # Connection pool size
    max_overflow=20,          # Extra connections beyond pool_size
    pool_recycle=3600,        # Recycle connections every 1 hour
    connect_args={
        "charset": "utf8mb4"  # Support for full Unicode including emojis
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()