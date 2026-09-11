---
name: playwright-hybrid-patterns
description: "Recipes and fixtures for pairing REST API state pre-seeding with accessibility-first Playwright UI automation."
---

# Playwright Hybrid Testing Patterns

## Overview
Demonstrates hybrid E2E testing recipes: using REST APIs to authenticate and inject state into browser contexts via `storageState`, bypassing UI setup steps, and driving UI journeys using accessibility locators (`getByRole`, `getByTestId`).

## Key Patterns
1. **API Pre-seeding**: Perform POST requests via `APIRequestContext` to inject user state in <200ms.
2. **Session Preservation**: Cache JWT/cookies in `storageState` to bypass repetitive UI logins.
3. **Resilient Locators**: Standardize on `getByRole('button', { name: 'Submit' })` and `getByTestId()`.
