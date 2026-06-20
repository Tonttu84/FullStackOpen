# Full Stack Open — Part 7

> This README was generated with AI assistance (Claude Code).

Part 7 exercises for the Full Stack Open course. Contains two projects:

- **routed-anecdotes** — exercises 7.1–7.6 (custom hooks)
- **bloglist** — exercises 7.7–7.20 (extended bloglist monorepo)

---

## routed-anecdotes (exercises 7.1–7.6)

Custom hooks practice: `useField` for form input management and `useAnecdotes` for server communication.

### Setup

```bash
cd routed-anecdotes
npm install
```

### Running

```bash
# Start the JSON server (port 3001)
npm run server

# Start the Vite dev server (in a separate terminal)
npm run dev
```

---

## bloglist (exercises 7.7–7.20)

A full-stack blog application with a React frontend and Express/MongoDB backend, managed as a monorepo.

**Tech stack:** React, React Router, Zustand, styled-components, Vite, Express, Mongoose, Playwright

### Project structure

```
bloglist/
├── bloglist-backend/    # Express + MongoDB API
├── bloglist-frontend/   # React + Vite SPA
└── playwright-tests/    # End-to-end tests
```

### Environment variables

Create the following `.env` files before running the project.

**`bloglist/bloglist-backend/.env`**

```
MONGODB_URI=<your MongoDB connection string>
SECRET=<your JWT secret>
PORT=3001
```

**`bloglist/bloglist-frontend/.env`**

```
VITE_BACKEND_PORT=3001
```

### Setup

Install dependencies for all packages from the monorepo root:

```bash
cd bloglist
npm install
npm --prefix bloglist-backend install
npm --prefix bloglist-frontend install
npm --prefix playwright-tests install
```

### Running

All commands are run from the `bloglist/` directory.

```bash
# Run frontend and backend concurrently
npm start

# Or run separately
npm run dev:backend
npm run dev:frontend
```

### Testing

```bash
cd bloglist

# Backend tests (Node test runner)
npm run test:backend

# Frontend unit tests (Vitest)
npm run test:frontend

# End-to-end tests (Playwright — requires both servers running)
npm run test:playwright

# All tests
npm test
```

### Lint & format

```bash
cd bloglist
npm run lint
npm run format
```

---

## Exercises covered

| Exercise | Description |
|----------|-------------|
| 7.1 | `useField` custom hook |
| 7.2 | `useField` with reset |
| 7.3 | Fix invalid DOM prop spread |
| 7.4 | `useAnecdotes` — fetch from server |
| 7.5 | `useAnecdotes` — add anecdote |
| 7.6 | `useAnecdotes` — delete anecdote |
| 7.7 | Frontend and backend in same repository |
| 7.8 | Error boundary |
| 7.9 | Non-existing routes (404 page) |
| 7.10 | Prettier integration |
| 7.11 | Zustand — notification store |
| 7.12 | Zustand — blog store |
| 7.13 | Like and delete functionality |
| 7.14 | Zustand — user store |
| 7.15 | `persistentUser` service + `useField` in forms |
| 7.16 | Users view |
| 7.17 | Individual user view |
| 7.18 | Comments — display |
| 7.19 | Comments — add |
| 7.20 | Styling (styled-components + MUI) |
