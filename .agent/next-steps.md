# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T13-54-00-04-00`

## Summary

Repo-local and central documentation are synchronized. The next implementation task is still to extend the existing grass, camera, performance, render-plan and renderer owners with a camera-bound visible-set transaction. Do not create a parallel grass renderer.

## Plan ledger

**Goal:** ensure every rendered grass patch has current camera, frustum, distance-tier, budget and generation evidence before its geometry reaches draw submission.

- [x] Reconcile the current grass audit across root docs, machine registry and central tracking.
- [ ] Define `GrassVisibilityCommand` and immutable input revisions.
- [ ] Add stable bounds for every grass patch.
- [ ] Project the committed camera into frustum planes.
- [ ] Classify patches as inside, intersecting or outside.
- [ ] Measure camera distance to patch bounds.
- [ ] Make near, mid, far, terrain-tint and culled states reachable.
- [ ] Stop using density as the authority for LOD tier.
- [ ] Retain density as distribution and local-complexity input only.
- [ ] Add entry/exit hysteresis for each distance threshold.
- [ ] Define transition behavior for camera, viewport and quality revisions.
- [ ] Define terrain-tint representation and ownership.
- [ ] Apply patch, instance, vertex and draw budgets.
- [ ] Produce one immutable `GrassVisibilityResult`.
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
  -> no grass geometry or tint contribution
```

## Acceptance matrix

```txt
inside/intersecting/outside frustum
near/mid/far/tint/culled distance bands
slow threshold crossing and oscillation
camera teleport
viewport aspect change
topology and policy replacement
quality reduction
vertex and draw budget exhaustion
candidate failure preserves predecessor
stale camera/viewport/topology result
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

`grass-lod-policy-kit.pick(distance)` should become policy inside this authority. Density-driven batch choice should remain content distribution, not camera LOD.
