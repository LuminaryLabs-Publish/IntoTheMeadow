# Grass System Audit: Consumption Row Ledger

**Timestamp:** `2026-07-09T15-39-08-04-00`

## Current grass source path

```txt
enhanceRenderPlan(rawPlan)
  -> createGrassSystem(renderPlan, performance, wind)
  -> createGrassDensityTextureKit({ area, path, seed, resolution })
  -> createGrassClumpArchetypeKit({ cardCount: 64 })
  -> createGrassStaticBatchKit().createBatches(archetypes)
  -> createGrassDensityScalingKit({ quality })
  -> createGrassPatchPlacementKit({ patchSize: 8, densityScale })
  -> placement.createPatches({ area, densityTexture, staticBatches })
  -> createGrassClumpInstancingRenderKit().createDrawGroups({ staticBatches, patches })
  -> createGrassShaderWindKit(wind.state)
  -> createGrassLodPolicyKit()
  -> createGrassDebugVisualizationKit().createDebugSummary(...)
  -> stats: patch/staticBatch/drawGroup/instance/card counts
```

## Grass services in use

```txt
density texture service
  maps area/path to density channels and world bounds.

clump archetype service
  defines reusable clump/card archetypes.

static batch service
  creates reusable static batches from archetypes.

patch placement service
  distributes patches by density texture and scale policy.

instancing render service
  converts patches and static batches into draw groups.

shader wind service
  emits wind state for animated grass response.

LOD policy service
  declares quality/readability budget.

debug visualization service
  summarizes density, patches, batches, draw groups, and validation.
```

## Gap

The grass stack now produces the right kind of source descriptors, but no ledger proves renderer-side consumption of:

```txt
- density texture id/resolution/world bounds
- static batch ids and archetype card counts
- patch ids and instance counts
- draw group ids and card/instance totals
- shader wind application
- LOD policy selection
- fallback status for unsupported grass descriptors
```

## Next grass proof kit

```txt
grass-consumption-row-kit
  input: grassSystem, rendererSnapshot
  output: rows with id, source count, render count, status, mismatch reason, normalized volatile fields
```

This should be fixture-proven before increasing patch counts, changing grass materials, or replacing the renderer.
