# Architecture Audit: GameHost Proof Row Consumer Ledger DSK Map

**Timestamp:** `2026-07-10T10-49-23-04-00`

## DSK/domain shape

```txt
boot-dom-adapter
  -> web-host-orchestration
  -> external-kit-imports
  -> dsk-install-validation
  -> createIntoTheMeadowGame
  -> arrival-meadow-source-config
  -> meadow-area-render-plan
  -> game-state-service
  -> render-plan-enhancement
  -> renderer-v2-consumer
  -> GameHost-debug-surface
  -> headless-editor-runtime
```

## Current authoritative files

```txt
src/boot/boot-game.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/game/enhance-render-plan.js
src/renderers/meadow-webgl-renderer-v2-compatible.js
src/renderers/meadow-webgl-renderer-v2.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
```

## Interaction loop authority

`startWebHost()` is the route composer. It imports the external meadow kit, creates the game, renderer, enhancer, `GameHost`, and editor bridge, then runs the animation loop.

`createIntoTheMeadowGame()` owns content installation, initial state, cached base render plan, diagnostics, snapshots, tick, and reset.

`enhanceRenderPlan()` owns most consumer-relevant descriptor composition: filtered objects, tree enhancement, grass system, wind, postprocess, performance policy, stats, and render contract tuning.

`exposeGameHost()` exposes aggregate state, render, enhancer, diagnostics, render plan, and the live game reference.

`installIntoTheMeadowEditorBridge()` exposes command reachability for runtime, scene, renderer, capture, viewport, and errors.

## Domains in use

```txt
static-browser-shell
boot-dom-adapter
web-host-orchestration
external-kit-imports
dsk-install-validation
arrival-meadow-source-config
meadow-area-render-plan
render-plan-enhancement
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
webgl-renderer-v2
state-snapshot-diagnostics
objective-descriptor-domain
interaction-target-domain
GameHost-debug-surface
headless-editor-runtime
render-consumption-proof-next
grass-source-render-parity-next
action-result-proof-next
objective-progress-proof-next
headless-editor-proof-row-next
```

## Services and kits

Current services:

```txt
external meadow area source service
fallback meadow source service
DSK install validation service
game state tick/reset service
render plan enhancement service
grass descriptor generation service
renderer v2 aggregate readback service
GameHost aggregate diagnostics service
headless editor bridge service
```

Current kits:

```txt
meadow-area-kit
fallback-meadow-area-kit
meadow-webgl-renderer-v2
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
headless-editor-bridge-kit
GameHost-diagnostics-kit
```

Next-cut proof kits:

```txt
render-expectation-row-kit
renderer-snapshot-normalizer-kit
render-consumption-ledger-kit
grass-consumption-row-kit
gamehost-render-proof-kit
action-frame-kit
target-action-preflight-kit
action-result-kit
objective-progress-kit
gameplay-fixture-row-kit
headless-editor-proof-ledger-kit
GameHost-proof-projection-kit
```

## Architectural gap

The live route has descriptor-rich sources and aggregate consumer snapshots, but no shared proof-row ledger.

The next architecture cut should add rows that can be read through `GameHost` and a DOM-free fixture without replacing the existing route, renderer, editor bridge, or external kit import.
