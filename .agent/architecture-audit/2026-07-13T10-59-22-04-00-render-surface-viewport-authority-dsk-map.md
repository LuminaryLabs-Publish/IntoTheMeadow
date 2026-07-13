# Architecture Audit: Render-Surface Viewport Authority DSK Map

**Timestamp:** `2026-07-13T10-59-22-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-surface-viewport-authority-audited`

## Summary

Viewport ownership currently sits inside the WebGL renderer as an untyped helper. Layout measurement, DPR policy, backing-store mutation, camera aspect, WebGL viewport, renderer readback, and canvas capture need a renderer-neutral coordinating domain rather than additional ad hoc renderer conditionals.

## Plan ledger

**Goal:** separate semantic viewport authority from browser measurement and WebGL application while preserving the existing renderer and page as adapters.

- [x] Identify current participant ownership.
- [x] Separate domain meaning from browser and WebGL mechanics.
- [x] Define one parent authority and bounded coordinating kits.
- [x] Preserve existing meadow and render kits as consumers.
- [x] Define transaction order and terminal results.
- [ ] Implement after the preceding host/editor lifecycle authorities are scheduled.

## Current ownership

```txt
index.html
  owns full-screen CSS surface

web-host-dsk
  owns RAF and render invocation

meadow-webgl-renderer-v2-kit
  samples CSS size and DPR
  mutates canvas backing store
  sets WebGL viewport
  derives camera aspect
  draws and publishes renderer snapshot

browser editor bridge
  samples global viewport and backing dimensions
  captures canvas pixels

no domain
  owns viewport identity, policy, commit, rollback or proof
```

## Correct bounded separation

```txt
meadow-render-surface-viewport-authority-domain
  decides which viewport revision is valid and committed

browser measurement adapters
  observe CSS host size, DPR, visibility and lifecycle

render pixel policy kits
  decide effective DPR and accepted backing dimensions

renderer adapters
  prepare/apply canvas backing store, WebGL viewport and camera projection

presentation proof kits
  correlate committed viewport, rendered frame, readback and capture
```

## Parent authority

```txt
meadow-render-surface-viewport-authority-domain
```

Owns:

```txt
render-surface identity and generation
viewport command admission
host measurement evidence
DPR and pixel-budget policy
candidate classification
participant preparation
atomic adoption or rollback
terminal ViewportCommitResult
frame/readback/capture provenance
first matching visible-frame acknowledgement
```

Does not own:

```txt
CSS implementation
ResizeObserver implementation
browser DPR APIs
WebGL context creation
shader programs or mesh data
camera artistic configuration
canvas encoding implementation
RAF scheduling policy
```

## Candidate kit map

### Identity and evidence

```txt
render-surface-id-kit
render-surface-generation-kit
host-css-box-measurement-kit
viewport-measurement-command-kit
viewport-measurement-result-kit
device-pixel-ratio-sample-kit
viewport-revision-kit
```

### Policy and admission

```txt
device-pixel-ratio-policy-kit
gpu-limit-admission-kit
render-pixel-budget-kit
zero-size-surface-deferral-kit
stale-viewport-rejection-kit
duplicate-viewport-suppression-kit
```

### Participant preparation

```txt
viewport-candidate-kit
canvas-backing-store-candidate-kit
camera-projection-candidate-kit
webgl-viewport-candidate-kit
```

### Browser adapters

```txt
resize-observer-adapter-kit
dpr-change-adapter-kit
```

### Commit and recovery

```txt
viewport-atomic-commit-kit
viewport-rollback-kit
```

### Projection and proof

```txt
render-frame-viewport-envelope-kit
viewport-readback-kit
capture-viewport-correlation-kit
first-viewport-frame-ack-kit
viewport-fixture-gate-kit
```

## Required transaction

```txt
ViewportChangeCommand
  -> identify surface and generation
  -> attach measurement sequence and predecessor revision
  -> collect CSS box, DPR, visibility and GPU-limit evidence
  -> apply DPR and pixel-budget policy
  -> classify invalid, zero, duplicate, stale or superseded candidates
  -> prepare backing-store candidate
  -> prepare camera-projection candidate
  -> prepare WebGL-viewport candidate
  -> verify shared dimensions and aspect
  -> atomically adopt all candidates
  -> publish ViewportCommitResult
  -> render FrameViewportEnvelope
  -> publish revisioned viewport readback
  -> correlate capture with the same frame
  -> publish FirstViewportFrameAck
```

## Result model

```txt
ViewportCommitResult {
  commandId
  surfaceId
  surfaceGeneration
  predecessorViewportRevision
  viewportRevision
  status
  reason
  measurementSequence
  cssWidth
  cssHeight
  sampledDpr
  effectiveDpr
  backingWidth
  backingHeight
  pixelCount
  pixelBudget
  gpuLimits
  cameraAspect
  canvasReceipt
  webglReceipt
  cameraReceipt
  rollbackReceipt?
  frameRequired
  firstFrameAckId?
}
```

Terminal statuses:

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

## Integration with existing kits

```txt
web-host-dsk
  emits viewport evidence or requests convergence

meadow-render-host-dsk
  consumes committed viewport revision

meadow-webgl-renderer-v2-kit
  becomes a preparation/application adapter

meadow-camera-dsk
  consumes committed projection dimensions when implemented

meadow-performance-dsk
  supplies DPR and pixel-budget policy when implemented

meadow-diagnostics-dsk
  exposes terminal results and revisioned readback

render-target-kit and post-process-stack-dsk
  consume the same committed dimensions when activated
```

## Dependency order

```txt
host lifecycle generation
  -> surface identity
  -> measurement evidence
  -> DPR/pixel policy
  -> participant preparation
  -> atomic commit and rollback
  -> render envelope
  -> readback/capture correlation
  -> visible-frame proof
```

## Non-goals

```txt
no new top-level generic graph domain
no WebGL implementation inside the authority domain
no camera-art direction inside viewport policy
no silent fallback to global window dimensions for zero-size hosts
no readiness claim without executable browser/build/Pages fixtures
```

## Completion boundary

The architecture is complete only when all viewport participants adopt one revision or preserve the predecessor, and public readback plus capture can prove which committed visible frame they describe.