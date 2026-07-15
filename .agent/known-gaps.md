# Known Gaps

**Updated:** `2026-07-15T06-01-26-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `shader-precision-capability-admission-authority-audited`

## Summary

The bounded gap is truthful shader precision admission. Effective source and precision are mutated inside a WebGL proxy but are absent from renderer contracts, cache identity, diagnostics, frame evidence and deployment proof.

## Plan ledger

**Goal:** record every identity, capability, policy, transform, adoption and fixture gap required for reliable shader compatibility.

- [x] Record source and program identity gaps.
- [x] Record capability and requirement gaps.
- [x] Record transform and fallback gaps.
- [x] Record diagnostics, frame and validation gaps.
- [ ] Implement and prove later.

## Identity gaps

```txt
ShaderSourceRevision: absent
OriginalVertexSourceHash: absent
OriginalFragmentSourceHash: absent
EffectiveVertexSourceHash: absent
EffectiveFragmentSourceHash: absent
ShaderProgramRevision: absent
PrecisionPolicyRevision: absent
DevicePrecisionCapabilityRevision: absent
```

## Capability and requirement gaps

```txt
vertex precision capability observation: absent
fragment precision capability observation: absent
per-stage required precision: absent
per-stage preferred precision: absent
per-stage minimum precision: absent
world-coordinate precision budget: absent
wind/time precision budget: absent
fog/depth precision budget: absent
```

## Transform and fallback gaps

```txt
stage-aware declaration parsing: absent
preserve-original-source decision: absent
explicit fallback permission: absent
fallback order: absent
mandatory-highp rejection: absent
downgrade warning receipt: absent
ShaderTransformResult: absent
failed-transform predecessor preservation: absent
```

## Compile, cache and frame gaps

```txt
ShaderCompileAttemptId: absent
ShaderCompileResult: absent
ShaderProgramLinkResult: absent
program cache key includes effective source: no
renderer snapshot effective precision: absent
capture program revision binding: absent
FirstPrecisionAdmittedFrameAck: absent
```

## Validation gaps

```txt
precision parser fixture: absent
capability matrix fixture: absent
real WebGL1 shader compile fixture: absent
real WebGL2 shader compile fixture: absent
large-coordinate vertex fixture: absent
long-time wind fixture: absent
precision visual differential fixture: absent
source/build/Pages precision parity fixture: absent
```

## Preserved unresolved gaps

```txt
editor command and visible-frame settlement
post-process execution
browser startup readiness
runtime reset and replay authority
DSK executable capability composition
browser observation provenance
render-plan and mesh-cache coherence
viewport authority
editor capability lifecycle
web-host retirement
workspace containment and atomic artifacts
provider-source parity
WebGL context recovery
single-chain frame scheduling
playable progression
grass visibility and LOD
audio user-gesture lifecycle
atomic save and migration
```

## Completion boundary

Shader compatibility is not proven until each adopted program cites original and effective source identities, observed device capability, accepted stage policies, compile/link results and a matching visible frame.
