# Gameplay Authority Audit — Action Result Fixture Ledger

**Timestamp:** `2026-07-08T12-21-20-04-00`

## Current gameplay state

`createInitialGameState()` already has enough state to support a first objective loop:

```txt
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
dsk snapshot
```

`advanceGameState()` currently only increments `frame` and records `lastTick`.

## Descriptor-ready content

Objective descriptors exist:

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

Interaction target descriptors exist:

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

## Current gap

The descriptors are not yet authoritative runtime reducers.

There is no typed action frame.

There is no accepted/rejected action result.

There is no objective completion reducer.

There is no `snapshot.gameplay` branch.

## Target command/result shape

```txt
ActionFrame = {
  id,
  time,
  dt,
  actions
}

ActionEnvelope = {
  id,
  type,
  targetId,
  value,
  source
}

ActionResult = {
  id,
  actionId,
  accepted,
  reason,
  statePatch,
  completedObjectiveIds,
  emittedStoryBeatIds
}

GameplaySnapshot = {
  activeObjectiveId,
  completedObjectiveIds,
  storyBeatIds,
  lastActionResults,
  actionJournal
}
```

## First fixture rows

```txt
1. path-progress below 0.35 keeps walk-the-path incomplete
2. path-progress at 0.35 completes walk-the-path once
3. repeated path-progress does not duplicate completion
4. inspect focal-tree completes inspect-tree once
5. inspect unknown target is rejected with stable reason
6. unsupported action type is rejected with stable reason
7. game.tick({ time, dt }) remains backward-compatible
8. game.tick({ time, dt, actions }) produces deterministic snapshot.gameplay
```

## Acceptance rule

Do not add new objectives, rooms, inventory, audio, or first-person controls until path-progress and inspect actions can be replayed by fixture and inspected through `GameHost`.
