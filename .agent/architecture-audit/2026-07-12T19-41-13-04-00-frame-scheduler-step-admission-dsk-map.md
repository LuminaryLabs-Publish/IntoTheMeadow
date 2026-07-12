# Frame Scheduler and Step Admission DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-41-13-04-00`

## Summary

The web host currently combines browser callback ownership, simulation advancement, render-time projection, rendering and successor scheduling in one closure without revisioned ownership or typed results. The missing cross-cutting parent is `meadow-frame-scheduler-step-admission-authority-domain`.

## Plan ledger

**Goal:** map the smallest authority that preserves bounded domain ownership while making time and callback admission explicit.

- [x] Keep browser RAF ownership in the web-host boundary.
- [x] Keep gameplay state mutation in the game owner.
- [x] Keep rendering and GPU resources in the renderer owner.
- [x] Add typed clock, scheduler, step-batch and correlation contracts.
- [x] Add pause, resume, stop and stale-callback results.
- [x] Add deterministic fixture and visible-frame proof contracts.
- [ ] Implement only after the contracts are accepted.

## Current ownership map

```txt
web-host-dsk
  owns browser-loop label
  implementation owns RAF callback and stopped boolean
  no lease, generation, callback id or cancellation result

into-the-meadow-game-dsk
  owns game state, tick, reset and snapshot
  tick admits arbitrary caller time/dt
  no expected revision or scheduler authority

meadow-performance-dsk
  declares quality/budget policy
  does not currently own step count or CPU catch-up budgets

meadow-render-host-dsk
  owns render ingestion and renderer state
  no clocked frame-result contract

meadow-webgl-renderer-v2-kit
  owns WebGL resources and draw submission
  consumes render-plan time
  no simulation/clock correlation receipt

meadow-diagnostics-dsk
  declares runtime/render/determinism diagnostics
  no frame-clock journal or liveness observation
```

## Required parent domain

```txt
meadow-frame-scheduler-step-admission-authority-domain
```

## Bounded subdomains

```txt
runtime clock
  monotonic source, clock id, generation, sample and discontinuity classification

frame scheduler
  scheduler generation, RAF lease, callback sequence and successor ownership

simulation stepping
  fixed-step policy, accumulator, count/CPU budgets and batch result

lifecycle
  pause, resume, stop, fatal retirement and stale predecessor rejection

render projection
  interpolation, render-time projection and game/render clock correlation

observation
  bounded journal, diagnostics and first visible clocked-frame acknowledgement
```

## Candidate kits

```txt
runtime-clock-id-kit
runtime-clock-generation-kit
raf-lease-kit
frame-scheduler-generation-kit
frame-clock-sample-kit
frame-delta-classification-kit
fixed-step-policy-kit
fixed-step-accumulator-kit
fixed-step-budget-kit
simulation-step-command-kit
simulation-step-batch-result-kit
dropped-time-result-kit
deferred-time-result-kit
pause-command-kit
resume-command-kit
scheduler-stop-result-kit
stale-frame-callback-rejection-kit
render-time-projection-kit
frame-clock-correlation-kit
frame-observation-kit
frame-journal-kit
first-clocked-frame-ack-kit
refresh-rate-parity-fixture-kit
long-stall-budget-fixture-kit
stop-start-single-chain-fixture-kit
invalid-clock-input-fixture-kit
browser-frame-clock-smoke-kit
pages-frame-clock-smoke-kit
```

## Service contracts

```txt
FrameClockSample
  clockId, clockGeneration, schedulerGeneration, rafLeaseId,
  callbackSequence, rawNow, priorNow, elapsed, classification

FixedStepPolicy
  stepSeconds, maxAccumulatedSeconds, maxStepsPerFrame,
  maxStepCpuMs, overflowPolicy

SimulationStepBatchResult
  frameId, accepted, reason, revisionBefore, revisionAfter,
  executedSteps, simulatedSeconds, accumulatorBefore,
  accumulatorAfter, droppedSeconds, deferredSeconds

RenderTimeProjection
  frameId, simulationRevision, clockRevision,
  simulationTime, interpolationAlpha, renderTime

FrameResult
  frameId, status, clockSampleId, stepBatchId,
  renderProjectionId, renderSnapshotId, successorScheduleResult

VisibleFrameAck
  frameId, clockRevision, simulationRevision,
  renderRevision, presentationEvidence
```

## Dependency order

```txt
1. runtime clock identity and monotonic sample
2. scheduler generation and RAF lease
3. fixed-step policy and accumulator
4. batch admission and overflow result
5. render-time projection and correlation
6. pause/resume/stop retirement
7. observation journal and visible acknowledgement
8. browser, build and Pages fixtures
```

## Non-ownership

```txt
does not define player movement
does not define objectives or story
does not own WebGL resources
does not own browser input semantics
does not invent a second game state
does not turn wall-clock time into gameplay truth
```
