# Current Audit — IntoTheMeadow

**Timestamp:** `2026-07-08T12-21-20-04-00`

## Current state

`IntoTheMeadow` is a static browser game route that boots from `index.html`, imports `src/boot/boot-game.js`, starts `src/hosts/web-host.js`, creates the game through `src/game/create-into-the-meadow-game.js`, enhances external meadow-area render plans through `src/game/enhance-render-plan.js`, and renders through the external `meadow-webgl-render-kit`.

The repo correctly acts as a publishable game/deploy repo, not a generic kit foundry.

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

The accessible `LuminaryLabs-Publish` repo list checked this run contained:

```txt
HorrorCorridor
AetherVale
TheOpenAbove
TheCavalryOfRome
PhantomCommand
PrehistoricRush
ZombieOrchard
IntoTheMeadow
MyCozyIsland
TheUnmappedHouse
```

`TheCavalryOfRome` was excluded.

No checked non-Cavalry repo was fully new, absent from the central ledger, undocumented, or missing sampled root `.agent/START_HERE.md` state.

`IntoTheMeadow` was selected as the oldest eligible fallback because its renderer descriptor parity and gameplay action-result seam remain unresolved.

## Interaction loop

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

## Key current facts

`package.json` exposes `npm run check` as the validation umbrella for static smoke, DSK registry smoke, render-plan smoke, and deterministic scene smoke.

`web-host.js` stores `lastPlan`, passes the enhanced plan to the renderer, and exposes `enhancedRenderPlan` plus `render` snapshot through `GameHost`.

`enhanceRenderPlan()` creates `grassSystem`, `grassPatches`, `windField`, `postProcess`, `performance`, and grass stats.

`advanceGameState()` still only increments `frame` and writes `lastTick`.

`createGameSnapshot()` still exposes `state`, `renderPlan`, and `diagnostics`, but does not expose a `gameplay` branch.

Arrival objectives and interaction targets already define `walk-the-path`, `inspect-tree`, `arrival-path`, and `focal-tree` descriptors.

## Current priority

```txt
IntoTheMeadow Renderer/GamePlay Contract Fixture Gate
```

The next implementation turn should prove render descriptor parity and gameplay action results before adding more meadow visuals or authored objectives.
