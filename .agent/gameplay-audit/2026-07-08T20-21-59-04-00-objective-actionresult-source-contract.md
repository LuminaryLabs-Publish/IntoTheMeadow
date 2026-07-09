# Gameplay Audit — Objective ActionResult Source Contract

**Timestamp:** `2026-07-08T20-21-59-04-00`

## Current gameplay state

`src/game/game-state.js` initializes:

```txt
id
version
frame
activeSceneId
activeSessionId
player.position
player.yaw
player.pitch
player.pathProgress
world.meadowAreaId
world.wind.strength
progression.activeObjectiveId
progression.completedObjectiveIds
progression.storyBeatIds
dsk
```

`advanceGameState()` currently only increments `frame` and writes `lastTick`.

## Available content descriptors

`ARRIVAL_OBJECTIVES` already defines:

```txt
walk-the-path
  label: Follow the meadow path
  requiredAction: path-progress
  targetId: arrival-path
  completion.progressAtLeast: 0.35

inspect-tree
  label: Inspect the old tree
  requiredAction: inspect
  targetId: focal-tree
  completion.inspected: true
```

`ARRIVAL_INTERACTION_TARGETS` already defines:

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

## Missing source contract

The current runtime has no typed action authority.

Needed modules:

```txt
src/gameplay-authority/action-reasons.js
src/gameplay-authority/action-frame.js
src/gameplay-authority/action-result.js
src/gameplay-authority/action-journal.js
src/gameplay-authority/reduce-path-progress.js
src/gameplay-authority/reduce-inspect-target.js
src/gameplay-authority/resolve-objective-completion.js
src/gameplay-authority/create-gameplay-snapshot.js
```

## Target input compatibility

Preserve:

```txt
game.tick({ time, dt })
```

Add optional support for:

```txt
game.tick({ time, dt, actions })
```

## Target result shape

```txt
ActionFrame
  id
  frame
  time
  action
  targetId
  payload

ActionResult
  id
  actionFrameId
  accepted
  reason
  targetId
  objectiveId
  stateChanged
  completedObjectiveIds
  snapshotDelta

ActionJournal
  frame
  results[]
```

## First fixture rows

```txt
path-progress accepted below threshold
path-progress accepted and completes walk-the-path
repeat path-progress does not duplicate walk-the-path
inspect focal-tree accepted and completes inspect-tree
repeat inspect focal-tree returns unchanged/idempotent
unknown target returns rejected
wrong action for target returns rejected
empty actions preserves tick-only behavior
```

## Snapshot projection

Add this branch without removing current snapshot keys:

```txt
snapshot.gameplay.activeObjectiveId
snapshot.gameplay.completedObjectiveIds
snapshot.gameplay.storyBeatIds
snapshot.gameplay.lastActionResults
snapshot.gameplay.actionJournal
```

## Gameplay finding

The first gameplay proof does not require new content. It requires source-owned reducers that consume the existing objective and target descriptors, return deterministic ActionResults, and expose those records through snapshots and fixture smoke tests.