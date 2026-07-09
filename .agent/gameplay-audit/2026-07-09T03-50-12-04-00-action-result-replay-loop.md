# Gameplay Audit — Action Result Replay Loop

**Timestamp:** `2026-07-09T03-50-12-04-00`

## Current gameplay loop

```txt
game.tick({ time, dt })
  -> advanceGameState(state, input)
  -> frame increments
  -> lastTick records dt/time
```

## Current gameplay descriptors

The content layer already defines the first gameplay seam:

```txt
ARRIVAL_OBJECTIVES
ARRIVAL_INTERACTION_TARGETS
```

Target gameplay loop:

```txt
walk-the-path
  -> path-progress action
  -> arrival-path target
  -> objective completion

inspect-tree
  -> inspect action
  -> focal-tree target
  -> story/progression row
```

## Missing reducer authority

`advanceGameState()` does not yet consume actions. It only increments frame and `lastTick`.

The next implementation should add source-owned, DOM-free gameplay reducers before adding more content.

## Required contracts

```txt
ActionFrame {
  frame
  time
  dt
  actions[]
}

ActionResult {
  id
  actionId
  targetId
  accepted
  reason
  stateChanged
  completedObjectiveIds[]
}

GameplaySnapshot {
  activeObjectiveId
  completedObjectiveIds[]
  actionJournal[]
  lastActionResult
}
```

## Required reasons

```txt
accepted
unknown-action
unknown-target
wrong-action-for-target
invalid-progress
objective-already-complete
no-state-change
```

## Fixture cases

```txt
empty action frame preserves tick behavior
path-progress accepted updates pathProgress
path-progress rejected out of range does not mutate progress
inspect focal-tree accepted records result
inspect unknown target rejected
accepted path-progress completes walk-the-path
legacy snapshot fields remain present
snapshot.gameplay exists after fixture run
```

## Additive projection

Expose gameplay results additively:

```txt
snapshot.gameplay
state.progression.completedObjectiveIds
state.actionJournal or equivalent compact journal
```

Do not remove existing `state.player`, `state.world`, or `state.progression` fields.
