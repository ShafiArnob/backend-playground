from sqlmodel import create_engine, text, SQLModel
from sqlalchemy.ext.asyncio import AsyncEngine
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import sessionmaker

from src.config import Config

asyn_engine = AsyncEngine(create_engine(url=Config.DATABASE_URL, echo=True))


# connect to DB and keep it running as long as our server is running
async def init_db():
    async with asyn_engine.begin() as conn:
        from src.books.models import Book

        await conn.run_sync(SQLModel.metadata.create_all)


async def get_session() -> AsyncSession:

    Session = sessionmaker(
        bind=asyn_engine, class_=AsyncSession, expire_on_commit=False
    )

    async with Session() as session:
        yield session
