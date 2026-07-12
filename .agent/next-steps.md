# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-12T00-58-12-04-00`

## Goal

Replace the current adjacent-read check with a versioned deterministic replay gate that compares independent runtimes, provider/seed/content identity, normalized command/tick sequences, reset behavior and the first visible frame.

## Plan ledger

- [ ] Preserve current meadow generation, render topology, shaders and browser composition.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete Host Capability Gateway and raw runtime quarantine.
- [ ] Complete Runtime Clock and Step Admission Authority.
- [ ] Complete Source Provider Authority and provider fingerprinting.
- [ ] Define an admitted canonical-value schema.
- [ ] Replace permissive `stableStringify()` with a versioned canonical serializer.
- [ ] Add provider, seed, content, scenario and checkpoint fingerprints.
- [ ] Add `ReplayScenario` and `ReplayResult` schemas.
- [ ] Construct independent runtime A and runtime B for every deterministic fixture.
- [ ] Ensure provider/cache instances are not shared across compared runs.
- [ ] Add normalized command and tick schedules.
- [ ] Add construction, intermediate and terminal checkpoints.
- [ ] Add reset-and-replay and stop/start scenarios.
- [ ] Add 30/60/120 Hz presentation schedules mapped to equal committed ticks.
- [ ] Compare fallback and external provider runs through an explicit parity classification.
- [ ] Add state, objective, story, source-plan and enhanced-plan fingerprints.
- [ ] Add exact first-divergence reporting.
- [ ] Add bounded replay journals and idempotent scenario execution.
- [ ] Route the same scenario/result semantics through Node, browser GameHost, browser editor and headless editor.
- [ ] Add first-visible-frame replay acknowledgement.
- [ ] Wire DOM-free replay fixtures into `npm run check`.
- [ ] Add browser and Pages replay smoke gates.

## Existing owners to update first

```txt
into-the-meadow-game-dsk
meadow-area-bridge-dsk
meadow-diagnostics-dsk
meadow-input-dsk
meadow-objective-dsk
meadow-story-dsk
meadow-render-host-dsk
web-host-dsk
browser editor bridge
Node headless editor environment
Runtime Session Lifecycle Authority
Runtime Clock and Step Admission Authority
Source Provider Authority
Committed Frame Observation Authority
```

## Candidate coordinating kits

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

## Replay scenario contract

```txt
ReplayScenario
  scenarioId
  schemaVersion
  manifestId
  manifestVersion
  providerId
  providerVersion
  providerFingerprint
  seedPolicyId
  seed
  contentFingerprint
  initialStateFingerprint
  commandSequence
  tickSchedule
  checkpointPolicy
```

## Required checkpoints

```txt
construction
first committed tick
path-progress transition
objective completion
inspect transition
story transition
pre-reset terminal state
post-reset initial state
replayed terminal state
first visible frame
```

## Acceptance matrix

```txt
same fallback provider + same seed + same scenario
same external provider + same seed + same scenario
fallback/external explicit parity classification
same commands at 30, 60 and 120 Hz presentation cadence
reset then replay
stop/start then replay
browser versus Node headless
changed seed negative control
changed provider negative control
changed command order negative control
changed content revision negative control
canonical-value rejection cases
first-divergence path and tick
state/render/frame fingerprint correlation
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
9a. Deterministic Replay Validation Authority
```

Do not treat two equal adjacent reads as deterministic replay. The next implementation must create independent runtimes, admit canonical scenarios, compare checkpointed projections and identify the first exact divergence.