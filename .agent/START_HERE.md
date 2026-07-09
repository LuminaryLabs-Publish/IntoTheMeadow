# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-08T20-21-59-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Latest selection result

The current accessible `LuminaryLabs-Publish` installation list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

All non-Cavalry Publish repos were already represented in the central ledger. No checked repo was fully new, absent from tracking, undocumented, recently added but undocumented, or missing known root `.agent` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest central-ledger eligible fallback by last documented alignment. Its previous central alignment was `2026-07-08T18-09-21-04-00`, older than the other checked non-excluded repos.

This pass keeps the same high-value next ledge but tightens it into an implementation-ready contract for descriptor parity, grass readback, action result authority, and fixture smoke ownership.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent known / central alignment 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent known / central alignment 2026-07-08T18-58-10-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent known / central alignment 2026-07-08T20-01-23-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent known / central alignment 2026-07-08T18-41-41-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent known / central alignment 2026-07-08T19-30-31-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent known / central alignment 2026-07-08T19-21-15-04-00
LuminaryLabs-Publish/IntoTheMeadow       selected / oldest central alignment 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent known / central alignment 2026-07-08T19-50-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent known / central alignment 2026-07-08T18-51-55-04-00
```

## Current product read

`IntoTheMeadow` is a DSK-composed static browser meadow exploration game.

It boots from:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
```

The runtime imports external meadow kits from `GAME_MANIFEST.externalKits`, builds a game through `createIntoTheMeadowGame`, enhances external meadow-area render plans through local DSK descriptors, and renders the enhanced plan through the external `meadow-webgl-render-kit`.

## Current interaction loop

```txt
index.html
  -> boot-game.js
  -> startWebHost
  -> load external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame
  -> install local DSK descriptors
  -> create arrival meadow area kit
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> expose GameHost state/snapshot/diagnostics/enhancedRenderPlan/render snapshot
```

## Target proof loop

```txt
frame start
  -> game.tick({ time, dt, actions? })
  -> ActionFrame[]
  -> ActionResult[]
  -> objective completion resolver
  -> snapshot.gameplay
  -> raw render plan
  -> enhanced render plan
  -> expected render descriptors
  -> renderer.render(plan)
  -> renderer snapshot normalization
  -> RenderParityReport
  -> GameHost.renderParity
  -> DOM-free fixture rows
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-08T20-21-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T20-21-59-04-00.md
.agent/architecture-audit/2026-07-08T20-21-59-04-00-renderparity-actionresult-source-contract.md
.agent/render-audit/2026-07-08T20-21-59-04-00-descriptor-consumption-contract.md
.agent/grass-system-audit/2026-07-08T20-21-59-04-00-grass-readback-row-contract.md
.agent/gameplay-audit/2026-07-08T20-21-59-04-00-objective-actionresult-source-contract.md
```

## Source files to inspect before implementation

```txt
src/hosts/web-host.js
src/game/enhance-render-plan.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/content/game-manifest.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
package.json
```

## Source files to add next

```txt
src/render-parity/render-parity-reasons.js
src/render-parity/collect-expected-render-descriptors.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/compare-render-descriptor-parity.js
src/render-parity/create-gamehost-render-parity.js
src/render-parity/create-grass-consumption-rows.js
src/gameplay-authority/action-reasons.js
src/gameplay-authority/action-frame.js
src/gameplay-authority/action-result.js
src/gameplay-authority/action-journal.js
src/gameplay-authority/reduce-path-progress.js
src/gameplay-authority/reduce-inspect-target.js
src/gameplay-authority/resolve-objective-completion.js
src/gameplay-authority/create-gameplay-snapshot.js
tests/render-parity-fixture-smoke.mjs
tests/gameplay-authority-fixture-smoke.mjs
```

## Current next safe ledge

```txt
IntoTheMeadow RenderParity + Gameplay ActionResult Source Contract Fixture Gate
```

## Main rule

Do not add new meadow areas, grass density, inventory, first-person controls, audio, or renderer extraction until renderer descriptor parity and first-objective gameplay action fixtures prove the current source surface.