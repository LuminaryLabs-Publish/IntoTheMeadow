# Next Steps

**Updated:** `2026-07-16T21-01-07-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `adaptive-quality-feedback-projection-authority-audited`

## Summary

Turn `auto` into an actual policy mode. Add bounded performance observation, one accepted quality decision, concrete budget projection, cache-generation identity and matching-frame proof.

## Intent

Create the smallest reliable path from measured browser/render pressure to one settled quality generation without destabilizing simulation or repeatedly rebuilding presentation state.

## Checklist

### Observation

- [ ] Define bounded frame-time and render-cost sample windows.
- [ ] Record viewport pixels, DPR and capability class.
- [ ] Exclude hidden/frozen/background intervals from normal adaptation.
- [ ] Publish `PerformanceObservationResult`.

### Admission

- [ ] Treat `auto` as policy mode rather than a fixed profile.
- [ ] Define target frame time and minimum/maximum profiles.
- [ ] Add separate upgrade and downgrade thresholds.
- [ ] Add hysteresis, cooldown and minimum-residency policy.
- [ ] Publish `QualityAdmissionResult` with quality generation and reason.

### Projection

- [ ] Resolve concrete grass, flower, tree, terrain, DPR, outline and post-process budgets.
- [ ] Add quality generation to enhancer and renderer dependency keys.
- [ ] Replace fixed `96 x 124` terrain segments with admitted profile policy.
- [ ] Replace renderer-local DPR policy with an admitted pixel-ratio budget.
- [ ] Preserve the predecessor plan and buffers until replacement validation succeeds.

### Evidence

- [ ] Add overload, spike, headroom, hysteresis and cooldown fixtures.
- [ ] Add manual-profile and hidden-document fixtures.
- [ ] Add quality-only cache invalidation fixtures.
- [ ] Add terrain, DPR and budget projection fixtures.
- [ ] Compare source, built artifact and Pages behavior.
- [ ] Publish `FirstQualityBoundFrameAck`.

## Required result

```txt
QualityAdmissionResult {
  qualityGeneration
  mode
  previousProfile
  selectedProfile
  reason
  targetFrameMs
  budgetDigest
  hysteresisState
  cooldownUntilFrame
  predecessorGeneration
  status
}
```

## Preserved dependencies

Failure diagnostics, content-graph integrity, release/cache coherence, renderer identity, accessibility, audio, shader admission, editor settlement, post-processing, startup readiness, reset/replay, DSK admission, observation provenance, viewport, WebGL recovery, frame scheduling, progression, grass visibility and persistence remain separate bounded work.
