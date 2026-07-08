# Architecture Audit — Renderer/GamePlay Contract Map

**Timestamp:** `2026-07-08T12-21-20-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Selection basis

The accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

No checked non-Cavalry repository was fully new, absent from the ledger, undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

`IntoTheMeadow` was selected as the oldest eligible fallback because its central ledger still showed the renderer parity plus gameplay action-result cutover as the next unresolved seam.

## Current interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> load external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame()
  -> install local DSK descriptors
  -> create ARRIVAL_MEADOW_CONFIG area kit
  -> requestAnimationFrame frame loop
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> expose GameHost state/snapshot/diagnostics/render snapshot
```

## Target proof loop

```txt
enhanced render plan
  -> collect expected descriptor inventory
  -> normalize renderer snapshot consumption
  -> compare consumed/unconsumed/unsupported/fallback descriptors
  -> publish renderParity into GameHost diagnostics
  -> accept optional game.tick({ time, dt, actions }) input
  -> normalize ActionFrame
  -> reduce path-progress and inspect actions
  -> return ActionResult records
  -> update progression idempotently
  -> expose snapshot.gameplay
  -> add DOM-free fixture smoke proof
```

## Domains in use

```txt
static-browser-shell
github-pages-deployment
browser-boot-runtime
web-host-runtime
external-kit-loading
cdn-kit-import-manifest
request-animation-frame-loop
canvas-render-surface
debug-hud-runtime
GameHost-state-contract
GameHost-snapshot-contract
GameHost-diagnostics-contract
GameHost-render-snapshot-contract
runtime-compatibility-contract
static-smoke-validation
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
player-state
path-progress-state
progression-ledger
snapshot-root
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
ActionFrame-contract-needed
ActionResult-contract-needed
objective-reducer-needed
gameplay-snapshot-needed
```

## Services the kits offer

Current external services:

```txt
meadow-area-kit.createMeadowAreaKit
meadow-area-kit.getRenderPlan
meadow-area-kit.getSnapshot
meadow-area-kit.validate
meadow-webgl-render-kit.createMeadowWebglRenderKit
meadow-webgl-render-kit.render
meadow-webgl-render-kit.getSnapshot
```

Current repo-local services:

```txt
installDsks
createIntoTheMeadowGame
createInitialGameState
advanceGameState
createGameSnapshot
validateGameSnapshot
enhanceRenderPlan
createFallbackMeadowAreaKit
exposeGameHost
```

Render enhancement services:

```txt
createGrassDensityTextureKit
createGrassClumpArchetypeKit
createGrassStaticBatchKit
createGrassPatchPlacementKit
createGrassClumpInstancingRenderKit
createGrassShaderWindKit
createGrassLodPolicyKit
createGrassDensityScalingKit
createGrassDebugVisualizationKit
createWindFieldDsk
createTreeObjectDsk
createMeadowPerformancePolicy
createPostProcessStack
```

Needed services:

```txt
collectExpectedRenderDescriptors
normalizeRendererSnapshotConsumption
compareRenderDescriptorParity
createRenderParityReport
projectRenderParityDiagnostics
createActionFrame
normalizeActionFrame
createActionResult
reducePathProgressAction
reduceInspectTargetAction
resolveObjectiveCompletion
createGameplaySnapshot
runRendererGameplayFixture
```

## Kits identified

Existing kits:

```txt
meadow-area-kit
meadow-webgl-render-kit
game-manifest descriptor
local-dsk-registry
arrival-meadow content descriptor
story-beats descriptor
arrival-objectives descriptor
arrival-interaction-targets descriptor
tree-object-dsk
wind-field-dsk
meadow-performance-dsk
post-process-stack-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
fallback-meadow-area-kit
```

Next-cut kits:

```txt
render-parity-reason-kit
expected-render-descriptor-kit
renderer-snapshot-consumption-kit
render-descriptor-parity-kit
render-parity-diagnostics-projection-kit
action-frame-kit
action-result-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-resolver-kit
gameplay-snapshot-kit
renderer-gameplay-fixture-smoke-kit
```
