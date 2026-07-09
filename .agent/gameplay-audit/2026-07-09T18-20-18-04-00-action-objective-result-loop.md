# Gameplay Audit: Action Objective Result Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-09T18-20-18-04-00`

## Current gameplay state

`createInitialGameState()` creates:

```txt
player.position
player.yaw
player.pitch
player.pathProgress = 0
progression.activeObjectiveId = walk-the-path
progression.completedObjectiveIds = []
progression.storyBeatIds = [arrival]
```

`advanceGameState(state, input)` currently only increments frame and stores lastTick.

## Objective source

```txt
walk-the-path:
  requiredAction: path-progress
  targetId: arrival-path
  completion: progressAtLeast 0.35

inspect-tree:
  requiredAction: inspect
  targetId: focal-tree
  completion: inspected true
```

## Current gameplay loop

```txt
game.tick(input)
  -> advanceGameState(state, input)
  -> frame increments
  -> lastTick records dt/time
  -> objectives and target descriptors remain source-only
```

## Gap

The route has objective and target descriptors, but no source-owned action/result bridge.

Missing proof facts:

```txt
path progress below threshold is accepted but incomplete
path progress above threshold completes walk-the-path
inspect focal-tree completes inspect-tree after path objective policy allows it
missing target is rejected with reason
unknown action is rejected with reason
repeat completed objective is skipped or unchanged with reason
before/after state snapshots are stable and serializable
```

## Next gameplay proof target

```txt
src/gameplay/action-frame.js
src/gameplay/target-action-preflight.js
src/gameplay/action-result.js
src/gameplay/objective-progress.js
src/gameplay/gameplay-fixture-rows.js
tests/action-result-fixture-smoke.mjs
```

## Non-goals for next cut

```txt
new controls
browser input wiring
camera work
new objectives
new scenes
visual feedback
save/load
```
