# Known Gaps — IntoTheMeadow

**Timestamp:** `2026-07-08T02:00:12-04:00`

## Highest-priority gaps

### 1. Renderer does not yet fully consume the enhanced render contract

`src/game/enhance-render-plan.js` adds rich descriptors:

```txt
grassSystem
windField
postProcess
performance
outlinePolicy
grassPatches
grass drawGroups
grass staticBatches
```

The external `meadow-webgl-render-kit` must consume these as real renderer systems.

Until then, the route can still look too primitive or cartoonish even when the game repo emits better metadata.

### 2. Grass system is metadata-first, not fully visual authority yet

The local game emits:

```txt
- density texture descriptor
- 64-card clump archetype
- static batches
- patch placements
- draw groups
- shader wind
- LOD policy
- debug summary
```

The renderer still needs to draw reusable clump batches as instanced grass patches and avoid returning to old individual grass-blade object rendering.

### 3. Post-process stack is descriptor-ready but not guaranteed executed

The game emits post-process pass descriptors.

The render kit still needs a real pass pipeline:

```txt
scene color target
normal/depth data where needed
Sobel outline pass
color grade pass
depth fog pass
vignette pass
final composite
```

### 4. Gameplay authority is thin

`game.tick({ time, dt })` advances a deterministic state root, but the story/objective/interaction descriptors are not yet reduced into an action/result gameplay runtime.

Needed:

```txt
ActionFrame
ActionBatch
ActionResult
ReducerResult
reducer journal
path progress reducer
inspect target reducer
story trigger reducer
objective completion reducer
fixture replay parity
snapshot.gameplay
```

### 5. DSK inventory overstates runtime readiness

`src/content/dsk-registry.js` lists many local DSK and kit IDs.

Some are active descriptors, some are planned domains, and some are runtime-adjacent metadata emitters.

Future audits should label each as:

```txt
active-runtime
active-descriptor
planned
external
blocked-by-renderer
blocked-by-gameplay-runtime
```

### 6. The game repo must not absorb reusable renderer work permanently

Reusable grass, post-process, terrain, tree, and renderer consumption should be promoted or mirrored into ProtoKits when stable.

The publish repo should keep only game-specific composition and proof logic.

## Medium-priority gaps

```txt
- no explicit player movement runtime yet
- no first-person or inspection camera controller yet
- no interaction hit testing or affordance radius runtime yet
- no save/load adapter beyond base state exposure
- no audio/ambience runtime yet
- no deploy validation artifact logged in .agent before this run
- no visual screenshot proof stored in repo-local agent state
```

## Current visual-risk diagnosis

```txt
source emits high-fidelity intent
renderer consumes older primitive object shapes
result can remain visually simple/cartoonish
```

The next implementation pass should start at the renderer consumption seam, not by adding more metadata in the game repo.

## Current documentation-risk diagnosis

The central ledger previously referenced `.agent` paths before the actual repo-local root `.agent/START_HERE.md` existed.

This run creates the missing root state and records the mismatch so future scheduled runs can continue from repo-local truth.