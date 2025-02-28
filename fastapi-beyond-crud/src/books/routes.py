from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from typing import Optional, List

from src.books.schemas import Book, BookUpdateModel
from src.books.book_data import books

book_router = APIRouter()


@book_router.get("/", response_model=List[Book])
async def get_all_books():
    return books


@book_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_a_book(book_data: Book) -> dict:
    new_book = book_data.model_dump()
    books.book_routerend(new_book)
    return new_book


@book_router.get("/{book_id}")
async def get_book(book_id: str):
    for book in books:
        if book["id"] == book_id:
            return book

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book Not Found")


@book_router.patch("/{book_id}")
async def update_book(book_id: str, book_update_data: BookUpdateModel):
    for book in books:
        if book["id"] == book_id:
            book["title"] = book_update_data.title
            book["publisher"] = book_update_data.publisher
            book["page_count"] = book_update_data.page_count
            book["language"] = book_update_data.language

            return book

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")


@book_router.delete("/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            books.remove(books)
            return {}

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
