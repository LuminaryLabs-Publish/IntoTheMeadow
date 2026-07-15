# Render Audit: Global Mediump Source Rewrite Gap

**Timestamp:** `2026-07-15T06-01-26-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The compatibility renderer rewrites every vertex and fragment shader to one global `mediump` float policy before compilation. The renderer then reports mesh, topology, cache and validation state without exposing the effective shader source or precision policy.

## Plan ledger

**Goal:** make the rendered frame traceable to admitted shader sources, capabilities and precision decisions.

- [x] Inspect source normalization and stage tracking.
- [x] Inspect base vertex and fragment sources.
- [x] Inspect compile, link and renderer snapshot state.
- [x] Identify missing frame-level evidence.
- [ ] Add executable precision fixtures later.

## Current render path

```txt
base vertex shader
  -> no explicit float precision declaration
  -> compatibility wrapper prepends mediump

base fragment shader
  -> explicit mediump declaration
  -> compatibility wrapper removes it
  -> compatibility wrapper prepends mediump

future explicit highp shader
  -> highp declaration removed
  -> mediump declaration prepended

compiled program
  -> no effective precision fields in snapshot
  -> no original/effective source hashes
  -> no downgrade warning
```

## Visible risks

```txt
wind phase and offset instability at larger coordinates
camera/view-projection precision loss
outline extrusion jitter
fog depth banding or discontinuity
future highp material or post-process requirements being silently weakened
cross-device output differences hidden behind the same renderer version
```

These are source-derived risks, not reproduced visual defects.

## Missing frame evidence

```txt
ShaderProgramRevision
PrecisionPolicyRevision
DevicePrecisionCapabilityRevision
OriginalSourceHash
EffectiveSourceHash
PrecisionFallbackReceipt
ShaderCompileResult
ShaderLinkResult
FirstPrecisionAdmittedFrameAck
```

## Required render contract

A renderer frame must cite the adopted program revision, effective per-stage precision and capability revision. A capture must not claim cross-device parity when those fields are absent or different.

## Boundary

No shader, wrapper, WebGL, mesh, pass, camera or frame behavior changed.
