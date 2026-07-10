# Render Audit: Renderer Readback Consumption Ledger

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T03-01-42-04-00`

## Current render surface

`IntoTheMeadow` has a live visual/render surface.

```txt
source render plan
  -> enhanceRenderPlan
  -> createMeadowRenderPlanV2 contract
  -> meadow-webgl-renderer-v2-compatible adapter
  -> meadow-webgl-renderer-v2
  -> buildMeadowMeshData
  -> WebGL outline pass
  -> WebGL main cel-fog pass
  -> aggregate renderer snapshot
```

## Render readback currently available

```txt
renderer snapshot:
  - id
  - version
  - planId
  - schema
  - topologyKey
  - vertexCount
  - triangleCount
  - primitiveFallbackCount
  - descriptorCounts
  - rebuildCount
  - cacheHitCount
  - cacheState
  - postProcessMode
  - validation

render enhancer snapshot:
  - sourceKey
  - topologyKey
  - rebuildCount
  - cacheHitCount
  - cache state

GameHost:
  - getRenderPlan
  - getRenderSnapshot
  - getRenderEnhancerSnapshot
  - getSnapshot with enhancedRenderPlan and render snapshot
```

## Render proof gap

The renderer snapshot is an aggregate diagnostic, not a consumption ledger.

Missing rows:

```txt
source descriptor id
source descriptor kind
expected consumer
accepted / ignored / unsupported / fallback status
renderer evidence field
fallback class
mesh contribution
postprocess evidence
wind evidence
cache evidence
headless editor observation evidence
GameHost projection evidence
```

## Specific issues to preserve

```txt
postProcess descriptors are emitted but renderer readback only says postProcessMode: inline-cel-fog.
primitiveFallbackCount is visible but not attributed to descriptor ids or fallback classes.
descriptorCounts are visible but not classified as consumed / ignored / unsupported / fallback.
renderer.getSnapshot is useful but not normalized into source-owned rows.
headless editor commands can read renderer snapshot but cannot prove descriptor consumption.
```

## Next render proof contract

```txt
collectRenderExpectations(enhancedPlan)
normalizeRendererSnapshot(rendererSnapshot)
buildRenderConsumptionLedger(expectations, normalizedSnapshot)
projectGameHostRenderProof(ledger)
assertRenderConsumptionRows(rows)
```

## Stop condition

A passing next gate should prove source descriptor consumption without the DOM, then separately prove that headless editor commands can observe the same proof projection through `GameHost`.
