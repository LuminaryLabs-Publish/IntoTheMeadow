# Interaction Audit — Target Action Reason Matrix

**Timestamp:** `2026-07-09T09-50-00-04-00`

## Current interaction model

The current route does not expose a browser interaction controller yet. Interaction exists as content descriptors:

```txt
ARRIVAL_INTERACTION_TARGETS
  -> focal-tree
  -> arrival-path

ARRIVAL_OBJECTIVES
  -> inspect-tree
  -> walk-the-path
```

## Target/action matrix

```txt
focal-tree
  allowed action: inspect
  target type: inspectable
  expected reducer: inspect-target-reducer-kit
  expected objective: inspect-tree

arrival-path
  allowed action: path-progress
  target type: path
  expected reducer: path-progress-reducer-kit
  expected objective: walk-the-path
```

## Gap

No first-class `targetActionPreflight()` exists yet.

The route needs a pure check before mutation:

```txt
target exists?
action exists?
action is allowed for target?
progress payload is valid?
target already resolved?
objective already complete?
```

## Proposed preflight result

```txt
{
  accepted: boolean,
  targetId,
  action,
  reason,
  reducerId,
  objectiveIds
}
```

## Reason matrix

```txt
action.accepted.inspect
action.accepted.path-progress
action.rejected.unknown-target
action.rejected.unknown-action
action.rejected.action-target-mismatch
action.rejected.invalid-progress
action.noop.target-already-inspected
action.noop.objective-already-complete
action.noop.progress-not-increased
```

## Next integration rule

Keep browser input separate from action authority.

```txt
browser event -> ActionFrame adapter -> targetActionPreflight -> reducer -> ActionResult -> snapshot projection
```

Do not put reason strings directly in browser handlers.
