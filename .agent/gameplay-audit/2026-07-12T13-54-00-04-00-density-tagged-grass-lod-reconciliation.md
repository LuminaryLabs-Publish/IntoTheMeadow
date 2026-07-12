# Density-Tagged Grass LOD Reconciliation

**Timestamp:** `2026-07-12T13-54-00-04-00`

## Summary

Grass density currently determines both local population and permanent near/mid geometry selection. That merges content distribution with camera LOD and makes far, terrain-tint and culled states unreachable.

## Plan ledger

**Goal:** separate authored density from runtime visibility and representation selection.

- [x] Trace density sampling to batch assignment.
- [x] Trace batches to draw groups and the static mesh.
- [x] Record unreachable tiers.
- [ ] Move tier selection behind camera-bound authority later.

## Current loop

```txt
density sample
  -> density > 0.55 selects a near batch
  -> otherwise selects a mid batch
  -> instance is copied into a static draw group
  -> all groups are baked into one mesh
  -> every frame draws the complete mesh
```

## Required separation

```txt
density
  -> controls probability, spacing and local complexity

camera visibility authority
  -> controls near, mid, far, terrain-tint or culled representation
```

The visible tier must not be permanently encoded during patch creation.
