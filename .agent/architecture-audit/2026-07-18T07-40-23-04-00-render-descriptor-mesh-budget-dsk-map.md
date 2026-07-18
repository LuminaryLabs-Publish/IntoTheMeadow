# Architecture Audit: Render Descriptor and Mesh Budget DSK Map

**Timestamp:** `2026-07-18T07-40-23-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current composition

```txt
meadow-area-kit
  -> source render plan
  -> createRenderPlanEnhancer
  -> meadow-render-plan/v2
     -> terrainSurface
     -> grass staticBatches and drawGroups
     -> flower, cover, rock and distant-tree fields
     -> focal-tree segments and leaf clusters
     -> descriptorCounts
     -> topologyKey
  -> validateMeadowRenderPlanV2
  -> buildMeadowMeshData
     -> positions / normals / colors / outlines / wind arrays
  -> five Float32Array WebGL buffer uploads
  -> outline pass + main pass
```

## Existing DSK ownership

- `game-composition-dsk`: render composition and composition validation.
- `meadow-performance-dsk`: quality profile, budget policy, LOD policy and adaptive scaling declarations.
- `meadow-render-host-dsk`: render-plan ingest, pass order, renderer state and validation.
- `meadow-webgl-renderer-v2-kit`: concrete mesh build, attribute upload, draw and snapshot surface.
- Grass DSK/kits: density, archetype, batch, placement and instancing descriptors.
- `post-process-stack-dsk`: declared post-process composition.

## Ownership gap

No current domain owns pre-build work estimation, hard admission limits, deterministic overflow degradation, mesh-build settlement or budget-bound frame proof. `performance` is carried on the plan but is not consumed by validation, mesh construction or the WebGL renderer.

## Required parent domain

`meadow-render-descriptor-mesh-expansion-budget-authority-domain`

## DSK/domain breakdown

```txt
n:meadow:render-budget
├─ n:meadow:render-budget:estimate
│  ├─ terrain-resolution-budget-kit
│  ├─ grass-card-expansion-budget-kit
│  ├─ field-instance-budget-kit
│  ├─ hero-tree-expansion-budget-kit
│  ├─ vertex-count-estimate-kit
│  └─ attribute-byte-estimate-kit
├─ n:meadow:render-budget:admission
│  ├─ render-profile-selection-kit
│  ├─ hard-limit-policy-kit
│  └─ render-budget-admission-kit
├─ n:meadow:render-budget:settlement
│  ├─ overflow-classification-kit
│  ├─ deterministic-degradation-policy-kit
│  └─ render-plan-budget-result-kit
├─ n:meadow:render-budget:build
│  ├─ mesh-build-admission-kit
│  ├─ mesh-build-result-kit
│  └─ stale-budget-generation-rejection-kit
└─ n:meadow:render-budget:proof
   ├─ renderer-budget-readback-kit
   ├─ render-budget-fixture-kit
   └─ first-render-budget-bound-frame-ack-kit
```

## Required transaction

```txt
RenderWorkEstimateCommand -> RenderWorkEstimateResult
RenderBudgetAdmissionCommand -> RenderBudgetAdmissionResult
RenderOverflowSettlementCommand -> RenderOverflowSettlementResult
MeshBuildCommitCommand -> MeshBuildResult
RenderBudgetProjectionCommitCommand -> FirstRenderBudgetBoundFrameAck
```

## Boundary

Proposed architecture only. No DSK or runtime implementation changed.