# Import dependencies
from app.schemas.api_base import APIModel

from pydantic import Field

# E.164: leading +, 7–15 digits, first digit after + is 1–9 (ITU-T)
E164_PHONE_PATTERN = r"^\+[1-9]\d{6,14}$"


class LoginRequest(APIModel):
    username_email_phone: str
    password: str


class RegistrationRequest(APIModel):
    username: str
    password: str
    password_confirm: str
    
    first_name: str
    last_name: str
    
    email: str
    email_confirm: str

    phone: str = Field(..., pattern=E164_PHONE_PATTERN)
