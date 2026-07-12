# Architecture Audit: Exploration Progression Central Reconciliation

**Generated:** `2026-07-12T17-58-43-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The repository already declares bounded input, player, path, interaction, objective, story, UI and save responsibilities. What is missing is a coordinating authority that admits one command, aggregates evidence from those domains, commits one successor state and publishes one visible result.

## Plan ledger

**Goal:** preserve bounded DSK ownership while defining the cross-domain transaction required for a playable exploration loop.

- [x] Retain existing DSK responsibilities.
- [x] Reconcile the detailed `17-49-51` architecture audit.
- [x] Define dependency direction, result shape and invariants.
- [ ] Implement only after executable provider installation and capability publication exist.

## Existing bounded ownership

```txt
meadow-input-dsk          -> action maps, device bindings, contexts, normalization
meadow-player-dsk         -> player state, movement profile, terrain contact, actions
path-corridor-dsk         -> path geometry, corridor, projection and progression
meadow-interaction-dsk    -> target registry, affordances, inspect state and events
meadow-objective-dsk      -> objective model, flow, completion ledger and feedback
meadow-story-dsk          -> story state, beats, dialogue and sequence runner
meadow-ui-dsk             -> HUD, story panel, debug UI and UI state
meadow-save-dsk           -> save model, slots, adapter and migration
```

## Missing parent

```txt
meadow-exploration-progression-authority-domain
```

It owns command identity, revision admission, cross-domain evidence aggregation, detached candidate state, exactly-once progression coordination, atomic commit, typed results, service-consumption receipts, feedback/save admission and first-visible-frame acknowledgement.

It does not own device listeners, movement equations, terrain/path geometry, authored targets/objectives/story content, WebGL submission or browser storage.

## Dependency direction

```txt
runtime capability generation
  -> gameplay command admission
  -> movement and path evidence
  -> target and inspect evidence
  -> objective and story candidate transitions
  -> atomic gameplay commit
  -> feedback, save and render projection
  -> GameplayVisibleFrameAck
```

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

## Invariants

```txt
no movement commit without terrain/path evidence
no path threshold from an uncommitted proposal
no inspection from stale, unknown or out-of-range evidence
objective and story evaluate the same candidate state
threshold and inspection completion commit at most once
rejected or stale commands perform zero gameplay mutation
feedback and save cite the committed gameplay revision
visible acknowledgement follows every accepted user-visible result
planned or unready declarations expose no gameplay capability
```

## Boundary

This is documentation, not an executable domain. The active runtime remains time-only.