# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T17-30-56-04-00`

## Summary

`IntoTheMeadow` has one external meadow provider, 43 local DSK/kit declarations, a descriptor-driven render plan, a CPU mesh builder, a persistent WebGL renderer and browser/Node editor surfaces.

The current audit isolates WebGL context recovery. The renderer acquires a context and creates its program, locations and GPU buffers once. No `webglcontextlost` or `webglcontextrestored` ownership exists. Topology cache identity is therefore allowed to outlive the GPU objects it originally populated, while renderer snapshots and canvas capture remain unversioned by context generation.

## Plan ledger

**Goal:** document the exact loss/restoration failure path and define one authoritative context-generation, resource-rebuild and first-recovered-frame contract without changing runtime behavior.

- [x] Enumerate the ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare nine eligible repositories with the central ledger.
- [x] Confirm root `.agent` coverage.
- [x] Select only `IntoTheMeadow` as the oldest eligible documented repository.
- [x] Read `AGENTS.md` and retained audits.
- [x] Inspect browser boot, web host and RAF ownership.
- [x] Inspect WebGL context acquisition, shader creation, location resolution and GPU buffer caching.
- [x] Inspect renderer snapshots, GameHost, editor capture and browser observation.
- [x] Preserve all active domains, kits and offered services.
- [x] Add architecture, render, interaction, WebGL-context and deployment audits.
- [x] Change documentation only.
- [ ] Runtime implementation and fixtures remain future work.

## Selection comparison

```txt
IntoTheMeadow      2026-07-11T15-49-49-04-00  selected
PrehistoricRush    2026-07-11T15-59-12-04-00
MyCozyIsland       2026-07-11T16-10-58-04-00
TheOpenAbove       2026-07-11T16-30-25-04-00
HorrorCorridor     2026-07-11T16-38-10-04-00
PhantomCommand     2026-07-11T16-49-51-04-00
ZombieOrchard      2026-07-11T17-01-11-04-00
TheUnmappedHouse   2026-07-11T17-10-50-04-00
AetherVale         2026-07-11T17-20-20-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
browser boot
  -> load commit-pinned meadow-area provider
  -> create game, DSK report and source plan
  -> create render-plan enhancer
  -> acquire WebGL context
  -> compile/link program and resolve locations
  -> install editor bridge

RAF
  -> game.tick({ time, dt })
  -> create time-overlay source plan
  -> enhance render plan
  -> validate render contract
  -> resize canvas
  -> reuse or rebuild CPU topology
  -> reuse or rebuild GPU buffers
  -> submit outline and color passes
  -> replace renderer snapshot and host lastRender
  -> update debug HUD
  -> request next frame

editor observation
  -> read game, diagnostics, render plan and renderer snapshot
  -> optionally call runtime.tick or runtime.reset outside RAF
  -> serialize canvas through renderer.capture

context loss/restoration today
  -> no event admission
  -> no render/capture fence
  -> no context/resource generation change
  -> no deterministic GPU rebuild
  -> no first recovered frame proof
```

## Domains in use

```txt
browser shell, DOM boot and visible fatal projection
manifest and external dependency declaration
source-provider selection, fallback and source-plan generation
DSK census, descriptor generation, validation and install reporting
game state, tick, reset, snapshots and diagnostics
runtime session lifecycle and RAF ownership
GameHost capability exposure and browser editor adapters
Node headless editor, workspace and artifact operations
runtime-step admission and clock integrity
player, input, interaction, objective and story declarations
terrain, path, materials, scatter and atmosphere
grass density, archetypes, batching, placement, instancing, wind and LOD
tree, wind, performance and post-process enhancement
render-plan v2 contract, topology identity and cache policy
CPU mesh construction
WebGL context acquisition and shader/program ownership
GPU attribute-buffer creation, replacement and disposal
WebGL context-loss/restoration and resource-generation recovery
renderer snapshots, committed-frame correlation and capture freshness
static checks, browser observation, build and Pages deployment
DSK implementation, dependency, service-consumption and retirement truth
```

## Complete kit inventory and services

### External kit

```txt
meadow-area-kit
  area normalization
  path normalization
  style and material normalization
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
  WebGL context acquisition, program creation, uniform/attribute binding,
  CPU mesh ingestion, GPU buffer ownership, draw submission, resize, snapshot and disposal
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
  build-config, github-pages-workflow, release-artifacts, cache-invalidation, deploy-validation
```

## Main finding: context-bound resources have no generation

### One-time context and program creation

The renderer obtains `webgl2` or `webgl` once during construction, compiles and links one program, and resolves all required locations into immutable maps. There is no path that recreates those values after construction.

### Topology cache is not a GPU-resource cache

The renderer cache stores:

```txt
topologyKey
CPU mesh
rebuildCount
cacheHitCount
```

A matching topology key returns the cached CPU mesh and skips `bindMesh()`. That is correct for normal frames in one context generation, but incorrect after context restoration because the program and buffers belong to the previous generation.

### No browser context-event ownership

Neither the renderer nor the host registers:

```txt
webglcontextlost
webglcontextrestored
```

The runtime has no opportunity to call `preventDefault()`, fence rendering, invalidate GPU resources, rebuild them or acknowledge a recovered frame.

### Snapshot and capture remain stale-capable

The renderer snapshot records plan and topology fields but no context, resource or frame generation. The web host retains `lastRender`, and the editor capture combines `canvas.toDataURL()` with that renderer snapshot without freshness checks.

### Existing smokes do not exercise recovery

The renderer smoke builds CPU mesh data only. The Chromium observation proves one booted screenshot and a `gpu:` HUD marker. It does not force loss/restoration or compare generations.

## Required parent domain

```txt
meadow-webgl-context-recovery-authority-domain
```

## Existing owners to update first

```txt
meadow-webgl-renderer-v2-kit
meadow-render-host-dsk
web-host-dsk
meadow-diagnostics-dsk
browser editor renderer.capture adapter
runtime session lifecycle authority
render topology identity authority
committed frame observation authority
browser and deployment fixtures
```

## Candidate coordinating kits

```txt
webgl-context-state-kit
webgl-context-generation-kit
webgl-context-event-adapter-kit
webgl-render-admission-kit
webgl-resource-registry-kit
webgl-resource-generation-kit
webgl-resource-rebuild-plan-kit
webgl-context-loss-result-kit
webgl-context-restore-transaction-kit
webgl-recovered-frame-ack-kit
webgl-capture-freshness-kit
webgl-context-observation-kit
webgl-context-recovery-journal-kit
webgl-context-recovery-fixture-kit
```

## Required transaction

```txt
loss event
  -> admit active renderer/session event
  -> prevent default
  -> enter lost
  -> fence render and capture success
  -> invalidate resource generation and committed-frame eligibility
  -> publish typed loss result

restore event
  -> allocate new context generation
  -> stage new program, locations and buffers
  -> force GPU rebuild even when topology is unchanged
  -> validate staged resources
  -> submit candidate frame
  -> atomically commit resource generation and recovered frame
  -> publish typed restore result
  -> return to recovered readiness
```

## Required proof

```txt
loss immediately invalidates current render readiness
restoration strictly advances context generation
all program, locations and buffers cite the restored generation
same topology forces GPU reconstruction after restore
failed restoration publishes no partial resource registry
first recovered frame commits before HUD or capture report success
capture receipt matches renderer and committed-frame generations
repeated recovery does not duplicate listeners or RAF chains
disposal is idempotent and blocks late restore events
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
7. Committed Frame Observation Authority
8. Interaction Command and Objective Authority
9. DSK Runtime Consumption Authority
```

## Validation state

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
context-loss fixture: unavailable
context-restoration fixture: unavailable
capture-freshness fixture: unavailable
```
