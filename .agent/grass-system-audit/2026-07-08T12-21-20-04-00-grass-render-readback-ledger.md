# Grass System Audit — Render Readback Ledger

**Timestamp:** `2026-07-08T12-21-20-04-00`

## Current grass system

`enhanceRenderPlan()` builds the grass system as a descriptor pipeline:

```txt
renderPlan area/path/seed
  -> grass-density-texture-kit
  -> grass-clump-archetype-kit
  -> grass-static-batch-kit
  -> grass-density-scaling-kit
  -> grass-patch-placement-kit
  -> grass-clump-instancing-render-kit
  -> grass-shader-wind-kit
  -> grass-lod-policy-kit
  -> grass-debug-visualization-kit
  -> grassSystem descriptor
  -> grassPatches alias
  -> stats counters
```

## Why this matters

The meadow quality problem is not solved by adding more authored objects.

The scene needs proof that the renderer consumes the descriptor-level grass system rather than ignoring it and falling back to old object clutter.

## Fields that must be read back

```txt
grassSystem.id
grassSystem.type
grassSystem.densityTexture.id
grassSystem.densityTexture.resolution
grassSystem.staticBatches.length
grassSystem.patches.length
grassSystem.drawGroups.length
grassSystem.shaderWind
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Renderer-side proof target

```txt
renderer.getSnapshot().grass = {
  supported,
  consumedDescriptorIds,
  patchCount,
  drawGroupCount,
  estimatedInstances,
  estimatedCards,
  unsupportedReasons,
  fallbackReasons
}
```

## Failure modes

```txt
- grassSystem present in the enhanced plan but absent from renderer readback
- grass patch count differs without a reason
- draw group count differs without a reason
- renderer keeps drawing individual grass-blade objects instead of patch/batch descriptors
- wind shader metadata exists but renderer reports no wind channel
- LOD policy exists but renderer has no consumed/unsupported LOD reason
```

## Next implementation slice

Add a DOM-free render parity fixture before any new grass visuals.

The fixture should import `enhanceRenderPlan()`, create a representative raw plan, collect grass expectations, feed a fake renderer snapshot, and assert stable parity classification.
