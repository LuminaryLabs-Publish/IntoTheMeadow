# Grass System Audit — Grass Consumption Fixture Contract

**Timestamp:** `2026-07-09T09-41-24-04-00`

## Current grass path

`enhanceRenderPlan()` creates the grass system from the raw meadow render plan:

```txt
path source
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
  -> stats estimates
```

## Current service shape

```txt
density texture: id, resolution, world bounds, channels
static batches: reusable clump/card batches
patches: placed patch descriptors with instances
draw groups: instancing render groups
shader wind: wind state and validation
lod policy: draw policy descriptors
density scale: quality-derived scale
debug summary: expected debug counts
validation: density/archetype/batch/placement/drawGroup/wind/lod validation
```

## Missing proof

The route does not yet have a local readback contract proving that the renderer consumed or represented:

```txt
densityTexture.resolution
staticBatches.length
patches.length
drawGroups.length
estimatedGrassInstances
estimatedGrassCards
shaderWind fields
lodPolicy fields
debug summary counts
```

## Fixture rows needed

```txt
happy-path grass descriptor row
zero-patch row
sparse-renderer row
missing-renderer-snapshot row
patch-count-mismatch row
draw-group-count-mismatch row
estimated-instance-mismatch row
unsupported-grass-renderer row
```

## Decision

Keep the grass architecture. Prove consumption first; do not gut the grass DSK family or move it to shared kits until consumer rows show what the render host actually supports.
