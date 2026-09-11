# CHANGELOG — Sentinel-AI Quality Engine

All notable changes to the `Sentinel-AI` repository are documented in this file.

---

## [v1.0.0] — 2026-09-11

### Added
- **Monorepo & Environment Infrastructure (Phase 1):**
  - Configured TypeScript monorepo with Node.js 20+ target and ES2022 module resolution.
  - Setup `playwright.config.ts` supporting cross-browser matrix execution (Chromium, Firefox, WebKit) and multi-worker parallelization.
  - Authored Docker Compose infrastructure (`docker-compose.yml`) for local PostgreSQL 16 database.
  - Created initial PostgreSQL DDL migrations (`001_schema.sql`) for plans, subscribers, orders, and billing ledgers.
- **Data Layer & Data Agent (Phase 2):**
  - Built PostgreSQL connection pool (`src/db/connectionPool.ts`) using Node `pg` driver.
  - Implemented `Data Agent` (`src/agents/dataAgent.ts`) using the `agentic-test-data-gen` skill for relational synthetic data generation.
  - Added deterministic static fallback manifest (`src/data/seed-fallback.json`) ensuring rate-limit resilience.
- **Contract Layer & Contract Agent (Phase 3):**
  - Created Zod runtime schema definitions (`src/api/schemaValidator.ts`) for sub-second payload contract verification.
  - Implemented `Contract Agent` (`src/agents/contractAgent.ts`) emitting `schema-diff.json` contract audit reports.
- **Playwright Hybrid E2E Suite & SQL Reconciliation (Phase 4):**
  - Developed custom Playwright fixtures (`src/fixtures/hybridFixtures.ts`) enabling API backend state pre-seeding (<200ms) and session caching.
  - Authored Page Object Model classes (`src/pages/CheckoutPage.ts`) prioritizing accessibility locators (`getByRole`, `getByTestId`).
  - Implemented `src/tests/hybridE2E.spec.ts` executing hybrid UI checkout and automated SQL database assertions.
- **CI/CD Pipeline & Triage Agent RCA Engine (Phase 5):**
  - Authored GitHub Actions workflow (`.github/workflows/e2e.yml`) for automated PR quality gates.
  - Implemented `Triage Agent` (`src/agents/triageAgent.ts`) for post-failure Playwright Trace Viewer and stack trace root cause analysis.
  - Authored complete documentation suite (`README.md`, `DEMO.md`, `ARCHITECTURE.md`, `DEPLOYMENT.md`).
