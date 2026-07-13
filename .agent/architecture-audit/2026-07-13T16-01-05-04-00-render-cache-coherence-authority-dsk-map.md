# Architecture Audit: Render Cache Coherence Authority DSK Map

**Generated:** `2026-07-13T16-01-05-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The current render pipeline has two independent caches but no bounded domain that owns dependency classification, invalidation, rebuild scope, atomic adoption or visible proof. Cache ownership should sit above the enhancer and renderer as a coordinating DSK, not inside either adapter alone.

## Plan ledger

**Goal:** separate source-plan, contract, mesh, GPU-buffer and dynamic-uniform responsibilities while giving one authority the final cache decision.

- [x] Trace source fingerprint construction.
- [x] Trace contracted-plan topology construction.
- [x] Trace CPU mesh and GPU-buffer reuse.
- [x] Identify omitted dependencies at both cache boundaries.
- [x] Preserve existing provider, world, grass, render and editor domains.
- [x] Define bounded candidate kits and ownership rules.
- [ ] Implement the authority later.

## Current composition

```txt
meadow-area-kit
  -> raw meadow render plan

createRenderPlanEnhancer
  -> sourceTopologyKey
  -> cached contracted meadow-render-plan/v2

createMeadowRenderPlanV2 + tuneContractedPlan
  -> contract.topologyKey

meadow-webgl-renderer-v2
  -> cached CPU mesh
  -> cached GPU attribute buffers
  -> draw submission
```

## Ownership problem

```txt
source cache key owns only a selected source-field subset
contract topology key owns only a selected contracted-field subset
mesh builder consumes a broader dependency set
renderer assumes contract.topologyKey fully represents that broader set
no authority proves the assumption
```

## Required parent domain

```txt
meadow-render-cache-coherence-authority-domain
```

## Bounded child domains

### Source revision domain

```txt
source-render-plan-revision-kit
render-policy-revision-kit
render-dependency-manifest-kit
descriptor-dependency-classification-kit
enhancement-dependency-fingerprint-kit
```

Owns immutable source identity, complete dependency enumeration, policy identity and classification into dynamic, contracted and mesh-affecting values.

### Contract revision domain

```txt
contract-descriptor-fingerprint-kit
render-cache-command-kit
render-cache-decision-kit
stale-render-revision-rejection-kit
duplicate-render-revision-suppression-kit
enhancer-cache-admission-kit
contract-cache-admission-kit
```

Owns contracted descriptor identity and the decision to reuse or rebuild the enhancer result.

### Mesh and GPU generation domain

```txt
mesh-dependency-fingerprint-kit
dynamic-uniform-fingerprint-kit
mesh-cache-admission-kit
gpu-buffer-generation-kit
mesh-candidate-preparation-kit
gpu-buffer-candidate-preparation-kit
```

Owns every value consumed by CPU mesh construction, static vertex buffers and dynamic uniforms. It must distinguish a uniform-only update from a mesh rebuild.

### Adoption and proof domain

```txt
render-cache-atomic-adoption-kit
render-cache-rollback-kit
render-cache-journal-kit
render-cache-public-readback-kit
first-cache-revision-frame-ack-kit
render-cache-fixture-gate-kit
```

Owns participant preparation, predecessor preservation, atomic adoption, terminal results, public diagnostics and visible proof.

## Required service contract

```txt
RenderCacheDecisionResult {
  commandId
  sourceRevision
  policyRevision
  predecessorContractRevision
  contractRevision
  predecessorMeshRevision
  meshRevision
  predecessorGpuGeneration
  gpuGeneration
  decision
  reason
  enhancementFingerprint
  contractFingerprint
  meshFingerprint
  dynamicUniformFingerprint
  enhancerReceipt
  meshReceipt
  gpuReceipt
  rollbackReceipt?
  frameRequired
  firstFrameAckId?
}
```

## Invariants

```txt
every contracted descriptor dependency is represented in the enhancement fingerprint
every CPU mesh input is represented in the mesh fingerprint
dynamic uniforms do not force static mesh rebuilds
mesh-affecting changes cannot be classified as cache hits
stale or duplicate revisions produce zero mutation
GPU buffers are replaced only after candidate preparation succeeds
contracted plan, CPU mesh and GPU buffers adopt one coherent generation
public cache counters cite the same source, contract and mesh revisions
a visible frame acknowledgement closes every accepted revision requiring presentation
```

## Boundary

This audit defines architecture only. It does not change the enhancer, render contract, mesh builder, WebGL renderer or tests.