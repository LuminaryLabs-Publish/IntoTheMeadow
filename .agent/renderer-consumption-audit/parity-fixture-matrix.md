# Renderer Consumption Audit — Parity Fixture Matrix

**Timestamp:** `2026-07-08T06:10:03-04:00`

## Purpose

This audit turns the renderer descriptor-consumption problem into a fixture matrix that can be implemented without changing the public meadow route first.

The game already emits high-fidelity meadow intent. The next proof is whether the renderer consumes that intent or reports the gap explicitly.

## Current source seam

```txt
src/game/enhance-render-plan.js
  -> creates grassSystem
  -> exposes grassPatches alias
  -> creates windField
  -> creates postProcess
  -> creates performance profile/budgets/outlinePolicy
  -> removes grass-blade objects from enhanced object list
  -> adds grass patch/static batch/draw group/card/instance stats

src/hosts/web-host.js
  -> rawPlan = game.getRenderPlan(time)
  -> plan = enhanceRenderPlan(rawPlan)
  -> lastPlan = plan
  -> render = renderer.render(plan)
  -> GameHost snapshot exposes enhancedRenderPlan and renderer.getSnapshot?.()
```

## Target result object

```txt
RenderDescriptorParityResult
  id
  passed
  checkedAtFrame
  expectedDescriptors[]
  consumedDescriptors[]
  unconsumedDescriptors[]
  unsupportedDescriptors[]
  missingPlanDescriptors[]
  missingSnapshotFields[]
  fallbackDescriptors[]
  grass
    drawGroupsExpected
    drawGroupsRendered
    instancesExpected
    instancesRendered
    cardsExpected
    cardsRendered
    patchesExpected
    patchesRendered
  postProcess
    passesExpected
    passesExecuted
    unsupportedPasses[]
  wind
    windFieldExpected
    windUniformsBound
  renderStyle
    styledObjectsExpected
    styledObjectsConsumed
  reasons[]
```

## Expected descriptor collector

Collect from enhanced render plan:

```txt
plan.grassSystem
plan.grassSystem.densityTexture
plan.grassSystem.staticBatches
plan.grassSystem.patches
plan.grassSystem.drawGroups
plan.grassSystem.shaderWind
plan.grassSystem.lodPolicy
plan.grassPatches
plan.windField
plan.postProcess
plan.postProcess.passes
plan.performance
plan.performance.budgets
object.renderStyle
plan.stats.grassPatchCount
plan.stats.grassStaticBatchCount
plan.stats.grassDrawGroupCount
plan.stats.estimatedGrassInstances
plan.stats.estimatedGrassCards
```

## Renderer snapshot normalizer

Normalize from renderer snapshot when available:

```txt
snapshot.consumedDescriptors
snapshot.unsupportedDescriptors
snapshot.fallbackDescriptors
snapshot.grass.drawGroupsRendered
snapshot.grass.instancesRendered
snapshot.grass.cardsRendered
snapshot.grass.patchesRendered
snapshot.postProcess.passesExecuted
snapshot.postProcess.unsupportedPasses
snapshot.wind.windUniformsBound
snapshot.renderStyle.styledObjectsConsumed
snapshot.vertexCount
snapshot.objectCount
```

If the renderer snapshot has none of those fields, classify it as:

```txt
renderer-does-not-report-parity
```

## Reason catalog

```txt
accepted
renderer-snapshot-missing
renderer-does-not-report-parity
plan-descriptor-missing
snapshot-field-missing
descriptor-unimplemented
renderer-fallback-used
post-process-unsupported
grass-instancing-unsupported
grass-density-texture-unsupported
grass-static-batch-unsupported
grass-drawgroup-count-mismatch
grass-instance-count-mismatch
grass-card-count-mismatch
wind-uniform-unsupported
render-style-unsupported
count-mismatch
optional-descriptor-absent
```

## Fixture cases

```txt
case-01 all-descriptors-consumed
  plan: grassSystem + postProcess + windField + renderStyle + stats
  snapshot: matching consumedDescriptors and counts
  expected: passed true

case-02 renderer-snapshot-missing
  plan: enhanced descriptors present
  snapshot: null
  expected: passed false, reason renderer-snapshot-missing

case-03 renderer-does-not-report-parity
  plan: enhanced descriptors present
  snapshot: vertexCount only
  expected: passed false, reason renderer-does-not-report-parity

case-04 grass-drawgroups-unconsumed
  plan: grassSystem.drawGroups present
  snapshot: no grass draw group fields
  expected: passed false, grassSystem.drawGroups in unconsumedDescriptors

case-05 grass-count-mismatch
  plan: estimatedGrassInstances and estimatedGrassCards present
  snapshot: lower rendered counts
  expected: passed false, count-mismatch reasons

case-06 postprocess-unsupported
  plan: postProcess.passes present
  snapshot: unsupportedPasses contains pass ids
  expected: passed false unless unsupported is explicitly accepted by policy

case-07 wind-uniform-unsupported
  plan: windField and grassSystem.shaderWind present
  snapshot: no wind uniform report
  expected: passed false, reason wind-uniform-unsupported

case-08 renderstyle-unconsumed
  plan: objects include renderStyle tiers
  snapshot: no renderStyle consumption fields
  expected: passed false, reason render-style-unsupported

case-09 optional-descriptor-absent
  plan: optional descriptor intentionally absent
  snapshot: neutral
  expected: passed true if absent descriptor is optional and policy marks it optional

case-10 fallback-renderer-used
  plan: enhanced descriptors present
  snapshot: fallbackDescriptors reports primitive fallback rendering
  expected: passed false or warning depending on severity policy
```

## Implementation boundary

Allowed in `LuminaryLabs-Publish/IntoTheMeadow`:

```txt
src/render-parity/collect-expected-render-descriptors.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/compare-render-descriptor-parity.js
src/render-parity/render-parity-reasons.js
tests/render-parity-fixture-smoke.mjs
GameHost diagnostics projection inside web-host/game diagnostics
```

Reusable renderer changes still belong in:

```txt
LuminaryLabs-Agents/NexusRealtime-ProtoKits/protokits/meadow-webgl-render-kit
```

## Acceptance checklist

```txt
- [ ] DOM-free fixture can compare enhanced render plan and renderer snapshot.
- [ ] Missing renderer parity shape is reported explicitly.
- [ ] Grass draw group, patch, instance, and card counts are compared.
- [ ] Post-process expected/executed/unsupported passes are compared.
- [ ] Wind field and shader-wind support are compared.
- [ ] Render style consumption is compared.
- [ ] GameHost diagnostics exposes renderParity.
- [ ] npm run check includes the fixture.
```

## Stop condition

Stop after the parity fixture exists and reports current renderer limitations honestly.

Do not continue into visual grass renderer implementation until the fixture tells future renderer work what is missing.
