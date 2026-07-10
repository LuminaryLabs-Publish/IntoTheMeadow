# Gameplay Audit: Objective Action Result Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T03-01-42-04-00`

## Current gameplay state

`game-state.js` creates a state with player position/yaw/pitch/pathProgress, world wind, active scene, active session, active objective, completed objectives, story beats, and DSK snapshot.

`advanceGameState(state, input)` currently returns a new state with:

```txt
frame: state.frame + 1
lastTick: { dt, time }
```

It does not yet consume actions, targets, objective requirements, path progress, inspect state, or editor command rows.

## Current objective and target source

```txt
ARRIVAL_OBJECTIVES:
  - walk-the-path requires path-progress on arrival-path with progressAtLeast 0.35
  - inspect-tree requires inspect on focal-tree with inspected true

ARRIVAL_INTERACTION_TARGETS:
  - focal-tree inspectable target with radius 4.5
  - arrival-path path target with radius 32
```

## Missing gameplay proof loop

```txt
ActionFrame input
  -> target/action preflight
  -> ActionResult
  -> objective progress update
  -> state projection
  -> fixture row
  -> GameHost proof projection
  -> headless editor observation row
```

## Required result statuses

```txt
accepted
rejected
skipped
unchanged
no-target
wrong-action
objective-complete
objective-pending
```

## Why this blocks implementation

The route already exposes enough content descriptors to support objective/action proof, but without an action/result reducer, a browser or editor command can only prove runtime reachability. It cannot prove that path-progress or inspect behavior is accepted, rejected, unchanged, or completes objectives.

## Next implementation targets

```txt
src/gameplay/action-frame.js
src/gameplay/target-action-preflight.js
src/gameplay/action-result.js
src/gameplay/objective-progress.js
src/gameplay/gameplay-fixture-rows.js
tests/action-result-fixture-smoke.mjs
```

## Deferral boundary

Do not wire browser input, camera controls, route content, or new interaction targets before DOM-free action rows prove the source contract.
