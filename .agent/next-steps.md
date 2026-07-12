# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T23-10-51-04-00`

## Goal

Make save, reload, migration, reset and hydration pass through one versioned persistence transaction before game state, diagnostics, renderer observations or the visible frame claim resumed continuity.

## Plan ledger

- [ ] Preserve current meadow generation, render topology, shaders and browser composition.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete Host Capability Gateway and remove raw game mutation bypasses.
- [ ] Complete Runtime Clock and Step Admission Authority.
- [ ] Complete Committed Frame Observation and Fatal Runtime Recovery prerequisites.
- [ ] Upgrade `meadow-save-dsk` from planned descriptor to implementation-backed owner.
- [ ] Define a versioned `MeadowSaveEnvelope` and canonical persistable-state boundary.
- [ ] Add slot registry, checkpoint ID, state revision and reset epoch.
- [ ] Add integrity fingerprint and content-manifest identity.
- [ ] Add browser persistence capability with typed storage failure classification.
- [ ] Route browser UI, GameHost, browser editor and headless editor through shared commands.
- [ ] Implement atomic save write and read-back verification.
- [ ] Parse and classify every candidate independently.
- [ ] Add deterministic candidate precedence.
- [ ] Add pure ordered migrations and migration history.
- [ ] Reconcile scene, objective, story and content identities before hydration.
- [ ] Prepare hydration state detached from the live graph.
- [ ] Commit state atomically or preserve the predecessor.
- [ ] Rebuild or invalidate derived render state explicitly.
- [ ] Add first-visible-frame acknowledgement for hydrated checkpoints.
- [ ] Define reset, new-game and clear-slot persistence policies.
- [ ] Add bounded persistence journal and diagnostics.
- [ ] Add DOM-free, browser and Pages reload fixtures.
- [ ] Wire persistence fixtures into `npm run check` or an explicit acceptance gate.

## Existing owners to update first

```txt
meadow-save-dsk
into-the-meadow-game-dsk
web-host-dsk
meadow-diagnostics-dsk
GameHost capability gateway
browser editor bridge
Node headless environment
Runtime Session Lifecycle Authority
Runtime Clock and Step Admission Authority
Committed Frame Observation Authority
Fatal Runtime Failure Recovery Authority
```

## Candidate coordinating kits

```txt
save-schema-descriptor-kit
save-slot-registry-kit
checkpoint-id-kit
state-revision-kit
reset-epoch-kit
save-envelope-kit
save-integrity-fingerprint-kit
persistence-capability-kit
save-command-kit
save-admission-kit
save-write-result-kit
save-candidate-read-kit
save-candidate-classifier-kit
save-migration-kit
save-reconciliation-kit
hydration-plan-kit
hydration-commit-kit
hydration-rollback-kit
persistence-journal-kit
persistence-observation-kit
visible-frame-hydration-ack-kit
persistence-fixture-kit
browser-reload-continuity-smoke-kit
```

## Required save envelope

```txt
MeadowSaveEnvelope
  schemaId
  schemaVersion
  checkpointId
  slotId
  createdAt
  updatedAt
  gameManifestId
  gameManifestVersion
  contentRevision
  runtimeSessionId
  resetEpoch
  stateRevision
  payload
  migrationHistory
  integrityFingerprint
```

## Required commands

```txt
SaveCommand
  commandId
  runtimeSessionId
  resetEpoch
  expectedStateRevision
  slotId
  reason

LoadCommand
  commandId
  runtimeSessionId
  resetEpoch
  slotId or candidateId

DeleteCheckpointCommand
  commandId
  runtimeSessionId
  resetEpoch
  slotId
  expectedCheckpointId
```

## Required results

```txt
SaveResult
  commandId
  status
  reason
  slotId
  checkpointId
  schemaVersion
  stateRevision
  fingerprint
  writeVerified

HydrationResult
  commandId
  status
  reason
  checkpointId
  sourceSchemaVersion
  migratedSchemaVersion
  predecessorStateRevision
  committedStateRevision
  committedFrameId
```

## Persistable-state boundary

```txt
persist
  active scene identity
  player transform and progression state
  non-derivable world state
  objective completion ledger
  story beat ledger
  interaction receipts required for idempotency
  state revision and reset epoch

rebuild
  provider instances
  DSK descriptors and install snapshots
  render plans
  enhancer caches
  WebGL resources
  editor bridge objects
  derived diagnostics
```

## Acceptance cases

```txt
empty storage
valid current checkpoint
multiple valid slots with deterministic precedence
malformed JSON beside a valid checkpoint
unknown schema
migratable predecessor
content mismatch
integrity mismatch
storage denied
quota exceeded
write/read-back mismatch
duplicate and stale commands
reset versus load race
save versus load race
hydration validation failure
hydration rollback
browser reload continuity
headless envelope parity
first visible hydrated frame
Pages reload continuity
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
8. Interaction Command and Objective Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
```

Do not implement persistence as an unversioned `localStorage.setItem()` call. The required boundary admits canonical state, verifies durable storage, migrates and reconciles candidates, hydrates without partial mutation and correlates the result with the first visible frame.