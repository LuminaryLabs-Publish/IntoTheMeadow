# Progression Audit: Atomic Objective and Story Transition Contract

**Timestamp:** `2026-07-12T02-38-23-04-00`

## Problem

Objectives and story beats are authored as separate arrays with string triggers. No runtime owner validates their compatibility, evaluates them against accepted evidence or commits their effects together.

## Required progression state

```txt
progressionEpoch
progressionRevision
activeObjectiveId
completedObjectiveIds
storyBeatIds
inspectedTargetIds
pathProgressByPathId
lastProgressionResultId
```

## Required transition transaction

```txt
accepted spatial/interaction evidence
  -> read predecessor progression revision
  -> evaluate all matching objective rules
  -> evaluate all matching story triggers
  -> reject incompatible or ambiguous rules
  -> stage completion ledger and active objective
  -> stage story beat additions
  -> stage ordered events
  -> atomically publish successor state and ProgressionResult
```

## Invariants

```txt
one progression revision per accepted command
completed objective IDs are unique
story beat IDs are unique
active objective is compatible with completion ledger
objective and story events match successor state
failed staging preserves predecessor state
retries are idempotent by command ID
reset replaces epoch and revision baseline
```

## Authored threshold policy

```txt
path-discovery story: first accepted crossing of 0.25
walk-the-path completion: first accepted crossing of 0.35
inspect-tree completion: first accepted focal-tree inspection
focal-tree story: same atomic commit as accepted inspection
```

## Required result

```txt
ProgressionResult
  commandId
  status
  predecessorRevision
  committedRevision
  objectiveTransitions
  storyTransitions
  player/path/interaction receipts
  events
  rejectionReasons
```
