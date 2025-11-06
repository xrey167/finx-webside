# Phase 1 Backlog & Coordination – Unusual Activity Suite

## 0. Workstreams & Branches
| Workstream | Primary Branch | Lead Droid |
|------------|----------------|------------|
| Data Ingestion & ETL | `feature/data-ingestion-phase1` | Data Engineering Droid |
| Options Engine & APIs | `feature/backend-options-suite` | Backend Droid |
| Market Tide & Periscope UI | `feature/frontend-market-tide` | Frontend Droid |
| Data Visualizations | `feature/dataviz-market-tide` | Data Viz Droid |
| Alerts & Entitlements | `feature/platform-alerts-entitlements` | Fullstack Droid |
| Pricing & Paywall UX | `feature/frontend-pricing-paywall` | Frontend Droid (Growth support) |
| UX Design System | `feature/ux-phase1` | UX Design Droid |

All branches fork from `feature/frontend-foundation` (current integration base) and were initialized on 2025-11-06.

## 1. Sprint Plan Overview (12 Weeks)
| Sprint | Goal | Key Deliverables | Dependencies |
|--------|------|------------------|--------------|
| S1 (Weeks 1–2) | Data Foundations | Ingestion pipelines (Options, Political, Calendars); schema migrations; basic monitoring | None |
| S2 (Weeks 3–4) | Options Spike Engine | Trigger models, `/api/options/activity`, alert storage, sample UI data | Requires S1 data tables |
| S3 (Weeks 5–6) | Market Tide Analytics | Aggregations, REST/WebSocket endpoints, initial dashboard components | S1+S2 |
| S4 (Weeks 7–8) | Periscope Exposure | Gamma ladder calculations, UI prototypes, alerts | S2 data integrity |
| S5 (Weeks 9–10) | Political/Insider & Calendars | ETL UI, calendar subscriptions, alert flows | S1 feeds |
| S6 (Weeks 11–12) | Pricing, Trials & QA | Paywall, entitlements, integration tests, Beta launch checklist | All previous |

## 2. Task Breakdown by Droid

### 2.1 Data Engineering Droid (`feature/data-ingestion-phase1`)
- [ ] Provision ETL project structure (Python/Node microservices as per architecture).
- [ ] Implement Options fetcher (EODHD + Lenz) with schema validation tests.
- [ ] Configure Kafka/SQS topics `options.raw`, `options.signals`.
- [ ] Build political/insider ingestion scripts with dedupe logic.
- [ ] Normalize event calendar feeds, load into `events_calendar` table.
- [ ] Set up Prometheus exporters and data quality dashboards.
- [ ] Deliver runbooks (retry policies, escalation contacts).

### 2.2 Backend Droid (`feature/backend-options-suite`)
- [ ] Create Prisma migrations for Phase 1 tables (options_activity, market_tide_summary, etc.).
- [ ] Implement Options Spike Engine services + repository layer.
- [ ] Build REST endpoints `/api/options/activity`, `/api/options/activity/:id`.
- [ ] Integrate alert enqueuing to Redis stream.
- [ ] Develop Market Tide batch jobs & endpoints.
- [ ] Expose Periscope calculations API stub (consumes Data Viz service until final).
- [ ] Write automated tests (integration + unit) for trigger logic.

### 2.3 Frontend Droid (`feature/frontend-market-tide`, `feature/frontend-pricing-paywall`)
- [ ] Translate Figma wireframes (Spikes Dashboard, Market Tide, Periscope) into React components.
- [ ] Build filter panels, tables, drawers, alert modals.
- [ ] Implement WebSocket handling for Market Tide updates.
- [ ] Create calendar subscription UI + notifications settings.
- [ ] Implement pricing/paywall + trial flows (gated routes, CTA surfaces).
- [ ] Ensure responsive layouts (1440/1024/768) and theme adherence.

### 2.4 Data Viz Droid (`feature/dataviz-market-tide`)
- [ ] Design and implement charts (Put/Call ratio, gamma exposure, heatmaps) using existing charting stack.
- [ ] Optimise for performance with 10k+ datapoints (virtualization/canvas).
- [ ] Integrate scenario slider & gamma ladder interactions with backend API.
- [ ] Provide reusable visualization utilities for Frontend Droid.

### 2.5 Fullstack Droid (`feature/platform-alerts-entitlements`)
- [ ] Wire alert delivery service (Redis streams → Push/Email).
- [ ] Integrate SendGrid/Expo credentials via secrets manager.
- [ ] Implement rate limiting & dedupe logic.
- [ ] Build trial workflow, Stripe sandbox integration, entitlements middleware.
- [ ] Configure CI/CD pipelines (lint/test/build per branch) and deploy preview environments.
- [ ] Audit logging + compliance instrumentation.

## 3. Cross-Team Checkpoints
- **Weekly Sync (Friday):** verify data integrity, API contracts, UI blockers.
- **Design Handoff (S2 Start):** Figma prototypes finalized before frontend build.
- **QA Milestones:**
  - End of S3: Options & Market Tide end-to-end test.
  - End of S5: Political/Calendar alerts validation.
  - End of S6: Beta readiness (performance, security review).

## 4. Deliverables Checklists

### 4.1 Engineering Definition of Done
- Tests: unit + integration ≥80 % coverage for new modules.
- Docs: README per service (ingestion) with run commands.
- Monitoring: Alert rules configured for ingestion failures (>3 consecutive errors).
- Security: Secrets via env vars, no hardcoded keys.

### 4.2 UX Definition of Done
- Components mapped to Design System tokens.
- Prototype links annotated with behaviours & API dependencies.
- Accessibility audit (keyboard, screen reader labels) complete.

### 4.3 Release Criteria (Phase 1 Beta)
- Options triggers firing with <15 min latency.
- Market Tide dashboard latency <2 s initial load, <500 ms updates.
- Political/Insider feed aggregated daily (no missing filings in sample audits).
- Calendar alerts delivered at correct offsets (24 h & 1 h) in staging test.
- Paywall/trial analytics capturing conversion funnel.

## 5. Coordination Artifacts
- Kanban board: create columns `Backlog`, `In Progress`, `In Review`, `Blocked`, `Done` per droid.
- Link every ticket to relevant document section: Strategy (Appendix), Architecture, Implementation Plan.
- Store Figma links & API schema in shared `docs/ux-links.md` (to be created by Design Droid).
- Maintain changelog in `docs/changelog-phase1.md` (Fullstack Droid owns).

---

Dieses Backlog dient als operativer Leitfaden für alle Droids, synchronisiert mit der Phase-1-Roadmap und dem Implementierungsplan.
