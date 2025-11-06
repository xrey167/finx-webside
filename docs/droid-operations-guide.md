# Droid Operations Guide – Phase 1

## 1. Daily Workflow (All Droids)
1. **Sync Repo** – `git fetch --all --prune` & `git pull --rebase origin <branch>`.
2. **Check Tickets** – Board filter `phase1` → Assign/Update status per [planning-checklist.md](./planning-checklist.md).
3. **Plan Tasks** – Review relevant sections in:
   - [phase1-backlog.md](./phase1-backlog.md)
   - [phase1-implementation-plan.md](./phase1-implementation-plan.md)
   - [tickets-phase1.md](./tickets-phase1.md)
4. **Execute** – Implement code/design/data tasks within assigned branch.
5. **Validate** – Run tests/QA (see Section 3) before opening PR.
6. **Update Docs** – Changelog, UX links, monitoring dashboards as needed.
7. **Standup Note** – Summarize progress/blockers in project comms channel.

## 2. Branching & PR Cadence
- Branch names already provisioned (see [branch-plan.md](./branch-plan.md)).
- **Feature Cycle:**
  1. Create/checkout dedicated branch.
  2. Implement tasks → commit with conventional message.
  3. Push to origin; open PR against `feature/frontend-foundation`.
  4. Request cross-team reviewer.
  5. Address feedback within 24h.
  6. Merge after approvals & passing checks.
- **Weekly Rhythm:**
  - Monday: Sprint planning, confirm priorities.
  - Midweek: Feature demos/QA syncs.
  - Friday: Merge ready PRs, update changelog, prep release candidate.

## 3. Validation Matrix
| Droid | Required Checks |
|-------|-----------------|
| Data Engineering | Unit tests (`npm test`/`pytest`), data quality report, ingestion dry-run |
| Backend | `npm run lint`, `npm run test` (if available), integration tests for APIs |
| Frontend | `npm run lint`, `npm run test`, visual check of components, Storybook (if used) |
| Data Viz | Rendering performance tests, accessibility review for charts |
| Fullstack | CI pipelines, security scans, load tests (alerts), changelog update |
| UX Design | Figma prototyping, accessibility checklist, dev handoff notes |

## 4. Documentation Touchpoints
- Update relevant docs after each milestone:
  - `phase1-architecture.md` – structural changes.
  - `phase1-backlog.md` – if responsibilities shift.
  - `ux-links.md` – replace placeholders with final links.
  - `changelog-phase1.md` – after merges/deploys.
  - `planning-checklist.md` – if process evolves.

## 5. Communication Protocol
- **Daily async update template:**
  - What was done yesterday?
  - Plan for today?
  - Blockers?
- **Escalation:** raise blockers >24h to Product Ops/Fullstack.
- **Design Reviews:** schedule via shared calendar; link Figma prototypes.

## 6. Tooling Overview
- GitHub PRs, Jira/Trello board, Figma, Notion/Docs (current repo), Monitoring dashboards (Prometheus/Grafana), Alert systems (SendGrid/Expo), Data pipelines (Kafka/SQS).

Follow this guide to keep all Droids aligned and autonomous throughout Phase 1.
