# Shader Interface Audit: Active Symbol, Mesh and Uniform Contract

**Timestamp:** `2026-07-12T11-29-40-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The renderer needs an explicit contract between the linked program’s active symbols, the CPU mesh layout and the host’s uniform payloads. Link success alone does not establish that contract.

## Plan ledger

**Goal:** define the exact interface evidence and compatibility rules required before program installation and draw admission.

- [x] Enumerate required active attributes.
- [x] Enumerate required active uniforms.
- [x] Define mesh-layout schema.
- [x] Define uniform-payload schema.
- [x] Define reflection and normalization rules.
- [x] Define deterministic interface fingerprinting.
- [ ] Implement and execute the contract.

## Attribute contract

| Symbol | Semantic | Required GL type | Size | Mesh payload |
|---|---|---:|---:|---|
| `aPosition` | position | `FLOAT_VEC3` | 1 | 3 floats per vertex |
| `aNormal` | normal | `FLOAT_VEC3` | 1 | 3 floats per vertex |
| `aColor` | color | `FLOAT_VEC3` | 1 | 3 floats per vertex |
| `aOutline` | outline weight | `FLOAT` | 1 | 1 float per vertex |
| `aWind` | bend and phase | `FLOAT_VEC2` | 1 | 2 floats per vertex |

Required admission evidence:

```txt
active symbol name
active type and size
resolved location
semantic mapping
buffer component count
gl.vertexAttribPointer type/size/normalized/stride/offset
meshLayoutFingerprint
```

## Uniform contract

| Symbol | Required GL type | Size | Update operation |
|---|---:|---:|---|
| `uViewProjection` | `FLOAT_MAT4` | 1 | `uniformMatrix4fv` |
| `uTime` | `FLOAT` | 1 | `uniform1f` |
| `uWindDirection` | `FLOAT_VEC2` | 1 | `uniform2fv` |
| `uWindStrength` | `FLOAT` | 1 | `uniform1f` |
| `uWindGust` | `FLOAT` | 1 | `uniform1f` |
| `uOutlinePass` | `FLOAT` | 1 | `uniform1f` |
| `uOutlineWidth` | `FLOAT` | 1 | `uniform1f` |
| `uLightDirection` | `FLOAT_VEC3` | 1 | `uniform3fv` |
| `uRimColor` | `FLOAT_VEC3` | 1 | `uniform3fv` |
| `uOutlineColor` | `FLOAT_VEC3` | 1 | `uniform3fv` |
| `uFogColor` | `FLOAT_VEC3` | 1 | `uniform3fv` |
| `uRimStrength` | `FLOAT` | 1 | `uniform1f` |

Required admission evidence:

```txt
active symbol name
active type and size
non-null location
host update operation
finite payload shape
pass requirements
uniformPayloadFingerprint
```

## Reflection contract

For each newly linked program under a current context generation:

```txt
attributeCount = getProgramParameter(program, ACTIVE_ATTRIBUTES)
for index in attributeCount:
  getActiveAttrib(program, index)
  getAttribLocation(program, name)

uniformCount = getProgramParameter(program, ACTIVE_UNIFORMS)
for index in uniformCount:
  getActiveUniform(program, index)
  normalize array names when applicable
  getUniformLocation(program, canonicalName)
```

Reflection results are detached from raw WebGL handles before public observation.

## Compatibility rules

```txt
required symbol absent: reject
required uniform optimized out: reject with explicit reason
location invalid or null: reject
type mismatch: reject
array size mismatch: reject
host update operation incompatible with GL type: reject
mesh component count mismatch: reject
non-finite uniform payload: reject update batch
resource usage above observed context limit: reject
```

No silent aliasing, type coercion or precision fallback occurs at this layer.

## Interface fingerprint

The deterministic fingerprint includes:

```txt
context version and generation
shader source fingerprints
precision decision fingerprints
program link result identity
manifest revision
ordered active attributes: name/type/size/location-semantic
ordered active uniforms: name/type/size
mesh layout schema
uniform payload schema
resource-limit profile
```

Raw location numbers may be recorded in local observations but should not be the only cross-run compatibility identity because implementations may assign different locations.

## Program installation rule

```txt
CandidateProgram
  -> reflected interface
  -> accepted compatibility result
  -> programGeneration allocated
  -> atomic current-program replacement
  -> predecessor retirement
```

No buffer binding, uniform update or draw occurs against a candidate before acceptance.

## Required result

```txt
ProgramInterfaceResult {
  status
  contextGeneration
  programGeneration
  manifestRevision
  attributes
  uniforms
  meshLayoutFingerprint
  uniformPayloadFingerprint
  interfaceFingerprint
  resourceProfile
  failures
}
```

## Claim boundary

The current renderer does not yet produce this result. Existing CPU mesh validation and shader compile/link checks are necessary but not sufficient evidence.