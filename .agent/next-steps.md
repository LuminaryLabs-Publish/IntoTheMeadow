# Next Steps

**Updated:** `2026-07-14T15-38-28-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `browser-startup-readiness-first-frame-authority-audited`

## Summary

Move browser construction behind a private candidate phase. Publish globals, loading completion, mutable editor commands, and authoritative capture only after one validated frame is submitted for the accepted boot attempt.

## Plan ledger

**Goal:** create the smallest reliable browser startup path from admitted boot intent to one visible Ready frame or complete failed-candidate retirement.

### Identity and admission

- [ ] Add `BrowserStartupCommand` with `BootAttemptId`, document generation, expected predecessor state, and policy revision.
- [ ] Fingerprint the product source, provider URL/revision, provider export, DSK install, and renderer configuration.
- [ ] Reject duplicate, stale, cancelled, and superseded attempts.

### Private candidates

- [ ] Create game, renderer, enhancer, editor bridge, listeners, and RAF lease without publishing globals.
- [ ] Keep loading visible and mutation/capture capabilities unavailable during construction.
- [ ] Record preparation receipts for every candidate participant.

### First-frame admission

- [ ] Validate DSK and source render-plan contracts.
- [ ] Execute one authority-owned initial tick.
- [ ] Enhance, fingerprint, submit, and acknowledge one candidate frame.
- [ ] Require matching startup, state, plan, renderer, and visible-frame revisions.

### Atomic adoption and rollback

- [ ] Atomically publish `GameHost`, `NexusEditorEnvironment`, Ready state, and accepted RAF generation.
- [ ] Publish `BrowserStartupResult` and `FirstVisibleMeadowFrameAck`.
- [ ] On failure, remove listeners, dispose bridge/renderer/enhancer, revoke globals, and publish participant retirement receipts.
- [ ] Return one idempotent `BrowserStartupFailureResult` for failure, cancellation, or supersession.

### Fixtures

- [ ] Add provider import/export failure fixtures.
- [ ] Add DSK, render-plan, and renderer first-frame failure fixtures.
- [ ] Add early tick/reset/capture rejection fixtures.
- [ ] Add cancellation, retry, and stale completion fixtures.
- [ ] Add listener, global, renderer-resource, and RAF retirement fixtures.
- [ ] Run source, built-output, and Pages parity smokes.

## Required result

```txt
BrowserStartupResult {
  bootAttemptId
  startupRevision
  providerFingerprint
  gameRevision
  renderPlanFingerprint
  rendererGeneration
  firstVisibleFrameId
  status
  participantReceipts
  rollbackReceipt
}
```

## Preserved dependencies

Reset/replay, DSK capability admission, browser observation evidence, render cache coherence, viewport authority, editor capability lifecycle, host retirement, workspace containment, provider-source parity, WebGL recovery, frame scheduling, progression, grass visibility, audio lifecycle, and save/migration remain separate bounded work.