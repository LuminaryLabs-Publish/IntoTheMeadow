# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-12T00-49-48-04-00`

## Summary

`IntoTheMeadow` contains one external meadow provider, 43 local DSK/kit declarations, immutable game state, descriptor-driven scene composition, CPU mesh construction, a persistent WebGL renderer, browser `GameHost` and editor surfaces, and a Node headless-editor environment.

This pass audits adaptive quality and performance budgets. `meadow-performance-dsk` is included in the required v0.1 set and has source-backed profiles, but production uses an implicit static `high` profile. No frame-cost samples or automatic decisions exist, the enhancer cache excludes quality identity, several budgets are not enforced, and profile fields for terrain resolution and post-processing do not control their consumers.

## Plan ledger

**Goal:** define one cadence-independent quality transaction from frame observations through decision, complete budget allocation, render preparation, atomic commit or rollback and first visible frame proof.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible central ledgers and root `.agent` states.
- [x] Select only `IntoTheMeadow` as the oldest eligible repository.
- [x] Inspect `AGENTS.md`, package checks, DSK registry, performance policy, scene configuration, enhancer, grass consumers, post stack, renderer and web host.
- [x] Identify the interaction loop, all domains, all kits and every declared service.
- [x] Define the adaptive-quality parent domain and fixture boundary.
- [x] Change documentation only.
- [ ] Runtime implementation and executable adaptive-quality fixtures remain future work.

## Selection comparison

```txt
IntoTheMeadow      2026-07-11T23-10-51-04-00 selected
HorrorCorridor     2026-07-11T23-18-16-04-00
PhantomCommand     2026-07-11T23-28-29-04-00
ZombieOrchard      2026-07-11T23-48-14-04-00
TheUnmappedHouse   2026-07-12T00-01-25-04-00
AetherVale         2026-07-12T00-10-23-04-00
MyCozyIsland       2026-07-12T00-20-01-04-00
PrehistoricRush    2026-07-12T00-30-49-04-00
TheOpenAbove       2026-07-12T00-39-05-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was changed in the Publish organization.

## Interaction loop

```txt
browser boot
  -> load commit-pinned meadow-area-kit
  -> validate and install 43 local descriptors
  -> create arrival-meadow source plan
  -> create render-plan enhancer and WebGL renderer
  -> expose GameHost and editor bridge
  -> request RAF

first enhanced plan
  -> no style.performance in arrival scene
  -> createMeadowPerformancePolicy defaults to high
  -> filter flowers and tree-line objects
  -> build grass from quality density scale
  -> hard-code terrain topology to 96 x 124
  -> create post descriptor from scene configuration
  -> cache by sourceTopologyKey

browser frame
  -> game.tick with dt 1/60 and RAF absolute time
  -> raw plan changes by time only
  -> enhancer cache hit retains original quality topology
  -> renderer independently clamps DPR to 1 through 2
  -> renderer submits outline then color/fog draw
  -> publish plan, renderer and editor observations
  -> collect no frame-cost sample or quality decision
```

## Domains in use

```txt
browser shell, DOM boot and visible failure projection
external dependency manifest and dynamic provider loading
source-provider selection, validation and fallback
DSK declaration, census, validation and install snapshots
game manifest, build and content identity
immutable game state, frame mutation and reset
game snapshot and diagnostics
runtime lifecycle, RAF scheduling and stop/start
runtime clock, step admission and reset epoch
performance samples and elapsed-time windows
quality profile schema, admission and revision
adaptive decision, hysteresis, cooldown and manual override
budget allocation, reservation, consumption and violation reporting
quality transition prepare, commit, rollback and journaling
terrain, grass, scatter, post-process and surface quality consumers
GameHost capability projection
browser editor capability routing
Node headless editor, workspace and artifact operations
player, input, interaction, objective, story and persistence declarations
terrain, path, materials, scatter and atmosphere
grass density, archetypes, batching, placement, instancing, wind and LOD
tree, wind, performance and post-process enhancement
render-plan v2 contract, quality fingerprint and topology identity
CPU mesh construction
WebGL context, shader, buffer, draw, resize and disposal
render surface, context recovery and committed-frame observation
quality-to-visible-frame and capture correlation
static checks, browser observation, build and Pages deployment
DSK implementation, dependency, consumption and retirement truth
```

## Complete kit inventory and services

### External

```txt
meadow-area-kit
  area/path/style/material normalization; deterministic scatter; grass, flower, rock,
  mushroom and tree descriptors; wind and atmosphere; render-plan generation;
  validation, snapshot, reset and optional runtime adapter
```

### Local game and host

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

### World and experience

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

## Main findings

### Static auto profile

`QUALITY_PROFILES.auto` is a fixed object. The runtime creates no frame sample, window, decision, hysteresis or cooldown state.

### Implicit high profile

`ARRIVAL_MEADOW_CONFIG.style` has no performance descriptor. The policy therefore defaults to `high` without an admission or observation result.

### Quality-blind cache identity

`createRenderPlanEnhancer()` caches by source topology only. Runtime performance inputs are consulted only during rebuild and are omitted from the cache key. The web host passes no runtime performance argument.

### Partial budget enforcement

```txt
maxFlowerObjects: source-order filter
maxTreeLineObjects: source-order filter
maxGrassInstances: calculated, not enforced
maxSmallScatterObjects: calculated, unused
mushrooms: hard-coded local limit 14
```

### Ignored profile fields

`terrainResolution` is superseded by hard-coded 96 x 124 terrain segments. `postProcess` does not control stack construction or actual outline/color draw submission. DPR is independently clamped by the renderer.

### Validation and proof gaps

The enhancer does not call `performance.validate()`. Unknown quality labels can fall back to high behavior while retaining an invalid label. No quality revision, fingerprint, budget result or first-frame acknowledgement reaches renderer, GameHost, editor or capture observations.

## Required parent domain

```txt
meadow-adaptive-quality-budget-authority-domain
```

Planned coordinating kits:

```txt
performance-sample-envelope-kit
performance-window-timebase-kit
quality-profile-schema-kit
quality-profile-admission-kit
quality-decision-policy-kit
quality-transition-command-kit
quality-transition-id-kit
quality-revision-kit
performance-budget-ledger-kit
grass-instance-budget-kit
scatter-budget-kit
terrain-resolution-policy-kit
post-process-quality-policy-kit
render-plan-quality-fingerprint-kit
quality-cache-invalidation-kit
quality-transition-prepare-kit
quality-transition-commit-kit
quality-transition-rollback-kit
effective-quality-observation-kit
quality-frame-ack-kit
quality-cadence-parity-fixture-kit
quality-budget-enforcement-fixture-kit
quality-transition-browser-smoke-kit
```

## Required transaction

```txt
collect valid post-frame samples
  -> update elapsed-time window
  -> decide with hysteresis and cooldown
  -> admit transition against session, renderer, surface and quality revision
  -> allocate complete consumer budgets
  -> prepare detached plan and resources
  -> validate every consumer binding and ceiling
  -> atomically commit or roll back
  -> render first successor frame
  -> publish quality result, fingerprint, budgets and frame receipt
```

## Required proof

```txt
profile schema and fingerprint determinism
unknown profile rejection
30/60/120 Hz decision parity
hidden/suspended frame policy
complete grass and scatter budget ceilings
terrain, post and surface profile bindings
quality-only cache invalidation
idempotent duplicate and stale rejection
consumer failure rollback
context-loss classification
browser/headless observation parity
first visible quality-frame correlation
Pages degrade and recovery smoke
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
7b. Adaptive Quality and Performance Budget Authority
8. Interaction Command and Objective Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
```

## Validation status

```txt
runtime source changed: no
performance source changed: no
renderer source changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser performance smoke: not run
adaptive-quality fixtures: unavailable
```
