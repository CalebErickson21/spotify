# `<your-project>` — Web

Browser UI for **`<your-project>`**: React 19, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, and Axios. In development and production templates, the app runs in Docker and is reached through **nginx** at the repository root—not by opening Vite’s port directly.

---

## Stack

- **React 19** + **TypeScript**
- **Vite** — dev server and production build
- **Tailwind CSS** — styling
- **React Router** — routing
- **TanStack Query** — server state (where used)
- **Axios** — HTTP client with cookie credentials

---

## Folder layout

| Path | Purpose |
|------|---------|
| `src/api/` | API modules (`client.ts`, `auth.ts`, …) |
| `src/contexts/` | React context providers (e.g. auth) |
| `src/pages/` | Route-level views |
| `src/components/` | Shared UI |
| `src/utils/` | Types, routes, helpers |

---

## API client

[`src/api/client.ts`](src/api/client.ts) creates an Axios instance with:

- **`baseURL`** — `import.meta.env.VITE_API_URL` (set `/api` in the root [`.env`](../../.env.example) so requests go through nginx on the same origin)
- **`withCredentials: true`** — sends HTTP-only auth cookies set by the backend

Auth endpoints live under `src/api/auth.ts` (`/auth/login`, `/auth/register`, etc.), resolved relative to `VITE_API_URL`.

---

## Running in Docker

**Development:** The `frontend` service runs `npm ci && npm run dev` with the repo bind-mounted. Use the app at [http://localhost](http://localhost) via nginx (HMR works through the proxy).

**Production:** [`Dockerfile`](Dockerfile) builds static assets; build args such as `VITE_API_URL` come from [`docker-compose.prod.yml`](../../docker-compose.prod.yml).

Do not document or require `npm run dev` on the host for the standard template workflow.

---

## Configuration

| Variable | Where | Notes |
|----------|--------|--------|
| `VITE_API_URL` | Root `.env` | Typically `/api` behind nginx |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Root `.env` (prod compose) | Optional; used on registration billing UI |

---

## Desktop installer (TODO)

End users will download the Windows desktop app as a bundled `.exe` installer from this web UI (built from [`../desktop/`](../desktop/) with `npm run dist`). Hosting, versioning, and the download page are not implemented in the template yet—see [`../desktop/README.md`](../desktop/README.md).

---

## Further reading

- [Quick start (root)](../../README.md#quick-start-development)
- [Applications overview](../README.md)
- [Backend API](../backend/README.md) — contracts and auth cookies
