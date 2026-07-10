# Grass System Audit: Grass Consumption Proof Row Gap

**Run:** `2026-07-10T06-30-49-04-00`

## Current grass source path

```txt
enhanceRenderPlan
  -> createGrassDensityTextureKit
  -> createGrassClumpArchetypeKit
  -> createGrassStaticBatchKit
  -> createGrassDensityScalingKit
  -> createGrassPatchPlacementKit
  -> createGrassClumpInstancingRenderKit
  -> createGrassShaderWindKit
  -> createGrassLodPolicyKit
  -> createGrassDebugVisualizationKit
  -> createMeadowRenderPlanV2
  -> renderer v2 aggregate readback
```

## Current strength

Grass descriptors are rich and already validate at descriptor level.

The render-plan smoke asserts density texture, static batches, patches, draw groups, and shader/postprocess descriptors exist.

## Gap

No grass proof ledger compares source descriptors against renderer readback.

Missing proof rows:

```txt
density texture row
static batch row
archetype card row
patch placement row
draw group instance row
shader wind consumption row
LOD policy row
density scaling row
debug summary parity row
renderer descriptor count parity row
```

## Next grass proof files

```txt
src/render-proof/grass-consumption-ledger.js
tests/grass-consumption-ledger-smoke.mjs
```

## Stop condition

Do not tune grass art, add more grass, or replace the renderer until the existing grass descriptors are fixture-proven against render readback.
