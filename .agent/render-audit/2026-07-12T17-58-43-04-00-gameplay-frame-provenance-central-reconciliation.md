# Render Audit: Gameplay Frame Provenance Central Reconciliation

**Generated:** `2026-07-12T17-58-43-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The renderer proves deterministic meadow presentation, not gameplay progression. The current frame can animate grass, wind and post-processing while player, path, interaction, objective and story state remain unchanged.

## Plan ledger

**Goal:** require every user-visible gameplay change to cite the accepted command and committed gameplay revision that produced it.

- [x] Reconcile the detailed `17-49-51` render audit.
- [x] Identify current visual/gameplay provenance gaps.
- [x] Define the required frame acknowledgement.
- [ ] Implement render-plan and HUD adoption receipts.

## Current frame path

```txt
RAF time
  -> game.tick({ time, dt: 1/60 })
  -> frame and lastTick mutate
  -> static meadow source plan + time overlay
  -> render-plan enhancement
  -> WebGL draw submission
  -> visual/debug snapshot
```

## Missing frame evidence

```txt
gameplay command id
capability generation
gameplay revision
player-motion result id
path-progress result id
inspect result id
objective/story transition ids
feedback projection id
save-eligible revision
first visible gameplay frame acknowledgement
```

## Required acknowledgement

```txt
GameplayVisibleFrameAck {
  renderFrameId
  commandId
  gameplayResultId
  capabilityGeneration
  gameplayRevision
  objectiveRevision
  storyRevision
  feedbackProjectionId
  presentedAt
}
```

## Required rule

A healthy canvas, renderer snapshot or editor capture is not evidence that a gameplay service was installed or consumed. The visible frame must cite one committed gameplay result, and stale projections must be rejected after session, capability or gameplay revision changes.

## Boundary

No render source, shader, buffer, canvas, HUD or deployment output changed in this pass.