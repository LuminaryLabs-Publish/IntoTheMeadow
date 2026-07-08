# IntoTheMeadow Grass System Audit — Consumption Fixture Seams

**Timestamp:** `2026-07-08T10-48-47-04-00`

## Current grass authority

`IntoTheMeadow` has a strong local grass descriptor chain, but the source of truth is still metadata-first.

The local chain is:

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
  -> enhanceRenderPlan().grassSystem
```

## Current output shape

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
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Core gap

The publish repo can prove grass descriptor generation, but it cannot yet prove grass descriptor consumption.

Current source can say:

```txt
expected grass patches exist
expected draw groups exist
estimated cards exist
```

It cannot yet say:

```txt
renderer consumed draw groups
renderer instantiated clumps
renderer respected density texture
renderer used static batches
renderer bound wind uniforms
renderer applied LOD policy
renderer rendered estimated cards
renderer explicitly rejected unsupported grass descriptors
```

## Required readback fields

The renderer snapshot or normalized consumption report needs fields equivalent to:

```txt
grass.consumed
  densityTextureId
  staticBatchIds[]
  patchIds[]
  drawGroupIds[]
  instanceCount
  cardCount
  windUniformsBound
  lodPolicyId
  unsupported[]
  fallbackUsed
  reasons[]
```

If the external renderer cannot expose those fields yet, the local parity layer must classify them as missing or unsupported, not silently successful.

## Grass fixture rows

```txt
grass_no_descriptor_optional_pass
grass_descriptor_present_renderer_consumed_pass
grass_descriptor_present_snapshot_missing_fail
grass_drawgroup_missing_from_snapshot_fail
grass_static_batch_missing_from_snapshot_fail
grass_instance_count_mismatch_fail
grass_card_count_mismatch_fail
grass_wind_uniform_missing_warn_or_fail
grass_lod_policy_unsupported_reported
grass_fallback_renderer_reported
```

## Next implementation seam

Add grass checks inside the generic render parity fixture rather than creating a separate runtime pathway.

Recommended module split:

```txt
src/render-parity/collect-expected-render-descriptors.js
  owns expected grass descriptor extraction

src/render-parity/normalize-renderer-snapshot-consumption.js
  owns renderer grass consumption normalization

src/render-parity/compare-render-descriptor-parity.js
  owns mismatch classification and reason output
```

## Do not do next

```txt
- Do not add more grass descriptors before consumption parity exists.
- Do not increase grass density until card/instance readback exists.
- Do not move grass kits into NexusEngine or ProtoKits until the publish repo proves the fixture rows.
- Do not call grass production-ready based only on render-plan metadata.
```
