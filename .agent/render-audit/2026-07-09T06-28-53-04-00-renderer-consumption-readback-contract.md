# Render Audit — Renderer Consumption Readback Contract

**Timestamp:** `2026-07-09T06-28-53-04-00`

## Current render loop

```txt
raw meadow-area render plan
  -> enhanceRenderPlan(rawPlan)
  -> filtered objects with outline policy
  -> grassSystem descriptor
  -> grassPatches alias
  -> windField descriptor
  -> postProcess descriptor
  -> performance descriptor
  -> stats update
  -> renderer.render(plan)
  -> renderer.getSnapshot?.() exposed through GameHost snapshot
```

## Current render strengths

```txt
The enhanced plan is already descriptor-rich.
The grass stack has density, archetype, batch, placement, draw group, shader wind, LOD, density scaling, and debug descriptors.
The host stores the last enhanced plan.
The host exposes renderer snapshot readback if the external renderer provides it.
The debug HUD reports validation, object count, grass patch count, and renderer vertex count.
```

## Current render gaps

```txt
No expected descriptor collection.
No renderer consumption normalization.
No stable missing-renderer-snapshot result.
No sparse-renderer-snapshot result.
No consumed / unconsumed / unsupported / fallback-rendered classification.
No GameHost.renderParity branch.
No DOM-free fixture proving the parity rows.
```

## Required next contract

```txt
EnhancedRenderPlan
  -> collectExpectedRenderDescriptors(plan)
  -> normalizeRendererSnapshotConsumption(renderer.getSnapshot?.())
  -> createRenderParityReport({ expected, actual })
  -> createGrassConsumptionRows({ expected, actual })
  -> host renderParity snapshot
```

## Descriptor groups to classify

```txt
base objects
outline renderStyle
windField
postProcess
performance
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassSystem.debug
grassPatches
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Required reason catalog

```txt
consumed
unconsumed
unsupported
fallback-rendered
missing-renderer-snapshot
missing-renderer-field
invalid-plan-descriptor
count-mismatch
not-applicable
```

## Host splice point

Use `src/hosts/web-host.js` after:

```txt
const render = renderer.render(plan);
```

Do not remove existing fields from `GameHost`.

The new readback must be additive.

## Fixture rows

```txt
renderer snapshot absent -> passed false with missing-renderer-snapshot rows
renderer snapshot sparse -> passed false with missing-renderer-field rows
renderer snapshot complete but unsupported grass -> explicit unsupported rows
renderer consumes object descriptors -> consumed rows
grass draw group count mismatch -> count-mismatch row
legacy snapshot compatibility -> state/renderPlan/diagnostics still present
```

## Render finding

The route should not receive another visual pass until the renderer can prove what it consumed from the enhanced plan.

Visual additions are currently lower value than preventing silent descriptor drops.
