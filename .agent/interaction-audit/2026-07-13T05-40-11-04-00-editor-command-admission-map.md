# Interaction Audit: Editor Command Admission Map

**Generated:** `2026-07-13T05-40-11-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The browser editor exposes a generic `invoke(action, arguments)` interaction surface. Availability and JavaScript exceptions are handled, but command identity, mutation class, expected revisions, scheduler ownership, cancellation and lifecycle state are not admitted.

## Plan ledger

**Goal:** map every editor interaction to one typed terminal result with zero-mutation rejection.

- [x] Inventory observation and mutation capabilities.
- [x] Trace generic invoke success and failure wrappers.
- [x] Identify missing admission evidence.
- [x] Define command/result states.
- [ ] Implement and test the map later.

## Capability classes

```txt
observation
  runtime.status
  runtime.getState
  runtime.getSnapshot
  scene.getRenderPlan
  scene.getStatistics
  renderer.getSnapshot
  renderer.getEnhancerSnapshot
  renderer.capture
  browser.getViewport
  browser.getErrors

mutation
  runtime.tick
  runtime.reset
```

## Current admission

```txt
lookup action in Map
  -> unavailable when missing
  -> clone arguments
  -> execute capability
  -> completed when no exception
  -> failed when exception
```

## Missing admission

```txt
editor environment ID and generation
command ID and duplicate policy
capability registry revision
observation or mutation classification
argument schema and bounds
expected state/render revision
scheduler generation and lease
stopped/retired environment state
cancellation and timeout
state mutation receipt
visible-frame requirement and acknowledgement
```

## Required terminal states

```txt
Accepted
Rejected
Unavailable
Invalid
Stale
Duplicate
Busy
Cancelled
Retired
Failed
```

All non-accepted mutation results must perform zero state mutation.

## Required command flow

```txt
caller
  -> EditorCapabilityCommand
  -> environment admission
  -> capability policy admission
  -> argument admission
  -> observation path or exclusive mutation path
  -> EditorCapabilityResult
  -> optional EditorVisibleFrameAck
```

## Boundary

No editor interaction behavior changed and no command fixture was executed.
