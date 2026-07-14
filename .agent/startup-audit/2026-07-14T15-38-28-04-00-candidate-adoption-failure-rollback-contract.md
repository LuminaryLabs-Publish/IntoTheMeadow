# Startup Audit: Candidate Adoption and Failure Rollback Contract

**Timestamp:** `2026-07-14T15-38-28-04-00`

## Summary

The host constructs participants directly in public scope. There is no private candidate phase, adoption barrier, rollback ledger, or terminal ownership receipt.

## Plan ledger

**Goal:** define the lifecycle contract required to keep partial startup invisible and completely retire failed candidates.

- [x] Identify startup participants.
- [x] Identify publication and disposal gaps.
- [x] Define prepare, adopt, fail, cancel, and supersede semantics.
- [ ] Implement the contract later.

## Candidate manifest

```txt
BootAttemptId
external provider module and export
DSK install snapshot
game state and content
base render plan
render-plan enhancer
WebGL renderer and resource generation
editor bridge and event listeners
GameHost descriptor
loading/fatal UI candidate
RAF lease
first frame evidence
```

## Adoption contract

A candidate may be adopted only when provider admission, DSK validation, render-plan validation, renderer submission, and visible-frame acknowledgement all succeed for the same `BootAttemptId`.

Atomic adoption publishes:

```txt
GameHost
NexusEditorEnvironment
Ready loading state
accepted RAF generation
BrowserStartupResult
FirstVisibleMeadowFrameAck
```

## Rollback contract

Failure, cancellation, or supersession must:

```txt
reject new candidate commands
stop candidate RAF submission
remove global error and rejection listeners
dispose editor bridge
retire renderer buffers, programs and context-owned resources
invalidate enhancer and candidate snapshots
revoke or restore public globals
restore an explicit Failed or predecessor UI state
publish participant retirement receipts
publish BrowserStartupFailureResult
```

## Idempotency

Repeated cancellation or failure handling must return the existing terminal result. Late completions from retired attempts must be rejected before public mutation.

## Boundary

This is a documentation contract only.