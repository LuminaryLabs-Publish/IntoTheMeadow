# Render Audit: Static Profile and Physical Render Gap

**Timestamp:** `2026-07-12T07-19-47-04-00`

## Summary

Logical quality profiles declare terrain resolution, post-processing and content budgets, but the physical renderer does not consume those controls consistently. The visible frame cannot prove which quality policy produced it.

## Plan ledger

**Goal:** make every physical render decision cite one committed quality revision and return a frame receipt proving the applied terrain, grass, post and surface settings.

- [x] Inspect performance profiles and enhancer use.
- [x] Inspect cache identity and renderer submission.
- [x] Identify declared/physical mismatches.
- [ ] Add executable render-profile parity proof.

## Current gap

```txt
quality profile terrainResolution
  -> declared in meadow-performance-dsk
  -> enhancer hard-codes terrain segments to 96 x 124

quality profile postProcess
  -> declared true/false
  -> renderer always submits outline and color draws

maxGrassInstances
  -> calculated in policy
  -> not passed into the inspected grass construction path

runtime performance option
  -> accepted by enhancer
  -> omitted by web host
  -> not part of cache identity

visible frame
  -> reports counts and cache state
  -> reports no quality revision or budget result
```

## Required render result

```txt
QualityRenderResult {
  frameId
  qualityRevision
  qualityTier
  topologyKey
  surfaceRevision
  terrainResolution
  grassInstanceBudget
  grassInstancesSubmitted
  postProcessPolicy
  drawCount
  cpuFrameObservationId
  gpuFrameObservationId
  deadlineStatus
  validation
}
```

## Required proof

```txt
low tier disables or replaces the physical work its policy says is disabled
terrain resolution matches the committed tier
 grass count is bounded by the committed budget
quality transition invalidates topology exactly when required
renderer and enhancer cite the same quality revision
first frame after transition cites new quality and topology revisions
failed transition leaves the predecessor frame path intact
```

## Boundary

No visual output or runtime renderer behavior changed.