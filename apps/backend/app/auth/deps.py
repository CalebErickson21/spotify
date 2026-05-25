# Import deps
from app.api.deps import get_db
from app.auth.jwt import decode_access_token
from app.core.settings import settings
from app.services.user import UserService

from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session


def get_current_user(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get(settings.ACCESS_COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    try:
        payload = decode_access_token(token)
        sub = payload.get("sub")
        if not sub:
            raise ValueError("Missing sub")
        user_id = int(sub)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = UserService.get_by_id(db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return user
