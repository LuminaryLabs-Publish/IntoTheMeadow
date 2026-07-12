# Architecture Audit: WebGL Program Interface Admission DSK Map

**Timestamp:** `2026-07-12T11-29-40-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The renderer owns shader compilation and linking, CPU mesh ingestion, attribute buffers, uniform updates and two-pass draws, but has no aggregate that admits the linked program interface before those consumers use it. This audit defines one bounded parent domain around active-symbol reflection, mesh/uniform compatibility, program generation and frame provenance.

## Plan ledger

**Goal:** make the active linked program a versioned, typed and inspectable artifact whose compatibility is decided before GPU resources or visible frames depend on it.

- [x] Identify existing shader, mesh, renderer and observation owners.
- [x] Separate precision selection from interface compatibility.
- [x] Define required attribute and uniform manifests.
- [x] Define reflection, type/size admission and resource-limit policy.
- [x] Define mesh-layout and uniform-payload compatibility.
- [x] Define program/interface generations and fingerprints.
- [x] Define stale-generation rejection and first-frame proof.
- [ ] Implement the authority in runtime code.

## Parent domain

```txt
meadow-webgl-program-interface-admission-authority-domain
```

## Existing bounded owners

```txt
meadow-webgl-renderer-v2-kit
  -> WebGL context acquisition
  -> shader compilation
  -> program linking
  -> attribute and uniform location lookup
  -> GPU buffer ownership
  -> uniform update and draw submission

meadow-render-host-dsk
  -> render-plan ingestion
  -> renderer selection
  -> renderer-state projection

CPU mesh builder v2
  -> positions vec3
  -> normals vec3
  -> colors vec3
  -> outlines float
  -> wind vec2
  -> array-length validation

shader precision compatibility wrapper
  -> float precision normalization
  -> context proxy

meadow-diagnostics-dsk / GameHost / editor bridge
  -> renderer snapshot readback
  -> browser capture and diagnostics
```

These owners should be extended first. Do not create a second renderer, mesh builder or shader compiler.

## Required DSK composition

```txt
meadow-webgl-program-interface-admission-authority-domain
  |
  +-- shader-interface-manifest-kit
  |     required attributes and uniforms
  |     expected GL types and array sizes
  |     required/optional policy
  |
  +-- shader-symbol-definition-kit
  |     canonical symbol identity
  |     stage and semantic ownership
  |
  +-- program-interface-reflection-kit
  |     ACTIVE_ATTRIBUTES inventory
  |     ACTIVE_UNIFORMS inventory
  |     getActiveAttrib/getActiveUniform evidence
  |
  +-- active-attribute-inventory-kit
  |     name, location, type, size
  |
  +-- active-uniform-inventory-kit
  |     name, location, type, size
  |
  +-- attribute-location-admission-kit
  |     required presence
  |     exact type/size compatibility
  |
  +-- uniform-location-admission-kit
  |     required presence
  |     optimized-out classification
  |     exact type/size compatibility
  |
  +-- program-resource-limit-profile-kit
  |     active attribute count
  |     active uniform vectors/components
  |     device limit comparison
  |
  +-- mesh-layout-schema-kit
  |     position vec3
  |     normal vec3
  |     color vec3
  |     outline float
  |     wind vec2
  |
  +-- mesh-program-layout-compatibility-kit
  |     attribute semantic-to-symbol mapping
  |     stride/type/normalization compatibility
  |
  +-- uniform-payload-schema-kit
  |     matrix/scalar/vector payload contracts
  |     pass-specific update requirements
  |
  +-- uniform-update-result-kit
  |     typed per-symbol update result
  |     current generation evidence
  |
  +-- program-interface-compatibility-policy-kit
  |     required/optional symbols
  |     exactness and fallback rules
  |
  +-- program-interface-fingerprint-kit
  |     deterministic ordered interface digest
  |
  +-- program-interface-result-kit
  |     Accepted or typed rejection
  |
  +-- program-generation-kit
  |     context-bound committed program identity
  |
  +-- draw-interface-admission-kit
  |     current context/program/interface checks
  |     pass identity and mesh schema checks
  |
  +-- shader-interface-observation-kit
  |     detached public read model
  |
  +-- shader-interface-journal-kit
  |     bounded decisions and failures
  |
  +-- first-frame-program-interface-ack-kit
  |     visible-frame correlation
  |
  +-- missing-attribute-fixture-kit
  +-- missing-uniform-fixture-kit
  +-- optimized-out-uniform-fixture-kit
  +-- browser-program-interface-smoke-kit
```

## Canonical interface manifest

```txt
attributes:
  aPosition       FLOAT_VEC3  size 1  required
  aNormal         FLOAT_VEC3  size 1  required
  aColor          FLOAT_VEC3  size 1  required
  aOutline        FLOAT       size 1  required
  aWind           FLOAT_VEC2  size 1  required

uniforms:
  uViewProjection FLOAT_MAT4   size 1  required
  uTime           FLOAT        size 1  required
  uWindDirection  FLOAT_VEC2   size 1  required
  uWindStrength   FLOAT        size 1  required
  uWindGust       FLOAT        size 1  required
  uOutlinePass    FLOAT        size 1  required
  uOutlineWidth   FLOAT        size 1  required
  uLightDirection FLOAT_VEC3   size 1  required
  uRimColor       FLOAT_VEC3   size 1  required
  uOutlineColor   FLOAT_VEC3   size 1  required
  uFogColor       FLOAT_VEC3   size 1  required
  uRimStrength    FLOAT        size 1  required
```

## Result model

```txt
ProgramInterfaceResult {
  status:
    Accepted
    RejectedMissingAttribute
    RejectedMissingUniform
    RejectedAttributeTypeMismatch
    RejectedUniformTypeMismatch
    RejectedResourceBudget
    RejectedStaleContext
    Retired
  contextGeneration
  candidateProgramId
  programGeneration
  manifestRevision
  activeAttributeInventory
  activeUniformInventory
  meshLayoutFingerprint
  uniformPayloadFingerprint
  interfaceFingerprint
  reasons
}
```

## Admission transaction

```txt
compile/link candidate
  -> reflect ordered active attributes and uniforms
  -> resolve exact locations
  -> compare with manifest
  -> classify optimized-out required symbols as rejection
  -> compare device resource usage and limits
  -> compare CPU mesh layout with attribute schema
  -> compare runtime uniform payloads with uniform schema
  -> produce detached ProgramInterfaceResult
  -> on Accepted, allocate program generation
  -> atomically install program and interface fingerprint
  -> retire predecessor generation
  -> admit buffer binding, uniform updates and draws
  -> acknowledge first visible frame
```

Rejected candidates must perform no current-program replacement and no draw. The predecessor program remains current until a complete candidate is accepted.

## Dependency order

```txt
shader precision admission
  -> shader compile/link result
  -> program interface admission
  -> mesh and uniform binding admission
  -> draw admission
  -> committed-frame observation
```

## Proof gates

```txt
exact active-symbol reflection
missing attribute rejection
missing uniform rejection
optimized-out required uniform rejection
attribute type and size mismatch rejection
uniform type and size mismatch rejection
resource-limit rejection
mesh schema compatibility
uniform payload compatibility
stale context/program/interface rejection
predecessor preservation after candidate failure
WebGL1/WebGL2 parity
first visible frame with interface fingerprint
```

## Claim boundary

This is an architecture contract only. It does not claim the current renderer performs active-interface reflection or validates required uniform locations.