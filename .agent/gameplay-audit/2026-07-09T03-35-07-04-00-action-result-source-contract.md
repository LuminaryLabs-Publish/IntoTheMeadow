# Gameplay Audit — ActionResult Source Contract

**Timestamp:** `2026-07-09T03-35-07-04-00`

## Current gameplay loop

```txt
createIntoTheMeadowGame()
  -> createInitialGameState(...)
  -> tick(input)
  -> advanceGameState(state, input)
  -> frame increments
  -> lastTick records dt/time
  -> snapshot returns manifest, state, renderPlan, diagnostics
```

## Current source descriptors

`ARRIVAL_OBJECTIVES` defines:

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

`ARRIVAL_INTERACTION_TARGETS` defines:

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

## Main gameplay gap

The content descriptors exist, but no runtime reducer consumes actions.

`advanceGameState()` currently increments frame and writes `lastTick`; it does not normalize `input.actions`, does not produce `ActionResult` rows, does not complete objectives, and does not expose `snapshot.gameplay`.

## Required action contract

```txt
ActionFrame {
  id
  frame
  time
  dt
  actions[]
}

ActionRequest {
  id
  type
  targetId
  value
  source
}

ActionResult {
  id
  actionId
  type
  targetId
  status
  reason
  before
  after
  completedObjectiveIds
  notes
}
```

## Required statuses

```txt
accepted
rejected
ignored
```

## Required reasons

```txt
path-progress-accepted
path-progress-out-of-range
path-target-missing
inspect-accepted
inspect-target-missing
inspect-target-not-inspectable
objective-completed
objective-not-complete
unknown-action
```

## First reducers

```txt
reducePathProgressAction(state, action, content)
reduceInspectTargetAction(state, action, content)
resolveObjectiveCompletion(state, actionResults, content)
```

## Snapshot projection

Add a non-breaking branch:

```txt
snapshot.gameplay = {
  activeObjectiveId,
  completedObjectiveIds,
  actionJournal,
  latestActionResults,
  objectiveResults
}
```

Keep legacy snapshot fields unchanged:

```txt
manifest
state
renderPlan
diagnostics
```

## Fixture rows

```txt
path-progress 0.1 accepted but objective incomplete
path-progress 0.36 accepted and walk-the-path completed
path-progress -1 rejected out of range
inspect focal-tree accepted and inspect-tree completed
inspect unknown-target rejected
unknown action ignored with reason unknown-action
legacy tick with no actions still increments frame
snapshot legacy fields preserved
```

## Non-goals

```txt
Do not add full WASD movement yet.
Do not add inventory yet.
Do not add new objectives yet.
Do not change the rendered meadow while action contracts are still unproven.
```
