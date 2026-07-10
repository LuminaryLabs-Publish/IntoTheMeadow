# Grass System Audit: Grass Render Consumption Journal

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T03-01-42-04-00`

## Current grass pipeline

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
  -> grassSystem descriptor on enhanced render plan
  -> meadow mesh builder / renderer v2 aggregate descriptorCounts
```

## Current grass readback

The enhanced render plan exposes:

```txt
grassSystem.id
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
contract.descriptorCounts
```

## Grass proof gaps

```txt
density texture rows are not compared against renderer readback.
static batch card counts are not proven against renderer state.
patch placement counts are not normalized into acceptance rows.
draw group card/instance totals are not tied to mesh contribution.
shader wind and LOD policy are descriptors but not renderer consumption rows.
grass debug summaries are useful but not a stable fixture contract.
headless editor observations do not emit grass parity rows.
```

## Needed rows

```txt
grass.densityTexture.created
grass.staticBatch.accepted
grass.patch.accepted
grass.drawGroup.accepted
grass.shaderWind.consumed
grass.lodPolicy.recorded
grass.debugSummary.projected
grass.rendererDescriptorCount.matched
grass.estimatedCards.matched
grass.headlessObservation.projected
```

## Next safe cut

Add `grass-consumption-ledger` as a source-owned proof layer. It should compare grass source descriptors to enhanced plan stats and renderer snapshot readback, then expose serializable rows through `GameHost` and a DOM-free smoke.

## Deferrals

Do not tune density, patch size, grass art, wind visuals, or renderer geometry until source/render parity rows exist.
