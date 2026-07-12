# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T13-38-52-04-00`

## Summary

The leading grass gap is that LOD names exist without visibility authority. Density chooses near or mid geometry once during patch creation, far and terrain-tint are unreachable, all instances enter one static mesh, and every vertex is drawn regardless of camera distance or frustum containment.

## Plan ledger

**Goal:** close camera visibility, tier reachability, transition, budget and frame-proof gaps while preserving previously documented runtime, program-interface, progression, editor, audio, persistence and replay gaps.

- [x] Add grass visibility and LOD gaps.
- [x] Preserve the preceding WebGL program-interface gap.
- [x] Preserve earlier lifecycle, host, render, audio, persistence and replay gaps.
- [ ] Implement in dependency order.

## Selection state

```txt
10 accessible Publish repositories observed
TheCavalryOfRome excluded
9 eligible repositories centrally tracked with root .agent state
TheOpenAbove skipped because repo-local 13:29:56 work was newer than central tracking
IntoTheMeadow selected as the next-oldest stable repository
only IntoTheMeadow changed in the Publish organization
```

## Tier reachability gaps

```txt
declared near tier: reachable
declared mid tier: reachable
declared far tier: not selected by placement
declared terrain-tint tier: no static batch or render representation
culled tier: absent
distance-based tier selection: absent
```

## Visibility gaps

```txt
patch bounds admission: absent
camera revision: absent
viewport revision: absent
frustum planes: absent
inside/intersecting/outside result: absent
distance-to-bounds result: absent
per-patch visibility state: absent
per-frame visible set: absent
cull reason: absent
```

## Transition gaps

```txt
tier predecessor state: absent
entry/exit thresholds: absent
hysteresis: absent
camera-teleport policy: absent
viewport-change policy: absent
quality-change transition policy: absent
fade or cross-tier continuity: absent
```

## Budget gaps

```txt
visible patch budget: absent
visible instance budget: absent
visible vertex budget: absent
grass draw budget: absent
budget reduction result: absent
priority policy: absent
camera-distance priority: absent
hero-area protection: absent
```

## Geometry and draw gaps

```txt
all patch instances flattened into one mesh: yes
camera-independent topology key: yes
camera movement rebuilds visible set: no
far geometry admission: absent
terrain-tint output: absent
per-tier mesh generation: absent
per-tier draw generation: absent
full mesh outline draw: always
full mesh color draw: always
```

## Observation gaps

```txt
tested patch count: absent
visible/culled patch counts: absent
per-tier patch counts: absent
per-tier instance counts: absent
admitted/rejected vertex counts: absent
transition counts: absent
budget reduction reasons: absent
visibility revision: absent
visible-set fingerprint: absent
first visible grass frame receipt: absent
capture/visibility correlation: absent
```

## Missing proof

```txt
near tier selected by camera distance
mid tier selected by camera distance
far tier selected by camera distance
terrain-tint tier visible without blade geometry
outside-frustum patches omitted
edge-intersecting patches handled deterministically
hysteresis prevents threshold flicker
camera teleport produces one current result
viewport resize rejects stale result
quality reduction obeys budgets
candidate failure preserves predecessor visible set
stale camera result rejected
stale topology result rejected
renderer snapshot carries visibility revision
first visible frame cites the accepted visible set
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

Do not count batch labels, card limits, stable topology or successful full-mesh draws as LOD proof. Completion requires camera-bound classification, reachable near/mid/far/tint/culled states, hysteresis, budget admission, stale-result rejection and a visible frame carrying the accepted grass visibility revision.
