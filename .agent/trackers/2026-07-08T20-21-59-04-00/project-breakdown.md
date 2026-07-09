# Project Breakdown Tracker — IntoTheMeadow

**Timestamp:** `2026-07-08T20-21-59-04-00`

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger, choose one eligible repo, update repo-local `.agent` docs, and log the findings centrally.

## Checklist

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared Publish repo list against central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Read repo-local `.agent` state.
- [x] Read central ledger state.
- [x] Read manifest, web host, game factory, state, snapshot, render enhancement, objectives, targets, and package scripts.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services the kits offer.
- [x] Identified current and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added architecture, render, grass-system, and gameplay audits.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Did not run local/browser validation.
- [ ] Did not edit runtime/source implementation files.

## Publish organization comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent known / central alignment 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent known / central alignment 2026-07-08T18-58-10-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent known / central alignment 2026-07-08T20-01-23-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent known / central alignment 2026-07-08T18-41-41-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent known / central alignment 2026-07-08T19-30-31-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent known / central alignment 2026-07-08T19-21-15-04-00
LuminaryLabs-Publish/IntoTheMeadow       selected / oldest central alignment 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent known / central alignment 2026-07-08T19-50-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent known / central alignment 2026-07-08T18-51-55-04-00
```

## Selection reason

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing known root `.agent` state.

`IntoTheMeadow` was selected as the oldest eligible tracked fallback by central ledger timestamp.

## Current interaction loop

```txt
index.html
  -> boot-game.js
  -> startWebHost
  -> load meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
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

## Domains identified

```txt
implemented:
  static-route-domain
  browser-boot-domain
  web-host-domain
  external-kit-loading-domain
  manifest-domain
  external-cdn-kit-domain
  dsk-install-domain
  meadow-area-domain
  fallback-meadow-area-domain
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
  grass-debug-domain
  post-process-domain
  performance-policy-domain
  outline-policy-domain
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
  path-progress-reducer-domain
  inspect-target-reducer-domain
  objective-completion-reducer-domain
  gameplay-snapshot-domain
  fixture-smoke-domain
```

## Services identified

```txt
current services:
  load external meadow kits from CDN
  create DSK install snapshot
  create arrival meadow render plan
  enhance render plans with grass/wind/postprocess/performance/outline descriptors
  render enhanced plan through the external renderer
  expose state, snapshot, diagnostics, enhanced plan, and renderer snapshot through GameHost
  run existing static/dsk/render-plan/deterministic-scene smoke scripts through npm run check

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

## Kits identified

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

## Source readback

```txt
src/content/game-manifest.js:
  defines build, route, public URL, default scene, meadow-area-kit CDN, and meadow-webgl-render-kit CDN.

src/hosts/web-host.js:
  loads external kits, creates game and renderer, calls game.tick, enhances render plan, calls renderer.render(plan), and exposes enhanced plan/render snapshot through GameHost.

src/game/enhance-render-plan.js:
  emits grassSystem, grassPatches, windField, postProcess, performance, outline/renderStyle descriptors, and grass stats.

src/game/create-into-the-meadow-game.js:
  owns fallback meadow area, DSK install, content descriptors, diagnostics, state, render plan, snapshot, tick, and reset.

src/game/game-state.js:
  initializes player/world/progression state but advanceGameState only increments frame and lastTick.

src/game/game-snapshot.js:
  projects manifest/state/renderPlan/diagnostics but not renderParity or gameplay.

arrival objectives/targets:
  define walk-the-path, inspect-tree, arrival-path, and focal-tree but do not yet reduce into ActionResults.
```

## Files changed in `LuminaryLabs-Publish/IntoTheMeadow`

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T20-21-59-04-00-renderparity-actionresult-source-contract.md
.agent/render-audit/2026-07-08T20-21-59-04-00-descriptor-consumption-contract.md
.agent/grass-system-audit/2026-07-08T20-21-59-04-00-grass-readback-row-contract.md
.agent/gameplay-audit/2026-07-08T20-21-59-04-00-objective-actionresult-source-contract.md
.agent/trackers/2026-07-08T20-21-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T20-21-59-04-00.md
```

## Files changed in `LuminaryLabs-Dev/LuminaryLabs`

```txt
repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md
internal-change-log/2026-07-08T20-21-59-04-00-into-the-meadow-renderparity-actionresult-source-contract.md
```

## Main finding

`IntoTheMeadow` already has the correct descriptor and DSK scaffold for a meadow proof. The blocking gap is not more content; it is source-owned proof that enhanced render descriptors are consumed or classified, grass readback rows are stable, and the first two gameplay objectives reduce to deterministic ActionResults.

## Next safe ledge

```txt
IntoTheMeadow RenderParity + Gameplay ActionResult Source Contract Fixture Gate
```

## Validation

Performed:

```txt
GitHub repo-list read
central ledger readback
repo-local .agent readback
repo-local source readback
repo-local .agent write
central ledger write
central internal change-log write
```

Not performed:

```txt
local checkout
npm install
npm run check
npm test
browser smoke
GitHub Pages smoke
runtime source edit
DOM-free fixture run
renderer execution
```