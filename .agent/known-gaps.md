# Known Gaps — IntoTheMeadow

**Timestamp:** `2026-07-08T09:11:03-04:00`

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

### 2. Render parity fixture implementation is still missing

The prior docs define the matrix. The source files still need to exist.

Required files:

```txt
src/render-parity/collect-expected-render-descriptors.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/compare-render-descriptor-parity.js
src/render-parity/render-parity-reasons.js
tests/render-parity-fixture-smoke.mjs
```

Required projection:

```txt
GameHost.getDiagnostics().renderParity
GameHost.getSnapshot().renderParity
```

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
  grass.cardsExpected
  grass.cardsRendered
  postProcess.passesExpected
  postProcess.passesExecuted
  wind.windUniformsBound
  renderStyle.styledObjectsConsumed
  parityPassed
  reasons[]
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

Needed next:

```txt
ActionFrame
ActionEnvelope
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

### 8. Gameplay fixture smoke is missing

Required test file:

```txt
tests/gameplay-authority-fixture-smoke.mjs
```

Required fixture cases:

```txt
tick_without_actions_stays_compatible
path_progress_under_threshold_rejected_or_pending
path_progress_threshold_completes_walk_the_path
path_progress_repeated_does_not_duplicate_objective
inspect_focal_tree_completes_inspect_tree
inspect_unknown_target_rejected
unknown_action_type_rejected
snapshot_gameplay_exposes_journal_and_last_results
```

### 9. DSK inventory overstates runtime readiness

The repo has a strong set of local DSK descriptors and render enhancement helpers, but not every named DSK is a reusable package with standalone tests, docs, and external installation semantics.

Keep these categories explicit:

```txt
implemented local source kits
implemented external CDN kits
descriptor-only DSKs
next-cut fixture kits
future reusable engine/protokit candidates
```

### 10. Validation gap remains

`npm run check` exists, but it does not yet include:

```txt
node tests/render-parity-fixture-smoke.mjs
node tests/gameplay-authority-fixture-smoke.mjs
```

No local or browser validation was run in this documentation pass.
