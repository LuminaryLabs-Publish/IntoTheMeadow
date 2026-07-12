# Performance Audit: Sampling, Hysteresis and Quality Commit Contract

**Timestamp:** `2026-07-12T07-19-47-04-00`

## Summary

The current performance policy describes profiles and budgets but owns no measurements, transitions or receipts. This contract defines the missing authority without placing adaptive mutation inside the renderer.

## Plan ledger

**Goal:** convert performance from immutable configuration into a deterministic, observable and rollback-safe session authority.

- [x] Define sample and window identities.
- [x] Define budget and transition policy.
- [x] Define consumer prepare/commit/rollback.
- [x] Define diagnostics and visible-frame proof.
- [ ] Implement and execute.

## Sampling contract

```txt
PerformanceSample {
  sampleId
  runtimeSessionId
  frameId
  surfaceRevision
  qualityRevision
  visibilityState
  cpuFrameMs
  gpuFrameMs | unsupported
  deadlineMs
  descriptorCounts
  vertexCount
  drawCount
  topologyRebuilt
  observedAt
}
```

Samples enter a bounded rolling window. Decisions use documented percentiles and minimum sample counts. Hidden or throttled frames are excluded or classified under an explicit policy.

## Transition policy

```txt
overload downgrade:
  sustained percentile breach
  minimum sample count
  cooldown satisfied
  lower supported tier exists

headroom upgrade:
  sustained lower percentile margin
  longer confirmation window
  cooldown satisfied
  higher supported tier exists

single spike:
  record only
  no transition
```

## Consumer contract

```txt
grass: density, instance cap and LOD result
terrain: segment-resolution result
post: enabled pass and parameter result
surface: DPR/scale result when policy permits
renderer: draw-plan and cache result
diagnostics: detached committed observation
```

All required consumers prepare against the predecessor state. Commit is atomic under one `QualityRevision`. Failure preserves the predecessor and returns a rollback result.

## Cache contract

```txt
quality fields affecting topology participate in topology identity
runtime quality revision participates in enhancer admission
same source topology plus new topology-affecting quality triggers rebuild
uniform-only quality changes may reuse topology under a typed no-rebuild result
stale prepared plans cannot commit after reset/context/surface replacement
```

## Proof matrix

```txt
static low/medium/high/ultra profiles
auto sustained-overload downgrade
auto sustained-headroom upgrade
hysteresis around threshold
cooldown enforcement
GPU timer unsupported path
runtime quality change invalidates cache when required
consumer prepare failure
consumer commit failure and rollback
context loss during transition
surface resize during transition
first visible-frame quality receipt
browser and Pages performance smoke
```

## Boundary

Documentation only; no measured performance claim is made.