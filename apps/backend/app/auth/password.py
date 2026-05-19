# app/auth/password.py
from passlib.context import CryptContext

# Password hashing context
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto",
)


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def needs_rehash(hashed_password: str) -> bool:
    """
    Returns True if the stored hash was created with weaker/older params
    than your current configuration.
    """
    return pwd_context.needs_update(hashed_password)
