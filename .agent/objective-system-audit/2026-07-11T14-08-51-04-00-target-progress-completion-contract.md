# Target, Progress and Completion Contract

## Summary

The content definitions are internally consistent but lack an execution contract.

## Canonical definitions

```txt
arrival-path
  type: path
  requiredAction: path-progress
  objective: walk-the-path
  threshold: 0.35

focal-tree
  type: inspectable
  requiredAction: inspect
  objective: inspect-tree
  completion: inspected true
```

## Required indexes

```txt
sceneId -> targetId -> canonical target
objectiveId -> canonical objective
requiredAction -> evaluator
objective order -> successor objective/story beat
```

## Completion rules

- Progress below `0.35` remains incomplete.
- The first accepted crossing of `0.35` completes `walk-the-path` once.
- `inspect-tree` may complete only from an accepted `inspect` result for `focal-tree` in the active scene.
- Duplicate commands return typed no-mutation results.
- Completion receipts are immutable and carry objective, command, target and revision identity.
- Story transitions consume completion receipts exactly once.

## State model required

```txt
activeObjectiveId
objectiveRevision
progressByObjectiveId
inspectedTargetIds
completedObjectiveIds
completionReceipts
storyBeatIds
storyRevision
```

## Reset contract

Reset creates a new epoch, restores `walk-the-path`, clears progress/inspection/completion receipts and rejects old commands. It must not reuse old command sequences or frame acknowledgements.

## Promotion boundary

The generic objective predicate and completion-result model may be a ProtoKit candidate only after the meadow fixture and at least one second product prove the same contract. Authored target IDs, thresholds and story order stay local.
