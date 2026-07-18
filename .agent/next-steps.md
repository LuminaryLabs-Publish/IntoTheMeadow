# Next Steps

**Updated:** `2026-07-18T07-40-23-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-descriptor-mesh-expansion-budget-authority-audited`

## Summary

Add a pre-build render-work estimate and one versioned admission path before mesh arrays or WebGL buffers are allocated.

## Intent

Prevent a valid-shaped render plan from expanding beyond the accepted profile, device and synchronous-work envelope.

## Checklist

### Estimation

- [ ] Implement a pure estimator from terrain resolution and all descriptor families.
- [ ] Share card, tube, quad and triangle expansion constants with the mesh builder.
- [ ] Estimate vertices, triangles and 12-float attribute payload per vertex.
- [ ] Publish contributor-level estimates for terrain, grass, flowers, cover, rocks, distant trees and hero tree.
- [ ] Publish `RenderWorkEstimateResult`.

### Admission

- [ ] Define versioned low, default and high render profiles.
- [ ] Add hard limits for terrain cells, field instances, vertices and typed attribute bytes.
- [ ] Bind admission to viewport/device class, provider revision and topology key.
- [ ] Publish `RenderBudgetAdmissionResult` before construction.
- [ ] Reject stale estimates after plan or profile changes.

### Overflow settlement

- [ ] Classify exact-limit, over-limit and invalid estimates.
- [ ] Add deterministic reduction ordering.
- [ ] Re-estimate after every reduction stage.
- [ ] Preserve required path, focal-tree and atmosphere identity.
- [ ] Retain the last accepted generation or bounded fallback on rejection.
- [ ] Publish `RenderOverflowSettlementResult`.

### Build and projection

- [ ] Require an accepted admission ID in `buildMeadowMeshData()`.
- [ ] Verify actual counts do not exceed admitted limits.
- [ ] Publish `MeshBuildResult` with actual vertex, triangle and attribute-byte counts.
- [ ] Add admission ID and mesh key to the renderer snapshot.
- [ ] Expose identical results through `GameHost` and `NexusEditorEnvironment`.
- [ ] Publish `FirstRenderBudgetBoundFrameAck`.

### Evidence

- [ ] Add exact-limit and one-over-limit fixtures.
- [ ] Add extreme terrain and grass fixtures.
- [ ] Add deterministic degradation repeatability.
- [ ] Add estimate-versus-actual parity fixtures.
- [ ] Add stale-generation and retained-last-good fixtures.
- [ ] Compare source, browser, artifact and Pages digests.

## Required result

```txt
RenderBudgetAdmissionResult {
  admissionId
  planDigest
  topologyKey
  profileRevision
  predictedVertices
  predictedTriangles
  predictedAttributeBytes
  limits
  degradationPlan
  status
  reasons[]
}
```

## Preserved dependencies

DSK activation, persistence, capture correlation, adaptive quality, diagnostics, content integrity, release/cache coherence, accessibility, audio, shader admission, editor settlement, startup readiness, reset/replay, viewport ownership, WebGL recovery, frame scheduling, progression and grass visibility remain separate bounded work.