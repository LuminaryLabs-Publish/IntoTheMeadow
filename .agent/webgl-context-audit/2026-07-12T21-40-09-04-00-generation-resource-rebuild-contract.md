# WebGL Generation and Resource Rebuild Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T21-40-09-04-00`

## Summary

The renderer needs separate context and resource generations because restoration may recreate resources without changing product state or CPU mesh identity. Every program, binding and buffer must be owned by exactly one context generation and installed only as one validated manifest.

## Plan ledger

**Goal:** define exact resource ownership, rebuild, rollback and retirement semantics for WebGL restoration.

- [x] Inventory context-bound resource roles.
- [x] Separate CPU mesh identity from GPU-resource identity.
- [x] Define candidate manifest and validation rules.
- [x] Define atomic install, rollback and exact-once retirement.
- [x] Define stale-handle rejection and observations.
- [ ] Implement the contract later.

## Current resource set

```txt
shader program: 1
attribute bindings: 5
  position
  normal
  color
  outline
  wind
uniform bindings: 10
  viewProjection
  time
  windDirection
  windStrength
  windGust
  outlinePass
  outlineWidth
  lightDirection
  rimColor
  outlineColor
  fogColor
  rimStrength
GPU buffers: 5
  positions
  normals
  colors
  outlines
  wind
```

The implementation actually captures twelve named uniform locations. The manifest must derive its count from declared roles rather than a stale hard-coded summary.

## Identity model

```txt
RendererId
  owns CanvasSurfaceId
  owns active WebGLContextId + ContextGeneration
  owns installed WebGLResourceGeneration

CPU Mesh
  identified by topologyKey and mesh fingerprint
  remains context independent

GPU resource
  identified by resource role + resource generation
  valid only for one context generation
```

## Candidate rebuild

```txt
RestorationCommand
  -> acquire/confirm successor context
  -> create candidate vertex shader
  -> create candidate fragment shader
  -> link candidate program
  -> resolve all required attribute/uniform bindings
  -> create five candidate buffers from detached CPU mesh
  -> establish viewport and baseline GL state
  -> calculate ResourceManifestFingerprint
  -> validate completeness and context ownership
```

## Atomic installation

```txt
candidate valid
  -> install context/resource generations together
  -> bind successor manifest as active
  -> publish ContextRecoveredResult
  -> retire predecessor handles exactly once where legal

candidate invalid
  -> delete every candidate shader/program/buffer created
  -> leave renderer in LOST/SUSPENDED
  -> preserve CPU mesh and last-good plan evidence
  -> publish ContextRecoveryFailedResult
```

## Validation rules

```txt
program linked successfully
all required attribute roles resolve
all required uniform roles resolve
all five buffer roles exist
buffer lengths match CPU mesh contract
candidate handles belong to successor context generation
baseline GL state is restored
no predecessor handle appears in candidate manifest
resource fingerprint is stable for the candidate inputs
```

## Stale-handle rules

```txt
resource.contextGeneration != activeContextGeneration
  -> reject use

resource.resourceGeneration != installedResourceGeneration
  -> reject use

RAF callback expectedResourceGeneration is stale
  -> zero draw mutation

repeated restoration event for installed generation
  -> duplicate result, zero rebuild
```

## Observation contract

```txt
WebGLContextObservation {
  rendererId
  phase
  contextGeneration
  installedResourceGeneration
  topologyKey
  resourceManifestFingerprint
  lossCount
  restorationAttemptCount
  successfulRecoveryCount
  failedRecoveryCount
  lastResult
}
```

The journal must be bounded and must never expose raw mutable WebGL handles.

## Completion boundary

Resource creation is not recovery. Recovery completes only after a complete manifest is installed and the first visible frame cites the same context and resource generations.
