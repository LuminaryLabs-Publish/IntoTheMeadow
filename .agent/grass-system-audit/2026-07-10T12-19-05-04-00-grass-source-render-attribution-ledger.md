# Grass System Audit: Source Render Attribution Ledger

**Timestamp:** `2026-07-10T12-19-05-04-00`

## Current grass stack

```txt
grass-density-texture-kit
  -> grass-clump-archetype-kit
  -> grass-static-batch-kit
  -> grass-patch-placement-kit
  -> grass-clump-instancing-render-kit
  -> grass-shader-wind-kit
  -> grass-lod-policy-kit
  -> grass-density-scaling-kit
  -> grass-debug-visualization-kit
  -> enhanceRenderPlan stats
  -> renderer aggregate snapshot
```

## Current gap

```txt
density texture channels are validated but not compared against renderer rows
static batches are validated but not attributed to draw groups in host proof
patches exist but patch-to-instance totals are not fixture-proven
draw group totals are aggregate
shader wind and LOD policy are descriptors, not proof rows
headless editor does not report grass parity rows
```

## Required rows

```txt
GrassSourceRow
GrassDensityTextureRow
GrassStaticBatchRow
GrassPatchPlacementRow
GrassDrawGroupRow
GrassShaderWindRow
GrassLodPolicyRow
GrassRenderParityRow
```

## Recommendation

Add grass source/render attribution before tuning grass art. The next fixture should prove density, batches, patches, draw groups, wind, LOD, debug summaries, and renderer totals match.
