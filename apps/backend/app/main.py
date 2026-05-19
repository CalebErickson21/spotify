from app.api.router import router
from app.core.logging import setup_logging
from app.core.settings import settings

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import logging


# Setup loggings
setup_logging()
logger = logging.getLogger(__name__)

# Create FASTAPI App backend instance
app = FastAPI(title=settings.APP_NAME) # Create app with custom settings

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS_LIST,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include app router
app.include_router(router)


@app.get("/health")
def health():
    logger.info("Backend is running.")
    return {
        "status": 200,
        "statusText": "Backend is running.",
    }


@app.get("/")
def root():
    logger.info("Backend is running.")
    return {
        "status": 200,
        "statusText": "Backend is running.",
    }
