# Interaction Audit: Runtime Reset Command and Result Map

**Timestamp:** `2026-07-14T09-58-25-04-00`

## Summary

Browser and headless editor environments expose `runtime.reset` as an immediate capability call. Neither accepts a command identity or expected revision, and both return raw state rather than a typed reset result.

## Plan ledger

**Goal:** replace direct reset invocation with one idempotent command/result protocol across browser and headless environments.

- [x] Trace browser and headless capability invocation.
- [x] Identify duplicate, stale and superseded-command gaps.
- [x] Define a shared result contract.
- [ ] Implement protocol fixtures later.

## Current map

```txt
invoke(runtime.reset)
  -> capability exists
  -> execute direct mutation
  -> return raw state inside generic completed envelope

missing
  commandId
  expectedSessionGeneration
  expectedStateRevision
  participant policy
  duplicate result replay
  stale rejection
  rollback result
  first-frame evidence
```

## Required result

```txt
RuntimeResetResult {
  commandId
  environmentId
  predecessorSessionGeneration
  successorSessionGeneration
  predecessorStateRevision
  successorStateRevision
  status
  reason
  participantReceipts
  carriedLedgers
  clearedLedgers
  rollbackReceipt
  replayJournalEntry
  firstFrameAck
}
```

## Admission rules

```txt
duplicate command -> return prior immutable result
stale expected revision -> reject without mutation
superseded command -> reject late completion
participant failure -> preserve predecessor or publish complete rollback
success -> expose successor only after all required receipts settle
```

## Boundary

No interaction or editor protocol behavior changed.