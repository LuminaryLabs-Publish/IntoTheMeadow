# Gameplay Authority Audit — Action Result Reducer Implementation Plan

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-08T13-50-37-04-00`

## Current gameplay state

`createInitialGameState()` creates a useful deterministic shell:

```txt
state.id
state.version
state.frame
state.activeSceneId
state.activeSessionId
state.player.position
state.player.yaw
state.player.pitch
state.player.pathProgress
state.world.meadowAreaId
state.world.wind.strength
state.progression.activeObjectiveId
state.progression.completedObjectiveIds
state.progression.storyBeatIds
state.dsk
```

`advanceGameState()` currently only increments frame and writes `lastTick`.

## Authored objective facts already present

```txt
walk-the-path:
  requiredAction: path-progress
  targetId: arrival-path
  completion.progressAtLeast: 0.35

inspect-tree:
  requiredAction: inspect
  targetId: focal-tree
  completion.inspected: true
```

## Interaction targets already present

```txt
focal-tree:
  type: inspectable
  requiredAction: inspect
  radius: 4.5

arrival-path:
  type: path
  requiredAction: path-progress
  radius: 32
```

## Missing action authority

```txt
ActionFrame does not exist.
ActionResult does not exist.
ActionResultJournal does not exist.
path-progress reducer does not exist.
inspect reducer does not exist.
objective completion resolver does not exist.
snapshot.gameplay does not exist.
invalid action reasons are not stable.
duplicate completion reasons are not stable.
```

## Required command/result shape

```txt
ActionFrame
  frame
  time
  dt
  actions[]

ActionRequest
  id
  type
  targetId
  value
  source

ActionResult
  id
  actionId
  type
  targetId
  accepted
  reason
  before
  after
  completedObjectiveIdsAdded[]
  storyBeatIdsAdded[]

ActionResultJournalEntry
  frame
  time
  result
```

## Required reason catalog

```txt
ACTION_ACCEPTED
ACTION_REJECTED_UNKNOWN_TYPE
ACTION_REJECTED_UNKNOWN_TARGET
ACTION_REJECTED_TARGET_ACTION_MISMATCH
ACTION_REJECTED_INVALID_VALUE
ACTION_ACCEPTED_NO_OBJECTIVE_CHANGE
OBJECTIVE_COMPLETED
OBJECTIVE_ALREADY_COMPLETED
```

## Reducer cutline

```txt
game.tick({ time, dt })
  -> still works exactly as today

game.tick({ time, dt, actions: [...] })
  -> normalize ActionFrame
  -> reduce path-progress
  -> reduce inspect
  -> resolve objective completion
  -> append journal entries
  -> expose latest results
```

## Snapshot target

```txt
snapshot.gameplay
  activeObjectiveId
  completedObjectiveIds
  storyBeatIds
  lastActionResults
  actionJournal
```

The existing `snapshot.state`, `snapshot.renderPlan`, and `snapshot.diagnostics` must remain intact.

## Fixture rows

```txt
1. empty tick increments frame and preserves compatibility
2. path-progress 0.10 accepted but does not complete walk-the-path
3. path-progress 0.35 completes walk-the-path
4. duplicate path-progress does not duplicate completedObjectiveIds
5. inspect focal-tree completes inspect-tree
6. inspect unknown target rejects with ACTION_REJECTED_UNKNOWN_TARGET
7. wrong action for target rejects with ACTION_REJECTED_TARGET_ACTION_MISMATCH
8. snapshot.gameplay contains lastActionResults and actionJournal
```

## Next safe ledge

```txt
IntoTheMeadow Action Result Reducer + Snapshot Gameplay Fixture Gate
```
