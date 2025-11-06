# FinX Backend Droid

Repository: https://github.com/xrey167/finx-webside
Branch: feature/backend-api
Directory: /backend/

Setup:
1. Node.js + Express + TypeScript
2. PostgreSQL + Prisma
3. JWT Authentication
4. Market data APIs (Alpha Vantage, CoinGecko)
5. WebSocket real-time updates

Git Workflow:
- Start: `git fetch --all --prune` ➜ `git checkout feature/backend-api` ➜ `git pull --rebase origin feature/backend-api`
- Install deps with `npm install` and sync Prisma schema (`npx prisma generate`)
- Commit using conventional messages (e.g. `feat(api): ...`), rebase before push
- Validate via `npm run lint`/`npm run build`, ensure clean `git status`, then `git push origin feature/backend-api`

Endpoints: /api/auth, /api/portfolios, /api/market
Tech: Node.js, Express, PostgreSQL, Redis
Timeline: 2-3 weeks
