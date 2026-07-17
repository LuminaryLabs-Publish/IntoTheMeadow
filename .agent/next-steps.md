# Next Steps

**Updated:** `2026-07-17T03-44-31-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `webgl-capture-readback-frame-correlation-authority-audited`

## Summary

Replace uncorrelated canvas, synthetic and command-line evidence with one typed capture transaction that binds exact pixels to one renderer frame and browser session.

## Intent

Create the smallest reliable path from capture request to immutable artifact without treating synthetic observations or mixed browser sessions as live-frame proof.

## Checklist

### Admission

- [ ] Allocate `CaptureId` and `CaptureGeneration`.
- [ ] Bind runtime, browser session, renderer, viewport, DPR, plan and format revisions.
- [ ] Reject hidden, disposed, zero-area, context-lost and stale surfaces.
- [ ] Publish `CaptureAdmissionResult`.

### Frame and readback

- [ ] Add a monotonic renderer `FrameId` and frame metadata receipt.
- [ ] Render or select one exact frame for the capture.
- [ ] Use a capture-safe render target or explicitly retained drawable generation.
- [ ] Settle GPU/readback completion before encoding.
- [ ] Publish `CaptureFrameCommitResult` and `CaptureReadbackResult`.

### Provenance

- [ ] Bind pixels to renderer snapshot, plan ID, topology key, viewport and DPR.
- [ ] Record dimensions, color space, MIME type and pixel digest.
- [ ] Classify live WebGL, browser screenshot, synthetic SVG and metadata-only evidence.
- [ ] Run screenshot and DOM checks in one browser session or retain separate results.
- [ ] Commit immutable `CaptureArtifactResult`.

### Evidence

- [ ] Add a real-browser `NexusEditorEnvironment.renderer.capture` fixture.
- [ ] Add blank/stale pixel rejection fixtures.
- [ ] Add resize, DPR, hidden-document and context-loss fixtures.
- [ ] Add pixel/snapshot mismatch and mixed-session rejection fixtures.
- [ ] Compare source, built artifact and Pages behavior.
- [ ] Publish `FirstCaptureBoundFrameAck`.

## Required result

```txt
CaptureArtifactResult {
  captureId
  captureGeneration
  sourceKind
  browserSessionId
  rendererGeneration
  frameId
  planId
  topologyKey
  viewportRevision
  width
  height
  devicePixelRatio
  pixelDigest
  artifactDigest
  status
}
```

## Preserved dependencies

Adaptive quality, failure diagnostics, content integrity, release/cache coherence, accessibility, audio, shader admission, editor settlement, startup readiness, reset/replay, DSK admission, viewport ownership, WebGL recovery, frame scheduling, progression, grass visibility and persistence remain separate bounded work.
