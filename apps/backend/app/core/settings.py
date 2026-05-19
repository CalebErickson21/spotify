# Import dependencies
from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings): # Automatically populated from .env file with matching names
    model_config = SettingsConfigDict(
        env_file=".env",
        env_parse_none_str="None", # Value from env that is "None" will be parsed as None
        env_ignore_empty=True # Empty strings will be ignored, using default value
    )

    ##### App #####
    APP_NAME: str = "Generic App" # Default app name
    
    LOGS_DIR: str

    ##### DB #####
    DB_HOST: str
    DB_NAME: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    
    DB_DRIVER: str = "postgresql+psycopg2"

    @computed_field # Indicate not directly passed as input
    @property # Cann access with dot notation (attribute-like interface)
    def DB_URL(self) -> str:
        return (
            f"{self.DB_DRIVER}://" # Driver
            f"{self.DB_USER}:{self.DB_PASSWORD}" # Authentication
            f"@{self.DB_HOST}:{self.DB_PORT}" # DB location
            f"/{self.DB_NAME}" # DB location
        )


    ##### JWT #####
    JWT_SECRET: str
    JWT_ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 # Default 1 hour


    ##### Cookies #####
    ACCESS_COOKIE_NAME: str = "access_token"
    COOKIE_SECURE: bool
    COOKIE_SAMESITE: str | None = None
    COOKIE_DOMAIN: str | None = None


    ##### CORS #####
    CORS_ORIGINS: str = ""
    @property # CORS_ORIGINS_LIST is now a property
    def CORS_ORIGINS_LIST(self) -> list[str]:
        return [v.strip() for v in self.CORS_ORIGINS.split(",") if v.strip()]


settings = Settings() # Needed because we are accessing environment variables


class Lengths:
    ##### DB Length Checks #####
    USERNAME: int = 127
    PASSWORD: int = 127
    PASSWORD_HASH: int = 255
    EMAIL: int = 255
    NAME: int = 127
    PHONE: int = 23

