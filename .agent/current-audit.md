# Current Audit: WebGL Capture Readback and Frame Correlation

**Updated:** `2026-07-17T03-44-31-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `webgl-capture-readback-frame-correlation-authority-audited`  
**Immediate predecessor:** `adaptive-quality-feedback-projection-authority-central-reconciled`

## Summary

The live browser capture reads `canvas.toDataURL` without an accepted frame or readback generation. The attached renderer snapshot is not correlated to the pixels, Node capture is synthetic, and Chromium screenshot/DOM proof is assembled from separate browser sessions.

## Intent

Converge capture admission, exact-frame rendering, drawable-buffer lifetime, pixel readback, encoding, provenance and artifact commitment through one authority.

## Checklist

- [x] Compare Publish inventory and central tracking.
- [x] Select only IntoTheMeadow by oldest synchronized timestamp.
- [x] Inspect live, Node and Chromium capture paths.
- [x] Preserve all 44 kit surfaces and services.
- [x] Add the timestamped capture-correlation audit family.
- [x] Change documentation only on `main`.
- [ ] Implement and prove the authority later.

## Main finding

```txt
live WebGL canvas capture: present
explicit capture identity: absent
matching render-frame identity: absent
capture-safe drawable lifetime: absent
GPU/readback settlement: absent
viewport/DPR binding: absent
pixel and artifact digests: absent
renderer snapshot correlation: absent
synthetic/live evidence classification: absent
single-session screenshot/DOM proof: absent
FirstCaptureBoundFrameAck: absent
```

## Source basis

- `src/renderers/meadow-webgl-renderer-v2.js` renders to the default framebuffer without a capture-safe target or frame receipt.
- `src/editor/install-editor-bridge.js` calls `canvas.toDataURL` and attaches the latest renderer snapshot without correlation.
- `scripts/into-the-meadow-environment.mjs` creates descriptor-derived JSON/SVG evidence rather than live WebGL pixels.
- `scripts/run-browser-observation.mjs` launches independent screenshot and DOM browser processes.
- `tests/headless-editor-environment-smoke.mjs` validates Node artifact shape, not browser pixel correctness.

## Required parent domain

`meadow-webgl-capture-readback-frame-correlation-authority-domain`

## Required transaction

```txt
CaptureAdmissionCommand
  -> CaptureAdmissionResult

CaptureFrameCommitCommand
  -> CaptureFrameCommitResult

CaptureReadbackCommand
  -> CaptureReadbackResult

CaptureArtifactCommitCommand
  -> CaptureArtifactResult
  -> FirstCaptureBoundFrameAck
```

## Boundary

Documentation only. No runtime, renderer, capture, test, workflow or deployment behavior changed.
