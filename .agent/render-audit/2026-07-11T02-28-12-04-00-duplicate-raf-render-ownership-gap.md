# Duplicate RAF Render Ownership Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-28-12-04-00`

## Current render loop

```txt
frame(now)
  -> game.tick
  -> get raw plan
  -> enhance plan
  -> assign lastPlan
  -> renderer.render
  -> assign lastRender
  -> update HUD
  -> requestAnimationFrame(frame)
```

The callback id is never retained.

## Multiplication path

```txt
RAF A is pending
stop() sets stopped=true
start() sets stopped=false and queues RAF B
RAF A and RAF B both execute
both submit renderer.render
both queue successors
```

There is no `runId`, callback token, or exact RAF ownership check.

## Per-display render consequence

With two active chains, one display cadence can receive:

```txt
2 state ticks
2 raw-plan reads
2 enhancement passes
2 renderer submissions
2 outline draws
2 cel/fog draws
2 renderer snapshot replacements
2 HUD writes
2 successor requests
```

The renderer cache may classify both submissions as valid hits, so cache counters cannot detect the lifecycle defect.

## Stale callback consequence

A callback queued before restart can draw after restart because admission checks only `stopped`. It can therefore:

```txt
advance the new run
replace lastPlan
replace lastRender
write the canvas
write the HUD
schedule another stale-descended callback
```

## Fatal render consequence

`showFatal()` does not call:

```txt
cancelAnimationFrame
renderer.dispose
editorBridge.dispose
GameHost release
global lease release
```

WebGL program and buffers remain allocated, and the controller still retains `start()`.

## Renderer disposal gap

The renderer exposes `dispose()`, but:

```txt
the host controller exposes no dispose
boot retains no host controller
fatal does not dispose
stop does not dispose
GameHost exposes no disposal command
editor exposes no disposal command
```

`renderer.dispose()` also lacks an explicit disposed state and typed render-after-dispose rejection.

## Required render-side proof

```txt
one active run owns one pending RAF
stale callbacks cannot call renderer.render
stop cancels the pending callback
restart admits exactly one new callback chain
fatal and dispose release WebGL resources
render after disposal returns a stable rejection
renderer snapshots include sessionId and runId
render submissions include admitted frame identity
```

## Do not change yet

```txt
shader equations
mesh topology
camera framing
cel bands
fog
outline width
meadow content
```

This is a render-ownership correction, not a visual tuning pass.
