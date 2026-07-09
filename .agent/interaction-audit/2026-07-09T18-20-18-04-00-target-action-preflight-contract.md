# Interaction Audit: Target Action Preflight Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-09T18-20-18-04-00`

## Current interaction source

`ARRIVAL_INTERACTION_TARGETS` defines two active targets:

```txt
focal-tree:
  label: Old Meadow Tree
  type: inspectable
  position: { x: 0, y: 1.4, z: 24 }
  radius: 4.5
  requiredAction: inspect

arrival-path:
  label: Meadow Path
  type: path
  position: { x: 0, y: 0, z: -8 }
  radius: 32
  requiredAction: path-progress
```

## Interaction gap

The targets exist as source descriptors, but there is no ActionFrame or preflight layer that maps an attempted action to a target, objective, and result reason.

## Required preflight rows

```txt
accepted:path-progress:arrival-path
accepted:inspect:focal-tree
rejected:target-not-found
rejected:action-target-mismatch
rejected:objective-not-active
skipped:objective-already-complete
unchanged:no-progress-delta
```

## Suggested contract

```txt
ActionFrame:
  actionId
  targetId
  payload
  frame
  time

TargetActionPreflight:
  status: accepted | rejected | skipped
  reason
  target
  objective
  sourceFacts
```

## Next consumer rule

Do not wire browser events into gameplay until the DOM-free preflight/result rows prove target lookup and objective mutation without touching rendering.
