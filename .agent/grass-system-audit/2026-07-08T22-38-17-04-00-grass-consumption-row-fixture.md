# Grass System Audit — Grass Consumption Row Fixture

**Timestamp:** `2026-07-08T22-38-17-04-00`

## Current grass stack

`enhanceRenderPlan()` creates a texture-driven grass system on every enhanced render plan.

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
-> grassSystem
```

## Current descriptors

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

## Current risk

The grass system is structurally rich, but renderer readback does not prove whether the external renderer consumes any of it.

The next pass should not add more grass variety until the current descriptor stack has consumer rows.

## Required grass readback contract

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

## Required fixture rows

```txt
row: density texture exists
expected: descriptorPath grassSystem.densityTexture with resolution/worldBounds/channels

row: static batches exist
expected: descriptorPath grassSystem.staticBatches with expectedCount >= 1

row: patches exist
expected: descriptorPath grassSystem.patches and stats.grassPatchCount match

row: draw groups exist
expected: descriptorPath grassSystem.drawGroups and stats.grassDrawGroupCount match

row: instance estimates exist
expected: estimatedGrassInstances and estimatedGrassCards are numeric

row: renderer snapshot absent
expected: rows are classified missing-renderer-snapshot, not skipped

row: renderer snapshot present but no grass section
expected: rows are classified unconsumed or unsupported with stable reasons
```

## Implementation note

Keep this pure.

The grass fixture should take:

```txt
enhancedPlan
rendererSnapshot
```

and return:

```txt
GrassConsumptionRow[]
```

No DOM, canvas, WebGL, or external renderer import should be required for the first fixture.
