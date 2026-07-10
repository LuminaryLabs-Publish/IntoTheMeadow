# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-10T16-51-37-04-00`

## Summary

`IntoTheMeadow` is a deterministic, DSK-composed static meadow route. It imports a commit-pinned external `meadow-area-kit`, caches one source plan, adds local grass/wind/performance/postprocess descriptors, converts the enhanced plan to one CPU-built mesh, renders it through a local two-pass WebGL adapter, and exposes aggregate state through `GameHost` and a Nexus headless-editor bridge.

This pass changed documentation only.

## Repository selection

The full accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` was excluded. All nine eligible repositories were centrally tracked and had root `.agent` state. Recent central updates placed `IntoTheMeadow` behind AetherVale, PrehistoricRush, TheOpenAbove, MyCozyIsland, TheUnmappedHouse, ZombieOrchard, PhantomCommand, and HorrorCorridor, so `IntoTheMeadow` was the oldest eligible documented fallback.

## Interaction loop

```txt
index.html
  -> boot-game.js captures canvas/status/debug nodes
  -> startWebHost resolves GAME_MANIFEST.externalKits
  -> dynamic import of meadow-area-kit from a commit-pinned jsDelivr URL
  -> createIntoTheMeadowGame installs DSK descriptors
  -> external createMeadowAreaKit builds the deterministic source plan
  -> source plan is cached at time 0
  -> requestAnimationFrame calls game.tick({ time, dt })
  -> advanceGameState updates frame and lastTick only
  -> getRenderPlan overlays time onto the cached plan
  -> createRenderPlanEnhancer adds grass/wind/postprocess/performance descriptors
  -> buildMeadowMeshData combines supported descriptor families
  -> renderer reuses or rebuilds buffers by topologyKey
  -> outline pass and cel/fog pass
  -> aggregate snapshot flows to HUD, GameHost, and NexusEditorEnvironment
```

## Domains in use

```txt
browser shell and DOM boot
web host orchestration
external kit source resolution and dynamic import
DSK registry and installation validation
arrival meadow source composition
local fallback source-plan composition
render-plan v2 contract and topology hashing
terrain/path sampling
atmosphere and distant horizon geometry
texture-driven grass descriptors
flower, ground-cover, rock, distant-tree, and focal-tree geometry
wind animation descriptors
performance and outline policy
postprocess descriptor composition
CPU mesh construction
WebGL buffer lifecycle and two-pass rendering
state/snapshot diagnostics
objective and interaction-target content descriptors
GameHost readback
Nexus headless-editor environment bridge
static Pages deployment
```

## Runtime source-backed kits

```txt
external meadow-area-kit 0.1.0 at commit 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
fallback-meadow-area-kit
install-dsks
meadow-render-plan-v2
meadow-render-plan-enhancer-v2
meadow-webgl-renderer-v2
meadow-mesh-builder-v2
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

## Registry-declared kit families

`dsk-registry.json` declares 44 local kits plus one external kit. The registry covers game/host/composition, area/terrain/path, nine grass kits, wind/tree/scatter/atmosphere, player/camera/input/interaction/story/objective, ecology/audio/UI/save/diagnostics/performance, render host/WebGL/postprocess passes, and static Pages deploy.

`src/dsks/index.js` gives each registry entry named service subdomains and labels entries in `requiredForV01` as `active-v0.1`. That remains descriptor status rather than proof of a concrete implementation module.

## Services offered

```txt
external meadow plan creation, validation, snapshot, reset, and optional runtime-kit installation
local fallback meadow plan creation, validation, and snapshot
DSK descriptor registry, lookup, validation, and install snapshot
terrain/path sampling and deterministic topology hashing
grass density, archetype, static batch, patch placement, draw-group, wind, LOD, scale, and debug services
focal-tree enhancement and wind/performance/postprocess policy composition
CPU geometry generation for supported descriptor families
WebGL context, shader, buffer cache, resize, outline, cel/fog, render, snapshot, and disposal
state tick/reset and aggregate diagnostics
GameHost state, game snapshot, render plan, renderer snapshot, and enhancer snapshot
headless-editor runtime, scene, renderer, capture, viewport, and error commands
static smoke, render-plan, renderer, deterministic-scene, and editor smoke commands
```

## Main finding

The current blocker is **external source provenance and fallback parity**, layered on top of the existing mesh-contribution truth gap.

`GAME_MANIFEST` pins the external source to a specific repository commit, but `loadExternalKits()` returns only the factory function. `installDsks()` records `loaded` solely from function presence. The source URL, repository, commit, exported `MEADOW_AREA_KIT_VERSION`, validation result, snapshot fingerprint, and selected source mode never enter the runtime proof surface.

The local fallback is not an operational browser recovery path. `startWebHost()` awaits the external import before game creation and hard-fails when the URL, import, or expected export fails. `createFallbackMeadowAreaKit()` is used only when callers omit `externalKits`, and its `validate()` always returns passed/representative without comparing its output with the external kit.

External and fallback plans are not equivalent: the external kit creates normalized path data, thousands of grass blades, mushrooms, richer atmosphere, and a `0.1.0` plan, while the fallback produces a reduced local-source-plan-v1 descriptor set. No fixture defines which differences are acceptable or proves that either mode satisfies the render-plan v2 consumer contract.

## Current ledge

```txt
IntoTheMeadow External Meadow Source Provenance + Fallback Parity Fixture Gate
```

The previously identified mesh-contribution ledger and registry-truth fixture remain required companion work.