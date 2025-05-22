from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_USERNAME: str
    REDIS_PASSWORD: str
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


Config = Settings()
