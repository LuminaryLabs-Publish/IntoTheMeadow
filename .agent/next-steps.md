# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T09-08-17-04-00`

## Summary

Implement one interaction/objective progression authority after runtime-session, capability and committed-frame foundations. Keep browser and editor inputs as adapters over the same command/result contracts.

## Plan ledger

**Goal:** make the authored arrival sequence playable without adding direct state mutation to RAF, renderer, GameHost or editor code.

- [ ] Define runtime session, reset generation and progression revision.
- [ ] Define canonical `InteractionCommand` and command IDs.
- [ ] Normalize browser/editor/controller actions through one action map.
- [ ] Build a revisioned interaction-target registry.
- [ ] Derive immutable path-progress and inspect evidence.
- [ ] Add typed interaction rejection reasons.
- [ ] Implement objective-definition registry and evaluator.
- [ ] Implement deterministic successor-objective policy.
- [ ] Add idempotent completion ledger and receipts.
- [ ] Parse/evaluate story triggers against the same evidence.
- [ ] Deduplicate story-beat commits.
- [ ] Prepare feedback/UI state before mutation.
- [ ] Atomically commit player, inspect, objective, story and feedback state.
- [ ] Preserve/restore predecessor state on failure.
- [ ] Reject duplicate, stale-session, stale-reset and stale-revision commands.
- [ ] Replace raw public mutation with explicit capabilities.
- [ ] Add editor `interaction.dispatch` and progression readback capabilities.
- [ ] Include progression results/revisions in snapshots and diagnostics.
- [ ] Publish bounded observations and journals.
- [ ] Correlate the first visible feedback frame.
- [ ] Add deterministic, browser and Pages fixtures.

## Required command

```txt
InteractionCommand {
  commandId
  runtimeSessionId
  resetGeneration
  actorId
  action
  targetId
  payload
  source
  inputSequence
  expectedTargetRevision
  expectedProgressionRevision
  submittedAt
}
```

## Required aggregate result

```txt
ProgressionTransactionResult {
  status
  reason
  commandId
  interactionResult
  objectiveResult
  storyResult
  feedbackResult
  predecessorProgressionRevision
  committedProgressionRevision
  rollbackResult
  firstVisibleFrameId
}
```

## Required state

```txt
progression {
  revision
  activeObjectiveId
  completedObjectiveIds
  completionLedgerRevision
  storyBeatIds
  storyRevision
  inspectState
  feedbackRevision
}
```

## Acceptance matrix

```txt
path progress 0.24
path progress 0.25
path progress 0.34
path progress 0.35
inspect unknown target
inspect focal-tree outside range
inspect focal-tree inside range
duplicate command ID
out-of-order input sequence
stale target revision
stale progression revision
reset-generation rejection
objective/story atomic commit
feedback prepare failure rollback
browser/editor parity
snapshot/result parity
first visible progression-frame receipt
local browser and deployed Pages smoke
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
2a. Editor Bridge Lifecycle and Error Journal Authority
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology / Context / Surface / Precision Authorities
7. Committed Frame Observation and Failure Recovery
7a. Adaptive Quality / Grass LOD / Audio Authorities
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

Do not implement threshold checks as free-running frame effects. Evaluate objectives and story beats only from admitted command evidence and commit all resulting state under one progression revision.