# Interaction Audit — Target Action Result Reason Contract

**Timestamp:** `2026-07-09T06-28-53-04-00`

## Current interaction model

`IntoTheMeadow` already has interaction descriptors, but they are not wired into runtime action handling.

```txt
focal-tree
  -> label Old Meadow Tree
  -> type inspectable
  -> radius 4.5
  -> requiredAction inspect

arrival-path
  -> label Meadow Path
  -> type path
  -> radius 32
  -> requiredAction path-progress
```

## Current gap

There is no pure authority function that answers:

```txt
Is this target known?
Does this target accept this action?
Is this progress value valid?
Did this action change state?
Did this action complete an objective?
Why was this action accepted or rejected?
```

## Required target/action preflight

```txt
preflightTargetAction({ action, targets, objectives, state })
  -> targetActionPreflightResult
```

## Required preflight result

```txt
TargetActionPreflightResult {
  targetId,
  actionType,
  targetKnown,
  actionAllowed,
  progressValid,
  objectiveCandidateIds,
  accepted,
  reason
}
```

## Reason rows

```txt
accepted
unknown-target
unknown-action
wrong-action-for-target
invalid-progress
objective-already-complete
no-state-change
```

## Consumer path

```txt
ActionFrame
  -> preflightTargetAction
  -> reduce-path-progress-action or reduce-inspect-target-action
  -> ActionResult
  -> objective completion resolver
  -> gameplay snapshot projection
```

## Fixture rows

```txt
known target + matching action + valid progress
known target + wrong action
unknown target
invalid progress
repeat completed objective
inspect focal-tree accepted
inspect arrival-path rejected
```

## Main finding

The interaction target descriptors are already enough for the first proof pass.

The missing piece is a stable reasoned result contract, not more interaction content.
