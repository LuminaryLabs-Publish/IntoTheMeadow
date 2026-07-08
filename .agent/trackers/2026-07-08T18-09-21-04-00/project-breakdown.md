# Project Breakdown — IntoTheMeadow

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-08T18-09-21-04-00`

## Goal

Refresh the repo-local `.agent` state for `IntoTheMeadow` after comparing the full accessible `LuminaryLabs-Publish` repository list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state.

This pass does not change runtime source code.

It narrows the next implementation slice to the exact host consumer boundary where renderer parity and gameplay action results should become stable, additive records.

## Repo selection

The accessible Publish repository list contained:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheUnmappedHouse
```

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule.

No checked non-Cavalry repository was fully new, missing from the central repo ledger, missing a sampled root `.agent/START_HERE.md`, or otherwise undocumented.

`LuminaryLabs-Publish/IntoTheMeadow` was selected by the oldest eligible fallback rule. Its sampled root alignment was `2026-07-08T15-28-13-04-00`, older than the other checked non-excluded repo-local alignments:

```txt
HorrorCorridor      2026-07-08T15:49:18-04:00
AetherVale          2026-07-08T17-49-51-04-00
TheOpenAbove        2026-07-08T17-31-22-04-00
PhantomCommand      2026-07-08T15-58-59-04-00
PrehistoricRush     2026-07-08T16-51-11-04-00
ZombieOrchard       2026-07-08T16-20-00-04-00
MyCozyIsland        2026-07-08T17-09-48-04-00
TheUnmappedHouse    2026-07-08T16-19-57-04-00
```

## Interaction loop

Current runtime loop:

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> load GAME_MANIFEST external kits
  -> createIntoTheMeadowGame({ externalKits })
  -> create external meadow WebGL renderer
  -> expose GameHost with game, renderer, enhancedRenderPlan, and renderer snapshot
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt })
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(plan)
  -> optional debug HUD text
  -> next animation frame
```

Source-backed details:

```txt
src/hosts/web-host.js:
  imports GAME_MANIFEST, createIntoTheMeadowGame, exposeGameHost, and enhanceRenderPlan.
  loads external meadow area and meadow WebGL render kits from manifest URLs.
  creates game and renderer.
  exposes GameHost before the frame loop.
  keeps lastPlan and exposes enhancedRenderPlan plus renderer.getSnapshot?.().
  calls game.tick({ time, dt: 1 / 60 }) with no action records.
  computes rawPlan -> enhanceRenderPlan(rawPlan) -> renderer.render(plan).
```

Target proof loop:

```txt
frame start
  -> game.tick({ time, dt, actions? })
  -> ActionFrame[] normalized without breaking existing tick call shape
  -> ActionResult[] reduced for path-progress and inspect actions
  -> objective completion resolved idempotently
  -> raw render plan
  -> enhanced render plan
  -> expected render descriptors collected
  -> renderer.render(plan)
  -> renderer snapshot normalized
  -> RenderParityReport created
  -> GameHost.getState()/getSnapshot exposes renderParity and gameplay additively
  -> DOM-free render parity fixture passes
  -> DOM-free gameplay action fixture passes
```

## Domains in use

```txt
implemented:
  static-route-domain
  browser-boot-domain
  web-host-domain
  external-kit-loading-domain
  manifest-domain
  dsk-install-domain
  meadow-area-domain
  render-plan-domain
  render-plan-enhancement-domain
  renderer-host-domain
  render-snapshot-domain
  grass-system-domain
  grass-density-domain
  grass-static-batch-domain
  grass-placement-domain
  grass-instancing-domain
  grass-wind-domain
  grass-lod-domain
  post-process-domain
  performance-policy-domain
  game-state-domain
  player-state-domain
  world-state-domain
  progression-domain
  objective-descriptor-domain
  interaction-target-domain
  gamehost-diagnostics-domain
  pages-deploy-domain

missing / next-cut:
  render-parity-domain
  expected-render-descriptor-domain
  renderer-snapshot-consumption-domain
  grass-consumption-readback-domain
  action-frame-domain
  action-result-domain
  action-journal-domain
  objective-completion-reducer-domain
  gameplay-snapshot-domain
  fixture-smoke-domain
```

## Services offered by current kits

```txt
load external meadow area kit from CDN
load external meadow WebGL renderer kit from CDN
create the IntoTheMeadow game object
create DSK install snapshot
create initial game state
advance frame and lastTick
create render plan
create game snapshot
validate game snapshot
create grass density texture
create clump archetypes
create static grass batches
place grass patches
create instanced grass draw groups
create shader wind payload
create grass LOD policy
create grass debug summary
apply meadow performance policy
apply post-process descriptors
apply tree outline descriptors
filter tiny clutter by performance budget
render enhanced plan through external renderer
expose GameHost state and snapshots
```

## Needed services

```txt
collectExpectedRenderDescriptors(plan)
normalizeRendererSnapshotConsumption(rendererSnapshot)
compareRenderDescriptorParity(plan, rendererSnapshot)
classifyGrassConsumptionRows(plan, rendererSnapshot)
projectGameHostRenderParity(report)
createActionFrame(action, context)
createActionResult(actionFrame, status, reason, deltas)
appendActionJournalEntry(state, result)
reducePathProgressAction(state, actionFrame)
reduceInspectTargetAction(state, actionFrame)
resolveObjectiveCompletion(state, objectives, targets, results)
createGameplaySnapshot(state)
runRenderParityFixtureRows()
runGameplayAuthorityFixtureRows()
```

## Kits identified

Current external kits:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

Current local descriptors and kits:

```txt
game-manifest descriptor
local-dsk-registry
arrival-meadow content descriptor
story-beats descriptor
arrival-objectives descriptor
arrival-interaction-targets descriptor
fallback-meadow-area-kit
tree-object-dsk
wind-field-dsk
meadow-performance-dsk
post-process-stack-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
```

Next-cut kits:

```txt
render-parity-reason-kit
expected-render-descriptor-kit
renderer-snapshot-consumption-kit
render-descriptor-parity-kit
render-parity-diagnostics-projection-kit
grass-consumption-row-kit
action-frame-kit
action-result-kit
action-journal-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-resolver-kit
gameplay-snapshot-kit
render-parity-fixture-smoke-kit
gameplay-authority-fixture-smoke-kit
```

## Main finding

`IntoTheMeadow` is not blocked by content or art.

It is blocked by readback authority:

```txt
enhanceRenderPlan emits rich grass, wind, post-process, performance, render style, and stats descriptors.
web-host passes the enhanced plan into renderer.render(plan).
GameHost exposes enhancedRenderPlan and renderer.getSnapshot?.().
No stable RenderParityReport proves descriptor consumption.
advanceGameState only advances frame/lastTick.
ARRIVAL_OBJECTIVES and ARRIVAL_INTERACTION_TARGETS already define the first playable proof targets, but no ActionResult path consumes them.
```

## Next safe ledge

```txt
IntoTheMeadow GameHost RenderParity Consumer + Objective ActionResult Fixture Gate
```

Stop after this ledge proves:

```txt
GameHost.renderParity exists additively.
GameHost snapshots keep existing enhancedRenderPlan/render shapes.
render parity classifies missing renderer snapshot, missing fields, consumed descriptors, unconsumed grass descriptors, unsupported post-process, unsupported wind, and fallback renderer behavior.
game.tick({ time, dt }) still works.
game.tick({ time, dt, actions }) produces ActionResult records.
walk-the-path completes once path-progress >= 0.35.
inspect-tree completes when focal-tree is inspected.
repeat inspect is idempotent.
invalid and unknown actions return stable rejected results.
snapshot.gameplay exists.
npm run check includes DOM-free render parity and gameplay fixtures.
```
