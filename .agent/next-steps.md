# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T07-19-47-04-00`

## Summary

Implement one session-scoped adaptive-quality authority after runtime clock, render-surface and committed-frame foundations. It must convert frame and capability observations into stable quality transitions, apply every physical consumer under one revision and correlate the first visible frame with that committed result.

## Plan ledger

**Goal:** make `meadow-performance-dsk` an executable authority without introducing a second renderer, grass owner or surface owner.

- [ ] Define `PerformanceSample`, sample identity and capability evidence.
- [ ] Instrument CPU frame cost around tick, enhancement and rendering.
- [ ] Add optional GPU timer capability and typed unsupported result.
- [ ] Define rolling windows, percentiles, minimum samples and hidden-tab policy.
- [ ] Define named frame, topology, grass, terrain, post and surface budgets.
- [ ] Define `QualityTier` and monotonic `QualityRevision`.
- [ ] Make `auto` a controller policy rather than a static profile alias.
- [ ] Add hysteresis, asymmetric upgrade/downgrade windows and cooldown.
- [ ] Route manual and automatic changes through one command/result contract.
- [ ] Bind transitions to runtime, context, surface, topology and predecessor-quality revisions.
- [ ] Derive topology impact before mutation.
- [ ] Pass committed runtime quality into `createRenderPlanEnhancer`.
- [ ] Include topology-affecting quality fields in enhancer and renderer cache admission.
- [ ] Apply profile terrain resolution rather than hard-coded segment counts.
- [ ] Enforce committed grass instance and density budgets.
- [ ] Apply physical post-process/outline policy to submitted work.
- [ ] Add a surface-scale adapter only through render-surface authority.
- [ ] Prepare all required consumers without exposing partial state.
- [ ] Commit one quality revision or preserve/restore the predecessor.
- [ ] Reject stale prepared plans after reset, context loss or surface replacement.
- [ ] Publish clone-safe diagnostics and editor capability results.
- [ ] Acknowledge the first visible frame using quality, topology and surface revisions.
- [ ] Add deterministic policy, browser matrix and Pages fixtures.

## Required command

```txt
QualityTransitionCommand {
  commandId
  runtimeSessionId
  rendererGeneration
  predecessorQualityRevision
  targetTier
  reason
  performanceWindowId
  capabilitySnapshotId
  expectedTopologyKey
  expectedSurfaceRevision
}
```

## Required result

```txt
QualityTransitionResult {
  status
  reason
  commandId
  predecessorQualityRevision
  committedQualityRevision
  targetTier
  consumerResults
  topologyResult
  rollbackResult
  firstVisibleFrameId
}
```

## Required performance sample

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

## Acceptance matrix

```txt
manual low/medium/high/ultra parity
static profile logical/physical parity
auto sustained-overload downgrade
auto sustained-headroom upgrade
single-spike rejection
hysteresis around threshold
cooldown enforcement
GPU timer supported/unsupported paths
hidden-tab sample classification
quality topology rebuild only when required
grass and terrain budget enforcement
post-process physical-policy parity
consumer prepare failure
consumer commit failure and rollback
stale context/surface/quality plan rejection
editor/browser command parity
first visible-frame quality receipt
local browser and deployed Pages smoke
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
6c. Shader Precision Admission Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
7b. Adaptive Quality and Performance Budget Authority
7c. Grass Visibility and LOD Authority
7d. Audio Activation and Lifecycle Authority
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

Do not change quality directly from one RAF duration or from the renderer. Keep policy, admission and revision ownership in the performance domain, then adapt the existing enhancer, renderer, grass, terrain, post and surface owners.