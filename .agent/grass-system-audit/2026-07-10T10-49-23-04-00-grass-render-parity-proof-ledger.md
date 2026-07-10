# Grass System Audit: Grass Render Parity Proof Ledger

**Timestamp:** `2026-07-10T10-49-23-04-00`

## Grass loop

```txt
render plan source
  -> createGrassDensityTextureKit
  -> createGrassClumpArchetypeKit
  -> createGrassStaticBatchKit
  -> createGrassDensityScalingKit
  -> createGrassPatchPlacementKit
  -> createGrassClumpInstancingRenderKit
  -> createGrassShaderWindKit
  -> createGrassLodPolicyKit
  -> createGrassDebugVisualizationKit
  -> grassSystem descriptor
  -> enhanced render plan
  -> renderer v2 aggregate snapshot
```

## Current grass services

```txt
density texture generation
clump card archetypes
static batch generation
patch placement
instanced draw groups
shader wind descriptor
LOD policy
debug summary
validation blocks for density, archetypes, batches, placement, drawGroups, wind, and lod
```

## Current gap

Grass source descriptors are rich, but source/render parity is not fixture-proven.

Missing proof rows:

```txt
density texture id and resolution consumed
static batch ids consumed
patch ids consumed
draw group card/instance totals consumed
shader wind consumed
LOD policy consumed
renderer snapshot evidence linked to grass rows
debug summary parity row
headless editor grass observation row
```

## Next target

Add `grass-consumption-ledger` rows that compare `grassSystem` source descriptors with renderer and GameHost readback. The gate should be DOM-free before any grass art tuning.
