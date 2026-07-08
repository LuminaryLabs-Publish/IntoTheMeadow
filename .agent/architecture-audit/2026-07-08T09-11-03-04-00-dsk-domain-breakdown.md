# DSK / Domain Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-08T09:11:03-04:00`

## Architectural read

`IntoTheMeadow` is a publish repo, not a core kit repo.

Its clean architecture is:

```txt
publish route
  -> web host
  -> game factory
  -> local content descriptors
  -> local DSK descriptor install
  -> external meadow area kit
  -> local render-plan enhancement
  -> external meadow WebGL renderer
  -> GameHost diagnostics and snapshots
```

## Runtime domains

```txt
static-browser-shell
browser-boot-runtime
web-host-runtime
external-kit-loading
cdn-kit-import-manifest
animation-frame-loop
canvas-surface
debug-hud-runtime
GameHost-state-contract
GameHost-snapshot-contract
GameHost-diagnostics-contract
GameHost-render-snapshot-contract
runtime-compatibility-contract
github-pages-deployment
```

## Game state domains

```txt
game-factory
manifest-authority
session-identity
scene-identity
deterministic-state-root
tick-clock
last-tick-diagnostics
player-state
path-progress-state
progression-state
story-beat-ledger
objective-ledger
interaction-target-registry
snapshot-root
```

## Meadow content domains

```txt
arrival-meadow-area
arrival-path-content
focal-tree-content
terrain-material-palette
golden-hour-style
grass-content
flower-content
rock-content
mushroom-content
tree-line-content
wind-state
```

## Render domains

```txt
render-plan-generation
render-plan-enhancement
outline-policy
small-object-clutter-reduction
focal-tree-enhancement
grass-density-texture
grass-clump-archetype
grass-static-batch
grass-patch-placement
grass-clump-instancing-render
grass-shader-wind
grass-lod-policy
grass-density-scaling
grass-debug-visualization
wind-field-render-metadata
post-process-stack-metadata
render-stats-diagnostics
webgl-renderer-snapshot
renderer-descriptor-consumption-parity
```

## Gameplay authority domains needed next

```txt
ActionFrame-contract
ActionBatch-normalization
ActionResult-contract
ActionReason-catalog
path-progress-reducer
inspect-target-reducer
objective-completion-resolver
story-trigger-resolver
gameplay-action-journal
gameplay-snapshot
fixture-replay-parity
```

## External kit services

### meadow-area-kit

**Status:** loaded by `src/hosts/web-host.js` from `GAME_MANIFEST.externalKits`.

**Services:**

```txt
createMeadowAreaKit(config)
getRenderPlan({ time })
getSnapshot()
validate()
```

**Role:** Owns the base meadow-area render plan and snapshot contract.

### meadow-webgl-render-kit

**Status:** loaded by `src/hosts/web-host.js` from `GAME_MANIFEST.externalKits`.

**Services:**

```txt
createMeadowWebglRenderKit({ canvas })
render(plan)
getSnapshot()
```

**Role:** Owns WebGL rendering of the enhanced meadow plan.

**Gap:** Must expose or support a stable consumed/unconsumed descriptor report so `IntoTheMeadow` can validate render parity.

## Local kit services

### grass-density-texture-kit

```txt
create density texture descriptor
expose texture resolution
expose world bounds
expose density channels
validate density descriptor
```

### grass-clump-archetype-kit

```txt
create card-based clump archetypes
support 64-card clump target
validate archetype set
```

### grass-static-batch-kit

```txt
convert archetypes to static batch descriptors
validate batch descriptors
```

### grass-patch-placement-kit

```txt
place patches from area and density texture
respect path clearance
validate patch descriptors
```

### grass-clump-instancing-render-kit

```txt
create drawGroups from static batches and patches
count instances
count cards per group
validate drawGroups
```

### grass-shader-wind-kit

```txt
convert wind state into shader wind metadata
validate wind descriptor
```

### grass-lod-policy-kit

```txt
create distance/quality LOD descriptors
validate LOD policy
```

### grass-density-scaling-kit

```txt
map quality profile to density scale
stabilize grass density budget
```

### grass-debug-visualization-kit

```txt
summarize density texture
summarize static batches
summarize patch counts
summarize drawGroup counts
```

### wind-field-dsk

```txt
normalize wind state
provide render metadata for grass and world motion
```

### tree-object-dsk

```txt
enhance focal-tree descriptor
apply focal-tree visual styling
```

### meadow-performance-dsk

```txt
create performance profile
create object budgets
create outline policies
```

### post-process-stack-dsk

```txt
create post-process pass descriptors
track Sobel outline/color/fog/vignette style intent
```

## Next-cut kit map

```txt
renderer-descriptor-expectation-kit
  -> collect expected grass/wind/postProcess/performance/renderStyle descriptors from enhanced render plan

renderer-snapshot-consumption-kit
  -> normalize renderer snapshot into consumed descriptor records

renderer-descriptor-consumption-kit
  -> compare expected against consumed descriptors

renderer-unsupported-descriptor-reason-kit
  -> produce stable unsupported/unconsumed/missing/fallback reasons

renderer-parity-report-kit
  -> emit RenderDescriptorParityResult

gamehost-render-parity-diagnostics-kit
  -> project renderParity into GameHost diagnostics and snapshot

ActionFrame-contract-kit
  -> normalize tick input and optional actions

ActionResult-contract-kit
  -> emit accepted/rejected action results with stable reasons

path-progress-reducer-kit
  -> update player.pathProgress and complete walk-the-path at threshold

inspect-target-reducer-kit
  -> validate target id and mark inspect actions

objective-completion-reducer-kit
  -> update completedObjectiveIds without duplicates

gameplay-snapshot-kit
  -> expose active objective, completed objectives, story beats, action journal, and last action results
```

## Implementation boundary

Keep reusable render primitives in ProtoKits or NexusEngine after proof is stable.

Keep this repo focused on game-specific composition, fixture proof, route compatibility, and GameHost projection.
