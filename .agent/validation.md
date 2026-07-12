# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T13-54-00-04-00`

## Summary

This documentation-only reconciliation verifies that the root `.agent` entrypoints, machine registry and central ledger now describe the same grass visibility/LOD authority. The source-backed audit proves that camera distance and frustum containment do not currently select the visible grass set. It does not prove runtime performance, corrected LOD, browser parity or deployed readiness.

## Plan ledger

**Goal:** separate verified source and documentation state from unimplemented and unexecuted runtime proof.

- [x] Compare the Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow`.
- [x] Verify all required root `.agent` files exist.
- [x] Verify the new tracker and timestamped audit family exist.
- [x] Preserve all 44 kits and service inventory.
- [x] Reconcile current status, timestamp, parent authority and validation boundary.
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

active call to grass-lod-policy-kit.pick(distance): no
placement selects near when density > 0.55
placement selects mid otherwise
far selected by placement: no
terrain-tint representation: absent
draw groups include all patch instances
CPU mesh includes all grass draw groups
camera is read after mesh selection
renderer draws complete mesh twice
```

## Proven documentation state

```txt
START_HERE timestamp/status aligned: yes
current-audit timestamp/status aligned: yes
next-steps updated: yes
known-gaps updated: yes
validation updated: yes
kit-registry current audit paths aligned: yes
new tracker and turn ledger present: yes
architecture/render/gameplay/interaction/grass/central-sync/deploy audits present: yes
central ledger update requested in this run: yes
internal change log requested in this run: yes
```

## Existing proof can establish, when run

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
browser page/editor/GPU markers and screenshot size
```

## Existing proof cannot establish

```txt
distance-driven near/mid/far selection
terrain-tint representation
frustum culling
camera and viewport revision admission
hysteresis and camera teleport handling
quality and render-budget enforcement
per-tier visible counts
candidate failure preserving predecessor
stale visibility rejection
first visible grass frame
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
patch bounds
frustum inside/intersection/outside
distance near/mid/far/terrain-tint/culled
threshold hysteresis
camera teleport
viewport/topology/policy revision changes
quality, vertex and draw budgets
candidate failure preserves predecessor
stale camera/viewport/topology result
first visible grass frame
```

## Required browser matrix

```txt
WebGL2 and WebGL1 fallback
DPR 1 and 2
desktop, tablet and narrow viewport
default, near, mid, far, tint-only and outside-field cameras
slow threshold crossing, rapid orbit and teleport
high, medium, low and emergency quality
initial, resize, stop/start and context restore
local static host and deployed GitHub Pages
```

## Claim boundary

The audit proves the current density-selected batch and static full-mesh draw behavior and reconciles documentation state. It does not claim a performance regression, visual severity, corrected LOD behavior, browser parity or deployment readiness.
