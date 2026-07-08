# Current Audit — IntoTheMeadow

**Timestamp:** `2026-07-08T18-09-21-04-00`

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

No checked non-Cavalry repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`IntoTheMeadow` was selected for a follow-up documentation pass on the unresolved render-consumption and first-objective ActionResult seam. Repo-local readback showed a prior alignment at `2026-07-08T17-59-43-04-00`; this pass keeps the same next slice but narrows the consumer boundary and fixture rows.

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

`src/hosts/web-host.js` loads two external kits from `GAME_MANIFEST.externalKits`, creates the game, creates the renderer, stores `lastPlan`, calls `renderer.render(plan)`, and exposes `enhancedRenderPlan` plus `render: renderer.getSnapshot?.()` through `GameHost`.

`src/game/enhance-render-plan.js` creates the grass system through local DSKs for density texture, clump archetypes, static batches, patch placement, instancing draw groups, shader wind, LOD policy, density scaling, and debug visualization.

`src/game/game-state.js` still treats `advanceGameState()` as a tick-only reducer: it increments `frame` and writes `lastTick` without consuming any gameplay actions.

`src/game/game-snapshot.js` exposes `manifest`, `state`, `renderPlan`, and `diagnostics`, but does not expose `renderParity` or `gameplay` branches.

`ARRIVAL_OBJECTIVES` and `ARRIVAL_INTERACTION_TARGETS` already define the first playable proof set:

```txt
walk-the-path -> path-progress -> arrival-path -> progressAtLeast 0.35
inspect-tree  -> inspect       -> focal-tree   -> inspected true
```

## Domains in use

```txt
implemented:
  static-route-domain
  browser-boot-domain
  web-host-domain
  external-kit-loading-domain
  manifest-domain
  dsk-install-domain
  meadow-area-domain
  render-plan-domain
  render-plan-enhancement-domain
  renderer-host-domain
  render-snapshot-domain
  grass-system-domain
  grass-density-domain
  grass-static-batch-domain
  grass-placement-domain
  grass-instancing-domain
  grass-wind-domain
  grass-lod-domain
  post-process-domain
  performance-policy-domain
  game-state-domain
  player-state-domain
  world-state-domain
  progression-domain
  objective-descriptor-domain
  interaction-target-domain
  gamehost-diagnostics-domain
  pages-deploy-domain

missing / next-cut:
  render-parity-domain
  expected-render-descriptor-domain
  renderer-snapshot-consumption-domain
  grass-consumption-readback-domain
  action-frame-domain
  action-result-domain
  action-journal-domain
  objective-completion-reducer-domain
  gameplay-snapshot-domain
  fixture-smoke-domain
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
  compare expected descriptors against renderer consumption
  classify consumed/unconsumed/unsupported/fallback/missing descriptor rows
  classify grass consumption rows explicitly
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
  render-parity-reason-kit
  expected-render-descriptor-kit
  renderer-snapshot-consumption-kit
  render-descriptor-parity-kit
  render-parity-diagnostics-projection-kit
  grass-consumption-row-kit
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
IntoTheMeadow GameHost RenderParity Consumer + Objective ActionResult Fixture Gate
```

The next implementation turn should add a render parity helper chain, splice a report into `web-host.js`, preserve existing GameHost fields, add optional action support, reduce `walk-the-path` and `inspect-tree`, and prove both through DOM-free fixtures.
