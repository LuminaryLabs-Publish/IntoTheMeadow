# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-11T02-28-12-04-00`

## Current ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Single-RAF / Global-Lease / Rollback Fixture Gate
```

## Immediate companion gates

```txt
IntoTheMeadow Committed Frame Observation Authority
+ State/Plan/Render/Canvas Coherence Fixture Gate

IntoTheMeadow DSK Registry and Service Truth
+ Declared/Implemented/Consumed Fixture Gate
```

## Read first

```txt
.agent/trackers/2026-07-11T02-28-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T02-28-12-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T02-28-12-04-00-runtime-session-lifecycle-dsk-map.md
.agent/render-audit/2026-07-11T02-28-12-04-00-duplicate-raf-render-ownership-gap.md
.agent/gameplay-audit/2026-07-11T02-28-12-04-00-stop-start-frame-multiplication-loop.md
.agent/interaction-audit/2026-07-11T02-28-12-04-00-lifecycle-control-reachability-map.md
.agent/lifecycle-audit/2026-07-11T02-28-12-04-00-single-raf-global-lease-rollback-contract.md
.agent/deploy-audit/2026-07-11T02-28-12-04-00-runtime-lifecycle-fixture-gate.md
```

Companion context:

```txt
.agent/frame-authority-audit/2026-07-11T00-30-48-04-00-atomic-committed-frame-contract.md
.agent/registry-truth-audit/2026-07-11T02-20-44-04-00-declared-runtime-consumption-contract.md
.agent/headless-editor-audit/2026-07-11T00-30-48-04-00-browser-node-observation-parity-contract.md
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state.

```txt
IntoTheMeadow       selected / 2026-07-11T00-30-48-04-00
PrehistoricRush      tracked  / 2026-07-11T00-39-25-04-00
TheOpenAbove         tracked  / 2026-07-11T00-49-45-04-00
HorrorCorridor       tracked  / 2026-07-11T01-10-28-04-00
PhantomCommand       tracked  / 2026-07-11T01-20-51-04-00
ZombieOrchard        tracked  / 2026-07-11T01-31-15-04-00
TheUnmappedHouse     tracked  / 2026-07-11T01-38-28-04-00
MyCozyIsland         tracked  / 2026-07-11T02-02-59-04-00
AetherVale           tracked  / 2026-07-11T02-10-13-04-00
TheCavalryOfRome     excluded by rule
```

`IntoTheMeadow` was the oldest eligible documented fallback when this pass selected it. A separate registry-truth audit landed at `2026-07-11T02-20-44-04-00` while this pass was in progress. This pass continued on the already selected repository to preserve the one-project rule and incorporated its corrected kit census.

## Product read

`IntoTheMeadow` is a static DSK-composed meadow route. The browser imports a commit-pinned meadow provider, constructs the game, enhancer, WebGL renderer, `GameHost`, and editor bridge, then advances and renders through a browser animation loop.

## Actual interaction and lifecycle loop

```txt
index.html
  -> boot-game.js
  -> startWebHost()
  -> import external meadow-area-kit
  -> construct game, renderer, and enhancer
  -> overwrite global GameHost
  -> overwrite global NexusEditorEnvironment and install error listeners
  -> request one RAF without retaining its id
  -> tick / enhance / render / HUD
  -> request the successor RAF
```

The returned controller is discarded by `boot-game.js`. Its `stop()` only changes a Boolean. Its `start()` schedules a new RAF without cancelling a previously queued callback.

## Current finding

A stop/start race can permanently multiply the render loop:

```txt
RAF A is queued
  -> stop() sets stopped=true
  -> start() sets stopped=false and queues RAF B
  -> RAF A fires and sees stopped=false
  -> RAF B fires and sees stopped=false
  -> both tick, render, and queue successors
  -> two active RAF chains persist
```

Each callback increments `state.frame` with fixed `dt: 1/60`, so duplicate chains increase simulation and render work independently of display cadence. Fatal failure also leaves renderer resources, editor listeners, and global exposures live because the host has no coordinated `dispose()` or rollback transaction.

## Registry truth retained

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces cataloged: 24
```

Registry membership remains declaration evidence, not implementation or consumption proof.

## Implementation order

```txt
1. Runtime Session Lifecycle Authority + Single-RAF / Global-Lease / Rollback Fixture Gate
2. Committed Frame Observation Authority + State/Plan/Render/Canvas Coherence Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. DSK Registry Truth + Mesh Contribution and Consumer Proof Fixture Gate
```

Do not begin with visual tuning, renderer replacement, WebGPU migration, new meadow content, CDN migration, or shared-kit promotion.
