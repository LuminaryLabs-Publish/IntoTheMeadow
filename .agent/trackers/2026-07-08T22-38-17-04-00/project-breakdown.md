# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-08T22-38-17-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch policy:** main only. No branches created.

## Goal

Keep `IntoTheMeadow` documented as a DSK-composed static meadow game and narrow the next implementation into a proofable fixture boundary.

This pass selected `IntoTheMeadow` after comparing the accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger. No non-Cavalry repo was new, absent from the ledger, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

## Repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       selected / oldest eligible central alignment 2026-07-08T20-21-59-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central alignment 2026-07-08T20-38-28-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central alignment 2026-07-08T20-52-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / central alignment 2026-07-08T21-00-12-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central alignment 2026-07-08T21-18-39-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central alignment 2026-07-08T21-31-35-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central alignment 2026-07-08T21-50-56-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central alignment 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central alignment 2026-07-08T22-19-38-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
```

## Current route read

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits()
  -> GAME_MANIFEST.externalKits[0] meadow-area-kit CDN
  -> GAME_MANIFEST.externalKits[1] meadow-webgl-render-kit CDN
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks()
  -> create arrival meadow area kit
  -> create external renderer
  -> exposeGameHost(...game, renderer, getRenderPlan, getSnapshot)
  -> requestAnimationFrame(frame)
```

## Interaction loop

```txt
browser opens index.html
  -> boot-game.js finds #scene, #hud, #status, #loading
  -> web-host loads external meadow kits
  -> game factory installs local DSK registry
  -> state starts at arrival-meadow with player.pathProgress = 0
  -> frame loop calls game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time) returns external meadow area render plan
  -> enhanceRenderPlan(rawPlan) injects local render/grass/wind/postprocess descriptors
  -> renderer.render(plan) draws the enhanced plan
  -> debug HUD displays validation, DSK count, object count, patch count, and render vertex count
  -> GameHost snapshot exposes manifest, state, renderPlan, diagnostics, enhancedRenderPlan, and renderer snapshot
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

## Domains in use

```txt
implemented domains:
  static-route-domain
  browser-boot-domain
  web-host-domain
  external-cdn-kit-loader-domain
  game-manifest-domain
  dsk-install-domain
  meadow-area-domain
  fallback-meadow-area-domain
  game-state-domain
  game-snapshot-domain
  diagnostics-domain
  render-plan-domain
  render-plan-enhancement-domain
  renderer-host-domain
  renderer-snapshot-domain
  tree-object-domain
  wind-field-domain
  post-process-domain
  performance-policy-domain
  outline-policy-domain
  grass-density-domain
  grass-clump-archetype-domain
  grass-static-batch-domain
  grass-placement-domain
  grass-instancing-domain
  grass-shader-wind-domain
  grass-lod-domain
  grass-density-scaling-domain
  grass-debug-domain
  objective-descriptor-domain
  interaction-target-domain
  page-deploy-domain

missing / next-cut domains:
  render-parity-reason-domain
  expected-render-descriptor-domain
  renderer-readback-normalization-domain
  descriptor-parity-row-domain
  grass-readback-row-domain
  render-parity-report-domain
  action-frame-domain
  action-result-domain
  action-journal-domain
  path-progress-reducer-domain
  inspect-target-reducer-domain
  objective-completion-resolver-domain
  gameplay-snapshot-domain
  fixture-smoke-domain
```

## Services that the kits offer

```txt
current services:
  boot the browser route from index.html
  load external CDN kits from GAME_MANIFEST.externalKits
  create a meadow area render plan
  create a webgl renderer from the external renderer kit
  install local DSK descriptors
  create initial game state
  advance state by frame tick
  create game snapshot
  validate diagnostics
  enhance the external render plan with local object, grass, wind, postprocess, performance, and outline descriptors
  create texture-driven grass density maps
  create grass clump archetypes
  create static grass batches
  place grass patches
  create grass instancing draw groups
  create shader wind descriptors
  create grass LOD policy descriptors
  create grass debug summaries
  expose GameHost state/snapshot/render diagnostics
  run static, registry, render-plan, and deterministic-scene smoke checks through npm run check

needed next services:
  collect expected descriptors from enhanced render plans
  normalize sparse renderer snapshots
  classify descriptor parity as consumed, unconsumed, unsupported, fallback-rendered, missing, invalid, or count mismatch
  classify grass readback rows explicitly
  expose renderParity through GameHost without removing legacy fields
  normalize optional gameplay action inputs
  reduce path-progress actions into ActionResults
  reduce inspect actions into ActionResults
  resolve objective completion idempotently
  project snapshot.gameplay without breaking existing snapshot shape
  run DOM-free render parity and gameplay fixture rows
```

## Kits identified

### Implemented external kits

```txt
meadow-area-kit
meadow-webgl-render-kit
```

### Implemented local descriptor kits

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

### Next-cut proof kits

```txt
render-parity-reason-kit
expected-render-descriptor-kit
renderer-snapshot-consumption-kit
render-descriptor-parity-kit
render-parity-report-kit
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

## Findings

```txt
GAME_MANIFEST still routes through jsDelivr NexusRealtime ProtoKit URLs for meadow-area-kit and meadow-webgl-render-kit.
web-host.js has the exact render parity splice point after renderer.render(plan), but no parity record is computed yet.
enhanceRenderPlan emits the rich descriptor stack, especially grassSystem and stats, but no consumer/readback proof exists.
advanceGameState remains tick-only and does not consume actions.
ARRIVAL_OBJECTIVES and ARRIVAL_INTERACTION_TARGETS already describe walk-the-path and inspect-tree, but those descriptors are not reduced into ActionResult records.
createGameSnapshot does not expose renderParity or gameplay branches.
```

## Next safe ledge

```txt
IntoTheMeadow RenderParity Consumer Fixture + Gameplay Action Replay Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: no
local npm run check: no
browser route check: no
DOM-free fixture run: no, fixture files do not exist yet
pushed to main: yes
```
