from traceback import extract_stack
from app.api.deps import get_db
from app.auth.deps import get_current_user
from app.auth.jwt import clear_access_cookie, create_access_token, set_access_cookie
from app.schemas.auth import LoginRequest, RegistrationRequest
from app.schemas.user import UserPublic
from app.services.user import InvalidCredentials, UserAlreadyExistsError, UserService

from email_validator import validate_email, EmailNotValidError
from fastapi import APIRouter, Depends, HTTPException, Response, status
import logging

import phonenumbers
from phonenumbers import NumberParseException

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

# Setup logging
logger = logging.getLogger(__name__)

# Declare prefix
router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=UserPublic)
def login(
    data: LoginRequest,
    response: Response, # Response is the actual HTTP response object FastAPI sends to frontend
    db: Session = Depends(get_db)
):

    logger.debug(
        "login_attempt",
        extra={"username_phone_email": data.username_email_phone}
    )
    try:
        user = UserService.authenticate(
            db=db,
            username_email_phone=data.username_email_phone,
            password=data.password
        )
    except InvalidCredentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(subject=str(user.id))
    set_access_cookie(response, token)
    return user


@router.post("/register", response_model=UserPublic)
def register(
    data: RegistrationRequest,
    response: Response,
    db: Session = Depends(get_db)
):

    logger.debug(
        "registration_attempt",
        extra={"username": data.username, "email": data.email, "phone": data.phone}
    )

    # Reject empty / whitespace-only strings (Pydantic already rejects missing keys and JSON null)
    required_strings = {
        "username": data.username,
        "password": data.password,
        "password_confirm": data.password_confirm,
        "first_name": data.first_name,
        "last_name": data.last_name,
        "email": data.email,
        "email_confirm": data.email_confirm,
        "phone": data.phone,
    }
    empty = [name for name, value in required_strings.items() if not (value or "").strip()]
    if empty:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="All registration fields are required.",
        )

    # Check confirmation inputs
    if (data.password != data.password_confirm):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Password must match confirmation password."
        )
    if (data.email != data.email_confirm):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Email must match confirmation email."
        )

    # Check valid email
    try:
        clean_email = validate_email(data.email).email
    except EmailNotValidError:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Invalid email."
        )

    # Check valid phone number
    try:
        number = phonenumbers.parse(data.phone, "US")
        clean_number = phonenumbers.is_valid_number(number)
    except NumberParseException:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Invalid phone number."
        )        

    # Register user
    try:
        user = UserService.register(
            db=db,
            username=data.username,
            password=data.password,
            first_name=data.first_name,
            last_name=data.last_name,
            email=clean_email,
            phone=clean_number,
        )

    except UserAlreadyExistsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"{e.field.capitalize()} already exists. Please use another {e.field}."
        )

    except SQLAlchemyError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Registration temporarily unavailable."
        )

    # Create access token and return user
    token = create_access_token(subject=str(user.id))
    set_access_cookie(response=response, token=token)
    return user


@router.post("/logout", status_code=204)
def logout(response: Response):
    clear_access_cookie(response)
    return None


@router.get("/me", response_model=UserPublic)
def me(current_user=Depends(get_current_user)):
    return current_user

