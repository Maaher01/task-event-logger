# task-event-logger

A minimal MERN app with TypeScript, Express, MongoDB, and React + Tailwind CSS.

## Backend

1. Navigate to `server`
2. Copy `.env.example` to `.env`
3. Set `MONGO_URI` and optionally `PORT`
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the backend:
   ```bash
   npm start
   ```

## Frontend

1. Navigate to `client`
2. Copy `.env.example` to `.env`
3. Set `VITE_API_URL` to your backend URL, for example `http://localhost:5000`
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the frontend:
   ```bash
   npm run dev
   ```

## Notes

- Backend API routes:
  - `GET /api/tasks`
  - `PATCH /api/tasks/:id/toggle`
  - `GET /api/logs`
- The frontend consumes these routes from `VITE_API_URL`.
