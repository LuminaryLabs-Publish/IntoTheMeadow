# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-10T22-58-36-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed static meadow route with a commit-pinned external source, local render-plan enhancement, a combined CPU/WebGL renderer, and GameHost/headless-editor observation surfaces.

This documentation-only pass advances the existing lifecycle finding into a source-backed session ownership and rollback contract. Runtime behavior was not changed.

## Repository selection

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` was excluded. All nine eligible repositories were present in the central ledger and had root `.agent` state.

Central timestamps at selection:

```txt
IntoTheMeadow       2026-07-10T21-19-36-04-00 selected
TheOpenAbove        2026-07-10T21-31-01-04-00
HorrorCorridor      2026-07-10T21-39-22-04-00
PhantomCommand      2026-07-10T21-49-26-04-00
ZombieOrchard       2026-07-10T22-11-24-04-00
TheUnmappedHouse    2026-07-10T22-21-17-04-00
MyCozyIsland        2026-07-10T22-29-21-04-00
PrehistoricRush     2026-07-10T22-42-00-04-00
AetherVale          2026-07-10T22-50-02-04-00
TheCavalryOfRome    excluded
```

## Interaction loop

```txt
browser loads index.html
  -> boot-game.js locates canvas and HUD elements
  -> startWebHost begins asynchronous construction
  -> external meadow-area-kit is imported from the manifest URL
  -> game creates DSK install, source kit, cached source plan, and state
  -> WebGL renderer and plan enhancer are created
  -> global GameHost is assigned
  -> global NexusEditorEnvironment and error listeners are installed
  -> one RAF is requested
  -> frame mutates state with fixed dt
  -> source plan receives absolute time
  -> enhancer derives the active render plan
  -> renderer draws outline and cel/fog passes
  -> debug HUD projects diagnostics
  -> another RAF is requested
```

Editor capabilities separately expose runtime tick/reset, scene reads, renderer reads, canvas capture, viewport reads, and browser-error reads.

## Domains in use

```txt
browser shell and DOM boot
runtime session construction
runtime lifecycle and RAF scheduling
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
GameHost global exposure
Nexus editor global exposure, capability routing, and browser-error listeners
HUD and loading/fatal projection
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
headless-editor bridge
```

The registry declares one external kit and 44 local kit descriptors. Registry membership is not proof of live implementation consumption.

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
frame/time tick and reset
GameHost state/game/plan/renderer/enhancer readback
editor tick/reset/scene/render/capture/viewport/error services
editor listener disposal primitive
static, registry, render, deterministic-scene, and editor smoke checks
static Pages deployment
```

## Lifecycle ownership finding

`boot-game.js` invokes `startWebHost(...).catch(...)` and discards the resolved controller. The caller therefore cannot stop, restart, or dispose the runtime it created.

`startWebHost()` constructs resources and side effects in this order:

```txt
external module
  -> game
  -> renderer/WebGL program
  -> enhancer
  -> global GameHost
  -> editor listeners and global NexusEditorEnvironment
  -> RAF request
```

There is no cleanup stack and no rollback path if a later step fails.

The returned controller exposes only:

```txt
game
renderer
planEnhancer
editorBridge
stop()
start()
```

`stop()` only sets `stopped = true`. It does not retain or cancel the pending RAF. `start()` schedules a new RAF when `stopped` is true. If restart occurs before the old pending callback executes, both callbacks later observe `stopped === false`, both render, and both schedule successors.

`showFatal()` also only sets the Boolean and updates DOM. It does not dispose the renderer, remove editor listeners, release globals, invalidate enhancer caches, or publish a terminal lifecycle result.

## Existing cleanup primitives

```txt
renderer.dispose()
  -> delete active attribute buffers
  -> delete WebGL program
  -> clear mesh cache references

editorBridge.dispose()
  -> remove error and rejection listeners
  -> delete NexusEditorEnvironment when it still owns that global
```

Missing primitives:

```txt
GameHost lease/release
runtime session identity
RAF ownership and cancellation
resource ownership ledger
reverse-order startup rollback
terminal host dispose
restart transaction
fatal failure result
bounded lifecycle journal
render-after-dispose rejection
```

## Required authority boundary

One `runtime-session-authority-domain` must own construction, start, stop, restart, fatal transition, and disposal.

```txt
create session
  -> register cleanup immediately after each acquisition
  -> start and retain exactly one RAF id
  -> stop by cancelling the owned RAF
  -> restart as one fenced transaction with incremented runId
  -> dispose in reverse ownership order
  -> restore/delete only globals leased by this session
  -> publish typed lifecycle results and a bounded journal
```

Required states:

```txt
created
starting
running
stopping
stopped
restarting
disposing
disposed
failed
```

## Implementation order

```txt
1. Runtime Session Lifecycle Authority + Stop/Restart/Dispose/Rollback Fixture Gate
2. Committed Frame Observation Authority + Atomic Frame Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. Mesh Contribution Ledger + Registry Truth Fixture Gate
```

Do not start with visual fidelity, renderer replacement, WebGPU migration, CDN migration, new meadow content, or source-kit promotion.
