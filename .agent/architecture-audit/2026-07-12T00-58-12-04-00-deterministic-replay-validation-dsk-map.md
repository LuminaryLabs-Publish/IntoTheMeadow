# Deterministic Replay Validation DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-12T00-58-12-04-00`

## Goal

Assign deterministic construction, canonical projection, replay execution, divergence classification and observation to explicit owners without turning the renderer or smoke test into a second gameplay authority.

## Existing owners to update first

| Existing owner | Current service | Required extension |
|---|---|---|
| `into-the-meadow-game-dsk` | game manifest, state root, boot, snapshot | deterministic construction descriptor, replay-safe reset and scenario execution |
| `meadow-area-bridge-dsk` | source-provider adapter and area state | provider identity, source fingerprint and seed admission |
| `meadow-diagnostics-dsk` | determinism checks and smoke tests | replay results, first divergence and bounded evidence |
| `meadow-input-dsk` | normalized action declarations | sequenced replay input samples |
| `meadow-objective-dsk` | objective declarations | deterministic completion projection |
| `meadow-story-dsk` | story declarations | deterministic trigger projection |
| `meadow-render-host-dsk` | plan ingest and renderer state | render-plan fingerprint and replay-frame acknowledgement |
| browser/headless hosts | tick, reset, inspect and capture | shared scenario and result semantics |

## Parent domain

```txt
meadow-deterministic-replay-validation-authority-domain
```

The parent coordinates evidence only. It does not own meadow content, simulation rules, rendering or provider implementation.

## Candidate kits

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

## Scenario contract

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
  initialStateFingerprint
  commandSequence
  tickSchedule
  expectedCheckpoints
  expectedTerminalFingerprint
```

## Result contract

```txt
ReplayResult
  replayRunId
  scenarioId
  status
  reason
  providerFingerprint
  seedFingerprint
  committedTickCount
  stateFingerprint
  renderPlanFingerprint
  objectiveFingerprint
  storyFingerprint
  firstVisibleFrameId
  firstDivergence
  journalRange
```

## Required transaction

```txt
admit canonical scenario
  -> validate provider, content and seed identity
  -> construct two independent runtimes
  -> apply the same sequenced commands and normalized ticks
  -> capture canonical checkpoints
  -> reset and replay where required
  -> compare state, plan, progression and frame fingerprints
  -> return exact first divergence or deterministic success
  -> publish clone-safe bounded evidence
```

## Ownership rules

```txt
same-instance adjacent reads do not count as replay
provider identity is part of the scenario
fallback and production-provider results cannot be conflated
canonical values must be admitted before serialization
rejected or invalid scenarios produce no success fingerprint
browser RAF cadence is normalized before parity comparison
renderer observations consume committed replay identity
first divergence identifies domain, path, tick and fingerprints
```

## Implementation order

```txt
1. canonical value schema and serializer
2. provider and seed identity
3. independent runtime construction
4. scenario and tick schedule
5. state/render/progression fingerprints
6. reset and cadence replay
7. first divergence and journal
8. browser/headless and visible-frame proof
```