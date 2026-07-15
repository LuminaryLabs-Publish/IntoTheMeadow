# Gameplay Audit: Vertex Wind and World Precision Risk Loop

**Timestamp:** `2026-07-15T06-01-26-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The active game is presentation-first, but the vertex shader already combines world position, camera projection, time, wind phase, gusts and outline extrusion. The compatibility wrapper changes that stage to an explicit `mediump` float policy without an authored world-range or motion-precision decision.

## Plan ledger

**Goal:** keep meadow motion and future player traversal stable as world scale, camera range and shader complexity grow.

- [x] Trace time and wind inputs into vertex deformation.
- [x] Trace world coordinates into clip-space depth and fog projection.
- [x] Identify missing range and precision budgets.
- [x] Preserve current gameplay and visuals.
- [ ] Add stress fixtures before expanding the world or movement loop.

## Current loop

```txt
RAF time
  -> renderPlan.time
  -> vertex wind phase
  -> world-position offset
  -> view-projection transform
  -> clip depth
  -> fragment fog and cel shading
```

The same effective precision policy is used regardless of world extent, camera far plane, wind frequency, outline width or future player movement range.

## Missing gameplay-facing evidence

```txt
authored world-coordinate range
camera range precision budget
wind phase error tolerance
outline displacement tolerance
path and player expansion budget
precision-policy revision bound to a scene
visual motion stability fixture
```

## Required admission rule

A scene or quality profile that exceeds the accepted coordinate, time or effect range must select a proven higher-precision policy, rebase coordinates, or reject the configuration. It must not rely on an invisible source rewrite.

## Boundary

No playable behavior is changed. The current active runtime remains time-only and the risks described here are not claimed as reproduced defects.
