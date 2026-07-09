# Gameplay Audit — Action Result + Objective Replay Loop

**Timestamp:** `2026-07-09T09-41-24-04-00`

## Current gameplay loop

```txt
createInitialGameState()
  -> player starts at pathProgress 0
  -> progression.activeObjectiveId = walk-the-path
  -> progression.completedObjectiveIds = []
  -> game.tick(input)
  -> advanceGameState(state, input)
  -> frame increments
  -> lastTick updates
```

## Existing gameplay descriptors

Objectives:

```txt
walk-the-path: requiredAction path-progress, target arrival-path, progressAtLeast 0.35
inspect-tree: requiredAction inspect, target focal-tree, inspected true
```

Interaction targets:

```txt
focal-tree: inspectable, requiredAction inspect
arrival-path: path, requiredAction path-progress
```

## Gap

The descriptors are present but inert. The game state does not currently reduce path progress, inspect target state, action results, no-op reasons, or objective completion.

## Required ActionResult contract

```txt
id
action
status: accepted | rejected | unchanged
reason
changed
before
input
after
completedObjectiveIds
activeObjectiveId
```

## Required fixture rows

```txt
valid path-progress below objective threshold
valid path-progress completing walk-the-path
valid inspect completing inspect-tree
invalid target id
wrong action for target
repeat inspect unchanged/no-op
missing action rejected
objective already completed unchanged
```

## Decision

Keep the current game state shape. Add action/result records additively and prove them in a pure fixture before adding live input bindings or new content.
