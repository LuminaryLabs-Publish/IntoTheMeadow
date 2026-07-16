# Project Breakdown: Authored Content Graph Referential Integrity

**Timestamp:** `2026-07-16T05-58-36-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Reviewed runtime revision:** `105a8fb0d06aa3e5e9d00203b96a973963d5fe21`  
**Pre-audit documentation head:** `b534655cd0714d73ee80d4aa75eed26b12026dd6`  
**Status:** `authored-content-graph-referential-integrity-authority-audited`

## Summary

IntoTheMeadow defines scene, objective, interaction-target and story-beat records with shared string identifiers, but startup validation only checks DSK descriptor shape and render-plan validity. No owned content-graph authority proves that initial-state IDs, objective target references, story triggers, action names and scene references form one valid reachable graph before the game is admitted.

## Plan ledger

**Goal:** make authored content a validated immutable generation so every accepted objective, story beat, interaction target and initial-state reference is known, unique, supported and reachable before gameplay or editor publication.

- [x] Compare all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing, undocumented or runtime-ahead.
- [x] Select only IntoTheMeadow by the oldest synchronized central timestamp.
- [x] Inspect manifest, meadow config, story beats, objectives, interaction targets, initial state, DSK installation, diagnostics and host startup.
- [x] Identify the complete interaction loop, domains, all 44 kit surfaces and offered services.
- [x] Define one content-graph authority and 20 coordinating surfaces.
- [x] Add the timestamped audit family under root `.agent`.
- [x] Change documentation only on `main`; create no branch or pull request.
- [ ] Implement content-graph admission and executable mutation/deployment fixtures later.

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
selected prior timestamp: 2026-07-16T01-38-56-04-00
next oldest: LuminaryLabs-Publish/PrehistoricRush at 2026-07-16T02-03-42-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
index.html
  -> boot-game.js
  -> web-host loads the pinned meadow-area provider
  -> createIntoTheMeadowGame imports authored content modules
  -> install 43 local DSK descriptors and one external kit
  -> create meadow render plan
  -> createInitialGameState hardcodes active scene, objective and story-beat IDs
  -> recursive RAF calls game.tick with time only
  -> render plan enhancement and WebGL presentation
  -> diagnostics count authored arrays
  -> no content-graph admission result proves references or reachability
```

Current authored references:

```txt
scene: arrival-meadow
initial active objective: walk-the-path
initial story beat: arrival
objective walk-the-path -> action path-progress -> target arrival-path
objective inspect-tree -> action inspect -> target focal-tree
story path-discovery -> trigger path-progress:0.25
story focal-tree -> trigger inspect:focal-tree
interaction targets: arrival-path, focal-tree
```

## Domains in use

```txt
repository and audit identity
browser entry, startup and host lifecycle
external provider loading and fallback composition
DSK registry, descriptor validation and snapshots
meadow area configuration and render-plan generation
authored scene identity
authored interaction-target identity
authored objective identity and completion predicates
authored story-beat identity and trigger expressions
initial gameplay state and progression references
content graph schema, uniqueness, references and reachability
editor mutation and content-generation lifecycle
render-plan enhancement and WebGL presentation
source, browser, artifact and Pages evidence
central tracking and reconciliation
```

## Source-backed finding

The content modules currently agree, but the agreement is implicit. `createInitialGameState` hardcodes `arrival-meadow`, `walk-the-path` and `arrival`; objectives refer to `arrival-path` and `focal-tree`; story triggers embed `path-progress` and `inspect:focal-tree`; interaction targets independently declare those IDs and actions.

`installDsks()` validates descriptor naming and service counts. `getDiagnostics()` validates DSK installation and the render plan, then only reports counts for story beats, objectives and interaction targets. It does not reject duplicate IDs, unknown scenes, unknown targets, unsupported actions, malformed trigger expressions, missing initial references or unreachable content.

```txt
authored module rename or editor mutation
  -> independent string reference becomes stale
  -> DSK validation still passes
  -> render-plan validation still passes
  -> host can publish a visible meadow frame
  -> objective/story progression may later become unreachable or deadlocked
```

This is a source-derived integrity risk. No broken content incident was reproduced.

## Required authority

`meadow-authored-content-graph-referential-integrity-authority-domain`

```txt
ContentGraphAdmissionCommand
  -> bind repository, manifest, scene, content and editor generations
  -> parse scene, target, objective, story, action and trigger nodes
  -> enforce schema and globally unique IDs by node type
  -> resolve objective target/action references
  -> resolve story scene/trigger references
  -> validate initial scene, objective and story-beat references
  -> reject malformed, unknown, duplicate, cyclic or unreachable content
  -> compute one immutable ContentGraphDigest
  -> publish ContentGraphAdmissionResult
  -> create gameplay state only from the accepted ContentGeneration
  -> reject stale editor mutations and retired generations
  -> publish FirstContentBoundGameplayFrameAck
```

## Planned authority surfaces

```txt
1. meadow-authored-content-graph-referential-integrity-authority-domain
2. content-node-schema-kit
3. scene-id-registry-kit
4. target-id-registry-kit
5. objective-id-registry-kit
6. story-beat-id-registry-kit
7. action-id-registry-kit
8. trigger-expression-parser-kit
9. trigger-capability-registry-kit
10. objective-target-reference-kit
11. story-trigger-reference-kit
12. initial-state-reference-kit
13. duplicate-id-rejection-kit
14. unreachable-node-analysis-kit
15. content-graph-digest-kit
16. content-graph-admission-kit
17. editor-content-mutation-validation-kit
18. runtime-content-generation-kit
19. content-graph-fixture-kit
20. first-content-bound-gameplay-frame-ack-kit
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
planned content-graph authority surfaces: 20
```

## Validation boundary

Documentation only. Runtime JavaScript, authored content, manifest, rendering, packages, tests, workflows and deployment were not changed. Source checks, browser content-mutation fixtures, artifact parity and Pages parity were not executed.