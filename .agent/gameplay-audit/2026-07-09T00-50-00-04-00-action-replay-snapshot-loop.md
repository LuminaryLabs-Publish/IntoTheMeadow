# Gameplay Audit — Action Replay Snapshot Loop

**Timestamp:** `2026-07-09T00-50-00-04-00`

## Current gameplay loop

```txt
game.tick(input)
  -> advanceGameState(state, input)
  -> frame + 1
  -> lastTick updated
```

No gameplay action is consumed yet.

## Existing gameplay descriptors

### Objectives

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

### Interaction targets

```txt
focal-tree
  type: inspectable
  requiredAction: inspect

arrival-path
  type: path
  requiredAction: path-progress
```

## Missing reducer chain

```txt
input.actions[]
  -> normalize ActionFrame
  -> preflight target/action compatibility
  -> reduce path-progress
  -> reduce inspect target
  -> produce ActionResult rows
  -> update progression.completedObjectiveIds
  -> project snapshot.gameplay
```

## Result records needed

```txt
ActionFrame
ActionCommand
ActionResult
ActionJournalEntry
ObjectiveCompletionResult
GameplaySnapshot
```

## Fixture rows needed

```txt
path-progress accepted at 0.35
path-progress accepted at 1.0
path-progress rejected when target is not arrival-path
path-progress rejected when progress is out of range
inspect accepted for focal-tree
inspect rejected for unknown target
inspect rejected for wrong action type
walk-the-path completion after valid path progress
inspect-tree completion after valid inspect
legacy frame tick still advances without actions
snapshot.gameplay absent before implementation but planned as additive field
```

## Compatibility rule

Do not remove or rename current state fields:

```txt
id
version
frame
activeSceneId
activeSessionId
player
world
progression
dsk
lastTick
```

## Finding

The game already has a small, clean first objective surface.

The next implementation should not invent new mechanics; it should make the existing path and tree descriptors produce first-class action results and a fixture-readable `snapshot.gameplay` branch.
