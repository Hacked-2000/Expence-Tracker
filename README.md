# Expense Tracker

Full-stack expense tracker with React frontend and Node.js backend.

## Project Structure

```
Assignment5/
├── ExpenceTracker_frontend/   # React + Vite + MUI
└── ExpenceTracker-backend/    # Express + MongoDB + TypeScript
```

## Setup

### Backend

```bash
cd ExpenceTracker-backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

Runs on `http://localhost:5000`

### Frontend

```bash
cd ExpenceTracker_frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`
