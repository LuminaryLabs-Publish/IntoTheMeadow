# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-12T00-49-48-04-00`

## Goal

Make performance sampling, quality decisions, budget allocation, render-plan replacement and visible-frame acknowledgement one authoritative transaction before claiming adaptive quality support.

## Plan ledger

- [ ] Preserve current meadow generation, visual composition and deterministic source topology.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete Host Capability Gateway and remove raw mutation bypasses.
- [ ] Complete Runtime Clock and Step Admission Authority.
- [ ] Complete Render Topology, Context Recovery, Surface Resolution and Committed Frame prerequisites.
- [ ] Upgrade `meadow-performance-dsk` from static profile lookup to an admitted quality owner.
- [ ] Define a versioned quality-profile schema and deterministic quality fingerprint.
- [ ] Reject unknown profiles instead of silently retaining an invalid label with high-profile behavior.
- [ ] Add post-frame CPU and optional GPU performance samples.
- [ ] Add elapsed-time windows, invalid-sample policy, visibility policy, hysteresis, cooldown and minimum residency.
- [ ] Add manual override and auto-quality commands through the shared capability gateway.
- [ ] Add quality transition IDs, revisions, expected-revision admission and idempotent results.
- [ ] Add one performance budget ledger covering grass, scatter, terrain, draw calls and drawing-buffer pixels.
- [ ] Enforce `maxGrassInstances` globally across patches and draw groups.
- [ ] Enforce `maxSmallScatterObjects` and remove hard-coded consumer-local limits.
- [ ] Bind `terrainResolution` to actual terrain segment topology.
- [ ] Bind `postProcess` to actual pass descriptors and draw submission.
- [ ] Bind quality to an explicit DPR/pixel-budget policy.
- [ ] Include quality revision and fingerprint in enhancer and renderer cache identity.
- [ ] Prepare render-plan and GPU-resource candidates detached from live authority.
- [ ] Commit all consumers atomically or roll back to the last-known-good quality.
- [ ] Add effective-quality observations to renderer, GameHost, browser editor and headless surfaces.
- [ ] Add first-visible-quality-frame acknowledgement.
- [ ] Add bounded sample, decision and transition journals.
- [ ] Add DOM-free cadence, budget, cache, rollback and stale-command fixtures.
- [ ] Add browser and Pages degrade/recovery smoke tests.
- [ ] Wire the fixture gate into `npm run check` or a dedicated acceptance command.

## Existing owners to update first

```txt
meadow-performance-dsk
grass-density-scaling-kit
grass-patch-placement-kit
grass-lod-policy-kit
meadow-scatter-dsk
post-process-stack-dsk
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
web-host-dsk
meadow-diagnostics-dsk
createRenderPlanEnhancer
GameHost capability gateway
browser editor bridge
Node headless environment
Runtime Clock and Step Admission Authority
Render Topology Identity Authority
WebGL Context Recovery Authority
Render Surface Resolution Authority
Committed Frame Observation Authority
Fatal Runtime Failure Recovery Authority
```

## Candidate coordinating kits

```txt
performance-sample-envelope-kit
performance-window-timebase-kit
quality-profile-schema-kit
quality-profile-admission-kit
quality-decision-policy-kit
quality-transition-command-kit
quality-transition-id-kit
quality-revision-kit
performance-budget-ledger-kit
grass-instance-budget-kit
scatter-budget-kit
terrain-resolution-policy-kit
post-process-quality-policy-kit
render-plan-quality-fingerprint-kit
quality-cache-invalidation-kit
quality-transition-prepare-kit
quality-transition-commit-kit
quality-transition-rollback-kit
effective-quality-observation-kit
quality-frame-ack-kit
quality-cadence-parity-fixture-kit
quality-budget-enforcement-fixture-kit
quality-transition-browser-smoke-kit
```

## Required profile contract

```txt
QualityProfile
  schemaId
  schemaVersion
  profileId
  outline policy
  grass instance/card ceilings
  flower, mushroom, rock, tree-line and small-scatter ceilings
  terrain segment policy
  post-process pass policy
  draw-call ceiling
  drawing-buffer pixel ceiling
  DPR range
  transition policy metadata
```

## Required commands

```txt
ListQualityProfiles
GetEffectiveQuality
SetQualityProfile
EnableAutoQuality
DisableAutoQuality
SetPerformanceBudgetOverride
ClearPerformanceBudgetOverride
ReevaluateQuality
```

Every mutation must resolve to one `QualityTransitionCommand` with session, renderer generation, surface revision, expected quality revision and transition ID.

## Required result

```txt
QualityTransitionResult
  commandId
  transitionId
  status
  reason
  predecessorQualityRevision
  committedQualityRevision
  requestedProfile
  effectiveProfile
  qualityFingerprint
  budgetLedgerFingerprint
  consumerResults
  topologyKey
  rendererGeneration
  surfaceRevision
  committedFrameId
```

## Required budget boundary

```txt
reserve before topology generation
  grass instances and cards
  flowers
  mushrooms
  rocks
  tree-line objects
  small scatter
  terrain vertices and triangles
  post-process passes
  draw calls
  drawing-buffer pixels

report after preparation
  reserved
  consumed
  dropped
  remaining
  violations
```

## Acceptance cases

```txt
all named profiles validate and fingerprint deterministically
unknown profile rejects before enhancement
same elapsed-time trace gives the same decision at 30, 60 and 120 Hz
hidden and suspended intervals do not trigger false degradation
stable slow trace degrades after declared evidence
stable fast trace recovers after declared evidence
alternating threshold trace does not thrash
all grass and scatter ceilings hold for adversarial source plans
terrain resolution follows the admitted profile
post-process and draw behavior follow the admitted profile
quality-only change invalidates enhancer and renderer topology exactly once
same quality revision reuses caches
duplicate transition returns the prior result
stale transition rejects without mutation
consumer preparation failure preserves the predecessor frame
context loss during transition returns one classified result
GameHost, browser editor and headless observations agree
first visible frame cites the committed quality revision
Pages proves degrade and recovery without leaks or duplicate RAF work
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
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
7b. Adaptive Quality and Performance Budget Authority
8. Interaction Command and Objective Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
```

Do not implement adaptive quality as a mutable profile variable or frame-count threshold. The boundary must use elapsed-time evidence, enforce every declared budget, replace consumers transactionally and prove the first visible frame under the committed quality revision.
