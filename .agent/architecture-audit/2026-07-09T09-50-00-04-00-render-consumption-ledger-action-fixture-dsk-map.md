# Architecture Audit — Render Consumption Ledger + Action Fixture DSK Map

**Timestamp:** `2026-07-09T09-50-00-04-00`

## Current architecture

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/content/game-manifest.js
  -> src/boot/install-dsks.js
  -> src/game/create-into-the-meadow-game.js
  -> external meadow-area-kit
  -> src/game/enhance-render-plan.js
  -> external meadow-webgl-render-kit
  -> src/boot/expose-game-host.js
```

The repo is already split into boot, host, game, content, DSK descriptors, render enhancement, and tests. The browser route is thin enough to preserve.

## DSK/domain breakdown

```txt
IntoTheMeadow publish route
├─ static-shell-domain
│  ├─ index-html-shell-kit
│  └─ canvas-hud-loading-dom-kit
├─ boot-domain
│  ├─ boot-game-dom-adapter-kit
│  └─ GameHost-exposure-kit
├─ host-domain
│  ├─ web-host-frame-loop-kit
│  ├─ external-kit-loader-kit
│  ├─ debug-hud-kit
│  └─ renderer-consumer-host-kit
├─ manifest-domain
│  ├─ game-manifest-descriptor-kit
│  └─ external-cdn-kit-source-kit
├─ dsk-install-domain
│  ├─ local-dsk-registry-kit
│  ├─ external-dsk-load-status-kit
│  └─ dsk-validation-kit
├─ meadow-source-domain
│  ├─ external-meadow-area-kit
│  ├─ fallback-meadow-area-kit
│  └─ arrival-meadow-config-kit
├─ game-state-domain
│  ├─ initial-state-kit
│  ├─ tick-state-kit
│  ├─ snapshot-kit
│  └─ diagnostics-kit
├─ render-enhancement-domain
│  ├─ tree-object-dsk
│  ├─ wind-field-dsk
│  ├─ meadow-performance-dsk
│  ├─ post-process-stack-dsk
│  └─ outline-policy-kit
├─ grass-system-domain
│  ├─ grass-density-texture-kit
│  ├─ grass-clump-archetype-kit
│  ├─ grass-static-batch-kit
│  ├─ grass-patch-placement-kit
│  ├─ grass-clump-instancing-render-kit
│  ├─ grass-shader-wind-kit
│  ├─ grass-lod-policy-kit
│  ├─ grass-density-scaling-kit
│  └─ grass-debug-visualization-kit
├─ story-objective-domain
│  ├─ story-beats-descriptor-kit
│  ├─ arrival-objectives-descriptor-kit
│  └─ arrival-interaction-targets-descriptor-kit
├─ planned-render-proof-domain
│  ├─ expected-render-descriptor-kit
│  ├─ renderer-snapshot-normalizer-kit
│  ├─ render-consumption-row-kit
│  └─ render-consumption-ledger-kit
├─ planned-gameplay-proof-domain
│  ├─ action-frame-kit
│  ├─ action-result-kit
│  ├─ target-action-preflight-kit
│  ├─ path-progress-reducer-kit
│  ├─ inspect-target-reducer-kit
│  └─ objective-completion-resolver-kit
└─ planned-fixture-domain
   ├─ DOM-free-fixture-manifest-kit
   ├─ render-consumption-fixture-smoke-kit
   ├─ gameplay-action-replay-fixture-smoke-kit
   └─ check-script-fixture-gate-kit
```

## Current service map

```txt
static shell -> mounts canvas, HUD, loading text
boot-game -> captures DOM and debug flag
web-host -> loads kits, creates game, creates renderer, runs frame loop
GAME_MANIFEST -> owns route/build/public URL/external URLs
installDsks -> validates local descriptors and external kit status
createIntoTheMeadowGame -> owns state, meadow source, render plan, diagnostics, snapshot
fallback meadow kit -> minimal render-plan source when external kit is absent
enhanceRenderPlan -> adds local render descriptors and grass descriptors
createGrassSystem -> produces density, archetype, batch, placement, draw, wind, LOD, scale, debug records
game-state -> creates root state and advances frame/lastTick
snapshot -> projects manifest/state/renderPlan/diagnostics
exposeGameHost -> exposes state/snapshot/diagnostics/game references
renderer.render -> consumes enhanced plan
renderer.getSnapshot -> optional readback, not yet normalized
```

## Architecture blocker

The current architecture can generate expected descriptors, but it cannot prove consumption.

```txt
expected descriptor exists -> renderer.render(plan) is called -> renderer snapshot is optional -> no comparison ledger exists
```

The gameplay path has a similar problem.

```txt
objective descriptor exists -> target descriptor exists -> frame tick occurs -> no action frame is reduced -> no action result or objective row is emitted
```

## Safe cut line

Keep the existing route and renderer handoff. Add pure proof modules beside the source path.

```txt
src/render-consumption/*
src/gameplay/*
scripts/into-the-meadow-render-action-fixture.mjs
```

Only after the fixtures pass should `src/hosts/web-host.js`, `src/game/game-state.js`, and `src/game/game-snapshot.js` receive additive projection fields.
