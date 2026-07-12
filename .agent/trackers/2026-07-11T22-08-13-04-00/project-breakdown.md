# IntoTheMeadow Project Breakdown

**Timestamp:** `2026-07-11T22-08-13-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one commit-pinned external source kit, 43 local kit declarations, a persistent WebGL renderer, browser editor capabilities and a Node headless-editor surface.

This pass isolates the render-surface resolution boundary. The renderer derives drawing-buffer size directly from live CSS dimensions and device pixel ratio inside every render call. It has no pixel budget, capability admission, resize generation, typed allocation result, fallback tier, committed surface revision or capture/frame receipt.

## Plan ledger

**Goal:** preserve the full-screen meadow composition while making viewport and drawing-buffer changes bounded, revisioned, recoverable and correlated with the rendered frame and editor capture.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Detect active unsynchronized AetherVale lifecycle-audit commits and avoid overlapping that repository.
- [x] Select only `IntoTheMeadow` as the oldest stable eligible repository.
- [x] Read `AGENTS.md`, browser shell, web host, renderer, editor bridge and browser observation script.
- [x] Identify the interaction loop, all domains, all kits and every offered service.
- [x] Trace CSS viewport, DPR sampling, canvas mutation, GL viewport, camera projection, snapshots and captures.
- [x] Define a render-surface resolution parent domain and fixture gate.
- [x] Change documentation only.
- [x] Push only to `main` with no branch or pull request.
- [ ] Runtime implementation and executable surface fixtures remain future work.

## Repository selection

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0

AetherVale         central 20:30, active repo-local lifecycle audit at 22:08, skipped
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

Only `LuminaryLabs-Publish/IntoTheMeadow` is changed in the Publish organization during this pass.

## Interaction loop

```txt
browser boot
  -> fixed-position canvas fills the CSS viewport
  -> startWebHost creates game, renderer, enhancer and editor bridge
  -> requestAnimationFrame begins

each visible frame
  -> game tick and plan enhancement
  -> renderer.render(plan)
  -> resize() samples devicePixelRatio and live canvas CSS size
  -> canvas.width and canvas.height mutate immediately when different
  -> gl.viewport uses the new drawing-buffer size
  -> projection aspect derives from that size
  -> outline and color passes draw
  -> renderer snapshot publishes without surface dimensions or revision
  -> host stores the returned render snapshot

editor observation
  -> browser.getViewport reads live inner size, DPR and canvas dimensions
  -> renderer.capture reads canvas width, height and data URL
  -> renderer snapshot is attached independently
  -> no surface or frame identity proves the values belong together
```

## Source-backed finding

The current renderer uses:

```txt
ratio = clamp(devicePixelRatio, 1, 2)
width = floor((canvas.clientWidth || innerWidth || 1) * ratio)
height = floor((canvas.clientHeight || innerHeight || 1) * ratio)
canvas.width = width
canvas.height = height
```

The resize is executed inside every render call before the GL viewport and camera projection are configured.

At a 3840 by 2160 CSS viewport with DPR 2, the requested drawing buffer is 7680 by 4320, or 33,177,600 pixels. The runtime does not query WebGL surface limits, enforce a total pixel budget, classify browser clamping, choose a lower fallback tier or publish the actual GL drawing-buffer dimensions.

## Missing authority

```txt
render-surface identity
surface revision and resize generation
viewport observation timestamp
DPR policy revision
maximum width, height and pixel budget
WebGL maximum-dimension capability readback
typed resize command and admission result
coalescing of rapid resize observations
candidate surface plan
actual drawing-buffer readback
fallback tier and degradation reason
rollback or last-known-good surface policy
stale surface-result rejection
surface journal
renderer snapshot width, height and DPR
capture-to-surface correlation
first-visible-frame surface acknowledgement
```

## Domains in use

```txt
browser shell and fixed CSS canvas
DOM viewport and device-pixel-ratio observation
runtime session, RAF and frame ownership
game state and simulation clock
external source provider and DSK installation
render-plan enhancement and topology identity
CPU mesh construction
WebGL context, shaders, buffers and draw submission
render-surface sizing and drawing-buffer allocation
camera projection and aspect ratio
outline, cel shading and fog
renderer snapshots and host projection
browser editor viewport and capture capabilities
Node headless editor and artifact generation
fatal handling, context recovery and disposal
validation, browser observation, build and Pages deployment
interaction, objective, story, player, input, audio, save and UI declarations
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

## Required parent domain

```txt
meadow-render-surface-resolution-authority-domain
```

Candidate composition:

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
  -> create revisioned ResizeCommand
  -> admit runtime session, context generation and predecessor surface revision
  -> normalize finite positive dimensions
  -> query WebGL limits and policy budgets
  -> derive a bounded candidate surface plan
  -> coalesce superseded resize commands
  -> allocate and read back actual drawing-buffer dimensions
  -> fall back through declared quality tiers on recoverable failure
  -> commit one surface revision
  -> derive projection from committed dimensions
  -> draw and publish a visible-frame surface receipt
  -> require captures and viewport observations to cite that revision
```

## Required proof

```txt
320x240, 1440x900 and 3840x2160 viewports
DPR 0.75, 1, 1.25, 2 and 3 policy cases
rapid resize and orientation changes coalesce deterministically
zero-sized and hidden canvas observations do not destroy the last good surface
maximum-dimension and pixel-budget overflow choose a declared fallback or fail explicitly
browser clamping is detected by drawing-buffer readback
stale resize results cannot overwrite a newer revision
camera aspect cites committed surface dimensions
renderer snapshot, viewport observation, capture and visible frame share one surface revision
context loss during resize routes through context recovery
Pages smoke proves deployed resize and capture parity
```

## Ordered architecture queue

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

## Validation boundary

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

A full-screen canvas is not proof of a bounded or committed render surface. Completion requires actual drawing-buffer dimensions, policy identity and surface revision to propagate through projection, renderer snapshot, capture and the first visible frame.