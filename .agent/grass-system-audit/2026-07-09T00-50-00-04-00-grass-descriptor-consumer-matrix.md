# Grass System Audit — Grass Descriptor Consumer Matrix

**Timestamp:** `2026-07-09T00-50-00-04-00`

## Current grass source path

```txt
enhanceRenderPlan(rawPlan)
  -> createGrassSystem(renderPlan, performance, wind)
  -> density texture
  -> clump archetypes
  -> static batches
  -> patch placement
  -> instancing draw groups
  -> shader wind
  -> LOD policy
  -> density scale
  -> debug summary
  -> enhanced plan grassSystem / grassPatches / stats
```

## Current grass kits

```txt
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
```

## Matrix rows required next

| Descriptor | Expected source | Consumer proof needed |
| --- | --- | --- |
| `densityTexture.id` | `createGrassDensityTextureKit` | Renderer snapshot row or unsupported reason |
| `densityTexture.resolution` | `createGrassDensityTextureKit` | Resolution consumed/readback row |
| `staticBatches[]` | `createGrassStaticBatchKit` | Batch count and batch id rows |
| `patches[]` | `createGrassPatchPlacementKit` | Patch count and bounds rows |
| `drawGroups[]` | `createGrassClumpInstancingRenderKit` | Draw group count / card / instance rows |
| `shaderWind` | `createGrassShaderWindKit` | Wind uniforms consumed or unsupported row |
| `lodPolicy` | `createGrassLodPolicyKit` | LOD policy consumed or not-applicable row |
| `densityScale` | `createGrassDensityScalingKit` | Quality scale row |
| `grassPatches` | enhanced plan alias | Alias parity row |
| `stats.estimatedGrassInstances` | enhanced plan stats | Count match row |
| `stats.estimatedGrassCards` | enhanced plan stats | Count match row |

## Failure modes to make explicit

```txt
renderer has no getSnapshot
renderer snapshot exists but no grass branch
renderer snapshot grass branch has incompatible field names
renderer reports fewer draw groups than expected
renderer consumes patches but not shader wind
renderer treats grass as fallback meshes
renderer reports no instance/card counts
```

## Next consumer contract

```txt
GrassConsumptionRow {
  id
  descriptorPath
  expected
  actual
  reason
  severity
  message
}
```

## Finding

Grass is authored as a reusable descriptor stack, but the browser route cannot yet prove the renderer consumed that stack.

Add consumer rows before adding more grass visuals, density, or batching complexity.
