# Grass System Audit — Descriptor Consumption Row Contract

**Timestamp:** `2026-07-09T06-28-53-04-00`

## Current grass pipeline

`src/game/enhance-render-plan.js` owns the current texture-driven grass descriptor pipeline:

```txt
path source
  -> createGrassDensityTextureKit({ area, path, seed, resolution })
  -> createGrassClumpArchetypeKit({ cardCount: 64 })
  -> createGrassStaticBatchKit().createBatches(archetypes)
  -> createGrassDensityScalingKit({ quality })
  -> createGrassPatchPlacementKit({ patchSize: 8, densityScale })
  -> placement.createPatches({ area, densityTexture, staticBatches })
  -> createGrassClumpInstancingRenderKit().createDrawGroups({ staticBatches, patches })
  -> createGrassShaderWindKit(wind.state)
  -> createGrassLodPolicyKit()
  -> createGrassDebugVisualizationKit()
  -> grassSystem descriptor
```

## Current grass services

```txt
density texture generation
density channel validation
clump card archetype generation
static batch generation
patch placement
instance draw group generation
shader wind descriptor generation
LOD policy descriptor generation
density scale descriptor generation
debug summary generation
validation summaries for density, archetypes, batches, placement, draw groups, wind, and LOD
```

## Current grass gap

The grass pipeline emits descriptors, but the external renderer consumption path is not proven.

The host cannot yet answer:

```txt
Was densityTexture consumed?
Were staticBatches consumed?
Were patches consumed?
Were drawGroups consumed?
Was shaderWind consumed?
Was lodPolicy consumed?
Was densityScale consumed?
Were patch/instance counts honored?
Were unsupported fields fallback-rendered or silently dropped?
```

## Required grass readback row

```txt
GrassConsumptionRow {
  id,
  descriptorGroup,
  descriptorId,
  expectedCount,
  actualCount,
  reason,
  passed,
  notes
}
```

## Required grass rows

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

## Fixture rows

```txt
complete renderer snapshot with matching draw group count
missing renderer snapshot
sparse renderer snapshot with no grass field
unsupported renderer grass readback
mismatched patch count
mismatched draw group count
zero-patch fallback plan
legacy enhancedRenderPlan remains exposed
```

## Main finding

The grass system is architecturally richer than the current renderer readback contract.

The next implementation should prove consumption rows before adding more grass density, new art, or new biome features.
