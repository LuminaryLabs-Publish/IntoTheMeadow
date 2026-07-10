# Render Audit: Descriptor Count Echo vs Measured Consumption

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T15-18-29-04-00`

## Current render flow

```txt
source meadow plan
  -> enhanceRenderPlan
  -> meadow-render-plan/v2 contract
  -> buildMeadowMeshData
     -> atmosphere
     -> terrain
     -> grass
     -> flowers
     -> ground cover
     -> rocks
     -> distant trees
     -> focal tree
  -> WebGL buffer upload/reuse
  -> outline pass
  -> cel/fog pass
  -> aggregate renderer snapshot
```

## What is measured now

```txt
final vertexCount
final triangleCount
topologyKey
buffer rebuildCount
buffer cacheHitCount
cacheState
```

## What is echoed rather than measured

```txt
mesh.descriptorCounts = renderPlan.contract.descriptorCounts
renderer.descriptorCounts = mesh.descriptorCounts
```

These counts describe expected source descriptors, not successful consumer output.

## False-proof risk

`primitiveFallbackCount` is returned as constant `0`. That proves only that no counter is being incremented. It does not prove that no descriptor was skipped, ignored, unsupported, approximated, or collapsed into another geometry path.

The renderer snapshot therefore cannot answer:

```txt
Which descriptor family produced geometry?
Which source id was skipped?
Which family was absent?
How many vertices did each family emit?
Did expected counts match attempted counts?
Did an unsupported descriptor fail, fall back, or disappear?
```

## Required contribution rows

```txt
atmosphere
terrain
grass
flowers
ground-cover
rocks
distant-trees
focal-tree
```

Each row needs:

```txt
familyId
sourceId or deterministic source summary
expectedCount
attemptedCount
consumedCount
skippedCount
unsupportedCount
fallbackCount
emittedVertices
emittedTriangles
status
reason
```

## Instrumentation boundary

The mesh collector already owns the arrays. Add cheap counters around each stage:

```txt
beforeVertices = positions.length / 3
run stage
emittedVertices = positions.length / 3 - beforeVertices
emittedTriangles = emittedVertices / 3
```

Per-entry builders should return a decision row when they reject or fallback. The final ledger should validate that family totals sum to the final mesh totals.

## Compatibility rule

Keep existing renderer snapshot fields. Add:

```txt
expectedDescriptorCounts
measuredDescriptorCounts
contributionLedger
fallbackCount
```

Do not rename or remove `descriptorCounts` until downstream consumers have migrated.

## Next validation gate

A DOM-free test must inject complete, empty, malformed, and unsupported descriptor families and assert deterministic contribution rows plus total geometry reconciliation.