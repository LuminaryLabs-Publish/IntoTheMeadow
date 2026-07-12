# Camera Grass Admission Reconciliation

**Timestamp:** `2026-07-12T13-54-00-04-00`

## Summary

There is no command boundary between committed camera observation and grass draw selection. Camera state is consumed only for matrices after static mesh selection.

## Plan ledger

**Goal:** define typed admission from camera evidence to one accepted visible-set result.

- [x] Record current missing boundary.
- [x] Define command and result evidence.
- [x] Define stale rejection and predecessor preservation.
- [ ] Implement later.

## Required command evidence

```txt
commandId
runtimeSessionId
runtimeGeneration
frameId
cameraRevision
viewportRevision
topologyKey
grassPolicyRevision
performanceRevision
predecessorVisibilityRevision
camera and viewport payloads
stable patch bounds
budgets
```

## Required result states

```txt
Accepted
AcceptedBudgetReduced
RejectedInvalidCamera
RejectedInvalidViewport
RejectedInvalidPatchBounds
RejectedStaleCamera
RejectedStaleViewport
RejectedStaleTopology
RejectedStalePolicy
RejectedBudgetImpossible
RejectedCandidateBuild
Retired
```

## Admission rule

A result may replace the predecessor only when every input revision still matches at commit. Rejected or stale work must not mutate the active mesh or draw generation.
