# Render Audit — Render Readback Parity Contract

**Timestamp:** `2026-07-09T03-50-12-04-00`

## Current render loop

```txt
startWebHost
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> renderer.getSnapshot?.()
  -> GameHost.getSnapshot() exposes enhancedRenderPlan and render snapshot
```

## Current render descriptors

`enhanceRenderPlan()` adds:

```txt
objects without grass-blade clutter
grassSystem
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

## Missing readback contract

There is no source-owned report that compares expected descriptors from the enhanced plan with actual renderer consumption.

The next pass should add:

```txt
RenderParityReason
ExpectedRenderDescriptor
RendererConsumptionSnapshot
RendererSnapshotAbsenceAdapter
RenderParityRow
RenderParityReport
GrassConsumptionRow
```

## Required row shape

```txt
RenderParityRow {
  id
  descriptorType
  descriptorId
  expectedCount
  actualCount
  reason
  passed
  details
}
```

## Required reasons

```txt
consumed
unconsumed
unsupported
fallback-rendered
missing-renderer-snapshot
missing-renderer-field
invalid-plan-descriptor
count-mismatch
not-applicable
```

## Required fixture cases

```txt
renderer snapshot absent -> rows classify missing-renderer-snapshot
renderer snapshot sparse -> rows classify missing-renderer-field
base object count equal -> consumed
base object count mismatch -> count-mismatch
grass density texture missing -> unconsumed or unsupported
grass draw group mismatch -> count-mismatch
post process unsupported -> unsupported
legacy snapshot fields preserved -> consumed/compatibility row
```

## Additive host projection

Do not replace existing `GameHost` data.

Add:

```txt
GameHost.getSnapshot().renderParity
```

Optionally add:

```txt
GameHost.getState?.().renderParity
```

## Render non-goals

```txt
No visual rewrite.
No external CDN kit change.
No renderer hard-fork in this publish repo.
No browser-only validation before DOM-free parity fixtures exist.
```
