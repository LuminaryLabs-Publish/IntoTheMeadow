# Render Audit — Render Parity Fixture Wire Map

**Timestamp:** `2026-07-08T09:11:03-04:00`

## Current render loop

```txt
game.getRenderPlan(time)
  -> base meadow-area render plan
  -> enhanceRenderPlan(rawPlan)
  -> grassSystem / grassPatches / windField / postProcess / performance / stats descriptors
  -> renderer.render(plan)
  -> renderer.getSnapshot?.()
  -> GameHost.getSnapshot().render
```

## Current render truth

`enhanceRenderPlan()` already emits the important meadow fidelity descriptors:

```txt
grassSystem
grassPatches
windField
postProcess
performance
objects with renderStyle
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

`web-host.js` already stores the enhanced plan as `lastPlan`, calls `renderer.render(plan)`, and exposes the last enhanced plan plus renderer snapshot through `GameHost`.

The missing piece is not more descriptor emission.

The missing piece is a fixture-readable report that says what the renderer actually consumed.

## Required parity result

```txt
RenderDescriptorParityResult
  id
  timestamp
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

## Source wire map

### 1. Collect expected descriptors

Add:

```txt
src/render-parity/collect-expected-render-descriptors.js
```

Input:

```txt
enhancedRenderPlan
```

Output:

```txt
expectedDescriptors[]
expectedCounts
```

It should collect at least:

```txt
grassSystem
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
windField
postProcess.passes
performance.profile
performance.budgets
object.renderStyle
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

### 2. Normalize renderer snapshot consumption

Add:

```txt
src/render-parity/normalize-renderer-snapshot-consumption.js
```

Input:

```txt
rendererSnapshot
```

Output:

```txt
consumedDescriptors[]
consumedCounts
missingSnapshotFields[]
fallbackDescriptors[]
```

This module must not assume the renderer is advanced just because a snapshot exists.

It should explicitly detect:

```txt
missing renderer snapshot
snapshot exists but has no descriptor-consumption report
fallback renderer path
missing grass counts
missing post-process execution report
missing wind uniform report
missing renderStyle consumption report
```

### 3. Compare parity

Add:

```txt
src/render-parity/compare-render-descriptor-parity.js
```

Input:

```txt
enhancedRenderPlan
rendererSnapshot
```

Output:

```txt
RenderDescriptorParityResult
```

### 4. Stable reason catalog

Add:

```txt
src/render-parity/render-parity-reasons.js
```

Required reasons:

```txt
renderer-snapshot-missing
renderer-consumption-report-missing
grass-drawgroups-unconsumed
grass-instance-count-mismatch
grass-card-count-mismatch
postprocess-pass-unsupported
postprocess-execution-report-missing
wind-uniform-report-missing
renderstyle-consumption-report-missing
fallback-renderer-used
optional-descriptor-absent
parity-passed
```

### 5. GameHost projection

Update `src/hosts/web-host.js` only after the fixture modules exist.

Target projection:

```txt
GameHost.getDiagnostics().renderParity
GameHost.getSnapshot().renderParity
```

Keep existing fields stable:

```txt
GameHost.getState()
GameHost.getSnapshot().enhancedRenderPlan
GameHost.getSnapshot().render
GameHost.getRenderPlan()
```

## Fixture matrix

Add:

```txt
tests/render-parity-fixture-smoke.mjs
```

Cases:

```txt
all_descriptors_consumed
renderer_snapshot_missing
renderer_consumption_report_missing
grass_drawgroups_unconsumed
grass_instance_count_mismatch
grass_card_count_mismatch
postprocess_pass_unsupported
postprocess_execution_report_missing
wind_uniform_report_missing
renderstyle_consumption_report_missing
fallback_renderer_used
optional_descriptor_absent
```

## Acceptance

```txt
- Positive fixture passes only when expected descriptors are consumed or explicitly supported.
- Missing renderer snapshot fails with renderer-snapshot-missing.
- Snapshot without consumption report fails with renderer-consumption-report-missing.
- Grass drawGroup mismatch fails with grass-drawgroups-unconsumed.
- Post-process unsupported passes are classified explicitly.
- Wind and renderStyle consumption are not silently ignored.
- Optional absent descriptors do not create false failure.
- GameHost projection remains backward-compatible.
- npm run check includes the fixture after implementation.
```

## Do not do yet

```txt
- Do not add more grass descriptor types before parity is readable.
- Do not move local render proof into ProtoKits until fixture behavior is stable.
- Do not claim the public route has real high-fidelity grass until the renderer reports consumed drawGroups or unsupported reasons.
```
