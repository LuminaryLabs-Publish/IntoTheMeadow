# Render Audit — Render Consumer Readback Freeze

**Timestamp:** `2026-07-09T03-35-07-04-00`

## Current render loop

```txt
startWebHost()
  -> loadExternalKits()
  -> createIntoTheMeadowGame()
  -> createMeadowWebglRenderKit({ canvas })
  -> game.tick({ time, dt })
  -> rawPlan = game.getRenderPlan(time)
  -> plan = enhanceRenderPlan(rawPlan, { performance })
  -> lastPlan = plan
  -> render = renderer.render(plan)
  -> debug HUD reads diagnostics and render.vertexCount
  -> GameHost snapshot exposes enhancedRenderPlan and renderer.getSnapshot?.()
```

## Current render descriptors

`enhanceRenderPlan()` emits these render-facing descriptor families:

```txt
objects
object renderStyle / outlinePolicy
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

## Render consumer gap

The external renderer receives the enhanced plan, but the app does not yet produce a stable report that classifies descriptor consumption.

The missing report should separate:

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

## Exact splice point

The next implementation should splice after this line in `src/hosts/web-host.js`:

```txt
const render = renderer.render(plan);
```

It should compute a report from:

```txt
expected = collectExpectedRenderDescriptors(plan)
actual = normalizeRendererSnapshotConsumption(renderer.getSnapshot?.())
report = createRenderParityReport({ expected, actual, render })
```

Then expose the report additively through host snapshot state.

## Required readback rows

```txt
render-plan-object-count
render-style-outline-policy
wind-field-state
post-process-stack
performance-policy
grass-density-texture
grass-static-batches
grass-patches
grass-draw-groups
grass-shader-wind
grass-lod-policy
grass-density-scale
grass-estimated-instances
grass-estimated-cards
renderer-snapshot-present
renderer-vertex-count
```

## Non-goals

```txt
Do not replace meadow-webgl-render-kit.
Do not remove enhancedRenderPlan.
Do not make missing renderer readback a hard crash.
Do not interpret unsupported renderer fields as visual failure.
Do not add browser-only validation before DOM-free parity rows exist.
```

## Next implementation files

```txt
src/render-parity/render-parity-reasons.js
src/render-parity/collect-expected-render-descriptors.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/create-grass-consumption-rows.js
src/render-parity/create-render-parity-report.js
src/render-parity/create-gamehost-render-parity.js
```

## Fixture rows

```txt
renderer snapshot missing -> report passes compatibility with explicit missing-renderer-snapshot rows
renderer snapshot sparse -> missing fields classified row-by-row
grass density expected -> row exists even when renderer does not consume it
grass draw group count mismatch -> count-mismatch row
legacy enhancedRenderPlan -> unchanged
legacy render snapshot -> unchanged
```
