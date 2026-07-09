# Grass System Audit — Grass Readback Consumption Ledger

**Timestamp:** `2026-07-09T09-50-00-04-00`

## Current grass source

Grass is generated in `src/game/enhance-render-plan.js` through `createGrassSystem(renderPlan, performance, wind)`.

The current grass stack is descriptor-rich:

```txt
grass-density-texture-kit
  -> densityTexture { id, resolution, worldBounds, channels }
grass-clump-archetype-kit
  -> archetypes
grass-static-batch-kit
  -> staticBatches
grass-density-scaling-kit
  -> densityScale
grass-patch-placement-kit
  -> patches
grass-clump-instancing-render-kit
  -> drawGroups
grass-shader-wind-kit
  -> shaderWind
grass-lod-policy-kit
  -> lodPolicy
grass-debug-visualization-kit
  -> debug summary
```

The enhanced plan also exposes:

```txt
grassSystem
grassPatches
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Gap

The renderer receives grass descriptors, but repo-local docs and tests do not prove which grass descriptors were consumed by the external renderer.

Missing proof:

```txt
density texture readback
static batch readback
patch readback
draw group readback
instance count parity
card count parity
shader wind binding readback
LOD policy readback
density scale readback
fallback or unsupported grass mode classification
```

## Next grass ledger

Add a pure grass consumption classifier.

```txt
classifyGrassConsumption({ grassSystem, rendererSnapshot })
```

Expected rows:

```txt
{
  type: "density-texture" | "static-batch" | "patch" | "draw-group" | "shader-wind" | "lod" | "density-scale" | "count-parity",
  id,
  expected,
  actual,
  status: "consumed" | "missing" | "sparse" | "unsupported" | "fallback-rendered",
  reason
}
```

## Fixture cases

```txt
renderer snapshot absent -> rows classify as sparse or absent without failing the whole route
renderer snapshot reports zero grass -> rows classify missing draw groups and patches
renderer snapshot reports matching counts -> count-parity rows pass
renderer snapshot reports fewer patches -> partial row failure is recorded
fallback render path -> rows classify fallback-rendered
```

## Non-goals

```txt
Do not make new grass art first.
Do not rewrite external renderer internals from this repo.
Do not increase grass density until readback exists.
Do not promote the grass stack out of this repo until fixture rows prove the contract.
```
