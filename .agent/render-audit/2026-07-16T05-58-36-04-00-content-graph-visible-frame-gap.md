# Render Audit: Content Graph Visible Frame Gap

**Timestamp:** `2026-07-16T05-58-36-04-00`

## Summary

A valid WebGL frame can be presented even when the authored gameplay graph has never been validated. Render-plan validation proves visual descriptor structure, not that objectives, targets, story triggers and initial progression references agree.

## Plan ledger

**Goal:** require the first gameplay-capable visible frame to cite the accepted authored content generation.

- [x] Trace startup from content import through first render.
- [x] Separate render-plan validity from content-graph validity.
- [x] Define a content-bound frame acknowledgement.
- [ ] Add executable invalid-content and first-frame fixtures later.

## Current path

```txt
authored modules import
  -> game and initial state created
  -> meadow render plan generated
  -> render-plan validation passes
  -> renderer submits frame
  -> visible meadow appears
  -> no ContentGraphAdmissionResult or graph digest is attached
```

## Required proof

```txt
FirstContentBoundGameplayFrameAck {
  contentGeneration
  contentGraphDigest
  gameplayRevision
  renderPlanId
  rendererGeneration
  frameId
  presentedAt
}
```

The renderer remains downstream. It does not validate story or objective semantics; it only refuses gameplay-capable presentation until the host supplies an accepted content generation.

## Boundary

No renderer, shader, mesh, post-process or visual behavior changed.