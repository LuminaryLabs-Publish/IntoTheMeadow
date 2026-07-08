# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-08T18-09-21-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Latest selection result

The accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` remains on the follow-up queue because render consumption parity, grass consumption rows, and first-objective ActionResult proof are still unresolved. A repo-local readback during this pass showed a prior alignment at `2026-07-08T17-59-43-04-00`; this pass narrows the same seam into a host consumer boundary and fixture-gate contract.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / sampled alignment 2026-07-08T15:49:18-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / sampled alignment 2026-07-08T17-49-51-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / sampled alignment 2026-07-08T17-31-22-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / sampled alignment 2026-07-08T15-58-59-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / sampled alignment 2026-07-08T16-51-11-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / sampled alignment 2026-07-08T16-20-00-04-00
LuminaryLabs-Publish/IntoTheMeadow       selected follow-up / repo-local readback alignment 2026-07-08T17-59-43-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / sampled alignment 2026-07-08T17-09-48-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / sampled alignment 2026-07-08T16-19-57-04-00
```

## Current product read

`IntoTheMeadow` is a static browser meadow game/deploy repo.

It boots from:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
```

It imports external meadow kits from `GAME_MANIFEST.externalKits`, builds a game through `createIntoTheMeadowGame`, enhances render plans through local DSK descriptors, and renders the resulting plan through the external `meadow-webgl-render-kit`.

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
  -> GameHost exposes state, snapshot, diagnostics, enhanced plan, and renderer snapshot
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
.agent/trackers/2026-07-08T18-09-21-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T18-09-21-04-00.md
.agent/architecture-audit/2026-07-08T18-09-21-04-00-renderparity-actionresult-dsk-map.md
.agent/render-audit/2026-07-08T18-09-21-04-00-gamehost-renderparity-consumer-boundary.md
.agent/grass-system-audit/2026-07-08T18-09-21-04-00-grass-consumption-fixture-rows.md
.agent/gameplay-audit/2026-07-08T18-09-21-04-00-objective-actionresult-fixture-gate.md
```

## Source files to inspect before implementation

```txt
src/hosts/web-host.js
src/game/enhance-render-plan.js
src/game/game-state.js
src/game/game-snapshot.js
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
IntoTheMeadow GameHost RenderParity Consumer + Objective ActionResult Fixture Gate
```

## Main rule

Do not add new meadow areas, new grass density, inventory, first-person controls, audio, or renderer extraction until render parity and gameplay action fixtures can prove the current descriptor stack and first objective loop.
