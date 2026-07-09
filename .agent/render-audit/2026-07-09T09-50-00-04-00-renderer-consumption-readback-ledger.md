# Render Audit — Renderer Consumption Readback Ledger

**Timestamp:** `2026-07-09T09-50-00-04-00`

## Render surface

`IntoTheMeadow` has a visual/render surface.

```txt
index.html
  -> canvas#scene
  -> src/hosts/web-host.js
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
```

## Current render behavior

`enhanceRenderPlan()` takes the external meadow-area render plan and adds repo-local descriptors before render submission.

Current enhanced outputs include:

```txt
grassSystem
grassPatches
windField
postProcess
performance
renderStyle / outline policy on selected objects
stats.objectCount
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

The host stores `lastPlan`, sends the enhanced plan into `renderer.render(plan)`, and exposes optional `renderer.getSnapshot?.()` through `GameHost.getSnapshot()`.

## Gap

There is no repo-local parity ledger that classifies what the external renderer consumed.

Missing row types:

```txt
expected descriptor row
renderer readback row
consumed descriptor row
unsupported descriptor row
missing descriptor row
sparse descriptor row
fallback-rendered row
grass descriptor row
```

## Required next readback contract

The next render proof should be additive and tolerate incomplete renderer snapshots.

```txt
collectRenderExpectations(enhancedPlan)
normalizeRendererSnapshot(renderer.getSnapshot?.())
classifyRenderConsumption(expectations, snapshot)
classifyGrassConsumption(enhancedPlan.grassSystem, snapshot)
createRenderConsumptionLedger({ plan, render, rendererSnapshot })
```

Expected result shape:

```txt
{
  id: "into-the-meadow.render-consumption-ledger",
  planId,
  rendererSnapshotStatus: "present" | "absent" | "sparse",
  rows: [...],
  grassRows: [...],
  summary: {
    expectedCount,
    consumedCount,
    unsupportedCount,
    missingCount,
    sparseCount,
    fallbackRenderedCount
  },
  validation: { passed, failures }
}
```

## Do not change yet

```txt
Do not replace meadow-webgl-render-kit.
Do not rewrite the visual style.
Do not change external CDN kit URLs.
Do not move renderer code into this publish repo permanently.
Do not block browser render on a missing optional renderer snapshot.
```

## Next proof rows

```txt
empty renderer snapshot -> classify as absent but non-fatal
sparse renderer snapshot -> classify known counts and mark unknown descriptors sparse
full enough renderer snapshot -> classify consumed descriptors
missing grass draw groups -> classify missing grass consumption
matching grass counts -> classify consumed grass rows
fallback meadow area plan -> classify fallback-rendered rows
```
