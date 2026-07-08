# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-08T07:41:52-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Latest selection result

The accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger/status readback.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, or missing root `.agent/START_HERE.md` state.

`IntoTheMeadow` was selected by fallback follow-up because it still has a critical proof seam: the renderer parity fixture must prove which high-fidelity meadow descriptors are consumed, and the next gameplay handoff must define `ActionFrame` / `ActionResult` before story or movement expansion.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Current product read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game.

The repo owns the static route, web host, game factory, local DSK descriptor registry, arrival-meadow content, story/objective/interaction descriptors, render-plan enhancement, validation, and Pages deploy surface.

Reusable meadow generation and WebGL rendering are consumed from `LuminaryLabs-Agents/NexusRealtime-ProtoKits`.

## Current route

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/game/create-into-the-meadow-game.js
  -> src/game/enhance-render-plan.js
  -> external meadow-webgl-render-kit
```

## Current loop truth

```txt
requestAnimationFrame
-> game.tick({ time, dt: 1 / 60 })
-> advanceGameState increments frame and lastTick only
-> getRenderPlan(time)
-> enhanceRenderPlan(rawPlan)
-> renderer.render(enhancedPlan)
-> GameHost exposes state, snapshot, diagnostics, render plan, and renderer snapshot
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T07-41-52-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T07-41-52-04-00-renderer-parity-readback.md
.agent/gameplay-authority-audit/2026-07-08T07-41-52-04-00-action-frame-objective-reducer-gate.md
.agent/renderer-consumption-audit/parity-fixture-matrix.md
.agent/trackers/2026-07-08T07-41-52-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T07-41-52-04-00.md
.agent/kit-registry.json
```

Previous high-value entries:

```txt
.agent/trackers/2026-07-08T06-10-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T06-10-03-04-00.md
.agent/trackers/2026-07-08T05-19-46-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T05-19-46-04-00.md
```

## Source files to inspect next

```txt
README.md
index.html
src/boot/boot-game.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/enhance-render-plan.js
src/game/game-state.js
src/game/game-snapshot.js
src/content/game-manifest.js
src/content/dsk-registry.js
src/content/meadow-areas/arrival-meadow.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
tests/render-plan-smoke.mjs
```

## Main rule

Do not let the publish repo become a generic kit foundry.

The game repo should compose and prove the meadow game. Reusable meadow renderer, grass, terrain, input, and post-process systems should move toward `NexusRealtime-ProtoKits` or `NexusEngine` only after local proof is stable and documented.

## Current next safe ledge

Build the **Renderer Parity Fixture + ActionFrame Objective Reducer Handoff**.

Keep the public route working while proving that:

```txt
1. enhanced renderer descriptors are consumed or explicitly reported as unconsumed/unsupported
2. game.tick({ time, dt }) remains backward-compatible
3. optional game.tick({ time, dt, actions }) can reduce path-progress and inspect actions into deterministic objective state
```