# Progression Audit: Path, Inspect, Objective and Story Contract

**Generated:** `2026-07-12T17-49-51-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The repository authors four progression conditions but has no evaluator or exactly-once ledger connecting them to committed gameplay evidence. This contract defines how path and inspection results drive objective and story state without duplicated or partially ordered effects.

## Plan ledger

**Goal:** make all authored progression deterministic, evidence-bound and exactly once.

- [x] Inventory authored triggers and completion conditions.
- [x] Define predecessor and successor evidence.
- [x] Define transition ordering and duplicate handling.
- [x] Define rollback and observation requirements.
- [ ] Implement reducers, ledgers and fixtures.

## Authored conditions

```txt
story:path-discovery
  evidence: committed path progress crosses 0.25

objective:walk-the-path
  evidence: committed path progress reaches at least 0.35

story:focal-tree
  evidence: accepted inspect result for focal-tree

objective:inspect-tree
  evidence: accepted inspect result for focal-tree
```

## Transition contract

```txt
ProgressionEvaluationInput {
  commandId
  gameplayRevisionBefore
  candidateGameplayRevision
  pathProgressBefore
  pathProgressAfter
  inspectResult
  objectiveLedgerRevision
  storyLedgerRevision
}

ProgressionEvaluationResult {
  status
  pathCrossings[]
  objectiveTransitions[]
  storyTransitions[]
  duplicateSuppressions[]
  nextObjectiveLedgerRevision
  nextStoryLedgerRevision
}
```

## Ordering

```txt
1. validate movement/inspect evidence
2. calculate path crossings from predecessor to successor
3. calculate objective candidates
4. calculate story candidates
5. remove already-committed transition identities
6. validate complete candidate aggregate
7. commit player, interaction, objective and story state atomically
8. emit ordered feedback after commit
```

## Exactly-once identities

```txt
path-discovery:<runGeneration>
walk-the-path:<runGeneration>
focal-tree-story:<runGeneration>
inspect-tree:<runGeneration>
```

Repeated frames or duplicate commands must return the existing result or an explicit duplicate outcome without replaying feedback, audio or save effects.

## Recovery

A transition failure must preserve the complete predecessor state and ledger revisions. Candidate feedback and save records must not publish before the gameplay commit succeeds.

## Required fixtures

```txt
cross 0.25 in one step
land exactly on 0.25
start above 0.25 after restore
cross 0.25 and 0.35 in one step
repeat movement command
inspect unknown target
inspect focal-tree out of range
inspect focal-tree in range
repeat accepted inspection
inject objective or story commit failure
restore and replay committed transitions
```

## Completion boundary

No evaluator, transition result or completion ledger currently proves these behaviors. This audit does not claim objectives or story progression are operational.
