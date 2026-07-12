# Adaptive Quality and Budget Authority DSK Map

**Timestamp:** `2026-07-12T00-49-48-04-00`

## Goal

Define the domain boundary that turns performance observations into one admitted, budget-complete and visibly acknowledged quality revision.

## Current ownership

```txt
meadow-performance-dsk
  static profile lookup
  partial numeric budgets
  outline weights

createRenderPlanEnhancer
  constructs performance policy
  creates grass and post descriptors
  caches by source topology only

grass-density-scaling-kit
  maps a quality name to one density multiplier

grass-patch-placement-kit
  derives patch instance counts
  has no global budget ledger

post-process-stack-dsk
  creates pass descriptors from scene configuration
  does not consume performance.profile.postProcess

meadow-webgl-renderer-v2-kit
  applies DPR resize
  rebuilds on topology key
  always submits outline and color/fog draws

web-host-dsk
  owns RAF
  supplies no performance samples or quality commands
```

## Authority gaps

```txt
sample identity and monotonic timebase
visibility and suspension classification
elapsed-time performance window
quality decision result
hysteresis and cooldown
quality transition identity and revision
complete consumer budget ledger
profile-to-consumer bindings
quality-aware cache identity
staged topology/resource replacement
rollback to last-known-good quality
first visible quality-frame receipt
bounded transition journal
browser/headless parity fixtures
```

## Parent domain

```txt
meadow-adaptive-quality-budget-authority-domain
```

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
Render Surface Resolution Authority
Committed Frame Observation Authority
Fatal Runtime Failure Recovery Authority
```

## Candidate kit composition

```txt
performance-sample-envelope-kit
  sampleId, sessionId, frameId, timestamp, cpuMs, optional gpuMs, visibility

performance-window-timebase-kit
  elapsed-time windows, invalid sample policy, suspension policy

quality-profile-schema-kit
  canonical profile fields and consumer requirements

quality-profile-admission-kit
  validate profile name, version, ranges and supported consumers

quality-decision-policy-kit
  thresholds, hysteresis, cooldown, minimum residency and recovery policy

quality-transition-command-kit
  commandId, transitionId, expected revision, requested profile and reason

quality-transition-id-kit
  stable exactly-once transition identity

quality-revision-kit
  monotonically increasing effective-quality revision

performance-budget-ledger-kit
  named totals, reservations, consumption, dropped work and remaining budget

grass-instance-budget-kit
  enforce total grass instances/cards across patches and draw groups

scatter-budget-kit
  enforce flowers, mushrooms, rocks, tree line and small-scatter totals

terrain-resolution-policy-kit
  bind admitted quality to terrain segment topology

post-process-quality-policy-kit
  bind admitted quality to descriptor passes and actual draw submissions

render-plan-quality-fingerprint-kit
  fingerprint profile, budgets, consumers and effective topology

quality-cache-invalidation-kit
  include quality revision/fingerprint in enhancer and renderer cache identity

quality-transition-prepare-kit
  create detached candidate plan and consumer resource plan

quality-transition-commit-kit
  atomically activate plan, cache, resources and observations

quality-transition-rollback-kit
  preserve or restore the prior admitted quality and frame

effective-quality-observation-kit
  immutable decision, budget and consumer read model

quality-frame-ack-kit
  correlate transition, quality revision, plan, renderer and visible frame

quality-cadence-parity-fixture-kit
quality-budget-enforcement-fixture-kit
quality-transition-browser-smoke-kit
```

## Dependency direction

```txt
Runtime Session Lifecycle
  -> Runtime Clock and Step Admission
    -> Performance Sample Window
      -> Quality Decision
        -> Quality Transition Admission
          -> Budget Allocation
            -> Render Topology and Surface Preparation
              -> Consumer Prepare
                -> Atomic Commit or Rollback
                  -> Committed Frame Observation
                    -> GameHost / editor / capture read models
```

## Required invariants

```txt
one effective quality profile per quality revision
one canonical quality fingerprint per profile and consumer plan
all consumer budgets allocated before plan commit
no consumer may silently ignore a required profile field
quality-only topology changes rebuild exactly once
failed transitions cannot replace the last-known-good plan or frame
same elapsed-time samples produce the same decision across frame cadences
hidden and suspended intervals cannot masquerade as slow frames
duplicate transition IDs return the previous result
stale session, surface, renderer or quality revisions reject before mutation
```

## Ordered implementation position

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
