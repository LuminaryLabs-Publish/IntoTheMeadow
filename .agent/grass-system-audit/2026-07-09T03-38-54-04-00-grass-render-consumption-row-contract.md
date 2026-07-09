# Grass System Audit — Grass Render Consumption Row Contract

**Timestamp:** `2026-07-09T03-38-54-04-00`

## Current grass stack

`src/game/enhance-render-plan.js` creates a complete grass descriptor stack:

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

The output is attached to the enhanced render plan as:

```txt
grassSystem
grassPatches
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Current weak seam

The descriptors are source-authored, but renderer consumption is not proven.

A visually weak route can still report rich grass descriptors if the renderer silently ignores some of them.

## Required grass readback rows

The next fixture should classify at least these rows:

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

## Required row fields

```txt
id
group
expectedPath
actualPath
expectedCount
actualCount
status
reason
severity
notes
```

## Important compatibility states

```txt
renderer snapshot absent: stable row, not crash
renderer snapshot sparse: stable row, not crash
renderer does not expose grass-specific readback: unsupported row
expected count differs from actual count: count-mismatch row
renderer fallback-rendered generic grass: fallback-rendered row
```

## Non-goal

Do not redesign grass visuals in the next pass.

First prove whether the renderer consumes the current grass descriptors.
