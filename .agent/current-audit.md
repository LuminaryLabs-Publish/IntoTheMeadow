# Current Audit — IntoTheMeadow

**Timestamp:** `2026-07-08T02:00:12-04:00`

## Current state

`IntoTheMeadow` is a static browser game route that boots from `index.html`, imports `src/boot/boot-game.js`, starts `src/hosts/web-host.js`, creates the game through `src/game/create-into-the-meadow-game.js`, and renders via the external `meadow-webgl-render-kit`.

The repo correctly declares itself as a publishable game/deploy repo, not a generic kit foundry.

The game owns:

```txt
- game manifest
- local DSK descriptor registry
- game factory
- deterministic state root
- GameHost exposure
- arrival meadow content
- story/objective/interaction descriptors
- render-plan enhancement layer
- static validation scripts
- GitHub Pages deploy surface
```

The game consumes:

```txt
- meadow-area-kit from NexusRealtime-ProtoKits
- meadow-webgl-render-kit from NexusRealtime-ProtoKits
```

## Repo-selection audit

The full `LuminaryLabs-Publish` list checked this run contained:

```txt
IntoTheMeadow
HorrorCorridor
AetherVale
ZombieOrchard
TheUnmappedHouse
MyCozyIsland
TheOpenAbove
PhantomCommand
TheCavalryOfRome
PrehistoricRush
```

The central `LuminaryLabs-Dev/LuminaryLabs` ledger had an `IntoTheMeadow` entry, but the actual repo-local root `.agent/START_HERE.md` was missing before this run.

That made `IntoTheMeadow` eligible under the new missing-root-agent priority rule.

`TheCavalryOfRome` was not considered because of the standing exclusion rule.

## Interaction loop

```txt
index.html
  -> loads src/boot/boot-game.js
  -> boot-game.js locates canvas, HUD, status, and loading elements
  -> startWebHost imports external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame installs local DSK descriptors
  -> createIntoTheMeadowGame builds ARRIVAL_MEADOW_CONFIG through meadow-area-kit
  -> requestAnimationFrame calls game.tick({ time, dt })
  -> game.getRenderPlan(time) returns the external meadow-area render plan
  -> enhanceRenderPlan adds local grass, wind, post-process, tree, performance, and render stats descriptors
  -> meadow-webgl-render-kit renders the enhanced plan
  -> GameHost exposes state, snapshot, diagnostics, render plan, and renderer snapshot
```

## Key architecture truth

The current game is descriptor-rich but renderer-limited.

The local `enhanceRenderPlan()` step emits a texture-driven grass system, static grass batches, draw groups, shader wind descriptors, LOD policy, post-process stack descriptors, outline policy, and performance budgets.

The main visible gap is that the external renderer must actually consume those descriptors as production-grade scene systems.

## Current live-risk summary

```txt
- Root .agent was missing before this run despite central ledger references.
- The visual route depends on external ProtoKits renderer behavior.
- The game emits grassSystem metadata, but the render kit still needs real instanced clump rendering.
- The game emits postProcess metadata, but the render kit still needs pass execution.
- Tree metadata is enriched locally, but renderer authority must move away from primitive focal-tree drawing.
- Gameplay state remains minimal compared to story/objective/interaction descriptors.
- The repo has many planned DSK descriptors that are not all implemented as real runtime packages.
```

## Current status

```txt
status: root-agent-state-added
selected-repo: LuminaryLabs-Publish/IntoTheMeadow
primary-gap: renderer-descriptor-consumption
secondary-gap: gameplay-authority-runtime
safe-next-ledges:
  1. renderer consumes grassSystem
  2. renderer executes postProcess descriptors
  3. gameplay action/reducer fixture gate
  4. GameHost exposes gameplay diagnostics
```