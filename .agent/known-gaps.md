# Known Gaps — IntoTheMeadow

**Timestamp:** `2026-07-08T05:19:46-04:00`

## Highest-priority gaps

### 1. Renderer descriptor-consumption parity is missing

`src/game/enhance-render-plan.js` emits rich descriptors:

```txt
grassSystem
windField
postProcess
performance
outlinePolicy
grassPatches
grass drawGroups
grass staticBatches
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

`src/hosts/web-host.js` passes the enhanced plan into `renderer.render(plan)` and exposes the enhanced plan plus renderer snapshot through `GameHost`.

The missing proof is a stable parity report showing which descriptors the renderer consumed, which descriptors it ignored, and why.

### 2. Grass system is metadata-first, not renderer-authoritative yet

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

The render kit still needs either real pass execution or explicit unsupported-pass metadata:

```txt
scene color target
normal/depth data where needed
Sobel outline pass
color grade pass
depth fog pass
vignette pass
final composite
unsupported pass reasons
```

### 4. GameHost diagnostics do not yet expose renderer parity

Needed diagnostic shape:

```txt
GameHost.getDiagnostics().renderParity
  consumedDescriptors[]
  unconsumedDescriptors[]
  unsupportedReasons[]
  grassDrawGroupsExpected
  grassDrawGroupsRendered
  postProcessPassesExpected
  postProcessPassesExecuted
  parityPassed
```

### 5. Gameplay authority is thin

`game.tick({ time, dt })` advances a deterministic state root, but the story/objective/interaction descriptors are not yet reduced into an action/result gameplay runtime.

Needed after renderer parity:

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

### 6. DSK inventory overstates runtime readiness

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

### 7. The game repo must not absorb reusable renderer work permanently

Reusable grass, post-process, terrain, tree, and renderer consumption should be promoted or mirrored into ProtoKits when stable.

The publish repo should keep only game-specific composition, parity fixtures, diagnostics, and deploy proof.

## Medium-priority gaps

```txt
- no explicit player movement runtime yet
- no first-person or inspection camera controller yet
- no interaction hit testing or affordance radius runtime yet
- no save/load adapter beyond base state exposure
- no audio/ambience runtime yet
- no visual screenshot proof stored in repo-local agent state
- no renderer parity fixture committed yet
```

## Current visual-risk diagnosis

```txt
source emits high-fidelity intent
renderer may consume older primitive object shapes
result can remain visually simple/cartoonish
```

The next implementation pass should start with descriptor-consumption parity, not more decorative metadata.

## Current documentation-risk diagnosis

The repo-local `.agent` state exists and is now focused on the same seam: prove renderer consumption before expanding gameplay or content.
