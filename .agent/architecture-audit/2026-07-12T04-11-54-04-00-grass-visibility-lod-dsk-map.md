# Architecture Audit: Grass Visibility and LOD DSK Map

**Timestamp:** `2026-07-12T04-11-54-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Current ownership

```txt
grass-density-texture-kit
  deterministic density and path suppression

grass-clump-archetype-kit
  clump families, variants and local cards

grass-static-batch-kit
  near, mid and far static card subsets

grass-patch-placement-kit
  patch grid, density admission and instance transforms

grass-clump-instancing-render-kit
  grouping by batch and material

grass-lod-policy-kit
  declared distance tiers

meadow-performance-dsk
  quality and budget descriptors

meadow-camera-dsk
  camera descriptor declaration

render-plan enhancer
  topology cache and grass composition

CPU mesh builder
  complete static triangle expansion

meadow-webgl-renderer-v2-kit
  buffer ownership and draw submission
```

## Current dependency failure

```txt
camera state
  X-> grass patch distance
  X-> grass frustum admission
  X-> grass LOD policy

grass-lod-policy-kit
  X-> patch batch selection
  X-> draw groups
  X-> CPU mesh builder

quality/budget descriptors
  X-> typed applied grass plan

render result
  X-> grass visible-set revision
  X-> first visible grass-frame receipt
```

## Required parent domain

```txt
meadow-grass-visibility-lod-authority-domain
```

## Child kits

```txt
observation and identity
  grass-view-observation-kit
  grass-camera-revision-kit
  grass-visible-set-revision-kit

spatial evidence
  grass-patch-bounds-kit
  grass-patch-distance-kit
  grass-frustum-admission-kit

policy and budgets
  grass-lod-selection-kit
  grass-instance-budget-kit
  grass-card-budget-kit
  grass-terrain-tint-transition-kit

commit and rendering
  grass-visible-set-kit
  grass-draw-plan-kit
  grass-draw-plan-result-kit
  stale-grass-visibility-rejection-kit

observation and proof
  grass-visibility-observation-kit
  grass-visibility-journal-kit
  grass-visible-frame-ack-kit
  grass-lod-distance-fixture-kit
  grass-frustum-fixture-kit
  grass-budget-fixture-kit
  browser-grass-traversal-smoke-kit
```

## Correct dependency direction

```txt
camera/surface/context/quality authority
  -> grass visibility and LOD authority
  -> immutable draw plan
  -> CPU or GPU renderer adapter
  -> diagnostics/readback
  -> visible-frame acknowledgement
```

## DSK update policy

Update existing grass kits first. Add coordinating kits only for responsibilities that no current owner can express without overlap. Do not place a second distance policy in the renderer and do not let density select view LOD.

## Required invariants

```txt
placement density and view LOD remain separate concerns
one policy revision classifies all patches
one camera revision produces one visible-set revision
far and terrain-tint tiers are reachable
frustum-rejected patches contribute zero draw work
budgets produce explicit deterministic results
stale plans cannot mutate active buffers
renderer and diagnostics consume the same committed result
```
