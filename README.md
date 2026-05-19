# Project Overview

## Docker (Mockstreet-style)

- **Development** — Postgres, FastAPI (hot reload), Vite (HMR via nginx), and nginx on port 80:

  ```bash
  cp .env.example .env
  # Configure apps/backend/.env (see apps/backend/.env.example)
  docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
  ```

  Open `http://localhost` (or `http://localhost:${NGINX_PORT}` if you override `NGINX_PORT`).

- **Production**:

  ```bash
  docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
  ```

Compose merges the base [`docker-compose.yml`](docker-compose.yml) with the environment file so all app services attach to `app-network`.
