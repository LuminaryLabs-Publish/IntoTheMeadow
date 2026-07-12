# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T11-29-40-04-00`

## Summary

Implement WebGL program-interface admission after context, precision and compile/link foundations. Keep the existing renderer and mesh builder as owners; add reflection, schema comparison, generation fencing and frame proof rather than a parallel renderer.

## Plan ledger

**Goal:** prevent an incompatible linked program from reaching buffer binding, uniform updates or draw submission, while preserving the last accepted program until a complete replacement is admitted.

- [ ] Define the canonical shader-interface manifest and revision.
- [ ] Enumerate five required attributes with exact GL types and sizes.
- [ ] Enumerate twelve required uniforms with exact GL types and sizes.
- [ ] Reflect `ACTIVE_ATTRIBUTES` through `getActiveAttrib()`.
- [ ] Reflect `ACTIVE_UNIFORMS` through `getActiveUniform()`.
- [ ] Resolve and validate every required attribute location.
- [ ] Resolve and validate every required uniform location.
- [ ] Classify optimized-out required uniforms explicitly.
- [ ] Observe WebGL program resource limits and current usage.
- [ ] Define the CPU mesh-layout schema and fingerprint.
- [ ] Compare mesh semantics/component counts with admitted attributes.
- [ ] Define uniform-payload schemas and update operations.
- [ ] Reject non-finite or shape-incompatible uniform batches.
- [ ] Produce a detached `ProgramInterfaceResult`.
- [ ] Allocate context-bound program and interface generations.
- [ ] Install accepted candidates atomically.
- [ ] Preserve the predecessor after candidate rejection.
- [ ] Reject stale context/program/interface draw work.
- [ ] Publish interface fingerprints in renderer snapshots.
- [ ] Add bounded interface observations and journal entries.
- [ ] Correlate the first visible frame with the accepted interface.
- [ ] Add deterministic missing-symbol and type-mismatch fixtures.
- [ ] Add WebGL1/WebGL2 browser and Pages smokes.

## Required manifest

```txt
attributes:
  aPosition       FLOAT_VEC3
  aNormal         FLOAT_VEC3
  aColor          FLOAT_VEC3
  aOutline        FLOAT
  aWind           FLOAT_VEC2

uniforms:
  uViewProjection FLOAT_MAT4
  uTime           FLOAT
  uWindDirection  FLOAT_VEC2
  uWindStrength   FLOAT
  uWindGust       FLOAT
  uOutlinePass    FLOAT
  uOutlineWidth   FLOAT
  uLightDirection FLOAT_VEC3
  uRimColor       FLOAT_VEC3
  uOutlineColor   FLOAT_VEC3
  uFogColor       FLOAT_VEC3
  uRimStrength    FLOAT
```

## Required result

```txt
ProgramInterfaceResult {
  status
  reason
  contextGeneration
  candidateProgramId
  programGeneration
  manifestRevision
  activeAttributes
  activeUniforms
  resourceProfile
  meshLayoutFingerprint
  uniformPayloadFingerprint
  interfaceFingerprint
  failures
}
```

## Required statuses

```txt
Accepted
RejectedMissingAttribute
RejectedMissingUniform
RejectedAttributeTypeMismatch
RejectedUniformTypeMismatch
RejectedResourceBudget
RejectedStaleContext
Retired
```

## Acceptance matrix

```txt
complete accepted interface
missing aPosition
missing aWind
missing uTime
missing uOutlinePass
optimized-out required uniform
attribute vector-width mismatch
uniform scalar/vector mismatch
uniform array-size mismatch
mesh component-count mismatch
uniform payload shape mismatch
non-finite uniform payload
resource limit exceeded
candidate rejection preserves predecessor
stale context generation
stale program generation
stale interface fingerprint
WebGL1 accepted interface
WebGL2 accepted interface
first visible frame interface receipt
local and deployed browser parity
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
2a. Editor Bridge Lifecycle and Error Journal Authority
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
6c. Shader Precision Admission Authority
6d. WebGL Program Interface Admission Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
7b. Adaptive Quality and Performance Budget Authority
7c. Grass Visibility and LOD Authority
7d. Audio Activation and Lifecycle Authority
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

Do not infer interface compatibility from successful linking. Reflect the active program, validate it against exact host schemas, and install it only after one accepted result.