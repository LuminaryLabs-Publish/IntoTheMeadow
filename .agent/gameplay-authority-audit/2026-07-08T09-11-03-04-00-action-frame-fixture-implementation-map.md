# Gameplay Authority Audit — ActionFrame Fixture Implementation Map

**Timestamp:** `2026-07-08T09:11:03-04:00`

## Current gameplay truth

`IntoTheMeadow` already has enough descriptor data for a first gameplay loop:

```txt
player.pathProgress
progression.activeObjectiveId
progression.completedObjectiveIds
progression.storyBeatIds
ARRIVAL_OBJECTIVES
ARRIVAL_INTERACTION_TARGETS
```

The active reducer is still thin:

```txt
advanceGameState(state, input)
  -> frame + 1
  -> lastTick.dt
  -> lastTick.time
```

This means the current runtime can tick, render, and expose snapshots, but it cannot yet prove player actions as deterministic game results.

## Objective descriptors already available

```txt
walk-the-path
  requiredAction: path-progress
  targetId: arrival-path
  completion.progressAtLeast: 0.35

inspect-tree
  requiredAction: inspect
  targetId: focal-tree
  completion.inspected: true
```

## Interaction target descriptors already available

```txt
focal-tree
  type: inspectable
  requiredAction: inspect
  radius: 4.5

arrival-path
  type: path
  requiredAction: path-progress
  radius: 32
```

## Required action records

### ActionFrame

```txt
ActionFrame
  id
  frame
  time
  dt
  actions[]
  source
```

### ActionEnvelope

```txt
ActionEnvelope
  id
  type
  targetId
  value
  source
  timestamp
```

### ActionResult

```txt
ActionResult
  id
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

### ReducerResult

```txt
ReducerResult
  state
  actionFrame
  actionResults[]
  completedObjectiveIds[]
  storyBeatIds[]
  journalEntry
```

## Required stable reasons

```txt
action-frame-empty
action-accepted
unknown-action-type
unknown-target
wrong-target-for-objective
path-progress-below-threshold
path-progress-completed
inspect-target-completed
objective-already-completed
invalid-action-value
```

## Source wire map

### 1. Add action frame normalization

```txt
src/gameplay-authority/action-frame.js
```

Responsibilities:

```txt
- preserve existing tick input shape
- accept optional input.actions
- normalize single action or array
- assign deterministic frame/action ids
- pass through time and dt
```

### 2. Add action result contract

```txt
src/gameplay-authority/action-result.js
```

Responsibilities:

```txt
- create accepted result
- create rejected result
- freeze result shape
- keep reason codes stable
```

### 3. Add reason catalog

```txt
src/gameplay-authority/action-reasons.js
```

Responsibilities:

```txt
- export reason strings
- keep acceptance tests from depending on prose
```

### 4. Add path progress reducer

```txt
src/gameplay-authority/reduce-path-progress.js
```

Responsibilities:

```txt
- accept action type path-progress
- require targetId arrival-path
- clamp progress value
- update player.pathProgress
- complete walk-the-path only at progress >= 0.35
- avoid duplicate completedObjectiveIds
```

### 5. Add inspect target reducer

```txt
src/gameplay-authority/reduce-inspect-target.js
```

Responsibilities:

```txt
- accept action type inspect
- require targetId focal-tree
- reject unknown targets
- complete inspect-tree once
- avoid duplicate completedObjectiveIds
```

### 6. Add objective completion resolver

```txt
src/gameplay-authority/resolve-objective-completion.js
```

Responsibilities:

```txt
- read ARRIVAL_OBJECTIVES
- map requiredAction + targetId to objective
- return objectiveDelta records
- keep duplicated completion stable and idempotent
```

### 7. Add gameplay snapshot

```txt
src/gameplay-authority/create-gameplay-snapshot.js
```

Target shape:

```txt
snapshot.gameplay
  activeObjectiveId
  completedObjectiveIds[]
  storyBeatIds[]
  player.pathProgress
  actionJournal[]
  lastActionResults[]
  reducerDiagnostics
```

### 8. Update game-state reducer

Update:

```txt
src/game/game-state.js
```

Keep this backward-compatible:

```txt
game.tick({ time, dt })
```

Add optional action handling:

```txt
game.tick({ time, dt, actions })
```

### 9. Update snapshot projection

Update:

```txt
src/game/game-snapshot.js
```

Add:

```txt
snapshot.gameplay
```

Do not remove:

```txt
snapshot.state
snapshot.renderPlan
snapshot.diagnostics
```

### 10. Add fixture smoke

```txt
tests/gameplay-authority-fixture-smoke.mjs
```

Cases:

```txt
tick_without_actions_stays_compatible
path_progress_under_threshold_rejected_or_pending
path_progress_threshold_completes_walk_the_path
path_progress_repeated_does_not_duplicate_objective
inspect_focal_tree_completes_inspect_tree
inspect_unknown_target_rejected
unknown_action_type_rejected
snapshot_gameplay_exposes_journal_and_last_results
```

## Acceptance

```txt
- Existing `npm run check` stays green after implementation.
- Existing `game.tick({ time, dt })` increments frame and records lastTick.
- `game.tick({ time, dt, actions })` accepts deterministic action arrays.
- `walk-the-path` completes only when progressAtLeast >= 0.35.
- `inspect-tree` completes only for `focal-tree` inspect actions.
- Unknown action types and targets return stable rejected ActionResult records.
- Repeated objective completion does not duplicate objective ids.
- `snapshot.gameplay` exposes active objective, completed objectives, story beats, player pathProgress, actionJournal, and lastActionResults.
```

## Implementation order

```txt
1. Land render parity fixture first or in the same pass.
2. Add gameplay-authority modules.
3. Update game-state with backward-compatible optional actions.
4. Update game-snapshot with snapshot.gameplay.
5. Add fixture smoke.
6. Add fixture smoke to package.json check command.
7. Browser-check GameHost compatibility.
```

## Non-goals

```txt
- Do not add real movement controls in this step.
- Do not add new scenes in this step.
- Do not change renderer visuals in this step.
- Do not move the gameplay-authority modules to core until the first loop is proven locally.
```
