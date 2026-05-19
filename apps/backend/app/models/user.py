# Import dependencies
from datetime import datetime
from sqlalchemy import DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.core.settings import Lengths


# User class
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)

    username: Mapped[str] = mapped_column(
        String(Lengths.USERNAME),
        nullable=False,
        index=True,
        unique=True
    )
    password_hash: Mapped[str] = mapped_column(
        String(Lengths.PASSWORD_HASH),
        nullable=False
    )

    first_name: Mapped[str] = mapped_column(
        String(Lengths.NAME),
        nullable=False
    )
    last_name: Mapped[str] = mapped_column(
        String(Lengths.NAME),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(Lengths.EMAIL),
        unique=True,
        index=True,
        nullable=False,
    )

    phone: Mapped[str] = mapped_column(
        String(Lengths.PHONE),
        index=True,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
