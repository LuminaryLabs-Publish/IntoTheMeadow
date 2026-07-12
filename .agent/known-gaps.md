# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T04-11-54-04-00`

## Selection state

```txt
10 accessible Publish repositories observed
TheCavalryOfRome excluded
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible repository
only IntoTheMeadow changed in the Publish organization
```

## Current grass visibility and LOD gaps

### Declared policy is not consumed

```txt
near threshold: present
mid threshold: present
far threshold: present
terrain-tint threshold: present
camera-distance policy consumer: absent
policy revision: absent
```

### Patch LOD is density-driven

```txt
density texture: present
path suppression: present
patch grid: present
near batch selection by density: present
mid batch selection by density: present
far batch selection: absent
terrain-tint selection: absent
camera distance input: absent
```

### Visibility admission is absent

```txt
patch bounds descriptor: partial
camera revision: absent
surface revision binding: absent
frustum test: absent
distance culling: absent
visible patch set: absent
visible-set revision: absent
stale-result rejection: absent
```

### Budgets are implicit

```txt
instance budget result: absent
card budget result: absent
triangle budget result: absent
budget fallback tier: absent
requested-versus-applied counts: absent
```

The mesh builder silently slices cards to 28, 16 or 4 based on the already assigned batch. That is an implementation detail, not an admitted quality result.

### Active renderer expands the whole field

```txt
all draw groups traversed: yes
all group instances traversed: yes
CPU triangle expansion: yes
camera-conditioned mesh subset: no
frustum-conditioned mesh subset: no
terrain-tint render path: no
```

### Diagnostics can overstate optimization

The debug HUD reports total grass instances, total vertices and cache state. It does not prove that distance LOD, frustum culling, budgets or terrain-tint fallback were applied.

## Required grass fixtures

```txt
fixture:grass-lod-exact-boundaries
fixture:grass-density-lod-separation
fixture:grass-frustum-admission
fixture:grass-far-tier-reachability
fixture:grass-terrain-tint-transition
fixture:grass-instance-budget
fixture:grass-card-budget
fixture:grass-stale-camera-rejection
fixture:grass-path-suppression-parity
fixture:grass-visible-set-determinism
fixture:grass-render-diagnostics-parity
fixture:first-visible-grass-frame
smoke:browser-grass-camera-traversal
smoke:pages-grass-camera-traversal
```

## Retained interaction and progression gaps

```txt
movement and inspect commands absent
path progress and objective rules unreachable
objective/story atomic commit absent
browser/editor progression parity absent
```

## Retained deterministic-replay gaps

```txt
independent runtime replay absent
production provider parity absent
reset/cadence parity absent
first-divergence and visible-frame fingerprints absent
```

## Retained runtime and rendering gaps

```txt
RAF absolute time and fixed dt disagree
raw GameHost exposes game authority
WebGL context recovery is non-transactional
DPR/pixel budget and surface revision absent
committed state/plan/frame identity absent
fatal startup/frame recovery remains non-transactional
```

## Retained performance and persistence gaps

```txt
adaptive quality transaction absent
complete terrain/scatter/post budgets not enforced
save schema, migration and atomic hydration absent
```

## Retained DSK truth gaps

```txt
declaration status is not runtime consumption proof
local implementations are not registry-bound
runtime consumers bypass registry lookup
reverse disposal is not registry-owned
```

## Completion boundary

Do not treat the presence of `grass-lod-policy-kit`, near/mid/far batches or `webgl-instancing` labels as runtime LOD proof. Completion requires camera-derived patch admission, reachable far/tint tiers, bounded applied work, diagnostics parity and a visible frame citing the committed grass visible-set revision.
