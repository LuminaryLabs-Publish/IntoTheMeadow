# Render Audit — Render Parity Contract Map

**Timestamp:** `2026-07-08T12-21-20-04-00`

## Render surface

`IntoTheMeadow` has a visual/render surface.

The live host sends an enhanced render plan into an external WebGL renderer:

```txt
rawPlan = game.getRenderPlan(time)
plan = enhanceRenderPlan(rawPlan, { performance: rawPlan.style?.performance })
renderer.render(plan)
GameHost.getSnapshot() includes enhancedRenderPlan and renderer snapshot
```

## Current render descriptor sources

`src/game/enhance-render-plan.js` adds or changes these render descriptors:

```txt
objects without grass-blade clutter
focal tree enhancement
rock / small object outline policy
grassSystem
grassPatches
windField
postProcess
performance
stats.objectCount
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

Grass descriptors are especially important because the visual goal depends on texture-driven grass patches, static batches, draw groups, shader wind, and LOD being consumed or explicitly reported as unsupported.

## Current gap

The render path has rich descriptors, but no stable parity report.

The host currently stores the last enhanced plan and exposes the renderer snapshot, but it does not classify descriptor consumption.

Needed classifications:

```txt
consumed
unconsumed
unsupported
fallback
missing-from-plan
missing-from-renderer-snapshot
```

## Required parity report shape

```txt
renderParity = {
  id,
  timestamp,
  planId,
  rendererId,
  expectedDescriptors,
  consumedDescriptors,
  unconsumedDescriptors,
  unsupportedDescriptors,
  fallbackDescriptors,
  failures,
  passed
}
```

## Descriptor inventory to track first

```txt
grassSystem.type
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassSystem.validation
windField
postProcess
performance.profile
performance.budgets
performance.outlinePolicy
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Fixture rows needed

```txt
1. enhanced plan has grassSystem and renderer snapshot reports grass support
2. enhanced plan has grassSystem and renderer snapshot has no grass fields
3. enhanced plan has postProcess and renderer snapshot explicitly marks unsupported
4. enhanced plan has windField and renderer snapshot consumes wind metadata
5. fallback renderer snapshot still returns stable unsupported reasons
```

## Acceptance rule

The renderer does not need to consume every descriptor yet.

It must report every important descriptor as consumed, unsupported, or fallback with a stable reason.

Silent descriptor drop is the failure state.
