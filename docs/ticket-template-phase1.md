# Phase 1 Ticket Template & Mapping

## 1. Ticket Metadata
- **Title:** `<Epic ID> – <Concise Action>` (e.g., `E2-BE1 – Implement /api/options/activity`)
- **Type:** Story / Task / Bug (gemäß Workflow)
- **Epic Link:** Verweise auf passende Epic (E1–E9)
- **Priority:** High / Medium / Low
- **Assignee:** Zuständiger Droid / Entwickler*in
- **Labels:** `phase1`, `unusual-activity`, ggf. `frontend`, `backend`, `data` etc.
- **Branch:** Referenz auf Git-Branch (z. B. `feature/backend-options-suite`)

## 2. Description Template
```
## Ziel
<Kurzbeschreibung des Outcomes>

## Akzeptanzkriterien
- [ ] Kriterium 1
- [ ] Kriterium 2
- [ ] Kriterium 3

## Tasks
- [ ] Schritt 1
- [ ] Schritt 2
- [ ] Schritt 3

## Tests / Validation
- [ ] Unit Tests
- [ ] Integration Tests
- [ ] Manuelle QA (Beschreibung)

## Dependencies
- [ ] Ticket- oder Branch-Referenzen

## Anhänge
- Architektur/Specs: phase1-architecture.md / phase1-implementation-plan.md
- Design: ux-links.md (relevanter Flow)
- Daten: phase1-backlog.md Abschnitt
```

## 3. Epic → Ticket Mapping (Beispiele)
| Epic | Beispiel-Tickets | Branch |
|------|------------------|--------|
| **E1 Data Ingestion** | `E1-DE1 – Options ETL Scheduler`, `E1-DE2 – Political Dedup Service`, `E1-DE3 – Calendar Normalizer` | `feature/data-ingestion-phase1` |
| **E2 Options Engine** | `E2-BE1 – /api/options/activity`, `E2-BE2 – Trade Detail Aggregator`, `E2-BE3 – Alert Config Storage` | `feature/backend-options-suite` |
| **E3 Market Tide** | `E3-BE1 – Sector Put/Call Aggregation`, `E3-FR1 – Market Tide Dashboard`, `E3-DV1 – Heatmap Widget` | `feature/backend-options-suite`, `feature/frontend-market-tide`, `feature/dataviz-market-tide` |
| **E4 Periscope** | `E4-BE1 – Gamma Ladder Calculation`, `E4-DV1 – Scenario Slider`, `E4-FR1 – Periscope UI Integration` | Branches siehe Tabelle |
| **E5 Political/Insider** | `E5-BE1 – Impact Scoring`, `E5-FR1 – Insider Feed UI` | `feature/backend-options-suite`, `feature/frontend-market-tide` |
| **E6 Calendars** | `E6-BE1 – Calendar Subscriptions`, `E6-FR1 – Calendar UX`, `E6-AL1 – Calendar Alerts` | Backend/Frontend/Platform Branches |
| **E7 Alerts** | `E7-FS1 – Redis Stream Worker`, `E7-FS2 – Push Delivery`, `E7-FS3 – Rate Limiter` | `feature/platform-alerts-entitlements` |
| **E8 Pricing** | `E8-FS1 – Stripe Setup`, `E8-FR1 – Paywall UI`, `E8-FS2 – Entitlement Middleware` | Platform & Frontend branches |
| **E9 Observability** | `E9-FS1 – Prometheus Dashboard`, `E9-FS2 – Audit Log Pipeline`, `E9-FS3 – Legal Disclaimers` | `feature/platform-alerts-entitlements` |

## 4. Definition of Ready Checklist
- [ ] Ziele & Akzeptanzkriterien ausgefüllt
- [ ] Relevante Dokumente verlinkt
- [ ] Auswirkungen auf andere Teams geklärt (Dependencies)
- [ ] Teststrategie notiert
- [ ] Stakeholder informiert (falls cross-team)

## 5. Definition of Done Reminder
- [ ] Code gemergt (Branch → `feature/frontend-foundation`)
- [ ] Tests/QA bestanden
- [ ] Dokumentation aktualisiert (Changelog, ggf. README)
- [ ] Alerts/Monitoring konfiguriert (falls zutreffend)
- [ ] Ticket auf `Done` gesetzt & Review-Kommentare adressiert

Dieses Template kann 1:1 in Jira/Trello kopiert und pro Ticket angepasst werden.
