# Next Steps

**Updated:** `2026-07-15T06-01-26-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `shader-precision-capability-admission-authority-audited`

## Summary

Replace the unconditional global mediump rewrite with a small provider-owned admission path. Preserve the authored source when supported, apply only explicit stage-specific fallbacks, and expose the effective program policy through renderer diagnostics and fixtures.

## Plan ledger

**Goal:** create the smallest reliable path from authored shader requirements to one admitted device-compatible program and one matching visible frame.

### Source and requirement identity

- [ ] Add immutable vertex and fragment source revisions and hashes.
- [ ] Add per-stage required, preferred and minimum precision descriptors.
- [ ] Add world-range, time-range, wind and depth tolerances for the current shader.
- [ ] Include precision-policy revision in renderer and program identity.

### Device capability and policy

- [ ] Query provider precision capability with `getShaderPrecisionFormat` for each stage and precision class.
- [ ] Preserve full range and precision observations in a capability snapshot.
- [ ] Resolve required and preferred precision independently for vertex and fragment stages.
- [ ] Reject mandatory unsupported requirements instead of silently rewriting them.
- [ ] Define an explicit fallback order and downgrade warning receipt.

### Transform, compile and adoption

- [ ] Preserve original source when no transform is required.
- [ ] Replace the broad declaration-removal regex with a parsed, stage-aware policy.
- [ ] Fingerprint original and effective source.
- [ ] Compile and link detached candidates before replacing the active program.
- [ ] Include effective source and capability revisions in the program cache key.
- [ ] Preserve the predecessor program if transformation, compile or link fails.

### Diagnostics and frames

- [ ] Add effective vertex and fragment precision to renderer snapshots.
- [ ] Add transform, compile, link and fallback receipts to diagnostics.
- [ ] Bind each visible frame and capture to the adopted program revision.
- [ ] Publish `FirstPrecisionAdmittedFrameAck`.

### Fixtures

- [ ] Add declaration parser and transform-policy unit tests.
- [ ] Add mocked capability-matrix tests.
- [ ] Add real WebGL1 and WebGL2 compile fixtures.
- [ ] Add mandatory-highp rejection and accepted-mediump fallback fixtures.
- [ ] Add large-coordinate, long-time wind, fog-depth and outline stability fixtures.
- [ ] Compare source, built output and Pages captures under the same program revision.

## Required result

```txt
ShaderProgramAdmissionResult {
  rendererGeneration
  programId
  originalSourceRevisions
  effectiveSourceHashes
  capabilityRevision
  precisionPolicyRevision
  effectiveVertexPrecision
  effectiveFragmentPrecision
  compileResults
  linkResult
  adoptedProgramRevision
  status
  reason
  warnings
}
```

## Preserved dependencies

Editor mutation settlement, post-process execution, startup readiness, reset/replay, DSK capability admission, observation provenance, cache coherence, viewport authority, editor lifecycle, host retirement, workspace containment, provider parity, WebGL recovery, scheduling, progression, grass visibility, audio lifecycle and save/migration remain separate bounded work.
