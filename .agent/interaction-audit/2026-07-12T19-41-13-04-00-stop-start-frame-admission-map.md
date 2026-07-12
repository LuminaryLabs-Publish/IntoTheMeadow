# Stop, Start and Frame Admission Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-41-13-04-00`

## Summary

`stop()` changes a boolean but does not cancel or retire the browser callback lease. `start()` can schedule a second callback before the pending predecessor runs, allowing two recursive RAF chains to advance and render concurrently.

## Plan ledger

**Goal:** make start, stop, fatal and callback handling generation-bound, idempotent and single-chain.

- [x] Trace initial RAF scheduling.
- [x] Trace frame successor scheduling.
- [x] Trace stop, start and fatal behavior.
- [x] Identify pending-callback and duplicate-chain race.
- [x] Define command admission and terminal results.
- [ ] Add controlled fake-RAF fixtures later.

## Current race

```txt
callback A is pending
  -> stop() sets stopped = true
  -> start() sets stopped = false
  -> start() requests callback B
  -> callback A runs and sees stopped = false
  -> A ticks, renders and requests A2
  -> callback B ticks, renders and requests B2
  -> two chains remain live
```

## Required commands

```txt
StartSchedulerCommand
  runtimeSessionId
  expectedSchedulerGeneration
  commandId

StopSchedulerCommand
  runtimeSessionId
  schedulerGeneration
  expectedRafLeaseId
  reason
  commandId

FrameCallbackCommand
  runtimeSessionId
  schedulerGeneration
  rafLeaseId
  callbackSequence
  rawNow
```

## Required results

```txt
Started
AlreadyRunning
Stopped
AlreadyStopped
CancelledPendingCallback
StaleGeneration
StaleLease
RejectedInvalidClock
Failed
```

## Admission map

```txt
start while stopped
  -> allocate successor generation and one RAF lease
  -> request exactly one callback

start while running
  -> return AlreadyRunning
  -> request no callback

stop while running
  -> invalidate generation or lease
  -> cancel pending RAF handle when present
  -> return terminal stop result

late predecessor callback
  -> return StaleGeneration or StaleLease
  -> zero tick, render and successor scheduling

fatal during frame
  -> retire current lease
  -> publish Failed and explicit stopped state
  -> no hidden successor callback
```

## Raw host boundary

`window.GameHost.game` currently exposes direct `tick()` and `reset()`. The scheduler authority must replace raw mutation with bounded commands or reject calls that do not cite the active runtime session and scheduler generation.
