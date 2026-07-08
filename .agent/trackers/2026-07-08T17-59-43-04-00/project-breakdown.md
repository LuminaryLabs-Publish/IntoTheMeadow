# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-08T17-59-43-04-00`

## Goal

Refresh the repo-local `.agent` operating memory for `LuminaryLabs-Publish/IntoTheMeadow`, compare the current Publish org list against the central ledger, and narrow the next implementation ledge from a broad render/gameplay splice into an exact source-manifest plus fixture-row contract.

## Selection result

The accessible `LuminaryLabs-Publish` installation returned this full repo list:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheUnmappedHouse
```

Central ledger comparison in `LuminaryLabs-Dev/LuminaryLabs` showed all non-excluded Publish repos represented under `repo-ledger/LuminaryLabs-Publish/`.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

`IntoTheMeadow` was selected as the fallback repo for this run because it is tracked and repo-local `.agent` is present, but its last central reviewed state was older than the latest Publish follow-up wave and its unresolved render-consumption plus first-objective action authority seam is still precise enough to document without touching runtime source.

## Current route and interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> loadExternalKits()
  -> import meadow-area-kit from GAME_MANIFEST external CDN URL
  -> import meadow-webgl-render-kit from GAME_MANIFEST external CDN URL
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks(...)
  -> create meadow area from ARRIVAL_MEADOW_CONFIG
  -> renderer = createMeadowWebglRenderKit({ canvas })
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> GameHost exposes state, diagnostics, enhancedRenderPlan, and renderer snapshot
```

The route is functional as a render loop, but gameplay authority is still inert:

```txt
createInitialGameState(...)
  -> player/progression/world state exists
  -> advanceGameState(...)
  -> frame increments
  -> lastTick writes
  -> no ActionFrame input is consumed
  -> no ActionResult is emitted
  -> no objective completion is reduced
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
render-plan-domain
render-plan-enhancement-domain
render-descriptor-domain
renderer-host-domain
renderer-snapshot-domain
render-consumption-domain
render-parity-domain
grass-density-domain
grass-archetype-domain
grass-static-batch-domain
grass-patch-placement-domain
grass-instancing-domain
grass-shader-wind-domain
grass-lod-domain
grass-debug-domain
post-process-domain
wind-field-domain
performance-policy-domain
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

## Current services

```txt
- load external meadow kits from manifest CDN URLs
- install local and external DSK references into a validation snapshot
- create an arrival meadow render plan
- provide fallback meadow area rendering if the external area kit is absent
- enhance render plans with outline, wind, post-process, performance, and grass descriptors
- generate texture-driven grass density, archetypes, static batches, patches, draw groups, shader wind, LOD, and debug summaries
- render the enhanced plan through the external WebGL renderer
- expose GameHost state, snapshot, diagnostics, enhanced render plan, and renderer snapshot
- run static and deterministic smoke tests through `npm run check`
```

## Missing services

```txt
- source manifest for expected enhanced-plan descriptors
- renderer snapshot consumption normalizer
- render-consumption row classifier
- descriptor parity report projector
- grass render-consumption fixture rows
- optional ActionFrame normalizer
- path-progress ActionResult reducer
- inspect-target ActionResult reducer
- objective completion resolver
- action journal projector
- snapshot.gameplay projector
- GameHost.renderParity additive projection
- DOM-free render parity fixture
- DOM-free gameplay authority fixture
```

## Current kits

```txt
external kits:
  meadow-area-kit
  meadow-webgl-render-kit

repo-local descriptor / host kits:
  game-manifest descriptor
  local-dsk-registry
  arrival-meadow content descriptor
  story-beats descriptor
  arrival-objectives descriptor
  arrival-interaction-targets descriptor
  fallback-meadow-area-kit
  web-host composition kit
  GameHost exposure kit

repo-local render enhancement kits:
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
```

## Next-cut kits

```txt
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

## Main finding

`IntoTheMeadow` does not need new art, new areas, or first-person controls next. The source already emits rich renderer-facing descriptors and contains objective/target data for a first playable proof.

The missing layer is proofability:

```txt
enhanced render plan descriptors
  -> normalized renderer consumption rows
  -> render parity report
  -> GameHost.renderParity

optional action input
  -> ActionFrame
  -> ActionResult
  -> objective completion
  -> snapshot.gameplay
```

## Next safe ledge

```txt
IntoTheMeadow Render Consumption Source Manifest + Objective Action Fixture Matrix
```

Do not start content expansion until the next implementation pass proves descriptor consumption and the first two objective rows through DOM-free fixtures.

## Validation status

This was a documentation and operating-memory pass only.

```txt
runtime source changed: no
local checkout: no
npm install: no
npm run check: no
browser smoke: no
GitHub Pages smoke: no
branch created: no
pull request created: no
push target: main
```
