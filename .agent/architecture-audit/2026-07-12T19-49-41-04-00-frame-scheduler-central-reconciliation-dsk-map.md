# Frame Scheduler and Step Admission Central Reconciliation DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-49-41-04-00`

## Summary

The browser host currently owns callback scheduling, simulation advancement, render-time projection, draw invocation and successor scheduling inside one closure. The missing coordinating parent is `meadow-frame-scheduler-step-admission-authority-domain`.

## Plan ledger

**Goal:** preserve bounded ownership while adding explicit clock, scheduler, step-batch, lifecycle and visible-frame contracts.

- [x] Keep browser RAF ownership in `web-host-dsk`.
- [x] Keep game mutation in `into-the-meadow-game-dsk`.
- [x] Keep WebGL resources and draw submission in `meadow-webgl-renderer-v2-kit`.
- [x] Assign budgets to the performance boundary.
- [x] Assign frame observations to diagnostics.
- [x] Define typed cross-owner results.
- [ ] Implement after contract approval.

## Existing owners

```txt
web-host-dsk
  browser loop, boot, fatal projection and raw host publication
  missing RAF lease, generation, callback id and cancellation result

into-the-meadow-game-dsk
  state, tick, reset and snapshot
  tick accepts caller-owned time/dt without scheduler authority

meadow-performance-dsk
  quality and budget declarations
  no fixed-step or catch-up budget implementation

meadow-render-host-dsk
  render-plan ingestion and renderer state
  no clocked frame-result contract

meadow-webgl-renderer-v2-kit
  WebGL resources, mesh cache and draw submission
  consumes absolute render-plan time without simulation correlation

meadow-diagnostics-dsk
  runtime/render/determinism declarations
  no frame journal or scheduler liveness result
```

## Required parent domain

```txt
meadow-frame-scheduler-step-admission-authority-domain
```

## Bounded subdomains

```txt
runtime clock
  monotonic clock identity, generation, samples and discontinuity classification

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

## Required transaction

```txt
FrameCallbackCommand
  -> validate session, scheduler generation and RAF lease
  -> sample and classify monotonic time
  -> accumulate bounded elapsed time
  -> admit zero or more fixed SimulationStepCommand values
  -> publish SimulationStepBatchResult
  -> publish dropped/deferred time explicitly
  -> derive RenderTimeProjection from committed simulation plus interpolation
  -> render one frame citing clock and simulation revisions
  -> schedule exactly one successor or commit stop
  -> publish FrameClockCorrelation and FrameObservation
  -> acknowledge the first visible clocked frame
```

## Invariants

```txt
one live RAF chain per runtime generation
finite nonnegative bounded temporal inputs only
refresh-rate-independent simulation time
bounded work after stalls
explicit dropped/deferred time
stale callbacks perform zero mutation
render snapshots cite matching clock and simulation revisions
stop/fatal/dispose retire the active lease exactly once
```

## Non-ownership

This domain does not define movement, objectives, story, input semantics or WebGL resource construction. It coordinates their time and lifecycle boundaries.