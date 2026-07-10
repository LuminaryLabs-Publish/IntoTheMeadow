# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T19-48-39-04-00`

## Goal

Establish the actual source-authority boundary between the commit-pinned external `meadow-area-kit`, the local fallback source, the cached render plan, downstream enhancement/rendering, and the Node/browser proof paths without modifying runtime code.

## Plan ledger

```txt
[x] Enumerate the full accessible LuminaryLabs-Publish organization inventory.
[x] Exclude LuminaryLabs-Publish/TheCavalryOfRome.
[x] Compare all nine eligible repositories against the central ledger.
[x] Check each eligible repository's root .agent timestamp.
[x] Select only the oldest eligible documented fallback.
[x] Read the selected repository's current .agent state.
[x] Trace browser boot, external import, fallback selection, source-plan caching, enhancement, rendering, GameHost, editor, tests, and deployment.
[x] Identify the interaction loop.
[x] Identify active, declared, and inactive domains.
[x] Inventory all external, runtime-backed, registry-declared, and planned proof kits.
[x] Inventory the services those kits provide.
[x] Add source-authority, architecture, render, gameplay, interaction, and deployment audits.
[x] Refresh all required root .agent files.
[x] Push documentation only to main.
[x] Update the central repo ledger and internal change log.
```

## Selection result

The accessible organization inventory contains ten repositories:

```txt
IntoTheMeadow       2026-07-10T18-22-01-04-00 selected
HorrorCorridor      2026-07-10T18-31-21-04-00
PhantomCommand      2026-07-10T18-40-13-04-00
ZombieOrchard       2026-07-10T18-49-54-04-00
TheUnmappedHouse    2026-07-10T19-00-19-04-00
MyCozyIsland        2026-07-10T19-11-19-04-00
TheOpenAbove        2026-07-10T19-18-39-04-00
PrehistoricRush     2026-07-10T19-30-36-04-00
AetherVale          2026-07-10T19-38-41-04-00
TheCavalryOfRome    excluded by rule
```

All nine eligible repositories were represented in the central ledger and had root `.agent` state. `IntoTheMeadow` was therefore the oldest eligible documented fallback. Only this product repository was changed.

## Actual interaction and frame loop

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost()
  -> load GAME_MANIFEST external meadow-area-kit URL
  -> dynamic import must expose createMeadowAreaKit or boot throws
  -> createIntoTheMeadowGame({ externalKits })
  -> install DSK descriptors
  -> create one meadow source and cache its time-0 render plan
  -> requestAnimationFrame
  -> game.tick({ time: now / 1000, dt: 1 / 60 })
  -> frame and lastTick mutation only
  -> get cached plan with a time overlay
  -> enhance source descriptors into render-plan v2
  -> build/reuse CPU mesh and WebGL buffers
  -> outline pass and cel/fog pass
  -> publish aggregate HUD, GameHost, and editor snapshots
```

The authored `path-progress` and `inspect` actions remain descriptors only. This pass does not replace the prior interaction-authority finding; it isolates the source boundary underneath the visual and future gameplay paths.

## Source paths in use

### Browser production path

```txt
GAME_MANIFEST.externalKits[meadow-area-kit].url
  -> jsDelivr commit-pinned module
  -> loadExternalKits()
  -> createMeadowAreaKit
  -> browser meadow source
```

A failed import or missing export stops browser startup before any local fallback can be selected.

### Node/headless path

```txt
createIntoTheMeadowGame()
  -> options.externalKits is empty
  -> createFallbackMeadowAreaKit
  -> createLocalMeadowSourcePlan
  -> local fallback source
```

The existing deterministic and render-plan smoke tests call `createIntoTheMeadowGame()` without the external kit, so they primarily prove the local fallback path rather than the browser's CDN source path.

## Domains in use

```txt
browser shell and DOM boot
web-host lifecycle and requestAnimationFrame orchestration
external source manifest and dynamic import
source provider selection
local fallback source generation
DSK registry and install validation
source-plan caching and rebuild
render-plan v2 validation and topology hashing
terrain and path descriptors
atmosphere, scatter, tree, grass, flower, rock, and ground-cover descriptors
grass density, archetype, placement, batching, draw-group, wind, LOD, scale, and debug composition
performance, outline, and postprocess policy
CPU mesh construction
WebGL context, shader, buffer cache, two-pass rendering, snapshots, and disposal
frame/time state and reset
story, objective, and interaction-target content descriptors
GameHost diagnostic readback
Nexus headless-editor environment
Node smoke fixtures
static GitHub Pages deployment
```

Declared but not runtime-authoritative:

```txt
player movement
camera control
browser input mapping
interaction preflight and dispatch
objective/story mutation
audio, UI, and save/load
```

## Kit inventory

### External implementation-backed

```txt
meadow-area-kit 0.1.0
LuminaryLabs-Agents/NexusEngine-ProtoKits
commit 11d245913ba4d30f3ce950eb5a17e1cc6e4aa1f5
```

### Runtime source-backed

```txt
fallback-meadow-area-kit
install-dsks
meadow-render-plan-v2
meadow-render-plan-enhancer-v2
meadow-mesh-builder-v2
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
GameHost diagnostics surface
headless-editor bridge
```

### Registry-declared local kits

```txt
into-the-meadow-game-dsk
web-host-dsk
game-composition-dsk
meadow-area-bridge-dsk
meadow-terrain-texture-dsk
path-corridor-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
grass-patch-dsk
gpu-grass-render-dsk
wind-field-dsk
tree-object-dsk
meadow-scatter-dsk
meadow-atmosphere-dsk
meadow-player-dsk
meadow-camera-dsk
meadow-input-dsk
meadow-interaction-dsk
meadow-story-dsk
meadow-objective-dsk
meadow-ecology-dsk
meadow-audio-dsk
meadow-ui-dsk
meadow-save-dsk
meadow-diagnostics-dsk
meadow-performance-dsk
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
post-process-stack-dsk
render-target-kit
sobel-outline-pass-kit
color-grade-pass-kit
depth-fog-pass-kit
vignette-pass-kit
final-composite-pass-kit
static-pages-deploy-dsk
```

Registry status remains descriptor membership rather than implementation-consumption proof.

## Services offered

```txt
commit-pinned external source import
external meadow area normalization and deterministic source-plan generation
local deterministic fallback source-plan generation
source validation and source snapshots
DSK lookup, local validation, external loaded/deferred snapshots
source-plan caching and explicit rebuild
terrain/path/material and object descriptor production
grass density, archetype, placement, batching, draw-group, wind, LOD, scaling, and debug descriptors
tree/wind/performance/postprocess enhancement
render-plan validation and topology hashing
CPU geometry construction
WebGL context, shader, buffer, resize, outline, cel/fog, snapshot, and disposal
frame/time tick and reset
aggregate GameHost state/game/render/enhancer readback
editor runtime, scene, renderer, capture, viewport, and error capabilities
static, registry, render-plan, renderer, deterministic-scene, and editor smoke checks
static Pages build and deployment
```

## Main finding

Source selection is not an authoritative, observable contract.

```txt
browser path hard-fails on external import failure
local fallback is not a browser failover
Node checks silently choose the fallback because no external factory is supplied
external and fallback plans expose different source versions and generation logic
fallback validation marks itself representative without parity evidence
source URL, commit, provider kind, factory version, plan fingerprint, and selection reason are not retained as one immutable row
rebuildRenderPlan has no source epoch or lineage
GameHost/editor/render snapshots cannot prove which source produced the displayed frame
no fixture compares external and fallback source plans through enhancement, mesh construction, and renderer readback
```

## Next safe ledge

```txt
IntoTheMeadow Source Provider Authority
+ External/Fallback Parity Fixture Gate
```

Implement this before CDN migration, source-kit promotion, renderer replacement, new meadow content, or visual tuning. The previously documented interaction-command authority remains the next gameplay boundary after source identity is made explicit and testable.

## Validation

Documentation only. Runtime source, dependencies, package scripts, renderer behavior, routes, and deployment workflows were not modified. No branch or pull request was created.