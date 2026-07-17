# Next Steps

**Updated:** `2026-07-17T08-45-46-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `save-capability-admission-durable-commit-migration-authority-audited`

## Summary

Implement the smallest truthful persistence path: an admitted adapter, versioned bounded payload, atomic verified slot commit, ordered migration, exact restore settlement and first restored frame acknowledgement.

## Intent

Prevent planned DSK metadata or diagnostic snapshots from being mistaken for durable save support.

## Checklist

### Capability admission

- [ ] Add an implementation manifest for `meadow-save-dsk`.
- [ ] Require an available adapter, save schema, migration registry and validation service.
- [ ] Publish `SaveCapabilityResult` with available, unavailable, degraded or failed status.
- [ ] Expose save commands only when capability admission succeeds.

### Save model

- [ ] Define a versioned `MeadowSaveEnvelope`.
- [ ] Project durable gameplay state only.
- [ ] Exclude render plans, diagnostics, WebGL state, browser errors and transient clocks.
- [ ] Bind product, build compatibility, slot, state revision and digests.
- [ ] Publish `SavePrepareResult`.

### Durable commit

- [ ] Add a slot registry and active slot lease.
- [ ] Write a temporary generation before replacing the accepted slot.
- [ ] Read back and verify payload and metadata digests.
- [ ] Classify security, quota, serialization, write, verification and replace failures.
- [ ] Publish `DurableSaveCommitResult` exactly once.

### Migration and restore

- [ ] Classify current, migratable, unsupported, corrupt and foreign saves.
- [ ] Add ordered idempotent migrations.
- [ ] Publish `SaveMigrationResult` and validate the target schema.
- [ ] Apply restored state once under a new runtime/session revision.
- [ ] Rebuild or invalidate state-dependent render data when required.
- [ ] Publish `RestoreApplyResult` and `FirstRestoredStateFrameAck`.

### Evidence

- [ ] Add save/reload/restore browser fixtures.
- [ ] Add overwrite, multi-slot, corruption, unsupported-version and migration fixtures.
- [ ] Add interrupted-write, quota/security and stale-command fixtures.
- [ ] Compare source, artifact and Pages persistence behavior.

## Required result

```txt
DurableSaveCommitResult {
  saveId
  slotId
  saveRevision
  schemaVersion
  runtimeGeneration
  stateRevision
  payloadDigest
  metadataDigest
  adapterId
  status
}
```

```txt
RestoreApplyResult {
  saveId
  slotId
  sourceSchemaVersion
  targetSchemaVersion
  migrationRevision
  restoredSessionId
  restoredStateRevision
  status
}
```

## Preserved dependencies

Capture correlation, adaptive quality, failure diagnostics, content integrity, release/cache coherence, accessibility, audio, shader admission, editor settlement, startup readiness, reset/replay, DSK admission, viewport ownership, WebGL recovery, frame scheduling, progression and grass visibility remain separate bounded work.