# Next Steps

**Updated:** `2026-07-15T10-40-17-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `audio-event-projection-authority-audited`

## Summary

Activate audio only after accepted gameplay semantics and browser lifecycle ownership are explicit. Start with event identity and unlock admission, then add ambience, cue projection, preferences, lifecycle settlement and executable parity fixtures.

## Plan ledger

**Goal:** create the smallest reliable path from accepted semantic state to one lifecycle-safe audible result and matching visible-frame acknowledgement.

### Semantic results

- [ ] Add a stable semantic event ledger to game state.
- [ ] Emit scene-start, path-progress, inspect and objective-complete results exactly once.
- [ ] Bind every event to session and state revisions.
- [ ] Preserve the same event stream for UI, diagnostics, replay and audio.

### Browser capability and unlock

- [ ] Add browser audio capability observation.
- [ ] Admit audio unlock only from an accepted user gesture.
- [ ] Own one `AudioContextGeneration` at a time.
- [ ] Publish unlock success, failure and unsupported results.

### Cue and ambience projection

- [ ] Add immutable cue descriptors for UI, story, world and ambience categories.
- [ ] Add one meadow ambience owner with versioned loop adoption.
- [ ] Add listener pose and spatial-source descriptors.
- [ ] Deduplicate repeated snapshots and event replays.
- [ ] Add pooling, priority and voice budgets.

### Preferences and lifecycle

- [ ] Add master/category mute and volume revisions.
- [ ] Define pause, hidden-document and resume policy.
- [ ] Reject cues from stale, retired or muted sessions.
- [ ] Stop and disconnect resources on route exit, fatal stop and host replacement.
- [ ] Publish retirement receipts.

### Diagnostics and evidence

- [ ] Add audio capability, context, bus, source and event snapshots.
- [ ] Publish `AudioProjectionResult` for every admitted event batch.
- [ ] Publish `FirstAudibleCueAck` and `FirstAudioVisualConvergenceAck`.
- [ ] Bind captures to state, visible-frame and audio result revisions.

### Fixtures

- [ ] Add unsupported and locked-browser fixtures.
- [ ] Add successful and failed unlock fixtures.
- [ ] Add ambience start, cue-once and deduplication fixtures.
- [ ] Add mute, pause, visibility, resume and route-retirement fixtures.
- [ ] Add source, built-output and GitHub Pages parity fixtures.

## Required result

```txt
AudioProjectionResult {
  hostGeneration
  sessionRevision
  stateRevision
  audioPolicyRevision
  audioContextGeneration
  semanticEventIds
  admittedCueIds
  rejectedCueIds
  listenerPoseRevision
  activeSourceRevisions
  lifecycleState
  resourceReceipts
  status
  reason
}
```

## Preserved dependencies

Shader precision admission, editor mutation settlement, post-process execution, startup readiness, reset/replay, DSK capability admission, observation provenance, cache coherence, viewport authority, editor lifecycle, host retirement, provider parity, WebGL recovery, scheduling, progression, grass visibility and save/migration remain separate bounded work.