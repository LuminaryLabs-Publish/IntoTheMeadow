# Gameplay Audit — Action Replay Objective Result Loop

**Timestamp:** `2026-07-08T22-38-17-04-00`

## Current gameplay loop

```txt
game.tick({ time, dt })
  -> advanceGameState(state, input)
  -> frame + 1
  -> lastTick = { dt, time }
```

`advanceGameState()` does not consume movement, inspection, objective, or action input yet.

## Current objective descriptors

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

## Current interaction targets

```txt
focal-tree:
  type: inspectable
  radius: 4.5
  requiredAction: inspect

arrival-path:
  type: path
  radius: 32
  requiredAction: path-progress
```

## Gap

The descriptors exist, but they are inert.

The next pass should introduce a small action/result layer before adding more content or visual polish.

## Target contract

```txt
ActionFrame {
  id
  type
  targetId
  value
  frame
  time
  source
}

ActionResult {
  id
  actionId
  accepted
  changed
  reason
  targetId
  objectiveId
  statePatch
  completedObjectiveIds
}
```

## Required reducers

```txt
path-progress-reducer:
  accepts path-progress actions for arrival-path
  clamps progress to 0..1
  completes walk-the-path at progress >= 0.35
  returns unchanged result for lower/equal progress

inspect-target-reducer:
  accepts inspect actions for focal-tree
  validates target id and target type
  completes inspect-tree once
  returns idempotent unchanged result if already inspected

objective-completion-resolver:
  merges completedObjectiveIds without duplicates
  advances activeObjectiveId when the current objective completes
```

## Fixture rows

```txt
no actions:
  expected frame advances, no ActionResult rows

path-progress 0.2:
  expected accepted changed player.pathProgress, objective incomplete

path-progress 0.35:
  expected accepted changed and walk-the-path completed

inspect wrong target:
  expected rejected with reason target-mismatch

inspect focal-tree:
  expected accepted changed and inspect-tree completed

repeat inspect focal-tree:
  expected accepted unchanged / already-completed
```

## Snapshot projection

Additive only:

```txt
snapshot.gameplay = {
  actionJournal,
  lastActionResults,
  objectiveState,
  playerProgress
}
```

Do not remove existing snapshot fields.
