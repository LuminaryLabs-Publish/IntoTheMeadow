# Grass Consumption Row Contract — IntoTheMeadow

**Timestamp:** `2026-07-08T15-28-13-04-00`

## Finding

The grass descriptor system is rich enough to support a production meadow look, but the current repo still cannot prove renderer consumption.

The failure mode to prevent is silent descriptor drop.

## Current grass system source

Target file:

```txt
src/game/enhance-render-plan.js
```

Current descriptor chain:

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
  -> texture-driven-grass-system
```

## Required readback rows

Every render parity report should include rows for:

```txt
grassSystem.id
grassSystem.type
grassSystem.densityTexture.id
grassSystem.densityTexture.resolution
grassSystem.densityTexture.worldBounds
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassSystem.validation.density
grassSystem.validation.batches
grassSystem.validation.placement
grassSystem.validation.drawGroups
grassSystem.validation.wind
grassSystem.validation.lod
grassPatches
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Status semantics

```txt
consumed:
  renderer snapshot proves the descriptor was used or transformed into render resources

fallback-rendered:
  renderer cannot consume the advanced descriptor but rendered a lower-fidelity substitute

unsupported:
  renderer explicitly does not support the descriptor yet

unconsumed:
  renderer snapshot exists and does not show usage

missing:
  expected descriptor or renderer readback field is absent
```

## Minimum pass condition

The first source implementation does not need the external renderer to consume all grass descriptors.

It does need:

```txt
stable row ids
stable status values
stable reason values
expected count
missing count
unsupported count
fallback count
GameHost exposure
DOM-free fixture coverage
```

## Why this matters

The meadow currently emits estimated instance/card counts and multiple grass render descriptors. Without readback rows, future visual upgrades can keep adding descriptors while the renderer ignores them.

The next gate should make that impossible to miss.