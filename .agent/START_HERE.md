# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-09T06-28-53-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` repository list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local root `.agent` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest eligible documented fallback after same-day catch-up passes. The unresolved source seam is still the render-readback/action-replay proof boundary: the route already emits rich grass, wind, postprocess, performance, objective, and interaction descriptors, but those descriptors are not fixture-proven as renderer consumption rows or gameplay `ActionResult` rows.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible central latest before this pass 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T04-30-54-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T05-51-49-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T05-11-22-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T05-30-27-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T04-50-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
```

## Current product read

`IntoTheMeadow` is a static DSK-composed meadow exploration route.

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
  -> create meadow WebGL renderer
  -> expose GameHost state/snapshot/diagnostics/enhanced plan/render snapshot
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
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
  -> run DOM-free fixture rows for renderer absence, sparse readback, grass count parity, path progress, inspect, and objective completion
```

## Next safe ledge

```txt
IntoTheMeadow Render Readback + Action Replay Proof Freeze Fixture Gate
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-09T06-28-53-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T06-28-53-04-00.md
.agent/architecture-audit/2026-07-09T06-28-53-04-00-render-readback-action-replay-proof-dsk-map.md
.agent/render-audit/2026-07-09T06-28-53-04-00-renderer-consumption-readback-contract.md
.agent/grass-system-audit/2026-07-09T06-28-53-04-00-grass-descriptor-consumption-row-contract.md
.agent/gameplay-audit/2026-07-09T06-28-53-04-00-action-frame-objective-replay-loop.md
.agent/interaction-audit/2026-07-09T06-28-53-04-00-target-action-result-reason-contract.md
.agent/deploy-audit/2026-07-09T06-28-53-04-00-fixture-check-freeze-map.md
```

## Source files to inspect before implementation

```txt
src/hosts/web-host.js
src/game/enhance-render-plan.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/boot/install-dsks.js
src/dsks/index.js
src/content/game-manifest.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
package.json
```
