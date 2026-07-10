# Frame Loop, Stop, Start, and Session Loop

**Timestamp:** `2026-07-10T19-48-09-04-00`

## Current loop

```txt
startWebHost
  -> requestAnimationFrame(frame)
  -> frame sees stopped === false
  -> tick game
  -> render
  -> requestAnimationFrame(frame)
```

`stop()` sets `stopped = true`. `start()` sets it back to false and immediately schedules another callback.

## Failure mode

Because the pending RAF id is not retained or cancelled, this sequence is unsafe:

```txt
callback A is already scheduled
  -> stop()
  -> start() before callback A runs
  -> callback B is scheduled
  -> callback A observes stopped === false and runs
  -> callback B also runs
  -> two recursive loops can continue
```

The normal boot path discards the returned host controller, so even the incomplete stop/start methods are not available to GameHost or the editor bridge.

## Gameplay impact

The current game mutates only frame/time state, but duplicated loops still distort:

```txt
frame count
lastTick
renderer cache-hit counts
editor observations
future movement and objective reducers
future command sequence/frame attribution
performance measurements
```

Lifecycle authority must therefore precede adding authoritative gameplay commands; otherwise deterministic command fixtures can pass headlessly while the browser host advances the same session through multiple frame loops.

## Required behavior

```txt
created -> running -> stopped -> running -> disposed
created -> starting -> failed -> disposed
running -> fatal -> disposing -> disposed
```

Only one RAF may be owned by a session at any time. Stop, restart, and dispose results must be explicit and idempotent.