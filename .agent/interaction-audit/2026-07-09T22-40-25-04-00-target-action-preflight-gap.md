# Interaction Audit: Target Action Preflight Gap

**Timestamp:** `2026-07-09T22-40-25-04-00`

## Current interaction descriptors

```txt
focal-tree:
  label Old Meadow Tree
  type inspectable
  position { x: 0, y: 1.4, z: 24 }
  radius 4.5
  requiredAction inspect

arrival-path:
  label Meadow Path
  type path
  position { x: 0, y: 0, z: -8 }
  radius 32
  requiredAction path-progress
```

## Current runtime behavior

Interaction targets are content descriptors only.

`advanceGameState()` does not consume target ids, actions, distances, progress, or inspect facts.

## Missing preflight states

```txt
target_found
target_missing
action_matches_target
action_mismatch
within_radius
outside_radius
already_completed
progress_below_threshold
progress_reaches_threshold
```

## Main finding

The browser should not get click or keyboard interaction wiring until the pure preflight/result layer exists.

## Required next kit

```txt
target-action-preflight-kit
```

## Fixture rows needed

```txt
inspect focal-tree accepted
inspect missing target rejected
path-progress below threshold accepted unchanged
path-progress at 0.35 completes walk-the-path
wrong action for target rejected
unknown action rejected
```
