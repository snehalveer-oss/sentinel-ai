# Sentinel-AI | Enterprise Agentic Hybrid E2E Test Automation Harness

[![Sentinel-AI CI](https://github.com/snehalveer-oss/sentinel-ai/actions/workflows/e2e.yml/badge.svg)](https://github.com/snehalveer-oss/sentinel-ai/actions/workflows/e2e.yml)
[![Node Version](https://img.shields.io/badge/node-v20%2B-blue)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/playwright-v1.42.0-green)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-v5.3-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

`Sentinel-AI` is an enterprise-grade Agentic Hybrid E2E Test Automation & Self-Healing Quality Engine. It bridges high-speed **Playwright/TypeScript** UI automation, **REST API state pre-seeding**, relational **PostgreSQL database reconciliation**, and **multi-agent AI orchestration** across Antigravity CLI (`agy`), Claude Code, and Codex.

---

## 🔑 Key Architectural Capabilities

1. **Hybrid Execution Engine:** Fast-forwards prerequisite setup steps via REST APIs (`APIRequestContext`) in <200ms, running Playwright UI journeys purely for core user interactions.
2. **Multi-Agent Orchestration:**
   - **`Data Agent`**: Parses database DDL schemas to generate relational, PII-compliant test data.
   - **`Contract Agent`**: Executes sub-second Zod schema validation to detect API contract drift before browser execution.
   - **`Triage Agent`**: Automatically ingests failed CI build artifacts (Playwright `Trace Viewer` zips and stack traces) to classify root causes in `rca-summary.json`.
3. **Determinism & Fallback Protection:** Configured with deterministic static seed fallbacks (`seed-fallback.json`), guaranteeing zero CI build failures due to external AI rate limits or network latency.
4. **Two-Way Database Reconciliation:** Performs automated SQL queries against PostgreSQL tables post-execution to verify transactional ledger state persistence.

---

## 🛠️ Technology Stack

- **Primary Languages & Runtimes:** TypeScript, Node.js v20+
- **UI & Web Automation:** Playwright Test (Chromium, Firefox, WebKit)
- **API & Schema Validation:** REST APIs (`APIRequestContext`), Zod Runtime Schemas
- **Database & Storage:** PostgreSQL 16, Docker (`docker-compose.yml`), Node `pg` Pool
- **CI/CD & DevOps:** GitHub Actions (`.github/workflows/e2e.yml`)
- **Agentic AI Tools:** Antigravity CLI (`agy`), Claude Code, Codex, governed by `AGENTS.md`

---

## ⚡ Quick Start & Runbooks

### 1. Prerequisites
- Node.js v20+
- Docker & Docker Compose
- Git & GitHub CLI (`gh`)

### 2. Installation
```bash
# Clone Repository
git clone https://github.com/snehalveer-oss/sentinel-ai.git
cd sentinel-ai

# Install Dependencies & Playwright Browsers
npm install
npx playwright install chromium
```

### 3. Spin Up Local Infrastructure
```bash
# Start Dockerized PostgreSQL Database
npm run docker:up
```

### 4. CLI Execution Commands
```bash
# 1. Run Data Agent (Synthesize Relational Test Data)
npm run agent:seed

# 2. Run Contract Agent (Validate API Schemas)
npm run agent:contract

# 3. Execute Hybrid Playwright E2E & SQL Assertion Suite
npm run test:e2e

# 4. Run Triage Agent (Post-Failure Root Cause Analysis)
npm run agent:triage
```

---

## 📂 Repository Structure

```text
sentinel-ai/
├── .agents/skills/             # Custom Agentic Skills Registry
│   ├── agentic-test-data-gen/  # Relational test data synthesis skill
│   ├── schema-contract-validator/ # Zod runtime contract drift validator
│   ├── playwright-hybrid-patterns/ # REST pre-seeding & Playwright recipes
│   └── ci-triage-rca-agent/    # Failure log & Trace Viewer RCA analyzer
├── .github/workflows/          # GitHub Actions CI/CD Pipeline
│   └── e2e.yml
├── db/migrations/              # PostgreSQL Schema DDL Migrations
│   └── 001_schema.sql
├── src/
│   ├── agents/                 # Multi-Agent TS Implementations (Data, Contract, Triage)
│   ├── api/                    # Zod Payload Schema Definitions
│   ├── data/                   # Seed & Audit Manifest Outputs (JSON)
│   ├── db/                     # PostgreSQL Connection Pool (pg)
│   ├── fixtures/               # Playwright Custom Fixtures (test.extend)
│   ├── pages/                  # Page Object Models (Accessibility Locators)
│   └── tests/                  # Hybrid E2E & SQL Assertion Spec Suites
├── AGENTS.md                   # Master Agentic Source of Truth Specification
├── docker-compose.yml          # Local PostgreSQL Container Infrastructure
├── playwright.config.ts        # Playwright Test Suite Config
├── tsconfig.json               # TypeScript Compiler Config
├── README.md                   # System Documentation
├── ARCHITECTURE.md             # Deep System Architecture
├── DEPLOYMENT.md               # Infrastructure & CI Deployment Guide
├── DEMO.md                     # Verification & Walkthrough Guide
└── CHANGELOG.md                # Release History
```

---

## 📄 Documentation Index
- [ARCHITECTURE.md](ARCHITECTURE.md) — Deep architectural blueprints, data flow diagrams, and multi-agent seams.
- [DEPLOYMENT.md](DEPLOYMENT.md) — CI/CD setup, Docker configuration, and production environment guidelines.
- [DEMO.md](DEMO.md) — Live walkthrough script, command outputs, and demo verification guide.
- [CHANGELOG.md](CHANGELOG.md) — Version release history.

---

## 👤 Author & Maintainer
**Snehal Veer** — Advanced Automation Test Engineer  
- **GitHub:** [@snehalveer-oss](https://github.com/snehalveer-oss)
