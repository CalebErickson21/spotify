from datetime import datetime

from sqlalchemy import (
    DateTime
    ,ForeignKey
    ,String
    ,Text
    ,UniqueConstraint
    ,func
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.core.settings import Lengths


class SpotifyAccount(Base):
    __tablename__ = "spotify_accounts"

    __table_args__ = (
        UniqueConstraint("user_id"),
        UniqueConstraint("spotify_user_id"),
    )

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    spotify_user_id: Mapped[str] = mapped_column(
        String(Lengths.SPOTIFY_USER_ID),
        nullable=False,
        index=True,
    )

    display_name: Mapped[str | None] = mapped_column(
        String(Lengths.NAME),
        nullable=True,
    )

    access_token_encrypted: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    refresh_token_encrypted: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    scopes: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    token_expires_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    last_synced_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    next_sync_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    sync_status: Mapped[str | None] = mapped_column(
        String(Lengths.STATUS),
        nullable=True,
    )

    sync_error: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Spotify account object has related user object so we can do <spotify_account_query_res>.user
    user = relationship(
        "User",
        back_populates="spotify_account",
    )