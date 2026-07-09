# Architecture Audit: Render Action Readback DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-09T18-20-18-04-00`

## Current route architecture

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/content/game-manifest.js
  -> external meadow-area-kit
  -> external meadow-webgl-render-kit
  -> src/game/create-into-the-meadow-game.js
  -> src/boot/install-dsks.js
  -> src/game/game-state.js
  -> src/game/game-snapshot.js
  -> src/game/enhance-render-plan.js
  -> src/boot/expose-game-host.js
```

## DSK/domain breakdown

```txt
static shell:
  index.html canvas, HUD, status, loading panel, route metadata

boot adapter:
  DOM node capture, debug query flag, host startup, boot failure text

web host:
  external kit import, game creation, renderer creation, animation loop, debug HUD, GameHost wrapper

manifest/source config:
  build metadata, route, public URL, default scene, external kit URLs, arrival meadow config

game state:
  initial state, player pose, pathProgress, active objective, story beat ids, DSK install snapshot, frame/lastTick update

render plan:
  external meadow area render plan plus local enhancement descriptors

render enhancement:
  object filtering, outline policy, tree object enhancement, grass system, wind, postprocess, performance, stats

grass domain:
  density texture, clump archetypes, static batches, patches, draw groups, shader wind, LOD, density scaling, debug summary

content/gameplay:
  story beats, path-progress objective, inspect objective, arrival-path target, focal-tree target

GameHost diagnostics:
  getState, getSnapshot, getDiagnostics, game object, enhancedRenderPlan and optional renderer snapshot through web-host getSnapshot

next proof layer:
  render expectations, renderer snapshot normalization, consumption ledger rows, action frames, preflight, action results, objective progress, fixture rows
```

## Boundary read

The architecture already has useful domain separation at the descriptor layer. The weak boundary is the readback layer: enhanced descriptors are produced, but the repository does not own a durable, DOM-free proof that renderer and gameplay consumers accepted them.

## Next DSK cut

```txt
render-expectation-row-kit
renderer-snapshot-normalizer-kit
render-consumption-ledger-kit
grass-consumption-row-kit
action-frame-kit
target-action-preflight-kit
action-result-kit
objective-progress-kit
gameplay-fixture-row-kit
```

## Do not start here

```txt
visual rewrite
renderer replacement
external CDN migration
new meadow content
shared-kit promotion
browser controls/camera work
```
