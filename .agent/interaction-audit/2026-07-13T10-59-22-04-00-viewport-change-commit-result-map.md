# Interaction Audit: Viewport Change to Commit Result

**Timestamp:** `2026-07-13T10-59-22-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-surface-viewport-authority-audited`

## Summary

Viewport transitions currently have no command or result. Browser layout and DPR values are sampled opportunistically during render, then applied through direct mutation. This audit defines the evidence, admission, participant and observation map required for a typed transition.

## Plan ledger

**Goal:** map one viewport interaction from browser evidence to a terminal, visible result.

- [x] Identify evidence producers.
- [x] Identify mutation participants.
- [x] Identify readback and capture consumers.
- [x] Define accepted and rejected outcomes.
- [x] Define zero-mutation rejection rules.
- [ ] Implement and test later.

## Current map

```txt
browser layout/DPR changes
  -> no event owner required
  -> renderer.render samples current values
  -> resize directly mutates canvas backing store
  -> render directly applies WebGL viewport and projection
  -> renderer snapshot changes only after successful draw
  -> browser readback and capture independently sample state
```

## Required command map

```txt
ResizeObserver / viewport lifecycle / explicit convergence request
  -> ViewportMeasurementEvidence
  -> ViewportChangeCommand
  -> viewport admission
  -> participant preparation
  -> ViewportCommitResult
  -> FrameViewportEnvelope
  -> viewport readback and capture receipts
  -> FirstViewportFrameAck
```

## Evidence producers

```txt
host CSS box observer
window visual/layout viewport adapter
DPR sampler
surface visibility/lifecycle adapter
WebGL capability and limit adapter
host lifecycle generation
renderer predecessor snapshot
```

## Admission checks

```txt
surface identity matches
surface generation is active
measurement sequence is monotonic
CSS width and height are finite
zero-size policy is explicit
DPR sample is finite and policy-admitted
pixel count is within budget
backing dimensions are within GPU limits
candidate is not duplicate
candidate is not stale or superseded
predecessor viewport revision matches
```

## Participants

```txt
canvas backing store
WebGL viewport
camera projection aspect
renderer viewport state
future render targets and post-process surfaces
debug diagnostics
GameHost viewport readback
editor viewport readback
canvas capture provenance
```

## Terminal results

```txt
committed
unchanged
deferred-zero-size
rejected-invalid
rejected-budget
rejected-gpu-limit
stale
superseded
failed-preparation
failed-commit
rolled-back
```

Every non-committed result must specify whether mutation was zero, fully rolled back, or the surface was lost and requires reconstruction.

## Readback map

```txt
ViewportReadback {
  surfaceId
  surfaceGeneration
  viewportRevision
  status
  cssBox
  sampledDpr
  effectiveDpr
  backingSize
  pixelCount
  pixelBudget
  cameraAspect
  webglViewport
  lastFrameId
  visibleAckId
}
```

## Capture map

```txt
CaptureResult {
  captureId
  viewportRevision
  frameId
  visibleAckId
  backingSize
  rendererRevision
  pixelEncoding
  status
  reason
}
```

A capture that occurs before the first matching frame must return `not-ready`, wait under a bounded policy, or explicitly identify predecessor pixels. It must not silently attach unrelated renderer metadata.

## Lifecycle integration

```txt
host pause
  viewport evidence may queue or be classified pending

host resume
  newest admitted measurement converges before first resumed frame ack

host retirement
  retire the surface generation and reject later commands

context loss
  coordinate with retained WebGL recovery authority

editor mutation
  coordinate with retained editor admission authority before correlated capture
```

## Validation boundary

No event dispatch, browser layout transition, participant preparation, rollback, readback, capture or visible acknowledgement was executed.