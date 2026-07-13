# Viewport Audit: Host Measurement, DPR and Pixel-Budget Contract

**Timestamp:** `2026-07-13T10-59-22-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-surface-viewport-authority-audited`

## Summary

The current viewport policy is an implementation detail in `resize()`: use client size when truthy, otherwise use global window size, clamp DPR to `1..2`, immediately assign the canvas backing dimensions, and continue rendering. This is not sufficient for embedded, hidden, stopped, high-resolution, failure, readback or capture cases.

## Plan ledger

**Goal:** define the canonical measurement and budget contract consumed by browser and renderer adapters.

- [x] Record current measurement and fallback semantics.
- [x] Record required identities and revisions.
- [x] Define DPR and pixel-budget policy.
- [x] Define zero-size handling.
- [x] Define participant consistency and proof.
- [ ] Implement in runtime code later.

## Current policy

```txt
sampledDpr = clamp(devicePixelRatio, 1, 2)
cssWidth = canvas.clientWidth || innerWidth || 1
cssHeight = canvas.clientHeight || innerHeight || 1
backingWidth = floor(cssWidth * sampledDpr)
backingHeight = floor(cssHeight * sampledDpr)
canvas.width = backingWidth
canvas.height = backingHeight
```

## Required measurement evidence

```txt
ViewportMeasurementEvidence {
  evidenceId
  surfaceId
  surfaceGeneration
  measurementSequence
  observedAt
  source
  cssWidth
  cssHeight
  visualViewportWidth?
  visualViewportHeight?
  sampledDpr
  visibility
  connected
  hostLifecyclePhase
}
```

`source` must distinguish:

```txt
resize-observer
visual-viewport
window-resize
dpr-media-query
explicit-convergence
initial-measurement
headless-fixture
```

## Measurement rules

```txt
use actual host CSS box as authority
preserve a legitimate zero instead of applying truthy fallback
do not silently replace zero with window dimensions
reject non-finite and negative measurements
coalesce duplicate measurements
reject stale sequences and retired generations
record whether the surface is connected and visible
```

## DPR policy

```txt
sample browser DPR
apply quality-profile cap
apply accessibility/browser-zoom policy
apply GPU dimension limits
apply total-pixel budget
derive effective DPR from all constraints
record sampled and effective DPR separately
```

Suggested policy result:

```txt
DprPolicyResult {
  sampledDpr
  requestedDpr
  effectiveDpr
  capReason
  qualityProfile
  pixelBudget
  maxTextureSize
  maxRenderbufferSize
}
```

## Pixel-budget policy

Budget must be explicit and configurable rather than implied by a DPR cap.

```txt
requestedPixels = floor(cssWidth * effectiveDpr) * floor(cssHeight * effectiveDpr)
accepted when:
  backingWidth <= maxTextureSize
  backingHeight <= maxTextureSize
  backingWidth <= maxRenderbufferSize
  backingHeight <= maxRenderbufferSize
  requestedPixels <= profilePixelBudget
```

Possible policy actions:

```txt
accept
lower-effective-dpr
defer-zero-size
reject-invalid
reject-gpu-limit
reject-budget
```

## Zero-size policy

```txt
zero CSS width or height
  -> publish deferred-zero-size
  -> preserve predecessor complete frame where possible
  -> do not allocate a full-window replacement
  -> do not change camera aspect
  -> retain latest valid measurement candidate
  -> converge when a positive successor arrives
```

## Atomic participant contract

All prepared participants must agree on:

```txt
surface ID and generation
viewport revision
backing width and height
camera aspect
WebGL viewport rectangle
render-target sizes when active
pixel budget decision
```

No participant may publish the successor until all required preparations pass.

## Rollback contract

```txt
failure before mutation
  -> zero-mutation failed-preparation result

failure during commit
  -> restore predecessor backing/projection/viewport where possible
  -> publish rolled-back with receipts

unrecoverable surface loss
  -> publish surface-lost
  -> hand off to retained WebGL context/resource recovery authority
```

## Readback contract

Public readback must expose the last committed result, not independently sample unrelated values.

```txt
GameHost.getViewportState()
NexusEditorEnvironment.invoke("browser.getViewport")
renderer.getSnapshot()
renderer.capture()
```

All should reference the same `viewportRevision` and matching frame where applicable.

## Required fixtures

```txt
positive initial measurement
zero initial measurement
zero after valid measurement
restore after zero
DPR 1 to 2 and 2 to 1
fractional DPR
rapid duplicate resize
stale measurement
huge CSS box
GPU dimension limit
pixel-budget downscale
failure after backing mutation
capture before and after first frame ack
pause, resume and retirement
```

## Validation boundary

This contract was derived from source. No browser APIs, GPU limits, allocation budgets, rollback paths or fixtures were executed.