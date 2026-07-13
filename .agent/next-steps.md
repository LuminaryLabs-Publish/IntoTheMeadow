# Next Steps

**Updated:** `2026-07-13T16-01-05-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-plan-mesh-cache-coherence-authority-central-reconciled`

## Summary

Implement cache coherence as a bounded coordinating domain. Keep plan enhancement, mesh construction, GPU upload and browser capture as adapters, but require them to consume one admitted render revision and return explicit participant receipts.

## Plan ledger

**Goal:** introduce the smallest complete path from source and policy revisions to correct cache reuse, atomic rebuild adoption and first matching visible frame.

### Identity and manifests

- [ ] Add `SourceRenderPlanRevision`, `RenderPolicyRevision`, `ContractRevision`, `MeshRevision` and `GpuBufferGeneration`.
- [ ] Generate a dependency manifest for the enhancer, contract builder and mesh builder.
- [ ] Classify each dependency as dynamic-uniform, contract-only or mesh-affecting.
- [ ] Reject consumer reads that are absent from the declared manifest in tests.

### Fingerprints

- [ ] Replace partial `sourceTopologyKey` admission with `EnhancementDependencyFingerprint`.
- [ ] Add `ContractDescriptorFingerprint` for the complete contracted graph.
- [ ] Add `MeshDependencyFingerprint` for every value read by `buildMeadowMeshData()`.
- [ ] Add `DynamicUniformFingerprint` for time, camera, light, sky and wind state that does not require static mesh replacement.
- [ ] Version fingerprint schemas and builders.

### Admission and decisions

- [ ] Add `RenderRevisionCommand` and `RenderCacheDecisionResult`.
- [ ] Validate expected source, policy, contract, mesh and GPU predecessor revisions.
- [ ] Return explicit `ReuseAll`, `UpdateDynamicUniforms`, `RebuildContract`, `RebuildMesh`, `RebuildContractAndMesh`, rejection and rollback decisions.
- [ ] Reject stale, duplicate, incomplete and superseded work with zero mutation.

### Participant preparation

- [ ] Prepare contracted render-plan candidates without replacing the active cache.
- [ ] Prepare CPU mesh candidates without deleting active GPU buffers.
- [ ] Prepare all GPU attribute buffers before retiring predecessors.
- [ ] Validate mesh array lengths, vertex counts, descriptors and buffer allocations under one revision.

### Commit and recovery

- [ ] Atomically adopt contracted plan, CPU mesh and GPU buffers.
- [ ] Publish participant preparation and adoption receipts.
- [ ] Preserve active plan, mesh and buffers on candidate failure.
- [ ] Dispose predecessor buffers only after successful adoption.
- [ ] Publish explicit rollback or surface-loss results.

### Readback and visible proof

- [ ] Add source, policy, contract, mesh and GPU revisions to enhancer and renderer snapshots.
- [ ] Add `GameHost.getRenderCacheState()`.
- [ ] Make editor capture cite the cache decision and visible frame.
- [ ] Publish `FirstCacheRevisionFrameAck`.
- [ ] Return `not-ready`, predecessor or acknowledged-successor status for captures during transitions.

### Proof

- [ ] Mutate wildflower color and accent only.
- [ ] Mutate rock and distant-tree palette only.
- [ ] Mutate atmosphere hill geometry and color.
- [ ] Mutate path rut and pebble counts.
- [ ] Mutate focal-tree trunk, root, leaf, material and outline values.
- [ ] Mutate runtime performance quality and density policy.
- [ ] Mutate grass and terrain material palettes.
- [ ] Prove time-only and supported uniform-only cache hits.
- [ ] Inject contract, mesh and GPU-buffer failures.
- [ ] Prove predecessor preservation and atomic adoption.
- [ ] Prove source, contract, mesh, renderer, capture and visible-frame parity.
- [ ] Run `npm run check`, source browser smoke, production build, built-output smoke and Pages smoke.

## Required result

```txt
RenderCacheDecisionResult {
  commandId
  hostGeneration
  status
  decision
  reason
  sourceRevision
  policyRevision
  predecessorContractRevision
  contractRevision
  predecessorMeshRevision
  meshRevision
  predecessorGpuGeneration
  gpuGeneration
  enhancementFingerprint
  contractFingerprint
  meshFingerprint
  dynamicUniformFingerprint
  enhancerReceipt
  contractReceipt
  meshReceipt
  gpuReceipt
  adoptionReceipt
  rollbackReceipt?
  frameRequired
  firstFrameAckId?
}
```

## Dependency order

```txt
host lifecycle generation
  -> source and policy revisions
  -> generated dependency manifests
  -> exhaustive fingerprints
  -> typed cache decision
  -> detached contract, mesh and GPU candidates
  -> atomic adoption or rollback
  -> revisioned renderer/readback/capture
  -> first visible cache-revision acknowledgement
```

## Preserved dependencies

Viewport authority, browser editor admission, host retirement, workspace containment, provider parity, WebGL recovery, frame scheduling, DSK runtime consumption, playable progression, grass visibility, audio lifecycle, save/migration and replay remain separate bounded work.