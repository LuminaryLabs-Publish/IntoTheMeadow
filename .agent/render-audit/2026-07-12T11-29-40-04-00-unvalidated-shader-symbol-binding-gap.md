# Render Audit: Unvalidated Shader Symbol Binding Gap

**Timestamp:** `2026-07-12T11-29-40-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The WebGL renderer treats successful compilation and linking as sufficient program readiness. It queries five attributes and twelve uniforms, but does not reflect or validate the active program interface as one artifact before buffers, uniform updates and draws depend on it.

## Plan ledger

**Goal:** make a renderer frame admissible only after its exact linked-program symbols are proven compatible with the CPU mesh and uniform payloads.

- [x] Trace compile and link checks.
- [x] Count queried attributes and uniforms.
- [x] Trace attribute failure handling.
- [x] Trace uniform update behavior.
- [x] Trace draw submission and snapshot publication.
- [x] Inspect CPU and browser proof coverage.
- [ ] Add executable program-interface admission.

## Current path

```txt
createProgram()
  -> compile vertex shader
  -> compile fragment shader
  -> link program
  -> query five attribute locations
  -> query twelve uniform locations
  -> no active-interface inventory
  -> no aggregate admission result

first render
  -> build CPU mesh
  -> attribute location below zero throws during buffer creation
  -> uniform updates execute with stored locations
  -> null uniform locations remain silent WebGL no-ops
  -> outline and color draws execute
  -> snapshot reports counts/cache state
```

## Visible-state risk

A linked program can be syntactically valid while its active interface differs from the host’s assumptions because of source changes, optimization, compatibility rewriting or device/compiler behavior.

Reachable classifications include:

```txt
missing attribute
  -> failure occurs only during first topology bind
  -> earlier program creation appeared successful

missing required uniform
  -> getUniformLocation returns null
  -> update becomes a no-op
  -> draw can continue without the intended effect

symbol type or size mismatch
  -> no pre-draw manifest comparison exists
  -> host may issue the wrong update or binding operation

program candidate failure after predecessor exists
  -> no detached candidate generation or rollback result exists
```

A missing `uTime`, wind uniform, light uniform or pass-control uniform can alter visible motion, shading or pass behavior without one typed rejection explaining the frame.

## Snapshot gap

Current renderer snapshots contain:

```txt
planId
schema
topologyKey
vertexCount
triangleCount
primitiveFallbackCount
descriptorCounts
rebuildCount
cacheHitCount
cacheState
postProcessMode
render-plan validation
```

They do not contain:

```txt
contextGeneration
programGeneration
interfaceManifestRevision
activeAttributeInventory
activeUniformInventory
interfaceFingerprint
meshLayoutFingerprint
uniformPayloadFingerprint
uniformUpdateResults
drawAdmissionResult
GPU error result
```

## Required render-frame receipt

```txt
RenderFrameReceipt {
  frameId
  planId
  topologyKey
  contextGeneration
  programGeneration
  interfaceFingerprint
  meshLayoutFingerprint
  uniformPayloadFingerprint
  outlineDrawResult
  colorDrawResult
  presented
}
```

## Acceptance conditions

```txt
all required attributes and uniforms are reflected
exact GL types and sizes match the manifest
mesh layout matches active attributes
uniform payload operations match active uniforms
program/resource limits are admitted
no draw uses stale context/program/interface generations
snapshot and browser capture cite the same interface fingerprint
```

## Validation boundary

No renderer source or visible output was changed. No browser, WebGL1, WebGL2 or missing-symbol fixture was executed.