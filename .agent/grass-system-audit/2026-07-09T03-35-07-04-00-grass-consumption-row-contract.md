# Grass System Audit — Consumption Row Contract

**Timestamp:** `2026-07-09T03-35-07-04-00`

## Current grass pipeline

`src/game/enhance-render-plan.js` builds a descriptor-rich grass system every frame.

```txt
renderPlan + performance + wind
  -> createGrassDensityTextureKit({ area, path, seed, resolution })
  -> createGrassClumpArchetypeKit({ cardCount: 64 })
  -> createGrassStaticBatchKit().createBatches(archetypes)
  -> createGrassDensityScalingKit({ quality })
  -> createGrassPatchPlacementKit({ patchSize: 8, densityScale })
  -> placement.createPatches({ area, densityTexture, staticBatches })
  -> createGrassClumpInstancingRenderKit().createDrawGroups({ staticBatches, patches })
  -> createGrassShaderWindKit(wind.state)
  -> createGrassLodPolicyKit()
  -> createGrassDebugVisualizationKit().createDebugSummary(...)
  -> grassSystem descriptor
```

## Current grass descriptors

```txt
grassSystem.id
grassSystem.type
grassSystem.densityTexture.id
grassSystem.densityTexture.resolution
grassSystem.densityTexture.worldBounds
grassSystem.densityTexture.channels
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassSystem.debug
grassSystem.validation
grassPatches
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Main gap

The grass descriptors are generated, but the host does not yet prove whether the external renderer consumed, ignored, downsampled, or rejected any grass descriptor.

This makes long-term visual work risky because a richer descriptor can be silently dropped.

## Required grass consumption row shape

```txt
GrassConsumptionRow {
  id
  descriptorPath
  expectedKind
  expectedCount
  actualKind
  actualCount
  status
  reason
  notes
}
```

## Required row groups

```txt
density-texture-row
static-batch-row
patch-grid-row
patch-instance-row
draw-group-row
shader-wind-row
lod-policy-row
density-scale-row
debug-summary-row
estimated-instance-row
estimated-card-row
```

## Compatibility policy

A missing renderer snapshot should not fail the app.

It should create explicit compatibility rows:

```txt
status: unsupported
reason: missing-renderer-snapshot
```

Sparse snapshots should create path-specific rows:

```txt
status: unsupported
reason: missing-renderer-field
```

Count mismatches should be detectable without depending on WebGL internals:

```txt
status: failed
reason: count-mismatch
```

## Next files

```txt
src/render-parity/create-grass-consumption-rows.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/create-render-parity-report.js
```

## Fixture cases

```txt
missing renderer snapshot
empty renderer snapshot
renderer snapshot with only vertexCount
renderer snapshot with grassPatchCount mismatch
renderer snapshot with grassDrawGroupCount mismatch
renderer snapshot with compatible grass counts
legacy plan without grassSystem
```

## Non-goals

```txt
Do not tune grass density yet.
Do not change visual grass placement yet.
Do not move grass generation to a shared repo yet.
Do not require the external renderer to expose private WebGL buffers.
```
