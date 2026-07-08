# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-08T17-59-43-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Latest selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No non-excluded Publish repo was found to be fully new, absent from the central ledger, or undocumented in the current comparison.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

`IntoTheMeadow` was selected as the fallback repo for this run because it is tracked and repo-local `.agent` is present, but its render-consumption and first-objective gameplay authority seams still need a concrete source manifest and fixture matrix.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / central ledger present
LuminaryLabs-Publish/AetherVale          tracked / central ledger present
LuminaryLabs-Publish/TheOpenAbove        tracked / central ledger present
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / central ledger present
LuminaryLabs-Publish/PrehistoricRush     tracked / central ledger present
LuminaryLabs-Publish/ZombieOrchard       tracked / central ledger present
LuminaryLabs-Publish/IntoTheMeadow       selected fallback
LuminaryLabs-Publish/MyCozyIsland        tracked / central ledger present
LuminaryLabs-Publish/TheUnmappedHouse    tracked / central ledger present
```

## Current product read

`IntoTheMeadow` is a publishable DSK-composed static meadow exploration route.

The repo owns the static page, web host, manifest, local DSK registry, game factory, deterministic state root, arrival-meadow content descriptors, render-plan enhancement layer, `GameHost` projection, validation scripts, and GitHub Pages deploy surface.

It consumes reusable meadow generation and WebGL rendering from `LuminaryLabs-Agents/NexusRealtime-ProtoKits` through manifest CDN URLs.

## Current route

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/game/create-into-the-meadow-game.js
  -> src/game/enhance-render-plan.js
  -> external meadow-area-kit
  -> external meadow-webgl-render-kit
```

## Current interaction loop

```txt
requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> expose enhanced plan plus renderer snapshot through GameHost
```

## Target proof loop

```txt
enhanced render plan
  -> expected descriptor source manifest
  -> normalized renderer snapshot consumption
  -> render consumption rows
  -> render parity report
  -> GameHost.renderParity
  -> DOM-free render parity fixture
  -> optional ActionFrame input
  -> path-progress / inspect ActionResult reducers
  -> objective completion resolver
  -> snapshot.gameplay
  -> DOM-free gameplay authority fixture
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T17-59-43-04-00-render-action-source-manifest-dsk-breakdown.md
.agent/render-audit/2026-07-08T17-59-43-04-00-render-consumption-source-manifest.md
.agent/grass-system-audit/2026-07-08T17-59-43-04-00-grass-render-consumption-fixture-rows.md
.agent/gameplay-audit/2026-07-08T17-59-43-04-00-objective-action-fixture-matrix.md
.agent/interaction-audit/2026-07-08T17-59-43-04-00-action-frame-target-contract.md
.agent/trackers/2026-07-08T17-59-43-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T17-59-43-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
package.json
index.html
src/boot/boot-game.js
src/hosts/web-host.js
src/boot/expose-game-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/game/enhance-render-plan.js
src/content/game-manifest.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
```

## Next safe ledge

```txt
IntoTheMeadow Render Consumption Source Manifest + Objective Action Fixture Matrix
```

## Main rule

Keep `IntoTheMeadow` as the publishable game proof surface. Do not add new content, first-person controls, inventory, audio, or DSK migration before local render parity and gameplay authority fixtures are passing.
