# Phase 1 Planning Checklist

## 1. Ticket Import (Jira/Trello o. Ä.)
1. Öffne `docs/tickets-phase1.md` und kopiere jede Tabellenzeile als neues Ticket.
2. Nutze den Inhalt aus `docs/ticket-template-phase1.md` (Description Template) – ersetze Platzhalter, ergänze Akzeptanzkriterien.
3. Verknüpfe jedes Ticket mit dem passenden Epic (E1–E9) und Branch.
4. Setze den Status initial auf `Ready`.

## 2. Statuspflege
- **In Progress:** sobald der Branch aktiv bearbeitet wird und PR offen ist.
- **Code Review:** PR erstellt, Reviewer zugewiesen.
- **QA:** Tests/QA laufen in Staging.
- **Done:** Merge in `feature/frontend-foundation`, Changelog-Eintrag aktualisiert.

## 3. Synchronisation
- Wöchentlicher Review (Freitag) → Tickets mit Blockern markieren.
- UX verlinkt Figma-Prototypen in Ticket-Kommentaren gemäß `ux-links.md`.
- Fullstack pflegt `docs/changelog-phase1.md` nach jedem Done-Status.

## 4. Reporting
- Verwende Labels `phase1`, `options-suite`, `seasonality` etc. für Filter.
- Exportiere Board-Snapshot jede Woche und sichere in `docs/reports/` (Ordner bei Bedarf anlegen).

Diese Checklist stellt sicher, dass Planungstool und Dokumentation synchron bleiben.
