---
name: agentic-test-data-gen
description: "LLM schema-aware synthetic relational test data generator parsing SQL DDL schemas and OpenAPI specs to produce PII-compliant test datasets."
---

# Agentic Synthetic Test Data Generator

## Overview
Parses relational PostgreSQL DDL schemas, foreign key dependencies, unique constraints, and OpenAPI payload definitions to auto-generate schema-compliant JSON/SQL seed data.

## Execution Workflow
1. Read DDL schema file or extract from PostgreSQL database.
2. Resolve foreign key graphs and constraint rules.
3. Invoke LLM prompt templates to synthesize high-cardinality edge-case datasets (valid IBANs, telephone numbers, discount codes).
4. Export data manifest to `seed-output.json` for API pre-seeding.
