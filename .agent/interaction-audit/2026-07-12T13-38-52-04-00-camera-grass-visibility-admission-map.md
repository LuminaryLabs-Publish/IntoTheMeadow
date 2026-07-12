# Interaction Audit: Camera to Grass Visibility Admission

**Timestamp:** `2026-07-12T13-38-52-04-00`

## Summary

The current camera influences only the view/projection matrix. It does not submit a revisioned grass-visibility command, so camera movement has no authoritative path into patch classification, LOD selection or culling.

## Plan ledger

**Goal:** define the command/result map connecting committed camera changes to current grass draw work.

- [x] Identify current camera-to-render path.
- [x] Identify missing admission and result boundaries.
- [x] Define stale-result and first-frame requirements.
- [ ] Implement after camera and committed-frame revisions exist.

## Current map

```txt
camera descriptor
  -> renderer matrix calculation
  -> full static mesh draw
```

## Required map

```txt
CameraObservation {
  cameraRevision
  position
  orientation
  projection
}

ViewportObservation {
  viewportRevision
  width
  height
  pixelRatio
}

GrassVisibilityCommand
  -> validate camera, viewport, topology and policy revisions
  -> classify patch bounds
  -> apply distance tiers and hysteresis
  -> apply budgets
  -> return GrassVisibilityResult

GrassVisibilityResult
  -> install visible-set generation
  -> build/admit mesh and draw generation
  -> publish renderer receipt
  -> acknowledge first visible frame
```

## Admission failures

```txt
invalid or non-finite camera
invalid viewport
missing patch bounds
stale camera revision
stale viewport revision
stale topology key
stale LOD policy
impossible budget
candidate mesh/draw failure
```

## Required interaction proof

```txt
slow camera threshold crossing
rapid camera turn
camera teleport
viewport resize during classification
quality change during classification
candidate failure preserving predecessor
first frame after accepted visible-set change
```

No interaction or camera runtime behavior was changed by this audit.
