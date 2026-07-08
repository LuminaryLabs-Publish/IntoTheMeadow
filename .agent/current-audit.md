# Current Audit — IntoTheMeadow

**Timestamp:** `2026-07-08T09:11:03-04:00`

## Current state

`IntoTheMeadow` is a static browser game route that boots from `index.html`, imports `src/boot/boot-game.js`, starts `src/hosts/web-host.js`, creates the game through `src/game/create-into-the-meadow-game.js`, enhances external meadow-area render plans through `src/game/enhance-render-plan.js`, and renders through the external `meadow-webgl-render-kit`.

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

`IntoTheMeadow` was selected as the oldest eligible fallback follow-up because the renderer-consumption contract and first gameplay action/result reducer handoff remain the two most important local proof seams before additional content or visual expansion.

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
  -> enhanceRenderPlan adds local grass, wind, post-process, tree, performance, outline, and stats descriptors
  -> meadow-webgl-render-kit renders the enhanced plan
  -> GameHost exposes state, snapshot, diagnostics, render plan, and renderer snapshot
```

Current gameplay state loop:

```txt
createInitialGameState()
  -> frame: 0
  -> activeSceneId
  -> activeSessionId
  -> player.position/yaw/pitch/pathProgress
  -> world.wind
  -> progression.activeObjectiveId
  -> progression.completedObjectiveIds
  -> progression.storyBeatIds

advanceGameState(state, input)
  -> frame + 1
  -> lastTick.dt
  -> lastTick.time
```

Target gameplay proof loop:

```txt
game.tick({ time, dt, actions })
  -> create ActionFrame
  -> normalize ActionEnvelope records
  -> reduce path-progress and inspect actions
  -> emit accepted/rejected ActionResult records
  -> update completedObjectiveIds idempotently
  -> append gameplay action journal
  -> expose snapshot.gameplay
```

## Key architecture truth

The current game is descriptor-rich but still proof-limited.

`enhanceRenderPlan()` emits a texture-driven grass system, density texture, 64-card clump archetypes, static batches, patch placements, instancing draw groups, shader wind, LOD policy, debug summary, post-process stack descriptors, outline policy, performance budgets, and estimated grass/card counts.

`web-host.js` passes the enhanced plan to `renderer.render(plan)` and exposes an enhanced render plan plus renderer snapshot through `GameHost`, but there is no parity gate proving the renderer consumed each high-fidelity descriptor.

`game-state.js` contains `player.pathProgress` and `progression.activeObjectiveId`, while the content descriptors define `walk-the-path` and `inspect-tree`, but there is no action reducer yet.

## Current live-risk summary

```txt
- The visual route depends on external ProtoKits renderer behavior.
- The game emits grassSystem metadata, but the render kit still needs real instanced clump rendering or explicit unconsumed reporting.
- The game emits postProcess metadata, but the render kit still needs pass execution or explicit unsupported-pass reporting.
- GameHost diagnostics does not yet expose renderer descriptor-consumption parity.
- game.tick({ time, dt }) has no ActionFrame / ActionResult reducer path.
- Objective and interaction descriptors exist but are not reduced into gameplay state.
- snapshot.gameplay does not exist yet.
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
player-state
path-progress-state
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

## Kit service summary

```txt
meadow-area-kit: createMeadowAreaKit, getRenderPlan, getSnapshot, validate
meadow-webgl-render-kit: createMeadowWebglRenderKit, render, getSnapshot
grass-density-texture-kit: density texture descriptor and validation
grass-clump-archetype-kit: card clump archetype creation and validation
grass-static-batch-kit: static batch descriptor creation and validation
grass-patch-placement-kit: grass patch placement and validation
grass-clump-instancing-render-kit: drawGroup derivation and validation
grass-shader-wind-kit: wind shader metadata and validation
grass-lod-policy-kit: LOD descriptors and validation
grass-density-scaling-kit: density scale by quality profile
grass-debug-visualization-kit: density/batch/patch/drawGroup summary
wind-field-dsk: normalized wind render metadata
tree-object-dsk: focal tree descriptor enhancement
meadow-performance-dsk: quality profile, budgets, outline policy
post-process-stack-dsk: post-process pass descriptor stack
```

## Next safe ledge

Implement the source-order **Renderer Parity + ActionFrame Fixture Implementation Map**:

```txt
src/render-parity/*
tests/render-parity-fixture-smoke.mjs
GameHost renderParity projection
src/gameplay-authority/*
src/game/game-state.js optional actions
src/game/game-snapshot.js snapshot.gameplay
tests/gameplay-authority-fixture-smoke.mjs
package.json check path update
```
