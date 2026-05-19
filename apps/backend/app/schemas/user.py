# Import dependencies
from app.schemas.api_base import APIModel
from pydantic import BaseModel, EmailStr

class UserPublic(APIModel):
    username: str

    # Allow pydantic to build response model from SQLAlchemy objects directory
    # Field names must match
    class Config:
        from_attributes: True
