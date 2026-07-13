# Context-Loss Blank-Meadow Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T21-40-09-04-00`

## Summary

A WebGL context loss can sever meadow presentation from ongoing host state. The game and RAF loop can continue advancing and publishing diagnostics while the renderer has no authority to suspend, recover or declare a terminal surface outcome.

## Plan ledger

**Goal:** record how context loss affects the player-facing loop and which gameplay consumers must wait for a typed renderer result.

- [x] Trace game tick, plan enhancement, two-pass rendering and debug projection.
- [x] Identify loss behavior not represented in game or renderer state.
- [x] Separate simulation continuity from presentation recovery policy.
- [x] Define player-facing Lost, Restoring, Recovered and ReloadRequired outcomes.
- [ ] Implement and observe the outcomes later.

## Current loop

```txt
RAF callback
  -> game.tick
  -> plan enhancement
  -> renderer.render
  -> debug text reports vertices/cache/editor state
  -> successor RAF
```

## Failure loop

```txt
browser loses WebGL context
  -> no context event reaches the runtime
  -> game can continue ticking
  -> renderer continues receiving plans
  -> draw calls have no admitted visible result
  -> renderer snapshot can still look healthy
  -> debug status can continue reporting vertex/cache values
  -> player may see a blank or frozen meadow with no recovery state
```

Potential follow-on inconsistencies:

```txt
future movement/progression continues while surface is unavailable
input remains admitted without visible feedback
diagnostics claim render completion from stale readback
editor capture observes a canvas that does not match runtime snapshot
repeated context loss has no run or renderer generation boundary
```

## Required gameplay policy

The context-recovery domain owns the technical lifecycle. Product/gameplay policy must explicitly choose one of:

```txt
PauseSimulation
  -> suspend gameplay time and input until recovery

ContinueHeadless
  -> continue admitted simulation with explicit presentation-unavailable state
  -> preserve replay/save evidence

TerminalReload
  -> stop simulation and expose a reload-required outcome
```

No policy should be inferred from whether WebGL calls happen to throw.

## Required visible states

```txt
Rendering
Presentation Lost
Restoring Graphics
Recovered
Reload Required
```

Each state must cite the active runtime session and context generation. Recovery must not hide the status until the first visible restored frame is acknowledged.

## Proof required

```txt
loss during idle meadow
loss while future input/movement is active
pause-vs-continue policy fixture
truthful debug/HUD projection
editor screenshot/readback parity
terminal reload path
first visible recovered frame
```
