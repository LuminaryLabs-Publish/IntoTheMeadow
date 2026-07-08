# Architecture Audit — Renderer/GamePlay Implementation Cutline

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-08T13-50-37-04-00`

## Selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against central `LuminaryLabs-Dev/LuminaryLabs` ledger state.

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central review 2026-07-08T12:29:17-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central update 2026-07-08T13:39:15-04:00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central update 2026-07-08T13:31:29-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central update 2026-07-08T12:41:31-04:00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central update 2026-07-08T13:18:13-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central update 2026-07-08T12:51:50-04:00
LuminaryLabs-Publish/IntoTheMeadow       selected fallback / latest central update 2026-07-08T12:21:20-04:00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central update 2026-07-08T13:11:07-04:00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central update 2026-07-08T12:59:11-04:00
```

No non-Cavalry repo in the observed Publish list was new, absent from the central ledger, missing root `.agent` state, or otherwise undocumented.

`IntoTheMeadow` was selected by the oldest eligible fallback rule. Its previous central update was older than the other eligible checked repos, and its renderer parity plus gameplay action-result seam remains unresolved.

## Runtime route

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> load meadow-area-kit from CDN
  -> load meadow-webgl-render-kit from CDN
  -> createIntoTheMeadowGame()
  -> create arrival meadow area kit
  -> requestAnimationFrame loop
  -> game.tick({ time, dt })
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> GameHost snapshot / diagnostics readback
```

## Current interaction loop

```txt
player opens static route
  -> host loads external meadow kits from GAME_MANIFEST.externalKits
  -> game installs local DSK descriptors
  -> meadow-area kit produces raw render plan
  -> local render enhancement creates grass, wind, postprocess, performance, and outline descriptors
  -> external renderer attempts to consume enhanced plan
  -> GameHost exposes state, diagnostics, enhancedRenderPlan, and renderer snapshot
```

The current gameplay loop is mostly diagnostic. `advanceGameState()` increments `frame` and writes `lastTick`, but the authored `walk-the-path` and `inspect-tree` descriptors are not yet reduced into accepted/rejected `ActionResult` records.

## Domains in use

```txt
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
render-parity-domain
meadow-performance-domain
outline-policy-domain
wind-field-domain
post-process-domain
tree-object-domain
grass-density-texture-domain
grass-clump-archetype-domain
grass-static-batch-domain
grass-patch-placement-domain
grass-instancing-render-domain
grass-shader-wind-domain
grass-lod-policy-domain
grass-density-scaling-domain
grass-debug-visualization-domain
state-root-domain
session-domain
player-state-domain
world-state-domain
progression-domain
story-beat-domain
objective-domain
interaction-target-domain
action-frame-domain
action-result-domain
action-journal-domain
objective-completion-domain
game-snapshot-domain
gameplay-snapshot-domain
gamehost-diagnostics-domain
fixture-smoke-domain
pages-deploy-domain
```

## Services the kits offer

```txt
current services:
  load external DSKs from CDN
  create local DSK install snapshot
  create fallback meadow area kit if external area kit is unavailable
  create arrival meadow render plan
  create tree object outline descriptor
  create wind field state
  create performance policy and render budgets
  create postprocess stack descriptor
  create texture-driven grass density map
  create reusable grass clump archetypes
  create static grass batches
  place grass patches against area/path density
  create grass draw groups
  create grass shader wind descriptor
  create grass LOD policy
  create grass density scale policy
  create grass debug summary
  reduce tiny clutter against performance budgets
  expose GameHost state, snapshot, diagnostics, enhanced plan, and render snapshot

needed next services:
  collect expected descriptors from enhanced render plan
  normalize renderer snapshot consumption without binding to one renderer version
  compare expected descriptors against renderer readback
  classify consumed, unconsumed, unsupported, fallback, and missing descriptors
  expose renderParity through GameHost without removing existing fields
  normalize optional tick actions into ActionFrame records
  reduce path-progress against arrival-path objective
  reduce inspect against focal-tree target
  resolve objective completion idempotently
  write action results into state progression and snapshot.gameplay
  run DOM-free render parity and gameplay fixture smoke tests
```

## Kits

```txt
implemented external kits:
  meadow-area-kit
  meadow-webgl-render-kit

implemented local kits / descriptors:
  game-manifest descriptor
  local-dsk-registry
  arrival-meadow descriptor
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

next-cut kits:
  render-parity-reason-kit
  expected-render-descriptor-kit
  renderer-snapshot-consumption-kit
  render-descriptor-parity-kit
  render-parity-diagnostics-projection-kit
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

## Implementation cutline

The next code pass should not add new meadow art, new objectives, audio, inventory, or first-person movement. It should build the fixture gate that proves existing descriptors are either consumed or rejected with stable reasons.

```txt
render parity first
  -> gameplay ActionFrame second
  -> snapshot/GameHost projection third
  -> fixture tests fourth
  -> then expansion
```
