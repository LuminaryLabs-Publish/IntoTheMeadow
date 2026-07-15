# Render Audit: Editor Mutation Stale-Canvas Gap

**Timestamp:** `2026-07-15T01-39-38-04-00`

## Summary

Browser editor mutation changes game state without submitting a corresponding render. The canvas and renderer snapshot remain owned by the most recent RAF frame, so an immediate capture can combine the new state with predecessor presentation evidence.

## Plan ledger

**Goal:** define the frame identity and capture rules required to prove that editor-visible output matches the accepted mutation.

- [x] Trace mutation to render-plan and renderer publication.
- [x] Trace canvas capture and renderer snapshot reads.
- [x] Identify missing revision bindings and stale-frame rejection.
- [x] Define required render and capture receipts.
- [ ] Add executable frame fixtures later.

## Current path

```txt
runtime.tick or runtime.reset
  -> game state changes
  -> lastPlan unchanged
  -> lastRender unchanged
  -> canvas pixels unchanged
  -> command reports completed

renderer.capture
  -> reads canvas pixels now
  -> reads current renderer snapshot now
  -> publishes no RuntimeRevision or FrameRevision
```

## Required frame chain

```txt
EditorCommandId
  -> RuntimeRevision
  -> RenderAttemptId
  -> RenderPlanRevision
  -> RendererRevision
  -> SubmittedFrameRevision
  -> VisibleFrameRevision
  -> CaptureId
```

Every arrow must be explicit and immutable. Capture must reject a mixed chain rather than returning a plausible image with unrelated state metadata.

## Required capture result

```txt
EditorCaptureResult {
  captureId
  editorCommandId
  runtimeRevision
  renderAttemptId
  renderPlanRevision
  rendererRevision
  submittedFrameRevision
  visibleFrameRevision
  canvasWidth
  canvasHeight
  mimeType
  byteLength
  status
}
```

## Failure and predecessor policy

- Keep the previously accepted frame visible until the candidate mutation renders successfully.
- Report the candidate mutation as failed or headless when no visible frame can be produced.
- Do not relabel predecessor pixels as the result of the new editor command.
- Retire stale captures when reset, host replacement, renderer recovery, or viewport generation changes.

## Fixture gate

```txt
capture immediately after visible tick matches accepted RuntimeRevision
capture immediately after visible reset matches reset RuntimeRevision
capture during failed render remains explicitly predecessor-bound
capture with stale expected FrameRevision is rejected
source, built output and Pages expose matching IDs
```

## Boundary

No browser image or pixel probe was executed. This is a source-backed frame-coherence and evidence gap, not a claim of a reproduced visual defect.
