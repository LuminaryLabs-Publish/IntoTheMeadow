# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-08T05:19:46-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Latest selection result

The accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, or missing root `.agent/START_HERE.md` state.

`IntoTheMeadow` was selected by fallback oldest eligible follow-up because its next high-value seam is still the renderer descriptor-consumption contract.

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

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/dsk-cutover-audit.md
.agent/render-audit/meadow-renderer-gap-audit.md
.agent/grass-system-audit/texture-driven-grass-system.md
.agent/renderer-consumption-audit/descriptor-consumption-parity.md
.agent/trackers/2026-07-08T05-19-46-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T05-19-46-04-00.md
.agent/kit-registry.json
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
tests/render-plan-smoke.mjs
```

## Main rule

Do not let the publish repo become a generic kit foundry.

The game repo should compose and prove the meadow game. Reusable meadow renderer, grass, terrain, input, and post-process systems should move toward `NexusRealtime-ProtoKits` or `NexusEngine` only after local proof is stable and documented.

## Current next safe ledge

Build the **Renderer Descriptor Consumption Parity Fixture Gate**.

Keep the public route working while proving that the enhanced `grassSystem`, `postProcess`, `windField`, `performance`, and `renderStyle` descriptors are either consumed by the renderer snapshot or explicitly reported as unconsumed with stable reason metadata.
