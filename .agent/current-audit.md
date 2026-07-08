# Current Audit — IntoTheMeadow

**Timestamp:** `2026-07-08T06:10:03-04:00`

## Current state

`IntoTheMeadow` is a static browser game route that boots from `index.html`, imports `src/boot/boot-game.js`, starts `src/hosts/web-host.js`, creates the game through `src/game/create-into-the-meadow-game.js`, enhances external meadow-area render plans through `src/game/enhance-render-plan.js`, and renders via the external `meadow-webgl-render-kit`.

The repo correctly declares itself as a publishable game/deploy repo, not a generic kit foundry.

The game owns:

```txt
- game manifest
- local DSK descriptor registry
- game factory
- deterministic state root
- GameHost exposure
- arrival meadow content
- story/objective/interaction descriptors
- render-plan enhancement layer
- static validation scripts
- GitHub Pages deploy surface
```

The game consumes:

```txt
- meadow-area-kit from NexusRealtime-ProtoKits
- meadow-webgl-render-kit from NexusRealtime-ProtoKits
```

## Repo-selection audit

The accessible `LuminaryLabs-Publish` repo list checked this run contained:

```txt
IntoTheMeadow
HorrorCorridor
AetherVale
ZombieOrchard
TheUnmappedHouse
MyCozyIsland
TheOpenAbove
PhantomCommand
TheCavalryOfRome
PrehistoricRush
```

The central `LuminaryLabs-Dev/LuminaryLabs` ledger has entries for checked non-Cavalry Publish repos, and root `.agent/START_HERE.md` state exists for checked non-Cavalry repos.

`TheCavalryOfRome` was not considered because of the standing exclusion rule.

`IntoTheMeadow` was selected by fallback follow-up because its renderer-consumption contract remains the most important local proof seam before more visual expansion.

## Interaction loop

```txt
index.html
  -> loads src/boot/boot-game.js
  -> boot-game.js locates canvas, HUD, status, and loading elements
  -> startWebHost imports external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame installs local DSK descriptors
  -> createIntoTheMeadowGame builds ARRIVAL_MEADOW_CONFIG through meadow-area-kit
  -> requestAnimationFrame calls game.tick({ time, dt })
  -> game.getRenderPlan(time) returns the external meadow-area render plan
  -> enhanceRenderPlan adds local grass, wind, post-process, tree, performance, and render stats descriptors
  -> meadow-webgl-render-kit renders the enhanced plan
  -> GameHost exposes state, snapshot, diagnostics, render plan, and renderer snapshot
```

## Key architecture truth

The current game is descriptor-rich but renderer-limited.

`enhanceRenderPlan()` emits a texture-driven grass system, density texture, 64-card clump archetypes, static batches, patch placements, instancing draw groups, shader wind, LOD policy, debug summary, post-process stack descriptors, outline policy, performance budgets, and estimated grass/card counts.

`web-host.js` passes the enhanced plan to `renderer.render(plan)` and exposes an enhanced render plan plus renderer snapshot through `GameHost`, but there is no parity gate proving the renderer consumed each high-fidelity descriptor.

This means a scene can still look cartoony or sparse even when the source descriptors claim dense procedural meadow intent.

## Current live-risk summary

```txt
- The visual route depends on external ProtoKits renderer behavior.
- The game emits grassSystem metadata, but the render kit still needs real instanced clump rendering.
- The game emits postProcess metadata, but the render kit still needs pass execution or explicit unsupported-pass reporting.
- Tree metadata is enriched locally, but renderer authority must move away from primitive focal-tree drawing.
- GameHost diagnostics does not yet prove renderer descriptor-consumption parity.
- Gameplay state remains minimal compared to story/objective/interaction descriptors.
- The repo has many planned DSK descriptors that are not all implemented as real runtime packages.
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

## Services captured

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

Current render services:

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

Needed renderer parity services:

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

## Kits captured

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

## Current status

```txt
status: renderer-parity-fixture-matrix-documented
selected-repo: LuminaryLabs-Publish/IntoTheMeadow
primary-gap: renderer-descriptor-consumption-parity
secondary-gap: gameplay-authority-runtime
safe-next-ledges:
  1. DOM-free renderer parity fixture matrix
  2. GameHost renderParity diagnostic projection
  3. renderer consumes or reports grassSystem.drawGroups
  4. renderer executes or reports postProcess descriptors
  5. gameplay action/reducer fixture gate
```
