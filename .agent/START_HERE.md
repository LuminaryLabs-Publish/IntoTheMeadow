# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-10T01-38-16-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for breakdown and implementation planning on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Current selection result

The current public `LuminaryLabs-Publish` repository list was compared against central tracking in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was new, missing from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest eligible central-ledger fallback after `PrehistoricRush` advanced to `2026-07-10T01-31-29-04-00`.

## Current product read

`IntoTheMeadow` is a static DSK-composed meadow route.

The route uses a local `meadow-webgl-renderer-v2` compatible adapter, exposes aggregate renderer readback through `GameHost`, and now has a headless editor command/smoke path.

The useful next step is proof rows, not a visual rewrite.

## Current interaction loop

```txt
index.html
  -> canvas#scene, HUD, loading panel, and status DOM
  -> src/boot/boot-game.js
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports meadow-area-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks() validates local and external DSK descriptors
  -> create arrival meadow area render plan
  -> create local meadow WebGL renderer v2 compatible adapter
  -> create render plan enhancer
  -> exposeGameHost with state, snapshot, diagnostics, render plan, renderer snapshot, enhancer snapshot, and game reference
  -> installIntoTheMeadowEditorBridge({ gameHost, canvas })
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and records lastTick only
  -> game.getRenderPlan(time)
  -> planEnhancer.enhance(rawPlan)
  -> createGrassSystem() produces density, batch, patch, draw group, wind, LOD, and debug descriptors
  -> renderer.render(enhancedPlan)
  -> renderer snapshot reports aggregate topology/cache/count/fallback facts
  -> optional debug HUD reports validation, schema, grass, flowers, rocks, vertices, GPU cache, plan cache, and editor protocol state
```

## Target proof loop

```txt
frame, fixture, or editor command input
  -> collect render expectation rows
  -> normalize renderer snapshot
  -> emit render consumption ledger rows
  -> emit grass consumption rows
  -> run ActionFrame through target/action preflight
  -> emit ActionResult and objective progress rows
  -> project additive GameHost proof state
  -> run DOM-free fixture rows through npm run check
  -> run headless editor observation rows through npm run check
```

## Next safe ledge

```txt
IntoTheMeadow Headless Render Action Proof Catch-up + GameHost Ledger Gate
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T01-38-16-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T01-38-16-04-00.md
.agent/architecture-audit/2026-07-10T01-38-16-04-00-headless-render-action-proof-dsk-map.md
.agent/render-audit/2026-07-10T01-38-16-04-00-renderer-snapshot-headless-proof.md
.agent/grass-system-audit/2026-07-10T01-38-16-04-00-grass-consumption-headless-ledger.md
.agent/gameplay-audit/2026-07-10T01-38-16-04-00-objective-action-headless-loop.md
.agent/interaction-audit/2026-07-10T01-38-16-04-00-target-action-editor-fixture.md
.agent/deploy-audit/2026-07-10T01-38-16-04-00-check-headless-fixture-gate.md
```

## Source files to inspect before implementation

```txt
src/hosts/web-host.js
src/game/enhance-render-plan.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/boot/expose-game-host.js
src/renderers/meadow-webgl-renderer-v2.js
src/content/game-manifest.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
src/editor/install-editor-bridge.js
scripts/nexus-editor.mjs
```
