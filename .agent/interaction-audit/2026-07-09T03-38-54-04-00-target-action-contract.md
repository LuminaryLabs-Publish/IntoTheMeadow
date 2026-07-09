# Interaction Audit — Target Action Contract

**Timestamp:** `2026-07-09T03-38-54-04-00`

## Current source targets

The first interaction targets are source-authored in `src/content/interaction-targets/arrival-targets.js`:

```txt
focal-tree:
  type: inspectable
  requiredAction: inspect
  radius: 4.5

arrival-path:
  type: path
  requiredAction: path-progress
  radius: 32
```

## Current objective consumers

The first objectives are source-authored in `src/content/objectives/arrival-objectives.js`:

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

## Current gap

Targets and objectives are descriptors only.

No action envelope currently binds:

```txt
input action
-> target lookup
-> objective lookup
-> validation reason
-> result row
-> state mutation
-> snapshot.gameplay projection
```

## Required target-action contract

```txt
createActionFrame({ time, actions })
createActionResult({ action, target, status, reason, stateBefore, stateAfter })
reducePathProgressAction(state, action, targets, objectives)
reduceInspectTargetAction(state, action, targets, objectives)
resolveObjectiveCompletion(state, results, objectives)
```

## Required reasons

```txt
accepted
unknown-target
wrong-action-for-target
invalid-progress
objective-already-complete
no-state-change
legacy-frame-tick
```

## Stop condition

The interaction layer is ready when the DOM-free fixture can replay path-progress and inspect actions and produce deterministic action/result/objective rows without needing the browser host.
