# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-08T10-48-47-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `IntoTheMeadow`.

Read this folder before changing implementation code.

## Latest selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest eligible fallback because it had the oldest observed latest central update among checked eligible repos.

## Current product read

`IntoTheMeadow` is a publishable DSK-composed meadow exploration game.

The repo owns the static route, web host, game factory, local DSK descriptor registry, arrival-meadow content, story/objective/interaction descriptors, render-plan enhancement, validation, GameHost projection, and Pages deploy surface.

Reusable meadow generation and WebGL rendering are consumed from `LuminaryLabs-Agents/NexusRealtime-ProtoKits` through CDN kit URLs.

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
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> GameHost exposes state, snapshot, diagnostics, enhanced render plan, and renderer snapshot
```

## Target proof loop

```txt
requestAnimationFrame
  -> enhanced render plan descriptors are collected as expectations
  -> renderer snapshot is normalized into consumed descriptor readback
  -> renderParity reports consumed/unconsumed/unsupported/fallback descriptors
  -> optional tick actions normalize into ActionFrame
  -> path-progress / inspect actions reduce into ActionResult records
  -> objective resolver updates completedObjectiveIds and storyBeatIds idempotently
  -> snapshot.gameplay exposes action journal and last results
  -> GameHost diagnostics expose renderParity without breaking existing fields
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T10-48-47-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T10-48-47-04-00-renderer-parity-cutover-readback.md
.agent/grass-system-audit/2026-07-08T10-48-47-04-00-grass-consumption-fixture-seams.md
.agent/gameplay-authority-audit/2026-07-08T10-48-47-04-00-action-result-implementation-cutover.md
.agent/trackers/2026-07-08T10-48-47-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T10-48-47-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
README.md
index.html
package.json
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
tests/deterministic-scene-smoke.mjs
```

## Main rule

Do not let the publish repo become a generic kit foundry.

The game repo should compose and prove the meadow game. Reusable meadow renderer, grass, terrain, input, and post-process systems should move toward `NexusRealtime-ProtoKits` or `NexusEngine` only after local proof is stable and documented.

## Current next safe ledge

Build the **Renderer Parity + Action Result Cutover Fixture Gate**.

Keep the public route working while proving that:

```txt
1. enhanced renderer descriptors are consumed or explicitly reported as unconsumed/unsupported
2. grass descriptors have renderer readback or stable unsupported reasons
3. game.tick({ time, dt }) remains backward-compatible
4. optional game.tick({ time, dt, actions }) reduces path-progress and inspect actions into deterministic ActionResult records
5. GameHost exposes renderParity and snapshot.gameplay without removing existing fields
```
