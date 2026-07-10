# Grass System Audit: Grass Render Parity Ledger

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T00-09-51-04-00`

## Grass pipeline today

`src/game/enhance-render-plan.js` creates the grass system during render-plan enhancement.

```txt
render plan path/area
  -> grass-density-texture-kit
  -> grass-clump-archetype-kit
  -> grass-static-batch-kit
  -> grass-density-scaling-kit
  -> grass-patch-placement-kit
  -> grass-clump-instancing-render-kit
  -> grass-shader-wind-kit
  -> grass-lod-policy-kit
  -> grass-debug-visualization-kit
  -> enhancedPlan.grassSystem / grassPatches / stats
  -> meadow-webgl-renderer-v2 aggregate descriptor counts
```

## Grass services offered

```txt
density texture generation and validation
card archetype generation and validation
static batch creation and validation
patch placement from area/path/density
instance draw-group creation
shader wind descriptor creation
LOD policy creation
density scaling by quality
debug summary creation
```

## Current gap

The grass DSK family emits rich source descriptors, but no fixture proves source-to-render parity.

Missing proof rows:

```txt
density texture resolution/world bounds row
static batch count row
archetype card count row
patch count row
draw group count row
estimated instance/card parity row
shader wind consumed row
LOD consumed row
renderer descriptorCounts.grassInstances parity row
```

## Next-cut files

```txt
src/render-proof/grass-consumption-ledger.js
tests/grass-consumption-ledger-smoke.mjs
src/render-proof/gamehost-render-proof.js
```

## Deferrals

```txt
grass art tuning
grass density retune
new grass archetypes
GPU instancing rewrite
LOD visual retune
```
