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

Dieses Strategiepapier ergänzt die [Projektübersicht](./project-overview.md) und dient als Leitfaden für Produkt/Engineering-Roadmap sowie Go-to-Market-Aktivitäten.
