# Project

This repository contains a Vite + React frontend and an Express + MongoDB backend (server folder).

## Quick start (local development)

1. Install dependencies (root + server):

```powershell
cd C:\projects\project
npm run install:all
```

2. Create `.env` for the server (copy from example):

```powershell
cd server
copy .env.example .env
# Edit server/.env to set MONGODB_URI and JWT_SECRET
```

3. Start backend (recommended port 5001):

```powershell
cd C:\projects\project\server
$env:PORT=5001
npm run dev
```

4. Start frontend (point to backend API):

```powershell
cd C:\projects\project
$env:VITE_API_URL='http://localhost:5001/api'
npm run dev
```

5. Test contact form manually in the browser or via curl/PowerShell:

- Get a visitor token:

```powershell
Invoke-RestMethod -Uri 'http://localhost:5001/api/auth/token' -Method Get
```

- Submit a contact message (PowerShell example):

```powershell
$tokenResp = Invoke-RestMethod -Uri 'http://localhost:5001/api/auth/token' -Method Get
$token = $tokenResp.token
$body = @{ name='Test Visitor'; email='visitor@example.com'; message='Hello from test'; phone=''; subject='Test' } | ConvertTo-Json -Depth 5
Invoke-RestMethod -Uri 'http://localhost:5001/api/contact' -Method Post -Headers @{ Authorization = "Bearer $token"; 'Content-Type' = 'application/json' } -Body $body
```

6. Notes & troubleshooting

- Ensure MongoDB is running or `MONGODB_URI` points to a valid MongoDB Atlas cluster.
- For production, set a strong `JWT_SECRET` in `.env` (do not use the dev default).
- If port 5001 is already in use, either stop the occupying process or change `PORT` env before starting the server.

## What I changed for local dev

- `server/index.js`: default port now `5001`; added fallback MongoDB URI and a warning if `JWT_SECRET` is missing.
- `server/.env.example`: example env provided.

If you'd like, I can also add a small npm script to kill whatever is listening on a port (Windows only) or automate starting both servers with `concurrently`. Would you like that?

**Notes & Recommendations**

- **JWT secret:** For production set a strong `JWT_SECRET` in `server/.env`. Do NOT use the development default `change_this_secret_for_dev_only`.
- **MongoDB:** If you don't run MongoDB locally, set `MONGODB_URI` in `server/.env` to your MongoDB Atlas URI.
- **Image uploads:** Uploaded owner images are saved under `server/public/images/attached-profile.jpg` and served at `http://<host>/images/attached-profile.jpg`.

**Utility: free a TCP port (Windows)**

If port 5001 (or another port) is already in use on Windows you can free it using the included PowerShell helper. This avoids having to manually find & kill the process.

From the `server` folder run:

```powershell
# Free port 5001 (change Port as needed)
powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/killPort.ps1 -Port 5001
```

You can also run the npm script that runs the helper:

powershell
cd server
npm run free-port -- 5001

The script will display the PID found and kill it. Use with caution — only run when you know which process you're terminating.

**Automating start of frontend + backend**

- The repository already contains `dev:full` in `package.json` which uses `concurrently` to start both frontend and server. Ensure you run `npm run install:all` first to install both sets of deps.

If you'd like, I can add cross-platform helpers or integrate more robust startup scripts.
