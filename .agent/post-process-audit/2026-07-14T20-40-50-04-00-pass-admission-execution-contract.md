# Post-Process Audit: Pass Admission and Execution Contract

**Generated:** `2026-07-14T20-40-50-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Post-processing needs one authority that converts desired presentation into a renderer-supported execution profile and proves what reached the visible frame.

## Plan ledger

**Goal:** define the minimum deterministic contract for full, reduced, inline-fallback, and rejected post-process profiles.

- [x] Define graph and capability identities.
- [x] Define admission modes.
- [x] Define resource and pass receipts.
- [x] Define rollback and visible-frame proof.
- [ ] Implement and execute later.

## Command

```txt
PostProcessFrameCommand {
  renderAttemptId
  sourcePlanFingerprint
  enhancedPlanFingerprint
  declaredGraphFingerprint
  rendererGeneration
  rendererCapabilityFingerprint
  viewportGeneration
  policyRevision
  predecessorFrameId
}
```

## Admission modes

```txt
full
  every mandatory pass executes as declared

reduced
  policy-approved pass disablement or lower-cost formats

inline-fallback
  declared passes map to a versioned inline shader profile
  each substitution is explicit

rejected
  mandatory intent cannot be represented safely
```

## Required receipts

```txt
RenderTargetReceipt
  targetId, format, size, generation, owner

PassExecutionReceipt
  passId, order, mode, inputIds, outputId, status, reason

PostProcessFrameResult
  admittedProfileId
  graphFingerprint
  resourceReceipts[]
  passReceipts[]
  substitutions[]
  skippedPasses[]
  outputTargetId
  submittedFrameId
  status
```

## Rollback

Failure must retire candidate targets and pass resources, preserve the accepted predecessor output, and reject late receipts from the failed generation.

## Visible proof

`FirstVisiblePostProcessFrameAck` must bind the accepted frame, output target, graph/profile fingerprints, renderer generation, viewport generation, and capture evidence.

## Boundary

This is a documentation contract only.