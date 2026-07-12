# Interaction Audit: Performance Observation to Quality Command

**Timestamp:** `2026-07-12T07-19-47-04-00`

## Summary

No semantic command boundary currently exists between frame observations and quality changes. A future adaptive system must not mutate renderer options directly from RAF timing samples.

## Plan ledger

**Goal:** define one command/result path from normalized performance evidence through stable admission, multi-consumer preparation, atomic commit and visible-frame acknowledgement.

- [x] Identify observation ingress and current missing command boundary.
- [x] Define command, result and rejection states.
- [x] Define browser/editor parity requirements.
- [ ] Implement fixtures.

## Required map

```txt
FramePerformanceObservation
  -> validate runtime/session/context/surface/frame generations
  -> append to bounded rolling window
  -> evaluate named budget policy
  -> apply hysteresis, cooldown and capability limits
  -> emit no-op or QualityTransitionCommand
  -> validate expected quality/topology/surface revisions
  -> prepare grass, terrain, post, surface and renderer adapters
  -> commit QualityTransitionResult or preserve predecessor
  -> require first visible-frame acknowledgement
  -> publish detached observation and journal row
```

## Command

```txt
QualityTransitionCommand {
  commandId
  runtimeSessionId
  rendererGeneration
  predecessorQualityRevision
  targetTier
  reason
  performanceWindowId
  capabilitySnapshotId
  expectedTopologyKey
  expectedSurfaceRevision
}
```

## Result

```txt
QualityTransitionResult {
  status: COMMITTED | NO_CHANGE | DEFERRED | REJECTED | FAILED | STALE
  reason
  commandId
  predecessorQualityRevision
  committedQualityRevision
  consumerResults
  topologyResult
  rollbackResult
  firstVisibleFrameId
}
```

## Admission rules

```txt
one frame spike cannot bypass hysteresis
stale session, context, surface or quality revision cannot commit
editor commands use the same policy and result types
manual tier selection and auto decisions share one transaction
unsupported GPU timing is an explicit capability result
partial consumer success cannot become public
```

## Boundary

No runtime command or editor capability was added.