# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit timestamp:** `2026-07-12T04-11-54-04-00`

## Status

```txt
status: grass-visibility-lod-authority-audited
source revision reviewed: e4599211818dd4a5a6f7bb33a060d4778ce2ef2a
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central synchronization: pending this commit, completed by paired ledger update
```

## Summary

The repository has a substantial deterministic grass descriptor stack: a 128×128 density texture, five clump families with two variants each, near/mid/far static batches, patch placement, draw groups, wind, a four-tier LOD policy and CPU mesh generation.

The policy and runtime are disconnected. Density determines whether a patch instance uses a near or mid batch. The far and terrain-tint tiers are not selected. All patch instances enter draw groups, the enhanced plan is cached without camera identity, and the CPU mesh builder expands the entire field into static triangles. No authoritative visible set, frustum admission, camera revision, instance/card budget result or visible-frame receipt exists.

## Plan ledger

**Goal:** define one camera-derived grass visible-set transaction that preserves deterministic placement while bounding patches, instances, cards and triangles by declared distance, frustum and quality policy.

- [x] Compare all accessible Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible root `.agent` states and central records.
- [x] Select only `IntoTheMeadow` as the oldest eligible repository.
- [x] Inspect the render boundary and current validation minimum.
- [x] Trace density generation, batch construction, patch placement, draw grouping and mesh expansion.
- [x] Verify the four-tier LOD policy has no runtime consumer.
- [x] Verify the enhancer and web host provide no camera observation to grass selection.
- [x] Verify smoke tests check structure and topology stability, not distance/frustum behavior.
- [x] Preserve the complete 44-kit inventory and service map.
- [x] Define authority, coordinating kits, result schema, invariants and fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute grass visibility and LOD authority.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

IntoTheMeadow      2026-07-12T02-38-23-04-00 selected oldest
HorrorCorridor     2026-07-12T02-49-19-04-00
PhantomCommand     2026-07-12T03-00-46-04-00
ZombieOrchard      2026-07-12T03-11-51-04-00
TheUnmappedHouse   2026-07-12T03-21-27-04-00
AetherVale         2026-07-12T03-28-44-04-00
MyCozyIsland       2026-07-12T03-39-52-04-00
PrehistoricRush    2026-07-12T03-51-15-04-00
TheOpenAbove       2026-07-12T04-00-32-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was selected.

## Interaction loop

```txt
startup
  -> load commit-pinned meadow provider
  -> install 43 local DSK and kit descriptors
  -> create one static meadow source plan
  -> create density texture, grass archetypes and near/mid/far batches
  -> create patches and assign each instance a batch from density
  -> group every instance into static draw groups
  -> cache the enhanced topology
  -> build one CPU mesh and upload WebGL buffers

frame
  -> tick game with fixed 1/60 delta
  -> retrieve the same source topology with updated time
  -> enhancer returns the cached grass system
  -> no camera position enters grass selection
  -> mesh/render path retains every grass draw-group instance
  -> debug reports total instances and total vertices
  -> render the full static grass field
```

## Source-backed findings

### The declared policy is complete enough to express intent

`grass-lod-policy-kit` declares near, mid, far and terrain-tint tiers at 32, 72, 128 and 220 units. `grass-static-batch-kit` creates near, mid and far batches for every archetype.

### Patch assignment uses density instead of view distance

`grass-patch-placement-kit.chooseBatch()` selects from near batches when density exceeds `0.55`, otherwise from mid batches. Camera position, patch distance, frustum state and the declared LOD policy are not inputs. The far batch pool is never selected.

### Draw grouping retains the complete field

`grass-clump-instancing-render-kit` iterates every patch and every instance and groups them by batch/material. It has no visible-set or budget input.

### The enhancer caches grass without camera identity

`createRenderPlanEnhancer()` rebuilds only when the source topology key changes. Per-frame updates change time only. The web host does not pass camera state to the enhancer.

### The active renderer is CPU-expanded, not view-admitted instancing

`addGrassField()` loops every draw group and every instance, then emits blade ribbon triangles. It hard-caps cards to 28 for near, 16 for mid and 4 for far, but does not calculate distance or frustum visibility. The resulting grass is part of one persistent CPU mesh and WebGL buffer set.

### Declared far and terrain-tint tiers are unreachable

Patch placement can emit only near or mid batch IDs. The mesh builder has no terrain-tint path. Therefore the policy's far and tint tiers do not affect shipped rendering.

### Diagnostics report totals, not admitted work

The web host reports total descriptor grass instances and total mesh vertices. It does not report visible patch count, culled patch count, instances/cards by tier, budget pressure, visible-set revision or frame acknowledgement.

### Existing checks prove structure, not runtime LOD

The render-plan smoke confirms density textures, static batches, patches and draw groups exist. The renderer smoke confirms buffer consistency and topology stability. Neither changes camera distance, checks frustum rejection, reaches far/tint tiers or compares work budgets.

## Domains in use

```txt
browser shell, loading and visible failure projection
external provider loading, validation and fallback
DSK declaration, registry validation and install snapshots
game manifest, immutable state, tick, reset, snapshot and diagnostics
runtime lifecycle, RAF clock and reset epoch
camera descriptors and browser view observation
terrain, path and terrain sampling
grass density texture generation and path suppression
grass archetype, static batch and patch placement
grass draw-group construction and wind descriptors
declared grass distance LOD policy
CPU grass mesh expansion and WebGL buffer ownership
grass visible-set, frustum and card-budget authority
player, input, interaction, objective, story and persistence declarations
flowers, rocks, ground cover, trees, atmosphere and scatter
render-plan topology, post processing and WebGL rendering
committed draw plan and visible-frame observation
validation, headless tools, build and Pages deployment
DSK implementation, dependency, consumption and retirement truth
```

## Complete kit inventory and services

```txt
meadow-area-kit: area normalization, path normalization, style and material normalization, deterministic seeded scatter, grass flower rock mushroom and tree descriptors, wind and atmosphere descriptors, render-plan generation, validation snapshot reset and optional runtime adapter
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
meadow-webgl-renderer-v2-kit: WebGL context acquisition, shader program creation, attribute and uniform binding, CPU mesh ingestion, GPU buffer ownership, draw submission, resize, snapshot, disposal
post-process-stack-dsk: pass-registry, render-target-system, sobel-outline-pass, color-grade-pass, post-validation
render-target-kit: scene-color-texture, depth-texture, normal-texture, ping-pong-buffer, resize-policy
sobel-outline-pass-kit: color-edge-threshold, depth-edge-threshold, normal-edge-threshold, outline-color, object-mask
color-grade-pass-kit: warmth, contrast, saturation, shadow-tint, highlight-tint
depth-fog-pass-kit: fog-near, fog-far, fog-color, distance-curve, horizon-haze
vignette-pass-kit: radius, softness, strength, center, quality-tier
final-composite-pass-kit: scene-input, post-input, output-target, debug-overlay, fallback-composite
static-pages-deploy-dsk: build-config, github-pages-workflow, release-artifacts, cache-invalidation, deploy-validation
```

## Grass system implementation census

```txt
grass density texture resolution: 128 x 128
grass families: short, tall, meadow, shadow, flower-edge
variants per family: 2
static tiers per archetype: near, mid, far
declared policy tiers: near, mid, far, terrain-tint
patch size: 7.2
instances per admitted patch: floor(density * densityScale * 5), minimum 1
runtime patch batch choices: near or mid only
runtime far selection: 0 paths
runtime terrain-tint selection: 0 paths
camera inputs to grass creation: 0
frustum inputs to grass creation: 0
visible-set revisions: 0
```

## Required parent domain

```txt
meadow-grass-visibility-lod-authority-domain
```

Existing owners to update first:

```txt
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
grass-patch-dsk
gpu-grass-render-dsk
meadow-performance-dsk
meadow-camera-dsk
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
meadow-diagnostics-dsk
render contract meadow-render-plan/v2
render-plan enhancer
CPU mesh builder
web host
Committed Frame Observation Authority
```

Candidate coordinating kits:

```txt
grass-view-observation-kit
grass-camera-revision-kit
grass-patch-bounds-kit
grass-patch-distance-kit
grass-lod-selection-kit
grass-frustum-admission-kit
grass-visible-set-kit
grass-visible-set-revision-kit
grass-instance-budget-kit
grass-card-budget-kit
grass-terrain-tint-transition-kit
grass-draw-plan-kit
grass-draw-plan-result-kit
stale-grass-visibility-rejection-kit
grass-visibility-observation-kit
grass-visibility-journal-kit
grass-visible-frame-ack-kit
grass-lod-distance-fixture-kit
grass-frustum-fixture-kit
grass-budget-fixture-kit
browser-grass-traversal-smoke-kit
```

## Grass draw-plan result contract

```txt
GrassDrawPlanResult
  planId
  schemaVersion
  runtimeSessionId
  contextGeneration
  surfaceRevision
  cameraRevision
  visibleSetRevision
  policyRevision
  qualityRevision
  status: committed | rejected | stale | fallback
  patchCounts: considered, admitted, culledDistance, culledFrustum
  instanceCountsByTier
  cardCountsByTier
  terrainTintPatchCount
  budget: instanceLimit, cardLimit, appliedFallback
  rejectionReasons
  frameAckId
```

## Required invariants

```txt
density controls placement probability, not camera LOD
one patch receives one tier from one versioned distance policy
far and terrain-tint tiers are reachable
off-frustum patches create no active grass draw work
instance and card limits are explicit and deterministic
quality changes create a new grass policy or draw-plan revision
stale camera, surface or context results cannot commit
path suppression survives every LOD tier
diagnostics report requested and applied work
the visible frame cites the committed visible-set revision
```

## Required proof

```txt
near, mid, far and terrain-tint thresholds are exercised at exact boundaries
patch LOD is selected from camera distance, not grass density
off-frustum patches are absent from the committed visible set
far and terrain-tint tiers are reachable
instance and card budgets remain bounded during camera traversal
quality changes produce explicit grass-plan revisions
stale camera or surface observations cannot commit
path suppression remains intact after LOD selection
browser, headless observation and renderer diagnostics agree
the first visible frame cites the committed grass visible-set revision
deployed Pages traversal proves bounded grass work
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
7c. Grass Visibility and LOD Authority
8. Interaction Command and Objective Progression Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
9a. Deterministic Replay Validation Authority
```

## Validation

```txt
runtime source changed: no
grass source changed: no
renderer source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
grass distance fixtures: unavailable
grass frustum fixtures: unavailable
grass budget fixtures: unavailable
browser/Pages traversal smoke: unavailable
```
