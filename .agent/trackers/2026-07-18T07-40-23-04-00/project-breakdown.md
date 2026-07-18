# Project Breakdown: Render Descriptor and Mesh Expansion Budget

**Timestamp:** `2026-07-18T07-40-23-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed repository head:** `f48b52b04644ef4b7d08c214e9b421b45a9fd717`  
**Reviewed runtime source revision:** `ba702cc59dd0a8a4acfae3246ac16b45261d0c4d`  
**Status:** `render-descriptor-mesh-expansion-budget-authority-audited`

## Summary

IntoTheMeadow computes descriptor counts and a topology key, but render-plan validation only verifies schema identity, required object types and array presence. It does not admit terrain resolution, instance counts, generated vertex counts, typed-buffer bytes or a device/profile budget before `buildMeadowMeshData()` expands every accepted descriptor into JavaScript arrays and the renderer creates five `Float32Array` uploads.

The current source has deterministic local content and is not shown to fail. This is an admission, bounded-work and proof gap rather than a reproduced performance incident.

## Intent

Create one render-work authority that predicts descriptor expansion, admits a bounded plan, settles overflow through rejection or deterministic degradation, and proves that the presented frame uses the accepted plan and mesh budget generation.

## Checklist

- [x] Compare all 11 current `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers, root `.agent` states and synchronized heads.
- [x] Select only IntoTheMeadow by the oldest documented-selection rule.
- [x] Identify the complete interaction loop and all domains in use.
- [x] Preserve all 44 declared kit surfaces and offered services.
- [x] Trace descriptor creation, validation, mesh expansion, buffer upload and draw submission.
- [x] Define one render-budget authority and 20 coordinating surfaces.
- [x] Add this timestamped root `.agent` audit family.
- [x] Change documentation only on `main`; create no branch or pull request.
- [ ] Implement and execute bounded-plan, overflow, browser and deployment fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/IntoTheMeadow
selection rule: oldest synchronized central timestamp
selected prior timestamp: 2026-07-17T19-38-37-04-00
next oldest: LuminaryLabs-Publish/ZombieOrchard at 2026-07-17T21-40-33-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser boot
  -> load pinned meadow-area provider
  -> create source render plan
  -> enhance into meadow-render-plan/v2
  -> compute descriptorCounts and topologyKey
  -> validate schema, required types and array presence
  -> build all terrain, grass, flower, cover, rock, tree and atmosphere vertices
  -> copy five attribute arrays into Float32Array uploads
  -> draw outline pass and main pass
  -> publish renderer snapshot

missing admission path
  -> no descriptor-count limits
  -> no terrain-resolution limit
  -> no predicted vertex/byte budget
  -> no profile/device budget selection
  -> no overflow classification or deterministic degradation
  -> no accepted-budget generation digest
  -> no first budget-bound frame acknowledgement
```

## Domains in use

```txt
repository and audit identity
browser startup and host lifecycle
external provider loading
DSK declaration and service inventory
source render-plan generation
render-plan v2 enhancement and schema validation
topology identity and cache reuse
terrain tessellation and procedural sampling
grass batch/card/instance expansion
flower, cover, rock and tree geometry expansion
CPU JavaScript array construction
Float32 attribute-buffer allocation and WebGL upload
renderer viewport, outline pass and main pass
performance profile and budget-policy declaration
render-work admission and overflow settlement
renderer snapshot and visible-frame correlation
source, browser, artifact and Pages evidence
central tracking and reconciliation
```

## Source-backed finding

`validateMeadowRenderPlanV2()` verifies required types and arrays but does not bound any count or resolution. `descriptorCounts` is diagnostic only. `buildMeadowMeshData()` then iterates the full accepted terrain resolution and all field instances, accumulating positions, normals, colors, outline weights and wind attributes in unbounded JavaScript arrays. The renderer converts those arrays into five `Float32Array` uploads only after the full mesh has been built.

```txt
attribute payload per vertex:
  position: 3 floats
  normal: 3 floats
  color: 3 floats
  outline: 1 float
  wind: 2 floats
  total: 12 floats = 48 typed-array bytes per vertex

near grass expansion:
  card limit: 28 cards per instance
  each card: 2 quads + 1 triangle = 5 triangles = 15 vertices
  maximum generated vertices per near instance: 420

current admission state:
  descriptor count limits: absent
  terrain segment limits: absent
  predicted vertex count: absent
  predicted typed-buffer bytes: absent
  accepted performance profile: absent
  overflow result: absent
  deterministic degradation result: absent
  mesh-budget generation digest: absent
  FirstRenderBudgetBoundFrameAck: absent
```

The 48-byte figure is source arithmetic for typed attribute payloads only. It excludes retained JavaScript arrays, temporary arrays, WebGL driver copies, command overhead and implementation-specific memory.

## Required authority

`meadow-render-descriptor-mesh-expansion-budget-authority-domain`

```txt
RenderWorkEstimateCommand
  -> inspect terrain resolution, batch/card counts and object fields
  -> publish RenderWorkEstimateResult

RenderBudgetAdmissionCommand
  -> bind profile, viewport/device class and hard limits
  -> publish RenderBudgetAdmissionResult

RenderOverflowSettlementCommand
  -> accept, reject or deterministically degrade
  -> publish RenderOverflowSettlementResult

MeshBuildCommitCommand
  -> build only the admitted descriptor generation
  -> publish MeshBuildResult and attribute-byte readback

RenderBudgetProjectionCommitCommand
  -> bind plan, mesh, renderer and frame digests
  -> publish FirstRenderBudgetBoundFrameAck
```

## Planned authority surfaces

```txt
1. meadow-render-descriptor-mesh-expansion-budget-authority-domain
2. render-work-estimator-kit
3. terrain-resolution-budget-kit
4. grass-card-expansion-budget-kit
5. field-instance-budget-kit
6. hero-tree-expansion-budget-kit
7. vertex-count-estimate-kit
8. attribute-byte-estimate-kit
9. render-profile-selection-kit
10. render-budget-admission-kit
11. hard-limit-policy-kit
12. deterministic-degradation-policy-kit
13. overflow-classification-kit
14. render-plan-budget-result-kit
15. mesh-build-admission-kit
16. mesh-build-result-kit
17. stale-budget-generation-rejection-kit
18. renderer-budget-readback-kit
19. render-budget-fixture-kit
20. first-render-budget-bound-frame-ack-kit
```

## Complete kit and offered service inventory

| Kit | Status | Offered services |
|---|---|---|
| `meadow-area-kit` | external loaded | meadow configuration, deterministic render-plan generation, snapshot, validation |
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

## Validation boundary

Documentation only. Runtime JavaScript, DSK descriptors, provider loading, rendering, gameplay, tests, package scripts, workflows and deployment were not changed. `npm run check`, synthetic overflow fixtures, device-profile browser fixtures, production artifact smoke and Pages smoke were not run.