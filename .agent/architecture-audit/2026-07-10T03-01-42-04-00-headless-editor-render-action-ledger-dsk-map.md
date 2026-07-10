# Architecture Audit: Headless Editor Render Action Ledger DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T03-01-42-04-00`

## Scope

This audit maps the current DSK/domain architecture and the next proof-ledger boundary for `IntoTheMeadow`.

## Current architecture loop

```txt
browser shell
  -> boot DOM adapter
  -> web host orchestration
  -> external meadow-area-kit import
  -> local game factory
  -> DSK installation validation
  -> source render plan creation
  -> render-plan enhancement DSKs
  -> local WebGL renderer v2 consumer
  -> GameHost projection
  -> headless editor bridge
  -> requestAnimationFrame loop
```

## Domain map

```txt
source domains:
  - game manifest
  - arrival meadow source config
  - story beats
  - arrival objectives
  - arrival interaction targets
  - local fallback meadow source plan

DSK domains:
  - external meadow-area-kit
  - fallback meadow-area-kit
  - DSK install registry
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

runtime domains:
  - web host frame loop
  - game state frame tick
  - render-plan enhancement cache
  - renderer v2 topology cache
  - GameHost diagnostics
  - headless editor bridge

proof-next domains:
  - render expectation rows
  - renderer snapshot normalization
  - render consumption ledger
  - grass consumption journal
  - ActionFrame
  - target/action preflight
  - ActionResult
  - objective progress
  - headless editor observation ledger
  - GameHost proof projection
```

## Service ownership

```txt
web-host.js:
  owns orchestration, external kit load, game creation, renderer creation, render enhancer creation, frame loop, debug HUD, GameHost exposure, editor bridge install.

create-into-the-meadow-game.js:
  owns DSK install, meadow kit construction, base render plan caching, diagnostics, content exposure, tick/reset, snapshot creation.

game-state.js:
  owns current state creation and frame advancement. It does not yet own action results or objective mutation.

enhance-render-plan.js:
  owns descriptor enhancement, grass system creation, wind, postprocess, performance profile, object filtering, topology cache.

meadow-webgl-renderer-v2.js:
  owns mesh building/caching, WebGL draw, outline/main passes, and aggregate renderer snapshot.

expose-game-host.js:
  owns public diagnostic surface but not proof projections.

install-editor-bridge.js:
  owns editor command reachability but not source-backed proof row emission.
```

## Architecture finding

The architecture is already DSK-shaped, but it is still proof-poor. The renderer, grass, objective, interaction, GameHost, and headless editor paths expose useful aggregate facts without normalized row-level evidence.

## Required next DSK/proof modules

```txt
src/render-proof/render-expectations.js
src/render-proof/renderer-snapshot-normalizer.js
src/render-proof/render-consumption-ledger.js
src/render-proof/grass-consumption-ledger.js
src/render-proof/gamehost-render-proof.js
src/gameplay/action-frame.js
src/gameplay/target-action-preflight.js
src/gameplay/action-result.js
src/gameplay/objective-progress.js
src/gameplay/gameplay-fixture-rows.js
src/editor-proof/headless-editor-proof-ledger.js
tests/render-consumption-ledger-smoke.mjs
tests/grass-consumption-ledger-smoke.mjs
tests/action-result-fixture-smoke.mjs
tests/headless-editor-proof-ledger-smoke.mjs
```

## Deferral boundary

Do not start with visual retuning, renderer replacement, external kit changes, content expansion, grass art tuning, or camera/control rewiring. The next implementation should only add source-backed proof ledgers and additive host projections.
