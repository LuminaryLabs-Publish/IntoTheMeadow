# Project Breakdown: Adaptive Quality Feedback and Projection

**Timestamp:** `2026-07-16T21-01-07-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed pre-audit head:** `e093865e94f410e519cbf9d176c04853a5b2968f`  
**Status:** `adaptive-quality-feedback-projection-authority-audited`

## Summary

IntoTheMeadow declares low, medium, high, ultra and auto quality profiles, but `auto` is only another fixed profile. The browser host does not sample capability, frame time or render cost; it does not pass a runtime performance decision into the enhancer; the enhancer cache excludes quality-generation identity; terrain resolution and device-pixel ratio remain fixed independently of the selected profile; and the renderer publishes no timing or quality-settlement receipt.

## Intent

Make one accepted quality generation authoritative for grass density, flower and tree budgets, terrain resolution, outline policy, pixel ratio, post-processing eligibility, enhancer cache identity and the visible frame.

## Checklist

- [x] Compare all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible repositories retain central ledger and root `.agent` coverage.
- [x] Select only IntoTheMeadow by the oldest synchronized central timestamp.
- [x] Inspect host scheduling, performance policy, render-plan enhancement, cache admission and WebGL rendering.
- [x] Identify the complete interaction loop, all active domains, all 44 kit surfaces and offered services.
- [x] Define one adaptive-quality authority and 20 coordinating surfaces.
- [x] Add this timestamped root `.agent` audit family.
- [x] Change documentation only on `main`; create no branch or pull request.
- [ ] Implement runtime feedback, quality settlement and browser/deployment fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
selected: LuminaryLabs-Publish/IntoTheMeadow
selection rule: oldest synchronized central timestamp
selected prior timestamp: 2026-07-16T15-38-27-04-00
next oldest: LuminaryLabs-Publish/HorrorCorridor at 2026-07-16T16-00-12-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser boot
  -> start web host
  -> create game, renderer and render-plan enhancer
  -> enhancer has no runtime performance input

first enhancement
  -> createMeadowPerformancePolicy()
  -> default quality resolves to high
  -> auto, when requested, resolves to one fixed profile
  -> grass density and some object budgets are derived
  -> terrain resolution is overwritten to 96 x 124
  -> enhanced plan is cached by source topology only

normal RAF
  -> game tick receives constant 1/60 dt
  -> raw plan receives time overlay only
  -> enhancer cache returns the prior quality generation
  -> renderer clamps device pixel ratio to 1..2
  -> renderer draws outline and color passes
  -> snapshot reports geometry/cache counts but no frame cost

missing feedback settlement
  -> no capability sample
  -> no CPU/GPU/frame-time sample
  -> no target-frame budget
  -> no hysteresis or cooldown
  -> no quality generation or transition result
  -> no cache invalidation for quality changes
  -> no FirstQualityBoundFrameAck
```

## Domains in use

```txt
repository and audit identity
browser startup and host lifecycle
external meadow provider loading
DSK registration and composition validation
meadow content and static render-plan generation
performance profile declaration and budget derivation
grass density, placement, batching, instancing and LOD
wind and focal-tree enhancement
render-contract construction and dependency caching
terrain, scatter, atmosphere and camera descriptors
WebGL viewport, pixel ratio, buffers, shaders and draw submission
runtime diagnostics and public GameHost snapshots
adaptive-quality capability, feedback, admission and transition policy
source, browser, artifact and Pages evidence
central tracking and reconciliation
```

## Source-backed finding

`src/dsks/meadow-performance-dsk/index.js` defines `auto` as a fixed profile and defaults unspecified quality to `high`. It has no capability or timing inputs.

`src/hosts/web-host.js` creates the enhancer without performance options and calls `planEnhancer.enhance(rawPlan)` without a runtime performance decision. The loop records no measured frame duration or render cost.

`src/game/enhance-render-plan.js` can consume `runtime.performance` only when the source-topology cache rebuilds. Its cache key is `sourceTopologyKey(renderPlan)`, so a quality-only change can reuse the predecessor plan. The same module overwrites terrain resolution with fixed `96 x 124` segments regardless of `profile.terrainResolution`.

`src/renderers/meadow-webgl-renderer-v2.js` clamps device pixel ratio to `1..2` independently of quality policy and exposes geometry/cache counts without frame-time, GPU-time, selected quality generation, transition reason or acknowledgement.

```txt
quality profiles: declared
fixed auto profile: present
host performance feedback: absent
measured frame cost: absent
target frame budget: absent
quality hysteresis/cooldown: absent
quality generation identity: absent
quality-only cache invalidation: absent
profile-bound terrain resolution: absent
profile-bound pixel ratio: absent
quality transition result: absent
FirstQualityBoundFrameAck: absent
```

This is a source-derived adaptation, cache-coherence and visible-frame proof gap. No low-performance-device failure or production frame-rate regression was reproduced.

## Required authority

`meadow-adaptive-quality-feedback-projection-authority-domain`

```txt
PerformanceObservationCommand
  -> bind document, runtime, renderer, viewport and frame revisions
  -> sample capability, CPU frame time, render time and pressure signals
  -> publish bounded PerformanceObservationResult

QualityAdmissionCommand
  -> bind current quality generation and observation window
  -> resolve target profile and explicit budgets
  -> apply hysteresis, cooldown and minimum-residency policy
  -> publish QualityAdmissionResult

QualityProjectionCommand
  -> bind grass, flowers, tree line, terrain, outlines, pixel ratio and post-processing
  -> include quality generation in enhancer and renderer cache identity
  -> preserve the complete predecessor until replacement succeeds
  -> publish QualityProjectionResult
  -> render one matching frame
  -> publish FirstQualityBoundFrameAck
```

## Planned authority surfaces

```txt
1. meadow-adaptive-quality-feedback-projection-authority-domain
2. performance-capability-observation-kit
3. frame-time-sampler-kit
4. render-cost-sampler-kit
5. quality-profile-registry-kit
6. quality-admission-policy-kit
7. quality-hysteresis-kit
8. quality-cooldown-kit
9. quality-budget-resolver-kit
10. grass-budget-projection-kit
11. flower-budget-projection-kit
12. terrain-resolution-projection-kit
13. pixel-ratio-budget-kit
14. post-process-quality-projection-kit
15. outline-quality-projection-kit
16. enhancer-quality-generation-key-kit
17. quality-transition-settlement-kit
18. performance-diagnostics-projection-kit
19. adaptive-quality-fixture-kit
20. first-quality-bound-frame-ack-kit
```

## Complete kit and offered service inventory

| Kit | Status | Offered services |
|---|---|---|
| `meadow-area-kit` | external loaded | meadow configuration, render-plan generation, snapshot, validation |
| `into-the-meadow-game-dsk` | active-v0.1 | game-manifest, kit-stack-registry, game-state-root, boot-sequence, game-snapshot |
| `web-host-dsk` | active-v0.1 | document-shell, browser-loop, host-debug-surface, asset-loading-host, browser-safety |
| `game-composition-dsk` | active-v0.1 | dsk-registry, scene-composition, render-composition, simulation-composition, composition-validation |
| `meadow-area-bridge-dsk` | active-v0.1 | meadow-area-config, meadow-feature-config, meadow-area-kit-adapter, meadow-area-state, meadow-area-validation |
| `meadow-terrain-texture-dsk` | planned | terrain-surface-model, material-layer-system, path-layer-system, terrain-sampler, terrain-validation |
| `path-corridor-dsk` | planned | path-curve-model, walkable-corridor, path-surface-detail, path-progression, path-validation |
| `grass-density-texture-kit` | active-v0.1 | density-texture-model, density-channels, density-compositor, density-sampler, density-validation |
| `grass-clump-archetype-kit` | active-v0.1 | clump-family-registry, card-layout-generator, texture-atlas-binding, clump-variant-generator, archetype-validation |
| `grass-static-batch-kit` | active-v0.1 | clump-mesh-builder, batch-variant-cache, atlas-material, static-batch-lod, batch-validation |
| `grass-patch-placement-kit` | active-v0.1 | patch-grid, density-driven-placement, clump-instance-selection, patch-instance-buffer, placement-validation |
| `grass-clump-instancing-render-kit` | active-v0.1 | batch-registry, instance-stream, draw-group-builder, shader-binding, render-validation |
| `grass-shader-wind-kit` | planned | wind-uniforms, tip-bend-model, phase-field, gust-response, wind-validation |
| `grass-lod-policy-kit` | planned | near-lod, mid-lod, far-lod, terrain-tint-lod, lod-validation |
| `grass-density-scaling-kit` | planned | quality-scale, budget-scale, density-scale, profile-scale, scale-validation |
| `grass-debug-visualization-kit` | planned | density-view, patch-view, instance-view, lod-view, debug-validation |
| `grass-patch-dsk` | planned | patch-grid, blade-distribution, terrain-awareness, wind-binding, grass-validation |
| `gpu-grass-render-dsk` | planned | grass-instance-buffer, grass-blade-mesh, shader-wind, grass-lod-render, grass-render-validation |
| `wind-field-dsk` | planned | wind-state, wind-sampler, wind-zones, wind-consumers, wind-validation |
| `tree-object-dsk` | planned | focal-tree-model, tree-line-model, tree-materials, tree-wind-binding, tree-validation |
| `meadow-scatter-dsk` | planned | flower-scatter, rock-scatter, mushroom-scatter, placement-rules, scatter-validation |
| `meadow-atmosphere-dsk` | planned | sky-gradient, sun-system, cloud-layer, distant-hills, atmosphere-validation |
| `meadow-player-dsk` | planned | player-state, movement-profile, terrain-contact, player-actions, player-validation |
| `meadow-camera-dsk` | planned | camera-mode, camera-rig, camera-collision, camera-feel, camera-validation |
| `meadow-input-dsk` | planned | action-map, device-bindings, input-context, input-normalization, input-validation |
| `meadow-interaction-dsk` | planned | interactable-registry, affordance-rules, inspect-state, interaction-events, interaction-validation |
| `meadow-story-dsk` | planned | story-state, story-beats, dialogue-text, sequence-runner, story-validation |
| `meadow-objective-dsk` | planned | objective-model, objective-flow, completion-ledger, feedback-surface, objective-validation |
| `meadow-ecology-dsk` | planned | ambient-life, ecology-zones, ambience-triggers, non-gameplay-agents, ecology-validation |
| `meadow-audio-dsk` | planned | ambient-bed, spatial-audio-cues, audio-state, audio-events, audio-validation |
| `meadow-ui-dsk` | planned | minimal-hud, story-text-panel, debug-ui, ui-state, ui-validation |
| `meadow-save-dsk` | planned | save-model, save-slots, persistence-adapter, migration, save-validation |
| `meadow-diagnostics-dsk` | active-v0.1 | runtime-health, render-health, determinism-checks, smoke-tests, diagnostics-report |
| `meadow-performance-dsk` | active-v0.1 | quality-profile, budget-policy, lod-policy, adaptive-scaling, performance-validation |
| `meadow-render-host-dsk` | active-v0.1 | renderer-selection, render-plan-ingest, pass-order, renderer-state, renderer-validation |
| `meadow-webgl-renderer-v2-kit` | active-v0.1 | model, state, events, validation, snapshot |
| `post-process-stack-dsk` | active-v0.1 | pass-registry, render-target-system, sobel-outline-pass, color-grade-pass, post-validation |
| `render-target-kit` | planned | scene-color-texture, depth-texture, normal-texture, ping-pong-buffer, resize-policy |
| `sobel-outline-pass-kit` | planned | color-edge-threshold, depth-edge-threshold, normal-edge-threshold, outline-color, object-mask |
| `color-grade-pass-kit` | planned | warmth, contrast, saturation, shadow-tint, highlight-tint |
| `depth-fog-pass-kit` | planned | fog-near, fog-far, fog-color, distance-curve, horizon-haze |
| `vignette-pass-kit` | planned | radius, softness, strength, center, quality-tier |
| `final-composite-pass-kit` | planned | scene-input, post-input, output-target, debug-overlay, fallback-composite |
| `static-pages-deploy-dsk` | active-v0.1 | build-config, github-pages-workflow, release-artifacts, cache-invalidation, deploy-validation |

## Census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned adaptive-quality surfaces: 20
```

## Validation boundary

Documentation and source inspection only. Runtime JavaScript, renderer behavior, tests, workflows and deployment were not changed. No adaptive-quality behavior, frame-rate improvement, cache invalidation, artifact parity, Pages parity or production readiness is claimed.
