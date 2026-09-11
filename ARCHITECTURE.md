# ARCHITECTURE — Sentinel-AI System Blueprint

`Sentinel-AI` is designed as a decoupled, multi-agent hybrid test automation harness that isolates failure domains across data generation, API contract enforcement, front-end browser automation, and failure triage.

---

## 🏗️ High-Level System Architecture Diagram

```text
                               ┌────────────────────────────────────────────────────────┐
                               │           AGENTS.MD (Master Source of Truth)           │
                               └───────────────────────────┬────────────────────────────┘
                                                           │
                                                           ▼
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 MULTI-AGENT EXECUTION & FILE MANIFEST SEAMS                               │
│                                                                                                           │
│   ┌───────────────────────────┐         ┌───────────────────────────┐         ┌───────────────────────┐   │
│   │        DATA AGENT         │         │      CONTRACT AGENT       │         │     TRIAGE AGENT      │   │
│   │ (Relational DB Synthesis) │         │ (Zod Schema Drift Check)  │         │ (CI Trace Viewer RCA) │   │
│   └─────────────┬─────────────┘         └─────────────┬─────────────┘         └───────────▲───────────┘   │
│                 │                                     │                                   │               │
│                 ▼                                     ▼                                   │               │
│          seed-output.json                      schema-diff.json                      rca-summary.json     │
└─────────────────┼─────────────────────────────────────┼───────────────────────────────────┼───────────────┘
                  │                                     │                                   │
                  └──────────────────────────┐          │                                   │
                                             ▼          ▼                                   │
                               ┌────────────────────────────────────────┐                   │
                               │      HYBRID PLAYWRIGHT TEST SUITE      │                   │
                               │                                        │                   │
                               │  1. REST API State Pre-Seeding (<200ms)│                   │
                               │  2. Playwright UI Accessibility Flow   │                   │
                               │  3. SQL Database Ledger Assertion      │                   │
                               └────────────────────┬───────────────────┘                   │
                                                    │                                       │
                                                    │ (If Failure in CI)                    │
                                                    └───────────────────────────────────────┘
```

---

## ⚙️ Multi-Agent Contract Interfaces

### 1. `Data Agent` Interface
- **Input:** Relational DDL schema (`db/migrations/001_schema.sql`).
- **Output Manifest:** `src/data/seed-output.json`.
- **Fallback Rule:** If LLM provider experiences 429 rate limits, delegates to `seed-fallback.json`.

### 2. `Contract Agent` Interface
- **Input:** Target endpoint responses & `seed-output.json`.
- **Output Manifest:** `src/data/schema-diff.json`.
- **Validation Engine:** Zod runtime schema parsers (`src/api/schemaValidator.ts`).

### 3. `Triage Agent` Interface
- **Trigger:** CI pipeline failure event (`if: failure()`).
- **Input:** Playwright `Trace Viewer` zip artifacts & `playwright-report/test-results.json`.
- **Output Manifest:** `src/data/rca-summary.json`.

---

## 🗄️ Relational Database Schema ERD

- **`plans`**: Primary key `plan_id`, stores telecom plan configurations.
- **`subscribers`**: Primary key `subscriber_id`, foreign key `plan_id`, stores customer account state.
- **`orders`**: Primary key `order_id`, foreign key `subscriber_id`, stores idempotency keys & order statuses.
- **`billing_ledgers`**: Primary key `ledger_id`, foreign keys `order_id` & `subscriber_id`, stores transactional payment records.
