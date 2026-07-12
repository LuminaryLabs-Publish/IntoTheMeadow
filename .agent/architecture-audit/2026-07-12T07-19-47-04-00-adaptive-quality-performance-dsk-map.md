# Architecture Audit: Adaptive Quality and Performance Authority

**Timestamp:** `2026-07-12T07-19-47-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

`meadow-performance-dsk` is required-v0.1 and exposes profile, budget, LOD, adaptive-scaling and validation services, but its current implementation is a static policy factory rather than a runtime authority. The browser host, enhancer, renderer, diagnostics and editor surface have no shared quality revision or transaction.

## Plan ledger

**Goal:** map the existing performance declarations into one DSK/domain boundary that observes frame cost, decides stable quality changes, prepares every affected consumer and commits one visible quality revision.

- [x] Identify existing owners.
- [x] Trace profile fields into render-plan enhancement.
- [x] Trace cache identity and physical draw behavior.
- [x] Identify missing observation, decision, commit and proof layers.
- [ ] Implement the domain and fixtures.

## Existing owners to update first

```txt
meadow-performance-dsk
web-host-dsk
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
meadow-diagnostics-dsk
grass-density-scaling-kit
grass-lod-policy-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
meadow-terrain-texture-dsk
post-process-stack-dsk
render-target-kit
into-the-meadow-game-dsk
game snapshot/read model
editor capability bridge
render surface authority
committed frame authority
```

## Parent domain

```txt
meadow-adaptive-quality-performance-authority-domain
```

## Candidate kits

```txt
performance-sample-id-kit
performance-capability-snapshot-kit
cpu-frame-time-observation-kit
gpu-timer-capability-kit
gpu-frame-time-observation-kit
frame-deadline-result-kit
rolling-performance-window-kit
performance-percentile-kit
performance-budget-policy-kit
quality-tier-id-kit
quality-revision-kit
quality-transition-command-kit
quality-transition-admission-kit
quality-hysteresis-kit
quality-cooldown-kit
quality-transition-result-kit
quality-topology-impact-plan-kit
grass-budget-adapter-kit
terrain-resolution-adapter-kit
post-process-policy-adapter-kit
surface-scale-adapter-kit
quality-plan-prepare-kit
quality-consumer-result-kit
quality-commit-kit
quality-rollback-kit
stale-quality-plan-rejection-kit
quality-frame-correlation-kit
performance-observation-kit
performance-journal-kit
adaptive-quality-fixture-kit
quality-oscillation-fixture-kit
browser-performance-profile-smoke-kit
```

## Required composition

```txt
frame and capability observations
  -> normalized PerformanceSample
  -> rolling percentile window
  -> named budget evaluation
  -> hysteresis and cooldown admission
  -> QualityTransitionCommand
  -> topology-impact plan
  -> prepare grass, terrain, post, surface and renderer consumers
  -> atomic QualityRevision commit or predecessor preservation
  -> cache invalidation/rebuild when topology changes
  -> first visible frame acknowledgement
  -> detached diagnostics and journal
```

## DSK layers

```txt
Layer 1: IntoTheMeadow product
Layer 2: adaptive quality and performance domain
Layer 3: meadow-adaptive-quality-performance-authority-domain
Layer 4: observation, policy, decision, transition, consumer, commit, proof
Layer 5: typed services and fixtures
```

## Invariants

```txt
auto is a controller policy, not a static profile alias
one sample cannot cause an unbounded quality oscillation
all affected consumers cite one quality revision
quality changes that alter topology invalidate the enhancer and renderer caches
partial consumer application cannot become visible
failed transitions preserve the predecessor quality revision
hidden or throttled frames follow an explicit sampling policy
first visible frame cites committed quality, surface and topology revisions
```

## Boundary

Documentation only. No performance implementation or measured result is claimed.