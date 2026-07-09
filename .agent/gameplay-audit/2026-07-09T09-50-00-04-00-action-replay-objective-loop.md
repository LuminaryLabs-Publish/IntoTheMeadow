# Gameplay Audit — Action Replay Objective Loop

**Timestamp:** `2026-07-09T09-50-00-04-00`

## Current gameplay loop

```txt
requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState(state, input)
  -> frame increments
  -> lastTick stores dt/time
  -> render plan is generated separately
```

## Current objective descriptors

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

## Current interaction target descriptors

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

## Gap

The repo has objective and target descriptors, but no action replay boundary.

Current issue:

```txt
advanceGameState()
  -> increments frame
  -> writes lastTick
  -> does not consume action frames
  -> does not return action results
  -> does not complete objectives
  -> does not produce a gameplay proof snapshot
```

## Required action result contract

The next code pass should add a pure action reduction layer.

```txt
ActionFrame
  -> action id
  -> target id
  -> progress amount
  -> time/frame metadata
  -> optional source

ActionResult
  -> accepted true/false
  -> changed true/false
  -> reason code
  -> previous snapshot hash or shallow diff
  -> next snapshot hash or shallow diff
  -> completed objective ids
```

## Reason code draft

```txt
action.accepted.path-progress
action.accepted.inspect
action.rejected.unknown-action
action.rejected.unknown-target
action.rejected.action-target-mismatch
action.noop.path-progress-not-increased
action.noop.target-already-inspected
action.noop.objective-already-complete
```

## First fixture rows

```txt
valid path-progress 0.10 -> state changes, objective remains incomplete
valid path-progress 0.35 -> walk-the-path completes
valid inspect focal-tree -> inspect-tree completes
repeat inspect focal-tree -> no-op with stable reason
unknown target -> rejected with no state mutation
wrong action for target -> rejected with no state mutation
frame-only tick -> unchanged except frame/lastTick
```

## Snapshot projection target

Additive only:

```txt
snapshot.gameplay = {
  actionLedger,
  objectiveProgress,
  completedObjectiveIds,
  validation
}
```

Do not change the existing browser visuals or route control while adding this proof layer.
