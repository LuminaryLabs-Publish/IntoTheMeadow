# Grass System Audit: Row Consumption Ledger

**Timestamp:** `2026-07-09T22-40-25-04-00`

## Current grass source chain

```txt
createGrassDensityTextureKit
  -> createGrassClumpArchetypeKit
  -> createGrassStaticBatchKit
  -> createGrassDensityScalingKit
  -> createGrassPatchPlacementKit
  -> createGrassClumpInstancingRenderKit
  -> createGrassShaderWindKit
  -> createGrassLodPolicyKit
  -> createGrassDebugVisualizationKit
  -> grassSystem descriptor on enhanced render plan
```

## Current readback

```txt
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassSystem.debug
grassSystem.validation
renderer snapshot descriptorCounts.grassInstances
renderer snapshot vertexCount / triangleCount
```

## Gap

Grass has rich source data, but no row-level proof joins source to renderer output.

Needed rows:

```txt
density texture generated
static batch generated
patch placement generated
draw group generated
shader wind accepted
LOD policy accepted
renderer consumed grass instance count
renderer consumed card count
fallback or ignored grass row
```

## Main finding

The grass stack should not be retuned visually before proof rows exist. The current stack can already generate density, batch, placement, draw group, wind, and LOD descriptors.

The missing boundary is a stable grass consumption ledger that maps those descriptors to renderer snapshot facts.

## Required next kit

```txt
grass-consumption-row-kit
```

## Next validation target

```txt
node tests/grass-consumption-ledger-smoke.mjs
```
