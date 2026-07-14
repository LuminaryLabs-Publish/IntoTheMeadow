# Next Steps

**Updated:** `2026-07-14T09-58-25-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `runtime-reset-session-replay-authority-audited`

## Summary

Make browser and headless reset use the same command, session-generation and participant contract. Reset must stop stale work, settle state/render/editor participants atomically, and publish replayable evidence before successor readiness.

## Plan ledger

**Goal:** create the smallest reliable reset path from admitted intent to one uniquely identified successor session and first matching frame.

### Command and identity

- [ ] Add `RuntimeResetCommand` with command ID, environment ID, predecessor session and expected state revision.
- [ ] Add monotonically unique `SessionGeneration` and state revision.
- [ ] Return prior immutable results for duplicate command IDs.
- [ ] Reject stale and superseded reset attempts before mutation.

### Participant manifest

- [ ] Register state, provider, base plan, enhancer, renderer, schedulers, editor observations, captures and error ledgers.
- [ ] Give each participant an explicit reset, retain, clear or rebuild policy.
- [ ] Use one policy in browser and headless environments.
- [ ] Record preparation, adoption, carry-forward and retirement receipts.

### Atomic transition

- [ ] Suspend RAF and manual editor ticks during reset.
- [ ] Prepare successor participants without publishing partial readiness.
- [ ] Atomically adopt all required participants.
- [ ] Preserve the predecessor and dispose candidates on failure.
- [ ] Publish `RuntimeResetResult` and rollback evidence.

### Replay and presentation

- [ ] Journal accepted reset and tick commands with state/render fingerprints.
- [ ] Clear or explicitly carry the headless capture baseline.
- [ ] Clear or mark browser `lastPlan` and `lastRender` as predecessor-only.
- [ ] Expose reset/session revisions through GameHost and editor snapshots.
- [ ] Publish `FirstResetSessionFrameAck`.

### Fixtures

- [ ] Add unique-session and duplicate-command fixtures.
- [ ] Add stale-revision and superseded-attempt fixtures.
- [ ] Add reset-during-RAF and reset-versus-manual-tick fixtures.
- [ ] Add participant failure and rollback fixtures.
- [ ] Add browser/headless parity and capture-baseline fixtures.
- [ ] Run source, built-output and Pages parity smokes.

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

## Preserved dependencies

DSK capability admission, browser observation evidence, render cache coherence, viewport authority, editor capability admission, host retirement, workspace containment, provider parity, WebGL recovery, frame scheduling, progression, grass visibility, audio lifecycle and save/migration remain separate bounded work.