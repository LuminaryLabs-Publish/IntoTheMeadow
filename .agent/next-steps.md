# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T04-11-54-04-00`

## Goal

Make the existing grass density, patch, batch and LOD declarations produce a camera-derived visible draw plan without changing deterministic placement or moving gameplay rules into renderer code.

## Plan ledger

- [ ] Preserve current density texture, path suppression, archetypes, wind and visual composition.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete Render Surface Resolution and WebGL Context Recovery Authority.
- [ ] Add camera, surface, context and quality revision observations.
- [ ] Add canonical patch bounds for every grass patch.
- [ ] Compute patch-to-camera distance from committed camera state.
- [ ] Apply the existing near/mid/far/terrain-tint thresholds through one owner.
- [ ] Remove density-based near/mid selection from patch placement.
- [ ] Add deterministic frustum admission with conservative bounds.
- [ ] Add explicit instance and card budgets.
- [ ] Define terrain-tint fallback output for the fourth tier.
- [ ] Build an immutable `GrassVisibleSet`.
- [ ] Build a typed `GrassDrawPlanResult`.
- [ ] Reject stale camera, surface, context and quality revisions.
- [ ] Route CPU and future GPU rendering through the same visible-set contract.
- [ ] Report requested, admitted, culled and applied counts by tier.
- [ ] Correlate draw-plan revision with renderer observation and first visible frame.
- [ ] Add DOM-free distance, frustum and budget fixtures to `npm run check`.
- [ ] Add browser and Pages camera-traversal smoke gates.

## Existing owners to update first

```txt
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
grass-patch-dsk
gpu-grass-render-dsk
meadow-camera-dsk
meadow-performance-dsk
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
meadow-diagnostics-dsk
meadow-render-plan/v2
render-plan enhancer
CPU mesh builder
web host
Committed Frame Observation Authority
```

## Candidate coordinating kits

```txt
grass-view-observation-kit
grass-camera-revision-kit
grass-patch-bounds-kit
grass-patch-distance-kit
grass-lod-selection-kit
grass-frustum-admission-kit
grass-visible-set-kit
grass-visible-set-revision-kit
grass-instance-budget-kit
grass-card-budget-kit
grass-terrain-tint-transition-kit
grass-draw-plan-kit
grass-draw-plan-result-kit
stale-grass-visibility-rejection-kit
grass-visibility-observation-kit
grass-visibility-journal-kit
grass-visible-frame-ack-kit
grass-lod-distance-fixture-kit
grass-frustum-fixture-kit
grass-budget-fixture-kit
browser-grass-traversal-smoke-kit
```

## Required patch classification flow

```txt
committed camera observation
  -> patch bounds lookup
  -> conservative frustum test
  -> nearest bounds distance
  -> declared tier selection
  -> quality and budget admission
  -> visible patch result
```

## Required draw flow

```txt
visible patch results
  -> deterministic instance selection
  -> tier-appropriate batch or terrain tint
  -> aggregate instance/card budgets
  -> immutable grass draw plan
  -> typed commit result
  -> render-resource update
  -> visible-frame acknowledgement
```

## Acceptance matrix

```txt
distance 31.999 selects near
distance 32.001 selects mid
distance 71.999 selects mid
distance 72.001 selects far
distance 127.999 selects far
distance 128.001 selects terrain-tint
distance beyond 220 selects no grass cards
off-frustum patch produces no active cards
density changes placement count but not tier policy
path-core patches remain suppressed
budget overflow applies deterministic fallback
same camera and policy produce the same visible-set fingerprint
new camera revision invalidates predecessor plans
stale context or surface result cannot commit
debug counts match renderer-applied counts
first visible frame cites committed visible-set revision
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
7b. Adaptive Quality and Performance Budget Authority
7c. Grass Visibility and LOD Authority
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

Do not add a second grass policy inside the renderer. Patch admission, tier selection and budgets must resolve before draw submission through one shared contract.
