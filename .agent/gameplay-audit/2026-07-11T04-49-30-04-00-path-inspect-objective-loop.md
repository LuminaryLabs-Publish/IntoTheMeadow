# Path and Inspect Objective Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-49-30-04-00`

## Authored loop

```txt
objective 1:
  id: walk-the-path
  action: path-progress
  target: arrival-path
  complete at: 0.35

story threshold:
  path-discovery at path-progress 0.25

objective 2:
  id: inspect-tree
  action: inspect
  target: focal-tree
  complete when: inspected true

story trigger:
  focal-tree at inspect:focal-tree
```

## Current runtime loop

```txt
initial state
  -> active objective walk-the-path
  -> pathProgress 0
  -> arrival story already active

tick
  -> frame + 1
  -> lastTick updated
  -> no gameplay mutation
```

## Required transition loop

```txt
path-progress command
  -> validate progress and path target
  -> update player.pathProgress monotonically
  -> cross 0.25 once -> add path-discovery story beat
  -> reach 0.35 once -> complete walk-the-path
  -> activate inspect-tree by declared policy

inspect command
  -> resolve focal-tree
  -> validate range and affordance
  -> mark focal-tree inspected
  -> complete inspect-tree
  -> add focal-tree story beat once
```

## State requirements

```txt
pathProgress must be finite and bounded
progress cannot move backward unless reset policy says so
completed objective IDs are unique
story beat IDs are unique
active objective ID follows an explicit transition policy
accepted command commits all transitions atomically
rejected command commits none
reset restores canonical initial progression
```

## Determinism requirement

The same initial state and ordered command list must produce identical player state, progression, story IDs, result journal and final fingerprint independent of browser frame cadence.
