# Infrastructure Setup Checklist – Phase 1

## 1. Core Services
| Service | Purpose | Recommended Setup | Notes |
|---------|---------|-------------------|-------|
| PostgreSQL 15+ | Primary database | Docker `postgres:15` | Create DB `finx_phase1`; run migrations per backend instructions |
| Redis 7 | Caching + alert streams | Docker `redis:7` | Enable persistence (AOF) for alert replay |
| Kafka / SQS | Event streams (`options.raw`, `options.signals`, `events.raw`) | Local Kafka via Docker Compose _oder_ AWS SQS queues | Ensure IAM credentials / ACLs ready |
| Prometheus + Grafana | Monitoring | Docker Compose stack | Import dashboard IDs (options ingestion, alerts throughput) |
| Sentry | Error tracking | SaaS (sentry.io) | Create projects: `finx-backend`, `finx-frontend`, `finx-data` |

## 2. Local Docker Compose (optional baseline)
```
version: "3.9"
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: finx_phase1
      POSTGRES_USER: finx
      POSTGRES_PASSWORD: finx
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7
    command: ["redis-server", "--appendonly", "yes"]
    ports:
      - "6379:6379"

  kafka:
    image: bitnami/kafka:3
    environment:
      KAFKA_CFG_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_CFG_LISTENERS: PLAINTEXT://:9092
      KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      ALLOW_PLAINTEXT_LISTENER: "yes"
    ports:
      - "9092:9092"
    depends_on:
      - zookeeper

  zookeeper:
    image: bitnami/zookeeper:3.8
    environment:
      ALLOW_ANONYMOUS_LOGIN: "yes"
    ports:
      - "2181:2181"

volumes:
  postgres-data:
```

## 3. Monitoring & Alerts
- Prometheus scrape targets:
  - Backend: `/metrics`
  - Data ingestion workers
  - Alert service
- Grafana dashboards: options ingestion latency, alert throughput, error rates.
- Set Slack/email webhooks for critical alerts (data pipeline failures, alert delivery errors).

## 4. Secrets Management
- Use `.env` files generated from templates (see project root) or secrets manager (Doppler, Vault, AWS SM).
- Required keys:
  - `EODHD_API_KEY`
  - `LENZ_PARTNER_API_KEY`
  - `CAPITOL_TRADES_TOKEN`
  - `STRIPE_SECRET_KEY`
  - `SENDGRID_API_KEY`
  - `EXPO_ACCESS_TOKEN`
  - `SENTRY_DSN_*`
- Store per environment (local/staging/prod) and share securely with Droids.

## 5. Deployment Targets (suggested)
- Backend/Data services → Railway/Render/Heroku (staging) + AWS/GCP (prod).
- Frontend → Vercel.
- Data pipelines → Dedicated worker environment (Docker Swarm/Kubernetes/Serverless).

## 6. Pre-Launch Checklist
- [ ] Databases provisioned & credentials documented.
- [ ] Kafka/SQS topics created with retention policies.
- [ ] Monitoring dashboards reachable; alert rules tested.
- [ ] Secrets injected into CI/CD + local dev instructions distributed.
- [ ] Access rights granted to all Droids.

Nach diesem Setup können die Droids sofort mit der Umsetzung starten – einzig die secret Werte müssen noch gesetzt werden.
