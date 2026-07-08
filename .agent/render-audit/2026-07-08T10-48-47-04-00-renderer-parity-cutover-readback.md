# IntoTheMeadow Render Audit — Renderer Parity Cutover Readback

**Timestamp:** `2026-07-08T10-48-47-04-00`

## Current render path

```txt
game.getRenderPlan(time)
  -> raw meadow-area render plan
  -> enhanceRenderPlan(rawPlan)
  -> texture-driven grass descriptors
  -> windField descriptor
  -> postProcess descriptors
  -> performance / outline policy descriptors
  -> renderer.render(enhancedPlan)
  -> renderer.getSnapshot()
  -> GameHost snapshot.render
```

## Render descriptors emitted by the publish repo

`src/game/enhance-render-plan.js` emits:

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
objects with renderStyle outline policy
stats.objectCount
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Missing readback boundary

The publish repo currently has no first-class parity layer between the enhanced plan and renderer snapshot.

That means future runs cannot prove whether the renderer:

```txt
consumed grassSystem.drawGroups
rendered expected grass instances
rendered expected grass cards
bound shader wind uniforms
executed post-process passes
applied outline/renderStyle tiers
used fallback rendering
ignored unsupported descriptors intentionally
ignored descriptors accidentally
```

## Required parity result contract

```txt
RenderParityResult
  id
  frame
  checkedAt
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
  postProcess.unsupportedPasses[]
  wind.windUniformsExpected
  wind.windUniformsBound
  renderStyle.styledObjectsExpected
  renderStyle.styledObjectsConsumed
  parityPassed
  reasons[]
```

## Stable reason catalog needed

```txt
renderer-snapshot-missing
renderer-consumption-report-missing
plan-descriptor-missing
snapshot-field-missing
grass-drawgroup-unconsumed
grass-instance-count-mismatch
grass-card-count-mismatch
postprocess-pass-unsupported
postprocess-pass-not-executed
wind-uniform-unbound
renderstyle-tier-unconsumed
fallback-renderer-used
optional-descriptor-absent
parity-passed
```

## Source-order cutover

```txt
1. Add src/render-parity/render-parity-reasons.js.
2. Add src/render-parity/collect-expected-render-descriptors.js.
3. Add src/render-parity/normalize-renderer-snapshot-consumption.js.
4. Add src/render-parity/compare-render-descriptor-parity.js.
5. Add tests/render-parity-fixture-smoke.mjs.
6. Update src/hosts/web-host.js to compute renderParity after renderer.render(plan).
7. Keep GameHost.getState(), GameHost.getRenderPlan(), GameHost.getSnapshot().enhancedRenderPlan, and GameHost.getSnapshot().render backward-compatible.
8. Add GameHost.getDiagnostics().renderParity without removing existing diagnostics fields.
9. Add GameHost.getSnapshot().renderParity without removing existing snapshot fields.
```

## Fixture rows

```txt
all_descriptors_consumed_positive
renderer_snapshot_missing_rejected
renderer_consumption_report_missing_rejected
grass_drawgroups_unconsumed_reported
grass_count_mismatch_reported
postprocess_unsupported_reported
wind_uniforms_unbound_reported
renderstyle_tiers_unconsumed_reported
fallback_renderer_reported
optional_absent_descriptors_do_not_fail
```

## Acceptance

The implementation is ready only when a DOM-free fixture can compare an enhanced render plan with a renderer snapshot and return explicit consumed/unconsumed/unsupported reasons.

Do not claim the meadow has production grass or post-processing parity until this readback exists.
