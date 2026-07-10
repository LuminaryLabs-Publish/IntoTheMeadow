# Architecture Audit: Proof Row Ledger DSK Map

**Timestamp:** `2026-07-10T04-58-56-04-00`

## DSK shape

```txt
static route
  -> web host
  -> external meadow-area-kit
  -> local render plan enhancer
  -> local renderer v2
  -> GameHost diagnostics
  -> headless editor bridge
  -> planned proof row ledger
```

## Current interaction loop

```txt
index.html
  -> boot-game.js
  -> startWebHost
  -> loadExternalKits
  -> createIntoTheMeadowGame
  -> installDsks
  -> create arrival meadow render plan
  -> create renderer v2 compatible adapter
  -> create render plan enhancer
  -> expose GameHost
  -> install editor bridge
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> raw plan -> enhanceRenderPlan
  -> grass system descriptors are generated
  -> renderer.render(enhancedPlan)
  -> renderer snapshot reports aggregate readback
  -> editor bridge exposes runtime, scene, renderer, capture, viewport, and errors
```

## Domains

```txt
static-browser-shell
boot-dom-adapter
web-host-orchestration
external-kit-imports
dsk-install-validation
manifest-and-build-metadata
arrival-meadow-source-config
meadow-area-render-plan
fallback-meadow-area-render-plan
render-plan-enhancement
source-topology-cache
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
state-snapshot-diagnostics
objective-descriptor-domain
interaction-target-domain
frame-tick-domain
GameHost-debug-surface
headless-editor-runtime
editor-bridge
render-proof-row-next
grass-proof-row-next
action-result-proof-next
objective-progress-proof-next
headless-editor-proof-row-next
central-ledger-sync
```

## Current services

```txt
external-kit-service: dynamic import and meadow area factory
DSK-install-service: descriptor validation and install snapshot
game-state-service: initial state, frame tick, lastTick, reset
snapshot-service: manifest, state, render plan, diagnostics, validation
render-enhancement-service: filtered objects, outline policy, grass system, wind field, postprocess, performance, stats
grass-system-service: density texture, archetypes, static batches, patches, draw groups, shader wind, LOD, debug, validation
renderer-v2-service: WebGL context, shader program, mesh buffer cache, topology-key rebuild, outline pass, cel-fog pass, aggregate snapshot
content-service: story beats, arrival objectives, interaction targets
GameHost-service: getState, getSnapshot, getDiagnostics, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, game reference
headless-editor-service: runtime status, tick/reset, scene stats, renderer snapshots, canvas capture, viewport/errors, environment smoke, command smoke, loop smoke
```

## Missing services

```txt
render expectation rows
renderer snapshot normalization
render consumption rows
grass source/render parity rows
ActionFrame rows
target/action preflight rows
ActionResult rows
objective progress rows
GameHost proof projection rows
headless editor proof observation rows
DOM-free proof fixture rows
```

## Main architecture blocker

`GameHost` exposes useful aggregate state, render plan, render snapshot, enhancer snapshot, and editor bridge reachability.

It does not yet expose proof rows that explain which descriptors or actions were consumed, ignored, unsupported, skipped, or accepted.
