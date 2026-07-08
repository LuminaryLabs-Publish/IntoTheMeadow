# Render Audit — Render Parity Consumption Proof

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-08T13-50-37-04-00`

## Current render path

```txt
index.html canvas#scene
  -> startWebHost({ canvas })
  -> createMeadowWebglRenderKit({ canvas })
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> renderer.getSnapshot?.()
  -> GameHost.getSnapshot().render
```

## Render descriptors produced locally

`enhanceRenderPlan()` currently adds or rewrites these renderer-facing facts:

```txt
objects filtered for tiny clutter
objects with focal-tree / rock / tiny outline policy
 grassSystem.id
 grassSystem.type
 grassSystem.densityTexture
 grassSystem.staticBatches
 grassSystem.patches
 grassSystem.drawGroups
 grassSystem.shaderWind
 grassSystem.lodPolicy
 grassSystem.densityScale
 grassSystem.debug
 grassSystem.validation
 grassPatches
 windField
 postProcess
 performance.profile
 performance.budgets
 performance.outlinePolicy
 stats.objectCount
 stats.grassPatchCount
 stats.grassStaticBatchCount
 stats.grassDrawGroupCount
 stats.estimatedGrassInstances
 stats.estimatedGrassCards
```

The render plan is descriptor-rich enough to support a good meadow scene. The missing layer is not more descriptor production. The missing layer is proof that the external renderer consumed, skipped, rejected, or fallback-rendered the descriptors intentionally.

## Current readback gap

`web-host.js` exposes the last enhanced plan and renderer snapshot through `GameHost`, but the host does not compare them.

```txt
enhanced plan exists
renderer snapshot exists if renderer exposes getSnapshot()
render parity report does not exist
unsupported descriptor reasons do not exist
unconsumed grass descriptors are not visible
```

This means a visual regression can happen silently when a renderer version ignores a new descriptor.

## Required render parity result shape

```txt
RenderParityReport
  id
  planId
  rendererId
  rendererVersion
  checkedAtFrame
  expectedDescriptors[]
  consumedDescriptors[]
  unsupportedDescriptors[]
  fallbackDescriptors[]
  missingDescriptors[]
  unconsumedDescriptors[]
  warnings[]
  passed
```

## Required descriptor rows

```txt
ground.geometry
path.geometry
focal-tree.object
rock.outlinePolicy
small-object.outlinePolicy
windField
postProcess
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassSystem.debug
performance.budgets
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Stable reason catalog needed

```txt
CONSUMED_BY_RENDERER
CONSUMED_BY_FALLBACK
UNSUPPORTED_BY_RENDERER_VERSION
MISSING_FROM_RENDERER_SNAPSHOT
EXPECTED_DESCRIPTOR_ABSENT
RENDERER_SNAPSHOT_ABSENT
UNCONSUMED_DESCRIPTOR
IGNORED_BY_PERFORMANCE_POLICY
NOT_APPLICABLE_FOR_CURRENT_PLAN
```

## GameHost projection target

Additive only:

```txt
globalThis.GameHost.getSnapshot().renderParity
globalThis.GameHost.getSnapshot().enhancedRenderPlan
globalThis.GameHost.getSnapshot().render
```

Do not remove the current `state`, `manifest`, `renderPlan`, `diagnostics`, `enhancedRenderPlan`, or `render` fields.

## Fixture acceptance rows

```txt
1. enhanced plan includes grassSystem descriptors
2. descriptor collector sees densityTexture/staticBatches/patches/drawGroups/shaderWind/lodPolicy
3. renderer snapshot absent returns RENDERER_SNAPSHOT_ABSENT, not crash
4. renderer snapshot with known fields returns consumed rows
5. renderer snapshot missing grass readback returns unsupported or unconsumed rows
6. renderParity appears in GameHost snapshot
7. npm run check includes render parity fixture smoke
```

## Next safe ledge

```txt
IntoTheMeadow Render Parity Consumer Snapshot Fixture Gate
```

Implement the parity report before changing renderer visuals. The point is to make descriptor drop visible before expanding the meadow.
