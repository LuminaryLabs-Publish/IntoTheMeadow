# Grass System Audit: Distance, Frustum, Hysteresis and Budget Contract

**Timestamp:** `2026-07-12T13-38-52-04-00`

## Summary

The grass system has strong content primitives but lacks the runtime contract that decides which representation is current for each patch. This audit defines that contract without changing density generation, archetype generation or wind animation ownership.

## Plan ledger

**Goal:** define a deterministic visible-set contract that makes near, mid, far, terrain-tint and culled states reachable and provable.

- [x] Preserve density as a placement input.
- [x] Preserve archetype and static-batch ownership.
- [x] Define patch bounds, distance and frustum inputs.
- [x] Define hysteresis and budgets.
- [x] Define result, generations and observations.
- [ ] Implement and fixture-test later.

## Patch contract

```txt
GrassPatchRecord {
  patchId
  topologyKey
  bounds
  density
  contentVariant
  instanceSource
}
```

Patch bounds must be stable for a topology generation and include maximum blade displacement from scale and wind.

## Tier contract

```txt
near         highest admitted blade/card detail
mid          reduced blade/card detail
far          minimal clump geometry
terrain-tint material/terrain contribution, no blade mesh
culled       no grass contribution
```

Density may vary instance count or family mix inside a tier. It must not decide the camera-distance tier.

## Frustum contract

```txt
Outside      -> culled unless a defined tint halo is required
Intersecting -> eligible with deterministic conservative admission
Inside       -> eligible for distance classification
```

## Distance contract

Measure distance to patch bounds, not only patch center. Thresholds come from the versioned LOD policy and must be finite, ordered and compatible with terrain-tint range.

## Hysteresis contract

```txt
entry threshold != exit threshold
predecessor tier is explicit
camera teleport can bypass transitional delay
policy/quality revision can force deterministic reclassification
no patch may oscillate tiers without crossing the relevant exit threshold
```

## Budget contract

```txt
max visible patches
max visible instances
max grass vertices
max grass draws
```

Reduction order must be deterministic and observable. Recommended priority: hero-area protection, nearest distance, larger projected coverage, stable patch ID tie-break.

## Result contract

```txt
GrassVisibilityResult {
  status
  commandId
  cameraRevision
  viewportRevision
  topologyKey
  policyRevision
  performanceRevision
  visibilityRevision
  testedPatchCount
  visiblePatchCount
  culledPatchCount
  tierCounts
  admittedInstanceCount
  admittedVertexCount
  admittedDrawCount
  transitions
  budgetReductions
  visibleSetFingerprint
  failures
}
```

## Generation contract

```txt
visibilityRevision
  -> visibleSetGeneration
  -> meshGeneration
  -> drawGeneration
  -> frameReceipt
```

Every successor must cite the predecessor and exact source revisions. Stale or failed successors cannot retire the predecessor.

## Required fixtures

```txt
distance tier reachability
frustum outside/intersection/inside
threshold hysteresis
camera teleport
viewport revision race
topology revision race
quality reduction
vertex and draw budgets
candidate failure rollback
first visible frame correlation
```

## Claim boundary

No executable contract exists yet. This document defines the required ownership and proof only.
