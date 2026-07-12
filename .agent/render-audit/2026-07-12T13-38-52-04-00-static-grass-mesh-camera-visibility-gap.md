# Render Audit: Static Grass Mesh Camera-Visibility Gap

**Timestamp:** `2026-07-12T13-38-52-04-00`

## Summary

Grass patches and nominal LOD labels are converted into one static CPU mesh before the renderer evaluates the camera. The renderer then submits the complete mesh for both outline and color passes, so visible grass work is not bounded by distance or frustum containment.

## Plan ledger

**Goal:** document the exact render handoff that prevents camera-bound grass visibility and define the required frame evidence.

- [x] Trace render-plan creation into mesh construction.
- [x] Trace camera use and draw submission.
- [x] Identify snapshot omissions.
- [ ] Add visible-set generations and first-frame proof later.

## Current render flow

```txt
static grass patches and groups
  -> topology key includes every instance
  -> buildMeadowMeshData iterates every group/instance/card
  -> grass joins terrain, flowers, rocks, trees and atmosphere
  -> one mesh and one vertexCount

renderer.render(plan)
  -> ensure/reuse complete mesh
  -> derive view/projection from camera
  -> upload uniforms
  -> draw complete vertexCount as outline
  -> draw complete vertexCount as color
```

## Missing render evidence

```txt
camera revision
viewport revision
visibility revision
patch bounds tested
frustum result per patch
distance tier per patch
visible/culled patch counts
per-tier instance and vertex counts
budget reductions
visible-set fingerprint
mesh/draw generation tied to visibility
first visible grass-frame receipt
```

## Required handoff

```txt
accepted GrassVisibilityResult
  -> current visible-set generation
  -> current mesh/draw generation
  -> renderer draw admission
  -> frame snapshot with per-tier counts
  -> first visible frame acknowledgement
```

## Claim boundary

The source proves complete static-mesh submission, not the measured cost or visible severity. No rendering code was changed and no browser capture was executed.
