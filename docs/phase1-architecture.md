# Phase 1 Technical Architecture – Unusual Activity Suite

## 1. System Overview

```
Data Feeds (EODHD, Lenz+Partner, Capitol Trades, SEC EDGAR)
        │
  Ingestion Workers (Python/Node)
        │  (Kafka topics / SQS queues)
  ┌─────┴───────────────┐
  │                     │
Options Processor   Event ETL (Political/Insider, Calendars)
  │                     │
  ▼                     ▼
PostgreSQL (timeseries schema)   Redis Cache (hot data)
  │                     │
  └──────► API Layer (Express/Fastify) ◄─────┘
                     │
          WebSocket Gateway (Socket.io)
                     │
              Frontend (Next.js) + Alerts (Push/Email)
```

## 2. Data Pipelines

### 2.1 Options Ingestion
- **Sources:** EODHD options endpoint (hourly), Lenz+Partner for supplementary metrics.
- **Schedule:** Cron every 15 min (watchlist tickers), hourly full sync overnight.
- **Process:**
  1. Fetch raw option chain (bid/ask/last, volume, OI, Greeks).
  2. Normalize to canonical schema (symbol, expiry, strike, type, delta, gamma, theta, vega, volume, oi, last_trade_time).
  3. Publish to `options.raw` Kafka topic.
  4. Processor service consumes, applies triggers (Volume Spike, OI Growth, Sweep detection), persists summarized records to `options_activity` table.
  5. Legal entity metadata (sector, market cap) join from `asset_metadata` table.

### 2.2 Market Tide Aggregation
- Batch job every 15 min:
  - Query latest options snapshots.
  - Compute sector put/call ratio, net gamma/vanna.
  - Store aggregated rows in `market_tide_summary` (timestamp, sector, metrics JSON).
  - Publish deltas to Redis for low-latency API.

### 2.3 Periscope Exposure
- On-demand microservice triggered per ticker/expiry or via scheduled refresh (Top 50 tickers).
- Pipeline:
  - Load option chain.
  - Compute delta/gamma exposure per strike (using quantity * multiplier * greek).
  - Determine gamma flip price by solving for zero crossing with binary search.
  - Cache results in Redis (TTL 10 min) for UI.

### 2.4 Political & Insider ETL
- **Sources:** Capitol Trades API, Senate Stock Watcher CSV, House Stock Watcher, SEC Form 4 / 13F via EDGAR RSS.
- **Pipeline:**
  - Daily ingestion (06:00 UTC) + incremental every 3 h.
  - Standardize fields (person_id, office, party, ticker, transaction_date, transaction_type, amount, source_url).
  - Map to tickers via CUSIP lookup (Lenz+Partner symbol map).
  - Compute impact score (normalization function stored procedure).
  - Persist to `political_trades` table (partitioned by month).

### 2.5 Event Calendars
- Five feeds (Earnings, Trump, POTUS, FDA, Economics).
- Each feed ingested via dedicated worker -> `events_calendar` table with `calendar_type`, `impact_level`, `expected_volatility`, `historical_move_json`.
- Subscription table `user_calendar_subscriptions` for alert scheduling.

## 3. Data Model (PostgreSQL)

```sql
CREATE TABLE options_activity (
  id BIGSERIAL PRIMARY KEY,
  symbol TEXT NOT NULL,
  event_time TIMESTAMPTZ NOT NULL,
  expiry DATE NOT NULL,
  strike NUMERIC(10,2) NOT NULL,
  option_type TEXT CHECK (option_type IN ('CALL','PUT')),
  volume BIGINT,
  avg_volume_30d BIGINT,
  volume_ratio NUMERIC,
  open_interest BIGINT,
  oi_change BIGINT,
  delta NUMERIC,
  sweep BOOLEAN,
  notional NUMERIC,
  trigger_flags TEXT[]
) PARTITION BY RANGE (event_time);

CREATE TABLE market_tide_summary (
  id BIGSERIAL PRIMARY KEY,
  bucket_start TIMESTAMPTZ,
  sector TEXT,
  put_call_ratio NUMERIC,
  net_gamma NUMERIC,
  net_vanna NUMERIC,
  flow_top JSONB
);

CREATE TABLE periscope_exposure (
  id BIGSERIAL PRIMARY KEY,
  symbol TEXT,
  expiry DATE,
  calc_time TIMESTAMPTZ,
  gamma_profile JSONB,
  delta_profile JSONB,
  gamma_flip_price NUMERIC
);

CREATE TABLE political_trades (
  id BIGSERIAL PRIMARY KEY,
  person_id TEXT,
  person_name TEXT,
  party TEXT,
  office TEXT,
  symbol TEXT,
  transaction_date DATE,
  transaction_type TEXT,
  amount_range TEXT,
  source TEXT,
  impact_score NUMERIC,
  raw_data JSONB
);

CREATE TABLE events_calendar (
  id BIGSERIAL PRIMARY KEY,
  calendar_type TEXT,
  event_time TIMESTAMPTZ,
  timezone TEXT,
  symbol TEXT,
  title TEXT,
  impact_level TEXT,
  expected_volatility JSONB,
  historical_move JSONB,
  metadata JSONB
);

CREATE TABLE user_calendar_subscriptions (
  user_id UUID,
  calendar_type TEXT,
  alert_offset_minutes INT,
  channels TEXT[],
  PRIMARY KEY (user_id, calendar_type)
);
```

## 4. API Design (Phase 1)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/options/activity` | GET | List unusual options events (filters: symbol, date range, trigger flag, notional min). |
| `/api/options/activity/{id}` | GET | Detail view with trade timeline & metrics. |
| `/api/options/market-tide` | GET | Aggregated Market Tide metrics (params: interval, sector). |
| `/api/options/periscope` | GET | Gamma/Delta exposure for symbol + expiry. |
| `/api/political-trades` | GET | Political & insider trades (filters: person, party, symbol, impact). |
| `/api/events/calendar` | GET | Event entries (filters: calendar type, date). |
| `/api/events/calendar/subscriptions` | POST/DELETE | Manage user subscriptions. |
| `/api/alerts/options` | POST | Create custom alert (trigger config). |
| `/ws/options` | Socket channel | Real-time pushes for new unusual events, market tide updates. |

Authentication via JWT; module entitlements checked per route.

## 5. Alerting Infrastructure
- **Rule Engine:** When options trigger fires, row inserted into `options_activity`. Trigger function enqueues alert payload to Redis stream `alerts.pending`.
- **Alert Service:** Worker consumes, applies user preferences (channels), deduplicates within 5 min window, sends via:
  - Push (Firebase/Expo for mobile, Web Push for browser).
  - Email (SendGrid). Rate limit per user (max 50/day).
- **Calendars:** Nightly scheduler pre-computes upcoming events per subscription, queues notifications per offset (24 h, 1 h standard).

## 6. Scaling & Reliability
- `options_activity` partitioned monthly; index on `(symbol, event_time DESC)`.
- Redis caching for high-frequency endpoints (Market Tide, Periscope) with TTL.
- Horizontal scaling: ingestion workers stateless; API layer auto-scaled via container platform.
- Monitoring: Prometheus metrics (ingestion latency, trigger counts), Sentry for errors.
- Backups: nightly PostgreSQL snapshots, object storage for raw feed archives.

## 7. Security & Compliance Notes
- Store minimal PII (user_id, email). Alert channel preferences encrypted at rest.
- Political/Insider data accompanied von disclaimern & source links.
- Access control middleware verifies module subscription.
- Audit logs for alert dispatch & data ingestion anomalies.

---

Dieses Architektur-Dokument begleitet Phase 1 der Roadmap und dient als Referenz für Engineering, Data und DevOps während der Umsetzung.
