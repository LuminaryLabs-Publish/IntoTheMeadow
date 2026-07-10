# Grass System Audit: Grass Consumption Headless Ledger

**Timestamp:** `2026-07-10T01-38-16-04-00`

## Grass system read

`enhanceRenderPlan()` creates a meaningful procedural grass system.

The grass family already includes density, archetypes, static batches, placements, draw groups, wind, LOD, scaling, and debug descriptors.

The missing layer is proof that renderer and headless observations consumed those descriptors as expected.

## Current grass loop

```txt
createGrassSystem(renderPlan, performance, wind)
  -> grass-density-texture-kit
  -> grass-clump-archetype-kit
  -> grass-static-batch-kit
  -> grass-density-scaling-kit
  -> grass-patch-placement-kit
  -> grass-clump-instancing-render-kit
  -> grass-shader-wind-kit
  -> grass-lod-policy-kit
  -> grass-debug-visualization-kit
  -> enhanceRenderPlan returns grassSystem and grassPatches
  -> renderer consumes enhanced plan
  -> GameHost can expose aggregate plan/render snapshots
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

## Grass proof gaps

```txt
grass density texture rows are not compared against renderer readback.
static batch and archetype card counts are not proven against renderer state.
patch instance counts are not fixture-proven.
draw group card and instance totals are not normalized into rows.
shader wind and LOD policy consumption are not visible as proof rows.
headless editor observation does not yet emit grass parity rows.
```

## Rows needed

```txt
grass_density_texture_expected
grass_density_texture_consumed
grass_static_batch_expected
grass_static_batch_consumed
grass_patch_expected
grass_patch_consumed
grass_draw_group_expected
grass_draw_group_consumed
grass_shader_wind_consumed
grass_lod_policy_consumed
grass_debug_summary_normalized
headless_editor_grass_observation_row
```

## Next safe grass work

```txt
src/render-proof/grass-consumption-ledger.js
tests/grass-consumption-ledger-smoke.mjs
GameHost additive grass proof projection
headless editor observation row projection
```

## Deferrals

```txt
grass art tuning
grass shader rewrite
grass density retune
renderer replacement
external shared-kit promotion
```
