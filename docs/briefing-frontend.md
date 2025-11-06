# FinX Frontend Droid

Repository: https://github.com/xrey167/finx-webside
Branch: feature/frontend-foundation
Directory: /frontend/

Setup:
1. Create Next.js 14 + TypeScript + Tailwind
2. Dark Space Purple theme (#2D1B69, #C084FC, #0F0F23)
3. Authentication pages (login, register)
4. Dashboard layout
5. UI components library

Git Workflow:
- Start: `git fetch --all --prune` ➜ `git checkout feature/frontend-foundation` ➜ `git pull --rebase origin feature/frontend-foundation`
- Install deps (`npm install`) and align shared types from `shared/`
- Commit with conventional messages (e.g. `feat(ui): ...`), rebase before pushing
- Run `npm run lint`/`npm run build`, ensure clean `git status`, then `git push origin feature/frontend-foundation`

Tech: Next.js 14, TypeScript, Tailwind CSS, Zustand
Timeline: 2-3 weeks
