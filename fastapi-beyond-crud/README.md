## FastAPI

```
// RUN
> fastapi run ./src
```

## Alembic

```
// Initialize alembic
> alembic init -t async migrations

// Create migrations
> alembic revision --autogenerate -m "init"

// Apply migration
// note: sometimes migration throws error you can alter the version then migrate again
> alembic upgrade head
```
