from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel.ext.asyncio.session import AsyncSession
from datetime import timedelta


from src.db.main import get_session
from .schemas import UserCreateModel, UserModel, UserLoginModel
from .service import UserService
from .utils import create_access_token, decode_token, verify_password

auth_router = APIRouter()
user_service = UserService()


@auth_router.post(
    "/signup", response_model=UserModel, status_code=status.HTTP_201_CREATED
)
async def create_user_account(
    user_data: UserCreateModel, session: AsyncSession = Depends(get_session)
):
    email = user_data.email

    user_exists = await user_service.user_exists(email, session)

    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User with email already exists",
        )

    new_user = await user_service.create_user(user_data, session)

    return new_user

@auth_router.post("/login")
async def login_user(login_data:UserLoginModel, session: AsyncSession = Depends(get_session)):
    email = login_data.email
    password = login_data.password

    user = await user_service.get_user_by_email(email, session)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User with email does not exist",
        )

    if not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid password",
        )

    user_data = {
        "email": user.email,
        "user_uid": str(user.uid),
    }

    access_token = create_access_token(user_data)
    refresh_token = create_access_token(user_data, expiry=timedelta(days=30), refresh=True)

    return JSONResponse(
        content={"access_token": access_token, "refresh_token": refresh_token, "message": "Login successful", "user":{"email": user.email, "uid": str(user.uid)}},
        status_code=status.HTTP_200_OK,
    )
