# Render Surface Resolution, Budget and Revision Contract

**Timestamp:** `2026-07-11T22-08-13-04-00`

## Contract objective

A browser viewport observation must not become renderer truth until it passes policy, WebGL capability and lifecycle admission, produces actual drawing-buffer dimensions and is acknowledged by a visible frame.

## Canonical policy

```txt
RenderResolutionPolicy
  policyId
  policyRevision
  minimumDpr
  maximumDpr
  maximumWidth
  maximumHeight
  maximumPixels
  hiddenSurfaceBehavior
  fallbackTiers
  roundingPolicy
```

Suggested fallback sequence:

```txt
requested DPR
  -> capped DPR
  -> pixel-budget DPR
  -> capability-limited DPR
  -> minimum quality DPR
  -> suspended or explicit failure
```

The product must choose values deliberately. The current hard-coded 1 to 2 clamp is not a complete policy because it ignores dimensions, total pixels, capability limits and actual allocation results.

## Canonical surface state

```txt
CommittedRenderSurface
  surfaceId
  runtimeSessionId
  contextGeneration
  surfaceRevision
  policyId
  policyRevision
  viewportObservationId
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
  committedFrameId
```

## Lifecycle rules

```txt
one runtime session owns one active surface identity
context restoration advances context generation
only the active context generation may commit a surface
surface revision advances exactly once per accepted resize
stale and superseded commands cannot mutate the canvas
projection uses actual committed dimensions
capture requires a visible frame on the committed revision
terminal runtime failure retires the surface
cold restart creates a new surface identity
```

## Allocation rules

```txt
query capability limits once per context generation
validate finite positive CSS dimensions and DPR
apply maximum dimensions and total pixel budget
coalesce rapid observations before allocation
apply candidate dimensions
read gl.drawingBufferWidth and gl.drawingBufferHeight
classify clamping or mismatch
attempt declared fallback tiers when recoverable
publish typed failure when no tier succeeds
never report the requested dimensions as actual without readback
```

## Observation rules

Renderer snapshot must include:

```txt
surfaceId
surfaceRevision
contextGeneration
cssWidth / cssHeight
requestedDpr / appliedDpr
actualBufferWidth / actualBufferHeight
aspect
qualityTier
fallbackReason
committedFrameId
```

Viewport and capture capabilities must cite:

```txt
viewportObservationId
surfaceRevision
frameId
freshness status
```

## Rollback and last-known-good behavior

Changing the drawing buffer is destructive, so rollback cannot be described as a simple no-op. The implementation must explicitly choose one of these policies:

```txt
retry a bounded fallback before publishing the new revision
restore predecessor dimensions and render a replacement frame
retain a last-known-good bitmap while rebuilding the context
quarantine rendering and require cold restart
```

The selected path must return a typed result and must not claim the failed candidate as committed.

## Required fixtures

```txt
policy unit fixture
capability limit fixture
pixel-budget fallback fixture
rapid resize coalescing fixture
hidden and zero-size fixture
actual drawing-buffer mismatch fixture
stale context and revision fixture
allocation failure fixture
context loss during resize fixture
capture freshness fixture
visible-frame surface correlation fixture
Pages resize and DPR smoke
```

## Completion boundary

The contract is complete only when the same surface revision is visible in policy admission, actual drawing-buffer readback, camera projection, renderer snapshot, capture and first-visible-frame evidence.
