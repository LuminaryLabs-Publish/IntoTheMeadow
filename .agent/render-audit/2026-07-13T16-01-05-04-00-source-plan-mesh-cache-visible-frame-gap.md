# Render Audit: Source Plan, Mesh Cache, and Visible-Frame Gap

**Generated:** `2026-07-13T16-01-05-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The rendered meadow can remain visually stale after an accepted source or policy change because the enhancer and renderer use incomplete fingerprints. Neither cache result is correlated with the first browser frame that visibly adopts the accepted source revision.

## Plan ledger

**Goal:** trace one render-affecting change from source evidence through enhancer reuse, mesh reuse, GPU submission and visible confirmation.

- [x] Trace source key construction.
- [x] Trace contract topology construction.
- [x] Trace mesh and GPU-buffer reuse.
- [x] Identify static vertex dependencies omitted from cache identity.
- [x] Identify missing visible-frame provenance.
- [ ] Implement and prove cache-visible convergence later.

## Current render path

```txt
raw source plan
  -> sourceTopologyKey
  -> enhancer reuse or rebuild
  -> contracted meadow-render-plan/v2
  -> contract.topologyKey
  -> CPU mesh reuse or rebuild
  -> GPU buffer reuse or replacement
  -> camera/light/wind uniforms
  -> outline draw
  -> color draw
  -> renderer snapshot
```

## Visible coherence gaps

```txt
source render-plan revision: absent
render policy revision: absent
enhancement dependency fingerprint: incomplete
contract descriptor revision: absent
mesh dependency fingerprint: absent
GPU buffer generation: absent
cache decision result: absent
frame source revision: absent
frame contract revision: absent
frame mesh revision: absent
first cache-revision frame acknowledgement: absent
```

## Stale presentation examples

```txt
flower palette changes
  -> enhancer key can remain unchanged
  -> previous contracted flower descriptors remain
  -> previous mesh remains visible

material palette changes
  -> enhancer can rebuild
  -> contract topology can remain unchanged
  -> renderer reuses old vertex-color buffers

atmosphere hills change
  -> source and contract keys can both omit the dependency
  -> previous hill geometry and color remain visible

performance profile changes
  -> runtime override is outside source cache identity
  -> old grass density and object budgets can remain visible
```

## Required frame envelope

```txt
RenderCacheFrameEnvelope {
  frameId
  hostGeneration
  sourceRevision
  policyRevision
  contractRevision
  meshRevision
  gpuGeneration
  enhancementFingerprint
  contractFingerprint
  meshFingerprint
  cacheDecisionId
  rendererSnapshotRevision
  presentedAt
}
```

## Required result

```txt
FirstCacheRevisionFrameAck {
  ackId
  cacheDecisionId
  frameId
  sourceRevision
  contractRevision
  meshRevision
  gpuGeneration
  status
  reason
}
```

## Boundary

No browser frame, screenshot or GPU readback fixture was executed. This audit does not claim a stale frame has been observed in production; it documents reachable cache and provenance gaps in the current source.