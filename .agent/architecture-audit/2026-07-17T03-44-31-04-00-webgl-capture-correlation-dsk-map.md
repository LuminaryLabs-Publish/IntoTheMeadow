# Architecture Audit: WebGL Capture Correlation DSK Map

**Timestamp:** `2026-07-17T03-44-31-04-00`

## Current ownership

```txt
web-host-dsk
  -> owns RAF and live render invocation

meadow-webgl-renderer-v2-kit
  -> owns default-framebuffer drawing and renderer snapshot

browser editor bridge
  -> owns renderer.capture -> canvas.toDataURL

Node headless environment
  -> owns descriptor/mesh rebuild and synthetic SVG capture

Chromium observation script
  -> owns command-line screenshot and separate DOM dump
```

No current domain owns one capture transaction across these surfaces.

## Required parent

`meadow-webgl-capture-readback-frame-correlation-authority-domain`

## DSK boundary

```txt
CaptureAdmissionResult
  -> CaptureFrameCommitResult
  -> CaptureReadbackResult
  -> CaptureArtifactResult
  -> FirstCaptureBoundFrameAck
```

The authority must bind `CaptureId`, browser session, runtime generation, renderer generation, plan/topology key, frame, viewport, DPR, drawable target, pixel digest, encoder metadata and artifact origin. Synthetic observations must remain explicitly classified and must not satisfy live WebGL proof.

## Service split

- Admission: request identity, format policy, lifecycle and stale-surface rejection.
- Rendering: exact frame selection or forced capture frame.
- Readback: safe target lifetime, GPU completion and pixel extraction.
- Encoding: dimensions, color-space, format and digest.
- Provenance: browser/session/frame/snapshot/artifact correlation.
- Validation: live-browser, built-artifact and Pages fixtures.

## Boundary

Proposed architecture only. No DSK, kit, runtime or renderer implementation changed.
