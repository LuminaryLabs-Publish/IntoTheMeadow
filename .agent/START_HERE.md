# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

**Last aligned:** `2026-07-12T00-49-48-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one commit-pinned external provider, 43 local declarations, immutable game state, a persistent WebGL renderer, browser editor capabilities and a Node headless-editor environment.

This pass isolates adaptive quality and performance-budget authority. `meadow-performance-dsk` is required and implementation-backed, but its profiles are static. Production defaults to `high`, records no frame-cost samples, applies only part of its declared budgets, ignores profile terrain/post fields and caches enhanced topology without quality identity.

## Plan ledger

**Goal:** turn measured performance into one cadence-independent, budget-complete and rollback-safe quality transition whose identity reaches the first visible frame.

- [x] Compare the complete accessible Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `IntoTheMeadow` as the oldest eligible repository.
- [x] Trace performance profiles, scene defaults, enhancer caching, grass/scatter budgets, terrain topology, post-processing, renderer draws and browser RAF.
- [x] Preserve the complete interaction loop, domain map, kit inventory and service map.
- [x] Define sample, window, decision, budget, transition, rollback, observation and visible-frame requirements.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files.
- [ ] Runtime implementation and executable adaptive-quality fixtures remain future work.

## Current interaction loop

```txt
browser boot
  -> load external meadow provider
  -> install local DSK descriptors
  -> create arrival-meadow plan
  -> construct renderer and enhancer
  -> expose GameHost and editor bridge
  -> begin RAF

first enhancement
  -> arrival scene supplies no performance profile
  -> policy defaults to high
  -> partial object limits and grass density applied
  -> terrain resolution hard-coded
  -> post stack created independently
  -> plan cached by source topology only

runtime frame
  -> tick with fixed dt and RAF absolute time
  -> enhancer reuses cached quality topology
  -> renderer submits outline and color/fog draws
  -> no performance sample or decision result

quality transition
  -> no command surface
  -> no quality revision or budget ledger
  -> no consumer prepare/commit/rollback
  -> no first visible quality-frame receipt
```

## Main finding

```txt
meadow-performance-dsk required: yes
production quality selection: implicit high
auto profile: static constant
frame-cost sampling: absent
elapsed-time decision window: absent
quality transition command/result: absent
quality-aware enhancer cache key: absent
maxGrassInstances enforcement: absent
maxSmallScatterObjects enforcement: absent
terrainResolution profile binding: absent
postProcess profile binding: absent
surface/DPR profile binding: absent
quality revision and fingerprint: absent
first visible quality-frame receipt: absent
```

## Required parent domain

```txt
meadow-adaptive-quality-budget-authority-domain
```

Core composition:

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

## Ordered implementation gates

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

## Read this pass first

```txt
.agent/trackers/2026-07-12T00-49-48-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T00-49-48-04-00.md
.agent/architecture-audit/2026-07-12T00-49-48-04-00-adaptive-quality-budget-dsk-map.md
.agent/render-audit/2026-07-12T00-49-48-04-00-quality-cache-consumer-frame-gap.md
.agent/interaction-audit/2026-07-12T00-49-48-04-00-quality-transition-admission-map.md
.agent/performance-audit/2026-07-12T00-49-48-04-00-sampling-budget-transition-contract.md
.agent/deploy-audit/2026-07-12T00-49-48-04-00-adaptive-quality-fixture-gate.md
```

A static profile object is not adaptive quality. Success requires measured evidence, complete budget enforcement, consumer-coherent transition, failure rollback and a visible frame that cites the committed quality revision.
