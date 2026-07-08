# Grass System Audit — Descriptor Readback Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-08T13-50-37-04-00`

## Current grass pipeline

```txt
enhanceRenderPlan(rawPlan)
  -> createGrassDensityTextureKit({ area, path, seed, resolution })
  -> createGrassClumpArchetypeKit({ cardCount: 64 })
  -> createGrassStaticBatchKit().createBatches(archetypes)
  -> createGrassDensityScalingKit({ quality })
  -> createGrassPatchPlacementKit({ patchSize: 8, densityScale })
  -> placement.createPatches({ area, densityTexture, staticBatches })
  -> createGrassClumpInstancingRenderKit().createDrawGroups({ staticBatches, patches })
  -> createGrassShaderWindKit(wind.state)
  -> createGrassLodPolicyKit()
  -> createGrassDebugVisualizationKit()
  -> grassSystem descriptor
```

## Descriptor facts that must be preserved

```txt
densityTexture.id
densityTexture.resolution
densityTexture.worldBounds
densityTexture.channels
staticBatches[].id
staticBatches[].cardCount
patches[].id
patches[].instances
drawGroups[].id
drawGroups[].instanceCount
drawGroups[].cardCount
shaderWind
lodPolicy
densityScale
debug summary
validation density/archetypes/batches/placement/drawGroups/wind/lod
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Main risk

The publish repo now creates high-level grass descriptors that look like a production grass pipeline, but there is no required renderer readback proving the external `meadow-webgl-render-kit` actually consumes them.

Silent drop modes:

```txt
renderer renders old object-list grass only
renderer ignores grassSystem entirely
renderer sees patches but ignores shaderWind
renderer sees drawGroups but ignores densityScale
renderer renders fallback cards but does not report fallback reason
renderer exposes vertexCount but no grass-specific consumption facts
```

## Required GrassReadback shape

```txt
GrassReadback
  planGrassSystemId
  rendererGrassSystemId
  densityTextureStatus
  staticBatchStatus
  patchStatus
  drawGroupStatus
  shaderWindStatus
  lodPolicyStatus
  densityScaleStatus
  estimatedInstanceCount
  renderedInstanceCount
  estimatedCardCount
  renderedCardCount
  reasons[]
  warnings[]
```

## Required acceptance rows

```txt
1. grassSystem exists on enhanced plan
2. density texture has resolution and world bounds
3. static batches exist and are non-empty
4. patches exist and are non-empty
5. draw groups exist and are non-empty
6. shader wind descriptor validates
7. LOD policy validates
8. renderer snapshot can be normalized with no crash when grass fields are absent
9. absent grass renderer fields produce stable unsupported or unconsumed reasons
10. GameHost snapshot exposes renderParity.grass
```

## Do not do in the next implementation

```txt
- do not add more grass density
- do not add more grass visual styles
- do not move grass kits to another repo yet
- do not tune colors before readback exists
- do not make renderer-specific assumptions that break fallback compatibility
```

## Next safe ledge

```txt
Grass Descriptor Readback + Render Parity Row Contract
```
