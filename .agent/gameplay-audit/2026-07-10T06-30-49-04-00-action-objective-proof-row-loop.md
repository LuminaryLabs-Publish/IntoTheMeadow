# Gameplay Audit: Action Objective Proof Row Loop

**Run:** `2026-07-10T06-30-49-04-00`

## Current gameplay source

```txt
createInitialGameState
  -> activeSceneId arrival-meadow
  -> player position/yaw/pitch/pathProgress
  -> active objective walk-the-path
  -> story beat arrival

ARRIVAL_OBJECTIVES
  -> walk-the-path requires path-progress on arrival-path at progress >= 0.35
  -> inspect-tree requires inspect on focal-tree

ARRIVAL_INTERACTION_TARGETS
  -> focal-tree inspectable target
  -> arrival-path path target
```

## Current tick behavior

```txt
advanceGameState(state, input)
  -> frame + 1
  -> lastTick = { dt, time }
```

## Gap

The repo has objective and target descriptors, but no action/result authority.

Missing gameplay proof rows:

```txt
ActionFrame
TargetActionPreflight
ActionResult
ObjectiveProgress
completed objective mutation row
unknown action row
wrong target/action row
missing target row
no-op unchanged row
```

## Next gameplay files

```txt
src/gameplay/action-frame.js
src/gameplay/target-action-preflight.js
src/gameplay/action-result.js
src/gameplay/objective-progress.js
src/gameplay/gameplay-fixture-rows.js
tests/action-result-fixture-smoke.mjs
```

## Stop condition

Do not wire browser input or expand meadow objectives until DOM-free action rows prove path-progress and inspect behavior.
