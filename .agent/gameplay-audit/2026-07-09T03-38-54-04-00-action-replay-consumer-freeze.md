# Gameplay Audit — Action Replay Consumer Freeze

**Timestamp:** `2026-07-09T03-38-54-04-00`

## Current gameplay state

The game has content descriptors for its first gameplay loop:

```txt
ARRIVAL_OBJECTIVES:
  walk-the-path requires path-progress on arrival-path
  inspect-tree requires inspect on focal-tree

ARRIVAL_INTERACTION_TARGETS:
  focal-tree is inspectable
  arrival-path is path-progress target
```

The runtime state also has player/progression fields:

```txt
player.position
player.yaw
player.pitch
player.pathProgress
progression.activeObjectiveId
progression.completedObjectiveIds
progression.storyBeatIds
```

## Gameplay gap

`advanceGameState()` currently only increments `frame` and records `lastTick`.

It does not consume action frames, reduce interaction targets, complete objectives, append action results, or project gameplay diagnostics.

## Required action replay model

```txt
ActionFrame
  -> normalize action rows
  -> reduce path-progress action
  -> reduce inspect action
  -> resolve objective completion
  -> append ActionResult rows
  -> update progression.completedObjectiveIds
  -> project snapshot.gameplay
```

## Required first fixture rows

```txt
path-progress accepted for arrival-path
path-progress rejected for unknown target
path-progress rejected for invalid progress
inspect accepted for focal-tree
inspect rejected for unknown target
objective walk-the-path completes at progress >= 0.35
objective inspect-tree completes after focal-tree inspection
legacy frame-only tick remains compatible
legacy snapshot fields remain present
```

## Required additive snapshot branch

```txt
snapshot.gameplay = {
  activeObjectiveId,
  completedObjectiveIds,
  lastActionResults,
  objectiveRows,
  interactionRows
}
```

## Non-goals

```txt
Do not add combat.
Do not add inventory.
Do not add new objectives.
Do not rewrite movement.
Do not change meadow content placement.
```

## Next validation target

```txt
tests/gameplay-action-replay-fixture-smoke.mjs
```

This fixture should run without DOM, canvas, WebGL, or the external renderer.
