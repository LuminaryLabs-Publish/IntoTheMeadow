# Atomic Frame Commit Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T21-19-36-04-00`

## Current render publication

`web-host.js` assigns `lastPlan` before calling `renderer.render(plan)`. The renderer then resizes the canvas, ensures/builds mesh buffers, clears, draws two passes, creates its snapshot, and returns. Only then does the host assign `lastRender`.

## Failure window

```txt
state advanced
enhanced plan created
lastPlan advanced
renderer begins work
renderer throws
showFatal stops scheduling
lastRender remains previous
canvas may be old, cleared, or partially drawn
```

Public reads can then report a plan that was never successfully rendered.

## Snapshot mismatch

Renderer snapshots include:

```txt
planId
schema
topologyKey
vertex/triangle counts
descriptor counts
cache counters
validation
```

They omit:

```txt
session/run/frame id
simulation frame
render request time
state fingerprint
plan fingerprint
source epoch/fingerprint
viewport dimensions
commit status
```

## Required render-consumption result

```txt
{
  frameId,
  requestSequence,
  planId,
  planFingerprint,
  topologyKey,
  rendererVersion,
  vertexCount,
  triangleCount,
  descriptorCounts,
  cacheState,
  canvasWidth,
  canvasHeight,
  status,
  reason
}
```

The renderer may return this staged result, but the runtime frame authority must decide whether it becomes the new committed frame.

## Stop condition

```txt
last successful frame remains visible in readback after failure
no plan is called rendered until renderer success
canvas capture identifies the committed frame
renderer cache statistics are correlated to one frame
visual output and shader behavior remain unchanged
```
