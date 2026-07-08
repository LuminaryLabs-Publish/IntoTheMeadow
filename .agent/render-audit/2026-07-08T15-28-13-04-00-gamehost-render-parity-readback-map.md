# GameHost Render Parity Readback Map — IntoTheMeadow

**Timestamp:** `2026-07-08T15-28-13-04-00`

## Finding

The render path already carries enough information to prove descriptor consumption, but the proof is not currently normalized.

Current flow:

```txt
raw meadow render plan
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> renderer.getSnapshot?.()
  -> GameHost.getSnapshot().render
```

Missing flow:

```txt
raw meadow render plan
  -> enhanced render plan
  -> collect expected descriptors
  -> normalize renderer snapshot consumption
  -> compare descriptor parity
  -> GameHost.getSnapshot().renderParity
```

## GameHost splice point

Target file:

```txt
src/hosts/web-host.js
```

Current critical line:

```txt
const render = renderer.render(plan);
```

Next implementation should add:

```txt
const rendererSnapshot = renderer.getSnapshot?.();
const renderParity = compareRenderDescriptorParity({ plan, rendererSnapshot });
```

Then preserve existing output while adding:

```txt
getSnapshot: () => ({
  ...game.getSnapshot(),
  enhancedRenderPlan: lastPlan,
  render: rendererSnapshot,
  renderParity
})
```

## Required parity row shape

```txt
RenderParityRow
  id
  group
  descriptorPath
  expected
  status
  reason
  evidence
```

Allowed statuses:

```txt
consumed
unconsumed
unsupported
fallback-rendered
missing
```

Allowed reason families:

```txt
renderer-snapshot-absent
renderer-field-absent
renderer-does-not-report-consumption
descriptor-consumed
unsupported-by-current-renderer
fallback-rendered-by-current-renderer
enhanced-plan-descriptor-missing
```

## Required descriptor groups

```txt
objects
outlinePolicy
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
grassPatches
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Fixture requirements

The render parity fixture should run without DOM, Canvas, or Three.js.

It should pass a synthetic enhanced plan and synthetic renderer snapshots through the parity modules.

Fixture cases:

```txt
all expected descriptors reported consumed
renderer snapshot absent returns stable missing rows
renderer snapshot sparse returns missing-field rows
grass descriptors unsupported returns unsupported rows
fallback renderer returns fallback-rendered rows
bad enhanced plan returns enhanced-plan-descriptor-missing rows
```

## Stop line

Do not require the external renderer to immediately report every descriptor.

The first pass only needs honest classification and stable GameHost readback.