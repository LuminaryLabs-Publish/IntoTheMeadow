# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-08T15-28-13-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Latest selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected by the oldest eligible fallback rule because its sampled root alignment was the oldest current non-Cavalry alignment among checked repos, and its renderer parity plus first-objective gameplay ActionResult seam is still unresolved.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T13:59:50-04:00
LuminaryLabs-Publish/IntoTheMeadow       selected fallback / previous sampled alignment 2026-07-08T13-50-37-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T14-08-24-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T14:51:11-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T14-31-06-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T14-18-45-04-00
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
  -> external meadow-webgl-render-kit
```

## Current interaction loop

```txt
requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> expose enhanced plan plus renderer snapshot through GameHost
```

## Target proof loop

```txt
raw meadow render plan
  -> enhanced render plan
  -> expected descriptor collection
  -> renderer snapshot consumption normalization
  -> descriptor parity report
  -> GameHost.renderParity
  -> DOM-free render parity fixture
  -> optional ActionFrame input
  -> ActionResult reducers for path progress and inspect target
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
.agent/architecture-audit/2026-07-08T15-28-13-04-00-render-gameplay-splice-map.md
.agent/render-audit/2026-07-08T15-28-13-04-00-gamehost-render-parity-readback-map.md
.agent/grass-system-audit/2026-07-08T15-28-13-04-00-grass-consumption-row-contract.md
.agent/gameplay-audit/2026-07-08T15-28-13-04-00-action-result-fixture-splice-map.md
.agent/trackers/2026-07-08T15-28-13-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T15-28-13-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
package.json
index.html
src/boot/boot-game.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/game/enhance-render-plan.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
```

## Main rule

Keep `IntoTheMeadow` as the publishable game proof surface.

Do not move reusable render/gameplay kits out to shared repos until the local render-parity and gameplay ActionResult fixture gates are stable, documented, and passing.

## Current next safe ledge

```txt
IntoTheMeadow GameHost Render Parity + Gameplay ActionResult Splice Fixture Gate
```

Preserve the current route, manifest CDN kit loading, `game.tick({ time, dt })`, `renderer.render(plan)`, and existing `GameHost` fields while adding additive render parity, grass-consumption rows, optional action input, objective ActionResults, snapshot gameplay projection, and DOM-free fixtures.