# Interaction Audit: Camera Observation to Grass Draw-Plan Result

**Timestamp:** `2026-07-12T04-11-54-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current ingress

```txt
requestAnimationFrame timestamp
  -> game tick
  -> source render plan
  -> cached enhancer
  -> renderer
```

There is no typed camera observation or grass plan result between the enhancer and renderer.

## Required command/result map

```txt
GrassViewObservation
  runtimeSessionId
  contextGeneration
  surfaceRevision
  cameraRevision
  frameIntentId
  camera position/orientation
  projection/frustum
  qualityRevision
  expectedVisibleSetRevision

GrassDrawPlanResult
  observation identity
  status
  predecessor and committed visible-set revisions
  patch admission counts
  instances/cards by tier
  terrain-tint patches
  budget result
  rejection reasons
  frame acknowledgement
```

## Admission rules

```txt
reject non-finite camera or projection values
reject stale runtime session
reject stale context generation
reject stale surface or camera revision
reject unknown policy revision
coalesce superseded observations
never apply a partial patch set
never mutate static placement identity
```

## Consumer parity

The browser host, headless observation, renderer snapshot and debug HUD must read the same committed result. No adapter may recalculate LOD independently.

## Required result statuses

```txt
committed
unchanged
coalesced
stale
rejected
fallback
```

## Proof boundary

A camera movement is not complete from the grass system's perspective until the accepted visible-set revision is represented by the first visible frame and reported through diagnostics.
