# Next Steps

**Updated:** `2026-07-14T20-40-50-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `post-process-descriptor-execution-authority-audited`

## Summary

Make post-processing an admitted renderer profile rather than an unverified descriptor attachment. Every declared pass must be executed, explicitly substituted, intentionally skipped by policy, or rejected.

## Plan ledger

**Goal:** create the smallest reliable path from one declared pass graph to one receipted GPU output and matching visible frame.

### Identity and admission

- [ ] Add `PostProcessFrameCommand` with render-attempt, plan, renderer, viewport, and policy revisions.
- [ ] Fingerprint the declared graph and renderer capability manifest.
- [ ] Validate pass IDs, order, mandatory status, inputs, outputs, and settings.
- [ ] Admit `full`, `reduced`, `inline-fallback`, or `rejected` profile.

### Resource planning

- [ ] Allocate versioned scene-color, depth, normal, and ping-pong targets only for the accepted profile.
- [ ] Publish resource preparation receipts with formats, sizes, generations, and owners.
- [ ] Rebuild on viewport, DPR, context, format, or profile revision changes.

### Pass execution

- [ ] Dispatch accepted passes in declared order.
- [ ] Make inline cel/fog and geometry outline an explicit versioned fallback mapping when used.
- [ ] Publish one `PassExecutionReceipt` for every declared pass.
- [ ] Record substitutions, skips, failures, and output identities.

### Adoption and rollback

- [ ] Publish `PostProcessFrameResult` only after the accepted output is submitted.
- [ ] Publish `FirstVisiblePostProcessFrameAck` for the matching graph/profile/frame.
- [ ] Preserve the accepted predecessor output on allocation, shader, pass, or composite failure.
- [ ] Retire failed and superseded resource generations idempotently.

### Fixtures

- [ ] Add graph-validation and capability-admission fixtures.
- [ ] Add full, reduced, inline-fallback, unsupported-pass, and failure fixtures.
- [ ] Add resize, DPR, context-loss, and stale-generation fixtures.
- [ ] Capture source, built-output, and Pages frames with matching result identity.

## Required result

```txt
PostProcessFrameResult {
  renderAttemptId
  declaredGraphFingerprint
  admittedProfileId
  rendererCapabilityFingerprint
  resourceGeneration
  passReceipts
  substitutions
  skippedPasses
  outputTargetId
  submittedFrameId
  visibleFrameId
  status
}
```

## Preserved dependencies

Startup readiness, reset/replay, DSK capability admission, browser observation, cache coherence, viewport authority, editor lifecycle, host retirement, provider parity, WebGL recovery, scheduling, progression, grass visibility, audio lifecycle, and save/migration remain separate bounded work.