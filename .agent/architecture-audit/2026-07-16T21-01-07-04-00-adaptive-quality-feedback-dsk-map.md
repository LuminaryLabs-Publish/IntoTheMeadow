# Architecture Audit: Adaptive Quality Feedback DSK Map

**Generated:** `2026-07-16T21-01-07-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The performance DSK currently owns static profiles and budget derivation, but no domain owns observation, admission, transition or matching-frame proof. Quality meaning is split between the policy, enhancer, grass kits, hardcoded terrain tuning and renderer-local pixel-ratio policy.

## Existing ownership

```txt
meadow-performance-dsk
  -> quality name
  -> fixed profile
  -> grass/flower/tree-line budgets
  -> outline policy

game render-plan enhancer
  -> constructs performance snapshot
  -> applies grass density quality
  -> filters flowers and tree-line objects
  -> hardcodes terrain resolution
  -> caches by source topology

WebGL renderer
  -> clamps DPR independently
  -> publishes geometry/cache snapshot
  -> emits no timing or quality-generation result
```

## Missing parent authority

`meadow-adaptive-quality-feedback-projection-authority-domain`

## Proposed domain map

```txt
n:meadow:performance
├─ n:meadow:performance:capability
├─ n:meadow:performance:observation
│  ├─ frame-time
│  └─ render-cost
├─ n:meadow:performance:quality
│  ├─ profile-registry
│  ├─ admission
│  ├─ hysteresis
│  ├─ cooldown
│  └─ transition
├─ n:meadow:performance:budgets
│  ├─ grass
│  ├─ flowers
│  ├─ terrain
│  ├─ pixel-ratio
│  ├─ outlines
│  └─ post-process
├─ n:meadow:performance:cache-identity
├─ n:meadow:performance:diagnostics
└─ n:meadow:performance:proof
```

## Command/result ownership

```txt
PerformanceObservationCommand
  -> PerformanceObservationResult

QualityAdmissionCommand
  -> QualityAdmissionResult

QualityProjectionCommand
  -> QualityProjectionResult
  -> FirstQualityBoundFrameAck
```

## Admission invariants

- One quality generation is active per runtime/renderer generation.
- Observation windows are bounded and monotonic.
- Hysteresis and cooldown prevent oscillation.
- A quality-only change invalidates every affected enhancer and GPU dependency.
- The predecessor plan remains usable until the replacement validates and renders.
- Terrain, DPR, grass, flowers, outlines and post-processing identify the same quality generation.
- Stale transition work cannot replace a newer accepted generation.

## Boundary

This maps proposed ownership only. No existing DSK or renderer implementation changed.
