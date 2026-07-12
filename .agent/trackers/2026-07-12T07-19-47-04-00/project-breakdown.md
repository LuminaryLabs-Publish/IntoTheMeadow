# IntoTheMeadow Project Breakdown

**Timestamp:** `2026-07-12T07-19-47-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`

## Summary

`IntoTheMeadow` declares and installs `meadow-performance-dsk`, but the browser runtime does not own an adaptive performance transaction. The current policy defaults to a static `high` profile, the nominal `auto` profile is another fixed set of constants, the web host records no CPU/GPU timing window, and the renderer publishes counts rather than budget or deadline evidence.

Several declared quality controls do not reach the physical render path. Terrain resolution is hard-coded to `96 x 124`, `profile.postProcess` is not consumed by the renderer, the outline and color draws always execute, and the computed `maxGrassInstances` budget is not passed into the inspected grass placement/draw-group path. Runtime performance options also do not participate in enhancer cache identity, so an out-of-band quality change would not itself force topology rebuilding.

## Plan ledger

**Goal:** define one adaptive-quality authority that turns committed frame observations into stable, hysteresis-controlled quality decisions, prepares every affected consumer, atomically commits one quality revision, and proves the first visible frame rendered from it.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `IntoTheMeadow` as the oldest eligible synchronized repository.
- [x] Inspect `AGENTS.md`, DSK declarations, required-v0.1 registry, performance policy, render-plan enhancer, web host, game diagnostics, renderer and package checks.
- [x] Identify the interaction loop, all domains, all 44 declared kits and their offered services.
- [x] Trace logical quality fields into grass, terrain, cache and physical draw submission.
- [x] Define sampling, budget, decision, hysteresis, prepare/commit/rollback, diagnostics and visible-frame contracts.
- [x] Add timestamped architecture and system-specific audits.
- [x] Change documentation only on `main`; create no branch or pull request.
- [ ] Runtime implementation and executable performance fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

IntoTheMeadow      2026-07-12T05-39-42-04-00 selected oldest
PhantomCommand     2026-07-12T05-49-04-04-00
HorrorCorridor     2026-07-12T05-59-28-04-00
ZombieOrchard      2026-07-12T06-19-56-04-00
TheUnmappedHouse   2026-07-12T06-30-34-04-00
AetherVale         2026-07-12T06-41-32-04-00
MyCozyIsland       2026-07-12T06-51-27-04-00
TheOpenAbove       2026-07-12T07-00-48-04-00
PrehistoricRush    2026-07-12T07-09-49-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was selected.

## Complete interaction loop

```txt
page load
  -> boot module queries canvas, HUD, status and loading nodes
  -> web host imports one commit-pinned meadow provider
  -> game installs 43 local DSK descriptors plus one external kit
  -> game creates immutable state and cached source render plan
  -> render-plan enhancer, WebGL renderer and editor bridge are created
  -> recursive RAF begins

frame
  -> convert RAF timestamp to absolute seconds
  -> game.tick({ time, dt: 1/60 })
  -> obtain source render plan
  -> enhance with static performance policy
  -> validate the contracted plan
  -> resize renderer at DPR 1..2
  -> ensure or reuse one cached mesh
  -> draw outline pass
  -> draw color pass
  -> publish counts/cache state
  -> schedule successor RAF

current quality path
  -> createMeadowPerformancePolicy defaults to high
  -> auto resolves to a fixed profile
  -> host passes no runtime performance observation
  -> no rolling timing window or capability envelope exists
  -> no quality command/result or revision exists
  -> no atomic multi-consumer quality transition exists
  -> no first-frame quality acknowledgement exists
```

## Source-backed findings

### Performance DSK is required but not adaptive

`meadow-performance-dsk` is part of `REQUIRED_V01_DSK_IDS` and declares quality profile, budget policy, LOD policy, adaptive scaling and validation services. Its implementation selects a profile synchronously and returns immutable constants. `auto` is not an adaptive controller; it is a fixed profile.

### The web host has no performance observation loop

The host invokes one simulation tick and one render per RAF. It measures neither frame CPU duration nor GPU duration, keeps no rolling percentile window, receives no long-task or visibility evidence, and creates no quality decision. Debug output contains validation, descriptor counts, vertex count and cache labels only.

### Declared controls and physical behavior diverge

```txt
policy terrainResolution: declared
physical terrain resolution: hard-coded 96 x 124

policy postProcess: declared
physical renderer: outline draw plus color draw always submitted

maxGrassInstances budget: calculated
inspected grass construction path: receives quality density scale, not the cap

quality revision: absent
consumer quality result: absent
```

### Dynamic quality cannot safely invalidate topology

`createRenderPlanEnhancer.enhance(renderPlan, runtime)` accepts `runtime.performance`, but cache reuse is decided only from `sourceTopologyKey(renderPlan)`. The web host calls `enhance(rawPlan)` without runtime performance. A future out-of-band profile change therefore has no authoritative cache invalidation or topology-rebuild transaction.

### Renderer readback is insufficient

The renderer snapshot exposes plan ID, topology key, vertex/triangle counts, descriptor counts and cache state. It does not expose quality revision, budget, measured frame cost, deadline result, draw-call budget, physical profile application or first visible-frame correlation.

## Domains in use

```txt
browser shell, loading and visible failure projection
external provider loading, validation and fallback
DSK declaration, registry validation and install snapshots
game manifest, immutable state, tick, reset, snapshot and diagnostics
runtime lifecycle, RAF clock and reset epoch
camera descriptors and browser view observation
terrain, path, grass, trees, wind, atmosphere and scatter
player, input, interaction, objective, story, ecology, audio, UI and persistence declarations
render-plan enhancement, topology cache and CPU mesh construction
WebGL context, shader, buffer, resize and draw submission
post-process declarations and inline outline/fog rendering
editor capability surface and browser error capture
validation, headless tools, build and Pages deployment
adaptive sampling, budget, hysteresis, quality commit and frame proof: missing
```

## Complete declared kit and service inventory

```txt
external kit: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
```

### External provider

```txt
meadow-area-kit: area/path/style/material normalization, deterministic scatter,
  grass/flower/rock/mushroom/tree/wind/atmosphere descriptors, render plan,
  validation, snapshot, reset and optional runtime adapter
```

### Local DSK and kit services

```txt
into-the-meadow-game-dsk: game-manifest, kit-stack-registry, game-state-root, boot-sequence, game-snapshot
web-host-dsk: document-shell, browser-loop, host-debug-surface, asset-loading-host, browser-safety
game-composition-dsk: dsk-registry, scene-composition, render-composition, simulation-composition, composition-validation
meadow-area-bridge-dsk: meadow-area-config, meadow-feature-config, meadow-area-kit-adapter, meadow-area-state, meadow-area-validation
meadow-terrain-texture-dsk: terrain-surface-model, material-layer-system, path-layer-system, terrain-sampler, terrain-validation
path-corridor-dsk: path-curve-model, walkable-corridor, path-surface-detail, path-progression, path-validation
grass-density-texture-kit: density-texture-model, density-channels, density-compositor, density-sampler, density-validation
grass-clump-archetype-kit: clump-family-registry, card-layout-generator, texture-atlas-binding, clump-variant-generator, archetype-validation
grass-static-batch-kit: clump-mesh-builder, batch-variant-cache, atlas-material, static-batch-lod, batch-validation
grass-patch-placement-kit: patch-grid, density-driven-placement, clump-instance-selection, patch-instance-buffer, placement-validation
grass-clump-instancing-render-kit: batch-registry, instance-stream, draw-group-builder, shader-binding, render-validation
grass-shader-wind-kit: wind-uniforms, tip-bend-model, phase-field, gust-response, wind-validation
grass-lod-policy-kit: near-lod, mid-lod, far-lod, terrain-tint-lod, lod-validation
grass-density-scaling-kit: quality-scale, budget-scale, density-scale, profile-scale, scale-validation
grass-debug-visualization-kit: density-view, patch-view, instance-view, lod-view, debug-validation
grass-patch-dsk: patch-grid, blade-distribution, terrain-awareness, wind-binding, grass-validation
gpu-grass-render-dsk: grass-instance-buffer, grass-blade-mesh, shader-wind, grass-lod-render, grass-render-validation
wind-field-dsk: wind-state, wind-sampler, wind-zones, wind-consumers, wind-validation
tree-object-dsk: focal-tree-model, tree-line-model, tree-materials, tree-wind-binding, tree-validation
meadow-scatter-dsk: flower-scatter, rock-scatter, mushroom-scatter, placement-rules, scatter-validation
meadow-atmosphere-dsk: sky-gradient, sun-system, cloud-layer, distant-hills, atmosphere-validation
meadow-player-dsk: player-state, movement-profile, terrain-contact, player-actions, player-validation
meadow-camera-dsk: camera-mode, camera-rig, camera-collision, camera-feel, camera-validation
meadow-input-dsk: action-map, device-bindings, input-context, input-normalization, input-validation
meadow-interaction-dsk: interactable-registry, affordance-rules, inspect-state, interaction-events, interaction-validation
meadow-story-dsk: story-state, story-beats, dialogue-text, sequence-runner, story-validation
meadow-objective-dsk: objective-model, objective-flow, completion-ledger, feedback-surface, objective-validation
meadow-ecology-dsk: ambient-life, ecology-zones, ambience-triggers, non-gameplay-agents, ecology-validation
meadow-audio-dsk: ambient-bed, spatial-audio-cues, audio-state, audio-events, audio-validation
meadow-ui-dsk: minimal-hud, story-text-panel, debug-ui, ui-state, ui-validation
meadow-save-dsk: save-model, save-slots, persistence-adapter, migration, save-validation
meadow-diagnostics-dsk: runtime-health, render-health, determinism-checks, smoke-tests, diagnostics-report
meadow-performance-dsk: quality-profile, budget-policy, lod-policy, adaptive-scaling, performance-validation
meadow-render-host-dsk: renderer-selection, render-plan-ingest, pass-order, renderer-state, renderer-validation
meadow-webgl-renderer-v2-kit: context, shaders, bindings, CPU mesh ingestion, GPU buffers, draw submission, resize, snapshot, disposal
post-process-stack-dsk: pass-registry, render-target-system, sobel-outline-pass, color-grade-pass, post-validation
render-target-kit: scene-color-texture, depth-texture, normal-texture, ping-pong-buffer, resize-policy
sobel-outline-pass-kit: color-edge-threshold, depth-edge-threshold, normal-edge-threshold, outline-color, object-mask
color-grade-pass-kit: warmth, contrast, saturation, shadow-tint, highlight-tint
depth-fog-pass-kit: fog-near, fog-far, fog-color, distance-curve, horizon-haze
vignette-pass-kit: radius, softness, strength, center, quality-tier
final-composite-pass-kit: scene-input, post-input, output-target, debug-overlay, fallback-composite
static-pages-deploy-dsk: build-config, github-pages-workflow, release-artifacts, cache-invalidation, deploy-validation
```

## Required parent domain

```txt
meadow-adaptive-quality-performance-authority-domain
```

It must coordinate capability evidence, CPU/GPU frame observations, rolling windows, named budgets, hysteresis, cooldown, quality commands, topology-impact planning, grass/terrain/post/surface adapters, atomic commit, rollback, stale-plan rejection, diagnostics and first-visible-frame proof.

## Validation boundary

```txt
runtime source changed: no
performance behavior changed: no
renderer behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
performance fixtures: unavailable
browser/Pages quality smoke: unavailable
```

No runtime performance, stability, frame-rate or deployment-readiness claim is made.