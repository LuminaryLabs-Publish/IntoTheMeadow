# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-10T19-48-09-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed static meadow route. It imports a commit-pinned external meadow source, caches one source plan, enhances it through local grass/wind/performance/postprocess services, builds a combined CPU mesh, renders through a local WebGL two-pass adapter, and publishes aggregate readback through GameHost and the Nexus headless-editor bridge.

This pass changed documentation only.

## Repository selection

The accessible `LuminaryLabs-Publish` installation contains ten repositories. `TheCavalryOfRome` was excluded. All nine eligible repositories were present in the central ledger and had root `.agent` state. `AetherVale` advanced to `2026-07-10T19-38-41-04-00`; `IntoTheMeadow` remained the oldest stable documented fallback at `2026-07-10T18-22-01-04-00` and was the only product repository changed.

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

The authored path-progress, inspection, and objective descriptors remain non-executable. This pass identified a more foundational host gap: the runtime can start, but there is no authoritative session owner proving stop, restart, rollback, and disposal.

## Domains in use

```txt
browser shell and DOM boot
web-host orchestration and frame scheduling
external-kit dynamic import
fallback meadow source composition
DSK registry and install validation
game manifest and content composition
frame/time state and game reset
story, objective, and interaction-target descriptors
render-plan contract, validation, and topology hashing
terrain and path sampling
atmosphere, scatter, focal tree, distant trees, rocks, flowers, ground cover, and grass
wind, performance, outline, color, fog, vignette, and final-composite policy
CPU mesh construction
WebGL context, shaders, buffers, mesh cache, resize, draw, snapshot, and disposal
GameHost global diagnostics exposure
Nexus editor capability exposure
browser error/rejection observation
runtime lifecycle, RAF ownership, resource ownership, and global ownership
static Pages deployment and smoke validation
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
commit-pinned source import and source-plan creation
local fallback source-plan creation
DSK descriptor lookup, validation, and install snapshots
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
boot-game.js starts the host but discards the resolved controller
web-host.js schedules RAF callbacks without retaining the RAF id
stop() changes only a boolean
start() schedules a new callback without proving an older callback is absent
showFatal() does not coordinate cleanup
renderer.dispose() exists but is never called by the host
editorBridge.dispose() exists but is never called by the host
GameHost has no lifecycle status, stop, restart, dispose, or release service
GameHost and NexusEditorEnvironment can outlive the session that installed them
```

A stop followed by start before the already scheduled callback runs can allow both the prior callback and newly scheduled callback to continue because both see the running flag restored. Even without that race, normal boot makes the host controller unreachable.

## Current ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
```

The previously documented interaction-command/objective-progress slice remains next after lifecycle idempotency. External-source provenance/fallback parity, mesh-contribution proof, and registry-truth classification remain companion gates.