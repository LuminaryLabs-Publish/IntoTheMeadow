# Known Gaps

**Updated:** `2026-07-17T03-44-31-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `webgl-capture-readback-frame-correlation-authority-audited`

## Summary

The bounded gap is capture evidence ownership. Live canvas pixels, renderer metadata, synthetic observations and browser screenshots are produced without one accepted capture/frame/session identity.

## Intent

Record every missing admission, frame, readback, provenance and proof boundary required for trustworthy visual iteration.

## Checklist

- [x] Record live WebGL capture behavior.
- [x] Record Node synthetic observation behavior.
- [x] Record Chromium screenshot/DOM session split.
- [x] Record missing frame, pixel and artifact correlation.
- [x] Preserve prior unresolved audit families.
- [ ] Implement and prove later.

## Admission gaps

```txt
CaptureId and CaptureGeneration: absent
browser session identity: absent
runtime/renderer generation binding: absent
plan and viewport revision binding: absent
format/color-space policy result: absent
CaptureAdmissionResult: absent
```

## Frame and readback gaps

```txt
monotonic renderer FrameId: absent
capture-specific frame commit: absent
capture-safe render target: absent
drawable lifetime settlement: absent
GPU/readback completion result: absent
pixel dimensions and digest: absent
CaptureFrameCommitResult: absent
CaptureReadbackResult: absent
```

## Provenance gaps

```txt
pixel-to-renderer-snapshot correlation: absent
live versus synthetic classification result: absent
single-session screenshot/DOM evidence: absent
immutable artifact digest: absent
origin and module revision receipt: absent
CaptureArtifactResult: absent
FirstCaptureBoundFrameAck: absent
```

## Current divergence

```txt
live bridge: arbitrary canvas.toDataURL + latest snapshot
WebGL target: default framebuffer, non-preserved by default
Node environment: independently rebuilt synthetic SVG
Chromium screenshot: browser process A
Chromium DOM validation: browser process B
smoke test: Node artifact count only
```

## Proof gaps

```txt
real browser bridge capture fixture: absent
nonblank pixel fixture: absent
stale-frame fixture: absent
resize/DPR capture fixture: absent
hidden-document fixture: absent
context-loss readback fixture: absent
pixel/snapshot mismatch fixture: absent
mixed-session rejection fixture: absent
source/artifact/Pages parity: absent
```

## Preserved unresolved gaps

```txt
adaptive quality feedback and projection
browser failure classification and bounded diagnostics
authored content graph integrity
static module release/cache coherence
runtime renderer identity
accessible semantic projection
audio event projection
shader capability admission
editor command settlement
post-process execution
browser startup readiness
runtime reset and replay
DSK dependency admission
browser observation provenance
render-plan and mesh-cache coherence
viewport authority
editor capability lifecycle
web-host retirement
workspace containment
external provider parity
WebGL context recovery
single-chain frame scheduling
playable progression
grass visibility and LOD
atomic save and migration
```

## Completion boundary

Capture is not proven until one accepted capture generation owns one exact frame, capture-safe pixels, matching renderer metadata, immutable artifact provenance and source/artifact/Pages receipts, ending in `FirstCaptureBoundFrameAck`.
