# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T19-41-13-04-00`

## Summary

Implement frame-clock ownership before the exploration loop consumes dt. The web host should own browser callbacks, the game should accept only admitted fixed steps, and the renderer should consume a correlated render-time projection.

## Plan ledger

**Goal:** prove one deterministic browser frame from monotonic callback admission through bounded simulation and a matching visible frame.

### Scheduler foundation

- [ ] Add runtime clock and scheduler identities.
- [ ] Retain the active RAF handle and lease.
- [ ] Make `start()` and `stop()` typed, idempotent commands.
- [ ] Reject late callbacks from retired generations.
- [ ] Retire the RAF lease on fatal errors and disposal.

### Clock and fixed steps

- [ ] Sample monotonic RAF time once.
- [ ] Classify first, normal, stalled, regressed and invalid samples.
- [ ] Add a fixed-step accumulator.
- [ ] Add maximum accumulated time, steps-per-frame and CPU-time budgets.
- [ ] Publish deferred or dropped time explicitly.
- [ ] Reset or preserve the accumulator through an authored pause/resume policy.

### Game boundary

- [ ] Replace arbitrary public `tick({time, dt})` with admitted step commands.
- [ ] Validate finite, nonnegative and bounded temporal values.
- [ ] Add expected session, scheduler and simulation revisions.
- [ ] Quarantine raw `window.GameHost.game` mutation.
- [ ] Bind `reset()` to a new clock/simulation generation.

### Render correlation

- [ ] Derive render time from committed simulation plus interpolation.
- [ ] Add frame, clock and simulation revisions to renderer snapshots.
- [ ] Publish `FrameClockCorrelation`.
- [ ] Publish `FirstClockedFrameAck` only after successful draw.

### Proof

- [ ] Add fake-RAF single-chain fixtures.
- [ ] Add 30/60/120 Hz parity fixtures.
- [ ] Add jitter and long-stall fixtures.
- [ ] Add invalid-time and clock-regression fixtures.
- [ ] Add pause/resume and fatal-retirement fixtures.
- [ ] Add source, built-output and Pages browser observations.

## Required command

```txt
FrameCallbackCommand {
  frameId
  runtimeSessionId
  clockGeneration
  schedulerGeneration
  rafLeaseId
  callbackSequence
  rawNow
}
```

## Required result

```txt
FrameResult {
  frameId
  status
  reason
  clockSampleId
  clockRevision
  stepBatchId
  simulationRevisionBefore
  simulationRevisionAfter
  executedSteps
  droppedSeconds
  deferredSeconds
  renderTimeProjectionId
  renderSnapshotId
  successorScheduleResult
}
```

## Architecture order

```txt
1. Runtime clock identity and sample admission
2. Scheduler generation and RAF lease
3. Fixed-step accumulator and budgets
4. Game step-command admission
5. Render-time projection and correlation
6. Pause/resume/stop/fatal retirement
7. Visible-frame acknowledgement
8. Exploration and progression time consumption
9. Audio, persistence and replay timing
10. Source/build/Pages proof
```
