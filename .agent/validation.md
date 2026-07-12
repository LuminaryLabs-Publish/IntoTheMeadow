# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T13-38-52-04-00`

## Summary

This documentation-only audit verifies the current grass density, batch, patch, grouping, LOD-policy, static-mesh and WebGL draw path. It proves that camera distance and frustum containment do not currently select the visible grass set. It does not prove a runtime performance regression, visual defect severity, camera-based LOD correctness or deployed behavior.

## Plan ledger

**Goal:** separate source-backed grass visibility findings from unimplemented and unexecuted runtime proof.

- [x] Compare the Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow`.
- [x] Inspect grass density and patch placement.
- [x] Inspect static batch and draw-group creation.
- [x] Inspect declared LOD policy and call sites.
- [x] Inspect topology, CPU mesh creation and camera use.
- [x] Inspect outline/color draw submission and renderer snapshots.
- [x] Inspect existing Node/browser proof surfaces.
- [x] Preserve all 44 kits and service inventory.
- [x] Define grass visibility contracts and fixture gates.
- [x] Change documentation only.
- [ ] Execute visibility/LOD fixtures after implementation exists.

## Proven from source

```txt
external provider declarations: 1
local DSK/kit declarations: 43
total declared kits: 44
grass-specific local kits: 11

LOD policy tiers:
  near <= 32
  mid <= 72
  far <= 128
  terrain-tint <= 220

grass-lod-policy-kit.pick(distance) exists: yes
active call to pick(distance): no

static batches created:
  near
  mid
  far

placement-selected batches:
  near when density > 0.55
  mid otherwise
  far never
  terrain-tint unavailable

draw groups include all patch instances
CPU mesh includes all grass draw groups
camera is read after mesh selection
renderer draws mesh.vertexCount twice
```

## Existing proof

Current checks can prove, when executed:

```txt
required files exist
DSK descriptors validate structurally
render plan contains density texture, patches, batches and draw groups
grass policy contains four tiers
patches contain instance arrays
draw groups contain positive instance counts
CPU mesh arrays are aligned
static topology and mesh identity are stable across time-only plans
renderer cache behavior under tested static plans
scene generation determinism
browser page/editor/gpu markers and screenshot size
```

Current checks cannot prove:

```txt
distance-driven near/mid/far selection
terrain-tint representation
frustum culling
camera revision admission
viewport revision admission
hysteresis
camera-teleport handling
quality-budget enforcement
per-tier visible counts
stale visibility rejection
candidate failure preserving predecessor
first visible grass-visibility frame
Pages visibility/LOD behavior
```

## Execution status

```txt
runtime source changed: no
grass source changed: no
renderer source changed: no
shader source changed: no
gameplay source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
target branch: main
npm run check executed: no
browser observation executed: no
Pages observation executed: no
grass visibility fixtures available: no
```

## Required deterministic fixtures

```txt
fixture:grass-patch-bounds
fixture:grass-frustum-inside
fixture:grass-frustum-intersection
fixture:grass-frustum-outside
fixture:grass-distance-near
fixture:grass-distance-mid
fixture:grass-distance-far
fixture:grass-distance-terrain-tint
fixture:grass-distance-culled
fixture:grass-threshold-hysteresis
fixture:grass-camera-teleport
fixture:grass-viewport-revision
fixture:grass-topology-revision
fixture:grass-quality-reduction
fixture:grass-vertex-budget
fixture:grass-draw-budget
fixture:grass-candidate-failure-predecessor
fixture:grass-stale-camera-result
fixture:grass-stale-topology-result
fixture:first-visible-grass-visibility-frame
```

## Required browser matrix

```txt
context: WebGL2 and WebGL1 fallback
viewport: desktop, tablet and narrow mobile
pixel ratio: 1 and 2
camera: default, near, mid, far, tint-only, outside field
motion: slow threshold crossing, rapid orbit, teleport
quality: high, medium, low, emergency
lifecycle: initial, resize, stop/start, context loss/restore
host: local static server and deployed GitHub Pages
```

## Required browser and Pages smoke

```txt
open fresh session
capture camera, viewport, topology and policy revisions
capture tested/visible/culled patch counts
move camera through every distance tier
verify far and terrain-tint tiers become reachable
move camera so patches leave the frustum
verify culled patches stop contributing blade vertices
oscillate around thresholds and verify hysteresis
reduce quality and verify budgets
verify renderer snapshot carries visibility revision
capture first visible frame with the same revision
repeat against deployed GitHub Pages
```

## Claim boundary

The audit proves that density, not camera distance, currently selects near/mid grass batches; far and terrain-tint are unreachable from placement; all grass enters one static mesh; and the renderer draws the complete mesh. It does not prove current frame cost, user-visible severity, corrected LOD behavior, browser parity or deployment readiness.
