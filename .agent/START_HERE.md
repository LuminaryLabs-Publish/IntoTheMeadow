# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-09T03-38-54-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Latest selection result

The accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

All non-Cavalry Publish repos were already represented in the central ledger and had sampled root `.agent` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest eligible tracked fallback by central alignment timestamp. Its previous central alignment was `2026-07-09T00-50-00-04-00`, older than the other checked non-excluded repos.

A repo-local `03:35` same-hour pointer was observed in root `.agent` state while central tracking still lagged at `00:50`; this pass preserves that context and advances the central ledger to the fresh `03:38` tracker.

## Current product read

`IntoTheMeadow` is a static DSK-composed meadow exploration game.

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
  -> optional actions[]
  -> normalize ActionFrame rows
  -> reduce path-progress and inspect commands into ActionResult rows
  -> resolve objective completion
  -> project snapshot.gameplay additively
  -> collect expected render descriptors from enhanced plan
  -> normalize renderer.getSnapshot?.() readback
  -> classify descriptor parity rows
  -> classify grass readback rows
  -> project GameHost.renderParity additively
  -> run DOM-free fixture rows for render parity and gameplay authority
```

## Next safe ledge

```txt
IntoTheMeadow Renderer Readback Consumer Freeze + Action Replay Fixture Gate
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-09T03-38-54-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T03-38-54-04-00.md
.agent/architecture-audit/2026-07-09T03-38-54-04-00-renderer-readback-consumer-freeze-dsk-map.md
.agent/render-audit/2026-07-09T03-38-54-04-00-renderer-consumption-readback-contract.md
.agent/grass-system-audit/2026-07-09T03-38-54-04-00-grass-render-consumption-row-contract.md
.agent/gameplay-audit/2026-07-09T03-38-54-04-00-action-replay-consumer-freeze.md
.agent/interaction-audit/2026-07-09T03-38-54-04-00-target-action-contract.md
.agent/deploy-audit/2026-07-09T03-38-54-04-00-check-script-fixture-map.md
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
