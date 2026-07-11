# Tick and Reset Frame Commit Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T00-30-48-04-00`

## Current gameplay state

`advanceGameState` returns a new immutable state with incremented `frame` and `lastTick`. `game.tick` immediately assigns that state. `game.reset` immediately assigns a new initial state.

## Current paths

```txt
RAF:
  game.tick -> plan -> render

browser editor runtime.tick:
  game.tick only

browser editor runtime.reset:
  game.reset only

Node editor runtime.tick:
  game.tick and local time update, later capabilities rebuild on demand

Node editor runtime.reset:
  game.reset, local time reset, enhancer invalidate
```

## Gap

The same gameplay mutation has different presentation semantics by caller:

```txt
RAF mutation attempts a browser render
browser editor mutation does not render
Node editor mutation rebuilds only when another capability asks
```

There is no common command result or committed frame.

## Required command flow

```txt
tick/reset request
  -> lifecycle admission
  -> frame request
  -> staged state
  -> exact-time plan
  -> render or fixture render
  -> committed frame
  -> typed result
```

Required result:

```txt
{
  commandId,
  command: "tick" | "reset",
  source,
  status: "completed" | "no-op" | "rejected" | "failed",
  frameRequestId,
  committedFrameId,
  stateBeforeFingerprint,
  stateAfterFingerprint,
  reason
}
```

## Gameplay invariant

No public caller may change `state.frame`, `activeSessionId`, `lastTick`, or reset state without producing a terminal frame result.
