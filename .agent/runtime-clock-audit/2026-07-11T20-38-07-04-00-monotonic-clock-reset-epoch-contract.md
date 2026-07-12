# Monotonic Clock and Reset Epoch Contract

**Timestamp:** `2026-07-11T20-38-07-04-00`

## Required state

```txt
RuntimeClockState
  clockId
  runtimeSessionId
  resetEpoch
  clockRevision
  stepSequence
  simulationTime
  lastAcceptedDelta
  pauseState
  sourceAdapterRevision
  lastResult
```

## Invariants

```txt
simulationTime never decreases within one reset epoch
clockRevision advances once per accepted transition
stepSequence advances once per accepted simulation step
rejected commands mutate nothing
pause does not advance simulationTime
resume rebases source timestamps before the next delta is calculated
reset advances resetEpoch and retires predecessor commands
render time equals committed simulation time or a documented pure projection of it
```

## Source adapters

```txt
browser RAF adapter
  converts source timestamps to bounded requested deltas
browser editor adapter
  requires expected clock state and explicit step intent
Node headless adapter
  creates deterministic bounded batch commands
```

Source adapters may observe wall time, but wall time is not authoritative simulation state.

## Reset transaction

```txt
ResetClockCommand
  -> validate session and expected epoch/revision
  -> fence pending predecessor steps
  -> create next reset epoch
  -> establish declared simulation-time origin
  -> reset game and dynamic render state
  -> publish ResetClockResult
  -> require first post-reset committed frame before ready observation
```

## Journaling

Retain a bounded row for each accepted, clamped, deferred, rejected, reset, pause and resume transition. Rows must be clone-safe and include predecessor and successor revisions.

## Completion proof

A deterministic command script must produce the same clock, game-state and render-time receipts through browser RAF simulation, browser editor stepping and Node headless replay.