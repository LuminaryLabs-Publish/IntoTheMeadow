# Interaction Audit: Startup Command and Result Map

**Timestamp:** `2026-07-14T15-38-28-04-00`

## Summary

Startup is currently an implicit promise plus later UI side effects. The caller can observe rejection only for work performed before `startWebHost()` schedules RAF; first-frame failure occurs after resolution and has no typed result.

## Plan ledger

**Goal:** define explicit startup commands, states, results, and public interaction gates.

- [x] Map current promise and RAF outcomes.
- [x] Map public editor capability timing.
- [x] Define terminal result classes.
- [ ] Implement typed command/result handling later.

## Current result map

| Event | Current outcome |
|---|---|
| Provider import fails | `startWebHost()` rejects; boot catch shows error |
| Game or renderer construction fails | `startWebHost()` rejects; boot catch shows error |
| First plan validation fails | Promise already resolved; `showFatal()` updates UI |
| First renderer submission fails | Promise already resolved; `showFatal()` updates UI |
| Editor command before first frame | Admitted against candidate game/renderer |
| Startup retry | No attempt identity or stale-attempt policy |

## Required commands

```txt
BrowserStartupCommand
BrowserStartupCancelCommand
BrowserStartupRetryCommand
```

## Required results

```txt
BrowserStartupResult {
  bootAttemptId
  startupRevision
  providerFingerprint
  gameRevision
  renderPlanFingerprint
  rendererGeneration
  firstVisibleFrameId
  status: Ready
  participantReceipts
}

BrowserStartupFailureResult {
  bootAttemptId
  failedStage
  errorFingerprint
  retiredParticipants
  rollbackReceipt
  status: Failed | Cancelled | Superseded
}
```

## Interaction gates

Before Ready, mutation and capture capabilities must return a typed `not-ready`, `failed`, `cancelled`, or `superseded` result. Read-only diagnostics must identify the active boot attempt and construction stage.

## Boundary

No command surface changed in this pass.