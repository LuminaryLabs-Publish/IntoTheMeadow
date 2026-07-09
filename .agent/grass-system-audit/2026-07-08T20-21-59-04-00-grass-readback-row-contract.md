# Grass System Audit — Grass Readback Row Contract

**Timestamp:** `2026-07-08T20-21-59-04-00`

## Current grass descriptor stack

`src/game/enhance-render-plan.js` builds a texture-driven grass system from local DSKs:

```txt
createGrassDensityTextureKit
createGrassClumpArchetypeKit
createGrassStaticBatchKit
createGrassPatchPlacementKit
createGrassClumpInstancingRenderKit
createGrassShaderWindKit
createGrassLodPolicyKit
createGrassDensityScalingKit
createGrassDebugVisualizationKit
```

## Current grass output

```txt
grassSystem.id
grassSystem.type = texture-driven-grass-system
grassSystem.densityTexture
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

## Missing readback

The renderer snapshot is exposed, but there is no normalized report for whether the renderer consumed or ignored the grass descriptors.

The next implementation should add `createGrassConsumptionRows()` under `src/render-parity/`.

## Required row groups

```txt
grass-density-texture
static-batch-count
patch-count
draw-group-count
shader-wind
lod-policy
density-scale
estimated-instances
estimated-cards
validation-summary
```

## Required failure modes

```txt
missing-renderer-snapshot
missing-renderer-field
unsupported
unconsumed
count-mismatch
invalid-plan-descriptor
```

## Fixture rows

```txt
valid grassSystem and matching snapshot -> passed rows
valid grassSystem and sparse snapshot -> missing field rows
valid grassSystem and no snapshot -> missing-renderer-snapshot rows
patch-count mismatch -> count-mismatch row
draw-group-count mismatch -> count-mismatch row
shader wind absent -> missing-renderer-field row
validation failure in descriptor -> invalid-plan-descriptor row
```

## Integration rule

Do not add more grass density or visual variants until readback is explicit.

The current grass descriptors are good enough to test; the missing layer is proof that renderer consumption is known and reportable.