# Grass System Audit: Descriptor Consumption Proof

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-09T18-20-18-04-00`

## Current grass pipeline

`enhanceRenderPlan()` builds a full texture-driven grass system each frame:

```txt
raw renderPlan
  -> path source
  -> createGrassDensityTextureKit
  -> createGrassClumpArchetypeKit
  -> createGrassStaticBatchKit
  -> createGrassDensityScalingKit
  -> createGrassPatchPlacementKit
  -> createGrassClumpInstancingRenderKit
  -> createGrassShaderWindKit
  -> createGrassLodPolicyKit
  -> createGrassDebugVisualizationKit
  -> grassSystem, grassPatches, stats
```

## Active grass services

```txt
density texture: id, resolution, worldBounds, channels, validation
archetypes: clump/card archetype set
static batches: reusable clump/card batch descriptors
density scaling: quality-aware density scale
patch placement: area/path-aware patch rows
instancing: draw groups from static batches and patches
shader wind: shader wind descriptor from wind state
LOD policy: distance/performance policy
debug summary: source-level grass diagnostics
stats: patch count, static batch count, draw group count, estimated instances, estimated cards
```

## Gap

The active grass source is rich, but no fixture proves renderer consumption. The missing rows are:

```txt
densityTexture resolution/worldBounds consumed
staticBatches count consumed
patches count consumed
drawGroups card/instance totals consumed
shaderWind consumed or ignored with reason
lodPolicy consumed or ignored with reason
densityScale consumed or source-only with reason
renderer snapshot missing fallback row
```

## Next proof row shape

```txt
{
  sourceId,
  descriptorType,
  expectedCount,
  renderReadbackCount,
  status: consumed | ignored | unsupported | fallback | source-only,
  reason,
  snapshotKey
}
```

## Next files

```txt
src/render-proof/grass-consumption-ledger.js
tests/grass-consumption-ledger-smoke.mjs
```
