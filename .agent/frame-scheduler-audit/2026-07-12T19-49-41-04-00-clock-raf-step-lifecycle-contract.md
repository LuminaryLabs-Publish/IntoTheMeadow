# Clock, RAF, Step and Lifecycle Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-49-41-04-00`

## Summary

The host has a Boolean stop flag but no owned callback lease, scheduler generation or fixed-step state. This contract defines single-chain lifecycle and bounded elapsed-time handling without moving browser APIs into gameplay domains.

## Plan ledger

**Goal:** make start, callback, pause, resume, stop, fatal retirement and disposal one coherent scheduler lifecycle.

- [x] Define scheduler phases.
- [x] Define callback and successor ownership.
- [x] Define fixed-step accumulator rules.
- [x] Define pause/resume and fatal retirement.
- [x] Define observability and idempotency requirements.
- [ ] Implement after acceptance.

## Scheduler phases

```txt
NEW
STARTING
RUNNING
PAUSED
STOPPING
STOPPED
FAILED
DISPOSED
```

## Lifecycle rules

```txt
start
  allowed from NEW or STOPPED
  allocates a new scheduler generation and RAF lease
  schedules exactly one callback
  repeated start while RUNNING returns an idempotent no-op result

callback
  must cite current generation, lease and expected sequence
  samples the clock once
  commits at most one successor schedule result

pause
  revokes gameplay step admission
  applies explicit accumulator preserve/drop policy
  may continue render-only frames only under an authored mode

resume
  revalidates clock continuity
  allocates a fresh generation when continuity cannot be proven

stop
  retires the current lease
  cancels the retained RAF handle when possible
  rejects late callbacks
  is idempotent

fatal
  performs stop retirement before fatal projection
  records the terminal reason

dispose
  requires STOPPED or performs ordered retirement
  revokes public mutation capabilities
```

## Fixed-step state

```txt
stepSeconds
accumulatorSeconds
maxAccumulatedSeconds
maxStepsPerFrame
maxStepCpuMs
simulationTime
simulationRevision
droppedSecondsTotal
deferredSeconds
```

## Observation

Every callback attempt should publish a bounded `FrameObservation` containing admission status, clock classification, executed steps, overflow handling, render result and successor ownership. Journal retention must be bounded.

## Critical fixtures

```txt
stop with pending callback
stop then immediate start
repeated start
late predecessor callback
long hidden-tab stall
clock regression
fatal during render
reset while callback is pending
dispose after failure
```

## Completion boundary

A Boolean flag and recursive callback are not lifecycle proof. Completion requires owned handles, generation checks, typed terminal results and deterministic single-chain fixtures.