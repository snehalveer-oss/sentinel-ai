# DEPLOYMENT — Sentinel-AI Deployment & CI/CD Setup Guide

This guide details how to deploy and run `Sentinel-AI` across local development machines, Docker containers, and GitHub Actions CI/CD pipelines.

---

## 🐳 Docker Deployment Setup

### 1. Build & Spin Up Local PostgreSQL Container
```bash
docker-compose up -d
```

### 2. Verify Container Health
```bash
docker-compose ps
```
*Output:*
```text
NAME                IMAGE                 COMMAND                  SERVICE             CREATED             STATUS              PORTS
sentinel_postgres   postgres:16-alpine    "docker-entrypoint.s…"   postgres            10 seconds ago      Up (healthy)        0.0.0.0:5432->5432/tcp
```

### 3. Tear Down Container Infrastructure
```bash
docker-compose down
```

---

## 🚀 GitHub Actions CI/CD Pipeline Setup

`Sentinel-AI` utilizes GitHub Actions (`.github/workflows/e2e.yml`) to enforce automated PR quality gates.

### Pipeline Stage Flow:
1. **Checkout & Environment Setup:** Clones repository, installs Node.js v20+, and configures cache.
2. **Containerized Database Service:** Provisions a PostgreSQL 16 Alpine container with health-check monitoring.
3. **Data Agent Seeding:** Executes `npm run agent:seed` to synthesize test datasets.
4. **Contract Agent Validation:** Executes `npm run agent:contract` to verify Zod schema compliance (<500ms).
5. **Playwright Hybrid E2E Execution:** Executes `npm run test:e2e` in parallel workers.
6. **Failure Triage Hook:** Triggers `npm run agent:triage` conditionally on pipeline failure (`if: failure()`).
7. **Artifact Archiving:** Uploads Playwright HTML reports and trace logs as build artifacts.

---

## 🔒 Secret Management Guidelines
Store sensitive LLM keys securely in GitHub Repository Secrets:
- `OPENAI_API_KEY`: Enterprise OpenAI API key.
- `ANTHROPIC_API_KEY`: Anthropic Claude API key.
