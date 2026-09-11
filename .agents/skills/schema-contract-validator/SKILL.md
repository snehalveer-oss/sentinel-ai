---
name: schema-contract-validator
description: "OpenAPI and PostgreSQL runtime schema drift validator enforcing API contracts and field-level integrity before E2E execution."
---

# Schema Contract Validator

## Overview
Compares live endpoint responses against OpenAPI/Swagger specifications and database schemas using Zod runtime validation to catch breaking contract changes early.

## Execution Workflow
1. Fetch target OpenAPI specification JSON.
2. Execute REST API endpoints via `APIRequestContext`.
3. Validate payload structures against Zod runtime schemas.
4. Export schema diff report to `schema-diff.json`.
