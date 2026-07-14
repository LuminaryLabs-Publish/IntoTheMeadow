# Deploy Audit: Browser Observation Fixture Gate

**Timestamp:** `2026-07-13T22-40-52-04-00`

## Summary

The real-browser command is not part of `npm run check`, and the current static smoke validates only that the script and package entry exist. Source, built output and Pages need the same correlated evidence contract.

## Plan ledger

**Goal:** require executable browser observation proof before claiming source, build or deployed-route parity.

- [x] Inspect package script wiring.
- [x] Inspect static smoke coverage.
- [x] Record missing source/build/Pages execution.
- [x] Define fault and parity fixtures.
- [ ] Run fixtures after implementation.

## Required fixtures

```txt
source route, available Chromium, clean port
source route, occupied port by unrelated server
source route, server bind failure
source route, provider import failure
source route, WebGL failure
source route, browser error or unhandled rejection
source route, blank or tiny screenshot
source route, stale predecessor artifacts
source route, browser timeout
source route, server retirement timeout
built-output route with identical manifest contract
GitHub Pages route with immutable deployed revision evidence
```

## Required assertions

```txt
one observation attempt ID
one admitted server generation
one browser session and page generation
one admitted renderer frame
same-page DOM, canvas and screenshot
artifact hashes and dimensions
no predecessor artifact promotion
terminal browser and server retirement receipts
source/build/Pages result parity
```

## Package gate

`editor:browser` should remain separable for local use, but a CI-capable browser evidence command must be included in an explicit proof script or workflow. Static file-presence checks are not executable browser proof.

## Boundary

No scripts, workflows, build output or Pages configuration changed.