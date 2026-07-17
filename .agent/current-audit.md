# Current Audit: Adaptive Quality Feedback and Projection

**Updated:** `2026-07-16T21-01-07-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `adaptive-quality-feedback-projection-authority-audited`  
**Immediate predecessor:** `browser-failure-classification-bounded-diagnostic-projection-authority-central-reconciled`

## Summary

The performance layer has static profiles but no adaptive control loop. `auto` is fixed, the browser host observes no performance signal, quality identity is not part of enhancer cache admission, and the visible frame cannot prove which quality generation it presents.

## Intent

Converge observation, profile admission, budget projection, cache replacement and frame acknowledgement through one quality authority.

## Checklist

- [x] Compare Publish inventory and central tracking.
- [x] Select only IntoTheMeadow by oldest synchronized timestamp.
- [x] Inspect host, performance DSK, enhancer, cache and renderer.
- [x] Preserve all 44 kit surfaces and services.
- [x] Add the timestamped adaptive-quality audit family.
- [x] Change documentation only on `main`.
- [ ] Implement and prove the authority later.

## Main finding

```txt
static low/medium/high/ultra profiles: present
static auto profile: present
default quality: high
capability observation: absent
frame/render timing observation: absent
target-frame budget: absent
hysteresis/cooldown: absent
quality generation: absent
quality-only enhancer invalidation: absent
profile-bound terrain resolution: absent
profile-bound DPR: absent
quality transition result: absent
FirstQualityBoundFrameAck: absent
```

## Source basis

- `src/dsks/meadow-performance-dsk/index.js` treats `auto` as a fixed profile and defaults to `high`.
- `src/hosts/web-host.js` passes no runtime performance decision and collects no frame-cost signal.
- `src/game/enhance-render-plan.js` caches by source topology and hardcodes terrain segments.
- `src/renderers/meadow-webgl-renderer-v2.js` owns a fixed DPR clamp and emits no timing or quality receipt.

## Required parent domain

`meadow-adaptive-quality-feedback-projection-authority-domain`

## Required transaction

```txt
PerformanceObservationCommand
  -> PerformanceObservationResult

QualityAdmissionCommand
  -> QualityAdmissionResult

QualityProjectionCommand
  -> QualityProjectionResult
  -> FirstQualityBoundFrameAck
```

## Boundary

Documentation only. No runtime, renderer, package, test, workflow or deployment behavior changed.
