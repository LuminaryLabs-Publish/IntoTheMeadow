# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T22-08-13-04-00`

## Goal

Make browser viewport and DPR changes pass through one bounded, revisioned render-surface transaction before camera projection, renderer state, capture or visible-frame evidence claims the new resolution.

## Plan ledger

- [ ] Preserve the existing meadow descriptors, topology, shaders and full-window composition.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete Host Capability Gateway and remove raw capability bypasses.
- [ ] Complete Runtime Clock and Step Admission Authority.
- [ ] Complete Render Topology Identity and WebGL Context Recovery authorities.
- [ ] Introduce `RenderSurfaceState` with surface ID, context generation, surface revision and actual dimensions.
- [ ] Convert viewport/DPR observations into typed `ResizeCommand` values.
- [ ] Add finite positive dimension validation and rapid-resize coalescing.
- [ ] Define a versioned DPR policy and total pixel budget.
- [ ] Query WebGL maximum dimensions per context generation.
- [ ] Derive bounded candidate dimensions and declared fallback tiers.
- [ ] Read back `gl.drawingBufferWidth` and `gl.drawingBufferHeight` after allocation.
- [ ] Classify browser clamping, capability overflow and allocation failure.
- [ ] Commit one surface revision only after actual-size validation.
- [ ] Derive projection aspect from committed actual dimensions.
- [ ] Add fallback, rollback or explicit quarantine policy for failed candidates.
- [ ] Add surface revision and dimensions to renderer snapshots and diagnostics.
- [ ] Require browser viewport and canvas capture observations to cite surface and frame identity.
- [ ] Add visible-frame acknowledgement for the first frame on each committed surface.
- [ ] Add DOM-free, browser and Pages resize/DPR fixtures.
- [ ] Wire fixtures into `npm run check` or an explicit browser gate.

## Existing owners to update first

```txt
web-host-dsk
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
meadow-performance-dsk
meadow-diagnostics-dsk
browser editor bridge
WebGL Context Recovery Authority
Committed Frame Observation Authority
Fatal Runtime Failure Recovery Authority
```

## Candidate coordinating kits

```txt
render-surface-id-kit
render-surface-revision-kit
viewport-observation-kit
device-pixel-ratio-policy-kit
render-pixel-budget-kit
webgl-surface-capability-kit
resize-command-kit
resize-coalescing-kit
render-surface-plan-kit
drawing-buffer-allocation-kit
render-surface-fallback-kit
render-surface-commit-kit
render-surface-rollback-kit
stale-surface-observation-rejection-kit
render-surface-observation-kit
capture-surface-correlation-kit
visible-frame-surface-ack-kit
render-surface-journal-kit
render-surface-fixture-kit
browser-resize-dpr-smoke-kit
```

## Required state

```txt
RenderSurfaceState
  surfaceId
  runtimeSessionId
  contextGeneration
  surfaceRevision
  policyId
  policyRevision
  cssWidth
  cssHeight
  requestedDpr
  appliedDpr
  requestedBufferWidth
  requestedBufferHeight
  actualBufferWidth
  actualBufferHeight
  aspect
  qualityTier
  fallbackReason
  lastResizeCommandId
  committedFrameId
```

## Required command

```txt
ResizeCommand
  commandId
  runtimeSessionId
  contextGeneration
  expectedSurfaceRevision
  viewportObservationId
  cssWidth
  cssHeight
  devicePixelRatio
  visibilityState
  qualityPreference
```

## Required result

```txt
ResizeResult
  commandId
  status
  reason
  predecessorSurfaceRevision
  committedSurfaceRevision
  requestedDimensions
  boundedDimensions
  actualDimensions
  appliedDpr
  qualityTier
  fallbackReason
  committedFrameId
```

## Acceptance cases

```txt
320x240 at DPR 1
1440x900 at DPR 1
1920x1080 at DPR 1.25
2560x1440 at DPR 2
3840x2160 at requested DPR 2 and 3
DPR below 1 policy case
rapid resize sequence
portrait/landscape orientation transition
hidden and zero-sized canvas
maximum WebGL dimension overflow
pixel-budget overflow
browser drawing-buffer clamp
allocation failure and fallback
stale session, context generation and surface revision
context loss during resize
capture before and after first frame on new surface
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
8. Interaction Command and Objective Authority
9. DSK Runtime Consumption Authority
```

Do not fix this only by lowering the DPR cap. The required boundary is a typed transaction that admits viewport observations against policy and capability limits, reads back actual drawing-buffer dimensions and correlates the committed surface with projection, capture and a visible frame.
