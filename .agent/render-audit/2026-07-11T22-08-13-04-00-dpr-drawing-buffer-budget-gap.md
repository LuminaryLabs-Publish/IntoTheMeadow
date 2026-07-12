# DPR and Drawing-Buffer Budget Gap

**Timestamp:** `2026-07-11T22-08-13-04-00`

## Summary

The renderer preserves the canvas CSS size but chooses internal resolution from live device pixel ratio on every frame. The requested drawing buffer is not admitted against a product pixel budget or WebGL capability result, and the renderer snapshot does not expose what resolution was actually committed.

## Current implementation

```txt
ratio = min(2, max(1, devicePixelRatio))
width = floor((canvas.clientWidth || innerWidth || 1) * ratio)
height = floor((canvas.clientHeight || innerHeight || 1) * ratio)

if dimensions changed
  canvas.width = width
  canvas.height = height

gl.viewport(0, 0, width, height)
projection aspect = width / height
```

The logic runs inside `renderer.render()` before each draw.

## Scale example

```txt
CSS viewport: 3840 x 2160
DPR policy result: 2
requested buffer: 7680 x 4320
requested pixels: 33,177,600
```

That count excludes antialiasing, depth and browser implementation overhead. The current product has no explicit maximum pixel count or fallback tier.

## Missing render evidence

The renderer snapshot includes:

```txt
plan ID
schema
topology key
vertex and triangle counts
cache counts
post-process mode
validation
```

It omits:

```txt
CSS dimensions
requested and applied DPR
requested canvas dimensions
actual gl.drawingBufferWidth / drawingBufferHeight
surface ID and revision
resize command ID
quality tier and fallback reason
context generation
committed frame ID
```

## Failure modes

```txt
very large viewport or DPR
  -> oversized requested drawing buffer
  -> browser clamp, allocation pressure, context loss or failure is not classified

rapid resize or orientation changes
  -> each frame directly mutates the live drawing buffer
  -> no command coalescing or stale-result policy

hidden or transient zero-size layout
  -> implementation falls back to at least one pixel
  -> no explicit last-known-good or suspended-surface policy

browser resize before next frame
  -> inner viewport can be new while canvas drawing buffer and renderer snapshot remain old

capture
  -> canvas width/height and data URL are paired with a snapshot that has no surface revision
```

## Required render contract

```txt
RenderSurfacePlan
  observation ID
  expected surface revision
  CSS dimensions
  requested DPR
  maximum dimensions
  maximum pixels
  capability limits
  candidate dimensions
  fallback sequence

CommittedRenderSurface
  surface ID
  context generation
  surface revision
  actual drawing-buffer dimensions
  applied DPR
  aspect
  quality tier
  fallback reason
  first visible frame ID
```

## Acceptance boundary

Do not treat a full-window canvas, nonzero screenshot or successful `gl.drawArrays` return as proof of a valid render surface. The accepted surface must be bounded, read back from the WebGL drawing buffer and cited by projection, renderer snapshot, capture and visible-frame evidence.
