# Gameplay Audit: Density-Tagged LOD Always-Drawn Loop

**Timestamp:** `2026-07-12T13-38-52-04-00`

## Summary

Grass density currently determines whether an instance receives a near or mid batch, and that choice persists for the entire static topology. Camera movement cannot promote, demote, tint or cull the instance, so the nominal LOD system does not react to player view changes.

## Plan ledger

**Goal:** identify how the current content-generation loop bypasses distance LOD and define the gameplay-facing continuity rules for camera movement.

- [x] Trace density into batch choice.
- [x] Confirm far and terrain-tint are unreachable.
- [x] Trace static choice into always-drawn geometry.
- [ ] Add deterministic camera transition behavior later.

## Current loop

```txt
patch density > 0.55
  -> choose near batch
otherwise
  -> choose mid batch

camera approaches patch
  -> batch unchanged
camera leaves patch behind
  -> batch unchanged
camera moves beyond far range
  -> batch unchanged
renderer frame
  -> patch geometry remains in complete mesh
```

## Gameplay consequences

```txt
view changes have no grass complexity response
far and tint policy cannot reduce distant grass
outside-view patches remain represented in draw geometry
threshold continuity cannot be evaluated
quality policy cannot prioritize visible grass
camera teleport has no explicit visibility transaction
```

## Required behavior

```txt
camera observation
  -> classify visible patch bounds
  -> select distance representation
  -> preserve tier through hysteresis
  -> apply deterministic quality budget
  -> publish transition result
  -> render first frame carrying the accepted revision
```

## Claim boundary

This audit identifies an authority and reachability defect. It does not claim a measured frame-rate loss or a specific user-visible artifact.
