# Render Audit: Static Quality Visible-Frame Gap

**Generated:** `2026-07-16T21-01-07-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The renderer can present a valid meadow frame without proving that its grass density, terrain resolution, outline weights, pixel ratio and post-processing eligibility came from one accepted quality decision.

## Current frame path

```txt
fixed high/default policy
  -> enhanced descriptor graph
  -> topology-only cache
  -> fixed terrain segments
  -> renderer-local DPR clamp
  -> two WebGL draw passes
  -> geometry/cache snapshot
```

## Visible mismatch risks

- `auto` can be displayed as selected while remaining a static profile.
- Runtime quality overrides can be ignored by the enhancer cache when topology is unchanged.
- Terrain resolution remains `96 x 124` for every profile.
- DPR remains independently clamped to `1..2`.
- Renderer snapshots do not identify quality generation, budget digest or transition reason.
- No acknowledgement proves the first frame after a quality change uses the replacement generation.

## Required frame contract

```txt
QualityProjectionResult
  qualityGeneration
  profile
  budgetDigest
  enhancerGeneration
  meshGeneration
  viewportGeneration
  pixelRatio
  status

FirstQualityBoundFrameAck
  frameId
  qualityGeneration
  renderPlanGeneration
  rendererGeneration
  presentedAt
```

## Boundary

No visual defect or frame-rate regression was reproduced. This is a source-derived projection and proof gap.
