# Render Audit: Screenshot, DOM and Frame Coherence Gap

**Timestamp:** `2026-07-13T22-40-52-04-00`

## Summary

The screenshot and DOM dump are produced by separate Chromium processes. The report joins them without proving they observed the same game state, render plan, WebGL resource generation or visible frame.

## Plan ledger

**Goal:** require every visual observation artifact to cite one admitted page and renderer frame.

- [x] Trace both Chromium invocations.
- [x] Trace renderer completion markers.
- [x] Trace screenshot validation.
- [x] Trace editor canvas capture capability.
- [x] Record missing frame and artifact identities.
- [ ] Execute same-page capture fixtures later.

## Current path

```txt
Chromium A
  -> independently boot game
  -> screenshot arrival-wide.png

Chromium B
  -> independently boot game
  -> dump arrival-wide.dom.html
  -> expose gpu: marker

report.json
  -> treats A and B as one completed observation
```

## Missing evidence

```txt
ObservationAttemptId
BrowserSessionGeneration
BrowserPageGeneration
GameStateRevision
RenderPlanRevision
ContractRevision
MeshRevision
GpuBufferGeneration
RendererFrameId
CanvasCaptureHash
ScreenshotHash
DomHash
same-frame artifact relation
first observed frame acknowledgement
```

## Required visible proof

```txt
one page reaches an admitted renderer frame
  -> editor snapshot cites that frame
  -> canvas capture cites that frame
  -> DOM snapshot cites that frame
  -> screenshot cites that page generation
  -> artifact manifest joins hashes and dimensions
  -> BrowserObservationResult marks the frame complete
```

## Image checks

A 10000-byte threshold is insufficient. Evidence should include dimensions, format, hash, alpha/entropy checks, blank-frame detection and one or more expected pixel-region or perceptual signatures.

## Boundary

No renderer, screenshot logic or browser automation changed.