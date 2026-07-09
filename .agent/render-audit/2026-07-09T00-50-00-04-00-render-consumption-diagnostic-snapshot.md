# Render Audit — Render Consumption Diagnostic Snapshot

**Timestamp:** `2026-07-09T00-50-00-04-00`

## Current render route

```txt
game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> renderer.getSnapshot?.()
  -> GameHost enhancedRenderPlan/render snapshot exposure
```

## Render descriptors emitted

`enhanceRenderPlan()` currently emits or preserves:

```txt
objects minus direct grass-blade objects
object renderStyle outline classes
focal-tree enhancement
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

## Missing render proof

The repo does not yet classify:

```txt
expected descriptor present
renderer consumed descriptor
renderer ignored descriptor
renderer does not support descriptor
renderer fallback-rendered descriptor
renderer snapshot absent
renderer snapshot sparse
count mismatch
invalid descriptor
```

## Required readback rows

The render parity report should produce rows for:

```txt
objects
outline render styles
windField
postProcess
performance profile
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassPatches
stats grass counts
```

## GameHost projection target

Expose the report additively:

```txt
GameHost.getSnapshot().renderParity
GameHost.getState?.().renderParity
```

Preserve:

```txt
enhancedRenderPlan
render
state
snapshot
diagnostics
```

## Fixture rows needed

```txt
render plan with all descriptors + renderer snapshot present
render plan with grass descriptors + renderer snapshot missing grass rows
render plan with grass descriptors + renderer snapshot absent
render plan with grass count mismatch
render plan with unsupported postProcess
render plan with unsupported windField
legacy host snapshot shape preserved
```

## Render finding

The high-risk bug class is silent descriptor drop.

The fix is not more visual detail; it is a first-class consumer snapshot and parity report that turns every unsupported or missing render feature into an explicit row.
