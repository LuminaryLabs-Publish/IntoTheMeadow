# IntoTheMeadow Gameplay Authority Audit — Action Result Implementation Cutover

**Timestamp:** `2026-07-08T10-48-47-04-00`

## Current gameplay loop

```txt
game.tick({ time, dt })
  -> advanceGameState(state, input)
  -> frame + 1
  -> lastTick.dt
  -> lastTick.time
```

The current behavior is stable and must remain backward-compatible.

## Current content descriptors

```txt
objective: walk-the-path
  requiredAction: path-progress
  targetId: arrival-path
  completion.progressAtLeast: 0.35

objective: inspect-tree
  requiredAction: inspect
  targetId: focal-tree
  completion.inspected: true

interaction target: arrival-path
  type: path
  requiredAction: path-progress

interaction target: focal-tree
  type: inspectable
  requiredAction: inspect
```

## Core gap

Objectives and interaction targets are authored, but no runtime action/result authority exists yet.

Missing source concepts:

```txt
ActionFrame
ActionEnvelope
ActionBatch
ActionResult
ActionReason
ReducerResult
path progress reducer
inspect target reducer
objective completion resolver
story trigger resolver
gameplay action journal
snapshot.gameplay
fixture replay parity
```

## Required action result contract

```txt
ActionResult
  id
  frame
  actionId
  actionType
  targetId
  accepted
  reason
  stateDelta
  objectiveDelta
  storyDelta
  diagnostics
```

## Stable reason catalog needed

```txt
accepted
no-actions
unknown-action-type
unknown-target
wrong-target-for-objective
progress-below-threshold
objective-completed
objective-already-complete
inspect-target-completed
inspect-target-already-complete
state-unchanged
```

## Source-order implementation

```txt
1. Add src/gameplay-authority/action-reasons.js.
2. Add src/gameplay-authority/action-result.js.
3. Add src/gameplay-authority/action-frame.js.
4. Add src/gameplay-authority/resolve-objective-completion.js.
5. Add src/gameplay-authority/reduce-path-progress.js.
6. Add src/gameplay-authority/reduce-inspect-target.js.
7. Add src/gameplay-authority/create-gameplay-snapshot.js.
8. Update src/game/game-state.js so game.tick({ time, dt }) remains compatible and game.tick({ time, dt, actions }) reduces optional actions.
9. Update src/game/game-snapshot.js to expose snapshot.gameplay.
10. Add tests/gameplay-authority-fixture-smoke.mjs.
11. Add the fixture to npm run check after it passes locally.
```

## Fixture rows

```txt
tick_without_actions_stays_compatible
path_progress_under_threshold_returns_pending_or_rejected_reason
path_progress_threshold_completes_walk_the_path
path_progress_repeat_does_not_duplicate_objective
inspect_focal_tree_completes_inspect_tree
inspect_repeat_does_not_duplicate_objective
inspect_unknown_target_rejected
unknown_action_type_rejected
multiple_actions_emit_lastActionResults
snapshot_gameplay_exposes_journal_completed_objectives_and_story_beats
```

## Snapshot shape needed

```txt
snapshot.gameplay
  activeObjectiveId
  completedObjectiveIds[]
  storyBeatIds[]
  player.pathProgress
  actionJournal[]
  lastActionResults[]
  reasons[]
```

## Acceptance

This cutover is ready only when `game.tick({ time, dt })` still behaves exactly as before, and `game.tick({ time, dt, actions })` can deterministically complete `walk-the-path` and `inspect-tree` through serializable ActionResult records.

Do not wire player input or HUD objective display before this fixture gate exists.
