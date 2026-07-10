# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-10T00-09-51-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for breakdown and implementation planning on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Current selection result

The current public `LuminaryLabs-Publish` repository list was compared against central tracking in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was new, missing from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest eligible central-ledger fallback. Its central ledger was at `2026-07-09T22-40-25-04-00`.

## Public Publish repos checked

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T23-41-15-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T23-28-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T23-20-43-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T23-02-05-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T22-50-53-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T23-58-41-04-00
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible central-ledger fallback / central latest 2026-07-09T22-40-25-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T23-51-04-04-00
```

## Current product read

`IntoTheMeadow` is a static DSK-composed meadow route.

The route uses a local `meadow-webgl-renderer-v2` and exposes aggregate renderer readback through `GameHost`.

The useful next step is not a visual rewrite. The useful next step is proof rows.

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
  -> create local meadow WebGL renderer v2
  -> create render plan enhancer
  -> exposeGameHost with state, snapshot, diagnostics, render plan, renderer snapshot, and enhancer snapshot
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and records lastTick only
  -> game.getRenderPlan(time)
  -> planEnhancer.enhance(rawPlan)
  -> createGrassSystem() produces density, batch, patch, draw group, wind, LOD, and debug descriptors
  -> renderer.render(enhancedPlan)
  -> renderer snapshot reports aggregate topology/cache/count/fallback facts
  -> optional debug HUD reports validation, schema, grass, flowers, rocks, vertices, GPU cache, and plan cache state
```

## Target proof loop

```txt
frame or fixture input
  -> collect render expectation rows
  -> normalize renderer snapshot
  -> emit render consumption ledger rows
  -> emit grass consumption rows
  -> run ActionFrame through target/action preflight
  -> emit ActionResult and objective progress rows
  -> project additive GameHost proof state
  -> run DOM-free fixture rows through npm run check
```

## Next safe ledge

```txt
IntoTheMeadow Renderer Snapshot Action Fixture Catch-up + DOM-Free Proof Gate
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T00-09-51-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T00-09-51-04-00.md
.agent/architecture-audit/2026-07-10T00-09-51-04-00-renderer-snapshot-action-fixture-dsk-map.md
.agent/render-audit/2026-07-10T00-09-51-04-00-renderer-snapshot-consumption-proof.md
.agent/grass-system-audit/2026-07-10T00-09-51-04-00-grass-render-parity-ledger.md
.agent/gameplay-audit/2026-07-10T00-09-51-04-00-objective-action-result-loop.md
.agent/interaction-audit/2026-07-10T00-09-51-04-00-target-action-preflight-fixture.md
.agent/deploy-audit/2026-07-10T00-09-51-04-00-check-fixture-gate.md
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
package.json
```
