# Grass System Audit: Grass Source Render Proof Ledger

**Timestamp:** `2026-07-10T09-28-40-04-00`

## Current grass descriptor domains

```txt
grass-density-texture
grass-clump-archetype
grass-static-batch
grass-patch-placement
grass-instancing-render-descriptor
grass-shader-wind
grass-lod-policy
grass-density-scaling
grass-debug-visualization
```

## Implemented grass kits

```txt
grass-density-texture-kit: density texture
grass-clump-archetype-kit: clump card archetypes
grass-static-batch-kit: static batches
grass-patch-placement-kit: patch placements
grass-clump-instancing-render-kit: draw groups
grass-shader-wind-kit: shader wind descriptor
grass-lod-policy-kit: LOD policy
```

## Missing proof

```txt
density texture rows are not compared against renderer readback
static batch and archetype card counts are not fixture-proven
patch instance counts are not fixture-proven
draw group card/instance totals are not normalized into rows
shader wind and LOD policy consumption are not visible as proof rows
headless editor observations do not emit grass parity rows
```

## Next proof cut

```txt
src/render-proof/grass-consumption-ledger.js
tests/grass-consumption-ledger-smoke.mjs
GameHost.getSnapshot().proof.grass
NexusEditorEnvironment proof observation rows
```

## Deferred grass work

```txt
grass art tuning
new meadow content
renderer replacement
shared-kit promotion
```
