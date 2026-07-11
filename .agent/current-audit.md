# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T00-30-48-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed static meadow route with a commit-pinned external source, local render-plan enhancement, a combined CPU/WebGL renderer, and browser plus Node headless-editor observation surfaces.

This documentation-only pass advances the existing frame-authority finding into a source-backed atomic committed-frame and observation-correlation contract. Runtime behavior was not changed.

## Repository selection

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` was excluded. All nine eligible repositories were present in the central ledger and had root `.agent` state.

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

## Interaction loop

```txt
browser loads index.html
  -> boot-game.js locates canvas and HUD elements
  -> startWebHost begins asynchronous construction
  -> external meadow-area-kit is imported from the manifest URL
  -> game, renderer, enhancer, GameHost, and editor bridge are created
  -> requestAnimationFrame invokes frame(now)
  -> game.tick mutates the live immutable state pointer
  -> game.getRenderPlan(time) overlays RAF time
  -> planEnhancer.enhance derives the active contracted plan
  -> lastPlan is assigned
  -> renderer.render performs outline and cel/fog draws
  -> lastRender is assigned
  -> HUD reads diagnostics, plan counts, renderer facts, and editor protocol
  -> successor RAF is requested
```

Independent browser editor paths:

```txt
runtime.tick  -> game.tick only
runtime.reset -> game.reset only
renderer.capture -> current canvas bytes + current renderer snapshot
snapshot -> current state + current renderer snapshot
```

Node headless paths create a separate on-demand plan/mesh/metric observation and synthetic SVG capture.

## Domains in use

```txt
browser shell and DOM boot
runtime session construction
runtime lifecycle and RAF scheduling
frame request, simulation, plan, render, and observation publication
external-kit manifest and dynamic import
source-provider selection and fallback
DSK registry and install validation
game/content state and reset
source-plan caching, time overlay, and rebuild
story, objective, and interaction-target descriptors
render-plan validation and topology hashing
terrain/path/environment/grass composition
wind/performance/postprocess enhancement
CPU mesh construction
WebGL program, buffer, cache, resize, draw, snapshot, and disposal
GameHost global exposure and diagnostics
browser headless-editor capability routing, canvas capture, and error listeners
Node headless-editor plan/mesh/metric/SVG observation
HUD/loading/fatal projection
Node smoke fixtures
static Pages deployment
```

Declared but not runtime-authoritative:

```txt
player movement
camera control
browser input mapping
interaction preflight and commands
objective/story mutation
audio
save/load
UI progression
```

## Runtime source-backed kits

```txt
external meadow-area-kit 0.1.0 @ 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
fallback-meadow-area-kit
install-dsks
meadow-render-plan-v2
meadow-render-plan-enhancer-v2
meadow-mesh-builder-v2
meadow-webgl-renderer-v2
precision-safe WebGL compatibility adapter
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
GameHost diagnostics surface
browser editor bridge
Node headless-editor environment
```

The DSK registry declares one external kit and 44 local descriptors. Registry membership is not proof of live runtime consumption.

## Services offered

```txt
commit-pinned external source import
external and fallback deterministic meadow generation
source validation, snapshots, caching, time overlay, and rebuild
DSK lookup, validation, and installation snapshots
terrain/path/material/object descriptors
grass density, archetypes, batches, placement, draw groups, wind, LOD, scaling, and debug
tree, wind, performance, and postprocess enhancement
render-plan validation and topology hashing
CPU geometry construction
WebGL context, precision normalization, shaders, buffers, resize, outline, cel/fog, snapshots, and disposal
state tick and reset
GameHost state/game/plan/renderer/enhancer readback
browser editor tick/reset/scene/render/capture/viewport/error services
Node editor plan/mesh/metrics/SVG capture/workspace services
static, registry, render, deterministic-scene, and editor smoke checks
static Pages deployment
```

## Atomic frame finding

The browser frame path publishes partial facts in separate phases:

```txt
state pointer changes
  -> raw plan is read
  -> enhanced plan is created
  -> lastPlan changes
  -> WebGL rendering may succeed or fail
  -> lastRender changes only on success
  -> canvas is changed by WebGL outside any frame ledger
  -> HUD, GameHost, and editor read independently
```

Concrete inconsistencies:

```txt
render failure after lastPlan assignment:
  state = new
  lastPlan = new
  lastRender = previous
  canvas = previous or partially cleared/drawn
  public frame result = absent

GameHost.getSnapshot:
  game snapshot state = current
  game snapshot raw renderPlan = default time 0
  enhancedRenderPlan = last successful or attempted RAF time
  render = last successful renderer snapshot

browser editor runtime.tick/reset:
  state changes
  plan/render/canvas/HUD do not commit

browser editor renderer.capture:
  canvas bytes and renderer snapshot are read independently
  no expectedFrameId or canvas acknowledgement exists

Node headless environment:
  rebuilds plan, mesh, and metrics per capability call
  uses fallback source unless explicitly injected
  emits synthetic SVG rather than the browser WebGL canvas
```

The renderer snapshot contains plan ID, topology key, counts, and cache state, but no session ID, run ID, frame ID, simulation state fingerprint, plan fingerprint, requested time, canvas commit ID, or failure row.

## Required authority boundary

One `committed-frame-authority-domain` must own:

```txt
frame request admission
simulation staging
raw-plan derivation at the exact request time
enhanced-plan derivation
render submission
canvas commit acknowledgement
immutable frame commit
failure publication without replacing the committed pointer
GameHost, HUD, browser editor, and Node fixture projections
```

Browser editor tick/reset must route through this transaction rather than mutating the game directly.

## Implementation order

```txt
1. Runtime Session Lifecycle Authority + Stop/Restart/Dispose/Rollback Fixture Gate
2. Committed Frame Observation Authority + State/Plan/Render/Canvas Coherence Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. Mesh Contribution Ledger + Registry Truth Fixture Gate
```

Lifecycle remains first because the runtime session must own frame sequence, run generation, journals, and terminal publication.
