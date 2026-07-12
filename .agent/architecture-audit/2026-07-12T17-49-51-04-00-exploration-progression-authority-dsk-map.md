# Architecture Audit: Exploration and Progression Authority DSK Map

**Generated:** `2026-07-12T17-49-51-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The repository has bounded descriptors for input, player, terrain/path, interaction, objective, story, UI and save responsibilities, but no composition authority turns those declarations into one committed playable action. The missing parent is an orchestration domain, not a replacement for the existing bounded domains.

## Plan ledger

**Goal:** define the ownership boundary that coordinates existing DSK services into one deterministic exploration/progression transaction.

- [x] Preserve existing bounded domain ownership.
- [x] Identify missing command, evidence, commit and acknowledgement responsibilities.
- [x] Define candidate coordinating kits.
- [x] Define dependency direction and invariants.
- [ ] Implement after executable provider installation exists.

## Existing bounded domains

```txt
meadow-input-dsk
  owns action mapping, device binding, context, normalization and validation

meadow-player-dsk
  owns player state, movement profile, terrain contact, actions and validation

path-corridor-dsk
  owns path curve, walkable corridor, surface detail, progression and validation

meadow-interaction-dsk
  owns interactable registry, affordances, inspect state, interaction events and validation

meadow-objective-dsk
  owns objective model, flow, completion ledger, feedback surface and validation

meadow-story-dsk
  owns story state, beats, dialogue, sequence runner and validation

meadow-ui-dsk
  owns minimal HUD, story panel, debug UI, UI state and validation

meadow-save-dsk
  owns save model, slots, persistence adapter, migration and validation
```

## Missing parent domain

```txt
meadow-exploration-progression-authority-domain
```

It owns:

```txt
command identity and admission
session/capability/gameplay revision fences
cross-domain evidence aggregation
detached candidate successor state
exactly-once objective/story transition coordination
atomic multi-domain commit
typed result and consumption receipts
feedback/save projection admission
first-visible-frame acknowledgement
```

It does not own:

```txt
device-specific browser listeners
movement equations
terrain or path geometry
target content definitions
objective content
story dialogue/content
WebGL rendering
browser storage implementation
```

## Candidate kit map

```txt
identity and revisions
  exploration-command-id-kit
  gameplay-session-revision-kit
  gameplay-state-revision-kit

input and command
  gameplay-input-sample-kit
  gameplay-input-normalization-kit
  gameplay-command-router-kit

movement and path evidence
  player-motion-proposal-kit
  terrain-contact-result-kit
  path-projection-result-kit
  path-progress-result-kit

interaction evidence
  interaction-target-index-kit
  interaction-target-query-kit
  inspect-command-kit
  inspect-admission-result-kit

progression
  objective-transition-kit
  objective-completion-ledger-kit
  story-trigger-evaluation-kit
  story-sequence-result-kit

commit and projection
  gameplay-commit-kit
  gameplay-result-kit
  feedback-projection-kit
  save-revision-binding-kit
  gameplay-frame-ack-kit

proof
  movement-threshold-fixture-kit
  inspect-target-fixture-kit
  objective-story-exactly-once-fixture-kit
  browser-playable-loop-smoke-kit
  pages-playable-loop-smoke-kit
```

## Dependency direction

```txt
runtime capability generation
  -> exploration command admission
  -> player/path candidate evidence
  -> interaction evidence
  -> objective/story candidate transitions
  -> atomic gameplay commit
  -> feedback/save/render projection
  -> visible frame acknowledgement
```

No projection or persistence adapter may mutate gameplay truth. No objective or story consumer may independently infer movement or inspection from render state.

## Required result

```txt
GameplayResult {
  commandId
  status
  reason
  sessionId
  capabilityGeneration
  gameplayRevisionBefore
  gameplayRevisionAfter
  playerResult
  pathProgressResult
  inspectResult
  objectiveTransitions[]
  storyTransitions[]
  consumptionReceiptIds[]
  feedbackProjectionId
  saveEligibleRevision
}
```

## Completion boundary

This architecture is not present in executable form. The current tick remains time-only, and no source or deployed fixture proves command admission, movement, inspection, progression or visible acknowledgement.
