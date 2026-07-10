# Architecture Audit: Headless Render Action Proof DSK Map

**Timestamp:** `2026-07-10T01-38-16-04-00`

## DSK read

`IntoTheMeadow` is a DSK-composed meadow route with a local renderer, a render plan enhancer, a grass kit family, a `GameHost` readback surface, and a headless editor command path.

The next architecture gap is not visual composition. It is row-level proof that source descriptors are consumed, action/objective records mutate state, and headless editor observations can verify the route without relying on human screenshots.

## Current route map

```txt
index.html
  -> boot-game.js
  -> startWebHost
  -> loadExternalKits
  -> createIntoTheMeadowGame
  -> installDsks
  -> create meadow render plan
  -> createMeadowWebglRendererV2 compatible adapter
  -> createRenderPlanEnhancer
  -> exposeGameHost
  -> installIntoTheMeadowEditorBridge
  -> requestAnimationFrame
  -> tick state
  -> enhance render plan
  -> render
  -> GameHost and optional debug HUD readback
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
headless-editor-runtime
editor-bridge
GameHost-debug-surface
render-proof-next
grass-proof-next
action-fixture-next
objective-progress-next
headless-observation-proof-next
central-ledger-sync
```

## Current services

```txt
external-kit-service: dynamic import and meadow area factory.
dsk-install-service: local descriptor validation, external descriptor validation, snapshot.
game-state-service: initial state, frame tick, last tick, reset.
snapshot-service: manifest, state, render plan, diagnostics, validation.
render-enhancement-service: filtered objects, outline policy, grass system, wind field, postprocess, performance, stats.
grass-system-service: density texture, archetypes, static batches, patches, draw groups, shader wind, LOD, debug, validation.
renderer-v2-service: WebGL context, shader program, mesh buffer cache, topology-key rebuild, outline pass, main cel-fog pass, aggregate renderer snapshot.
content-service: story beats, arrival objectives, arrival interaction targets.
GameHost-service: getState, getSnapshot, getDiagnostics, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, game reference.
headless-editor-service: editor command surface, status, inspect, capture, loop, browser observation scripts.
```

## Implemented kits

```txt
meadow-area-kit
fallback-meadow-area-kit
meadow-webgl-renderer-v2
meadow-webgl-renderer-v2-compatible
headless-editor-runtime bridge
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
GameHost exposure kit
DSK install registry kit
headless editor command scripts
static/render/deterministic/headless editor smoke tests
```

## Next-cut kits

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
DOM-free-action-fixture-kit
headless-editor-proof-row-kit
headless-editor-observation-ledger-kit
central-ledger-sync-kit
```

## Architecture conclusion

Keep the route shell, external kit URL, renderer v2, grass visuals, and editor bridge stable.

Add the missing proof layer next: render rows, grass parity rows, action/objective rows, GameHost proof projection, and headless editor observation rows.
