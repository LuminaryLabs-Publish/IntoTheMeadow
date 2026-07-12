# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T13-38-52-04-00`

## Summary

Implement grass visibility and LOD by extending the existing grass, camera, performance, render-plan and renderer owners. Do not create a parallel grass renderer. Replace density-only batch permanence with a camera-bound visible-set transaction and keep the current static topology path as the predecessor until the new result is accepted.

## Plan ledger

**Goal:** ensure every rendered grass patch has current camera, frustum, distance-tier, budget and generation evidence before its geometry reaches draw submission.

- [ ] Define `GrassVisibilityCommand` and immutable input revisions.
- [ ] Add stable bounds for every grass patch.
- [ ] Project the committed camera into frustum planes.
- [ ] Classify patches as inside, intersecting or outside.
- [ ] Measure camera distance to patch bounds rather than patch centers only.
- [ ] Make near, mid, far, terrain-tint and culled states reachable.
- [ ] Stop using density as the authority for LOD tier.
- [ ] Retain density only as an instance-distribution and local-complexity input.
- [ ] Add entry/exit hysteresis for each distance threshold.
- [ ] Define transition behavior when camera or viewport revisions change.
- [ ] Define terrain-tint representation and its render ownership.
- [ ] Apply quality-profile patch, instance, vertex and draw budgets.
- [ ] Produce one `GrassVisibilityResult`.
- [ ] Allocate visible-set, mesh and draw generations.
- [ ] Reject stale camera, viewport, topology, policy and quality results.
- [ ] Preserve the predecessor visible set after candidate failure.
- [ ] Publish per-tier counts, cull reasons and budget reductions.
- [ ] Add bounded observations and a visibility journal.
- [ ] Correlate renderer snapshots and captures with visibility revision.
- [ ] Acknowledge the first visible frame using the accepted visible set.
- [ ] Add deterministic distance, frustum, hysteresis and budget fixtures.
- [ ] Add browser and GitHub Pages visual smokes.

## Required command

```txt
GrassVisibilityCommand {
  commandId
  runtimeSessionId
  runtimeGeneration
  frameId
  cameraRevision
  viewportRevision
  topologyKey
  grassPolicyRevision
  performanceRevision
  predecessorVisibilityRevision
  camera
  viewport
  patchBounds
  budgets
}
```

## Required result

```txt
GrassVisibilityResult {
  status
  reason
  commandId
  cameraRevision
  viewportRevision
  topologyKey
  policyRevision
  visibilityRevision
  predecessorVisibilityRevision
  testedPatchCount
  visiblePatchCount
  culledPatchCount
  tierCounts
  instanceCounts
  vertexBudget
  admittedVertexCount
  drawBudget
  admittedDrawCount
  transitions
  failures
}
```

## Required statuses

```txt
Accepted
AcceptedBudgetReduced
RejectedInvalidCamera
RejectedInvalidViewport
RejectedInvalidPatchBounds
RejectedStaleCamera
RejectedStaleViewport
RejectedStaleTopology
RejectedStalePolicy
RejectedBudgetImpossible
RejectedCandidateBuild
Retired
```

## Tier contract

```txt
near
  -> highest card count
  -> strict near threshold
  -> frustum required

mid
  -> reduced card count
  -> frustum required

far
  -> minimal clump representation
  -> frustum required

terrain-tint
  -> no blade geometry
  -> terrain/material contribution only

culled
  -> no geometry and no tint contribution
```

## Acceptance matrix

```txt
patch fully outside frustum
patch intersecting frustum edge
patch inside near threshold
patch crossing near-to-mid boundary
patch oscillating around a threshold
patch inside far threshold
patch beyond far but inside tint range
patch beyond tint range
camera teleport
viewport aspect change
topology replacement
quality reduction
vertex budget exhaustion
draw budget exhaustion
candidate build failure preserves predecessor
stale camera result
stale viewport result
stale topology result
first visible frame receipt
local and deployed browser parity
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
2a. Editor Bridge Lifecycle and Error Journal Authority
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
6c. Shader Precision Admission Authority
6d. WebGL Program Interface Admission Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
7b. Adaptive Quality and Performance Budget Authority
7c. Grass Visibility and LOD Authority
7d. Audio Activation and Lifecycle Authority
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

The current `grass-lod-policy-kit.pick(distance)` should become policy inside the authority, not remain an unused descriptor. The current density-driven batch choice should remain a content-density decision, not a substitute for camera LOD.
