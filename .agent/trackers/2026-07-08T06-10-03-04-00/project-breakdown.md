# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-08T06:10:03-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Mode:** repo-breakdown follow-up / renderer consumption fixture narrowing

## Selection result

The accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

Checked Publish repos:

```txt
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/TheUnmappedHouse
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PrehistoricRush
```

Central tracking has ledger entries for checked non-Cavalry Publish repos, and checked non-Cavalry repos now have root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the follow-up target because the repo is now well documented but still has the highest leverage product gap for the current meadow push: the game emits high-fidelity meadow descriptors, but the renderer does not yet produce a stable consumed/unconsumed descriptor parity report.

## Files inspected

```txt
README.md
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/enhance-render-plan.js
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/renderer-consumption-audit/descriptor-consumption-parity.md
LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
```

## Current interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> load external meadow-area-kit from GAME_MANIFEST
  -> load external meadow-webgl-render-kit from GAME_MANIFEST
  -> createIntoTheMeadowGame({ externalKits })
  -> install local DSK descriptors
  -> create arrival meadow area kit from ARRIVAL_MEADOW_CONFIG
  -> expose GameHost with state, snapshot, diagnostics, render plan, and renderer snapshot
  -> requestAnimationFrame loop
  -> game.tick({ time, dt })
  -> rawPlan = game.getRenderPlan(time)
  -> plan = enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> optional debug HUD shows validation/object/patch/vertex counts
```

## Current renderer handoff

```txt
src/game/enhance-render-plan.js
  -> adds grassSystem
  -> adds grassPatches alias
  -> adds windField
  -> adds postProcess
  -> adds performance profile/budgets/outlinePolicy
  -> removes primitive grass-blade objects from enhanced objects
  -> adds stats for grass patches, static batches, draw groups, estimated instances, and estimated cards

src/hosts/web-host.js
  -> passes enhanced plan to renderer.render(plan)
  -> stores lastPlan
  -> exposes enhancedRenderPlan through GameHost snapshot
  -> exposes renderer.getSnapshot?.() through GameHost snapshot
```

## Domains in use

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
renderer-descriptor-consumption-parity
renderer-unsupported-descriptor-reason-catalog
renderer-parity-fixture-domain
renderer-fixture-case-matrix
renderer-parity-diagnostics-projection
action-frame-contract
action-batch-contract
action-result-contract
action-journal-contract
stable-rejection-reason-catalog
reducer-result-contract
ordered-reducer-pipeline
gameplay-snapshot-contract
fixture-replay-domain
```

## Kit services captured

Current host/game services:

```txt
locate-canvas
locate-hud
locate-loading-surface
start-web-host
load-external-kits
create-game
create-renderer
expose-game-host
run-frame-loop
render-frame
install-dsks
validate-local-dsks
create-meadow-area-kit
create-fallback-meadow-area-kit
create-initial-game-state
advance-game-state
create-game-snapshot
validate-game-snapshot
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
create-grass-instancing-draw-groups
create-grass-shader-wind
create-grass-lod-policy
create-grass-density-scaling
create-grass-debug-summary
attach-grass-stats
```

Needed parity services:

```txt
collect-expected-render-descriptors
normalize-renderer-snapshot-consumption
compare-render-descriptor-parity
classify-render-descriptor-status
report-grass-drawgroup-parity
report-post-process-parity
report-wind-field-parity
report-render-style-parity
project-render-parity-to-GameHost
run-render-parity-fixture-matrix
```

## Kits identified

External kits:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

Current local active kits:

```txt
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
wind-field-dsk
tree-object-dsk
meadow-performance-dsk
post-process-stack-dsk
```

Registry/planned local kits still tracked for the game surface:

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-terrain-texture-dsk
path-corridor-dsk
grass-patch-dsk
gpu-grass-render-dsk
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
meadow-render-host-dsk
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
```

Next-cut parity kits:

```txt
renderer-descriptor-expectation-kit
renderer-snapshot-consumption-kit
renderer-descriptor-consumption-kit
renderer-unsupported-descriptor-reason-kit
renderer-parity-report-kit
grass-drawgroup-consumption-kit
post-process-pass-consumption-kit
wind-field-consumption-kit
render-style-consumption-kit
gamehost-render-parity-diagnostics-kit
renderer-parity-fixture-kit
```

## Main finding

`IntoTheMeadow` should not add more meadow decoration before proving renderer consumption.

The source game now emits the right descriptor shape for the desired meadow direction:

```txt
grass density texture
64-card grass clump archetypes
static grass batches
texture-driven patch placement
draw groups
shader wind
LOD policy
debug summary
post-process stack
wind field
performance budgets
render-style tiers
```

But the external renderer snapshot needs to say what it consumed, what it ignored, and why.

## Next safe ledge

```txt
Renderer Descriptor Consumption Parity Fixture Matrix
```

Implementation should preserve the current public route and add a DOM-free fixture path that can take:

```txt
enhancedRenderPlan
rendererSnapshot
```

and return:

```txt
RenderDescriptorParityResult
```

Do this before changing visual systems again.

## Validation

No runtime files changed in this documentation pass.

No local `npm run check`, browser render, GitHub Pages, or screenshot validation was run through the connector.

The next implementation pass should run:

```bash
npm run check
```

Then browser-check the live route and verify `GameHost.getDiagnostics().renderParity` once that projection exists.
