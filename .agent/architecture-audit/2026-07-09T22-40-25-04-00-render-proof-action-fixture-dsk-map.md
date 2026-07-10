# Architecture Audit: Render Proof + Action Fixture DSK Map

**Timestamp:** `2026-07-09T22-40-25-04-00`

## DSK map

```txt
static-browser-shell
  -> boot-dom-adapter
  -> web-host-orchestration
  -> external-kit-imports
  -> createIntoTheMeadowGame
  -> dsk-install-validation
  -> meadow-area-render-plan
  -> render-plan-enhancement
  -> meadow-webgl-renderer-v2
  -> GameHost-debug-surface
```

## Source domains

```txt
manifest-and-build-metadata
arrival-meadow-source-config
objective-descriptor-domain
interaction-target-domain
story-beat-domain
initial-game-state-domain
frame-tick-domain
```

## Render domains

```txt
render-plan-enhancement
object-outline-policy
tiny-clutter-reduction
tree-object-enhancement
grass-density-texture
grass-clump-archetype
grass-static-batch
grass-patch-placement
grass-instancing-render-descriptor
grass-shader-wind
grass-lod-policy
grass-density-scaling
grass-debug-visualization
wind-field
postprocess-stack
meadow-performance-policy
mesh-builder-v2
webgl-renderer-v2
renderer-topology-cache
inline-cel-fog-render-pass
```

## Runtime services

```txt
startWebHost:
  import external kit
  create game
  create renderer
  create render plan enhancer
  expose GameHost
  own frame loop

createIntoTheMeadowGame:
  install DSKs
  cache base render plan
  create immutable game state
  expose diagnostics, snapshot, tick, reset

enhanceRenderPlan:
  filter small clutter
  apply outline policy
  enhance focal tree
  generate grass system
  add wind, postprocess, performance and stats
  create v2 render contract

createMeadowWebglRendererV2:
  compile WebGL shader
  build mesh data by topology key
  render outline and main pass
  expose renderer snapshot
```

## Proof domains needed next

```txt
render-expectation-row-domain
renderer-snapshot-normalizer-domain
render-consumption-ledger-domain
grass-consumption-row-domain
gamehost-render-proof-domain
action-frame-domain
target-action-preflight-domain
action-result-domain
objective-progress-domain
gameplay-fixture-row-domain
DOM-free-action-fixture-domain
```

## Architecture finding

The repo has a better DSK split than the central ledger previously emphasized. The v2 renderer is now local and returns readback. The architectural gap is converting source descriptors and renderer snapshots into stable proof rows.

The gameplay side is still only a descriptor inventory. Objectives and targets are declared, but no gameplay reducer consumes them.

## Next safe ledge

```txt
IntoTheMeadow Render Proof + Action Fixture Refresh
```
