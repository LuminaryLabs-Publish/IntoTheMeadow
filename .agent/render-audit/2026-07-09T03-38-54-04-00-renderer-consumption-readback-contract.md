# Render Audit — Renderer Consumption Readback Contract

**Timestamp:** `2026-07-09T03-38-54-04-00`

## Current render path

```txt
src/hosts/web-host.js
  -> rawPlan = game.getRenderPlan(time)
  -> plan = enhanceRenderPlan(rawPlan, { performance })
  -> renderer.render(plan)
  -> exposeGameHost getSnapshot adds enhancedRenderPlan and renderer.getSnapshot?.()
```

## What is already strong

`enhanceRenderPlan()` produces a descriptor-rich plan.

It emits:

```txt
objects filtered by clutter policy
focal tree outline enhancement
rock / small-object outline policy
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

## Render gap

The route still cannot answer the important render question:

```txt
Did the renderer consume the descriptors the game emitted?
```

The current host exposes the enhanced plan and renderer snapshot side by side, but it does not classify descriptor consumption.

## Needed consumer readback contract

Add a pure render-parity layer that can operate without DOM/canvas:

```txt
collectExpectedRenderDescriptors(enhancedPlan)
normalizeRendererSnapshotConsumption(rendererSnapshot)
createGrassConsumptionRows(expected, actual)
createRenderParityReport({ expected, actual })
```

## Required reason rows

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

## Required GameHost projection

Expose additively:

```txt
GameHost.getSnapshot().renderParity
```

Allowed additional field:

```txt
GameHost.getState?.().renderParity
```

Do not remove:

```txt
state
snapshot
diagnostics
enhancedRenderPlan
render
```

## Browser-specific warning

The external `meadow-webgl-render-kit` may not expose a complete `getSnapshot` surface.

That must be treated as a stable compatibility row, not as a failed route and not as a silent pass.

## Next validation target

```txt
tests/render-parity-fixture-smoke.mjs
```

The fixture should run without DOM, canvas, WebGL, or the browser renderer.
