# Target Evidence, Completion Ledger and Story Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T09-08-17-04-00`

## Summary

Progression requires three separate but atomic concerns: canonical interaction evidence, objective completion, and story-beat commitment. The current runtime owns none of these as executable services.

## Plan ledger

**Goal:** define immutable evidence and ledger contracts that prevent threshold drift, duplicate completion and stale callback/state mutation.

- [x] Map authored target, objective and story relationships.
- [x] Define evidence and revision identities.
- [x] Define objective and story ledgers.
- [x] Define atomic commit, rollback and observation boundaries.
- [ ] Implement and execute deterministic fixtures later.

## Authored relationship map

```txt
arrival-path
  action: path-progress
  story threshold: 0.25 -> path-discovery
  objective threshold: 0.35 -> complete walk-the-path

focal-tree
  action: inspect
  objective: inspect-tree
  story trigger: inspect:focal-tree -> focal-tree beat
```

## Target registry

```txt
InteractionTargetRegistry {
  registryId
  targetRevision
  sceneId
  targets[]
  fingerprint
}

InteractionTarget {
  targetId
  type
  requiredAction
  position/range descriptor
  affordance policy
  contentRevision
}
```

## Evidence contracts

```txt
PathProgressEvidence {
  evidenceId
  commandId
  actorId
  targetId
  targetRevision
  predecessorProgress
  candidateProgress
  samplingPolicy
  observedAt
}

InspectEvidence {
  evidenceId
  commandId
  actorId
  targetId
  targetRevision
  actorPosition
  targetPosition
  admittedDistance
  affordanceResult
  observedAt
}
```

Evidence must be detached and immutable. Objective/story evaluators consume the same evidence object so they cannot disagree about the action that occurred.

## Completion ledger

```txt
CompletionLedger {
  ledgerRevision
  activeObjectiveId
  completedObjectiveIds
  completionReceipts[]
}

ObjectiveCompletionReceipt {
  objectiveId
  commandId
  evidenceId
  predecessorLedgerRevision
  committedLedgerRevision
  completedAt
}
```

## Story ledger

```txt
StoryLedger {
  storyRevision
  committedBeatIds
  triggerReceipts[]
}

StoryTriggerReceipt {
  beatId
  triggerId
  commandId
  evidenceId
  predecessorStoryRevision
  committedStoryRevision
}
```

## Atomic transaction

```txt
prepare:
  validate command and target
  derive evidence
  evaluate active objective
  evaluate dependent story triggers
  choose successor objective
  prepare feedback

commit:
  player/action state
  inspect state
  completion ledger
  story ledger
  active objective
  feedback state
  progression revision

rollback:
  preserve all predecessor state
  publish typed failure
  retire prepared feedback/resources
```

## Ordering rules

```txt
path-discovery can commit at 0.25 before walk-the-path completes at 0.35
walk-the-path completion and successor activation occur in one transaction
inspect-tree cannot be completed twice
focal-tree story beat cannot be committed twice
reset starts a new generation and restores baseline ledgers
old-generation evidence cannot be replayed into the new generation
```

## Observation and journal

```txt
ProgressionObservation {
  progressionRevision
  activeObjectiveId
  completedObjectiveIds
  storyBeatIds
  lastInteractionResult
  lastObjectiveResult
  lastStoryResult
  firstVisibleFrameId
}
```

Journal entries must be bounded by count/bytes/age and must not retain mutable runtime objects.

## Required fixtures

```txt
fixture:path-story-threshold
fixture:path-objective-threshold
fixture:inspect-range-admission
fixture:objective-successor
fixture:duplicate-completion
fixture:story-deduplication
fixture:atomic-objective-story-commit
fixture:progression-rollback
fixture:reset-generation-rejection
fixture:browser-editor-progression-parity
fixture:visible-progression-frame
```

## Claim boundary

A list of completed IDs without receipts and revisions is insufficient. Completion requires canonical evidence, idempotent ledgers, atomic mutation, rollback and visible proof.