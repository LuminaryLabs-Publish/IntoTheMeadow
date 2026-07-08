# Gameplay Audit — Objective ActionResult Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-08T18-09-21-04-00`

## Gameplay read

The gameplay descriptors already contain a minimal first-objective proof set.

`ARRIVAL_OBJECTIVES` defines:

```txt
walk-the-path
  requiredAction: path-progress
  targetId: arrival-path
  completion: progressAtLeast 0.35

inspect-tree
  requiredAction: inspect
  targetId: focal-tree
  completion: inspected true
```

`ARRIVAL_INTERACTION_TARGETS` defines:

```txt
focal-tree
  type: inspectable
  requiredAction: inspect

arrival-path
  type: path
  requiredAction: path-progress
```

The current runtime does not reduce those descriptors into deterministic action results.

## Current gameplay loop

```txt
createInitialGameState
  -> player, world, progression, dsk snapshot
advanceGameState
  -> frame + 1
  -> lastTick = { dt, time }
createGameSnapshot
  -> manifest, state, renderPlan, diagnostics
```

There is no gameplay command/result layer yet.

## Target gameplay loop

```txt
game.tick({ time, dt, actions? })
  -> normalize optional actions into ActionFrame[]
  -> reduce each frame through objective-aware reducers
  -> return ActionResult[]
  -> append action journal entries
  -> update player.pathProgress and inspected target state
  -> resolve completedObjectiveIds idempotently
  -> expose snapshot.gameplay
```

## Required action frame shape

```txt
ActionFrame
  id
  type
  targetId
  value
  source
  frame
  time
  metadata
```

## Required result shape

```txt
ActionResult
  id
  actionId
  type
  targetId
  status
  reason
  completedObjectiveIds
  stateDelta
  journalEntry
```

Required statuses:

```txt
accepted
rejected
no_mutation
```

Required reasons:

```txt
path_progress_recorded
path_progress_completed_objective
path_progress_below_threshold
inspect_recorded
inspect_completed_objective
inspect_repeated
unknown_target
invalid_action_type
wrong_action_for_target
missing_action_type
missing_target_id
```

## Required fixture rows

```txt
tick_without_actions_preserves_existing_shape
path_progress_below_threshold_accepted_without_completion
path_progress_threshold_completes_walk_the_path
repeat_path_progress_does_not_duplicate_completion
inspect_focal_tree_completes_inspect_tree
repeat_inspect_focal_tree_returns_no_mutation
unknown_target_rejected
wrong_action_for_target_rejected
missing_action_type_rejected
missing_target_id_rejected
snapshot_gameplay_includes_activeObjectiveId
snapshot_gameplay_includes_completedObjectiveIds
snapshot_gameplay_includes_lastActionResults
snapshot_gameplay_includes_actionJournal
```

## Source order

```txt
src/gameplay-authority/action-reasons.js
src/gameplay-authority/action-frame.js
src/gameplay-authority/action-result.js
src/gameplay-authority/action-journal.js
src/gameplay-authority/reduce-path-progress.js
src/gameplay-authority/reduce-inspect-target.js
src/gameplay-authority/resolve-objective-completion.js
src/gameplay-authority/create-gameplay-snapshot.js
src/game/game-state.js
src/game/game-snapshot.js
tests/gameplay-authority-fixture-smoke.mjs
package.json
```

## Compatibility rule

The existing host call must keep working:

```txt
game.tick({ time, dt })
```

The action path must be additive:

```txt
game.tick({ time, dt, actions })
```

## Stop condition

Stop after `walk-the-path` and `inspect-tree` produce stable ActionResult records and `snapshot.gameplay` exists.

Do not add inventory, new interaction targets, first-person movement, or new areas before the fixture rows above pass.
