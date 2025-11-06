# Docker Setup – Phase 1

## Start der Infrastruktur
```
docker compose up -d
```

> Erfordert Docker Desktop (oder eine andere Docker Runtime). Die Compose-Datei startet Postgres, Redis, Zookeeper und Kafka.

## Services & Ports
| Service | Port | Beschreibung |
|---------|------|--------------|
| Postgres | 5432 | Primäre Datenbank (`finx_phase1`, User `finx`, PW `finx`) |
| Redis | 6379 | Cache & Alert Streams (AOF aktiviert) |
| Zookeeper | 2181 | Koordination für Kafka |
| Kafka | 9092 | Topics `options.raw`, `options.signals`, `events.raw` (manuell anlegen) |

## Standard-Credentials
- Postgres: `postgresql://finx:finx@localhost:5432/finx_phase1`
- Redis: `redis://localhost:6379`
- Kafka Broker: `localhost:9092`

## Nützliche Kommandos
- Logs prüfen: `docker compose logs -f <service>`
- Services stoppen: `docker compose down`
- Volumes bereinigen: `docker compose down -v`
- Kafka Topic anlegen (Beispiel):
  ```
  docker compose exec kafka kafka-topics.sh --create \
    --topic options.raw --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1
  ```

## Nach dem Start
1. `.env` Dateien mit realen Secrets füllen.
2. Backend/Data-Services lokal starten (`npm run dev`, Worker-Skripte etc.).
3. Monitoring & Alerts konfigurieren (Prometheus, Grafana, Sentry – siehe `docs/infrastructure-setup.md`).

Damit läuft die gesamte lokale Infrastruktur; es fehlen nur noch die echten Secret-Werte.
