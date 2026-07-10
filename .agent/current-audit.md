# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-10T15-18-29-04-00`

## Summary

`IntoTheMeadow` is a deterministic, DSK-composed static meadow route. It loads an external `meadow-area-kit`, adds local grass/wind/performance/postprocess descriptors, converts the plan to one CPU-built mesh, renders it through a local two-pass WebGL adapter, and exposes aggregate state through `GameHost` and a Nexus headless-editor bridge.

This pass changed documentation only.

## Repository selection

The full accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` was excluded. The remaining nine repositories were already centrally tracked and had sampled root `.agent` state. `IntoTheMeadow`, last centrally advanced at `2026-07-10T13-50-05-04-00`, was the oldest eligible documented fallback.

## Interaction loop

```txt
index.html
  -> boot-game.js captures canvas/status/debug nodes
  -> startWebHost dynamically imports meadow-area-kit
  -> createIntoTheMeadowGame installs DSK descriptors
  -> meadow.getRenderPlan creates the cached deterministic source plan
  -> createRenderPlanEnhancer adds grass/wind/postprocess/performance descriptors
  -> requestAnimationFrame calls game.tick({ time, dt })
  -> advanceGameState updates frame and lastTick only
  -> buildMeadowMeshData combines all supported descriptor families into one mesh
  -> renderer reuses or rebuilds buffers by topologyKey
  -> outline pass + cel/fog pass
  -> aggregate snapshot flows to HUD, GameHost, and NexusEditorEnvironment
```

## Domains in use

```txt
browser shell and DOM boot
web host orchestration and external-kit import
DSK registry/installation validation
arrival meadow source composition
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
external meadow-area-kit
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

`src/dsks/index.js` assigns each registry entry five named service subdomains and labels entries in `requiredForV01` as `active-v0.1`. That is descriptor status, not proof that every listed service has a dedicated implementation module.

## Services offered

```txt
meadow plan creation, rebuild, validation, and snapshot
DSK descriptor registry, lookup, validation, and install snapshot
terrain/path sampling and deterministic topology hashing
grass density, archetype, static batch, patch placement, draw-group, wind, LOD, scale, and debug services
focal-tree enhancement and wind/performance/postprocess policy composition
CPU geometry generation for all currently supported descriptor families
WebGL context, shader, buffer cache, resize, outline, cel/fog, render, snapshot, and disposal
state tick/reset and aggregate diagnostics
GameHost state, game snapshot, render plan, renderer snapshot, and enhancer snapshot
headless-editor runtime, scene, renderer, capture, viewport, and error commands
static smoke, render-plan, renderer, deterministic-scene, and editor smoke commands
```

## Main finding

The critical gap is **measured mesh contribution proof**.

`buildMeadowMeshData()` calls each geometry stage, but it never records source IDs, attempted descriptor counts, skipped entries, emitted vertices, emitted triangles, or reasons. The returned `descriptorCounts` are copied from the input contract, and `primitiveFallbackCount` is always `0`. The renderer then republishes those values, so downstream consumers cannot distinguish measured consumption from an echoed expectation.

The registry has a related truth gap: `active-v0.1` is inferred from list membership rather than implementation-backed evidence.

## Current ledge

```txt
IntoTheMeadow Mesh Contribution Ledger + Registry Truth Fixture Gate
```