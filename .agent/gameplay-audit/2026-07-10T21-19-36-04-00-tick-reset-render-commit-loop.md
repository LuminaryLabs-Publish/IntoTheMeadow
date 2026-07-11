# Tick, Reset, and Render Commit Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T21-19-36-04-00`

## Current gameplay authority

`advanceGameState()` only increments `state.frame` and stores `{ dt, time }`. Movement, path progress, inspection, and objectives are inactive.

## Tick mismatch

Browser RAF calls `game.tick()` immediately before render, but editor `runtime.tick` calls the same mutation directly without enhancement or rendering.

Result:

```txt
state.frame advances
lastTick changes
canvas does not change
renderer snapshot does not change
GameHost state and renderer now describe different generations
```

## Reset mismatch

Editor `runtime.reset` returns a new frame-0 game state, but does not:

```txt
render a reset frame
invalidate or rebuild the enhanced plan
reset renderer cache/snapshot
clear or redraw the canvas
publish a reset commit row
```

## Required command policy

Every external tick/reset command must choose one explicit mode:

```txt
submit-and-commit-frame
stage-only and return uncommitted result
reject because browser RAF owns simulation
```

Silent state-only advancement is not acceptable once readback is used as proof.

## Future gameplay binding

Movement and interaction commands should commit together with:

```txt
command result
state fingerprint
source epoch
target facts
objective changes
rendered frame id
```

This prevents a command from claiming visual completion before its resulting frame is committed.
