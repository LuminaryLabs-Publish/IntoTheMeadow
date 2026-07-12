# IntoTheMeadow Project Breakdown

**Timestamp:** `2026-07-12T00-49-48-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one commit-pinned external source kit, 43 local kit declarations, immutable game state, a persistent WebGL renderer, browser editor capabilities and a Node headless-editor environment.

This pass isolates adaptive quality and performance-budget authority. A required `meadow-performance-dsk` exists and supplies static profiles, but `auto` is only another fixed profile. The browser records no frame-cost samples, the enhancer cache ignores quality inputs, several declared budgets are not enforced, and profile fields for terrain resolution and post-processing do not control the current render path.

## Plan ledger

**Goal:** define one admitted quality transaction from performance sampling and budget decisions through render-plan preparation, consumer commit, rollback and first-visible-frame acknowledgement.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `IntoTheMeadow` as the oldest eligible central-ledger entry.
- [x] Inspect the performance DSK, scene configuration, render-plan enhancer, grass system, post-process descriptor, renderer and browser frame loop.
- [x] Identify the interaction loop, all domains, all kits and all offered services.
- [x] Trace profile selection, budget application, cache identity, render consumers and public observations.
- [x] Define adaptive-quality admission, budget enforcement, transition, rollback and visible-frame proof requirements.
- [x] Change documentation only.
- [x] Push directly to `main` with no branch or pull request.
- [ ] Runtime implementation and executable performance fixtures remain future work.

## Repository selection

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0

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

Only `LuminaryLabs-Publish/IntoTheMeadow` is changed in the Publish organization during this pass.

## Interaction loop

```txt
browser boot
  -> import external meadow provider
  -> install 43 local DSK descriptors
  -> create arrival-meadow source plan
  -> construct WebGL renderer and render-plan enhancer
  -> expose GameHost and browser editor bridge
  -> request RAF

first enhanced plan
  -> no scene performance configuration is present
  -> createMeadowPerformancePolicy defaults to high
  -> filter flowers and tree-line objects
  -> create texture-driven grass using quality density scale
  -> hard-code terrain resolution to 96 x 124
  -> create post-process descriptor independently of quality profile
  -> cache the result under sourceTopologyKey only

subsequent frame
  -> game.tick with fixed dt 1/60 and RAF absolute time
  -> raw plan changes only by time
  -> enhancer cache hit returns the original quality topology
  -> renderer resizes from DPR and draws outline plus color/fog passes
  -> no frame-cost sample, budget result or quality decision is produced

attempted quality change
  -> no public quality command exists
  -> web host passes no runtime performance input
  -> enhancer cache identity excludes quality and budgets
  -> consumer prepare, commit, rollback and frame acknowledgement are absent
```

## Source-backed findings

### Required performance DSK is only a static policy

`meadow-performance-dsk` is listed in `REQUIRED_V01_DSK_IDS`. It defines `low`, `medium`, `high`, `ultra` and `auto`, but every entry is a fixed object. No timing samples, elapsed-time window, hysteresis, cooldown, thermal/memory signal, decision result or adaptive transition exists.

The arrival scene defines no `style.performance`, so the production enhancer defaults to `high`.

### Quality changes cannot invalidate the enhancer cache

`createRenderPlanEnhancer()` caches by `sourceTopologyKey(renderPlan)`. The cache key omits:

```txt
quality profile
performance budgets
terrain resolution policy
post-process policy
surface resolution
runtime performance revision
```

The browser host calls `planEnhancer.enhance(rawPlan)` without a runtime performance argument. Even a future caller that supplies one will not rebuild while the source topology key remains unchanged.

### Declared budgets are only partially applied

```txt
maxFlowerObjects       applied by source-order filtering
maxTreeLineObjects     applied by source-order filtering
maxGrassInstances      calculated but not enforced by grass placement
maxSmallScatterObjects calculated but unused
mushroom limit         hard-coded to 14 outside the policy
```

Grass placement derives counts from area, patch size, density and a quality scale. It receives no global remaining-budget ledger and returns no admitted-versus-dropped count.

### Profile fields do not control corresponding consumers

```txt
profile.terrainResolution
  -> ignored
  -> tuneContractedPlan hard-codes 96 x 124 terrain segments

profile.postProcess
  -> ignored
  -> createPostProcessStack reads scene post-process configuration only
  -> renderer always performs outline and color/fog draws
```

The low profile therefore cannot prove that post-processing or the second draw pass is disabled.

### Validation and observation are incomplete

`performance.validate()` is not called during enhancement. An unknown quality name can retain that unknown label while falling back to the high profile and high grass density scale.

No quality revision, decision ID, budget ledger, effective-quality fingerprint or first-frame receipt reaches:

```txt
render-plan enhancer snapshot
renderer snapshot
GameHost snapshot
browser editor observation
headless capture
visible frame proof
```

## Domains in use

```txt
browser shell, DOM boot and visible failure projection
external dependency manifest and provider loading
source-provider selection and fallback
DSK declaration, validation and install snapshots
game manifest, build and content identity
immutable game state, frame mutation and reset
runtime lifecycle, RAF scheduling and clock admission
performance sample collection and elapsed-time windows
quality profile schema, admission and revision
budget policy, allocation, enforcement and rejection
adaptive decision policy, hysteresis and cooldown
quality transition prepare, commit and rollback
terrain-resolution, grass-density, scatter and post-process consumers
render-plan enhancement, cache identity and topology invalidation
CPU mesh construction and WebGL buffer ownership
surface sizing, DPR and draw submission
committed-frame and capture correlation
GameHost, browser editor and Node headless observations
player, input, interaction, objective, story and persistence declarations
terrain, path, grass, tree, wind, scatter and atmosphere
validation, build and Pages deployment
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

## Required parent domain

```txt
meadow-adaptive-quality-budget-authority-domain
```

Candidate composition:

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
frame completion
  -> record monotonic CPU and optional GPU cost sample
  -> classify visibility, suspension and invalid samples
  -> update elapsed-time performance window
  -> evaluate quality policy with hysteresis and cooldown
  -> emit no-op or QualityTransitionCommand
  -> admit session, surface, renderer and current quality revision
  -> allocate explicit budgets for every consumer
  -> prepare a detached render-plan candidate
  -> validate budget compliance and consumer readiness
  -> commit plan, cache, renderer and effective-quality revision atomically
  -> render and acknowledge the first frame using the new quality
  -> publish typed result, fingerprint and bounded journal
  -> rollback to the prior admitted quality on any failure
```

## Required proof

```txt
all named profiles validate and produce deterministic fingerprints
unknown profiles reject before enhancement
fixed elapsed-time input yields the same decision across 30, 60 and 120 Hz
hidden or suspended frames do not trigger false degradation
all grass, flower, tree-line, mushroom and small-scatter budgets are enforced
terrain resolution follows the admitted profile
post-process and draw-pass behavior follows the admitted profile
quality-only changes invalidate enhancer and renderer topology exactly once
duplicate and stale transitions are idempotent or rejected
partial consumer failure preserves the previous quality and visible frame
GameHost, editor, renderer, capture and visible frame cite one quality revision
Pages proves degrade and recovery behavior without leaks or duplicate RAF work
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
