# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-08T03:28:56-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Goal

Run a follow-up scheduled repo breakdown after comparing the full current `LuminaryLabs-Publish` repository list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

## Selection result

All accessible `LuminaryLabs-Publish` repos were represented in the central ledger, and the standing exclusion rule still removes `LuminaryLabs-Publish/TheCavalryOfRome` from selection.

`IntoTheMeadow` was selected by the fallback oldest-eligible documented-selection rule because it is the earliest currently aligned non-Cavalry Publish repo in the checked root-agent set and because its current highest-risk item is still a cross-repo renderer authority seam that needs durable audit pressure.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       ledgered, root .agent present, selected for follow-up
LuminaryLabs-Publish/HorrorCorridor      ledgered, root .agent present
LuminaryLabs-Publish/AetherVale          ledgered, root .agent present
LuminaryLabs-Publish/ZombieOrchard       ledgered, root .agent present
LuminaryLabs-Publish/TheUnmappedHouse    ledgered, root .agent present
LuminaryLabs-Publish/MyCozyIsland        ledgered, root .agent present
LuminaryLabs-Publish/TheOpenAbove        ledgered, root .agent present
LuminaryLabs-Publish/PhantomCommand      ledgered, root .agent present
LuminaryLabs-Publish/PrehistoricRush     ledgered, root .agent present
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
```

## Interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> boot locates #scene, #hud, #status, #loading
  -> startWebHost() imports external meadow-area-kit and meadow-webgl-render-kit from manifest URLs
  -> createIntoTheMeadowGame() installs local DSK descriptors
  -> createIntoTheMeadowGame() creates ARRIVAL_MEADOW_CONFIG through meadow-area-kit
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt }) updates the deterministic state root
  -> game.getRenderPlan(time) returns meadow-area-kit render plan
  -> enhanceRenderPlan() adds grassSystem, grassPatches, windField, postProcess, performance, and stats
  -> external meadow-webgl-render-kit renders the enhanced descriptor plan
  -> GameHost exposes state, snapshot, diagnostics, render plan, and renderer snapshot
```

## Domains in use

```txt
static-browser-shell
github-pages-deployment
browser-boot-runtime
web-host-runtime
external-kit-loader
cdn-kit-manifest
game-factory
manifest-authority
local-dsk-registry
local-dsk-descriptor-installer
external-meadow-area-bridge
external-webgl-render-bridge
fallback-meadow-area-kit
deterministic-state-root
tick-clock
GameHost-state-contract
GameHost-snapshot-contract
GameHost-diagnostics-contract
canvas-render-surface
debug-hud-surface
arrival-meadow-content
story-beat-ledger
objective-ledger
interaction-target-registry
render-plan-generation
render-plan-enhancement
small-object-clutter-reduction
outline-policy
focal-tree-enhancement
texture-driven-grass-system
grass-density-texture
grass-clump-archetype
grass-static-batch
grass-patch-placement
grass-clump-instancing-render
grass-shader-wind
grass-lod-policy
grass-density-scaling
grass-debug-visualization
wind-field-metadata
post-process-stack-metadata
render-stats-diagnostics
static-smoke-validation
render-plan-smoke-validation
deterministic-scene-smoke-validation
```

## Services that the kits offer

Current game/host services:

```txt
start-web-host
load-external-kits
create-game
create-renderer
expose-game-host
run-animation-frame-loop
render-frame
install-dsks
validate-local-dsks
create-initial-game-state
advance-game-state
create-game-snapshot
get-render-plan
get-diagnostics
reset-state
```

Current render-enhancement services:

```txt
reduce-tiny-clutter
apply-outline-policy
enhance-focal-tree
create-wind-field
create-post-process-stack
create-grass-density-texture
create-grass-clump-archetype
create-grass-static-batch
create-grass-patch-placement
create-grass-clump-instancing-render
create-grass-shader-wind
create-grass-lod-policy
create-grass-density-scaling
create-grass-debug-summary
attach-render-stats
```

Needed next services:

```txt
renderer-consume-grass-system
renderer-draw-grass-static-batches
renderer-apply-grass-shader-wind
renderer-apply-grass-lod-policy
renderer-execute-post-process-stack
renderer-report-descriptor-consumption
renderer-fixture-compare-enhanced-plan-to-renderer-snapshot
create-action-frame
normalize-action-frame
create-action-batch
create-action-result
run-gameplay-reducer-pipeline
create-gameplay-snapshot
create-gameplay-diagnostics
run-replay-parity-fixture
```

## Kits identified

External kits:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

Current local DSK/kit inventory:

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-terrain-texture-dsk
path-corridor-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
grass-patch-dsk
gpu-grass-render-dsk
wind-field-dsk
tree-object-dsk
meadow-scatter-dsk
meadow-atmosphere-dsk
meadow-player-dsk
meadow-camera-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-story-dsk
meadow-objective-dsk
meadow-ecology-dsk
meadow-audio-dsk
meadow-ui-dsk
meadow-save-dsk
meadow-diagnostics-dsk
meadow-performance-dsk
meadow-render-host-dsk
post-process-stack-dsk
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
static-pages-deploy-dsk
```

## Current audit finding

The repo-local game composition is already descriptor-rich. The most important active gap is not more scene metadata; it is renderer descriptor consumption.

`enhanceRenderPlan()` now emits:

```txt
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.debug
postProcess
windField
performance budgets
estimated grass/card stats
```

The external renderer still needs to prove that those descriptors are consumed as actual instanced grass, texture-driven meadow density, tree/framing systems, and post-process passes.

## Known risks

```txt
- The external ProtoKits renderer remains the visible fidelity bottleneck.
- The game can produce grassSystem descriptors without proving renderer consumption.
- The game can produce postProcess descriptors without proving pass execution.
- GameHost diagnostics currently reports game/render counts but not descriptor consumption parity.
- Gameplay state is still thin compared to story, objective, and interaction descriptors.
- The local DSK list includes many domain names that are descriptors or planned seams, not all mature runtime packages.
```

## Next safe ledge

```txt
IntoTheMeadow Renderer Descriptor Consumption Fixture Gate
```

Build order:

```txt
preserve index.html -> boot-game.js -> web-host.js
preserve GameHost compatibility
preserve existing enhanced render plan output
add renderer consumption diagnostics in the external meadow-webgl-render-kit
prove grassSystem.drawGroups become rendered instanced grass groups
prove postProcess.passes become executed or explicitly reported as unsupported
add renderer snapshot fields for consumed descriptor counts
add a DOM-free fixture comparing enhanced render plan stats to renderer snapshot stats
then return to gameplay action/reducer fixture work
```

## Validation performed

```txt
GitHub connector source inspection
repo-list comparison through GitHub repository search
central ledger search comparison
root .agent START_HERE readback for checked repos
source-level audit of boot, host, game factory, render enhancement, DSK registry, and render-plan smoke test
```

## Validation not performed

```txt
npm run check
browser visual route check
GitHub Pages deploy check
external ProtoKits renderer source check
```
