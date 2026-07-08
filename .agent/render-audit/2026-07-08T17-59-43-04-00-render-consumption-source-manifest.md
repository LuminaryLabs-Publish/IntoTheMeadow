# Render Audit — Render Consumption Source Manifest

**Timestamp:** `2026-07-08T17-59-43-04-00`

## Current render path

```txt
rawPlan = game.getRenderPlan(time)
plan = enhanceRenderPlan(rawPlan, { performance })
render = renderer.render(plan)
rendererSnapshot = renderer.getSnapshot?.()
GameHost.getSnapshot() currently includes enhancedRenderPlan and render snapshot
```

## Source read

`src/game/enhance-render-plan.js` emits richer descriptors than the external renderer is currently proven to consume.

Important emitted groups:

```txt
objects without grass-blade clutter
object renderStyle outline policy
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassSystem.debug
grassPatches
windField
postProcess
performance
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Current gap

`renderer.render(plan)` receives the enhanced plan, but the repo has no stable report proving whether each descriptor was:

```txt
consumed
unconsumed
unsupported
fallback-rendered
missing from renderer snapshot
missing from plan
invalid
```

This creates a silent failure mode where the game can look simpler than the descriptor stack intends while still returning a successful frame.

## Required render-consumption source manifest

```txt
src/render-parity/render-parity-reasons.js
  exports stable reason constants.

src/render-parity/collect-expected-render-descriptors.js
  extracts expected descriptor rows from enhanced plans.

src/render-parity/normalize-renderer-snapshot-consumption.js
  accepts renderer.getSnapshot?.() and returns stable consumed rows, unsupported rows, and fallback rows even when the renderer snapshot is sparse.

src/render-parity/compare-render-descriptor-parity.js
  joins expected rows to renderer consumption rows.

src/render-parity/create-render-parity-report.js
  builds a stable report with counts, pass/fail, rows, and frame metadata.

src/render-parity/project-render-parity.js
  creates compact GameHost-facing parity projection.
```

## Required row shape

```txt
RenderConsumptionRow
  id
  descriptorPath
  descriptorType
  expected
  consumed
  reason
  severity
  rendererField
  notes
```

## Required report shape

```txt
RenderParityReport
  id
  passed
  generatedAtFrame
  planId
  expectedCount
  consumedCount
  unsupportedCount
  fallbackCount
  missingCount
  rows[]
```

## GameHost projection target

Keep existing snapshot fields and add:

```txt
GameHost.getSnapshot().renderParity
GameHost.getState().renderParity
```

Do not remove:

```txt
GameHost.getSnapshot().enhancedRenderPlan
GameHost.getSnapshot().render
GameHost.getDiagnostics()
```

## Fixture rows for next implementation

```txt
1. renderer snapshot missing -> parity report returns unsupported/readback-absent rows and does not throw
2. enhanced plan has grassSystem -> expected rows include all grass descriptor groups
3. renderer snapshot reports consumed object count only -> object rows consumed, grass rows unsupported or unconsumed
4. renderer snapshot reports grass draw groups -> grass drawGroup rows consumed
5. postProcess unsupported -> postProcess row is unsupported, not missing
6. invalid descriptor path -> invalid-plan-descriptor row with failure severity
7. fallback renderer path -> fallback-rendered rows are classified separately from consumed rows
```

## Acceptance gate

The next source pass is complete when a DOM-free fixture can build an enhanced plan, fake at least three renderer snapshot variants, and produce stable report rows without creating a canvas or importing WebGL.
