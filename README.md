# Shipment Tracker (React + Express + SQLite)

This workspace is set up as a full-stack shipment tracker with:

- React + Vite frontend
- Express backend API
- SQLite database via `better-sqlite3`
- Seeded with your provided shipment, consignee, agent, document, and notification data

## Run

Install dependencies:

```bash
npm install
```

Start frontend + backend together:

```bash
npm run dev
```

Services:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`

## Build

```bash
npm run build
```

## Portainer Deployment

Use [docker-compose.portainer.yml](docker-compose.portainer.yml) as the Portainer stack file.

The stack:

- pulls `ghcr.io/alex4lifesz-code/shipment4my:latest` from GitHub Container Registry
- exposes the service on port 4000
- stores SQLite data in a named volume so it survives redeploys
- restarts automatically unless the container is stopped

Before deploying in Portainer, create a registry credential for `ghcr.io` (username is your GitHub username, password is a GitHub token with package read access) if the package is private.

The image is published automatically by GitHub Actions on pushes to `main`.

## Data Location

SQLite auth database:

- `data/auth.db`

Per-user SQLite data files:

- `data/users/user-<id>.db`

Seed source:

- `server/seedData.js`

## API Endpoints

- `GET /api/auth/status` get auth setup status and current user session (if token is valid)
- `POST /api/auth/register` create a user account (first account becomes admin)
- `POST /api/auth/login` login and receive bearer token
- `POST /api/auth/logout` logout current session
- `GET /api/health` health check
- `GET /api/data` get full dataset for the authenticated user
- `PUT /api/data` save full dataset for the authenticated user
- `GET /api/export` export authenticated user's data as JSON
- `POST /api/import` import full dataset JSON for the authenticated user
- `DELETE /api/data` delete authenticated user's data
- `POST /api/reset` reset authenticated user's database to seed data

All `/api/data`, `/api/export`, `/api/import`, and `/api/reset` routes now require an `Authorization: Bearer <token>` header.

## Implemented Data Operations

Frontend action buttons currently support:

- Export all data
- Import JSON data
- Delete all data
- Reset to seed data
