# `<your-project>` — Application package (`app/`)

Layered FastAPI layout for **`<your-project>`**, designed to scale from a small service to production. Each folder has a clear responsibility to keep concerns separated, improve testability, and reduce coupling.

---

## Running

Run the backend through **Docker Compose** from the repository root—see [Quick start](../../../README.md#quick-start-development) and [`../README.md`](../README.md).

With the dev stack up, optional inspection:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec backend sh
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f backend
```

API docs in dev: `http://localhost/api/docs` (via nginx).

---

## `/api` — HTTP / Transport Layer

**Purpose:**  
Defines how external clients interact with the application over HTTP.

**What goes here:**
- `APIRouter` definitions
- Route handlers (`GET`, `POST`, etc.)
- Dependency injection (`Depends`)
- Request / response validation
- HTTP status codes and exceptions
- API versioning (e.g. `/api/v1`)

**What does NOT go here:**
- Business logic
- Complex database operations
- Cross-entity workflows

**Example contents:**
```
api/
├── deps.py
├── v1/
│ ├── router.py
│ └── endpoints/
│ ├── auth.py
│ ├── users.py
│ └── jobs.py
```

**Rule of thumb:**  
Routes should be thin and delegate real work to the service layer.

---

## `/auth` — Authentication & Authorization

**Purpose:**  
Handles identity, authentication flows, and permission utilities.

**What goes here:**
- JWT / OAuth logic
- Token creation and verification
- Password hashing / verification
- `get_current_user` dependencies
- Auth-related helpers and exceptions

**What does NOT go here:**
- Business rules unrelated to auth
- Application workflows

**Example contents:**
```
auth/
├── jwt.py
├── password.py
├── dependencies.py
└── permissions.py
```

---

## `/core` — Application Configuration & Infrastructure

**Purpose:**  
Holds application-wide configuration and infrastructure concerns.

**What goes here:**
- Environment configuration (`BaseSettings`)
- Logging setup
- Security constants
- App-level utilities
- Feature flags or global constants

**What does NOT go here:**
- Business logic
- Route handlers
- Database queries

**Example contents:**
```
core/
├── config.py
├── logging.py
├── security.py
└── settings.py
```

---

## `/db` — Database Setup & Session Management

**Purpose:**  
Defines how the application connects to and manages the database.

**What goes here:**
- SQLAlchemy engine setup
- Session creation
- Base declarative model
- DB dependencies (`get_db`)
- Transaction helpers

**What does NOT go here:**
- Business rules
- API logic

**Example contents:**
```
db/
├── base.py
├── session.py
└── init_db.py
```

---

## `/models` — ORM Models (Persistence Layer)

**Purpose:**  
Defines database tables and relationships.

**What goes here:**
- SQLAlchemy ORM models
- Table relationships
- Indexes and constraints

**What does NOT go here:**
- Request validation
- Business logic
- API schemas

**Example contents:**
```
models/
├── user.py
├── job.py
└── application.py
```

---

## `/schemas` — Pydantic Models (Validation Layer)

**Purpose:**  
Defines data shapes for requests, responses, and internal transfers.

**What goes here:**
- Request payload models
- Response models
- Shared data contracts
- Serialization logic

**What does NOT go here:**
- Database logic
- Business rules

**Example contents:**
```
schemas/
├── user.py
├── job.py
└── common.py
```

---

## `/services` — Business Logic / Use Cases

**Purpose:**  
Contains the core business logic of the application.

**What goes here:**
- Application workflows
- Business rules
- Cross-model operations
- Side effects (emails, events, queues)
- Permission checks beyond basic auth

**What does NOT go here:**
- HTTP concerns
- FastAPI dependencies
- Raw request/response objects

**Example contents:**
```
services/
├── user_service.py
├── job_service.py
└── notification_service.py
```

**Rule of thumb:**  
If FastAPI were removed, everything in this folder should still make sense.

---

## Architecture Flow
```
Client
↓
API (routes, validation, auth)
↓
Services (business logic)
↓
DB / Models (persistence)
```

---

## Guiding Principles

- Thin routes, fat services
- No business logic in the API layer
- No HTTP concerns in the service layer
- Models represent persistence, schemas represent data contracts
- Configuration and infrastructure live in `core`

