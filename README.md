# AgileFlow – Project & Team Management Platform

---

## 🧠 Overview

AgileFlow is a modern dashboard that empowers teams and freelancers to run Agile workflows end‑to‑end. Track tasks, manage clients, visualize timelines, and collaborate — deployed on **Vercel** (frontend) and **Render** (backend).

---

## 🚀 Key Features

- **Agile Task Boards** – Create sprints, labels, priorities, and drag‑and‑drop status columns.
- **Client & Team Management** – Activity feeds and project‑team associations.
- **Gantt Chart Visualization** – Auto‑generated timelines to track dependencies and deadlines.
- **Table & List Views** – Multiple ways to view and filter your tasks.
- **Search** – Full-text search across tasks, projects, and users.

---

## 🛠️ Tech Stack

| Layer       | Technologies                                           |
|-------------|--------------------------------------------------------|
| Frontend    | Next.js · Tailwind CSS · Redux Toolkit · Material UI  |
| Backend     | Node.js · Express.js · Prisma ORM · PostgreSQL         |
| Hosting     | Vercel (frontend) · Render (backend + PostgreSQL)      |

---

## �� Local Development Setup

```bash
# 1. Clone the repo
git clone https://github.com/CodeReb00t/AgileFlow.git
cd AgileFlow

# 2. Backend setup
cd server
npm install
cp .env.example .env
# → Edit .env with your local PostgreSQL DATABASE_URL
npx prisma migrate dev --name init
npm run seed   # optional: seed sample data
npm run dev
# → Server listening on http://localhost:8000

# 3. Frontend setup
cd ../client
npm install
cp .env.example .env.local
# → Set NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
npm run dev
# → App running on http://localhost:3000
```

---

## 🚀 Deployment

### Frontend → Vercel (Free)

1. Push your repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo.
3. Set **Root Directory** to `client`.
4. Add environment variable:
   - `NEXT_PUBLIC_API_BASE_URL` = `https://your-backend.onrender.com`
5. Deploy. Vercel auto-detects Next.js.

### Backend → Render (Free)

1. Go to [render.com](https://render.com) → **New Web Service** → Connect your repo.
2. Set **Root Directory** to `server`.
3. Set **Build Command**: `npm install && npx prisma generate && npm run build`
4. Set **Start Command**: `node dist/index.js`
5. Add environment variables:
   - `DATABASE_URL` = your PostgreSQL connection string (create a free PostgreSQL instance on Render)
   - `PORT` = `8000`
6. After first deploy, open the **Shell** tab and run:
   ```bash
   npx prisma migrate deploy
   npm run seed   # optional
   ```

### PostgreSQL on Render (Free)

1. Go to Render → **New PostgreSQL** → Create a free instance.
2. Copy the **Internal Database URL**.
3. Paste it as `DATABASE_URL` in your backend web service environment variables.

---

## 🌐 Custom Domain Setup (codereboot.me)

### Frontend (Vercel) → `app.codereboot.me`

1. In Vercel dashboard → your project → **Settings → Domains**.
2. Add `app.codereboot.me`.
3. In your DNS provider, add a **CNAME** record:
   - **Name**: `app`
   - **Value**: `cname.vercel-dns.com`

### Backend (Render) → `api.codereboot.me`

1. In Render dashboard → your web service → **Settings → Custom Domains**.
2. Add `api.codereboot.me`.
3. In your DNS provider, add a **CNAME** record:
   - **Name**: `api`
   - **Value**: `your-backend.onrender.com` (the Render-assigned URL)

> After adding CNAME records, update your Vercel env var:
> `NEXT_PUBLIC_API_BASE_URL` = `https://api.codereboot.me`

---

## 📁 Project Structure

```
AgileFlow/
├── client/          # Next.js frontend (deploy to Vercel)
│   ├── src/
│   ├── public/images/
│   ├── vercel.json
│   └── .env.example
├── server/          # Express backend (deploy to Render)
│   ├── src/
│   ├── prisma/
│   ├── render.yaml
│   └── .env.example
└── README.md
```
