# Architecture Audit: Grass Visibility and LOD Authority

**Timestamp:** `2026-07-12T13-38-52-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The existing grass family owns density, archetypes, batches, patches, wind and nominal LOD policy, but no domain owns the camera-bound visible grass set. The missing parent authority should coordinate existing owners rather than introduce a second grass renderer.

## Plan ledger

**Goal:** define the DSK boundary and ownership flow required to convert static density-tagged grass into revisioned camera-visible grass.

- [x] Map existing grass and render owners.
- [x] Identify the missing parent domain.
- [x] Define command, result, generations and rejection boundaries.
- [x] Preserve the current renderer as the implementation owner.
- [ ] Implement after prerequisite camera, surface, program and frame authorities.

## Current ownership

```txt
grass-density-texture-kit
  -> density field

grass-clump-archetype-kit
  -> card layouts and variants

grass-static-batch-kit
  -> near/mid/far batch descriptors

grass-patch-placement-kit
  -> patch grid and density-selected instances

grass-clump-instancing-render-kit
  -> global draw-group aggregation

grass-lod-policy-kit
  -> unused distance thresholds

meadow-mesh-builder-v2
  -> bakes all grass into one scene mesh

meadow-webgl-renderer-v2-kit
  -> draws complete mesh twice
```

## Missing parent domain

```txt
meadow-grass-visibility-lod-authority-domain
```

## Existing owners to extend

```txt
grass-lod-policy-kit
  -> canonical tiers and hysteresis thresholds

grass-patch-placement-kit
  -> stable bounds and density/content identity only

grass-clump-instancing-render-kit
  -> consume accepted visible sets

grass-static-batch-kit
  -> represent near, mid and far tiers

grass-patch-dsk / gpu-grass-render-dsk
  -> domain services and renderer contract

meadow-camera-dsk
  -> committed camera revision

meadow-performance-dsk
  -> patch, instance, vertex and draw budgets

meadow-render-plan-v2
  -> topology and visibility contract references

meadow-mesh-builder-v2
  -> build accepted visible geometry generations

meadow-webgl-renderer-v2-kit
  -> admit current visibility generation and publish receipts
```

## Coordinating kits

```txt
grass-visibility-command-kit
grass-visibility-command-id-kit
camera-visibility-revision-kit
grass-patch-bounds-kit
grass-frustum-classification-kit
grass-distance-band-kit
grass-lod-transition-policy-kit
grass-lod-hysteresis-kit
grass-terrain-tint-representation-kit
grass-visibility-budget-kit
grass-visible-set-kit
grass-visibility-result-kit
grass-visible-mesh-generation-kit
grass-draw-generation-kit
stale-grass-visibility-rejection-kit
grass-visibility-observation-kit
grass-visibility-journal-kit
first-grass-visibility-frame-ack-kit
```

## Transaction

```txt
CameraFrame + Viewport + GrassTopology + PerformancePolicy
  -> validate exact revisions and finite values
  -> test patch bounds against frustum
  -> measure distance to admitted bounds
  -> choose near/mid/far/tint/culled
  -> apply predecessor hysteresis
  -> apply budgets and deterministic priority
  -> create GrassVisibilityResult
  -> reject stale or failed candidate
  -> atomically install visible-set generation
  -> build/admit mesh and draw generation
  -> publish observation and first-frame receipt
```

## Invariants

```txt
density never substitutes for camera distance
all declared tiers are either reachable or removed
outside-frustum patches contribute no blade geometry
tier changes cite predecessor and current revisions
budget reduction is explicit and deterministic
stale camera/viewport/topology/policy results cannot install
candidate failure preserves the predecessor visible set
renderer snapshots cite the accepted visibility revision
```

## Dependency position

This authority follows runtime lifecycle, clock, provider, topology, context, render-surface, precision, program-interface, committed-frame and adaptive-quality foundations. It precedes final visual performance claims and browser/Pages parity claims.
