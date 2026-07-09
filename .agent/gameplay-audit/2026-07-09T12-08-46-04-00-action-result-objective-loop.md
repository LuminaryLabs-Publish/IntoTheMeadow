# Gameplay Audit — Action Result + Objective Loop

**Timestamp:** `2026-07-09T12-08-46-04-00`

## Current gameplay state

The current gameplay loop is mostly a frame counter and render-loop shell.

```txt
createInitialGameState()
  -> player position/yaw/pitch/pathProgress
  -> world meadowAreaId/wind strength
  -> progression activeObjectiveId/completedObjectiveIds/storyBeatIds
  -> DSK install snapshot

advanceGameState(state, input)
  -> frame + 1
  -> lastTick dt/time
```

## Gameplay descriptors already present

```txt
ARRIVAL_OBJECTIVES
  -> walk-the-path
  -> inspect-tree

ARRIVAL_INTERACTION_TARGETS
  -> arrival-path
  -> focal-tree

STORY_BEATS
  -> arrival route narrative descriptors
```

These descriptors are useful, but they are not yet consumed by runtime reducers.

## Current blocker

```txt
No ActionFrame input shape.
No target/action preflight.
No ActionResult record.
No stable reason enum.
No action journal.
No path-progress reducer.
No inspect target reducer.
No objective completion resolver.
No duplicate/no-op handling.
No snapshot.gameplay projection.
No fixture replay.
```

## Target gameplay loop

```txt
fixture row or browser input
  -> ActionFrame
  -> targetActionPreflight(state, target, action)
  -> reduceMeadowAction(state, actionFrame)
  -> ActionResult(status, reason, before, after, diff)
  -> objective progress resolver
  -> action journal append
  -> snapshot.gameplay projection
  -> GameHost additive readback
```

## Required actions for first proof pass

```txt
path-progress on arrival-path -> increments player.pathProgress
inspect focal-tree -> records inspected target
repeat inspect focal-tree -> accepted/no-op or duplicate with stable reason
unknown target -> rejected with stable reason
wrong action for target -> rejected with stable reason
objective completion -> walk-the-path and inspect-tree produce progress rows
```

## Non-goals

Do not add new rooms, quests, inventory, camera controls, audio, or world content until the current objectives and targets reduce into fixture-readable action results.
