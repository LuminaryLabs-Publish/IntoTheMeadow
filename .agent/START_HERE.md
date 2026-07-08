# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-08T02:00:12-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Selection reason

This repo was selected from the full `LuminaryLabs-Publish` repo list because the central ledger already referenced `IntoTheMeadow`, but the repo-local root `.agent/START_HERE.md` was missing when checked during this run.

The selection rule now prefers repos that are new, ledger-absent, undocumented, or missing root `.agent` state before falling back to oldest eligible repo selection.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Current product read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game.

The repo owns the static route, game host, composition, story/progression descriptors, local DSK descriptor registry, validation, and Pages deploy surface.

Reusable meadow generation and WebGL rendering are consumed from `LuminaryLabs-Agents/NexusRealtime-ProtoKits`.

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/dsk-cutover-audit.md
.agent/render-audit/meadow-renderer-gap-audit.md
.agent/grass-system-audit/texture-driven-grass-system.md
.agent/trackers/2026-07-08T02-00-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T02-00-12-04-00.md
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
src/content/dsk-registry.js
src/content/meadow-areas/arrival-meadow.js
src/content/story/story-beats.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
src/dsks/index.js
src/validation/validate-render-plan.js
tests/*.mjs
.github/workflows/deploy.yml
```

## Main rule

Do not let the publish repo become a generic kit foundry.

The game repo should compose and prove the meadow game, while reusable meadow renderer, grass, terrain, and input systems should move toward `NexusRealtime-ProtoKits` or `NexusEngine` as appropriate.

## Current next safe ledge

Fix the renderer authority mismatch.

The game now emits rich `grassSystem`, `postProcess`, wind, and performance metadata, but the external render kit still needs to consume those descriptors as real instanced grass, tree framing, terrain material, and post-process passes.

Keep the existing public route working while replacing primitive object rendering with descriptor-driven renderer systems.