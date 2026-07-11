# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-11T00-30-48-04-00`

## Current ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Stop/Restart/Dispose/Rollback Fixture Gate
```

## Immediate companion gate

```txt
IntoTheMeadow Committed Frame Observation Authority
+ State/Plan/Render/Canvas Coherence Fixture Gate
```

## Read first

```txt
.agent/trackers/2026-07-11T00-30-48-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T00-30-48-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T00-30-48-04-00-committed-frame-observation-dsk-map.md
.agent/render-audit/2026-07-11T00-30-48-04-00-state-plan-render-canvas-coherence-gap.md
.agent/gameplay-audit/2026-07-11T00-30-48-04-00-tick-reset-frame-commit-loop.md
.agent/interaction-audit/2026-07-11T00-30-48-04-00-editor-mutation-capture-correlation-map.md
.agent/frame-authority-audit/2026-07-11T00-30-48-04-00-atomic-committed-frame-contract.md
.agent/headless-editor-audit/2026-07-11T00-30-48-04-00-browser-node-observation-parity-contract.md
.agent/deploy-audit/2026-07-11T00-30-48-04-00-atomic-frame-fixture-gate.md
```

The preceding runtime-lifecycle contract remains the first implementation gate:

```txt
.agent/lifecycle-audit/2026-07-10T22-58-36-04-00-session-ownership-rollback-contract.md
.agent/deploy-audit/2026-07-10T22-58-36-04-00-lifecycle-fixture-gate.md
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state.

```txt
IntoTheMeadow       selected / 2026-07-10T22-58-36-04-00
PrehistoricRush      tracked  / 2026-07-10T23-08-11-04-00
TheOpenAbove         tracked  / 2026-07-10T23-20-41-04-00
HorrorCorridor       tracked  / 2026-07-10T23-30-13-04-00
PhantomCommand       tracked  / 2026-07-10T23-40-35-04-00
ZombieOrchard        tracked  / 2026-07-10T23-50-53-04-00
TheUnmappedHouse     tracked  / 2026-07-11T00-00-26-04-00
MyCozyIsland         tracked  / 2026-07-11T00-10-28-04-00
AetherVale           tracked  / 2026-07-11T00-18-24-04-00
TheCavalryOfRome     excluded by rule
```

`IntoTheMeadow` was the oldest eligible documented fallback. Only this product repository was changed.

## Product read

`IntoTheMeadow` is a static DSK-composed meadow route. The browser imports a commit-pinned meadow provider, creates immutable game-state rows, enhances a cached source plan, renders one combined WebGL mesh, and exposes browser and Node headless-editor observations.

## Actual interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost()
  -> load external meadow-area-kit
  -> create game, renderer, enhancer, GameHost, and editor bridge
  -> RAF calls game.tick
  -> obtain raw plan at RAF time
  -> enhance plan
  -> assign lastPlan
  -> renderer.render
  -> assign lastRender
  -> update HUD
  -> request next RAF
```

Browser editor capabilities can separately call `runtime.tick` or `runtime.reset` without running enhance, render, HUD, or frame publication.

## Current finding

The route does not publish one atomic committed frame.

```txt
game.tick mutates live state first
lastPlan changes before renderer success
lastRender changes only after renderer success
game snapshot uses a default-time raw plan
browser editor tick/reset bypass rendering
canvas capture reads the existing canvas independently
GameHost and editor snapshots read state, plan, renderer, and canvas separately
Node headless rebuilds synthetic plan/mesh observations on demand
```

A renderer failure can therefore expose a newer state and plan beside an older render snapshot and canvas. An editor tick or reset can also change runtime state while the visible canvas still represents the prior frame.

## Implementation order

```txt
1. Runtime Session Lifecycle Authority + Stop/Restart/Dispose/Rollback Fixture Gate
2. Committed Frame Observation Authority + State/Plan/Render/Canvas Coherence Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. Mesh Contribution Ledger + Registry Truth Fixture Gate
```

Do not begin with visual tuning, renderer replacement, WebGPU migration, CDN migration, new meadow content, or shared-kit promotion.
