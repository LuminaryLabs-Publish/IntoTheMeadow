# Next Steps

**Updated:** `2026-07-13T10-59-22-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-surface-viewport-authority-central-reconciled`

## Summary

Implement viewport authority as a bounded coordinating domain. Keep browser measurement, WebGL application and canvas capture as adapters, but require them to consume one committed surface revision.

## Plan ledger

**Goal:** introduce the smallest complete path from host measurement to a budgeted viewport commit and first matching visible frame.

### Surface identity and measurement

- [ ] Add `RenderSurfaceId` and `RenderSurfaceGeneration`.
- [ ] Add monotonic `ViewportMeasurementSequence` and `ViewportRevision`.
- [ ] Measure the actual canvas host CSS box.
- [ ] Add `ResizeObserver` and explicit initial convergence.
- [ ] Add a DPR-change adapter with sampled and effective DPR.
- [ ] Preserve zero measurements rather than using truthy window fallbacks.
- [ ] Bind measurements to host lifecycle generation.

### Policy and admission

- [ ] Add `ViewportChangeCommand` and `ViewportCommitResult`.
- [ ] Validate finite positive measurements and explicit zero-size states.
- [ ] Add quality-profile DPR caps.
- [ ] Read WebGL maximum texture/renderbuffer dimensions.
- [ ] Add a configurable total render-pixel budget.
- [ ] Lower effective DPR or reject before backing-store mutation.
- [ ] Reject stale, duplicate, invalid, retired and superseded candidates with zero mutation.

### Participant preparation

- [ ] Prepare canvas backing dimensions without publication.
- [ ] Prepare WebGL viewport dimensions.
- [ ] Prepare camera projection aspect.
- [ ] Prepare future render targets and post-process surfaces from the same revision.
- [ ] Verify identical dimensions and aspect across every required participant.

### Commit and recovery

- [ ] Commit backing store, WebGL viewport, camera and renderer metadata atomically.
- [ ] Publish participant receipts.
- [ ] Preserve the last complete frame until successor submission succeeds.
- [ ] Restore the predecessor on commit failure where possible.
- [ ] Classify unrecoverable surface loss and hand off to WebGL recovery.
- [ ] Publish zero-mutation, rolled-back or surface-lost status explicitly.

### Readback and capture

- [ ] Add viewport data to renderer snapshots.
- [ ] Add `GameHost.getViewportState()`.
- [ ] Make `browser.getViewport` return committed state rather than independent samples.
- [ ] Bind canvas capture to `viewportRevision`, `frameId` and renderer revision.
- [ ] Return `not-ready`, wait under a bounded policy, or identify predecessor pixels before first ack.
- [ ] Publish `FirstViewportFrameAck`.

### Lifecycle integration

- [ ] Coordinate with web-host pause, resume, fatal and retirement generations.
- [ ] Converge the newest admitted measurement before first resumed frame acknowledgement.
- [ ] Coordinate capture with browser editor capability admission.
- [ ] Coordinate surface loss with WebGL context/resource recovery.
- [ ] Prevent duplicate observer and RAF ownership.

### Proof

- [ ] Initial positive measurement.
- [ ] Zero-size initial and zero-size restore.
- [ ] DPR increase, decrease and fractional DPR.
- [ ] Browser zoom and visual viewport transitions.
- [ ] Rapid duplicate and stale resize sequences.
- [ ] Large surface pixel-budget downscale/rejection.
- [ ] GPU dimension-limit rejection.
- [ ] Injected failure after backing-store mutation.
- [ ] Rollback or surface-loss classification.
- [ ] Camera/WebGL/renderer/readback parity.
- [ ] Capture before and after first frame acknowledgement.
- [ ] Paused, resumed, failed and retired host transitions.
- [ ] `npm run check`, source browser smoke, production build, built-output smoke and Pages smoke.

## Required result

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

## Dependency order

```txt
web-host lifecycle generation
  -> render-surface identity
  -> host measurement and DPR evidence
  -> pixel/GPU policy
  -> participant preparation
  -> atomic commit and rollback
  -> frame viewport envelope
  -> revisioned readback and capture
  -> first visible frame acknowledgement
```

## Preserved dependencies

Browser editor admission, host retirement, workspace containment, provider parity, WebGL recovery, DSK runtime consumption, playable progression, grass visibility, audio lifecycle, save/migration and replay remain separate bounded work.