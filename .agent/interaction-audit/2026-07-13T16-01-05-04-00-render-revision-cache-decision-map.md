# Interaction Audit: Render Revision and Cache Decision Map

**Generated:** `2026-07-13T16-01-05-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The current interaction between game state, enhancer, renderer and editor exposes cache counters but no command/result boundary. A complete render revision needs typed admission, rebuild scope, participant receipts and visible completion.

## Plan ledger

**Goal:** map the exact command and result flow required to prevent stale enhancer, mesh and GPU-buffer reuse.

- [x] Identify current producers and consumers.
- [x] Identify missing identities and revisions.
- [x] Define cache decisions and participant receipts.
- [x] Define public and visible completion.
- [ ] Implement the command/result flow later.

## Current map

```txt
game.getRenderPlan
  -> unversioned raw plan

planEnhancer.enhance
  -> sourceTopologyKey
  -> implicit hit or miss
  -> cached contracted plan

renderer.render
  -> contract.topologyKey
  -> implicit mesh hit or miss
  -> mutable GPU buffers
  -> renderer snapshot counters

editor bridge
  -> reads snapshots and captures canvas
  -> receives no shared source, contract, mesh or frame revision
```

## Required command

```txt
RenderRevisionCommand {
  commandId
  hostGeneration
  expectedSourceRevision
  expectedPolicyRevision
  expectedContractRevision
  expectedMeshRevision
  expectedGpuGeneration
  rawPlan
  runtimePolicy
  requestedAt
}
```

## Required decision classes

```txt
ReuseAll
UpdateDynamicUniforms
RebuildContract
RebuildMesh
RebuildContractAndMesh
RejectInvalid
RejectStale
RejectDuplicate
Superseded
FailedPreparation
RolledBack
```

## Required participant receipts

```txt
SourceNormalizationReceipt
EnhancerAdmissionReceipt
ContractValidationReceipt
MeshPreparationReceipt
GpuBufferPreparationReceipt
AtomicAdoptionReceipt
RollbackReceipt
FrameSubmissionReceipt
FirstVisibleFrameReceipt
```

## Required result

```txt
RenderCacheDecisionResult {
  commandId
  status
  decision
  reason
  sourceRevision
  policyRevision
  contractRevision
  meshRevision
  gpuGeneration
  fingerprints
  receipts
  frameRequired
  firstFrameAckId?
}
```

## Admission rules

```txt
missing dependency manifest -> reject
fingerprint mismatch with claimed cache hit -> reject and diagnose
stale predecessor revision -> zero mutation
identical complete fingerprints -> explicit reuse result
uniform-only changes -> no mesh rebuild
mesh-affecting changes -> candidate mesh and buffers required
candidate failure -> preserve predecessor plan, mesh and buffers
accepted change requiring presentation -> incomplete until visible-frame ack
```

## Boundary

No commands, results, receipts or cache decision classes are implemented by this documentation pass.