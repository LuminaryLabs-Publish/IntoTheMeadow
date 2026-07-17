# Save System Audit: Durable Slot and Migration Contract

**Timestamp:** `2026-07-17T08-45-46-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Persistence needs an immutable versioned envelope, atomic slot replacement, explicit durability verification and ordered migration before any save capability is advertised.

## Save envelope

```txt
MeadowSaveEnvelope {
  schema
  schemaVersion
  buildCompatibility
  saveId
  slotId
  saveRevision
  createdAt
  updatedAt
  runtimeGeneration
  sceneId
  stateRevision
  payload
  payloadDigest
  metadataDigest
}
```

## Commit contract

```txt
prepare bounded payload
  -> validate serializability and schema
  -> write temporary slot generation
  -> read back and verify digest
  -> atomically replace active slot pointer
  -> retire the previous generation according to policy
  -> publish DurableSaveCommitResult
```

## Restore contract

```txt
read selected slot
  -> verify envelope and digests
  -> classify current, migratable, unsupported, corrupt or foreign
  -> execute ordered idempotent migrations
  -> validate target schema
  -> apply runtime state once
  -> publish RestoreApplyResult
  -> publish FirstRestoredStateFrameAck
```

## Failure classes

```txt
capability-unavailable
permission-or-security-error
quota-exceeded
serialization-failed
write-failed
verification-failed
atomic-replace-failed
corrupt-envelope
foreign-product
unsupported-version
migration-missing
migration-failed
stale-runtime-generation
```

## Required fixtures

```txt
new-save round trip
overwrite durability
reload and restore
multi-slot isolation
corrupt data rejection
unsupported-version rejection
ordered migration
migration idempotency
quota/security failure
interrupted temporary write
stale save request rejection
source/build/Pages storage behavior
FirstRestoredStateFrameAck correlation
```

## Boundary

Contract only. No storage format, LocalStorage/IndexedDB adapter, migration or fixture was implemented.