# Current Audit — IntoTheMeadow

**Timestamp:** `2026-07-09T06-28-53-04-00`

## Current state

`IntoTheMeadow` is a static browser game route that boots through `src/hosts/web-host.js`, creates `createIntoTheMeadowGame`, enhances external meadow-area render plans through local DSK descriptors, and passes the resulting plan into the external `meadow-webgl-render-kit`.

The repo should stay a publishable game/deploy repo with local proof kits, not the permanent home for reusable meadow renderer systems.

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

`TheCavalryOfRome` was excluded.

The central ledger already tracks every non-Cavalry repo in that list.

No non-excluded Publish repo was found to be fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`IntoTheMeadow` was selected as the oldest eligible central-ledger fallback after later same-day passes updated `TheOpenAbove`, `PrehistoricRush`, `AetherVale`, `MyCozyIsland`, `TheUnmappedHouse`, `ZombieOrchard`, `PhantomCommand`, and `HorrorCorridor`.

## Current interaction loop

```txt
index.html
  -> boot-game.js
  -> startWebHost
  -> load external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame
  -> install local DSK descriptors
  -> create arrival meadow area kit
  -> create meadow WebGL renderer
  -> expose GameHost state/snapshot/diagnostics/enhanced plan/render snapshot
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> optional debug HUD reports validation/object/grass/render counts
```

## Source-backed facts

`src/content/game-manifest.js` defines the route, public URL, default scene, and two external CDN kits: `meadow-area-kit` and `meadow-webgl-render-kit`.

`src/hosts/web-host.js` loads both external kits from `GAME_MANIFEST.externalKits`, creates the game and renderer, stores `lastPlan`, passes the enhanced plan to `renderer.render(plan)`, and exposes `enhancedRenderPlan` plus `renderer.getSnapshot?.()` through `GameHost`.

`src/game/enhance-render-plan.js` creates a descriptor-rich render layer from local DSKs: focal-tree outline enhancement, tiny clutter reduction, wind field, post-process stack, performance policy, density texture, clump archetypes, static batches, patch placement, instancing draw groups, shader wind, LOD, density scaling, and grass debug summary.

`src/game/create-into-the-meadow-game.js` owns the game factory, fallback meadow-area kit, DSK install, content descriptors, diagnostics, state, render-plan access, tick, reset, and snapshot hooks.

`src/game/game-state.js` still treats `advanceGameState()` as a tick-only reducer: it increments `frame` and writes `lastTick` without consuming gameplay actions.

`src/game/game-snapshot.js` exposes `manifest`, `state`, `renderPlan`, and `diagnostics`, but does not expose `renderParity` or `gameplay` branches.

`src/content/objectives/arrival-objectives.js` and `src/content/interaction-targets/arrival-targets.js` define the first proof seam: `path-progress` for `arrival-path` and `inspect` for `focal-tree`.

`src/content/dsk-registry.js` names the active local and required DSKs, including the grass descriptor kits, render host, diagnostics, performance, post-process, and deploy DSKs.

## Domains in use

```txt
route-shell-domain
web-host-domain
external-kit-loading-domain
game-composition-domain
meadow-area-domain
render-enhancement-domain
graphics-outline-policy-domain
grass-system-domain
wind-field-domain
post-process-domain
performance-policy-domain
render-host-domain
gameplay-state-domain
objective-interaction-domain
diagnostics-domain
deploy-validation-domain
```

## Current service surface

```txt
manifest route service
external kit URL service
external kit import service
game factory service
fallback meadow render-plan service
DSK registry service
DSK validation service
meadow area render-plan service
render-plan enhancement service
outline policy service
tiny clutter budget service
grass density texture service
grass archetype/static-batch/placement/instancing services
grass shader wind / LOD / density-scale / debug services
wind-field descriptor service
post-process descriptor service
performance policy service
tick state service
game snapshot service
diagnostics service
GameHost exposure service
```

## Current kit inventory

```txt
External current kits:
- meadow-area-kit
- meadow-webgl-render-kit

Local current DSK descriptors:
- into-the-meadow-game-dsk
- web-host-dsk
- game-composition-dsk
- meadow-area-bridge-dsk
- meadow-terrain-texture-dsk
- path-corridor-dsk
- grass-patch-dsk
- gpu-grass-render-dsk
- wind-field-dsk
- tree-object-dsk
- meadow-scatter-dsk
- meadow-atmosphere-dsk
- meadow-player-dsk
- meadow-camera-dsk
- meadow-input-dsk
- meadow-interaction-dsk
- meadow-story-dsk
- meadow-objective-dsk
- meadow-ecology-dsk
- meadow-audio-dsk
- meadow-ui-dsk
- meadow-save-dsk
- meadow-diagnostics-dsk
- meadow-performance-dsk
- meadow-render-host-dsk
- post-process-stack-dsk
- render-target-kit
- sobel-outline-pass-kit
- color-grade-pass-kit
- depth-fog-pass-kit
- vignette-pass-kit
- final-composite-pass-kit
- static-pages-deploy-dsk

Local implemented render/grass kits consumed by enhanceRenderPlan:
- tree-object-dsk
- wind-field-dsk
- meadow-performance-dsk
- post-process-stack-dsk
- grass-density-texture-kit
- grass-clump-archetype-kit
- grass-static-batch-kit
- grass-patch-placement-kit
- grass-clump-instancing-render-kit
- grass-shader-wind-kit
- grass-lod-policy-kit
- grass-density-scaling-kit
- grass-debug-visualization-kit
```

## Current gap summary

```txt
render descriptor parity: missing
grass consumption readback rows: missing
renderer snapshot absence handling: missing
renderer sparse snapshot handling: missing
ActionFrame normalization: missing
ActionResult reducers: missing
target/action reason catalog: missing
objective completion projection: missing
snapshot.gameplay: missing
GameHost.renderParity: missing
DOM-free parity/action fixtures: missing
```

## Best next implementation

Build additive source modules for renderer readback parity and gameplay action replay.

Do not rewrite visuals, external kit URLs, route setup, or meadow content before the fixture gate exists.
