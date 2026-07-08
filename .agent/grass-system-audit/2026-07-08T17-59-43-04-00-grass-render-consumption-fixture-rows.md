# Grass System Audit — Render Consumption Fixture Rows

**Timestamp:** `2026-07-08T17-59-43-04-00`

## Current grass system

`enhanceRenderPlan()` creates a texture-driven grass system from local DSKs:

```txt
createGrassDensityTextureKit
  -> densityTexture
createGrassClumpArchetypeKit
  -> archetypes
createGrassStaticBatchKit
  -> staticBatches
createGrassDensityScalingKit
  -> densityScale
createGrassPatchPlacementKit
  -> patches
createGrassClumpInstancingRenderKit
  -> drawGroups
createGrassShaderWindKit
  -> shaderWind
createGrassLodPolicyKit
  -> lodPolicy
createGrassDebugVisualizationKit
  -> debug summary
```

## Current render-facing outputs

```txt
grassSystem.id
grassSystem.type
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

## Main gap

The route has grass descriptors, but it does not yet prove what the external `meadow-webgl-render-kit` consumes from those descriptors.

The next implementation must not add more grass detail until this is measurable.

## Fixture row contract

```txt
GrassConsumptionFixtureRow
  id
  descriptorPath
  expectedType
  expectedCount
  rendererField
  consumedCount
  reason
  passed
  notes
```

## Required grass fixture rows

```txt
1. density texture exists
   descriptorPath: grassSystem.densityTexture
   expectedType: density-texture
   pass condition: resolution and worldBounds are present

2. static batches exist
   descriptorPath: grassSystem.staticBatches
   expectedType: static-batch[]
   pass condition: batch count matches stats.grassStaticBatchCount

3. patches exist
   descriptorPath: grassSystem.patches
   expectedType: grass-patch[]
   pass condition: patch count matches stats.grassPatchCount

4. draw groups exist
   descriptorPath: grassSystem.drawGroups
   expectedType: draw-group[]
   pass condition: group count matches stats.grassDrawGroupCount

5. estimated instance count exists
   descriptorPath: stats.estimatedGrassInstances
   expectedType: number
   pass condition: value equals sum of patch instance counts

6. estimated card count exists
   descriptorPath: stats.estimatedGrassCards
   expectedType: number
   pass condition: value equals sum of drawGroup cardCount * instanceCount

7. shader wind exists
   descriptorPath: grassSystem.shaderWind
   expectedType: wind-shader-descriptor
   pass condition: validation.wind.passed is true

8. LOD policy exists
   descriptorPath: grassSystem.lodPolicy
   expectedType: lod-policy
   pass condition: validation.lod.passed is true

9. renderer omits grass readback
   descriptorPath: grassSystem.*
   expectedType: mixed
   pass condition: rows are unsupported or unconsumed, not silently absent

10. renderer reports draw groups
   descriptorPath: grassSystem.drawGroups
   expectedType: draw-group[]
   pass condition: rows are consumed with matching counts
```

## Acceptance gate

The next implementation pass should stop when grass descriptors are visible in a parity report even if the renderer does not yet render every grass feature.

The goal is not perfect grass rendering in this pass.

The goal is to know exactly what the renderer consumed and what it ignored.
