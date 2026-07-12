# Render Surface Resolution DSK Map

**Timestamp:** `2026-07-11T22-08-13-04-00`

## Goal

Define one DSK/domain boundary that owns viewport admission, DPR policy, pixel budgets, WebGL capability checks, drawing-buffer allocation, fallback, surface revisions and frame/capture correlation.

## Current ownership split

```txt
index.html
  owns full-viewport CSS canvas

web-host-dsk / web-host.js
  owns RAF and renderer invocation

meadow-webgl-renderer-v2-kit
  samples CSS size and DPR
  mutates canvas drawing-buffer dimensions
  configures GL viewport and projection
  draws and publishes a renderer snapshot

browser editor bridge
  reads viewport and canvas dimensions
  captures canvas data URL
  attaches renderer snapshot

meadow-performance-dsk
  declares quality and budget services
  does not currently govern drawing-buffer resolution

meadow-diagnostics-dsk
  reports renderer state
  does not expose surface identity or committed dimensions
```

## Current data flow

```txt
live browser values
  canvas.clientWidth
  canvas.clientHeight
  globalThis.innerWidth
  globalThis.innerHeight
  globalThis.devicePixelRatio
    -> resize()
    -> requested canvas.width / canvas.height
    -> gl.viewport
    -> projection aspect
    -> draw
    -> snapshot without width, height, DPR or revision
```

## Required parent domain

```txt
meadow-render-surface-resolution-authority-domain
```

## Candidate kit composition

```txt
render-surface-id-kit
  stable identity for one canvas/context surface

render-surface-revision-kit
  monotonic committed surface revision

viewport-observation-kit
  immutable CSS width, CSS height, DPR, visibility and observation time

device-pixel-ratio-policy-kit
  explicit minimum, maximum, rounding and quality-tier policy

render-pixel-budget-kit
  maximum width, height and total pixel budget

webgl-surface-capability-kit
  MAX_VIEWPORT_DIMS, MAX_RENDERBUFFER_SIZE and drawing-buffer readback

resize-command-kit
  command ID, session ID, context generation, expected surface revision and observation

resize-coalescing-kit
  deterministic supersession of rapid resize/orientation observations

render-surface-plan-kit
  requested and bounded CSS size, DPR, buffer size, aspect and fallback sequence

drawing-buffer-allocation-kit
  apply dimensions and read back actual GL drawing-buffer size

render-surface-fallback-kit
  quality tiers and explicit degradation reasons

render-surface-commit-kit
  atomic publication of accepted dimensions and next revision

render-surface-rollback-kit
  last-known-good policy when required allocation or projection fails

stale-surface-observation-rejection-kit
  reject obsolete resize results and predecessor context generations

render-surface-observation-kit
  clone-safe committed surface snapshot

capture-surface-correlation-kit
  require capture dimensions and renderer state to cite one surface revision

visible-frame-surface-ack-kit
  first frame receipt for a committed surface revision

render-surface-journal-kit
  bounded command, fallback, commit and rejection rows

render-surface-fixture-kit
  DOM-free policy and capability fixtures

browser-resize-dpr-smoke-kit
  deployed browser resize, DPR and capture parity proof
```

## Required state

```txt
RenderSurfaceState
  surfaceId
  runtimeSessionId
  contextGeneration
  surfaceRevision
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

## Required transaction

```txt
viewport observation
  -> command admission
  -> finite positive dimension validation
  -> context generation and predecessor revision validation
  -> WebGL capability and policy budget lookup
  -> bounded surface plan
  -> coalescing / stale rejection
  -> drawing-buffer allocation and actual-size readback
  -> fallback tier when recoverable
  -> projection derivation from actual committed dimensions
  -> surface commit
  -> draw
  -> visible-frame acknowledgement
  -> capture and diagnostics cite the same revision
```

## Existing owners to update first

```txt
web-host-dsk
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
meadow-performance-dsk
meadow-diagnostics-dsk
browser editor bridge
Committed Frame Observation Authority
WebGL Context Recovery Authority
Fatal Runtime Failure Recovery Authority
```

## Placement in the architecture queue

```txt
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
7. Committed Frame Observation Authority
```

The surface authority must consume context generation and must publish a committed revision before committed-frame and capture systems can claim resolution parity.
