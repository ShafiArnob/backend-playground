## Activate Python

```
> venv\Scripts\activate.bat
```

## FastAPI

```
// RUN
> fastapi run ./src

// Run dev mode
> fastapi dev ./src
```

## Alembic

```
// Initialize alembic
> alembic init -t async migrations

// Create migrations
> alembic revision --autogenerate -m "init"

// update tables
alembic revision --autogenerate -m "<message>"

// Apply migration
// note: sometimes migration throws error you can alter the version then migrate again
> alembic upgrade head

```
