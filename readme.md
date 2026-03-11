# MiniJobBoard

A full-stack job board REST API built with Node.js, Express, and MongoDB. This project is a deliberate exercise in applying clean software architecture patterns — including a generic repository layer, service abstraction, and session-based authentication — rather than following a tutorial structure.

---

## Tech Stack

- **Runtime:** Node.js (ESM)
- **Framework:** Express 5
- **Database:** MongoDB via Mongoose
- **Auth:** Passport.js (local strategy) + express-session + connect-mongo
- **Password Hashing:** bcrypt
- **Testing:** Jest + Supertest + mongodb-memory-server
- **Containerization:** Docker + Docker Compose
- **Code Style:** Prettier

---

## Architecture

The project follows a layered architecture with clear separation of concerns:

```
Routes → Controllers → Services → Repository → Mongoose Model
```

- **Routes** — define endpoints and wire to controllers
- **Controllers** — handle HTTP request/response, delegate logic to services
- **Services** — contain business logic, call repositories, throw HTTP errors
- **Repository** — generic base class (`Repository.js`) extended per model; abstracts all DB operations
- **Models** — Mongoose schemas

This means adding a new resource (e.g. Companies, Applications) only requires a new Model, a Repository subclass, and the Service/Controller/Route layers — the base `Repository` is reused.


## API Endpoints

### Jobs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/jobs` | Get all jobs | No |
| GET | `/jobs?search=title` | Search jobs by title (case-insensitive) | No |
| GET | `/jobs/:identifier` | Get job by MongoDB ID or slug | No |
| POST | `/jobs` | Create a new job | Planned |
| PUT | `/jobs` | Update a job | Planned |
| DELETE | `/jobs/:identifier` | Delete a job by ID | Planned |

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` |  Log in |
| DELETE | `/auth/logout` |  Logo ut |

---

## Features

- **Slug generation** — job titles are automatically slugified on creation and updated on title change
- **Dual identifier lookup** — jobs can be fetched by MongoDB ObjectId or human-readable slug
- **Case-insensitive search** — title search uses regex with `$options: "i"`
- **Session persistence** — sessions stored in MongoDB via `connect-mongo`
- **Secure cookies** — `httpOnly`, `secure` in production, 24h expiry
- **Duplicate protection** — register endpoint checks for existing email/username before creation

---

## Testing

Tests use an in-memory MongoDB instance (`mongodb-memory-server`) so no real database connection is needed to run them.

```bash
npm test
```

Test coverage includes:

- Full CRUD for job postings
- Search (partial match, case-insensitive, 404 on no results)
- Slug generation and regeneration on title update
- Lookup by ID and slug
- 404 handling for unknown identifiers
- User registration (duplicate email/username)

---

## Roadmap

- [x] Passport.js login route and session serialization
- [ ] Auth middleware protecting POST / PUT / DELETE job routes
- [ ] Frontend (React + TypeScript, Vite)
- [ ] Job categories with Redis caching (see TODO in `JobPostings.js`)
- [ ] Pagination for job listings
- [ ] User roles (admin vs job seeker)
- [ ] Job application flow

---

## Project Structure

```
server/
├── src/
│   ├── Config/         # DB connection, env config
│   ├── Controllers/    # Route handlers
│   ├── Middleware/     # Auth validation
│   ├── Models/         # Mongoose schemas
│   ├── Repository/     # Generic base + model-specific repositories
│   ├── Routes/         # Express routers
│   ├── Services/       # Business logic
│   ├── Utility/        # Slug generator
│   ├── app.js          # Express app setup
│   └── index.js        # Entry point
└── __tests__/          # Jest test suites
```

---
