# Known Gaps — IntoTheMeadow

**Timestamp:** `2026-07-08T07:41:52-04:00`

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

### 2. Parity fixture matrix does not exist yet

The repo needs a DOM-free fixture that accepts:

```txt
enhancedRenderPlan
rendererSnapshot
```

and returns:

```txt
RenderDescriptorParityResult
```

The fixture must cover positive and negative cases so a primitive renderer cannot silently pass just because the enhanced plan exists.

### 3. Grass system is metadata-first, not renderer-authoritative yet

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

The renderer still needs to draw reusable clump batches as instanced grass patches or explicitly report those descriptors as unconsumed.

### 4. Post-process stack is descriptor-ready but not guaranteed executed

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

### 5. GameHost diagnostics do not yet expose renderer parity

Needed diagnostic shape:

```txt
GameHost.getDiagnostics().renderParity
  expectedDescriptors[]
  consumedDescriptors[]
  unconsumedDescriptors[]
  unsupportedDescriptors[]
  missingPlanDescriptors[]
  missingSnapshotFields[]
  fallbackDescriptors[]
  grass.drawGroupsExpected
  grass.drawGroupsRendered
  grass.instancesExpected
  grass.instancesRendered
  postProcess.passesExpected
  postProcess.passesExecuted
  wind.windUniformsBound
  renderStyle.styledObjectsConsumed
  parityPassed
```

### 6. Gameplay authority is thin

`game.tick({ time, dt })` advances a deterministic state root, but the story/objective/interaction descriptors are not yet reduced into an action/result gameplay runtime.

Current reducer behavior:

```txt
advanceGameState(state, input)
  -> frame + 1
  -> lastTick.dt
  -> lastTick.time
```

Needed after renderer parity starts:

```txt
ActionFrame
ActionBatch
ActionResult
ReducerResult
stable rejection reasons
reducer journal
path progress reducer
inspect target reducer
story trigger reducer
objective completion reducer
fixture replay parity
snapshot.gameplay
```

### 7. Objective descriptors are not connected to runtime outcomes

Existing descriptors define the first intended loop:

```txt
walk-the-path
  requiredAction: path-progress
  targetId: arrival-path
  completion.progressAtLeast: 0.35

inspect-tree
  requiredAction: inspect
  targetId: focal-tree
  completion.inspected: true
```

But there is no reducer that turns those into:

```txt
completedObjectiveIds
lastActionResults
actionJournal
storyBeatIds progression
snapshot.gameplay
```

### 8. DSK inventory overstates runtime readiness

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

### 9. The game repo must not absorb reusable renderer work permanently

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
- no GameHost renderParity projection yet
- no ActionFrame / ActionResult fixture committed yet
- no snapshot.gameplay projection yet
```

## Current visual-risk diagnosis

```txt
source emits high-fidelity intent
renderer may consume older primitive object shapes
result can remain visually simple/cartoonish
```

## Current gameplay-risk diagnosis

```txt
source declares story/objective/interaction intent
state only increments frame
result can remain non-playable even when descriptors look complete
```

The next implementation pass should start with descriptor-consumption parity, then add the smallest action/result gameplay reducer gate.