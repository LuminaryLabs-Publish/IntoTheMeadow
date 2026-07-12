# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T13-54-00-04-00`

## Summary

The repo-local and central audit records are now synchronized. The leading runtime gap remains that grass LOD names exist without camera-bound visibility authority: density permanently chooses near or mid geometry, far and terrain-tint are unreachable, all instances enter one static mesh, and every vertex is drawn regardless of camera distance or frustum containment.

## Plan ledger

**Goal:** close camera visibility, tier reachability, transition, budget and frame-proof gaps while preserving all preceding runtime, render, editor, progression, audio, persistence and replay gaps.

- [x] Reconcile root docs, registry and central tracking.
- [x] Preserve grass visibility and LOD gaps.
- [x] Preserve the preceding WebGL program-interface gap.
- [x] Preserve earlier lifecycle, host, render, audio, persistence and replay gaps.
- [ ] Implement in dependency order.

## Tier reachability gaps

```txt
near: reachable only through density-selected batch
mid: reachable only through density-selected batch
far: never selected by placement
terrain-tint: no static batch or render representation
culled: absent
distance-based tier selection: absent
```

## Visibility gaps

```txt
stable patch bounds admission
camera and viewport revisions
frustum planes and classification
distance-to-bounds result
per-patch predecessor tier
per-frame visible set
cull reason
visible-set fingerprint
```

## Transition gaps

```txt
entry/exit thresholds
hysteresis
camera-teleport policy
viewport-change policy
quality-change transition policy
fade or cross-tier continuity
stale-result rejection
```

## Budget gaps

```txt
visible patch budget
visible instance budget
visible vertex budget
grass draw budget
deterministic priority policy
camera-distance priority
hero-area protection
budget reduction result
```

## Geometry and draw gaps

```txt
all patch instances flattened into one mesh: yes
camera-independent topology key: yes
camera movement rebuilds visible set: no
far representation admission: absent
terrain-tint output: absent
per-tier mesh generation: absent
per-tier draw generation: absent
full mesh outline draw: always
full mesh color draw: always
```

## Observation gaps

```txt
patches tested/visible/culled
per-tier patch and instance counts
admitted/rejected vertex and draw counts
transition counts and reasons
budget reductions
visibility revision and fingerprint
candidate install/rollback result
first visible grass frame receipt
capture/visibility correlation
```

## Missing proof

```txt
camera-distance near/mid/far selection
terrain-tint without blade geometry
outside-frustum omission
edge-intersection determinism
threshold hysteresis
camera teleport and viewport resize handling
quality and render-budget enforcement
candidate failure preserves predecessor
stale camera/viewport/topology/policy rejection
renderer snapshot carries visibility revision
first visible frame cites accepted visible set
local browser and deployed Pages parity
```

## Preserved WebGL program-interface gaps

```txt
active attribute/uniform reflection
exact symbol type and size admission
mesh/program and payload/program compatibility
context-bound program generation and fingerprint
draw admission and first visible interface frame receipt
```

## Preserved progression gaps

```txt
browser/editor interaction command surface
canonical target evidence
path and inspection mutation
objective and story transition commit
feedback projection
first visible progression-frame acknowledgement
```

## Preserved editor and host gaps

```txt
raw GameHost capability quarantine
editor bridge generation and predecessor retirement
listener leases and bounded errors
stale capability rejection
capture/frame provenance
host stop/dispose parity
```

## Preserved runtime and data gaps

```txt
runtime session lifecycle and ordered disposal
RAF clock and step admission
source-provider artifact authority
render topology identity
WebGL context recovery
render-surface revision
shader precision admission
committed-frame observation
fatal frame recovery
adaptive quality authority
trusted audio activation
save migration and atomic hydration
DSK declaration-to-runtime consumption
independent deterministic replay
```

## Completion boundary

Do not count batch labels, card limits, stable topology or successful full-mesh draws as LOD proof. Completion requires camera-bound classification, reachable near/mid/far/tint/culled states, hysteresis, budgets, stale-result rejection and a visible frame carrying the accepted visibility revision.
