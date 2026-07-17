# Architecture Audit: Save Capability, Durable Commit and Migration DSK Map

**Timestamp:** `2026-07-17T08-45-46-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The DSK registry declares a Persistence domain, but runtime composition installs only its descriptor. No executable persistence service participates in game creation, public host capabilities, editor capabilities or session boot.

## Intent

Define the smallest DSK boundary that makes save capability truthful, versioned, durable and restorable.

## Current DSK path

```txt
LOCAL_DSK_IDS
  -> meadow-save-dsk
  -> createDskDescriptor
  -> status: planned
  -> services:
       save-model
       save-slots
       persistence-adapter
       migration
       save-validation
  -> installDsks snapshot includes descriptor
  -> no runtime provider or service implementation
```

## Current runtime path

```txt
createIntoTheMeadowGame
  -> createInitialGameState
  -> in-memory tick/reset
  -> createGameSnapshot
  -> expose GameHost reads
  -> editor runtime reads/ticks/resets
  -> no save/load/delete/list/migrate command surface
```

## Required parent domain

`meadow-save-capability-admission-durable-commit-migration-authority-domain`

## Required domain composition

```txt
Persistence Capability
  -> implementation manifest
  -> adapter readiness
  -> capability admission result

Save Model
  -> versioned envelope
  -> durable state projection
  -> exclusion policy
  -> compatibility metadata

Slots and Durability
  -> slot registry and lease
  -> temporary generation write
  -> digest verification
  -> atomic replace
  -> bounded failure result

Migration
  -> ordered migration registry
  -> source/target schema validation
  -> idempotent migration result

Restore
  -> slot read and classification
  -> restore admission
  -> runtime state replacement
  -> restored-session revision
  -> FirstRestoredStateFrameAck
```

## Command/result map

```txt
SaveCapabilityAdmissionCommand -> SaveCapabilityResult
SavePrepareCommand -> SavePrepareResult
DurableSaveCommitCommand -> DurableSaveCommitResult
RestoreAdmissionCommand -> RestoreAdmissionResult
SaveMigrationCommand -> SaveMigrationResult
RestoreApplyCommand -> RestoreApplyResult
RestoreApplyResult -> FirstRestoredStateFrameAck
```

## Capability truth rule

A planned descriptor is documentation, not an executable capability. `GameHost`, the editor bridge and diagnostics should advertise save support only after an adapter, schema, migration path and transaction implementation have passed admission.

## Boundary

Proposed architecture only. No runtime DSK, service provider, storage adapter or command surface was added.