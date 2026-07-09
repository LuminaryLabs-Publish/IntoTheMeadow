# Architecture Audit — Render Consumption + Action Replay DSK Map

**Timestamp:** `2026-07-09T09-41-24-04-00`

## Source readback

`IntoTheMeadow` boots as a static browser route:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
```

`startWebHost()` loads `GAME_MANIFEST.externalKits`, creates the game, creates the external renderer, exposes `GameHost`, ticks once per animation frame, enhances the raw render plan, renders it, and optionally updates debug HUD text.

## Interaction loop

```txt
static shell
  -> boot DOM adapter
  -> web host
  -> external kit loader
  -> game factory
  -> local DSK install
  -> meadow area render plan producer
  -> frame tick
  -> render-plan enhancement
  -> renderer consumer
  -> debug/GameHost projection
```

## Domains in use

| Domain | Current owner | Notes |
|---|---|---|
| Static page shell | `index.html` | Owns canvas/HUD/loading DOM and script route. |
| Boot DOM adapter | `src/boot/boot-game.js` | Captures DOM nodes and debug flag. |
| Web host orchestration | `src/hosts/web-host.js` | Loads external kits, wires game, renderer, frame loop, HUD, GameHost. |
| External kit authority | `GAME_MANIFEST.externalKits` | Owns meadow area and WebGL renderer source URLs. |
| DSK install validation | `src/boot/install-dsks.js` | Validates local/external kit registry. |
| Game composition | `src/game/create-into-the-meadow-game.js` | Installs DSKs, creates meadow area, exposes state/render/diagnostics. |
| Game state | `src/game/game-state.js` | Currently frame/lastTick only after initial state. |
| Snapshot projection | `src/game/game-snapshot.js` | Should receive additive proof projections later. |
| Render enhancement | `src/game/enhance-render-plan.js` | Adds grass, wind, postprocess, performance, object style, and stats. |
| Renderer consumer | External `meadow-webgl-render-kit` | Consumes plan; local readback parity still missing. |
| Grass system | Local grass DSK family | Descriptor-rich but not consumer-proven. |
| Objectives | `ARRIVAL_OBJECTIVES` | Defines path-progress and inspect goals. |
| Interaction targets | `ARRIVAL_INTERACTION_TARGETS` | Defines focal-tree and arrival-path target sources. |
| GameHost | `src/boot/expose-game-host.js` | Exposes state, snapshot, diagnostics, game. |
| Render consumption next | planned `src/render-consumption/*` | Should classify expected vs readback descriptors. |
| Gameplay action next | planned `src/gameplay/*` | Should reduce ActionFrames to ActionResults. |
| Fixture replay next | planned `scripts/into-the-meadow-render-action-fixture.mjs` | Should run without DOM/canvas/browser state. |

## Services offered by kits

```txt
meadow-area-kit: emits meadow area render plans
meadow-webgl-render-kit: renders meadow render plans and may expose snapshots
web-host-dsk: coordinates browser route, frame loop, renderer, HUD, GameHost
into-the-meadow-game-dsk: exposes state, render plan, diagnostics, tick, reset, snapshot
tree-object-dsk: enhances focal tree descriptors
gras-density-texture-kit: derives path-aware density texture
grass-clump-archetype-kit: defines reusable clump/card archetypes
grass-static-batch-kit: creates reusable static grass batches
grass-patch-placement-kit: places patches from density texture/static batches
grass-clump-instancing-render-kit: creates draw-group descriptors
grass-shader-wind-kit: projects wind for grass animation
grass-lod-policy-kit: defines grass LOD policy
grass-density-scaling-kit: scales grass density by quality
post-process-stack-dsk: projects postprocess descriptor stack
meadow-performance-dsk: defines render budgets/outline policy
static-pages-deploy-dsk: keeps static checks/build path simple
```

## Current kits

```txt
meadow-area-kit
meadow-webgl-render-kit
game-manifest descriptor
local-dsk-registry
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
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
meadow-render-host-dsk
meadow-diagnostics-dsk
static-pages-deploy-dsk
```

## Next-cut kits

```txt
render-expectation-collector-kit
renderer-snapshot-normalizer-kit
render-consumption-row-kit
render-consumption-ledger-kit
grass-consumption-row-kit
grass-readback-ledger-kit
action-frame-kit
action-result-kit
target-action-reason-catalog-kit
path-progress-action-reducer-kit
inspect-action-reducer-kit
objective-completion-resolver-kit
gameplay-snapshot-projection-kit
gamehost-proof-projection-kit
render-action-fixture-replay-kit
check-script-fixture-wire-kit
```

## Decision

Do not start with visual expansion or renderer replacement. The architecture is ready for a proof layer that freezes the consumer contract around render descriptors and action results.
