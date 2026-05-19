# Import dependencies
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.settings import settings

# Create databaae engine
engine = create_engine(
    settings.DB_URL,
    pool_pre_ping=True,
    future=True
)

# Create session
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    future=True
)
