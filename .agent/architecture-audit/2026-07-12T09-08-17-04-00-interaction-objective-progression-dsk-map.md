# Interaction and Objective Progression DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T09-08-17-04-00`

## Summary

Interaction, objective and story DSKs exist as planned descriptors, while authored content is imported directly into the game object. No implementation provider turns commands into target evidence, objective completion or story progression.

## Plan ledger

**Goal:** define ownership and composition for one deterministic interaction-to-progression transaction.

- [x] Map existing descriptors and runtime owners.
- [x] Separate declarations from implementation-backed capabilities.
- [x] Define command, evidence, evaluation, commit and proof layers.
- [x] Preserve existing game, renderer, UI, persistence and committed-frame owners.
- [ ] Implement only after runtime session and command-admission foundations exist.

## Current architecture

```txt
content descriptors
  ARRIVAL_INTERACTION_TARGETS
  ARRIVAL_OBJECTIVES
  STORY_BEATS
        |
        v
createIntoTheMeadowGame
  exposes content
  creates initial progression state
  exposes tick/reset/snapshot
        |
        v
advanceGameState
  frame += 1
  lastTick = {dt,time}
  no gameplay mutation
        |
        v
GameHost/editor
  read/tick/reset/render/capture
  no interaction/progression capability
```

## Existing DSK descriptors

```txt
meadow-input-dsk
  action-map
  device-bindings
  input-context
  input-normalization
  input-validation

meadow-player-dsk
  player-state
  movement-profile
  terrain-contact
  player-actions
  player-validation

path-corridor-dsk
  path-curve-model
  walkable-corridor
  path-surface-detail
  path-progression
  path-validation

meadow-interaction-dsk
  interactable-registry
  affordance-rules
  inspect-state
  interaction-events
  interaction-validation

meadow-objective-dsk
  objective-model
  objective-flow
  completion-ledger
  feedback-surface
  objective-validation

meadow-story-dsk
  story-state
  story-beats
  dialogue-text
  sequence-runner
  story-validation

meadow-ui-dsk
  minimal-hud
  story-text-panel
  debug-ui
  ui-state
  ui-validation
```

These descriptors are not implementation proof. The interaction, story and objective DSKs are outside `REQUIRED_V01_DSK_IDS` and are labeled `planned` by `createDskDescriptor()`.

## Required parent domain

```txt
meadow-interaction-objective-progression-authority-domain
```

## Layered composition

```txt
Layer 1: product aggregate
  IntoTheMeadow

Layer 2: parent domain
  meadow-interaction-objective-progression-authority-domain

Layer 3: DSK ownership
  meadow-input-dsk
  meadow-player-dsk
  path-corridor-dsk
  meadow-interaction-dsk
  meadow-objective-dsk
  meadow-story-dsk
  meadow-ui-dsk
  into-the-meadow-game-dsk

Layer 4: subdomains
  command admission
  target registry
  action evidence
  objective evaluation
  story evaluation
  progression transaction
  feedback projection
  observations and proof

Layer 5: services
  canonical commands and typed results
  target/evidence identities and revisions
  atomic completion/story commits
  rollback and stale-work rejection
  browser/editor parity
  first-visible-frame acknowledgement
```

## Coordinating kits

```txt
progression-session-id-kit
progression-reset-generation-kit
progression-state-revision-kit
interaction-command-id-kit
interaction-command-kit
interaction-command-admission-kit
interaction-action-map-kit
interaction-target-registry-kit
interaction-target-revision-kit
interaction-target-query-kit
interaction-proximity-evidence-kit
path-progress-evidence-kit
inspect-evidence-kit
interaction-result-kit
stale-interaction-command-rejection-kit
objective-definition-registry-kit
objective-evaluation-kit
objective-completion-result-kit
objective-successor-policy-kit
completion-ledger-commit-kit
story-trigger-parser-kit
story-trigger-evaluation-kit
story-beat-deduplication-kit
story-progression-result-kit
progression-transaction-kit
progression-rollback-kit
feedback-state-kit
progression-ui-projection-kit
progression-observation-kit
progression-journal-kit
visible-progression-frame-ack-kit
interaction-objective-fixture-kit
browser-editor-progression-parity-fixture-kit
```

## Command contract

```txt
InteractionCommand {
  commandId
  runtimeSessionId
  resetGeneration
  actorId
  action
  targetId
  expectedTargetRevision
  expectedProgressionRevision
  inputSequence
  submittedAt
}
```

## Result contracts

```txt
InteractionResult {
  status
  reason
  commandId
  action
  canonicalTargetId
  evidence
  predecessorProgressionRevision
  committedProgressionRevision
}

ObjectiveProgressionResult {
  status
  evaluatedObjectiveIds
  completedObjectiveIds
  activatedObjectiveId
  completionLedgerRevision
}

StoryProgressionResult {
  status
  evaluatedTriggerIds
  newlyCommittedStoryBeatIds
  storyRevision
}
```

## Transaction order

```txt
admit command
  -> bind session, reset and progression revisions
  -> resolve canonical target
  -> derive detached evidence
  -> evaluate interaction
  -> evaluate objectives
  -> evaluate story triggers
  -> prepare feedback projection
  -> atomically commit progression state
  -> publish typed results
  -> render committed feedback
  -> acknowledge first visible progression frame
```

## Dependency order

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway
3. Runtime Clock and Step Admission
4. Committed Frame Observation
5. Interaction Command and Objective Progression Authority
6. Persistence Continuity Authority
7. Deterministic Replay Validation Authority
```

## Completion boundary

Descriptor validation, imported content counts and a mutable `activeObjectiveId` do not prove gameplay progression. Completion requires admitted commands, canonical evidence, atomic state mutation, typed results, reset safety, browser/editor parity and visible-frame proof.