# RAF Lease and Fixed-Step Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-41-13-04-00`

## Summary

This contract defines the authoritative browser-frame boundary required before the existing exploration and progression authority can safely consume time.

## Plan ledger

**Goal:** specify deterministic time ownership, bounded work and complete frame provenance without coupling browser APIs to gameplay rules.

- [x] Define clock, scheduler and RAF identities.
- [x] Define callback admission.
- [x] Define fixed-step accumulation and budgets.
- [x] Define overflow, pause, resume and stop results.
- [x] Define render-time correlation and visible acknowledgement.
- [x] Define deterministic fixtures.
- [ ] Implement in the web-host and game boundaries later.

## Identities

```txt
RuntimeClockId
RuntimeClockGeneration
FrameSchedulerGeneration
RafLeaseId
FrameId
CallbackSequence
ClockRevision
SimulationRevision
RenderRevision
```

## Callback admission

A callback is accepted only when:

```txt
runtime session is active
scheduler phase is running
scheduler generation matches
RAF lease matches
callback sequence is the expected successor
raw time is finite
raw time does not violate monotonic policy
```

Rejected callbacks perform:

```txt
simulation mutation: none
render submission: none
successor scheduling: none
journal entry: bounded typed result only
```

## Fixed-step algorithm

```txt
elapsed = classifyAndBound(now - previousNow)
accumulator = min(accumulator + elapsed, maxAccumulatedSeconds)

while accumulator >= stepSeconds
  and executedSteps < maxStepsPerFrame
  and elapsedStepCpu < maxStepCpuMs:
    execute one admitted SimulationStepCommand
    accumulator -= stepSeconds

remaining overflow
  -> DeferredTimeResult or DroppedTimeResult by policy

interpolationAlpha
  -> clamp(accumulator / stepSeconds, 0, 1)
```

## Pause and resume

```txt
pause
  -> retire active RAF lease
  -> preserve or clear accumulator by explicit policy
  -> publish PauseResult

resume
  -> allocate successor scheduler generation and RAF lease
  -> reset prior raw-time sample
  -> avoid hidden-tab catch-up unless explicitly configured
  -> publish ResumeResult
```

## Render correlation

```txt
RAF callback
  -> validate current runtime session, scheduler generation and RAF lease
  -> sample monotonic time
  -> classify first, normal, stalled, regressed, cancelled or stale
  -> accumulate bounded elapsed time
  -> admit zero or more fixed simulation steps under count and CPU budgets
  -> publish SimulationStepBatchResult
  -> publish explicit deferred-time or dropped-time result
  -> derive render time from committed simulation and interpolation evidence
  -> render one frame citing clock, step and render revisions
  -> schedule exactly one successor callback or commit an explicit stop
  -> publish FrameClockCorrelation and FrameObservation
  -> acknowledge the first visible frame citing the accepted frame result
```

## Fixture expectations

```txt
refresh-rate parity: deterministic
jitter parity: deterministic
single-chain after repeated start: exactly one
late callback after stop: zero mutation
long stall: bounded work
invalid time: typed rejection
render snapshot: cites frame/clock/simulation revisions
visible acknowledgement: follows successful draw only
```
