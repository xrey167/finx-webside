# Branch & Ticket Workflow – Phase 1

## 1. Branch Creation Commands
```bash
git checkout feature/frontend-foundation
git pull origin feature/frontend-foundation

# Data Engineering
git checkout -b feature/data-ingestion-phase1

# Backend Options Suite
git checkout -b feature/backend-options-suite

# Frontend Market Tide UI
git checkout -b feature/frontend-market-tide

# Frontend Pricing/Paywall
git checkout -b feature/frontend-pricing-paywall

# Data Visualization
git checkout -b feature/dataviz-market-tide

# Platform Alerts & Entitlements
git checkout -b feature/platform-alerts-entitlements

# UX Design (if required in repo)
git checkout -b feature/ux-phase1
```

> Nach Branch-Erstellung: `git push -u origin <branch>`

## 2. Ticket Workflow (Empfehlung)
1. **Create Tickets** in Jira/Trello je Epic/Story aus [phase1-implementation-plan.md](./phase1-implementation-plan.md) & [phase1-backlog.md](./phase1-backlog.md).
2. **Workflow Columns:** `Backlog` → `Ready` → `In Progress` → `Code Review` → `QA` → `Done`.
3. **Definition of Ready:**
   - Akzeptanzkriterien geklärt
   - Dependencies benannt
   - Teststrategie notiert
4. **Definition of Done:** Tests bestanden, Dokumentation aktualisiert, Changelog-Eintrag bei Bedarf.
5. **Sync:** Daily Async Updates (Slack/Notion), Weekly Standups je Droid.

## 3. Pull Request Guidelines
- Ziel-Branch: `feature/frontend-foundation`.
- Checks: Lint, Tests, Coverage, Data QA (falls zutreffend).
- Reviewer: mind. 1 cross-team Reviewer (z. B. Backend ↔ Data Eng).
- PR Template (empfohlen): Summary, Testing, Checklist, Related Tickets.

## 4. Release Coordination
- Nach Merge: Fullstack Droid trägt Änderungen in [changelog-phase1.md](./changelog-phase1.md) ein.
- Wöchentliche Release Candidates (Freitag), Smoke Tests auf Staging.

---

Dieses Dokument unterstützt alle Droids beim Starten neuer Branches und hält den Ticket-Flow konsistent.
