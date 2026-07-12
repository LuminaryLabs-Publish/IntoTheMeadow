# Grass Visibility Central Reconciliation DSK Map

**Timestamp:** `2026-07-12T13-54-00-04-00`

## Summary

The repo-local grass visibility audit is authoritative and is now being synchronized with central tracking. The architecture must extend existing grass, camera, performance, render-plan and renderer owners rather than add a parallel renderer.

## Plan ledger

**Goal:** map one parent authority from committed camera evidence through visible-set admission and first-frame proof.

- [x] Preserve existing owners.
- [x] Map coordination kits.
- [x] Define transaction and dependency order.
- [ ] Implement later.

## Parent domain

```txt
meadow-grass-visibility-lod-authority-domain
```

## Existing owners to update first

```txt
grass-lod-policy-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-debug-visualization-kit
grass-patch-dsk
gpu-grass-render-dsk
meadow-camera-dsk
meadow-performance-dsk
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
meadow-render-plan-v2
meadow-mesh-builder-v2
renderer snapshot/read model
browser editor renderer capability
browser observation and renderer smoke
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
grass-distance-tier-fixture-kit
grass-frustum-cull-fixture-kit
grass-hysteresis-fixture-kit
grass-budget-fixture-kit
browser-grass-visibility-smoke-kit
```

## Transaction

```txt
camera + viewport + topology + policy + performance revisions
  -> classify bounds and distance
  -> apply hysteresis and budgets
  -> produce immutable result
  -> reject stale generations
  -> stage candidate mesh/draw generation
  -> atomically install or preserve predecessor
  -> publish observations
  -> acknowledge first visible frame
```

## Dependency position

This authority follows render topology, WebGL context/surface/precision/program-interface and adaptive-quality authorities. It precedes any claim that grass LOD is effective or performant.
