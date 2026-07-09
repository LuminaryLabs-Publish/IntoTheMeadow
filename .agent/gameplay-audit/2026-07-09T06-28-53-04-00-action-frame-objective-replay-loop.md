# Gameplay Audit — ActionFrame Objective Replay Loop

**Timestamp:** `2026-07-09T06-28-53-04-00`

## Current gameplay loop

```txt
createInitialGameState()
  -> frame 0
  -> activeSceneId arrival-meadow
  -> player position/yaw/pitch/pathProgress
  -> progression activeObjectiveId walk-the-path
  -> completedObjectiveIds []
  -> storyBeatIds [arrival]
  -> advanceGameState(state, input)
  -> frame + 1
  -> lastTick { dt, time }
```

## Current content descriptors

```txt
ARRIVAL_OBJECTIVES
  -> walk-the-path requires path-progress on arrival-path with progressAtLeast 0.35
  -> inspect-tree requires inspect on focal-tree with inspected true

ARRIVAL_INTERACTION_TARGETS
  -> focal-tree accepts inspect
  -> arrival-path accepts path-progress
```

## Current gameplay gap

The descriptors exist, but the runtime does not consume actions.

The current state reducer cannot produce:

```txt
ActionFrame
ActionResult
ActionResult reason
ActionJournal
completedObjectiveIds updates
activeObjectiveId transition
snapshot.gameplay
fixture replay proof
```

## Required ActionFrame

```txt
ActionFrame {
  id,
  frame,
  time,
  actions: [
    {
      id,
      type,
      targetId,
      value,
      metadata
    }
  ]
}
```

## Required ActionResult

```txt
ActionResult {
  id,
  actionId,
  type,
  targetId,
  accepted,
  reason,
  stateChanged,
  completedObjectiveIds,
  notes
}
```

## Required reasons

```txt
accepted
rejected
unknown-action
unknown-target
wrong-action-for-target
invalid-progress
objective-already-complete
no-state-change
objective-completed
```

## First reducer map

```txt
path-progress action
  -> target must be arrival-path
  -> target must require path-progress
  -> progress must be finite and 0..1
  -> state.player.pathProgress updates only when progress increases
  -> walk-the-path completes when pathProgress >= 0.35

inspect action
  -> target must be focal-tree
  -> target must require inspect
  -> inspect-tree completes when focal-tree is inspected
```

## Required snapshot projection

```txt
snapshot.gameplay = {
  activeObjectiveId,
  completedObjectiveIds,
  lastActionFrame,
  lastActionResults,
  actionJournalSummary,
  objectiveLedger
}
```

## Fixture rows

```txt
path-progress accepted at 0.1 with no completion
path-progress accepted at 0.35 with walk-the-path completion
path-progress rejected when value is NaN
path-progress rejected for unknown target
inspect accepted on focal-tree
inspect rejected for arrival-path
inspect rejected for unknown target
objective completion is idempotent when action repeats
legacy state/renderPlan/diagnostics snapshot fields remain present
```

## Main finding

The smallest real gameplay upgrade is not new content.

The next upgrade is a pure `ActionFrame -> ActionResult -> objective ledger -> snapshot.gameplay` loop that turns the existing objective/target descriptors into fixture-readable gameplay authority.
