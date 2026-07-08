# Grass System Audit — Grass Consumption Fixture Rows

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-08T18-09-21-04-00`

## Grass system read

`src/game/enhance-render-plan.js` builds a texture-driven grass system every enhanced render plan.

Current output includes:

```txt
grassSystem.id
grassSystem.type
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

This is a good descriptor surface.

The missing part is consumer proof.

## Current construction chain

```txt
createGrassDensityTextureKit({ area, path, seed, resolution })
  -> densityTexture
createGrassClumpArchetypeKit({ cardCount: 64 })
  -> archetypes
createGrassStaticBatchKit().createBatches(archetypes)
  -> staticBatches
createGrassDensityScalingKit({ quality })
  -> densityScale
createGrassPatchPlacementKit({ patchSize: 8, densityScale })
  -> patches
createGrassClumpInstancingRenderKit().createDrawGroups({ staticBatches, patches })
  -> drawGroups
createGrassShaderWindKit(wind.state)
  -> shaderWind
createGrassLodPolicyKit()
  -> lodPolicy
createGrassDebugVisualizationKit().createDebugSummary(...)
  -> debug summary
```

## Required grass parity row groups

```txt
grass-density-texture
static-batch-count
patch-count
draw-group-count
shader-wind
lod-policy
density-scale
estimated-instances
estimated-cards
debug-summary
validation-summary
```

## Fixture rows

```txt
grass_density_texture_present_in_expected_descriptors
grass_density_texture_missing_in_renderer_snapshot_reports_unconsumed
grass_static_batch_count_matches_consumed_snapshot
grass_static_batch_count_mismatch_reports_unconsumed
grass_patch_count_matches_consumed_snapshot
grass_patch_count_mismatch_reports_unconsumed
grass_draw_group_count_matches_consumed_snapshot
grass_draw_group_count_mismatch_reports_unconsumed
grass_shader_wind_consumed_or_unsupported_is_explicit
grass_lod_policy_consumed_or_unsupported_is_explicit
grass_density_scale_consumed_or_unsupported_is_explicit
grass_estimated_instances_mismatch_reports_unconsumed
grass_estimated_cards_mismatch_reports_unconsumed
grass_debug_summary_remains_diagnostic_only
grass_validation_failures_surface_as_invalid_plan_descriptor_rows
```

## Minimum implementation source target

```txt
src/render-parity/collect-expected-render-descriptors.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/compare-render-descriptor-parity.js
src/render-parity/create-grass-consumption-rows.js
```

## Rule

Do not add more grass density, more card geometry, more patch variety, or more meadow clutter until the current descriptors produce visible readback rows.

A renderer that ignores grass descriptors should not silently pass.

A renderer that intentionally falls back should say so.

A renderer that has no snapshot should still produce a failed, stable, inspectable report.

## Acceptance criteria

```txt
render parity fixture creates a synthetic enhanced plan with grassSystem
fixture creates matching and mismatching synthetic renderer snapshots
fixture verifies all grass row groups
GameHost exposes grass-related parity rows under renderParity.rows
existing visuals and renderer.render(plan) call remain unchanged
```
