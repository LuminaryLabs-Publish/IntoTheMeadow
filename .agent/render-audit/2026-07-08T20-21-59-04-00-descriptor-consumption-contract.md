# Render Audit — Descriptor Consumption Contract

**Timestamp:** `2026-07-08T20-21-59-04-00`

## Current render path

```txt
raw meadow render plan
  -> enhanceRenderPlan(rawPlan)
  -> descriptor-rich enhanced plan
  -> renderer.render(plan)
  -> renderer.getSnapshot?.()
  -> GameHost enhancedRenderPlan + render snapshot
```

## Current render facts

`enhanceRenderPlan()` currently adds or normalizes:

```txt
objects filtered through tiny-clutter limits
focal-tree enhancement through tree-object-dsk
outline renderStyle on rocks and small objects
grassSystem
grassPatches
windField
postProcess
performance profile / budgets / outline policy
stats.objectCount
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

`web-host.js` currently calls:

```txt
const rawPlan = game.getRenderPlan(time);
const plan = enhanceRenderPlan(rawPlan, { performance: rawPlan.style?.performance });
lastPlan = plan;
const render = renderer.render(plan);
```

## Missing contract

There is still no report that maps enhanced-plan descriptors to renderer readback.

The missing artifact should be:

```txt
RenderParityReport
  id
  planId
  rendererId
  passed
  expectedCount
  consumedCount
  unconsumedCount
  unsupportedCount
  fallbackCount
  missingCount
  rows[]
```

## Row classification

Every descriptor row should be classified as one of:

```txt
consumed
unconsumed
unsupported
fallback-rendered
missing-renderer-snapshot
missing-renderer-field
invalid-plan-descriptor
count-mismatch
```

## Required descriptor groups

```txt
base objects
renderStyle / outline policy
windField
postProcess
performance profile and budgets
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassPatches
stats grass counts
```

## GameHost projection

Add parity additively.

Allowed projection:

```txt
GameHost.getSnapshot().renderParity
GameHost.getState?.().renderParity
```

Must preserve:

```txt
state
snapshot
diagnostics
enhancedRenderPlan
render
```

## Fixture requirement

The first fixture must not require a browser or WebGL context.

Minimum fixture rows:

```txt
enhanced plan with renderer snapshot -> consumed/fallback rows
enhanced plan with sparse snapshot -> missing field rows
enhanced plan with no snapshot -> missing-renderer-snapshot rows
grass counts mismatch -> count-mismatch rows
invalid descriptor -> invalid-plan-descriptor row
```

## Render finding

The current render system is descriptor-rich but not consumption-proven. The next implementation should prove descriptor readback and failure shape before any additional visual density, renderer extraction, or new meadow content.