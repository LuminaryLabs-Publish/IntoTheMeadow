# Context Loss and Stale Render Snapshot Gap

**Timestamp:** `2026-07-11T17-30-56-04-00`

## Summary

The renderer snapshot records topology, counts and cache counters but no WebGL context state or generation. After context loss, the last successful snapshot remains readable and may continue to appear healthy even though the canvas cannot prove a current GPU submission.

## Plan ledger

**Goal:** prevent renderer, HUD, GameHost and capture surfaces from presenting pre-loss metadata as evidence of a current visible frame.

- [x] Trace renderer snapshot creation.
- [x] Trace host `lastRender` ownership.
- [x] Trace debug HUD projection.
- [x] Trace GameHost and editor snapshot projection.
- [x] Trace browser canvas capture.
- [x] Identify missing context and frame correlation.
- [x] Define render-readiness and capture-freshness requirements.
- [ ] Implement and run forced context-loss browser fixtures later.

## Current snapshot fields

```txt
id
version
planId
schema
topologyKey
vertexCount
triangleCount
primitiveFallbackCount
descriptorCounts
rebuildCount
cacheHitCount
cacheState
postProcessMode
validation
```

Missing fields:

```txt
rendererInstanceId
runtimeSessionId
contextPhase
contextGeneration
resourceGeneration
frameId
submittedAt
presentedAt
contextLostDuringFrame
GL error result
recovery status
```

## Reachable stale-observation path

```txt
frame F renders successfully
  -> renderer snapshot describes F
  -> web host stores lastRender = F
  -> HUD shows gpu:persistent
  -> GameHost exposes F

WebGL context is lost
  -> no listener changes renderer state
  -> no frame pointer is invalidated
  -> lastRender remains F
  -> renderer.getSnapshot() remains F
  -> editor capture includes F metadata
  -> observers cannot distinguish current visibility from stale success
```

## Same-topology restoration gap

The cache admits a hit when `cache.topologyKey` matches and `cache.mesh` exists. Context restoration does not change either value. The CPU mesh can still be valid while its GPU buffers and shader program are not, so topology cache validity is not GPU-resource validity.

```txt
CPU topology cache: valid
GPU program/buffers: invalid for restored context
renderer snapshot: still reports persistent cache
visible canvas: unproven
```

## Capture mismatch

`renderer.capture` currently returns:

```txt
format
width
height
dataUrl
renderer snapshot
```

It does not require:

```txt
active context generation
successful frame after latest restoration
matching renderer/frame generation
non-lost context at serialization time
capture receipt tied to committed frame
```

The data URL and renderer metadata can therefore describe different evidence generations.

## Required render record

```txt
RendererFrameReceipt
  runtimeSessionId
  rendererInstanceId
  frameId
  planId
  topologyKey
  contextGeneration
  resourceGeneration
  viewportRevision
  submitStatus
  glError
  contextLostDuringFrame
  committed
```

## Required capture record

```txt
RendererCaptureReceipt
  captureId
  frameId
  contextGeneration
  resourceGeneration
  width
  height
  format
  dataUrlStatus
  rendererSnapshotFingerprint
  status
  rejectionReason
```

## Acceptance rules

```txt
loss invalidates render readiness immediately
pre-loss snapshots remain historical, not current
restoration forces a new resource generation
first recovered frame must commit before readiness returns
HUD and GameHost show lost/restoring state instead of stale gpu:persistent
capture rejects during lost/restoring/failed phases
successful capture cites the same frame and generations as renderer diagnostics
```

## Rejection cases

```txt
capture during context loss
capture before first restored frame
render using prior-generation program
render using prior-generation buffers
snapshot marked current without frame ID
HUD reports healthy while context phase is lost
stale editor observation from an earlier runtime session
```
