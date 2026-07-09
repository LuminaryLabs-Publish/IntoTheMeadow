# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-09T18-20-18-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Current selection result

The current public `LuminaryLabs-Publish` repository list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was new, missing from the central ledger, missing a root `.agent` folder, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest eligible documented fallback among checked public non-Cavalry repos. Its central ledger was at `2026-07-09T15-39-08-04-00`, older than the other checked eligible public entries.

## Public Publish repos checked

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T17-48-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T16-58-52-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T16-38-14-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T16-29-23-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T18-11-58-04-00
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible documented fallback / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T17-58-53-04-00
```

## Current product read

`IntoTheMeadow` is a static DSK-composed meadow exploration route. It boots from `index.html` into `src/boot/boot-game.js`, then `src/hosts/web-host.js` imports external meadow kits, creates the local game composition, enhances the render plan, renders through the external WebGL renderer kit, and exposes diagnostics through `GameHost`.

## Current interaction loop

```txt
index.html
  -> canvas#scene, HUD, loading panel, and status DOM
  -> src/boot/boot-game.js
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks() validates local and external DSK descriptors
  -> create arrival meadow area kit from ARRIVAL_MEADOW_CONFIG
  -> create meadow WebGL renderer
  -> exposeGameHost({ game, renderer, getRenderPlan, getSnapshot })
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and records lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> createGrassSystem() produces texture-driven grass descriptors and stats
  -> renderer.render(enhancedPlan)
  -> optional debug HUD reports validation/object/grass/render counts
  -> GameHost exposes state, snapshot, diagnostics, enhanced render plan, and optional renderer snapshot
```

## Target proof loop

```txt
frame or fixture input
  -> expected render descriptor collection
  -> renderer snapshot normalization
  -> render consumption ledger rows
  -> grass consumption rows
  -> ActionFrame and target/action preflight rows
  -> ActionResult and objective progress rows
  -> snapshot.renderParity and snapshot.gameplay projections
  -> GameHost additive readback
  -> DOM-free fixture rows
```

## Next safe ledge

```txt
IntoTheMeadow Render Action Readback + DOM-Free Fixture Gate
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-09T18-20-18-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T18-20-18-04-00.md
.agent/architecture-audit/2026-07-09T18-20-18-04-00-render-action-readback-dsk-map.md
.agent/render-audit/2026-07-09T18-20-18-04-00-render-plan-consumption-readback.md
.agent/grass-system-audit/2026-07-09T18-20-18-04-00-grass-descriptor-consumption-proof.md
.agent/gameplay-audit/2026-07-09T18-20-18-04-00-action-objective-result-loop.md
.agent/interaction-audit/2026-07-09T18-20-18-04-00-target-action-preflight-contract.md
.agent/deploy-audit/2026-07-09T18-20-18-04-00-dom-free-fixture-gate.md
```

## Source files to inspect before implementation

```txt
src/hosts/web-host.js
src/game/enhance-render-plan.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/boot/expose-game-host.js
src/content/game-manifest.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
package.json
```
