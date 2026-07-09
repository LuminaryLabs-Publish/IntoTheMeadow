# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-09T09-41-24-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repository list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local root `.agent` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest eligible documented fallback. Its central ledger was still at `2026-07-09T06-28-53-04-00`, while other checked non-excluded repos had newer same-day central ledger alignment.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T08-40-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T09-18-29-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T07-19-41-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T09-10-50-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible central latest before this pass 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T08-29-38-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T08-02-33-04-00
```

## Current product read

`IntoTheMeadow` is a static DSK-composed meadow exploration route.

It boots from:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
```

The runtime imports external meadow kits from `GAME_MANIFEST.externalKits`, builds the game through `createIntoTheMeadowGame`, enhances external meadow-area render plans through local DSK descriptors, and renders the enhanced plan through the external `meadow-webgl-render-kit`.

## Current interaction loop

```txt
index.html
  -> canvas#scene, HUD, and loading DOM mount
  -> src/boot/boot-game.js captures DOM nodes and debug query flag
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> load meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> install local DSK descriptors
  -> create arrival meadow area kit
  -> create meadow WebGL renderer
  -> expose GameHost state/snapshot/diagnostics/enhanced render plan/render snapshot
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState increments frame and writes lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> optional debug HUD reports validation/object/grass/render counts
```

## Target proof loop

```txt
frame input
  -> optional ActionFrame rows
  -> normalize target/action/progress inputs
  -> reduce path-progress and inspect commands into ActionResult rows
  -> resolve objective completion
  -> project snapshot.gameplay additively
  -> collect expected render descriptors from enhanced plan
  -> normalize renderer.getSnapshot?.() readback
  -> classify renderer descriptor consumption rows
  -> classify grass descriptor consumption rows
  -> project GameHost.renderParity additively
  -> run DOM-free fixture rows for renderer absence, sparse readback, grass count parity, path progress, inspect, objective completion, and unchanged/no-op cases
```

## Next safe ledge

```txt
IntoTheMeadow Render Consumption Ledger + Action Replay Fixture Gate
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-09T09-41-24-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T09-41-24-04-00.md
.agent/architecture-audit/2026-07-09T09-41-24-04-00-render-consumption-action-replay-dsk-map.md
.agent/render-audit/2026-07-09T09-41-24-04-00-renderer-readback-consumer-freeze.md
.agent/grass-system-audit/2026-07-09T09-41-24-04-00-grass-consumption-fixture-contract.md
.agent/gameplay-audit/2026-07-09T09-41-24-04-00-action-result-objective-replay-loop.md
.agent/interaction-audit/2026-07-09T09-41-24-04-00-target-action-actionresult-contract.md
.agent/deploy-audit/2026-07-09T09-41-24-04-00-check-script-fixture-wire-map.md
```

## Source files to inspect before implementation

```txt
src/hosts/web-host.js
src/game/enhance-render-plan.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/boot/install-dsks.js
src/boot/expose-game-host.js
src/dsks/index.js
src/content/game-manifest.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
package.json
```
