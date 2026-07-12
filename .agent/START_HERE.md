# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

**Last aligned:** `2026-07-12T00-58-12-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one commit-pinned external provider, 43 local declarations, immutable game state, a persistent WebGL renderer, browser editor capabilities and a Node headless-editor environment.

This pass isolates deterministic replay validation. The current deterministic smoke constructs one fallback-backed game and compares two adjacent reads of the same unchanged snapshot. It does not prove independent construction, production-provider determinism, tick/reset replay, cadence parity, browser/headless parity or visible-frame agreement.

## Plan ledger

**Goal:** replace same-instance read stability with canonical, provider-aware and checkpointed deterministic replay whose first divergence can be located and whose identity reaches the first visible frame.

- [x] Compare the complete accessible Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `IntoTheMeadow` because newer repo-local work required central reconciliation and it remained the oldest central entry.
- [x] Inspect deterministic validation, game construction, immutable state, snapshots, render-plan smoke and package checks.
- [x] Preserve the complete interaction loop, domain map, kit inventory and service map.
- [x] Define canonical serialization, scenario, replay, reset, cadence, divergence and visible-frame requirements.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files.
- [ ] Runtime implementation and executable deterministic-replay fixtures remain future work.

## Current interaction loop

```txt
browser boot
  -> load external meadow provider
  -> install local DSK descriptors
  -> create arrival-meadow plan
  -> construct renderer and enhancer
  -> expose GameHost and editor bridge
  -> begin RAF

runtime frame
  -> tick with fixed dt and RAF absolute time
  -> update immutable frame/lastTick state
  -> enhance and render meadow plan
  -> publish host/editor observations

deterministic smoke
  -> create one game without externalKits
  -> use local fallback provider
  -> read the same unchanged snapshot twice
  -> stableStringify both values
  -> compare two strings
  -> no tick, reset, second runtime or frame proof
```

## Main finding

```txt
same-instance read stability: proven
independent runtime determinism: unproven
external production provider: untested
seed/provider fingerprint: absent
tick sequence replay: absent
reset replay: absent
30/60/120 Hz parity: absent
browser/headless parity: absent
first divergence: absent
state/render/frame correlation: absent
```

`stableStringify()` sorts object keys but defines no canonical-value schema. Unsupported JavaScript values can lose semantic type, collide or throw.

## Required parent domain

```txt
meadow-deterministic-replay-validation-authority-domain
```

Core composition:

```txt
canonical-value-schema-kit
canonical-serializer-kit
determinism-fingerprint-kit
provider-identity-kit
provider-fingerprint-kit
seed-policy-kit
replay-run-id-kit
replay-scenario-schema-kit
replay-input-sequence-kit
replay-tick-schedule-kit
independent-runtime-construction-kit
replay-execution-kit
reset-replay-kit
cadence-normalization-kit
state-projection-fingerprint-kit
render-plan-fingerprint-kit
visible-frame-determinism-ack-kit
first-divergence-kit
replay-result-kit
determinism-journal-kit
same-seed-independent-build-fixture-kit
fallback-external-parity-fixture-kit
tick-reset-replay-fixture-kit
cadence-parity-fixture-kit
browser-headless-replay-fixture-kit
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
9a. Deterministic Replay Validation Authority
```

## Read this pass first

```txt
.agent/trackers/2026-07-12T00-58-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T00-58-12-04-00.md
.agent/architecture-audit/2026-07-12T00-58-12-04-00-deterministic-replay-validation-dsk-map.md
.agent/render-audit/2026-07-12T00-58-12-04-00-replay-state-render-frame-fingerprint-gap.md
.agent/gameplay-audit/2026-07-12T00-58-12-04-00-snapshot-read-versus-replay-loop.md
.agent/interaction-audit/2026-07-12T00-58-12-04-00-replay-scenario-admission-result-map.md
.agent/determinism-audit/2026-07-12T00-58-12-04-00-canonical-snapshot-replay-contract.md
.agent/deploy-audit/2026-07-12T00-58-12-04-00-deterministic-replay-fixture-gate.md
```

Two equal adjacent snapshots are not replay proof. Success requires independent runtimes, admitted provider/seed/content identity, normalized command and tick sequences, exact divergence evidence and a first visible frame that cites the replay checkpoint.