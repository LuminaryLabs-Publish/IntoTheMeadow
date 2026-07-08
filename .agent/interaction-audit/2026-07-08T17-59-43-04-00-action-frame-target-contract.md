# Interaction Audit — ActionFrame Target Contract

**Timestamp:** `2026-07-08T17-59-43-04-00`

## Current interaction state

The public route has no live click/keyboard gameplay authority yet. Interaction data exists as descriptors:

```txt
ARRIVAL_INTERACTION_TARGETS
  focal-tree
  arrival-path

ARRIVAL_OBJECTIVES
  walk-the-path
  inspect-tree
```

The runtime loop currently ticks every frame without optional action input.

## Contract goal

Keep the existing host call compatible:

```js
game.tick({ time, dt });
```

Add optional action support:

```js
game.tick({
  time,
  dt,
  actions: [
    { action: "path-progress", targetId: "arrival-path", value: 0.35, source: "fixture" },
    { action: "inspect", targetId: "focal-tree", source: "fixture" }
  ]
});
```

## Target lookup rule

```txt
action input
  -> normalize into ActionFrame
  -> find interaction target by targetId
  -> verify requiredAction matches action
  -> send to correct reducer
  -> emit ActionResult
```

## Required rejection rows

```txt
missing action -> rejected-invalid-action
missing targetId -> rejected-unknown-target
unknown targetId -> rejected-unknown-target
wrong action for target -> rejected-wrong-action-for-target
invalid path progress value -> rejected-invalid-progress
```

## Required accepted rows

```txt
path-progress on arrival-path below completion threshold
path-progress on arrival-path completing walk-the-path
inspect on focal-tree completing inspect-tree
```

## Projection targets

```txt
state.lastActionResults
state.actionJournal
state.player.pathProgress
state.progression.completedObjectiveIds
snapshot.gameplay
```

## Stop line

Do not add real pointer/click UI in this pass. Prove the action contract through fixtures first, then wire browser input later.
