# Step Command Admission Map

**Timestamp:** `2026-07-11T20-38-07-04-00`

## Current callers

```txt
RAF callback
browser NexusEditorEnvironment runtime.tick
raw GameHost.game.tick
Node headless runtime.tick
```

All can reach `game.tick()` without a shared command schema or admission result.

## Required command

```txt
SimulationStepCommand
  commandId
  source
  runtimeSessionId
  resetEpoch
  expectedClockRevision
  expectedStepSequence
  requestedDelta
  requestedTicks
  sourceTimestamp
  workBudget
```

## Admission order

```txt
validate lifecycle and session
  -> validate reset epoch
  -> validate expected revision and sequence
  -> validate finite non-negative delta
  -> validate integer bounded tick count
  -> apply pause/resume policy
  -> apply work budget
  -> accept, clamp, defer or reject
  -> mutate once under step identity
  -> return typed result
```

## Required rejection reasons

```txt
runtime-not-active
stale-session
stale-reset-epoch
stale-clock-revision
stale-step-sequence
non-finite-delta
negative-delta
delta-over-limit
invalid-tick-count
work-budget-exceeded
paused
source-not-authorized
```

## Public surface rule

`GameHost.game` must not remain a bypass. Browser editor and Node capabilities should return the domain result rather than treating function return as transport success.

## Evidence

Every accepted command must correlate with state frame and, when rendering is requested, one committed frame. Every rejected command must prove no state, plan time, renderer or canvas mutation.