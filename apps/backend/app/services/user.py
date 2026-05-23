# Import deps
from app.models.user import User
from app.auth.password import verify_password, hash_password

import logging

from sqlite3 import IntegrityError
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

# Logging
logger = logging.getLogger(__name__)

class UserService:
    @staticmethod # Belongs logically to class but does not recieve self or cls as args
    def get_by_email(
        db: Session,
        email: str
    ) -> User | None:
        """TODO DOCS"""
        return db.query(User).filter(User.email == email).first()


    @staticmethod
    def get_by_username(
        db: Session,
        username: str
    ) -> User | None:
        return db.query(User).filter(User.username == username).first()


    @staticmethod
    def get_by_phone(
        db: Session,
        phone: str
    ) -> User | None:
        """TODO DOCS"""
        return db.query(User).filter(User.phone == phone).first()

    @staticmethod
    def get_by_id(
        db: Session,
        user_id: int
    ) -> User | None:
        """TODO DOCS"""
        return db.query(User).filter(User.id == user_id).first()


    @staticmethod
    def register(
        db: Session,
        username: str,
        password: str,
        first_name: str,
        last_name: str,
        email: str,
        phone: str
    ) -> User | None:

        # Check to make sure user doesn't already exist in database
        if UserService.get_by_email(db=db, email=email):
            raise UserAlreadyExistsError(field="email")
        elif UserService.get_by_username(db=db, username=username):
            raise UserAlreadyExistsError(field="username")
        elif UserService.get_by_phone(db=db, phone=phone):
            raise UserAlreadyExistsError(field="phone")
        
        # User doesn't exist, insert into database
        user = User(
            username=username,
            password_hash=hash_password(password=password),
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone
        )

        try:
            db.add(user) # Mark object for insertion in current session
            db.commit() # Finalize the transaction
            db.refresh(user) # Reloads object from the database
            logger.debug(
                'user_created_in_db_successfully',
                extra={"username": username, "email": email, "phone": phone}
            )
        except IntegrityError as e:
            db.rollback()
            logger.debug(
                "user_register_integrity_error",
                extra={"username": username, "email": email, "phone": phone}
            )
            raise UserAlreadyExistsError from e

        except SQLAlchemyError:
            db.rollback()
            logger.exception(
                "user_register_database_error",
                extra={"username": username, "email": email, "phone": phone}
            )
            raise # Raise same error as caught
            
        return user


    @staticmethod
    def authenticate(db: Session, username_email_phone: str, password: str) -> User | None:
        # User is first truthy value
        # Assumes namespaces between usernames, emails, and phones numbers are disjoint
        user = (
            UserService.get_by_username(db=db, username=username_email_phone)
            or UserService.get_by_email(db=db, email=username_email_phone)
            or UserService.get_by_phone(db=db, phone=username_email_phone)
        )
        if not user:
            raise InvalidCredentials
        if not verify_password(password, user.password_hash):
            raise InvalidCredentials
        return user


class UserAlreadyExistsError(Exception):
    def __init__(self, field):
        self.field = field
        super().__init__(f"{field} already exists") # Initialize current objects self as an Exception

class InvalidCredentials(Exception):
    pass