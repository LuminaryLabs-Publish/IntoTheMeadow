# Grass System Audit: Proof Row Parity

**Timestamp:** `2026-07-10T04-58-56-04-00`

## Current grass surface

`enhanceRenderPlan()` creates a rich grass system:

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

## Current grass service chain

```txt
render plan area + path
  -> density texture
  -> clump archetypes
  -> static batches
  -> density scale
  -> patch placements
  -> draw groups
  -> shader wind
  -> LOD policy
  -> debug summary
  -> enhanced render plan stats
```

## Grass proof gaps

```txt
density texture rows are not compared against renderer readback
static batch card counts are not proven against draw groups
patch instance counts are not fixture-proven
draw group card/instance totals are not normalized into rows
shader wind consumption is not proven against renderer facts
LOD policy consumption is not visible as proof rows
headless editor observations do not emit grass parity rows
```

## Next proof rows

```txt
GrassDensityRow
GrassStaticBatchRow
GrassPatchRow
GrassDrawGroupRow
GrassWindRow
GrassLodRow
GrassDebugSummaryRow
GrassRenderParityRow
```

## Deferral

Do not tune grass art, add denser grass, or replace grass rendering before source/render parity rows exist.
