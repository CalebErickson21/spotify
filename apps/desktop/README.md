# `<your-project>` — Desktop

Electron + TypeScript shell for **`<your-project>`**, scaffolded with [electron-vite](https://electron-vite.org/).

---

## Status

| Area | Status |
|------|--------|
| **Docker Compose (dev)** | **TODO** — a `desktop` service in [`docker-compose.dev.yml`](../../docker-compose.dev.yml) is not wired up yet. Until then, run Electron on the host (below) while the web stack uses Compose. |
| **Distribution** | **TODO** — production builds will be a Windows `.exe` installer (NSIS via `electron-builder`), hosted and downloaded from the [web app](../web/README.md), not run as a Compose service. |

---

## Host development (current workflow)

Run the desktop app on your machine while Postgres, backend, and web run via [Quick start (development)](../../README.md#quick-start-development):

```bash
cd apps/desktop
npm install
VITE_API_URL=http://localhost/api npm run dev
```

Use the same API base URL convention as the web app (`/api` on the nginx origin).

---

## Building the Windows installer

Configure `build.appId` and `build.productName` in [`package.json`](package.json), then:

```bash
cd apps/desktop
npm install
npm run dist
```

`npm run build` only runs `tsc` and `vite build`; `npm run dist` adds `electron-builder --win`. The resulting installer is what the web frontend will eventually expose for download (serving/upload flow is still **TODO**).

---

## Further reading

- [Applications overview](../README.md)
- [Web app](../web/README.md)
- [Backend API](../backend/README.md)
