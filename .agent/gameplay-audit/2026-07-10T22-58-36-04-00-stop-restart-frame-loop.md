# Stop, Restart, and Frame Loop Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T22-58-36-04-00`

## Current loop

```txt
requestAnimationFrame(frame)
  -> if stopped, return
  -> game.tick({ time, dt: 1/60 })
  -> source plan
  -> enhancement
  -> render
  -> HUD
  -> requestAnimationFrame(frame)
```

## Stop behavior

```txt
stop()
  -> stopped = true
```

The pending RAF is not cancelled and its id is not retained. The pending callback eventually runs, sees `stopped`, and returns without scheduling a successor.

## Restart race

```txt
running session owns pending RAF A
  -> stop() sets stopped = true but RAF A remains pending
  -> start() sets stopped = false and requests RAF B
  -> RAF A fires and sees stopped = false
  -> RAF B fires and sees stopped = false
  -> both callbacks tick/render and each schedules a successor
```

This creates two simulation/render chains from one stop/start sequence.

## Gameplay consequences

```txt
state.frame can advance twice per display interval
absolute time and fixed dt can be applied by duplicate callbacks
renderer cache counters advance unexpectedly
HUD/GameHost/editor observations race between two chains
future movement/objective reducers would process duplicate frame work
restart cannot prove a clean generation boundary
```

## Required gameplay/session contract

```txt
one sessionId for the mounted runtime
one runId per active generation
callbacks capture the runId they belong to
callback rejects when captured runId != current runId
stop cancels the exact RAF id
restart cancels old ownership before incrementing runId and scheduling
frame count is owned by the accepted run only
```

## Fixture

Use a deterministic fake RAF queue:

```txt
start -> one queued callback
stop -> queue entry cancelled
start -> one new queued callback
flush cancelled old entry -> no tick and no successor
flush active entry -> one tick and one successor
restart repeatedly -> queue never contains more than one active owner
```
