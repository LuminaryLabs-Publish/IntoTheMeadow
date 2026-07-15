# Current Audit: Shader Precision Capability Admission Authority

**Updated:** `2026-07-15T06-01-26-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `shader-precision-capability-admission-authority-audited`  
**Immediate predecessor:** `editor-mutation-visible-frame-settlement-authority-central-reconciled`

## Summary

`meadow-webgl-renderer-v2-compatible.js` proxies the WebGL context and rewrites every graphics shader source. It removes explicit `lowp`, `mediump` and `highp` float declarations, then prepends one `precision mediump float;` declaration before compilation.

The base vertex source contains no explicit precision declaration, while the base fragment source already requests mediump. The transform therefore changes stage semantics unequally and would silently replace a future highp request. No typed result records device support, authored requirements, fallback permission, source identity or the effective policy used by the visible frame.

## Plan ledger

**Goal:** bind authored shader intent, observed device capability, accepted source transformation, compile/link settlement and visible-frame evidence.

- [x] Compare the Publish inventory and central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Select only IntoTheMeadow by oldest synchronized timestamp.
- [x] Read compatibility wrapper, base renderer, shader sources, snapshot and proof scripts.
- [x] Preserve all 44 kit surfaces and services.
- [x] Add the timestamped audit family.
- [x] Change documentation only and target `main`.
- [ ] Implement the authority and fixtures later.

## Main findings

```txt
explicit precision declarations removed: yes
mediump injected into vertex stage: yes
mediump injected into fragment stage: yes
future highp declaration preserved: no
device precision capability queried: no
per-stage precision requirements: absent
accepted fallback result: absent
original/effective source hashes: absent
compile attempt identity: absent
renderer snapshot effective precision: absent
first precision-admitted frame acknowledgement: absent
```

## Current proof gap

```txt
renderer-v2 smoke creates WebGL: no
renderer-v2 smoke compiles shaders: no
browser observation queries precision: no
browser observation reports effective source: no
cross-device capability matrix: absent
visual precision differential: absent
source/build/Pages policy parity: absent
```

## Required parent domain

`meadow-shader-precision-capability-admission-authority-domain`

## Required transaction

```txt
ShaderProgramAdmissionCommand
  -> bind renderer, program and source revisions
  -> classify vertex and fragment requirements independently
  -> observe device precision capability
  -> resolve accepted precision and fallback policy
  -> transform source only through that policy
  -> fingerprint original and effective sources
  -> compile and link detached candidates
  -> publish transform, compile, link and admission results
  -> atomically adopt one program revision
  -> publish effective precision in renderer diagnostics
  -> acknowledge FirstPrecisionAdmittedFrameAck
```

## Boundary

Documentation only. No shader, wrapper, renderer, gameplay, editor, test, workflow or deployment code changed.
