from passlib.context import CryptContext
from datetime import timedelta, datetime
import jwt
import uuid
import logging

password_context = CryptContext(schemes=["bcrypt"])

ACCES_TOKEN_EXPIRY = 3600

def generate_password_hash(password: str) -> str:
    hash = password_context.hash(password)
    return hash


def verify_password(password: str, hash: str) -> bool:
    return password_context.verify(password, hash)

def create_access_token(user_data:dict, expiry: timedelta=None, refresh:bool=False) -> str:
    payload = {
    }

    payload['user'] = user_data
    payload['exp'] = datetime.now() + (expiry if expiry is not None else timedelta(seconds=ACCES_TOKEN_EXPIRY))
    payload['jti'] = str(uuid.uuid4())
    payload['refresh'] = refresh

    token = jwt.encode(payload=payload, key = "secret", algorithm="HS256")
    return token

def decode_token(token:str) -> dict:
    try:
        payload = jwt.decode(token, key="secret", algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        logging.error("Token has expired")
        return None
    except jwt.InvalidTokenError:
        logging.error("Invalid token")
        return None