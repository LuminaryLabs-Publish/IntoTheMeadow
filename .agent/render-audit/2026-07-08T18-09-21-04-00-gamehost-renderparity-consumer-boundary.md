# Render Audit — GameHost RenderParity Consumer Boundary

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-08T18-09-21-04-00`

## Render surface read

The render surface is descriptor-rich but consumption-poor.

`enhanceRenderPlan(rawPlan)` produces high-fidelity descriptors, then `web-host.js` sends the enhanced plan to the external renderer.

The current host exposes:

```txt
GameHost.getSnapshot().enhancedRenderPlan
GameHost.getSnapshot().render
```

It does not expose:

```txt
GameHost.getSnapshot().renderParity
GameHost.getState().renderParity
```

## Current render flow

```txt
game.getRenderPlan(time)
  -> rawPlan
enhanceRenderPlan(rawPlan, { performance })
  -> plan with grassSystem, grassPatches, windField, postProcess, performance, stats
lastPlan = plan
renderer.render(plan)
  -> render result
renderer.getSnapshot?.()
  -> renderer snapshot if available
GameHost snapshot
  -> enhancedRenderPlan: lastPlan
  -> render: renderer.getSnapshot?.()
```

## Missing parity result

Target result shape:

```txt
RenderParityReport
  id
  planId
  rendererId
  passed
  generatedAtFrame
  expectedCount
  consumedCount
  unconsumedCount
  unsupportedCount
  fallbackCount
  missingCount
  rows[]
```

Target row shape:

```txt
RenderParityRow
  id
  group
  descriptorPath
  expected
  consumed
  status
  reason
  severity
  expectedCount
  actualCount
  notes[]
```

## Minimum descriptor groups to classify

```txt
objects
outlinePolicy
windField
postProcess
performance
grassSystem
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassPatches
stats.objectCount
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

## Required classification statuses

```txt
consumed
unconsumed
unsupported
fallback-rendered
missing-renderer-snapshot
missing-renderer-field
invalid-plan-descriptor
```

## Required fixture rows

```txt
missing_renderer_snapshot_reports_missing_snapshot
sparse_renderer_snapshot_reports_missing_fields
object_count_matches_consumed_snapshot
wind_field_reported_consumed_or_unsupported
post_process_reported_consumed_or_unsupported
grass_system_reported_consumed_or_unconsumed
grass_patch_count_mismatch_reports_unconsumed
grass_static_batch_count_mismatch_reports_unconsumed
grass_draw_group_count_mismatch_reports_unconsumed
estimated_grass_cards_mismatch_reports_unconsumed
fallback_renderer_classified_without_crash
empty_optional_descriptor_skips_without_failure
GameHost_snapshot_exposes_renderParity_additively
existing_enhancedRenderPlan_and_render_snapshot_shapes_remain
```

## Host consumer boundary

The exact implementation splice remains in `src/hosts/web-host.js` after `renderer.render(plan)`:

```txt
const render = renderer.render(plan);
const rendererSnapshot = renderer.getSnapshot?.();
const renderParity = createGameHostRenderParity({ plan, rendererSnapshot, render });
```

Do not move descriptor creation into the renderer.

Do not require the external renderer to support every descriptor before the report exists.

The report should be useful even when the external renderer snapshot is absent or sparse.

## GameHost target

```txt
window.GameHost.getSnapshot().renderParity
window.GameHost.getState?.().renderParity
```

If `GameHost.getState` does not currently exist in the host exposure layer, keep the change additive and only expose through the existing snapshot path until the host state path can be extended safely.

## Acceptance criteria

```txt
render parity fixture runs without DOM, canvas, WebGL, or external CDN imports
missing renderer snapshot returns a failed but well-formed report
sparse renderer snapshot returns a failed but well-formed report
known matching counts return passed rows
known mismatches return specific reason rows
web-host exposes renderParity without removing enhancedRenderPlan or render
npm run check includes render parity fixture
```
