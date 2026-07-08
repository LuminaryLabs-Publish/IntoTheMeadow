# Render Audit — Renderer Parity Readback

**Timestamp:** `2026-07-08T07:41:52-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Render path

```txt
src/hosts/web-host.js
  -> rawPlan = game.getRenderPlan(time)
  -> plan = enhanceRenderPlan(rawPlan, { performance })
  -> lastPlan = plan
  -> render = renderer.render(plan)
  -> GameHost snapshot exposes enhancedRenderPlan and renderer.getSnapshot?.()
```

## Enhanced descriptors emitted locally

`src/game/enhance-render-plan.js` currently emits:

```txt
grassSystem
  densityTexture
  staticBatches
  patches
  drawGroups
  shaderWind
  lodPolicy
  densityScale
  debug
  validation

grassPatches
windField
postProcess
performance
  profile
  budgets
  outlinePolicy
object.renderStyle
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Current proof gap

The source proves the enhanced plan is produced and handed to `renderer.render(plan)`.

The source does not prove the renderer consumes the high-fidelity descriptors.

Missing proof:

```txt
rendererSnapshot.consumedDescriptors
rendererSnapshot.unsupportedDescriptors
rendererSnapshot.fallbackDescriptors
rendererSnapshot.grass.drawGroupsRendered
rendererSnapshot.grass.instancesRendered
rendererSnapshot.grass.cardsRendered
rendererSnapshot.postProcess.passesExecuted
rendererSnapshot.wind.windUniformsBound
rendererSnapshot.renderStyle.styledObjectsConsumed
```

## Required parity result

```txt
RenderDescriptorParityResult
  passed
  checkedAtFrame
  expectedDescriptors[]
  consumedDescriptors[]
  unconsumedDescriptors[]
  unsupportedDescriptors[]
  missingPlanDescriptors[]
  missingSnapshotFields[]
  fallbackDescriptors[]
  grass.drawGroupsExpected
  grass.drawGroupsRendered
  grass.instancesExpected
  grass.instancesRendered
  grass.cardsExpected
  grass.cardsRendered
  postProcess.passesExpected
  postProcess.passesExecuted
  wind.windUniformsBound
  renderStyle.styledObjectsConsumed
  reasons[]
```

## Required fixture cases

```txt
case-01 all-descriptors-consumed
case-02 renderer-snapshot-missing
case-03 renderer-does-not-report-parity
case-04 grass-drawgroups-unconsumed
case-05 grass-count-mismatch
case-06 postprocess-unsupported
case-07 wind-uniform-unsupported
case-08 renderstyle-unconsumed
case-09 optional-descriptor-absent
case-10 fallback-renderer-used
```

## Renderer-side handoff

Publish repo implementation should stop at fixture proof and diagnostics projection.

Reusable renderer work belongs in:

```txt
LuminaryLabs-Agents/NexusRealtime-ProtoKits/protokits/meadow-webgl-render-kit
```

That kit must eventually report:

```txt
which descriptors it consumed
which descriptors it does not support
which fallback renderer paths were used
which grass draw groups became rendered instances/cards
which post-process passes executed or were explicitly skipped
which wind uniforms were bound
which renderStyle tiers affected object rendering
```

## Do not claim

Do not claim visual fidelity, dense grass, shader wind, post-process execution, or renderer parity from descriptor presence alone.

A renderer can receive a rich plan and still draw a primitive scene unless its snapshot reports consumption.