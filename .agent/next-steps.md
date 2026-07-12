# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T17-49-51-04-00`

## Summary

The next product boundary is a minimal playable exploration loop built on truthful executable DSK providers. Extend the existing input, player, path, interaction, objective, story, UI and save owners; do not create a parallel gameplay framework.

## Plan ledger

**Goal:** prove one complete player-action transaction from admitted command through deterministic movement or inspection, exactly-once progression and first-visible-frame acknowledgement.

### Foundation
- [ ] Implement the existing DSK runtime-consumption authority first.
- [ ] Resolve immutable provider identities and real service contracts.
- [ ] Publish a ready runtime capability generation.
- [ ] Keep planned declarations unavailable.

### Command and movement
- [ ] Add gameplay session and state revisions.
- [ ] Add normalized keyboard, pointer and editor command samples.
- [ ] Add idempotent `GameplayCommand` routing.
- [ ] Implement deterministic player motion proposals.
- [ ] Produce terrain-contact and path-projection results.
- [ ] Commit player transform and path progress atomically.

### Interaction and progression
- [ ] Build a revisioned interaction-target index.
- [ ] Require exact target identity and range evidence for inspection.
- [ ] Evaluate `path-progress:0.25` once.
- [ ] Complete `walk-the-path` at progress `>= 0.35` once.
- [ ] Evaluate `inspect:focal-tree` once.
- [ ] Complete `inspect-tree` from accepted inspection once.
- [ ] Add objective and story transition ledgers.
- [ ] Reject duplicate, stale and unavailable commands with zero mutation.

### Projection and persistence
- [ ] Publish typed `GameplayResult` and DSK-consumption receipts.
- [ ] Project feedback through the existing UI owner.
- [ ] Bind saves only to committed gameplay revisions.
- [ ] Correlate player/camera/feedback projection with the accepted result.
- [ ] Publish `GameplayVisibleFrameAck`.

### Proof
- [ ] Add movement, terrain and path determinism fixtures.
- [ ] Add threshold crossing and high-delta fixtures.
- [ ] Add exact target and range-admission fixtures.
- [ ] Add objective/story exactly-once and failure rollback fixtures.
- [ ] Add browser keyboard and editor-command smokes.
- [ ] Add built-output and GitHub Pages parity proof.

## Required command

```txt
GameplayCommand {
  commandId
  sessionId
  capabilityGeneration
  expectedGameplayRevision
  inputContext
  action
  payload
}
```

## Required result

```txt
GameplayResult {
  commandId
  status
  reason
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

## Minimal playable slice

```txt
1. Normalize WASD or editor movement.
2. Move the player deterministically over terrain/path.
3. Derive committed path progress.
4. Fire path-discovery once at 0.25.
5. Complete walk-the-path once at 0.35.
6. Query focal-tree from committed transforms.
7. Admit inspection only with exact in-range evidence.
8. Fire focal-tree story and inspect-tree completion once.
9. Project feedback and acknowledge its first frame.
10. Persist only the committed gameplay revision.
```

## Architecture order

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Runtime Clock and Step Admission Authority
4. Source Provider and DSK Runtime Consumption Authority
5. Exploration and Progression Authority
6. Render/Feedback Visible-Frame Authority
7. Audio and Persistence Consumption
8. Deterministic Replay and Pages Proof
```

The full 44-kit service inventory remains in the current tracker and machine registry.
