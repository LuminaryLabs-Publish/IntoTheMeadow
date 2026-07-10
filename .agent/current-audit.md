# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-10T19-48-39-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed static meadow route. It imports a commit-pinned external meadow source, caches one source plan, enhances it through local grass/wind/performance/postprocess services, builds a combined CPU mesh, renders through a local WebGL two-pass adapter, and publishes aggregate readback through GameHost and the Nexus headless-editor bridge.

This pass changed documentation only. It preserves the immediately preceding lifecycle finding and adds a separate source-provider authority breakdown.

## Repository selection

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` was excluded. All nine eligible repositories were present in the central ledger and had root `.agent` state.

`IntoTheMeadow` was selected from the oldest documented fallback position. A near-simultaneous lifecycle pass on the same repository became visible during the run. The run remained scoped to `IntoTheMeadow` and added source-authority documentation rather than changing to a second product repository.

## Actual interaction and session loop

```txt
browser boot
  -> resolve/import external meadow source
  -> install DSK descriptors
  -> create static game state and cached time-0 source plan
  -> construct renderer, plan enhancer, GameHost, and editor bridge
  -> requestAnimationFrame
  -> game.tick({ time, dt: 1/60 })
  -> frame and lastTick mutation only
  -> enhance cached plan
  -> build/reuse mesh buffers
  -> outline pass + cel/fog pass
  -> aggregate readback
  -> requestAnimationFrame again
```

The authored path-progress, inspection, and objective descriptors remain non-executable.

## Source-provider paths

### Browser production path

```txt
GAME_MANIFEST.externalKits[meadow-area-kit].url
  -> jsDelivr module pinned to commit 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
  -> loadExternalKits()
  -> createMeadowAreaKit export check
  -> createIntoTheMeadowGame({ externalKits })
  -> external meadow-area-kit 0.1.0 plan
```

A failed import or missing export stops boot before the local fallback can be selected.

### Direct Node/headless path

```txt
createIntoTheMeadowGame()
  -> no external factory supplied
  -> createFallbackMeadowAreaKit
  -> createLocalMeadowSourcePlan
  -> local-source-plan-v1
```

The current render-plan and deterministic-scene smoke tests use this direct path, so they primarily prove the local fallback rather than the browser's external provider.

## Domains in use

```txt
browser shell and DOM boot
web-host orchestration and frame scheduling
runtime session lifecycle and RAF ownership
resource/global ownership and cleanup
external-kit manifest and dynamic import
source-provider selection
local fallback meadow source composition
DSK registry and install validation
game manifest and content composition
source-plan caching, time overlay, and rebuild
frame/time state and game reset
story, objective, and interaction-target descriptors
render-plan contract, validation, and topology hashing
terrain and path sampling
atmosphere, scatter, focal tree, distant trees, rocks, flowers, ground cover, and grass
grass density, archetype, static batch, placement, draw-group, wind, LOD, scaling, and debug composition
wind, performance, outline, color, fog, vignette, and final-composite policy
CPU mesh construction
WebGL context, shaders, buffers, mesh cache, resize, draw, snapshot, and disposal
GameHost global diagnostics exposure
Nexus editor capability exposure
browser error/rejection observation
Node smoke fixtures
static Pages deployment
```

Declared but not runtime-authoritative:

```txt
player movement
camera control
input mapping
interaction preflight
command dispatch
objective and story mutation
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

## Registry kit families

`dsk-registry.json` declares one external kit plus 44 local kits covering game/host/composition, meadow area/terrain/path, nine grass services, wind/tree/scatter/atmosphere, player/camera/input/interaction/story/objective, ecology/audio/UI/save/diagnostics/performance, render host/WebGL/postprocess, and static Pages deployment.

Registry status remains descriptive. It is not proof that every declared service has an active runtime implementation.

## Services offered

```txt
commit-pinned external source import
external area/path/style/material normalization
external deterministic meadow descriptor generation
local deterministic fallback descriptor generation
source validation and source snapshots
DSK descriptor lookup, validation, and install snapshots
source-plan caching and rebuild
terrain/path sampling and topology hashing
grass density, archetype, static batch, placement, draw-group, wind, LOD, scaling, and debug composition
tree, wind, performance, and postprocess enhancement
CPU geometry generation
WebGL context acquisition and float-precision normalization
shader compilation and program linking
buffer construction, topology-keyed reuse, resize, outline draw, cel/fog draw, snapshot, and renderer disposal
frame/time tick and game reset
GameHost state, game, render-plan, renderer, and enhancer readback
editor runtime, scene, renderer, capture, viewport, error, invoke, snapshot, and listener disposal services
static, registry, render, deterministic-scene, and editor smoke commands
```

## Lifecycle finding

```txt
boot-game.js discards the resolved host controller
web-host.js does not retain the RAF id
stop() changes only a boolean
start() can schedule while an older callback remains pending
renderer.dispose() and editorBridge.dispose() are not coordinated by the host
GameHost and NexusEditorEnvironment can outlive their session
```

The lifecycle fixture gate remains the first implementation boundary.

## Source-provider finding

```txt
browser and Node paths select different providers implicitly
browser import failure cannot reach the local fallback
install state proves factory presence, not provider identity or compatibility
external and fallback plans use different version identities, generation logic, snapshot shapes, validation strength, and object IDs
fallback validate() claims representative without parity evidence
source URL, commit, selected provider, selection reason, source fingerprint, and source epoch are not retained as one immutable observation
rebuildRenderPlan() has no source lineage or reason row
render, GameHost, editor, and future gameplay observations cannot identify the source plan consumed
no fixture compares external and fallback plans through enhancer, mesh, renderer, and target resolution
```

## Current implementation order

```txt
1. IntoTheMeadow Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
2. IntoTheMeadow Source Provider Authority + External/Fallback Parity Fixture Gate
3. IntoTheMeadow Interaction Command Authority + Objective Progress Fixture Gate
4. Mesh Contribution Ledger + Registry Truth Fixture Gate
```

Do not start with visual fidelity, renderer replacement, CDN migration, new meadow content, or shared-kit promotion.