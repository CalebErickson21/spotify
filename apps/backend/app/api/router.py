# Import dependencies
from fastapi import APIRouter
from app.api.endpoints.auth import router as auth_router

# Create router
router = APIRouter()

# Include all routes defined in /app/api/endpoints
router.include_router(auth_router)
