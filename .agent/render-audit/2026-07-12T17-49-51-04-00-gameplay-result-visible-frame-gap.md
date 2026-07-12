# Render Audit: Gameplay Result Visible-Frame Gap

**Generated:** `2026-07-12T17-49-51-04-00`

## Summary

The renderer can draw a healthy meadow while gameplay remains inert. Current render snapshots do not identify an accepted gameplay command, player/path revision, inspection result, objective/story transition, feedback result, or first visible frame for that result.

## Plan ledger

**Goal:** make every user-visible gameplay change cite one committed gameplay result without making rendering an owner of gameplay truth.

- [x] Trace the current tick-to-render handoff.
- [x] Separate visual health from gameplay progress.
- [x] Define required frame provenance.
- [ ] Implement render and feedback correlation fixtures.

## Current frame

```txt
RAF
  -> game.tick
  -> frame and lastTick advance
  -> static render plan is enhanced
  -> WebGL draws
  -> diagnostics publish visual state
```

Missing provenance:

```txt
GameplayCommandId
GameplayResultId
GameplayStateRevision
PlayerTransformRevision
PathProgressResultId
InspectAdmissionResultId
ObjectiveRevision
StoryRevision
FeedbackProjectionResult
GameplayVisibleFrameAck
```

## Required frame transaction

```txt
accepted GameplayResult
  -> prepare player, camera and feedback projection from one gameplay revision
  -> reject stale preparation
  -> commit one render frame
  -> publish GameplayVisibleFrameAck with the frame, result and state revisions
```

## Required invariants

```txt
rendering never advances gameplay truth
feedback never cites an uncommitted candidate
stale results cannot replace a newer visible frame
an accepted visible action receives one first-frame acknowledgement
a rejected command produces no successor gameplay projection
```

## Validation boundary

No runtime or rendering code changed, and no browser capture was run. This documents a missing provenance contract, not a measured rendering defect.
