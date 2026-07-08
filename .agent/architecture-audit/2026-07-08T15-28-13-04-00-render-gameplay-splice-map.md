# IntoTheMeadow Render + Gameplay Splice Map

**Timestamp:** `2026-07-08T15-28-13-04-00`

## Purpose

Define the exact source seam for the next implementation pass without changing runtime behavior in this documentation turn.

The next implementation must prove that the existing enhanced render descriptors and existing objective descriptors are consumed by fixture-readable contracts.

## Current architecture

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> load GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame
  -> meadow-area-kit render plan
  -> enhanceRenderPlan
  -> meadow-webgl-render-kit.render(plan)
  -> GameHost readback
```

## Existing source authorities

```txt
GAME_MANIFEST
  owns external kit URLs, game id, version, and build identity

createIntoTheMeadowGame
  owns content wiring, DSK install, meadow kit instance, game facade, tick, reset, diagnostics, snapshot

game-state
  owns initial state and tick-level state advance

enhance-render-plan
  owns the local render descriptor expansion layer

web-host
  owns browser loop, renderer construction, plan enhancement, renderer call, debug HUD, and GameHost exposure
```

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
grass-system-domain
grass-consumption-domain
game-state-domain
player-state-domain
world-state-domain
progression-domain
objective-domain
interaction-target-domain
action-frame-domain
action-result-domain
action-journal-domain
gameplay-snapshot-domain
gamehost-diagnostics-domain
fixture-smoke-domain
pages-deploy-domain
```

## Services that the kits offer

```txt
external meadow-area-kit:
  create arrival-meadow render plan
  expose meadow render-plan snapshot
  validate meadow plan

external meadow-webgl-render-kit:
  create WebGL renderer
  render enhanced meadow plan
  optionally expose renderer snapshot

local DSK registry:
  install local and external descriptors
  count local/external DSKs
  expose validation snapshot

render enhancement kits:
  add tree styling
  reduce tiny clutter
  produce wind field
  produce post-process stack
  produce performance and outline policy
  produce texture-driven grass system

grass kits:
  create density texture
  create clump archetypes
  create static batches
  place patches
  create instancing draw groups
  configure shader wind
  configure LOD policy
  scale density by quality
  create debug summaries

next render-parity kits:
  collect expected descriptors from enhanced plan
  normalize renderer consumption readback
  compare expected descriptors against consumed descriptors
  classify missing/unsupported/fallback rows
  project GameHost renderParity

next gameplay-authority kits:
  normalize optional input actions
  reduce path progress
  reduce target inspection
  resolve objective completion idempotently
  journal action results
  project snapshot.gameplay
```

## Implemented kits

```txt
meadow-area-kit
meadow-webgl-render-kit
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

## Next-cut kits

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

## Source edit order for next implementation

```txt
1. Add src/render-parity/render-parity-reasons.js
2. Add src/render-parity/collect-expected-render-descriptors.js
3. Add src/render-parity/normalize-renderer-snapshot-consumption.js
4. Add src/render-parity/compare-render-descriptor-parity.js
5. Wire renderParity additively in src/hosts/web-host.js
6. Add src/gameplay-authority/action-reasons.js
7. Add src/gameplay-authority/action-frame.js
8. Add src/gameplay-authority/action-result.js
9. Add src/gameplay-authority/action-journal.js
10. Add path-progress and inspect reducers
11. Add objective completion resolver
12. Wire optional actions in game.tick without breaking game.tick({ time, dt })
13. Add snapshot.gameplay projection
14. Add render parity and gameplay fixture smoke scripts
15. Add fixture scripts to npm run check
```

## Stop line

Stop after fixtures prove render parity rows and first-objective ActionResult rows.

Do not add more meadow art, new objectives, audio, inventory, first-person controls, or DSK extraction in the same implementation pass.