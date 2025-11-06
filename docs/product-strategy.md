# FinX Product Strategy – Competitor Alignment & Roadmap

## 1. Competitive Context
| Dimension | Unusual Whales | Seasonax | FinX Ambition |
|-----------|----------------|----------|---------------|
| Options Intelligence | Unusual options flow, Market Tide, Periscope (gamma exposure) | n/a | **Unusual Activity Suite** mit Options-Spikes, Market Tide 2.0, Periscope Exposure, Political & Insider Flow |
| Seasonality Insights | n/a | Seasonal charts & backtests, limitierter Filterumfang | **Seasonality++** mit Filter-Stack (Gap, ATR, Monatsrendite, Custom Range) |
| Social Layer | Community chatter, alerts | kaum vorhanden | **Signals & Leaderboards** (AI-kuratierte Demo-Portfolios, abonnierbare Signale) |
| Monetarisierung | Modul-Abos, Premium tiers | Lizenzmodell | **Modulare Bundles** (Options, Seasonality, Social, All Access) mit Trials |
| Platform Experience | Web-first, Fokus Optionsdaten | Fokus auf Desktop-Web | **Web + Mobile App** (Companion), Multi-monitor-ready Workspaces |

## 2. Strategic Pillars
1. **Unusual Activity Suite** – US-Optionsdaten, Anomalie-Erkennung, Market Tide Dashboards, Periscope Market Maker Exposure, Political & Insider Trades, Event-Kalender mit Impact/Volatilität.
2. **Seasonality++** – Multi-Filter-Engine (Monatsrendite, Gap Richtung, ATR, Wochentag, Sektor), Heatmaps & Backtests (5/10/15 Jahre & Vollhistorie), speicher-/teilbare Setups.
3. **Insight Delivery & Social** – AI-Agents kuratieren Vorzeige-Portfolios, Leaderboards (Risiko/Gewinn & filterbar), abonnierbare Signale (Push & Mail), Sharing & Alerts.
4. **Platform & Monetization** – Modul-Abos mit Trials (Options, Seasonality, Social, All Access), Web + Mobile (React Native), Workspace-Templates, Notes/Playbooks, Automation & Alerts.
5. **Data Foundation** – EODHD & Lenz + Partner Feeds ab 1h-Kerzen (≤15 min Delay), clientseitige Kennzahlberechnung (ATR, Gap), skalierbare API-Schichten.

## 3. Feature Gap Analysis & Differentiation
| Area | Baseline Requirement | Differentiator | Open Considerations |
|------|----------------------|----------------|---------------------|
| Unusual Options Activity | US equities options spikes, OI/Vol Δ, sweeps | Market Tide 2.0 mit sektorbasierten Put/Call, Gamma & Vanna, Option Ladders; Periscope mit Gamma-Flip-Zonen | Trigger-Modelle kalibrieren (z. B. 3x ADV, Delta ≥ 0.3) |
| Political/Insider Flow | Kapitol-/SEC-Daten (gratis, Latenz Tage) | Event Stories (Impact, Historie, Volatility bands) & Alerts | ETL-Pipeline, deduplizierte Daten, Latenzmonitoring |
| Event Calendars | Earnings, Trump, POTUS, FDA, Economic | Abo-basiert, Impact tagging (Low/Mid/High) & expected Volatility | UI-Badges & Smart Alerts; ICS/Push-Export |
| Seasonality Filters | Standard Stats | Filter-Stack + Heatmaps + Backtests + Save/Share | Backtest Engine Scope (long/short, holding period) |
| Social Layer | Demo portfolios, leaderboards | AI-Agent Kuratoren, Signal Abos, Social Feed | Compliance & disclaimers, rate limiting |
| Notes & Automation | n/a | Notizen, Playbooks, Auto-Alerts (Gap > x ATR etc.) | Workflow UI + rule engine |

## 4. Enhancement Roadmap

### Phase 0 – Foundation (laufend)
- Datenfeeds (EODHD, Lenz + Partner) integriert, Latenz ≤15 min.
- Roles briefings & Overview synchronisiert.

### Phase 1 – **Unusual Activity Suite (12 Wochen)**
1. **Options Spike Engine** – Trigger-Framework (Volumen vs Durchschnitt, OI-Sprung, Delta-Range), Alerts; Backtest auf 6 Monate.
2. **Market Tide 2.0** – Dashboard mit Put/Call Ratio je Sektor, Net Gamma/Vanna Exposure, Flow Heatmap.
3. **Periscope Exposure** – Strike-Level Market Maker Exposure, Gamma-Flip-Zonen, Visual Ladder.
4. **Political & Insider Flow** – ETL Pipelines (Capitol Trades, Senate Stock Watcher, SEC 4/13F), Impact Scoring.
5. **Event Calendars** – Earnings/Trump/POTUS/FDA/Economics mit Impact & Expected Vol; abonnierbare Alerts.
6. **Pricing** – Modul “Options Intelligence” inkl. Trial (7 Tage), Benchmark 49 €/Monat (verfeinerbar).

**KPIs:** aktive Modul-Abos ≥250 in 6 Monaten, Alert CTR >25 %, Nutzerzufriedenheit (NPS) >40.

### Phase 2 – **Seasonality++ & Social Layer (12 Wochen)**
1. **Seasonality Engine** – konfigurierbare Filter (Monatsrendite, Gap, ATR, Wochentag, Sektor), Heatmaps & Tabellen, Backtests (5/10/15 Jahre + Vollhistorie).
2. **Setup Management** – Speichern, Teilen, Alerts (Push/E-Mail) für Filterergebnisse.
3. **AI Demo-Portfolios** – 3 kuratierte Portfolios, wöchentliche Updates, Performance-Story.
4. **Leaderboards & Signals** – Risiko/Gewinn-Standard-Sortierung, filterbar; Signal-Abos mit Push & Mail.
5. **Pricing** – “Seasonality Analytics” Modul (39 €/Monat) & “Social Signals” Modul (29 €/Monat); All-Access (99 €/Monat) mit Trial/Upgrade-Funnels.

**KPIs:** gespeicherte Setups ≥500/mo, Signal-Abo-Konversion >5 %, Seasonality-Modul Churn <4 %/mo.

### Phase 3 – **Premium Experience & Automation (10 Wochen)**
1. **Mobile Companion (React Native)** – Dashboard, Alerts, Quick Charts.
2. **Workspace Enhancements** – Multi-mark Layouts, Note-Taking, Playbooks, Auto-Alert Rules (z. B. Gap > x ATR, saisonales Setup aktiv).
3. **Automation & Webhooks** – Optional für Signals & Calendar Alerts.
4. **Monetization Optimization** – Usage-basiertes Upselling, In-App Paywall, Annual Plans.

**KPIs:** Mobile MAU ≥40 % der Web-Nutzer, 70 % Alert Zustellung <1 min, Trial→Paid Conversion ≥15 %.

### Phase 4 – **Differentiation & Growth (optional)**
- KI-gestützte Market Narratives, Backtesting-Engine mit Monte-Carlo, Social Trading Erweiterungen, Premium Desktop (Electron).

## 5. Next Steps
1. Produkt-Anforderungen für Phase 1 detaillieren (MVP Scope, technische Epics, Datenmodell).
2. UX-Flows entwerfen (Event Kalender, Market Tide Dashboard, Periscope Visualisierung).
3. Pricing & Trial-Struktur feinjustieren mit Finanzmodell.
4. Compliance & Risk Review (Insider Signals, Regulatorik, Disclaimer).

---

## Anhang A – Phase 1 MVP Spezifikation (Unusual Activity Suite)

### A1. Options Spike Engine
- **Datenabdeckung:** US Options (OPRA) für Equities/ETFs; Quelle: EODHD/Lenz & Partner Aggregation.
- **Trigger-Modelle:**
  - **Volume Spike:** Optionsvolumen ≥ 3× 30-Tage ADV _oder_ ≥ 5.000 Kontrakte und Notional ≥ 1 Mio USD.
  - **Sweep Detection:** ≥ 3 Teilfüllungen innerhalb 2 Sek., Pricing aggressiv (Ask/Higher für Calls, Bid/Lower für Puts).
  - **Open Interest Jumps:** ΔOI ≥ 25 % relativ zum Vortag _und_ absolutes ΔOI ≥ 1.000 Kontrakte.
  - **Delta Band:** Default Filter Delta ∈ [0.2, 0.7]; optionale Benutzerfilter für OTM/ATM/ITM.
  - **Ticker Health:** Flagging wenn Optionsvolumen ≥ 2 % des Float / durschnittlichem Tagesvolumen.
- **Alerting & Storage:**
  - Echtzeit-Pipeline (≤15 min Delay) mit Kafka/Queue → Alert Service → Push/Email.
  - Historien-Backfill (6 Monate) zur Visualisierung & Backtesting.
  - Benutzerdefinierte Watchlists & Trigger-Anpassungen (Phase 1.1 optional).

### A2. Market Tide 2.0
- **KPIs:**
  - Put/Call Ratio je Sektor (GICS Level 2) & Underlying Marktkapitalisierung.
  - Net Gamma Exposure (GEX) & Vanna Exposure berechnet aus Optionskette.
  - Volumen-skalierte Sentiment Scores (Call Premium vs Put Premium, aggressive vs. passive Trades).
  - Intraday Flow Heatmap (Top 20 Ticker nach Notional, Top Bull/Bear Flows).
  - ETF Hedging Monitor (SPY, QQQ, IWM etc.).
- **Aggregation Intervalle:** 1h, Tagesende, kumulative 5-Tage-Rolling.
- **Visuals:**
  - Gauge/Trendline für Gesamtmarkt Put/Call Ratio.
  - Stacked Bars für Sektor Exposure, time-series für Net Gamma.
  - Table + Sparkline für Top Ticker.
- **APIs:** REST `/options/market-tide` + WebSocket Channel für intraday updates.

### A3. Periscope Market Maker Exposure
- **Ziele:** Visualisierung der Market Maker Delta/Gamma Exposure pro Strike/Expiry, Identifikation von Gamma Flip-Zonen.
- **Berechnungen:**
  - Delta Exposure = ∑ (Position * Δ) nach Strike, Weighted nach Notional.
  - Gamma Exposure = ∑ (Position * Γ * Underlying Price).
  - Gamma Flip Level = Preis, bei dem aggregiertes Gamma die Null-Linie kreuzt.
- **Darstellung:**
  - Strike Ladder (horizontal) mit Farbskala für Gamma (positive/negative).
  - Price Impact Chart (Underlying Price vs. Net Gamma / Delta).
  - Alert Flag wenn Spot nähert sich ±1 % Gamma Flip Level.
- **User Controls:** Ticker, Expirations-Filter, Aggregation Mode (Single Expiry vs. Combined).

### A4. Political & Insider Trading Tracker
- **Quellen (kostenfrei):** Capitol Trades, Senate Stock Watcher, House Stock Watcher, SEC Form 4/13F (EDGAR API), OpenInsider.
- **Latenz/Refresh:** täglicher ETL-Job (max. 24 h Verzögerung), sobald möglich near-real-time (EDGAR RSS).
- **Normalisierung:**
  - Mapping auf Ticker (CUSIP → Symbol), Partei/Zugehörigkeit, Handelsgröße (Notional), Kategorie (Buy/Sell/Gift).
  - Impact Score = (Notional Rank + Historische Performance + Politik-Relevanz)/gewichtete Skala 0–100.
- **UI-Elemente:** Timeline, Filter nach Politiker, Partei, Branche; Integration in Alerts/Watchlists.
- **Compliance:** Disclaimer (“Informationen aus öffentlichen Quellen, keine Anlageberatung”), Link zu Originalfiling.

### A5. Event-Kalender Suite
- **Kalender:** Earnings, Trump Tracker, POTUS Schedule, FDA Calendar, Economics Calendar.
- **Datenpunkte je Eintrag:** Datum/Zeit (Zeitzone), Ticker(s), Kategorie, Impact Level (Low/Mid/High), Erwartete Volatilität (Up/Down Range), Historische Reaktion (z. B. durchschnittliche Post-Earnings-Move), Link zur Quelle/Agenda, Notizfeld.
- **Abonnements:** Benutzer können einzelne Kalender oder Kombinationen folgen (Toggle + Farbbadge im UI).
- **Alerts:** Push/E-Mail 24 h & 1 h vor Event, optional Webhook (Phase 3).
- **Export:** iCal Download, CSV Listenansicht.

### A6. Pricing & Packaging (Phase 1 Launch)
- Modul: **Options Intelligence** (enthält alle oben genannten Features).
- Preisanker (Start): 49 €/Monat, 499 €/Jahr (2 Monate gratis). Trial 7 Tage mit Feature-Limits (z. B. 20 Alerts/Tag).
- Upsell Hooks: In-App Banner, Trial-to-Paid Nudges, All-Access Teaser.

### A7. Delivery Plan (12 Wochen)
| Sprint | Key Deliverables |
|--------|------------------|
| 1–2 | ETL Pipelines (Options, Political/Insider, Calendars), Data Models |
| 3–4 | Options Trigger Engine, Backfill, Alert Framework |
| 5–6 | Market Tide Analytics & API, initial Dashboard |
| 7–8 | Periscope Exposure Visuals & Alerts |
| 9–10 | Political/Insider UI, Event Calendar MVP |
| 11 | Pricing/Trial, Paywall Integration, QA |
| 12 | Beta Launch, Feedback Loop, KPI Baseline |

---

## Anhang B – UX Flow & Wireframe Spezifikation (Phase 1)

### B1. Unusual Activity Dashboard
1. **Landing View:**
   - Header Cards: Gesamtmarkt Put/Call, Net Gamma, Top Bullish/Bearish Ticker.
   - Tabs: `Spikes`, `Market Tide`, `Periscope`, `Political/Insider`, `Calendars`.
2. **Spikes Tab:** Filterpanel (Ticker, Sektor, Delta, Notional, Date Range). Table mit Heatmap, Detail Drawer (Trade Timeline, Historie, News Links).
3. **Alert Config Modal:** Schwellenwerte, Delivery Channels, Watchlist-Zuordnung.

### B2. Market Tide UX
- **Main Chart:** Dual-Axis (Put/Call vs. Net Gamma).
- **Sektor Grid:** Karten oder Treemap mit Farbkodierung nach Sentiment.
- **Ticker Drilldown:** Modal mit Zeitreihe, Options Ladder, Link zu Periscope.
- **Export:** PNG/SVG Download, CSV für Aggregationen.

### B3. Periscope UX
- **Layout:** Linke Spalte Filter (Expiry, Strike Range), zentrale Gamma Ladder (Stacked Bars), rechte Spalte Price Impact Chart.
- **Tooltips:** Gamma/Delta Values, Notional, Alert Buttons.
- **Scenario Slider:** Hypothetische Spot Price Veränderungen ±10 % mit Live-Update.

### B4. Political & Insider Feed
- **Feed View:** Karten mit Politiker/Insider Profilbild, Partei, Trade Summary, Impact Score, Link zum Filing.
- **Filters:** Person, Partei, Amt, Impact Score, Ticker, Zeitraum.
- **Story Mode:** Kombiniert Events mit Kalendern (z. B. vor Earnings + Insider Kauf), generiert Alert-Empfehlung.

### B5. Event Calendar UX
- **Calendar Grid & List Toggle:** Monats- und Agenda-Ansicht.
- **Grouping:** By Kalenderart (Farbkodierte Chips). Badges für abonnierte Kalender.
- **Event Drawer:** Details, Historie (z. B. Earnings Surprise Tabelle), Buttons `Add to Watchlist`, `Create Alert`, `Export iCal`.
- **Notification Settings:** Pro Kalender, Zeitversatz, Kanal.

### B6. Responsive Considerations
- Mobile (Phase 3) vorbereitet: Card-stacked Layout, Quick Filters, Swipe Tabs.
- Multi-Monitor (Web): Dockable Panels (Spikes + Periscope parallel), Layout Presets.

---

## Anhang C – Pricing, Trials & Compliance

### C1. Pricing Framework
- **Module Pricing (Startwerte):**
  - Options Intelligence: 49 €/Monat oder 499 €/Jahr.
  - Seasonality Analytics (Phase 2): 39 €/Monat oder 399 €/Jahr.
  - Social Signals (Phase 2): 29 €/Monat oder 299 €/Jahr.
  - All-Access: 99 €/Monat oder 999 €/Jahr.
- **Trials:** 7 Tage kostenlos pro Modul, All-Access 14 Tage (Requires Payment Method, Cancel Anytime).
- **Upsell:** In-App Usage Gates (z. B. mehr als 5 gespeicherte Filter), Educational Email Drip.

### C2. Conversion & Retention Hooks
- Onboarding Checklist, Feature Tours, Daily Recap Email.
- Leaderboards/Community gated hinter Modul-Lizenz.
- Referral Programm (Monat gratis für beide Seiten, Phase 2).

### C3. Compliance & Legal
- **Disclaimers:** “Keine Anlageberatung”; in jeder Alert-Mail und UI prominent.
- **Data Licensing:** Prüfen Terms von Capitol Trades, Senate Stock Watcher, EDGAR – sicherstellen Attribution.
- **Usage Monitoring:** Rate Limiting für API/Downloads; Logging für Alerts.
- **Privacy:** GDPR-konforme Speicherung (Nur notwendige PII, Opt-in für Marketing).
- **Political/Insider Content:** Automatisierte QA-Kontrollen (Duplicates, False Matches), Eskalationspfad bei Beschwerden.

### C4. Risk & Security
- 2FA optional ab Phase 1, Pflicht ab Phase 3 für Signal-Anbieter.
- API-Key Management für Webhooks (Phase 3).
- Incident Response Playbook (Phase 1 Draft, Phase 2 Hardened).

---

Dieses Dokument erweitert die Projektübersicht um konkrete Spezifikationen, UX-Vorgaben und Monetarisierungsrichtlinien für die nächsten Phasen.
Dieses Strategiepapier ergänzt die [Projektübersicht](./project-overview.md) und dient als Leitfaden für Produkt/Engineering-Roadmap sowie Go-to-Market-Aktivitäten. Konkrete Umsetzungsdetails siehe [Phase 1 Implementation Plan](./phase1-implementation-plan.md).
