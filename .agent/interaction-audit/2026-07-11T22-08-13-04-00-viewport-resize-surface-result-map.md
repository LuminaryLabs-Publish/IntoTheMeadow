# Viewport Resize Command and Surface Result Map

**Timestamp:** `2026-07-11T22-08-13-04-00`

## Current ingress

```txt
browser layout engine
  -> changes canvas.clientWidth / canvas.clientHeight

browser zoom or display scale
  -> changes devicePixelRatio

renderer RAF
  -> samples both values opportunistically during render
```

There is no explicit event envelope, command identity, sequence or admission result.

## Current observation paths

```txt
renderer snapshot
  -> topology and mesh/cache state only

browser.getViewport
  -> live innerWidth, innerHeight, devicePixelRatio, canvasWidth, canvasHeight

renderer.capture
  -> live canvas width, height and data URL
  -> independently attaches the latest renderer snapshot
```

These observations do not share a surface revision or frame identity.

## Required command map

```txt
ViewportObservation
  observationId
  runtimeSessionId
  timestamp
  cssWidth
  cssHeight
  devicePixelRatio
  visibilityState
  orientation

ResizeCommand
  commandId
  runtimeSessionId
  contextGeneration
  expectedSurfaceRevision
  observationId
  qualityPreference

ResizeResult
  commandId
  status: accepted | coalesced | degraded | rejected | failed
  reason
  predecessorSurfaceRevision
  committedSurfaceRevision
  requestedDimensions
  actualDimensions
  appliedDpr
  qualityTier
  fallbackReason
  committedFrameId
```

## Admission map

```txt
invalid or non-finite dimensions
  -> rejected / invalid-viewport

zero-sized hidden layout
  -> coalesced or suspended / hidden-surface-policy

stale context generation
  -> rejected / stale-context

stale predecessor surface revision
  -> rejected / stale-surface

newer queued observation exists
  -> coalesced / superseded

requested pixels exceed policy budget
  -> degraded / pixel-budget

requested dimensions exceed WebGL capability
  -> degraded or rejected / capability-limit

allocation or readback mismatch
  -> degraded, rollback or failed / allocation-mismatch

successful allocation and frame
  -> accepted / visible-frame-acknowledged
```

## Capture parity

`renderer.capture` must either:

```txt
return a capture citing the committed surface revision and frame ID
```

or:

```txt
return stale / unavailable when the latest surface has not produced a committed frame
```

A data URL alone is not a typed capture result.

## Required journal row

```txt
surface command ID
observation ID
session and context generation
predecessor and committed revision
requested, bounded and actual dimensions
requested and applied DPR
quality tier and fallback reason
result status and reason
first visible frame ID
capture eligibility
```
