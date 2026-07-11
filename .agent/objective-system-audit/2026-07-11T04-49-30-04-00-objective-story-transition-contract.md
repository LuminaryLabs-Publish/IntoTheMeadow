# Objective and Story Transition Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-49-30-04-00`

## Objective source of truth

```txt
walk-the-path
  predicate: player.pathProgress >= 0.35
  target: arrival-path
  required action: path-progress

inspect-tree
  predicate: interaction.focal-tree.inspected == true
  target: focal-tree
  required action: inspect
```

## Story source of truth

```txt
arrival
  trigger: scene-start
  initial state policy: active once

path-discovery
  trigger: path-progress crosses 0.25
  activation: exactly once

focal-tree
  trigger: accepted inspect:focal-tree
  activation: exactly once
```

## Atomic transaction

```txt
pre-state
  -> accepted command facts
  -> objective predicate results
  -> story trigger results
  -> proposed progression
  -> validate invariants
  -> one committed post-state
  -> one result row
```

## Invariants

```txt
completedObjectiveIds contains no duplicates
storyBeatIds contains no duplicates
activeObjectiveId is null or references a declared incomplete objective
objective completion cannot be rolled back by a later normal command
story activation cannot occur from a rejected command
threshold crossings are detected from pre and post values
reset is the only current operation that returns to canonical initial progression
```

## Observation contract

The snapshot should expose:

```txt
active objective ID
objective progress and completion reasons
completed objective IDs
active story beat IDs
last committed command ID
last objective transitions
last story transitions
progression fingerprint
```

## Fixture matrix

```txt
0.00 -> 0.24: no path story, no completion
0.24 -> 0.25: path story once
0.25 -> 0.34: no repeat story
0.34 -> 0.35: walk objective completes once
inspect out of range: no transition
inspect in range: inspect objective and focal-tree story once
repeat inspect: no duplicate transitions
reset: canonical initial objective/story state
```
