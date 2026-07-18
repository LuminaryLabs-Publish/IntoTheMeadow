# Render Audit: Descriptor Count and Vertex Budget Gap

**Timestamp:** `2026-07-18T07-40-23-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The render contract reports descriptor counts but does not decide whether those descriptors are safe to expand. The mesh builder performs full synchronous expansion before any vertex or byte readback exists.

## Source trace

```txt
validateMeadowRenderPlanV2
  -> schema/version/id/type/array checks
  -> no maximum terrain segments
  -> no maximum draw-group instances
  -> no maximum field or tree descriptors

buildMeadowMeshData
  -> builds every accepted terrain cell
  -> expands every grass card for every instance
  -> expands every flower, cover, rock, distant tree and hero-tree descriptor
  -> validates only matching attribute-array lengths

renderer
  -> creates position, normal, color, outline and wind Float32Array buffers
  -> uploads and draws the complete mesh twice
```

## Source arithmetic

```txt
12 floats per vertex = 48 typed-array bytes
near grass instance: 28 cards × 15 vertices = 420 vertices
mid grass instance: 16 cards × 15 vertices = 240 vertices
far grass instance: 4 cards × 15 vertices = 60 vertices
```

These values do not include retained JavaScript arrays, temporary objects, WebGL driver copies or command overhead.

## Missing render proof

- Accepted profile and hard limits.
- Predicted versus actual vertex count.
- Predicted versus actual typed attribute bytes.
- Overflow classification.
- Deterministic reduction order.
- Mesh build duration and failure settlement.
- Plan, mesh and frame digest convergence.
- `FirstRenderBudgetBoundFrameAck`.

## Proposed correction

Estimate the complete mesh expansion before construction, admit it under one profile generation, deterministically reduce or reject overflow, and expose actual mesh readback in the renderer snapshot.

## Boundary

No visual defect or measured performance regression was reproduced. Documentation only.