---
name: ci-triage-rca-agent
description: "CI/CD failure log and Playwright Trace Viewer RCA analyzer for automated root-cause failure classification and JIRA bug reporting."
---

# CI/CD Failure Triage & RCA Agent

## Overview
Ingests CI build artifacts (Playwright `Trace Viewer` zips, stack traces, console logs) upon test pipeline failure, analyzing root cause errors and outputting markdown summaries.

## Execution Workflow
1. Detect pipeline failure event in GitHub Actions or Jenkins (`if: failure()`).
2. Extract error stack traces and Playwright network trace files.
3. Classify failure category (*Application Bug*, *Environment Timeout*, or *Locator Drift*).
4. Output `rca-summary.json` and post triage summary to PR comments / JIRA.
