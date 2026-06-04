from pydantic_settings import BaseSettings
from typing import List
import json


class Settings(BaseSettings):
    APP_NAME: str = "Axon Forge"  # Changed from "TechNova IT Solutions"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    ENVIRONMENT: str = "development"

    # MySQL Database (from your .env in the image)
    DATABASE_URL: str = "mysql+pymysql://root:Dmuntaz12@localhost:3306/itservices_db"
    # Note: If @ in password causes issues, use: mysql+pymysql://root:Dmuntaz12%@localhost:3306/itservices_db

    SECRET_KEY: str = "change-me-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    ALLOWED_ORIGINS: str = '["http://localhost:3000","http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"]'

    # Email (update with correct credentials)
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USERNAME: str = "engrmumtazali01@gmail.com"  # Updated
    SMTP_PASSWORD: str = "your-app-password-here"  # Update with actual Gmail app password
    EMAIL_FROM: str = "engrmumtazali01@gmail.com"  # Updated
    EMAIL_TO: str = "engrmumtazali01@gmail.com"  # Updated to send to yourself

    # File Uploads
    UPLOAD_DIR: str = "media/uploads"
    MAX_FILE_SIZE_MB: int = 5
    ALLOWED_IMAGE_TYPES: str = "image/jpeg,image/png,image/webp"

    @property
    def allowed_origins_list(self) -> List[str]:
        return json.loads(self.ALLOWED_ORIGINS)

    @property
    def allowed_image_types_list(self) -> List[str]:
        return self.ALLOWED_IMAGE_TYPES.split(",")

    @property
    def max_file_size_bytes(self) -> int:
        return self.MAX_FILE_SIZE_MB * 1024 * 1024

    class Config:
        env_file = ".env"


settings = Settings()