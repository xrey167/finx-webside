# Phase 1 Implementation Plan – Unusual Activity Suite

## 1. Engineering Delivery Plan

### 1.1 Epics & Owners
| Epic ID | Title | Primary Squad | Summary |
|---------|-------|---------------|---------|
| E1 | Data Ingestion Foundation | Data Engineering | Set up options, political/insider, and calendar feed pipelines with normalization. |
| E2 | Options Spike Engine | Backend | Implement trigger models, persistence, and API endpoints for unusual options events. |
| E3 | Market Tide Analytics | Backend/Data Viz | Aggregate market-wide metrics and expose via REST/WebSocket for dashboards. |
| E4 | Periscope Exposure | Backend/Data Viz | Calculate strike-level gamma/delta exposure and serve optimized ladder visualizations. |
| E5 | Political & Insider Tracker | Backend | ETL for public filings, impact scoring, and alert hooks. |
| E6 | Event Calendar Suite | Backend/Frontend | Ingest multi-calendar feeds, subscription management, and UI integration. |
| E7 | Alerts & Delivery | Platform/DevOps | Unified alert rule engine plus push/email channels with rate limiting. |
| E8 | Pricing & Entitlements | Platform | Paywall, trials, and module access enforcement across APIs. |
| E9 | Observability & Compliance | DevOps/Legal | Monitoring, audit logging, disclaimers, and data quality governance. |

### 1.2 User Stories per Epic

#### E1 – Data Ingestion Foundation
- **DE-1**: _Als Data Engineer_ möchte ich stündlich Optionsketten von EODHD abrufen und in ein Rohformat schreiben, _damit_ abgeleitete Services konsistente Daten erhalten. **Acceptance:** Scheduler läuft, Fehlversuche <1 %, Schema-Validierung lückenlos.
- **DE-2**: _Als Data Engineer_ möchte ich politische/insider Quellen konsolidieren und doppelte Meldungen deduplizieren, _damit_ Alerts nicht mehrfach ausgelöst werden. **Acceptance:** Deduplizierungsrate ≥95 %, manuelle QA Sample <2 % Fehler.
- **DE-3**: _Als Data Engineer_ möchte ich alle Event-Kalender in eine einheitliche Tabelle mappen, _damit_ UI und Alerts keine Sonderlogik benötigen. **Acceptance:** 100 % Pflichtfelder befüllt, Quelle in `metadata` enthalten.

#### E2 – Options Spike Engine
- **BE-1**: _Als Analyst_ möchte ich eine API, die ungewöhnliche Optionsaktionen nach Ticker und Triggern filtert, _damit_ ich schnell Opportunities identifizieren kann. **Acceptance:** `/api/options/activity` liefert <500 ms bei Top-Queries, Filter funktionieren kombiniert.
- **BE-2**: _Als Nutzer_ möchte ich Trade-Details inkl. Historie sehen, _damit_ ich Kontext verstehe. **Acceptance:** Detail-Endpunkt liefert Timeline, Notional, Triggerflags, Market Data Snapshot.
- **BE-3**: _Als Nutzer_ möchte ich Alerts für bestimmte Trigger konfigurieren, _damit_ ich informiert werde. **Acceptance:** Alert-Konfiguration speichert, Test-Alert zugestellt binnen 1 min.

#### E3 – Market Tide Analytics
- **MT-1**: Aggregationsjob berechnet Put/Call Ratio & Net Gamma je Sektor alle 15 min. **Acceptance:** Job-Latenz <2 min, verifizierter Vergleich gegen Stichproben.
- **MT-2**: WebSocket streamt Market Tide Updates an UI. **Acceptance:** Roundtrip <1.5 s, Reconnect-Handling vorhanden.
- **MT-3**: REST Endpoint liefert historische Buckets für Charting. **Acceptance:** Pagination & caching aktiv, Resultsets verifizierte Werte.

#### E4 – Periscope Exposure
- **PS-1**: Service berechnet Gamma/Delta Profile für ausgewählte Ticker/Expiries. **Acceptance:** Ergebnis stimmt mit Referenz (OptionsPriceLib) ±2 % überein.
- **PS-2**: API liefert Ladder/Chart-ready JSON. **Acceptance:** Response <700 ms für Top-50 Ticker, includes flip price.
- **PS-3**: Alert flag wenn Spot Preis Gamma Flip nahe kommt. **Acceptance:** Simulation triggert Alert bei ±1 % Spot-Abstand.

#### E5 – Political & Insider Tracker
- **PI-1**: ETL importiert Form 4/13F und Capitol Trades täglich. **Acceptance:** ≥99 % Erfolgsquote, Fehlerreport mit Retry.
- **PI-2**: Impact Score Berechnung speichert Ranking. **Acceptance:** Score 0–100, Tests mit bekannten Cases.
- **PI-3**: API filtert nach Person, Partei, Ticker. **Acceptance:** Response <400 ms, Filter kombinierbar.

#### E6 – Event Calendar Suite
- **EV-1**: Nutzer können Kalender abonnieren und Offsets wählen. **Acceptance:** DB speichert Präferenzen, UI zeigt Badge.
- **EV-2**: API liefert Impact Level & erwartete Volatilität. **Acceptance:** Data fields validiert, fallback defaults vorhanden.
- **EV-3**: Export (iCal/CSV) verfügbar. **Acceptance:** Datei generiert korrekt, UTC→Lokale Zeit testbar.

#### E7 – Alerts & Delivery
- **AL-1**: Redis Stream orchestriert Pending Alerts. **Acceptance:** Load-Test 1k alerts/min ohne Verlust.
- **AL-2**: Push/E-Mail Gateways integriert. **Acceptance:** Expo & SendGrid sendet, Bounces geloggt.
- **AL-3**: Rate Limiter verhindert >50 Alerts/Tag/User. **Acceptance:** Unit Tests + Chaos Test.

#### E8 – Pricing & Entitlements
- **PE-1**: Trial Workflow (Start, Conversion, Cancel). **Acceptance:** Trial state in DB, auto-expire nach 7 Tagen, Emails versendet.
- **PE-2**: API Middleware prüft Options-Modul-Zugriff. **Acceptance:** Unauthorized Nutzer erhalten 403, logs auditierbar.
- **PE-3**: Paywall Screens eingebunden. **Acceptance:** UI nach Figma, Stripe/Test Payment Sandbox.

#### E9 – Observability & Compliance
- **OC-1**: Prometheus Dashboards für ingestion latency & alert throughput. **Acceptance:** Grafana Boards live, alert thresholds gesetzt.
- **OC-2**: Audit Logs für Datenmanipulation und Alert Versand. **Acceptance:** Log Retention 90 Tage, PII maskiert.
- **OC-3**: Disclaimers eingebettet und rechtlich geprüft. **Acceptance:** Legal sign-off dokumentiert.

## 2. UX Wireframe & Prototype Plan

| Flow | Deliverable | Fidelity & Tools | Acceptance Criteria | Owner |
|------|-------------|------------------|---------------------|-------|
| Unusual Activity Dashboard | Information Architecture + Hi-Fi screens | Figma (Auto-Layout), Responsive (1440/1024/768) | Tabs, Filters, Detail Drawer & Alert Modal vollständig definiert | UX Lead |
| Market Tide | Data visualization concepts (chart widgets, heatmap) | Figma + FigJam for data exploration | KPI cards & charts map auf reale Daten-Samples | Data Viz Designer |
| Periscope Exposure | Ladder & Scenario interactions | Figma prototype + Principle animation | Gamma Flip Alerts & scenario slider flows clickable | UX/Proto Specialist |
| Political & Insider Feed | Card layout + story mode | Figma hi-fi mobile & desktop variants | Impact badge, source link, story builder blueprint | UX Lead |
| Event Calendars | Calendar/List view, subscription settings | Figma hi-fi + component specs for Calendar component | Impact tagging, alert toggles, export actions abgedeckt | Product Designer |
| Alerts Management | Alert creation wizard | Figma mid→hi-fi, includes edge states | Validation messages, channel selection, summary step | UX Lead |
| Pricing/Paywall | Module upsell screens + trial flow | Figma hi-fi + copy guidelines | CTA hierarchy, trial confirmation email preview | Growth Designer |

### UX Acceptance Checklist
- Accessibility: WCAG AA for color contrast, keyboard navigation for modals.
- Design Tokens: Align with Dark Space Purple palette + spacing/typography scale.
- Annotation Layer: Each flow annotated mit API contracts & success/error states.
- Developer Handoff: Figma Inspect + component mapping to existing design system.

## 3. Data Feed Validation & Testing Plan

### 3.1 Options (EODHD, Lenz+Partner)
- **Credential Setup:** Secure API key storage (Vault/Secrets Manager), rotate monthly.
- **Schema Validation:** JSON schema tests (Ajv) to confirm presence of greeks, volume, oi.
- **Latency Benchmarks:** Daily cron logs fetch delay; SLA ≤15 min after hour close.
- **Backfill Audit:** Compare sampled tickers vs. broker data to ensure volume accuracy ±5 %.
- **Monitoring:** Prometheus exporter capturing response codes, payload size, retries.

### 3.2 Political & Insider Sources
- **Source Mapping:** Build connectors for Capitol Trades, Senate/House Watcher (CSV), EDGAR RSS.
- **Data Quality:** Random sample cross-check vs. original filing; mismatch <5 %.
- **Duplicate Detection:** Hash (person, ticker, date, type, amount) to deduplicate.
- **Legal Review:** Document terms of use & attribution requirements.
- **Alert Dry Run:** Simulate pipeline with 30 days history to confirm scoring distribution.

### 3.3 Event Calendars
- **Feed Inventory:** Earnings (EODHD), Trump Tracker (public API), POTUS Schedule (White House releases), FDA Calendar (FDA.gov RSS), Economics (Econoday/FRED).
- **Normalization Tests:** Unit tests for timezone conversion & impact level mapping.
- **Subscription QA:** Staging accounts subscribe/unsubscribe; ensure notifications fire at 24 h & 1 h.
- **Fallback Handling:** If source unavailable, show banner + last successful fetch timestamp.

### 3.4 Integration Readiness Checklist
- Smoke tests automated via CI (daily) hitting all ingestion endpoints.
- End-to-end test scenario: ingest → trigger → alert send (synthetic data) weekly.
- Data catalog entry per table/field to ensure documentation for future phases.
- Incident response runbook including escalation contacts for each data provider.

---

Dieses Implementierungsdokument ergänzt die Architektur und Strategie, bietet Umsetzungsrichtlinien für Engineering, UX und Data-Teams und dient als Referenz für Sprint-Planung und Qualitätssicherung.
