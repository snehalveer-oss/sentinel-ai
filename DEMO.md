# DEMO — Sentinel-AI Execution Walkthrough Guide

This guide provides a step-by-step walkthrough to execute and verify `Sentinel-AI` locally or in technical interviews.

---

## 🎬 Demo Step 1: Initialize Database & Environment

Ensure PostgreSQL container is active:
```bash
docker-compose up -d
```
*Expected Output:*
```text
Container sentinel_postgres Started
```

---

## 🎬 Demo Step 2: Trigger `Data Agent` (Synthetic Data Generation)

Run the autonomous synthetic relational test data agent:
```bash
npm run agent:seed
```
*Expected Output:*
```text
[Data Agent] Starting Agentic Synthetic Relational Test Data Generation...
[Data Agent] Using Deterministic Static Fallback Manifest (Zero Latency / Rate-Limit Protected)
[Data Agent] Seed Data Exported to: /sentinel-ai/src/data/seed-output.json
```

---

## 🎬 Demo Step 3: Trigger `Contract Agent` (API Schema Drift Validation)

Validate OpenAPI payloads against Zod runtime schemas:
```bash
npm run agent:contract
```
*Expected Output:*
```text
[Contract Agent] Executing Runtime OpenAPI & Zod Schema Validation...
[Contract Agent] Contract Validation PASSED | Violations: 0
[Contract Agent] Manifest Exported to: /sentinel-ai/src/data/schema-diff.json
```

---

## 🎬 Demo Step 4: Execute Hybrid Playwright E2E & SQL Assertion Suite

Run Playwright test suite with pre-seeded API state:
```bash
npm run test:e2e -- --project=chromium
```
*Expected Output:*
```text
Running 1 test using 1 worker

[Playwright Hybrid Fixture] Pre-seeded user context injected: SUB_645520 (subscriber_645520@telecom-sentinel.io)
[E2E Test] Testing Hybrid Journey for Order: ORD_645520
[E2E Test] UI Assertions Passed | Verifying SQL Database Record Persistence...
  ✓ 1 [chromium] › src/tests/hybridE2E.spec.ts:5:7 › Sentinel-AI Hybrid E2E & Database Reconciliation Suite (792ms)

1 passed (2.9s)
```

---

## 🎬 Demo Step 5: Trigger `Triage Agent` (Post-Failure Root Cause Analysis)

Run the CI failure triage agent:
```bash
npm run agent:triage
```
*Expected Output:*
```text
[Triage Agent] Ingesting CI Build Failure Artifacts & Playwright Traces...
[Triage Agent] RCA Triage Complete | Classification: NO_FAILURES
[Triage Agent] Manifest Exported to: /sentinel-ai/src/data/rca-summary.json
```
