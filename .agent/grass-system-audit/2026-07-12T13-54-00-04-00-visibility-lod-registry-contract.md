# Grass Visibility and LOD Registry Contract

**Timestamp:** `2026-07-12T13-54-00-04-00`

## Summary

The grass system needs one registry of stable patch identity, bounds, predecessor tier and accepted visibility revision. Current static batches and draw groups do not carry enough camera-bound evidence to serve that role.

## Plan ledger

**Goal:** define the minimum state and invariants for deterministic grass visibility.

- [x] Define patch and visible-set records.
- [x] Define tier and hysteresis invariants.
- [x] Define budget and observation requirements.
- [ ] Implement and test later.

## Patch record

```txt
patchId
topologyKey
bounds
contentDensity
availableRepresentations
predecessorTier
predecessorVisibilityRevision
```

## Visible-set record

```txt
visibilityRevision
cameraRevision
viewportRevision
policyRevision
performanceRevision
visiblePatchIds
culledPatchIds
perTierPatchCounts
perTierInstanceCounts
admittedVertexCount
admittedDrawCount
transitionReasons
budgetReductions
visibleSetFingerprint
```

## Invariants

```txt
density does not independently select camera LOD
near/mid/far/terrain-tint/culled are all reachable
outside-frustum patches contribute no blade geometry
entry and exit thresholds differ to prevent oscillation
budget reductions are deterministic and observable
stale results cannot replace the predecessor
candidate failure preserves the predecessor
first visible frame cites the accepted visibility revision
```
