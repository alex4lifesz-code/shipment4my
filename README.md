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

## Data Location

SQLite file:

- `data/shipment-tracker.db`

Seed source:

- `server/seedData.js`

## API Endpoints

- `GET /api/health` health check
- `GET /api/data` get full dataset
- `PUT /api/data` save full dataset
- `GET /api/export` export all data as JSON
- `POST /api/import` import full dataset JSON
- `DELETE /api/data` delete all data
- `POST /api/reset` reset database to seed data

## Implemented Data Operations

Frontend action buttons currently support:

- Export all data
- Import JSON data
- Delete all data
- Reset to seed data
