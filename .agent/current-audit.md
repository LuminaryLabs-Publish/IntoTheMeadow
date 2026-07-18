# Current Audit: Render Descriptor and Mesh Expansion Budget

**Updated:** `2026-07-18T07-40-23-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-descriptor-mesh-expansion-budget-authority-audited`  
**Immediate predecessor:** `dsk-dependency-closure-activation-truth-authority-central-reconciled`

## Summary

The active renderer receives `meadow-render-plan/v2`, verifies schema and required descriptor families, then synchronously expands all accepted terrain, grass, flower, cover, rock, tree and atmosphere descriptors into one mesh. The plan reports descriptor counts, but no count, resolution, predicted-vertex or attribute-byte budget is admitted before construction.

## Intent

Make render work bounded and truthful before CPU allocation or WebGL upload, and prove that the visible frame uses the accepted plan, mesh and budget generation.

## Checklist

- [x] Compare Publish inventory and central tracking.
- [x] Select only IntoTheMeadow by the oldest synchronized timestamp.
- [x] Inspect render-plan contract, validation, mesh expansion, WebGL upload and smoke tests.
- [x] Preserve all 44 declared kit surfaces and offered services.
- [x] Add the timestamped render-budget audit family.
- [x] Change documentation only on `main`.
- [ ] Implement and prove render-work admission later.

## Main finding

```txt
descriptorCounts: present
topologyKey: present
required type/array validation: present
terrain-resolution limit: absent
field-instance limits: absent
predicted vertex count: absent
predicted attribute bytes: absent
profile-bound admission: absent
overflow settlement: absent
deterministic degradation: absent
FirstRenderBudgetBoundFrameAck: absent
```

## Source basis

- `src/render-contract/meadow-render-plan-v2.js` computes counts but validates only schema, IDs, required types, array presence and unknown source types.
- `src/renderers/meadow-mesh-builder-v2.js` expands every accepted descriptor into five unbounded JavaScript attribute arrays.
- `src/renderers/meadow-webgl-renderer-v2.js` converts the complete arrays into five `Float32Array` uploads and draws the mesh twice.
- `performance` is carried on the render plan but is not consumed by contract validation, mesh construction or renderer admission.
- Existing smoke tests assert ordinary output and array parity, not limits, overflow or estimated-versus-actual work.

## Source arithmetic

```txt
12 floats per vertex = 48 typed-array bytes
near grass instance = 28 cards × 15 vertices = 420 vertices
mid grass instance = 16 cards × 15 vertices = 240 vertices
far grass instance = 4 cards × 15 vertices = 60 vertices
```

This excludes JavaScript-array storage, temporary allocations, WebGL driver copies and command overhead.

## Required parent domain

`meadow-render-descriptor-mesh-expansion-budget-authority-domain`

## Required transaction

```txt
RenderWorkEstimateCommand -> RenderWorkEstimateResult
RenderBudgetAdmissionCommand -> RenderBudgetAdmissionResult
RenderOverflowSettlementCommand -> RenderOverflowSettlementResult
MeshBuildCommitCommand -> MeshBuildResult
RenderBudgetProjectionCommitCommand -> FirstRenderBudgetBoundFrameAck
```

## Boundary

Documentation only. No runtime, renderer, DSK, provider, gameplay, test, workflow or deployment behavior changed.