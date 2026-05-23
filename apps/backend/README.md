# `<your-project>` — Backend

FastAPI (Python 3.12) API for **`<your-project>`**, with SQLAlchemy, Alembic migrations, and JWT cookie-based auth. Run it only through **Docker Compose** from the [repository root](../../README.md)—do not rely on a host venv or `uvicorn` on your machine for normal development.

---

## Layout

| Path | Purpose |
|------|---------|
| [`app/`](app/README.md) | Application code (routes, services, models, auth) |
| [`alembic/`](alembic/README.md) | Migration scripts and Alembic config |
| [`requirements.txt`](requirements.txt) | Python dependencies (installed inside containers) |
| [`Dockerfile`](Dockerfile) | Production image (used by `docker-compose.prod.yml`) |
| [`.env.example`](.env.example) | JWT, cookies, CORS (copy to `.env`) |
| [`logs/`](logs/) | Application logs (bind-mounted in dev) |

---

## Running

**Development** (hot reload, bind-mounted code):

See [root quick start](../../README.md#quick-start-development).

**Production** (built image):

See [root production quick start](../../README.md#quick-start-production).

**One-off shell or logs** (stack already up):

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f backend
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec backend sh
```

---

## Configuration

- **`apps/backend/.env`** — secrets and app settings (`JWT_SECRET`, `ACCESS_COOKIE_NAME`, `CORS_ORIGINS`, …). Copy from [`.env.example`](.env.example).
- **Compose-injected** — `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `LOGS_DIR` are set in [`docker-compose.dev.yml`](../../docker-compose.dev.yml) / [`docker-compose.prod.yml`](../../docker-compose.prod.yml) from the root `.env`.

The app reads settings via [`app/core/settings.py`](app/core/settings.py).

---

## API surface

- Routes are mounted under `/` inside the container; nginx exposes them at **`/api/`** on the public host.
- Interactive docs: `http://localhost/api/docs` when the dev stack is running.
- Health: `http://localhost/health` (proxied directly to the backend health route).

---

## Further reading

- [Python package architecture (`app/`)](app/README.md)
- [Database migrations (`alembic/`)](alembic/README.md)
- [Applications overview](../README.md)
