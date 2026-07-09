# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-09T03-35-07-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Latest selection result

The accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state.

All non-Cavalry Publish repos were already represented in the central ledger and had sampled root `.agent` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest eligible central-alignment fallback after recent same-night catch-up passes advanced the other tracked repos.

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
  -> load meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame
  -> install local DSK descriptors
  -> create arrival meadow area kit
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> optional debug HUD reads diagnostics and render counts
  -> GameHost exposes state, snapshot, diagnostics, enhanced plan, and renderer snapshot
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
IntoTheMeadow RenderParity + Gameplay Source Contract Freeze
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-09T03-35-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T03-35-07-04-00.md
.agent/architecture-audit/2026-07-09T03-35-07-04-00-renderparity-gameplay-source-contract.md
.agent/render-audit/2026-07-09T03-35-07-04-00-render-consumer-readback-freeze.md
.agent/grass-system-audit/2026-07-09T03-35-07-04-00-grass-consumption-row-contract.md
.agent/gameplay-audit/2026-07-09T03-35-07-04-00-action-result-source-contract.md
.agent/deploy-audit/2026-07-09T03-35-07-04-00-fixture-check-wire-map.md
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

## Do not do next

```txt
Do not rewrite visuals before render parity exists.
Do not change external CDN kit URLs before source contracts are fixture-proven.
Do not move shared meadow renderer logic into this publish repo permanently.
Do not add browser-only validation before DOM-free fixture rows exist.
```
