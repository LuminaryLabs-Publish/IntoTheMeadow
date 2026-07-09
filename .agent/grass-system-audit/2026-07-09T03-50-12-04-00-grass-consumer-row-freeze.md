# Grass System Audit — Consumer Row Freeze

**Timestamp:** `2026-07-09T03-50-12-04-00`

## Current grass stack

`src/game/enhance-render-plan.js` builds a texture-driven grass system through local DSKs:

```txt
createGrassDensityTextureKit
createGrassClumpArchetypeKit
createGrassStaticBatchKit
createGrassDensityScalingKit
createGrassPatchPlacementKit
createGrassClumpInstancingRenderKit
createGrassShaderWindKit
createGrassLodPolicyKit
createGrassDebugVisualizationKit
```

The resulting enhanced render plan includes:

```txt
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassSystem.debug
grassPatches
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Current problem

The source can generate high-detail grass descriptors, but there is no proof that the renderer consumes them.

This is the core risk behind meadow visual drift: the source can become richer while the renderer silently falls back to simpler output.

## Required grass consumer rows

```txt
GrassConsumptionRow {
  id
  descriptorPath
  expected
  actual
  reason
  passed
  notes
}
```

## Minimum row set

```txt
density-texture-present
static-batch-count
patch-count
draw-group-count
shader-wind-present
lod-policy-present
density-scale-present
estimated-instance-count
estimated-card-count
debug-summary-present
renderer-grass-snapshot-present
```

## Fixture acceptance rows

```txt
full readback available -> all supported fields consumed
renderer snapshot absent -> missing-renderer-snapshot rows
renderer snapshot sparse -> missing-renderer-field rows
patch count mismatch -> count-mismatch row
draw group count mismatch -> count-mismatch row
unsupported renderer field -> unsupported row
```

## Next implementation files

```txt
src/render-parity/create-grass-consumption-rows.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/create-render-parity-report.js
tests/render-parity-fixture-smoke.mjs
```

## Guardrail

This should be a proof/readback layer, not a grass visual rewrite.
