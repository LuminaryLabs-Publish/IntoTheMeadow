# Save Schema, Migration and Hydration Contract

**Timestamp:** `2026-07-11T23-10-51-04-00`

## Current state

```txt
save DSK descriptor: present
runtime save implementation: absent
save envelope: absent
slot registry: absent
browser storage adapter: absent
migration execution: absent
reconciliation execution: absent
hydration transaction: absent
persistence journal: absent
reload fixture: absent
```

## Canonical save envelope

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

## Canonical payload

Persist only domain state required to continue gameplay:

```txt
activeSceneId
player transform and progression-relevant state
world state that cannot be regenerated canonically
active objective
completed objective ledger
story beat ledger
interaction receipts required for idempotency
```

Do not persist:

```txt
functions
external provider instances
DSK descriptor objects
render plans
WebGL resources
renderer caches
browser editor bridge objects
live diagnostics caches
```

## Candidate classification

Every slot read must produce one typed classification:

```txt
empty
valid-current
valid-migratable
malformed
unsupported-schema
content-incompatible
integrity-failed
storage-unavailable
read-failed
```

One failed slot must not hide other valid candidates.

## Migration contract

```txt
source schema and fingerprint admitted
  -> run ordered pure migrations
  -> validate every intermediate version
  -> append migration history
  -> reconcile content identities
  -> produce a current-schema detached candidate
```

Migrations must not mutate live state or overwrite the source candidate before the successor is verified.

## Hydration contract

```txt
admit LoadCommand
  -> resolve exact candidate identity
  -> parse, validate, migrate and reconcile
  -> construct detached candidate state
  -> validate game invariants
  -> checkpoint predecessor live state
  -> commit one successor state revision
  -> invalidate derived render state explicitly
  -> render and acknowledge first hydrated frame
  -> publish HydrationResult
```

Failure before commit leaves the predecessor live state and visible frame unchanged. Failure after state commit routes through rollback or explicit quarantine.

## Reset and clear policy

Reset must be a domain command with an explicit persistence effect:

```txt
restart-run-and-retain-checkpoint
restart-run-and-supersede-checkpoint
clear-selected-slot
clear-all-slots
new-game-with-new-epoch
```

The current silent in-memory reset is insufficient once persistence exists.

## Storage behavior

The browser adapter must classify security, privacy, quota, serialization, write, read-back and deletion failures. Atomicity should use a temporary candidate plus verified promotion or another documented strategy supported by the selected storage backend.

## Required fixtures

```txt
empty storage
valid current checkpoint
malformed JSON
unknown schema
migratable predecessor
content mismatch
fingerprint mismatch
quota failure
write succeeds but read-back differs
multiple candidates with deterministic precedence
reset versus load race
load versus save race
hydration rollback
browser reload continuity
headless envelope parity
first visible hydrated frame
```

## Completion boundary

Persistence is complete only when checkpoint identity, schema compatibility, state revision and visible-frame evidence agree across save, reload, migration, hydration, reset and failure paths.