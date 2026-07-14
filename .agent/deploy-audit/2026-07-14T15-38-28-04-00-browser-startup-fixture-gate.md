# Deploy Audit: Browser Startup Fixture Gate

**Timestamp:** `2026-07-14T15-38-28-04-00`

## Summary

Current Node checks cover source and editor behavior, but there is no browser fixture proving loading-state accuracy, first-frame admission, failed-start rollback, or source/build/Pages parity.

## Plan ledger

**Goal:** define the minimum executable gate for accepting browser startup readiness.

- [x] Review declared package scripts.
- [x] Identify missing browser startup cases.
- [x] Define source, built-output, and deployed-origin evidence.
- [ ] Execute fixtures after runtime implementation.

## Required fixture matrix

```txt
provider import success
provider import failure
invalid provider export
DSK validation failure
first render-plan validation failure
first renderer submission failure
startup cancellation during provider load
startup supersession by retry
early editor tick/reset/capture rejection
loading remains visible until accepted frame
GameHost absent or explicitly Constructing before adoption
NexusEditorEnvironment absent or read-only before adoption
failed candidate listeners and GPU resources retired
one Ready result and one matching FirstVisibleMeadowFrameAck
source, built output and Pages behavior parity
```

## Required artifacts

```txt
boot-attempt manifest
provider and source fingerprints
browser console and page-error log
participant preparation and retirement receipts
first-frame screenshot and pixel dimensions
GameHost readiness snapshot
editor capability readiness snapshot
artifact hash manifest
public Page URL and deployed identity receipt
```

## Existing scripts not sufficient alone

`npm run check` currently runs static, DSK, render-plan, renderer, deterministic-scene, headless-editor, command, and loop smokes. Those do not prove an actual browser first frame or startup rollback.

## Boundary

No workflow, build, browser, or Pages run was executed.