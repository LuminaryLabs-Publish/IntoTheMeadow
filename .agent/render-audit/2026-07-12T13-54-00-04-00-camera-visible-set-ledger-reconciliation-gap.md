# Camera Visible-Set Ledger Reconciliation Gap

**Timestamp:** `2026-07-12T13-54-00-04-00`

## Summary

The camera affects matrices but not grass topology, batch selection or draw count. Every grass instance remains in one static mesh and the renderer submits the complete vertex count for both outline and color passes.

## Plan ledger

**Goal:** require render submission to cite an accepted grass visibility revision.

- [x] Record the current render order.
- [x] Record missing visible-set evidence.
- [x] Preserve the preceding program-interface dependency.
- [ ] Add runtime visibility and frame receipts later.

## Current order

```txt
ensure/reuse complete static mesh
  -> derive camera matrices
  -> upload uniforms
  -> draw mesh.vertexCount as outline
  -> draw mesh.vertexCount as color
  -> publish aggregate mesh/cache counts
```

## Missing evidence

```txt
camera revision
viewport revision
patch bounds and frustum result
visible/culled patch sets
per-tier instance and vertex counts
visibility revision
visible-set fingerprint
candidate install result
first visible grass frame receipt
```

## Required rule

No grass draw generation is current unless its camera, viewport, topology, policy and performance revisions match the committed frame plan. Candidate failure must preserve the predecessor visible set and stale results must not reach submission.
