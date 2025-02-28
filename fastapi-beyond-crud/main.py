from fastapi import FastAPI, Header, status
from fastapi.exceptions import HTTPException
from typing import Optional, List
from pydantic import BaseModel

app = FastAPI()


books = [
    {
        "id": "1",
        "title": "Atomic Habits",
        "publisher": "Avery",
        "published_date": "2018-10-16",
        "page_count": 320,
        "language": "English",
    },
    {
        "id": "2",
        "title": "The Lean Startup",
        "publisher": "Crown Business",
        "published_date": "2011-09-13",
        "page_count": 336,
        "language": "English",
    },
]


class Book(BaseModel):
    id: str
    title: str
    publisher: str
    published_date: str
    page_count: int
    language: str


class BookUpdateModel(BaseModel):
    title: str
    publisher: str
    page_count: int
    language: str


@app.get("/")
async def read_root():
    return {"message": "Hello World"}


@app.get("/books", response_model=List[Book])
async def get_all_books():
    return books


@app.post("/books", status_code=status.HTTP_201_CREATED)
async def create_a_book(book_data: Book) -> dict:
    new_book = book_data.model_dump()
    books.append(new_book)
    return new_book


@app.get("/books/{book_id}")
async def get_book(book_id: str):
    for book in books:
        if book["id"] == book_id:
            return book

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book Not Found")


@app.patch("/books/{book_id}")
async def update_book(book_id: str, book_update_data: BookUpdateModel):
    for book in books:
        if book["id"] == book_id:
            book["title"] = book_update_data.title
            book["publisher"] = book_update_data.publisher
            book["page_count"] = book_update_data.page_count
            book["language"] = book_update_data.language

            return book

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")


@app.delete("/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            books.remove(books)
            return {}

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")


# http://127.0.0.1:8000/greet/arnob?age=26
# Here the name is optional
# @app.get("/greet/{name}")
# async def greet_name(name: Optional[str] = "user", age: int = 0) -> dict:
#     return {"message": f"Hello {name}", "age": age}


# http://127.0.0.1:8000/greet?name=arnob&age=26
# @app.get("/greet")
# async def greet_name(name: str, age: int) -> dict:
#     return {"message": f"Hello {name}", "age": age}


# Data validation
# class BookCreateModel(BaseModel):
#     title: str
#     author: str


# @app.post("/create_book")
# async def create_book(book_data: BookCreateModel):
#     return {"title": book_data.title, "author": book_data.author}


# chect the uses of header
# @app.get("/get_headers", status_code=200)
# async def get_headers(
#     accept: str = Header(None),
#     content_type: str = Header(None),
#     user_agent: str = Header(None),
#     host: str = Header(None),
# ):  # if header is none returns None
#     request_headers = {}
#     request_headers["Accept"] = accept
#     request_headers["Content-Type"] = content_type
#     request_headers["User-Agent"] = (user_agent,)
#     request_headers["Host"] = host

#     return request_headers
