# Render Audit: Viewport, Backing Store and Visible-Frame Gap

**Timestamp:** `2026-07-13T10-59-22-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-surface-viewport-authority-audited`

## Summary

The renderer changes the canvas backing dimensions before the rest of the frame succeeds, then publishes a renderer snapshot that omits viewport evidence. Canvas pixels, camera projection, WebGL viewport, browser readback and capture are not bound to one committed frame revision.

## Plan ledger

**Goal:** make backing-store allocation, camera projection, WebGL viewport and visible-frame publication one recoverable render transaction.

- [x] Trace CSS surface sizing.
- [x] Trace DPR sampling and backing-store mutation.
- [x] Trace camera aspect and WebGL viewport application.
- [x] Trace renderer snapshot and editor capture.
- [x] Record partial-frame and mixed-readback windows.
- [ ] Implement revisioned render-surface proof later.

## Current render order

```txt
renderer.render(plan)
  -> resize()
     -> sample DPR
     -> choose CSS width/height or global fallback
     -> mutate canvas.width/canvas.height
  -> use program
  -> build or reuse mesh
  -> gl.viewport(new width, new height)
  -> derive perspective aspect from new width/height
  -> clear and draw outline pass
  -> draw color pass
  -> replace renderer snapshot
```

## Gap 1: Backing-store mutation is an early visible side effect

Changing `canvas.width` or `canvas.height` clears the drawing buffer and changes the surface allocation. That happens before mesh construction, uniform application, both draw passes, and snapshot publication succeed. A later exception can therefore leave a cleared or resized surface while diagnostics still describe the previous successful render.

## Gap 2: Snapshot omits viewport provenance

The renderer snapshot records plan, topology, vertex, triangle, cache and validation data. It does not record:

```txt
surface ID or generation
viewport revision
CSS width and height
sampled or effective DPR
backing width and height
pixel budget or GPU limits
camera aspect
WebGL viewport receipt
render frame ID
visible-frame acknowledgement
```

## Gap 3: Readback and capture are independently sampled

```txt
browser.getViewport
  -> reads innerWidth
  -> reads innerHeight
  -> reads devicePixelRatio
  -> reads canvas.width and canvas.height

renderer.capture
  -> reads canvas.width and canvas.height
  -> calls canvas.toDataURL immediately
  -> attaches getRenderSnapshot()
```

No shared identity proves that these values came from the same viewport commit or draw submission.

## Gap 4: Zero-size is hidden by window fallback

The truthy fallback `canvas.clientWidth || innerWidth || 1` treats a zero-sized canvas as if host measurement were unavailable. The renderer can allocate a full-window backing surface while the actual host is hidden, collapsed, detached or temporarily zero-sized.

## Gap 5: No bounded allocation policy

The DPR clamp limits scale to 2 but does not cap total pixels. Large windows, browser zoom, high-resolution displays or embedded surfaces can still request backing dimensions beyond an acceptable frame budget or device limit.

Illustrative request:

```txt
CSS viewport: 7680 × 4320
DPR: 2
backing store: 15360 × 8640
pixels: 132,710,400
RGBA8 color bytes: approximately 506 MiB
```

This excludes depth, browser buffering, driver overhead and future render targets.

## Partial-frame states

```txt
resized-cleared
  canvas allocation changed
  no successor draw succeeded

resized-old-snapshot
  canvas dimensions are successor
  renderer snapshot is predecessor

new-projection-failed-draw
  camera/WebGL state was prepared
  no visible successor frame was acknowledged

new-layout-old-backing
  global layout changed while host stopped
  canvas and renderer retain predecessor dimensions

capture-mixed
  canvas pixels/backing dimensions and renderer snapshot have different provenance
```

## Required render envelope

```txt
FrameViewportEnvelope {
  frameId
  surfaceId
  surfaceGeneration
  viewportRevision
  renderPlanRevision
  cssBox
  sampledDpr
  effectiveDpr
  backingSize
  pixelBudget
  cameraAspect
  webglViewport
  submissionResult
  visibleAck
}
```

## Recovery rule

```txt
prepare all dimensions and policy first
  -> validate against budgets and limits
  -> apply backing store, WebGL viewport and camera as one commit
  -> on failure restore or recreate the complete predecessor surface
  -> retain the last complete visible frame/result
  -> never publish mixed successor/predecessor readback as complete
```

## Proof requirements

```txt
zero-size surface does not allocate global-window backing store
large surface is clamped or rejected before mutation
failed resize/draw returns a terminal result
predecessor state is retained or explicitly classified as lost
snapshot contains committed viewport revision
capture identifies the exact committed visible frame
browser readback matches renderer and camera state
```

## Validation boundary

Source review only. No browser rendering, allocation measurement, context limits, rollback, capture comparison, or deployed-origin test was executed.