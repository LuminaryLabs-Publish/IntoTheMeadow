# Performance Audit: Capability and Frame-Feedback Quality Contract

**Generated:** `2026-07-16T21-01-07-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

`meadow-performance-dsk` provides useful static profiles, but its advertised adaptive-scaling service has no operating feedback contract. `auto` must become a policy mode, not a fifth immutable profile.

## Required observation model

```txt
PerformanceObservationResult {
  observationId
  runtimeGeneration
  rendererGeneration
  firstFrameId
  lastFrameId
  sampleCount
  cpuFrameP50Ms
  cpuFrameP95Ms
  renderP50Ms
  renderP95Ms
  droppedFrameRatio
  viewportPixels
  devicePixelRatio
  capabilityClass
  status
}
```

## Required quality result

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

## Policy requirements

- Use bounded rolling windows, not one-frame reactions.
- Use separate downgrade and upgrade thresholds.
- Require minimum profile residency.
- Treat hidden, frozen or background intervals separately.
- Preserve explicit manual profile requests unless invalid for capability.
- Resolve every profile into concrete grass, scatter, terrain, DPR, outline and post-process budgets.
- Include the quality generation in all affected cache and frame receipts.
- Expose diagnostics without allowing the renderer to decide simulation truth.

## Existing static profiles

```txt
low
medium
high
ultra
auto (currently static; should become policy mode)
```

## Proof matrix

```txt
sustained overload -> one bounded downgrade
single spike -> no downgrade
sustained headroom -> one bounded upgrade
ear-threshold jitter -> no oscillation
manual profile -> no autonomous override
quality-only change -> enhancer/GPU dependencies update
replacement failure -> predecessor remains visible
ack mismatch -> transition remains unsettled
```

## Boundary

Proposed contract only. No performance measurements or adaptive transitions were executed.
