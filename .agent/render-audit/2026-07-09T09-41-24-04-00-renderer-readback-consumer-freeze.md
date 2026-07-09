# Render Audit — Renderer Readback Consumer Freeze

**Timestamp:** `2026-07-09T09-41-24-04-00`

## Current render path

```txt
game.getRenderPlan(time)
  -> raw external meadow-area render plan
  -> enhanceRenderPlan(rawPlan, { performance })
  -> local grass/wind/postprocess/performance/style descriptors added
  -> renderer.render(plan)
  -> optional renderer.getSnapshot?.() exposed through GameHost snapshot
```

## Current render descriptors

The enhanced plan can include:

```txt
objects
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

## Gap

The renderer is a consumer, but the repo has no local ledger that proves the consumer recognized each descriptor family. Debug HUD currently prints only validation status, DSK count, object count, patch count, and returned `vertexCount`.

## Required next readback rows

```txt
render-plan-present
renderer-snapshot-present
object-count-parity
unsupported-object-types
postprocess-consumed-or-ignored
wind-consumed-or-ignored
performance-policy-consumed-or-ignored
grass-system-present
grass-patches-count-parity
grass-draw-groups-count-parity
grass-estimated-instance-parity
fallback-renderer-path
empty-renderer-snapshot-path
sparse-renderer-snapshot-path
```

## Non-goal

Do not change the external renderer or the visual meadow first. Freeze the consumer contract additively, then decide what needs renderer implementation.
