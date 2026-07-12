# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T20-38-07-04-00`

## Summary

`IntoTheMeadow` contains one external meadow provider, 43 local DSK/kit declarations, a descriptor-driven render plan, CPU mesh construction, persistent WebGL rendering, browser `GameHost` and editor surfaces, and a Node headless-editor environment.

This pass audits runtime clock and step admission. The browser, browser editor and Node editor all reach the same mutable game through incompatible time models. The browser advances one state frame with a fixed `1/60` delta while projecting absolute RAF time into the render plan. Browser editor commands may provide arbitrary time and delta directly, while Node accumulates its own caller-controlled time. No clock ID, step ID, session fence, reset epoch, finite-delta policy, work budget or step/frame receipt joins these paths.

## Plan ledger

**Goal:** define one monotonic simulation clock and typed step transaction that all runtime surfaces must consume before state, plan time or presentation can advance.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible central ledgers and root `.agent` states.
- [x] Detect newer unsynchronized repo-local work in nominal-oldest `AetherVale`.
- [x] Select only `IntoTheMeadow` as the oldest stable eligible repository.
- [x] Inspect `AGENTS.md`, browser host, game state, render-plan enhancer, WebGL renderer, browser editor bridge and Node environment.
- [x] Identify interaction loops, all domains, all kits and every declared service.
- [x] Define the runtime-clock parent domain and fixture boundary.
- [x] Change documentation only.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
central timestamp      repo-local state
AetherVale       18:48 active newer audit at 20:30, skipped
IntoTheMeadow    19:01 selected oldest stable
PrehistoricRush  19:09
MyCozyIsland     19:20
TheOpenAbove     19:28
HorrorCorridor   19:38
PhantomCommand   19:48
ZombieOrchard    20:03
TheUnmappedHouse 20:11
TheCavalryOfRome excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was changed in the Publish organization.

## Interaction loop

```txt
browser boot
  -> load pinned meadow provider
  -> create game, renderer and enhancer
  -> expose GameHost and editor bridge
  -> request RAF

browser RAF
  -> receive DOMHighResTimeStamp now
  -> time = now / 1000
  -> game.tick({ time, dt: 1/60 })
  -> state.frame += 1
  -> state.lastTick = { time, dt }
  -> getRenderPlan(time)
  -> enhance cached static plan with time overlay
  -> renderer uploads time to uTime
  -> wind shader evaluates absolute page-time phase

browser editor
  -> runtime.tick({ dt = 1/60, time = 0 })
  -> direct raw game mutation
  -> no RAF admission, clock ownership or render commit
  -> runtime.reset resets game state only

Node headless editor
  -> private time = 0
  -> runtime.tick adds caller dt for caller ticks count
  -> game.tick({ dt, time })
  -> build/capture uses private time
  -> reset sets private time to 0 and invalidates enhancer
```

## Domains in use

```txt
browser shell, DOM boot and visible failure projection
external dependency manifest and dynamic provider loading
source-provider selection, fallback and source-plan generation
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
  GPU buffer ownership, two-pass draw, resize, snapshot and disposal
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

## Main finding: three clocks reach one mutable graph

### Browser RAF combines incompatible values

`frame(now)` converts the RAF timestamp to seconds but passes a constant `dt = 1/60`. A delayed callback, hidden tab, pause or overloaded frame still advances state by one nominal fixed step while render time jumps to the current page timestamp.

### Render time is operational, not metadata

`getRenderPlan(time)` overlays the supplied time. The enhancer preserves it through `withMeadowRenderTime()`, and the renderer sends it to shader uniform `uTime`. Wind phase therefore follows absolute browser page time rather than an authoritative simulation clock.

### Stop/start and reset do not define time semantics

`stop()` changes a Boolean. `start()` schedules a later RAF whose absolute timestamp includes the stopped interval. Browser `runtime.reset` recreates state but does not reset or rebase the RAF-derived render clock. The reset state can immediately render at a large pre-reset time.

### Browser editor bypasses scheduling authority

`runtime.tick` invokes `game.tick` directly with caller-provided `dt` and `time`. It does not validate finite values, monotonicity, session, expected frame, maximum ticks or whether a visible frame follows.

### Node headless uses a different clock contract

The Node environment maintains a private `time`, adds caller-provided `dt` once per requested tick and resets time to zero. The same logical commands can therefore produce different `lastTick`, render time and wind phase in browser and headless execution.

## Required parent domain

```txt
meadow-runtime-clock-and-step-authority-domain
```

Planned coordinating kits:

```txt
runtime-clock-id-kit
runtime-clock-state-kit
runtime-clock-revision-kit
simulation-step-command-kit
simulation-step-id-kit
simulation-step-admission-kit
finite-delta-policy-kit
step-work-budget-kit
monotonic-time-policy-kit
pause-resume-clock-kit
reset-epoch-kit
clock-source-adapter-kit
browser-raf-step-adapter-kit
browser-editor-step-adapter-kit
headless-step-adapter-kit
simulation-step-result-kit
clock-step-journal-kit
clock-observation-kit
clock-render-frame-correlation-kit
runtime-clock-parity-fixture-kit
pause-resume-clock-fixture-kit
reset-epoch-clock-fixture-kit
step-budget-fixture-kit
```

## Required transaction

```txt
raw source event
  -> adapt into SimulationStepCommand
  -> validate runtimeSessionId and resetEpoch
  -> validate expected clock revision and step sequence
  -> validate finite non-negative delta
  -> clamp or reject by maximum delta and work budget
  -> advance monotonic simulation time exactly once
  -> mutate game state under accepted step ID
  -> derive render time from accepted clock state
  -> render and commit a frame citing the same step and clock revision
  -> publish typed result and bounded journal row
```

Pause must stop admission without advancing simulation time. Resume must rebase the source adapter without injecting wall-clock pause duration. Reset must advance an epoch, retire predecessor commands and define the new clock origin.

## Required proof

```txt
30 Hz, 60 Hz and 144 Hz source callbacks yield the same accepted simulation sequence
large callback delay is clamped or rejected by explicit policy
hidden-tab and stop/start intervals do not jump simulation/render time
browser reset and Node reset establish equivalent epoch-zero observations
browser editor rejects stale, non-finite, negative and over-budget commands
multiple requested headless ticks have deterministic bounded results
state.lastTick, renderPlan.time, shader time and committed frame cite one clock revision
no direct raw game.tick path bypasses admission
```

## Validation boundary

This was a documentation-only audit. No runtime, dependency, render or deployment behavior changed. Existing checks were not run because the proposed step-admission and clock-parity fixtures do not exist yet.