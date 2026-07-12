# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T04-11-54-04-00`

## Plan ledger

**Goal:** distinguish grass descriptor structure from executable proof that camera distance, frustum visibility and budgets control applied render work.

- [x] Review the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Verify all eligible root `.agent` states.
- [x] Select only `IntoTheMeadow`.
- [x] Inspect the grass density, archetype, static batch, patch, instancing and LOD kits.
- [x] Inspect render-plan enhancement and cache behavior.
- [x] Inspect CPU grass mesh expansion and web-host frame flow.
- [x] Inspect existing render and renderer smoke tests.
- [x] Document distance, frustum, budget, stale-result and visible-frame proof requirements.
- [x] Change documentation only.
- [ ] Execute grass-visibility fixtures after implementation exists.

## Source inspection completed

```txt
declared grass LOD tiers: 4
static batch tiers: 3
runtime patch-selected tiers: 2
runtime far selection paths: 0
runtime terrain-tint paths: 0
camera inputs to patch placement: 0
camera inputs to draw grouping: 0
frustum tests in grass path: 0
visible-set revisions: 0
typed grass draw-plan results: 0
visible grass-frame receipts: 0
```

## Proven from source

```txt
density texture is deterministic and suppresses the authored path
archetypes generate 50-100 cards, defaulting to 64
static batches create near, mid and far variants
LOD policy declares 32, 72, 128 and 220 distance thresholds
patch placement chooses near for density > 0.55, otherwise mid
patch placement never chooses far or terrain-tint
draw grouping retains every patch instance
enhancer cache key is source topology and per-frame update carries time only
web host supplies no camera observation to grass enhancement
CPU mesh builder expands every draw-group instance
CPU mesh builder uses hard-coded 28/16/4 card slices
debug output reports totals, not admitted work
```

## Existing proof

Current checks prove:

```txt
grass density descriptor exists
static batches, patches and draw groups exist
render contract validates structurally
mesh buffers are triangle-aligned and internally consistent
primitive fallback geometry is absent
animation time does not alter topology or static mesh key
```

Current checks do not prove:

```txt
camera-distance LOD selection
far-tier reachability
terrain-tint transition
frustum culling
instance or card budgets
stale camera/surface rejection
visible-set determinism
requested-versus-applied diagnostics parity
first visible grass-frame correlation
```

## Execution status

```txt
runtime source changed: no
grass source changed: no
renderer source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check executed: no
grass distance fixtures available: no
grass frustum fixtures available: no
grass budget fixtures available: no
browser traversal smoke available: no
```

## Required distance fixture

```txt
construct canonical patches at exact threshold distances
classify through the shared LOD policy
assert near/mid/far/tint transitions at boundaries
assert beyond-tint produces no card work
prove density changes do not change distance tier
```

## Required frustum fixture

```txt
construct camera and conservative patch bounds
classify inside, intersecting and outside patches
admit inside/intersecting patches
reject outside patches
assert rejected patches contribute zero instances and cards
```

## Required budget fixture

```txt
submit more visible instances/cards than configured limits
apply deterministic tier fallback or selection reduction
report requested and applied counts
preserve path suppression and stable ordering
produce the same fingerprint on repeated runs
```

## Required stale-result fixture

```txt
create a draw plan for camera revision N
advance camera, surface, quality or context revision
attempt to commit predecessor plan
reject without render-resource mutation
```

## Required render and frame fixture

```txt
commit a grass visible-set revision
update CPU or GPU draw resources from that exact plan
render one frame
capture renderer diagnostics and canvas
assert patch, instance and card counts match the committed result
assert frame acknowledgement cites the visible-set revision
```

## Future commands

```bash
npm run fixture:grass-lod-distance
npm run fixture:grass-frustum
npm run fixture:grass-budget
npm run fixture:grass-stale-plan
npm run fixture:grass-diagnostics-parity
npm run smoke:grass-visible-frame
npm run smoke:grass-pages
npm run check
```

## Completion boundary

Do not claim grass LOD or culling because policy objects and batch names exist. Completion requires executable camera-derived classification, bounded applied work, stale-plan fencing, diagnostics parity and first-visible-frame evidence.
