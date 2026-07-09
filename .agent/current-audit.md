# Current Audit — IntoTheMeadow

**Timestamp:** `2026-07-09T03-38-54-04-00`

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

`IntoTheMeadow` was selected because its central ledger timestamp, `2026-07-09T00-50-00-04-00`, was the oldest eligible non-Cavalry fallback among the checked ledgers.

A same-hour repo-local `03:35` root-agent pointer existed before this pass, but central tracking still pointed to `00:50`, so this run refreshed the central ledger and repo-local required docs together.

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

`src/boot/install-dsks.js` validates local DSK descriptors and records external kit load/deferred status.

`src/dsks/index.js` maps local DSKs to domain labels and service lists, then validates required v0.1 DSK IDs.

`src/game/enhance-render-plan.js` creates a descriptor-rich grass system through local DSKs for density texture, clump archetypes, static batches, patch placement, instancing draw groups, shader wind, LOD policy, density scaling, and debug visualization.

`src/game/create-into-the-meadow-game.js` owns the game factory, fallback meadow-area kit, local DSK install, content descriptors, diagnostics, state, render-plan access, tick, reset, and snapshot hooks.

`src/game/game-state.js` still treats `advanceGameState()` as a tick-only reducer: it increments `frame` and writes `lastTick` without consuming gameplay actions.

`src/game/game-snapshot.js` exposes `manifest`, `state`, `renderPlan`, and `diagnostics`, but does not expose `renderParity` or `gameplay` branches.

`ARRIVAL_OBJECTIVES` and `ARRIVAL_INTERACTION_TARGETS` define the first gameplay proof seam: `path-progress` for `arrival-path` and `inspect` for `focal-tree`.

## Current gap summary

```txt
render descriptor parity: missing
grass consumption readback rows: missing
renderer snapshot absence handling: missing
renderer sparse snapshot handling: missing
ActionFrame normalization: missing
ActionResult reducers: missing
objective completion projection: missing
snapshot.gameplay: missing
GameHost.renderParity: missing
DOM-free parity/action fixtures: missing
```

## Best next implementation

Build additive source modules for renderer readback parity and gameplay action replay.

Do not rewrite visuals, external kit URLs, route setup, or meadow content before the fixture gate exists.
