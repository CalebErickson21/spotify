# `<your-project>` — Alembic migrations

Migrations for the **`<your-project>`** backend live in `alembic/versions/`. Run all commands from the **repository root** (after [env setup](../../../README.md#configuration)). Use the **base** compose file plus the **overlay** for the environment you are targeting.

See also: [`../README.md`](../README.md) (backend service overview).

| Environment | Compose files |
|-------------|----------------|
| **Dev** | `-f docker-compose.yml -f docker-compose.dev.yml` |
| **Prod** | `-f docker-compose.yml -f docker-compose.prod.yml` |

## Recommended: create a migration with Postgres + one-off `migrate`

You only need **Postgres** on the compose network. You do **not** need `backend`, `frontend`, or `nginx` running. `docker compose run migrate …` still uses the `migrate` service definition (`env_file`, `environment`, `DB_HOST=postgres`, volumes in dev, build in prod).

### Dev

`migrate` uses the slim Python image with the backend bind-mounted at `/app`, so install dependencies before calling Alembic:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d postgres
docker compose -f docker-compose.yml -f docker-compose.dev.yml run --rm migrate \
  sh -c "pip install --no-cache-dir -r requirements.txt && alembic revision --autogenerate -m <describe-change>"
```

### Prod

`migrate` is built from `apps/backend/Dockerfile`; dependencies are already in the image. Override the service command to autogenerate (replace the default `alembic upgrade head` for this run only):

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d postgres
docker compose -f docker-compose.yml -f docker-compose.prod.yml run --rm migrate \
  sh -c "alembic revision --autogenerate -m \"describe_change\""
```

Review the new file under `alembic/versions/` before committing. Autogenerate is not perfect.

## Apply migrations (`upgrade head`)

After a new revision exists on disk, run the `migrate` job with its **default** command (no `sh -c` override).

**Dev:**

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml run --rm migrate
```

**Prod:**

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml run --rm migrate
```

On a full `docker compose up -d`, `migrate` also runs once before `backend` starts. Restarting **only** `backend` does **not** re-run `migrate`; use `run --rm migrate` when you add migrations while the stack is already up.

## Optional: full dev stack and `exec backend`

**Dev — start everything** (Postgres healthy, then `migrate`, then `backend`):

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

**Dev — autogenerate from a running backend** (same result as the recommended flow, if `backend` is already up):

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec backend \
  sh -c "alembic revision --autogenerate -m \"describe_your_change\""
```

If `alembic` is not on `PATH` in the container, use `python -m alembic` instead of `alembic`.

**Dev — optional backend recreate** (e.g. after dependency changes), not required for applying migrations:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --force-recreate backend
```

## Inspect the database

**Dev:**

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec postgres \
  sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

**Prod:**

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml exec postgres \
  sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

In `psql`: `\dt`, `\d table_name`, `SELECT * FROM alembic_version;`.

## Model discovery

`alembic/env.py` uses `Base.metadata`. Every ORM class must be imported when Alembic loads (see `app/models/__init__.py` and `import app.models` in `env.py`) or autogenerate can emit empty migrations.
