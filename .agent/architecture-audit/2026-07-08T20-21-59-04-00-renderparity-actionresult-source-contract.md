# Architecture Audit — RenderParity + ActionResult Source Contract

**Timestamp:** `2026-07-08T20-21-59-04-00`

## Scope

This audit captures the current DSK/domain breakdown for `LuminaryLabs-Publish/IntoTheMeadow` and narrows the next implementation into two source contracts:

```txt
render descriptor parity
objective ActionResult authority
```

## Interaction loop

```txt
index.html
  -> boot-game.js
  -> startWebHost
  -> load meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame
  -> install local DSK descriptors
  -> create arrival meadow area
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> expose GameHost state/snapshot/diagnostics/enhancedRenderPlan/render snapshot
```

## Implemented domains

```txt
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
```

## Missing / next-cut domains

```txt
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

## Current services

```txt
load external meadow kits from CDN
create DSK install snapshot
create arrival meadow render plan
enhance render plans with grass/wind/postprocess/performance/outline descriptors
render enhanced plan through external renderer
expose state, snapshot, diagnostics, enhanced plan, and renderer snapshot through GameHost
run existing static/dsk/render-plan/deterministic-scene smoke scripts
```

## Needed services

```txt
collect expected enhanced-plan descriptors
normalize renderer snapshot consumption
compare expected descriptors against renderer consumption
classify consumed/unconsumed/unsupported/fallback/missing descriptor rows
emit grass readback rows
expose GameHost.renderParity additively
convert optional action input to ActionFrame records
reduce path-progress and inspect actions into ActionResults
resolve objective completion idempotently
project snapshot.gameplay
run DOM-free render/gameplay fixtures
```

## Current kits

```txt
meadow-area-kit
meadow-webgl-render-kit
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
```

## Next-cut kits

```txt
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

## Source boundaries

```txt
src/hosts/web-host.js
  owns runtime frame loop, renderer call, and GameHost splice point

src/game/enhance-render-plan.js
  owns enhanced descriptor stack and grass system descriptor construction

src/game/create-into-the-meadow-game.js
  owns game factory, content descriptors, DSK install, diagnostics, tick, reset, and snapshot hook

src/game/game-state.js
  owns state initialization and tick-only state advancement

src/game/game-snapshot.js
  owns current manifest/state/renderPlan/diagnostics snapshot projection

src/content/objectives/arrival-objectives.js
  owns first objective descriptors

src/content/interaction-targets/arrival-targets.js
  owns first interaction target descriptors
```

## Architecture finding

The architecture is already clean enough to add proof modules without a rewrite.

The correct next move is additive: create local `src/render-parity/*` and `src/gameplay-authority/*` modules, splice their outputs into the host and snapshot surfaces, and prove them with DOM-free fixture rows before adding visuals or new gameplay.