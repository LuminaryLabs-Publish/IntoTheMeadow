# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T22-08-13-04-00`

## Summary

`IntoTheMeadow` contains one external meadow provider, 43 local DSK/kit declarations, descriptor-driven scene composition, CPU mesh construction, a persistent WebGL renderer, browser `GameHost` and editor surfaces, and a Node headless-editor environment.

This pass audits render-surface resolution. The browser canvas fills the viewport through CSS, while the renderer samples live CSS dimensions and device pixel ratio inside every render call. It directly mutates the drawing buffer, configures the GL viewport and derives projection aspect without a pixel budget, capability admission, resize generation, fallback result, committed surface revision or capture/frame correlation.

## Plan ledger

**Goal:** define one bounded and revisioned surface transaction from viewport observation through actual WebGL drawing-buffer readback, projection, visible-frame acknowledgement and capture.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible central ledgers and root `.agent` states.
- [x] Detect active unsynchronized `AetherVale` lifecycle work.
- [x] Select only `IntoTheMeadow` as the oldest stable eligible repository.
- [x] Inspect `AGENTS.md`, `index.html`, browser host, renderer, editor bridge and browser observation script.
- [x] Identify the interaction loop, all domains, all kits and every declared service.
- [x] Define the render-surface parent domain and fixture boundary.
- [x] Change documentation only.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
AetherVale         central 20:30, active repo-local 22:08 lifecycle audit, skipped
IntoTheMeadow      central 20:38, selected oldest stable
MyCozyIsland       central 20:51
PrehistoricRush    central 21:00
TheOpenAbove       central 21:08
HorrorCorridor     central 21:21
PhantomCommand     central 21:31
ZombieOrchard      central 21:40
TheUnmappedHouse   central 21:48
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was changed in the Publish organization.

## Interaction loop

```txt
browser boot
  -> full-window CSS canvas
  -> external kit load
  -> game, renderer and enhancer creation
  -> GameHost and browser editor exposure
  -> request RAF

browser frame
  -> game.tick
  -> get and enhance render plan
  -> renderer.render
  -> sample canvas.clientWidth / clientHeight and live DPR
  -> clamp DPR to 1 through 2
  -> mutate canvas.width / canvas.height
  -> gl.viewport with requested dimensions
  -> derive perspective aspect from requested dimensions
  -> bind persistent mesh buffers
  -> draw outline pass
  -> draw color pass
  -> publish renderer snapshot without surface dimensions

editor observation
  -> browser.getViewport reads live viewport, DPR and canvas dimensions
  -> renderer.capture reads canvas dimensions and data URL
  -> latest renderer snapshot attaches independently
  -> no surface revision or frame ID joins those observations
```

## Domains in use

```txt
browser shell, DOM boot and visible failure projection
fixed CSS canvas and viewport layout
DOM viewport, orientation and visibility observation
device-pixel-ratio observation and quality policy
render pixel budget and WebGL surface capability
resize command, generation, coalescing and stale rejection
drawing-buffer allocation, fallback and surface commit
camera projection and aspect derivation
renderer snapshot, capture and visible-frame correlation
external dependency manifest and dynamic provider loading
source-provider selection, validation and fallback
DSK census, descriptor generation, validation and install reporting
game state, snapshots, diagnostics, tick and reset
runtime lifecycle, RAF scheduling, pause/start and disposal
runtime clock, step admission, reset epoch and work budgets
GameHost capability exposure and browser editor adapters
Node headless editor, workspace and artifact operations
player, input, interaction, objective and story declarations
terrain, path, materials, scatter and atmosphere
grass density, archetypes, batching, placement, instancing, wind and LOD
tree, wind, performance and post-process enhancement
render-plan v2 contract, topology identity and cache policy
CPU mesh construction
WebGL context, shader program, buffers, draw, resize and disposal
WebGL context recovery and resource generations
committed-frame staging, observation and capture freshness
fatal failure classification, quarantine, cleanup and cold restart
static checks, browser observation, build and Pages deployment
DSK implementation, dependency, consumption and retirement truth
```

## Complete kit inventory and services

### External kit

```txt
meadow-area-kit
  area/path/style/material normalization
  deterministic seeded scatter
  grass, flower, rock, mushroom and tree descriptors
  wind and atmosphere descriptors
  render-plan generation
  validation, snapshot, reset and optional runtime adapter
```

### Local game, host and composition

```txt
into-the-meadow-game-dsk
  game-manifest, kit-stack-registry, game-state-root, boot-sequence, game-snapshot
web-host-dsk
  document-shell, browser-loop, host-debug-surface, asset-loading-host, browser-safety
game-composition-dsk
  dsk-registry, scene-composition, render-composition, simulation-composition, composition-validation
meadow-area-bridge-dsk
  meadow-area-config, meadow-feature-config, meadow-area-kit-adapter, meadow-area-state, meadow-area-validation
```

### Terrain, path and grass

```txt
meadow-terrain-texture-dsk
  terrain-surface-model, material-layer-system, path-layer-system, terrain-sampler, terrain-validation
path-corridor-dsk
  path-curve-model, walkable-corridor, path-surface-detail, path-progression, path-validation
grass-density-texture-kit
  density-texture-model, density-channels, density-compositor, density-sampler, density-validation
grass-clump-archetype-kit
  clump-family-registry, card-layout-generator, texture-atlas-binding, clump-variant-generator, archetype-validation
grass-static-batch-kit
  clump-mesh-builder, batch-variant-cache, atlas-material, static-batch-lod, batch-validation
grass-patch-placement-kit
  patch-grid, density-driven-placement, clump-instance-selection, patch-instance-buffer, placement-validation
grass-clump-instancing-render-kit
  batch-registry, instance-stream, draw-group-builder, shader-binding, render-validation
grass-shader-wind-kit
  wind-uniforms, tip-bend-model, phase-field, gust-response, wind-validation
grass-lod-policy-kit
  near-lod, mid-lod, far-lod, terrain-tint-lod, lod-validation
grass-density-scaling-kit
  quality-scale, budget-scale, density-scale, profile-scale, scale-validation
grass-debug-visualization-kit
  density-view, patch-view, instance-view, lod-view, debug-validation
grass-patch-dsk
  patch-grid, blade-distribution, terrain-awareness, wind-binding, grass-validation
gpu-grass-render-dsk
  grass-instance-buffer, grass-blade-mesh, shader-wind, grass-lod-render, grass-render-validation
```

### World, player and experience

```txt
wind-field-dsk
  wind-state, wind-sampler, wind-zones, wind-consumers, wind-validation
tree-object-dsk
  focal-tree-model, tree-line-model, tree-materials, tree-wind-binding, tree-validation
meadow-scatter-dsk
  flower-scatter, rock-scatter, mushroom-scatter, placement-rules, scatter-validation
meadow-atmosphere-dsk
  sky-gradient, sun-system, cloud-layer, distant-hills, atmosphere-validation
meadow-player-dsk
  player-state, movement-profile, terrain-contact, player-actions, player-validation
meadow-camera-dsk
  camera-mode, camera-rig, camera-collision, camera-feel, camera-validation
meadow-input-dsk
  action-map, device-bindings, input-context, input-normalization, input-validation
meadow-interaction-dsk
  interactable-registry, affordance-rules, inspect-state, interaction-events, interaction-validation
meadow-story-dsk
  story-state, story-beats, dialogue-text, sequence-runner, story-validation
meadow-objective-dsk
  objective-model, objective-flow, completion-ledger, feedback-surface, objective-validation
meadow-ecology-dsk
  ambient-life, ecology-zones, ambience-triggers, non-gameplay-agents, ecology-validation
meadow-audio-dsk
  ambient-bed, spatial-audio-cues, audio-state, audio-events, audio-validation
meadow-ui-dsk
  minimal-hud, story-text-panel, debug-ui, ui-state, ui-validation
meadow-save-dsk
  save-model, save-slots, persistence-adapter, migration, save-validation
meadow-diagnostics-dsk
  runtime-health, render-health, determinism-checks, smoke-tests, diagnostics-report
meadow-performance-dsk
  quality-profile, budget-policy, lod-policy, adaptive-scaling, performance-validation
```

### Rendering and deployment

```txt
meadow-render-host-dsk
  renderer-selection, render-plan-ingest, pass-order, renderer-state, renderer-validation
meadow-webgl-renderer-v2-kit
  context acquisition, shader program creation, attribute/uniform binding, CPU mesh ingest,
  GPU buffer ownership, draw submission, resize, snapshot and disposal
post-process-stack-dsk
  pass-registry, render-target-system, sobel-outline-pass, color-grade-pass, post-validation
render-target-kit
  scene-color-texture, depth-texture, normal-texture, ping-pong-buffer, resize-policy
sobel-outline-pass-kit
  color-edge-threshold, depth-edge-threshold, normal-edge-threshold, outline-color, object-mask
color-grade-pass-kit
  warmth, contrast, saturation, shadow-tint, highlight-tint
depth-fog-pass-kit
  fog-near, fog-far, fog-color, distance-curve, horizon-haze
vignette-pass-kit
  radius, softness, strength, center, quality-tier
final-composite-pass-kit
  scene-input, post-input, output-target, debug-overlay, fallback-composite
static-pages-deploy-dsk
  build-config, GitHub Pages workflow, release-artifacts, cache-invalidation, deploy-validation
```

## Main finding: requested surface values become truth without admission

### DPR and dimensions are sampled inside the draw path

`resize()` clamps live `devicePixelRatio` from 1 through 2, multiplies live CSS size, mutates the canvas and returns the requested values. There is no immutable viewport observation or resize command.

### Pixel and capability budgets are absent

The runtime does not query `MAX_VIEWPORT_DIMS`, `MAX_RENDERBUFFER_SIZE`, or the actual `gl.drawingBufferWidth` and `gl.drawingBufferHeight`. It does not cap total pixels or classify browser clamping.

### Fallback and rollback are absent

A large or unsupported request has no lower-resolution retry policy, typed failure, last-known-good surface or cold-rebuild result. Changing the live canvas drawing buffer is destructive, but the operation is not staged or journaled.

### Renderer and capture evidence omit surface identity

The renderer snapshot contains topology and cache state but no width, height, DPR, surface revision, context generation or frame ID. Editor viewport and capture capabilities read live values independently and cannot prove they describe the same committed frame.

### Existing browser proof is one configuration

The browser observation fixes 1440 by 900 and DPR 1. It validates title, debug markers and screenshot byte count, not resize behavior, high-DPR budgets or capture parity.

## Required parent domain

```txt
meadow-render-surface-resolution-authority-domain
```

Planned coordinating kits:

```txt
render-surface-id-kit
render-surface-revision-kit
viewport-observation-kit
device-pixel-ratio-policy-kit
render-pixel-budget-kit
webgl-surface-capability-kit
resize-command-kit
resize-coalescing-kit
render-surface-plan-kit
drawing-buffer-allocation-kit
render-surface-fallback-kit
render-surface-commit-kit
render-surface-rollback-kit
stale-surface-observation-rejection-kit
render-surface-observation-kit
capture-surface-correlation-kit
visible-frame-surface-ack-kit
render-surface-journal-kit
render-surface-fixture-kit
browser-resize-dpr-smoke-kit
```

## Required transaction

```txt
observe CSS viewport and DPR
  -> create ResizeCommand
  -> validate session, context generation and predecessor surface revision
  -> validate finite positive dimensions
  -> query WebGL limits and product pixel budget
  -> derive bounded candidate dimensions and fallback sequence
  -> coalesce superseded observations
  -> allocate drawing buffer
  -> read actual drawing-buffer dimensions
  -> classify mismatch or fallback
  -> commit one surface revision
  -> derive camera aspect from committed dimensions
  -> draw and acknowledge one visible frame
  -> permit viewport/capture observations for that revision
```

## Required proof

```txt
multiple viewport sizes and DPR values obey one policy
large surfaces remain within maximum dimensions and pixels
rapid resize coalesces deterministically
hidden and zero-sized layouts preserve or suspend explicitly
actual GL dimensions govern the result
stale session, context and surface revisions reject
allocation failure follows typed fallback or failure
camera projection cites committed dimensions
renderer snapshot, viewport, capture and visible frame share one revision
context loss during resize routes through context recovery
Pages proves deployed resize and capture parity
```

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
6b. Render Surface Resolution Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
8. Interaction Command and Objective Authority
9. DSK Runtime Consumption Authority
```

## Validation status

```txt
runtime source changed: no
renderer source changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser resize smoke: not run
render-surface fixtures: unavailable
```
