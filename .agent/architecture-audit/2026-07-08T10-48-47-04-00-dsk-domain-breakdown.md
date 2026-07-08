# IntoTheMeadow Architecture Audit — DSK / Domain Breakdown

**Timestamp:** `2026-07-08T10-48-47-04-00`

## Selection result

`LuminaryLabs-Publish/IntoTheMeadow` was selected after checking the full accessible `LuminaryLabs-Publish` repo list against `LuminaryLabs-Dev/LuminaryLabs` ledger state and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry repo was fully new, absent from the central ledger, undocumented, or missing root `.agent/START_HERE.md`.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was the oldest eligible fallback by latest central update time among the checked publish repos.

## Product read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game. The repo owns the browser route, local game factory, content descriptors, local DSK descriptor registry, render-plan enhancement, GameHost projection, and validation scripts.

Reusable meadow area generation and WebGL rendering are consumed externally from `LuminaryLabs-Agents/NexusRealtime-ProtoKits` through CDN URLs in the manifest.

## Runtime route

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/game/create-into-the-meadow-game.js
  -> src/game/enhance-render-plan.js
  -> external meadow-webgl-render-kit
```

## Interaction loop

```txt
browser loads index.html
  -> boot-game.js locates canvas/HUD/loading surfaces
  -> startWebHost loads external meadow-area and meadow-webgl render kits
  -> createIntoTheMeadowGame installs local DSK descriptors
  -> meadow-area-kit creates ARRIVAL_MEADOW_CONFIG runtime plan source
  -> requestAnimationFrame calls game.tick({ time, dt })
  -> advanceGameState increments frame and records lastTick only
  -> game.getRenderPlan(time) returns raw meadow-area render plan
  -> enhanceRenderPlan adds grass, wind, postProcess, performance, outline, and stats descriptors
  -> renderer.render(enhancedPlan)
  -> GameHost exposes state, snapshot, diagnostics, enhanced render plan, and renderer snapshot
```

## Current state authority

```txt
createInitialGameState
  -> frame
  -> activeSceneId
  -> activeSessionId
  -> player.position/yaw/pitch/pathProgress
  -> world.wind
  -> progression.activeObjectiveId
  -> progression.completedObjectiveIds
  -> progression.storyBeatIds
  -> dsk install snapshot

advanceGameState
  -> frame + 1
  -> lastTick.dt
  -> lastTick.time
```

The current state root is deterministic but not yet gameplay-authoritative. It does not reduce optional actions, objective completion, story triggers, or interaction records.

## Domains in use

### Runtime / host domains

```txt
static-browser-shell
github-pages-deployment
browser-boot-runtime
web-host-runtime
external-kit-loading
cdn-kit-import-manifest
animation-frame-loop
debug-hud-runtime
canvas-surface
GameHost-state-contract
GameHost-snapshot-contract
GameHost-diagnostics-contract
GameHost-render-snapshot-contract
runtime-compatibility-contract
static-smoke-validation
```

### Game composition domains

```txt
manifest-authority
game-factory
content-pack-authority
local-dsk-registry
local-dsk-descriptor-installer
local-dsk-validation
external-meadow-area-bridge
external-webgl-render-bridge
fallback-meadow-area-kit
scene-identity
session-identity
deterministic-state-root
tick-clock
last-tick-diagnostics
snapshot-root
```

### Meadow content domains

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
story-beat-ledger
objective-ledger
interaction-target-registry
```

### Render domains

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
renderer-descriptor-consumption-parity-needed
```

### Gameplay authority domains needed next

```txt
ActionFrame-contract
ActionBatch-normalization
ActionEnvelope-normalization
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

## Kits and services

### External CDN kits

```txt
meadow-area-kit
  service: createMeadowAreaKit(config)
  service: getRenderPlan({ time })
  service: getSnapshot()
  service: validate()

meadow-webgl-render-kit
  service: createMeadowWebglRenderKit({ canvas })
  service: render(plan)
  service: getSnapshot()
```

### Implemented local source kits / DSKs

```txt
grass-density-texture-kit
  service: creates deterministic density texture descriptors and validation metadata

grass-clump-archetype-kit
  service: creates reusable grass-card archetype descriptors

grass-static-batch-kit
  service: groups archetypes into reusable static batch descriptors

grass-patch-placement-kit
  service: emits grass patch placement descriptors from density texture and batches

grass-clump-instancing-render-kit
  service: derives instancing drawGroup descriptors and validates draw groups

grass-shader-wind-kit
  service: normalizes wind uniform metadata and validation

grass-lod-policy-kit
  service: emits grass LOD thresholds and validation metadata

grass-density-scaling-kit
  service: maps quality profile to density scaling

grass-debug-visualization-kit
  service: summarizes density/batch/patch/drawGroup telemetry

wind-field-dsk
  service: normalizes render wind field metadata

tree-object-dsk
  service: enhances focal-tree descriptors with render style

meadow-performance-dsk
  service: emits quality profile, budgets, and outline policy

post-process-stack-dsk
  service: emits post-process pass descriptor stack
```

### Next-cut fixture kits

```txt
renderer-descriptor-expectation-kit
renderer-snapshot-consumption-kit
renderer-descriptor-consumption-kit
renderer-unsupported-descriptor-reason-kit
renderer-parity-report-kit
gamehost-render-parity-diagnostics-kit
ActionFrame-contract-kit
ActionResult-contract-kit
ActionReason-catalog-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-reducer-kit
gameplay-snapshot-kit
gameplay-fixture-replay-kit
```

## Architecture decision

Do not add a new meadow scene or more visual descriptors yet.

The next source edit should implement the narrow cutover path already implied by the source:

```txt
render descriptor expectation
  -> renderer snapshot consumption normalization
  -> renderParity projection
  -> ActionFrame optional tick input
  -> ActionResult reducers
  -> snapshot.gameplay
  -> npm run check fixture expansion
```
