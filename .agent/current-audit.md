# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-10T21-19-36-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed static meadow route with a commit-pinned external source, local enhancement services, a combined CPU mesh, a two-pass WebGL renderer, and GameHost/headless-editor observation surfaces.

This documentation-only pass preserves the lifecycle and source-provider findings and adds a distinct committed-frame observation audit.

## Repository selection

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` was excluded. All nine eligible repositories were present in the central ledger and had root `.agent` state.

Current ledger timestamps placed `IntoTheMeadow` at `2026-07-10T19-48-39-04-00`, older than the other eligible repositories, so it was selected as the single documented fallback.

## Interaction loop

```txt
browser boot
  -> import external meadow-area-kit
  -> install DSK descriptors
  -> create static state and cached source plan
  -> create renderer, enhancer, GameHost, and editor bridge
  -> requestAnimationFrame
  -> game.tick({ time, dt: 1/60 })
  -> enhance cached plan
  -> render outline and cel/fog passes
  -> publish HUD/GameHost/editor readback
  -> requestAnimationFrame again
```

Authored path progress, inspection, objectives, player movement, and story mutation remain descriptors only.

## Observation loop

```txt
game.tick()
  -> state.frame increments

game.getRenderPlan(time)
  -> cached source plan receives a time overlay

planEnhancer.enhance(rawPlan)
  -> topology cache hit or rebuild
  -> enhanced plan returned

web-host
  -> lastPlan = enhanced plan
  -> lastRender = renderer.render(lastPlan)

GameHost/editor
  -> read live state, lastPlan, renderer snapshot, enhancer snapshot, or canvas independently
```

## Domains in use

```txt
browser shell and DOM boot
web-host orchestration and frame scheduling
runtime session lifecycle and RAF ownership
frame staging and observation publication
external-kit manifest and dynamic import
source-provider selection and fallback
DSK registry and install validation
game/content composition
source-plan caching, time overlay, and rebuild
frame/time state and reset
story, objective, and interaction-target descriptors
render-plan contract, validation, and topology hashing
terrain and path sampling
atmosphere, scatter, focal tree, distant trees, rocks, flowers, ground cover, and grass
grass density, archetype, static batch, placement, draw-group, wind, LOD, scaling, and debug composition
wind, performance, outline, color, fog, vignette, and composite policy
CPU mesh construction
WebGL context, shaders, buffers, topology cache, resize, draw, snapshot, and disposal
GameHost global readback
Nexus editor capabilities and browser error capture
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
UI projection
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
headless-editor bridge
```

The registry declares one external kit and 44 local kits across game/host/composition, meadow terrain/path, grass, environment, gameplay, diagnostics, rendering, postprocess, and deployment. Registry membership is not implementation-consumption proof.

## Services offered

```txt
commit-pinned external source import
external and local deterministic meadow descriptor generation
source validation, snapshots, caching, time overlay, and rebuild
DSK lookup, validation, and install snapshots
terrain/path/material and object descriptor production
grass density, archetype, batching, placement, draw groups, wind, LOD, scaling, and debug
tree, wind, performance, and postprocess enhancement
render-plan validation and topology hashing
CPU geometry construction
WebGL context, precision normalization, shader/program, buffer, resize, outline, cel/fog, snapshot, and disposal
frame/time tick and reset
GameHost state/game/plan/renderer/enhancer readback
editor runtime, scene, renderer, capture, viewport, error, invoke, snapshot, and listener disposal
static, registry, render, deterministic-scene, and editor smoke checks
static Pages deployment
```

## Committed-frame finding

The host publishes one visible frame in multiple mutable steps:

```txt
1. game.tick mutates state
2. raw and enhanced plans are created
3. lastPlan is assigned
4. renderer.render performs resize, mesh/cache work, two draws, and snapshot creation
5. lastRender is assigned
```

This creates several split-authority cases:

```txt
renderer.render throws after lastPlan assignment
  -> lastPlan is new
  -> lastRender remains old
  -> state has already advanced
  -> canvas may be partially cleared/drawn

editor runtime.tick
  -> state advances
  -> no render is submitted
  -> renderer snapshot and pixels remain old

editor runtime.reset
  -> state returns to frame 0
  -> source/enhancer/renderer/canvas observations remain from the prior session frame

GameHost.getSnapshot
  -> game snapshot is created at read time
  -> enhanced plan and render snapshot come from separate retained fields
  -> no shared commit id proves coherence

renderer.capture
  -> canvas bytes and renderer snapshot are returned together
  -> neither carries a committed-frame id or state/plan fingerprint
```

## Required authority boundary

A frame must be staged and committed only after all required phases succeed:

```txt
frame request
  -> simulation result
  -> source-plan observation
  -> enhanced-plan observation
  -> renderer result
  -> optional canvas capture metadata
  -> immutable committed-frame row
  -> publish GameHost/editor/HUD projections
```

The row needs:

```txt
sessionId
runId
frameId
simulationFrame
requestTime
dt
stateFingerprint
sourceEpoch and sourceFingerprint
planId and planFingerprint
topologyKey
rendererVersion
vertex/triangle counts
canvas dimensions
cache counters
status and failure reason
committedAt
```

## Implementation order

```txt
1. Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
2. Committed Frame Observation Authority + Atomic Frame Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. Mesh Contribution Ledger + Registry Truth Fixture Gate
```

Do not start with visual fidelity, renderer replacement, WebGPU migration, CDN migration, new meadow content, or source-kit promotion.
