# AGENTS.md — Master Source of Truth for Sentinel-AI Engine

## System Purpose & Overview
`Sentinel-AI` is an enterprise-grade Agentic Hybrid E2E Test Automation and Self-Healing Quality Engine. It bridges high-speed Playwright/TypeScript UI automation, REST API state pre-seeding, relational SQL database reconciliation, and multi-agent AI orchestration across Antigravity CLI (`agy`), Claude Code, and Codex.

---

## Agentic Developer Tooling Suite
All autonomous agents and developer tooling interface through standardized CLI runtimes and subagent protocols governed by this document:
- **Antigravity CLI (`agy`)**: Primary agentic workflow orchestrator and terminal interface.
- **Claude Code**: High-context refactoring, architectural review, and skill authoring engine.
- **Codex**: Fast code completion, TypeScript type-checking, and mock data generation.

---

## Multi-Agent Architecture & Seams
`Sentinel-AI` employs a multi-agent orchestration architecture where specialized agents operate over file-based contracts (`JSON` manifests):

1. **`Data Agent` (Synthetic Data Generator)**
   - **Role**: Parses SQL DDL schemas and OpenAPI specs to generate relational, PII-compliant test data.
   - **Output Contract**: `seed-output.json`
2. **`Contract Agent` (Schema Validator)**
   - **Role**: Compares OpenAPI specs against live endpoint responses and PostgreSQL schemas to detect schema drift before UI runs.
   - **Output Contract**: `schema-diff.json`
3. **`Triage Agent` (CI/CD Failure RCA)**
   - **Role**: Triggered on CI build failures (`if: failure()`). Ingests Playwright `Trace Viewer` zip files, stack traces, and console logs to emit root-cause analysis (RCA) summaries.
   - **Output Contract**: `rca-summary.json`

---

## Project Skills Registry (`.agents/skills/`)
1. `agentic-test-data-gen` — Schema-aware synthetic test data generator workflows.
2. `schema-contract-validator` — OpenAPI & PostgreSQL schema drift validator.
3. `playwright-hybrid-patterns` — API pre-seeding & accessibility-first UI test recipes.
4. `ci-triage-rca-agent` — CI failure log parsing and stack trace RCA analyzer.

---

## Execution Runbooks & CLI Scripts
- `npm run agent:seed` — Triggers `Data Agent` to synthesize relational DB fixtures.
- `npm run agent:contract` — Triggers `Contract Agent` to validate API schemas.
- `npm run test:e2e` — Executes Playwright hybrid E2E suites with API state injection.
- `npm run agent:triage` — Triggers `Triage Agent` to analyze failed CI artifacts.
