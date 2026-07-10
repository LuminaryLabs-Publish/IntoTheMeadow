# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T19-48-09-04-00`

## Goal

Document the active IntoTheMeadow runtime as one system, identify every domain, kit, and service currently present, and define the smallest implementation-safe boundary needed to make browser/editor sessions stoppable, restartable, and disposable without changing the meadow presentation.

## Plan ledger

- [x] Read the complete accessible `LuminaryLabs-Publish` repository inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the remaining repositories against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Apply the oldest documented-selection rule.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Read the current root `.agent` state.
- [x] Inspect browser boot, host orchestration, game construction, GameHost exposure, editor bridge, plan enhancer, and renderer disposal paths.
- [x] Identify the interaction loop, all domains, all implemented and declared kits, and all offered services.
- [x] Record lifecycle, render, interaction, editor, and deploy gaps.
- [x] Update root `.agent` pointers and ledgers.
- [x] Change no runtime source, dependencies, routes, or deployment configuration.

## Selection comparison

The accessible Publish installation contains ten repositories:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

`TheCavalryOfRome` is excluded. All nine remaining repositories are represented in the central ledger and have root `.agent` state. `AetherVale` advanced to `2026-07-10T19-38-41-04-00`; the prior stable `IntoTheMeadow` audit remained `2026-07-10T18-22-01-04-00`, making it the oldest eligible documented fallback.

## Actual interaction and session loop

```txt
index.html
  -> boot-game.js resolves DOM handles
  -> startWebHost() imports the external meadow kit
  -> createIntoTheMeadowGame() installs descriptors and caches a time-0 source plan
  -> create renderer, enhancer, GameHost, and editor bridge
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1/60 })
  -> enhance cached plan
  -> build or reuse CPU mesh buffers
  -> WebGL outline pass
  -> WebGL cel/fog pass
  -> publish aggregate snapshots
  -> schedule the next frame
```

The gameplay descriptors still do not form an executable movement/inspect/objective loop. This pass found an earlier host-level invariant: the active runtime can start, but it has no authoritative lifecycle owner capable of proving stop, restart, fatal rollback, and disposal.

## Domains in use

```txt
browser document and DOM boot
web-host construction and frame scheduling
external-kit URL resolution and dynamic import
fallback meadow source composition
DSK registry and install validation
game manifest and content composition
frame/time state and reset
story, objective, and interaction-target descriptors
render-plan schema, validation, and topology hashing
terrain and path sampling
atmosphere, scatter, trees, rocks, flowers, ground cover, and grass
wind, performance, outline, color, fog, vignette, and composite policy
CPU mesh generation
WebGL context, shader, buffer, cache, resize, draw, snapshot, and disposal
GameHost global diagnostics exposure
Nexus headless-editor capability exposure
browser error and rejection observation
runtime lifecycle and global ownership
static GitHub Pages deployment and Node smoke checks
```

Declared but not runtime-authoritative:

```txt
player movement
camera control
input mapping
interaction preflight
command dispatch
objective/story mutation
audio
save/load
UI projection
```

## Implemented and source-backed kits

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

## Registry-declared kits

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

## Services offered

```txt
commit-pinned source import
fallback source-plan creation
DSK descriptor lookup, validation, and install snapshots
terrain/path sampling and stable topology hashing
grass density, archetype, static batch, placement, draw-group, wind, LOD, scaling, and debug composition
tree, wind, performance, and postprocess enhancement
CPU geometry generation
WebGL context acquisition and precision normalization
shader compilation and program linking
buffer creation, topology-keyed reuse, resize, two-pass draw, snapshot, and renderer disposal
frame/time tick and game reset
GameHost state, game, render-plan, renderer, and enhancer readback
editor runtime, scene, renderer, capture, viewport, errors, invoke, snapshot, and editor-listener disposal
static, registry, render, deterministic-scene, and editor smoke commands
```

## Main finding

Lifecycle ownership is split and incomplete:

```txt
boot-game.js discards the resolved host object
web-host.js does not retain the requestAnimationFrame id
stop() only flips a boolean
start() schedules another frame without proving no prior callback is pending
showFatal() stops scheduling but performs no rollback or disposal
renderer.dispose() exists but the host never calls it
editorBridge.dispose() exists but the host never calls it
GameHost has no lifecycle status, stop, restart, dispose, or unexpose method
NexusEditorEnvironment and GameHost can outlive the session that created them
```

A stop-then-start call made before the already scheduled callback executes can allow both the old callback and the newly scheduled callback to continue because both observe `stopped === false`. The normal boot path also makes the returned stop/start object unreachable.

## Next safe ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
```

Implement a single host-owned session with a session id, lifecycle state, retained RAF id, idempotent stop/dispose, ordered teardown, fatal-start rollback, explicit global leases, and deterministic restart fixtures. Preserve the current renderer, source plan, external kit pin, visual output, GameHost legacy reads, and editor protocol.

The interaction-command/objective-progress slice remains the next gameplay authority task after lifecycle cleanup is deterministic.

## Validation

Documentation only. No runtime source, package scripts, dependencies, route behavior, renderer output, or deployment configuration changed. Existing Node, browser, WebGL, and editor checks were not run. No branch or pull request was created.