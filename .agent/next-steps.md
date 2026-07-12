# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T15-49-09-04-00`

## Summary

The next implementation boundary is to turn the existing DSK declaration catalog into a truthful runtime capability registry, then consume those capabilities through one minimal exploration loop. Extend the existing game, host and DSK owners; do not add a parallel framework.

## Plan ledger

**Goal:** prove one complete player-action transaction using resolved DSK providers, typed service results, atomic progression state and first-visible-frame acknowledgement.

- [ ] Add versioned service contracts to active DSK declarations.
- [ ] Add immutable provider identity, version, source and fingerprint.
- [ ] Replace empty `requires` lists with real capability dependencies.
- [ ] Add a provider registry and deterministic dependency graph.
- [ ] Define `DskInstallCommand` and per-kit `DskInstallResult`.
- [ ] Prepare executable services before publishing a capability generation.
- [ ] Run readiness probes and declared/offered/realized parity checks.
- [ ] Keep planned declarations unavailable at runtime.
- [ ] Add rollback and disposal for candidate provider generations.
- [ ] Add normalized keyboard/pointer/editor gameplay input samples.
- [ ] Add an idempotent gameplay command router.
- [ ] Implement player movement and terrain/path projection.
- [ ] Implement interaction-target queries and admitted inspection.
- [ ] Implement objective progression and exactly-once completion.
- [ ] Implement story trigger evaluation and sequence results.
- [ ] Project player feedback through the existing UI owner.
- [ ] Bind save consumption after committed gameplay revisions exist.
- [ ] Record `DskConsumptionReceipt` rows per command/service.
- [ ] Publish capability, gameplay, objective and story revisions.
- [ ] Correlate render/HUD output with the accepted gameplay result.
- [ ] Acknowledge the first visible gameplay frame.
- [ ] Add Node provider/dependency/rollback fixtures.
- [ ] Add deterministic movement/interaction/progression fixtures.
- [ ] Add browser and GitHub Pages gameplay smokes.

## Required install command

```txt
DskInstallCommand {
  commandId
  runtimeSessionId
  expectedCapabilityGeneration
  declarations[]
  providerCatalogRevision
  sourcePolicyRevision
}
```

## Required install result

```txt
DskInstallResult {
  status
  reason
  commandId
  declarationId
  providerId
  predecessorCapabilityGeneration
  capabilityGeneration
  declaredServices[]
  offeredServices[]
  realizedServices[]
  missingServices[]
  dependencyResults[]
  readinessResults[]
  failures[]
}
```

## Required gameplay command

```txt
GameplayCommand {
  commandId
  sessionId
  capabilityGeneration
  expectedGameplayRevision
  action
  payload
}
```

## Required consumption receipt

```txt
DskConsumptionReceipt {
  commandId
  capabilityGeneration
  kitId
  providerId
  serviceId
  invocationId
  inputFingerprint
  resultFingerprint
  stateRevisionBefore
  stateRevisionAfter
  status
}
```

## Minimal playable slice

```txt
1. Normalize WASD or editor movement commands.
2. Move the player deterministically over the terrain/path.
3. Derive pathProgress from committed movement.
4. Emit path-discovery once at 0.25.
5. Complete walk-the-path once at 0.35.
6. Query focal-tree range from committed transforms.
7. Admit inspect-tree only with valid target evidence.
8. Emit focal-tree story result and complete inspect-tree once.
9. Project feedback and acknowledge the first visible frame.
10. Save only committed gameplay revisions.
```

## Capability truth rules

```txt
declared != installed
validated != ready
installed != active
active != consumed
planned declarations expose no callable capability
no active capability without provider identity and readiness proof
no gameplay commit without service consumption receipts
```

## Updated architecture order

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
2a. Editor Bridge Lifecycle and Error Journal Authority
3. Runtime Clock and Step Admission Authority
4. Source Provider Authority
5. Render Topology, Context, Surface and Program Authorities
6. Committed Frame and Failure Recovery Authorities
7. Adaptive Quality and Grass Visibility Authorities
8. DSK Runtime Consumption Authority
8a. Interaction Command and Objective Progression Authority
8b. Audio Activation and Lifecycle Authority
8c. Persistence Continuity Authority
9. Deterministic Replay Validation Authority
```

The full 44-kit service map remains in the current tracker and machine registry.