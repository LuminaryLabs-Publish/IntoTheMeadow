# Interaction Audit: Save Command and Result Map

**Timestamp:** `2026-07-17T08-45-46-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The public host and editor bridge expose inspection, tick, reset and capture capabilities, but no persistence commands or typed persistence results.

## Current command surface

```txt
GameHost
  -> getState
  -> getSnapshot
  -> getDiagnostics
  -> getRenderPlan
  -> getRenderSnapshot

NexusEditorEnvironment
  -> runtime.status
  -> runtime.getState
  -> runtime.getSnapshot
  -> runtime.tick
  -> runtime.reset
  -> scene and renderer inspection
  -> no save/load/list/delete/migrate capability
```

## Required command surface

```txt
persistence.getCapability
  -> SaveCapabilityResult

persistence.listSlots
  -> SaveSlotListResult

persistence.save
  -> SavePrepareResult
  -> DurableSaveCommitResult

persistence.load
  -> RestoreAdmissionResult
  -> SaveMigrationResult when required
  -> RestoreApplyResult
  -> FirstRestoredStateFrameAck

persistence.delete
  -> SaveDeleteResult
```

## Admission rules

- Reject persistence commands when the DSK remains planned or no adapter is admitted.
- Bind every command to runtime, session, state, slot and schema revisions.
- Return typed unavailable, rejected, failed and completed results.
- Never expose diagnostic snapshots as durable-save payloads by default.
- Settle each save/load/delete request exactly once.

## Boundary

No command implementation or user-facing save interaction was added.