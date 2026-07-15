# Architecture Audit: Shader Precision Capability Admission DSK Map

**Timestamp:** `2026-07-15T06-01-26-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Shader source transformation currently sits inside a browser-context proxy, outside the renderer contract and outside any device-capability or fallback result. This audit separates authored shader requirements, device support, source transformation, compilation, program adoption, diagnostics and proof.

## Plan ledger

**Goal:** define bounded services that admit one effective shader program without moving renderer implementation into gameplay or content domains.

- [x] Preserve the renderer-neutral render-plan boundary.
- [x] Keep WebGL context calls inside the renderer provider.
- [x] Separate stage requirements from device capabilities.
- [x] Separate source transformation from compilation and adoption.
- [x] Require immutable results and diagnostics.
- [ ] Implement after approval.

## Existing ownership

```txt
meadow-render-host-dsk
  -> renderer selection, plan ingest, pass order and state

meadow-webgl-renderer-v2-kit
  -> WebGL context, program, attributes, uniforms, buffers and draws

meadow-performance-dsk
  -> quality profiles and budgets

meadow-diagnostics-dsk
  -> runtime/render health and smoke reports
```

## Missing parent

`meadow-shader-precision-capability-admission-authority-domain`

## Proposed DSK and kit map

| Surface | Ownership |
|---|---|
| `shader-source-identity-kit` | Immutable source IDs, revisions and hashes. |
| `shader-stage-descriptor-kit` | Vertex/fragment stage identity and entry requirements. |
| `device-precision-capability-query-kit` | Provider-owned `getShaderPrecisionFormat` observations and capability snapshot. |
| `shader-precision-requirement-kit` | Required, preferred and minimum precision per stage/value class. |
| `shader-source-transform-policy-kit` | Allowed normalization transforms and stage-specific rewrite rules. |
| `shader-transform-result-kit` | Original/effective source IDs, selected policy, warnings and rejection reasons. |
| `shader-source-fingerprint-kit` | Cache-safe original and transformed source fingerprints. |
| `shader-compile-attempt-kit` | Detached compile attempt identity, logs and terminal result. |
| `shader-program-link-result-kit` | Program link result and adopted shader revisions. |
| `shader-precision-fallback-order-kit` | Explicit fallback order when preferred precision is unsupported. |
| `shader-cache-key-kit` | Program key containing source, capability and policy revisions. |
| `renderer-precision-snapshot-kit` | Effective precision, capability and transform fields in public renderer state. |
| `precision-warning-receipt-kit` | Bounded warnings for downgraded or substituted policies. |
| `cross-device-precision-fixture-kit` | Device-class compile and render fixtures. |
| `vertex-world-range-fixture-kit` | Camera, wind, world-coordinate and depth precision stress cases. |
| `visual-differential-fixture-kit` | Image and metric comparison between accepted precision modes. |
| `pages-precision-parity-kit` | Source, built and Pages shader-policy parity. |

## Dependency direction

```txt
renderer manifest and source identity
  -> authored stage precision requirements
  -> device precision capability observation
  -> precision-policy decision
  -> optional accepted source transform
  -> detached compile and link
  -> atomic program adoption
  -> renderer snapshot and warning receipts
  -> first precision-admitted frame
  -> cross-device and deployment proof
```

## Required result

```txt
ShaderProgramAdmissionResult {
  rendererGeneration
  programId
  originalVertexSourceRevision
  originalFragmentSourceRevision
  deviceCapabilityRevision
  precisionPolicyRevision
  effectiveVertexPrecision
  effectiveFragmentPrecision
  transformedVertexSourceHash
  transformedFragmentSourceHash
  compileAttemptIds
  linkAttemptId
  status
  reason
  warnings
  adoptedProgramRevision
}
```

## Invariants

```txt
no source rewrite without a selected policy
no stage downgrade without an explicit fallback result
no program cache hit across different effective source hashes
no adopted program without successful compile and link results
no renderer snapshot that hides effective precision
no production parity claim without source/build/Pages capability evidence
```

## Boundary

The authority defines contracts and results. WebGL calls remain provider work; game logic and content remain renderer-neutral.
