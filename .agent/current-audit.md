# Current Audit — IntoTheMeadow

**Timestamp:** `2026-07-08T17-59-43-04-00`

## Current state

`IntoTheMeadow` is a static browser game route that boots from `index.html`, imports `src/boot/boot-game.js`, starts `src/hosts/web-host.js`, creates the game through `src/game/create-into-the-meadow-game.js`, enhances external meadow-area render plans through `src/game/enhance-render-plan.js`, and renders through the external `meadow-webgl-render-kit`.

The repo correctly acts as a publishable game/deploy repo, not a generic kit foundry.

## Repo-selection audit

The accessible `LuminaryLabs-Publish` repo list checked this run contained:

```txt
HorrorCorridor
AetherVale
TheOpenAbove
TheCavalryOfRome
PhantomCommand
PrehistoricRush
ZombieOrchard
IntoTheMeadow
MyCozyIsland
TheUnmappedHouse
```

`TheCavalryOfRome` was excluded.

Central comparison in `LuminaryLabs-Dev/LuminaryLabs` showed the non-excluded Publish repos represented in `repo-ledger/LuminaryLabs-Publish/`.

`IntoTheMeadow` was selected as the fallback repo for this run because its render-consumption and first-objective action-authority seams remain unresolved and can be made more precise without changing runtime source.

## Current interaction loop

```txt
index.html
  -> boot-game.js
  -> startWebHost
  -> load external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame
  -> install local DSK descriptors
  -> create arrival meadow area kit
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> GameHost exposes state, snapshot, diagnostics, enhanced plan, and renderer snapshot
```

## Source-backed facts

`src/content/game-manifest.js` owns the route, build id, public URL, default scene, and external CDN URLs for `meadow-area-kit` and `meadow-webgl-render-kit`.

`src/hosts/web-host.js` loads the two external kits, creates the game, creates the renderer, stores `lastPlan`, calls `renderer.render(plan)`, and exposes `enhancedRenderPlan` plus `render: renderer.getSnapshot?.()` through `GameHost`.

`src/game/create-into-the-meadow-game.js` owns the fallback meadow kit, DSK install snapshot, content bundle, diagnostics, state access, tick, reset, and snapshot entry.

`src/game/enhance-render-plan.js` creates the grass system through local DSKs for density texture, clump archetypes, static batches, patch placement, instancing draw groups, shader wind, LOD policy, density scaling, and debug visualization.

`src/game/game-state.js` still treats `advanceGameState()` as a tick-only reducer: it increments `frame` and writes `lastTick` without consuming gameplay actions.

`src/game/game-snapshot.js` exposes `manifest`, `state`, `renderPlan`, and `diagnostics`, but does not expose `renderParity` or `gameplay` branches.

`ARRIVAL_OBJECTIVES` and `ARRIVAL_INTERACTION_TARGETS` already define the first playable proof set:

```txt
walk-the-path -> path-progress -> arrival-path -> progressAtLeast 0.35
inspect-tree  -> inspect       -> focal-tree   -> inspected true
```

## Domains in use

```txt
static-route-domain
browser-boot-domain
web-host-domain
external-kit-loading-domain
manifest-domain
cdn-kit-source-domain
dsk-install-domain
meadow-area-domain
fallback-meadow-area-domain
render-plan-domain
render-plan-enhancement-domain
render-descriptor-domain
renderer-host-domain
renderer-snapshot-domain
render-consumption-domain
render-parity-domain
grass-system-domain
grass-density-domain
grass-archetype-domain
grass-static-batch-domain
grass-patch-placement-domain
grass-instancing-domain
grass-shader-wind-domain
grass-lod-domain
grass-debug-domain
game-state-domain
player-state-domain
world-state-domain
progression-domain
objective-domain
interaction-target-domain
action-frame-domain
action-result-domain
action-journal-domain
gameplay-snapshot-domain
gamehost-diagnostics-domain
fixture-smoke-domain
pages-deploy-domain
```

## Services

```txt
current services:
  load external meadow kits from CDN
  create DSK install snapshot
  create arrival meadow render plan
  enhance render plans with grass/wind/postprocess/performance descriptors
  render enhanced plan through the external renderer
  expose state, snapshot, diagnostics, enhanced plan, and renderer snapshot through GameHost

needed next services:
  collect expected enhanced-plan descriptors
  normalize renderer.getSnapshot consumption readback
  classify render-consumption rows
  expose GameHost.renderParity additively
  normalize optional input actions into ActionFrame records
  reduce path-progress and inspect actions into ActionResults
  resolve objective completion idempotently
  project snapshot.gameplay without breaking existing snapshot shape
  smoke render parity and gameplay action reducers without DOM/browser dependencies
```

## Kits

```txt
implemented external kits:
  meadow-area-kit
  meadow-webgl-render-kit

implemented local kits / descriptors:
  game-manifest descriptor
  local-dsk-registry
  arrival-meadow content descriptor
  story-beats descriptor
  arrival-objectives descriptor
  arrival-interaction-targets descriptor
  fallback-meadow-area-kit
  web-host composition kit
  GameHost exposure kit
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

next-cut kits:
  render-consumption-source-manifest-kit
  expected-render-descriptor-kit
  renderer-snapshot-consumption-kit
  render-consumption-row-kit
  render-parity-report-kit
  GameHost-render-parity-projection-kit
  grass-consumption-fixture-row-kit
  action-frame-kit
  action-result-kit
  action-journal-kit
  path-progress-reducer-kit
  inspect-target-reducer-kit
  objective-completion-resolver-kit
  gameplay-snapshot-kit
  render-parity-fixture-smoke-kit
  gameplay-authority-fixture-smoke-kit
```

## Current priority

```txt
IntoTheMeadow Render Consumption Source Manifest + Objective Action Fixture Matrix
```

The next implementation turn should add pure render-parity and gameplay-authority modules, fixture rows, and additive GameHost/snapshot projections. Do not start new content or visual expansion first.
