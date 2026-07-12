# Project Breakdown: IntoTheMeadow Grass Visibility and LOD Authority

**Timestamp:** `2026-07-12T13-38-52-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Change type:** documentation-only

## Summary

IntoTheMeadow exposes a four-tier grass LOD policy, but the active path never makes a camera-bound LOD decision. Patch placement selects near or mid batches from density, far and terrain-tint are unreachable, all instances are baked into one mesh, and the complete mesh is drawn twice every frame.

## Plan ledger

**Goal:** preserve the complete repository breakdown while defining one grass visibility authority from committed camera evidence through frustum/distance classification, hysteresis, budget admission, visible-set generation and first-frame proof.

- [x] Enumerate the full current Publish organization.
- [x] Compare it with `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish`.
- [x] Verify root `.agent` coverage for all nine eligible repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Detect newer repo-local work in `TheOpenAbove` and leave it untouched.
- [x] Select only `IntoTheMeadow`.
- [x] Trace the complete interaction loop.
- [x] Identify all domains in use.
- [x] List all 44 declared kits.
- [x] Record every offered service.
- [x] Audit grass density, batches, placement, grouping, LOD, mesh creation, camera use and draw submission.
- [x] Define the DSK/domain boundary and fixture gates.
- [x] Update root `.agent` state.
- [x] Prepare central ledger and change-log synchronization.
- [x] Create no branch or pull request.
- [ ] Runtime implementation remains future work.

## Repository selection comparison

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
missing central ledger: 0
missing root .agent: 0

TheOpenAbove       central 11:15:16, repo-local 13:29:56, skipped
IntoTheMeadow      11:29:40 selected
PhantomCommand     11:48:43
PrehistoricRush    12:08:05
HorrorCorridor     12:21:38
ZombieOrchard      12:39:25
MyCozyIsland       12:58:08
TheUnmappedHouse   13:08:15
AetherVale         13:20:00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
boot
  -> load external meadow-area provider
  -> install local/external DSK descriptors
  -> create immutable game state and source plan
  -> create performance/wind/post descriptors
  -> create grass density texture
  -> create clump archetypes
  -> create near/mid/far static batches
  -> create full-area patch grid
  -> choose near or mid batch per instance from density
  -> aggregate all instances into draw groups
  -> attach and validate four-tier LOD policy
  -> create static render topology
  -> build one CPU mesh containing all grass and other scene geometry
  -> acquire WebGL and begin RAF

frame
  -> tick fixed simulation input
  -> reuse static enhanced plan and mesh
  -> resize render surface
  -> derive view/projection matrix from camera
  -> update time/wind/light uniforms
  -> draw the entire mesh in outline pass
  -> draw the entire mesh in color pass
  -> publish aggregate counts and cache state
  -> schedule next frame

diagnostics/proof
  -> validate descriptor structure
  -> validate grass patches and draw groups exist
  -> validate static topology is time-invariant
  -> validate mesh array lengths
  -> capture page/editor/gpu markers and screenshot bytes
  -> omit camera-to-grass visibility evidence
```

## Main source findings

```txt
grass-lod-policy-kit:
  near <= 32
  mid <= 72
  far <= 128
  terrain-tint <= 220
  pick(distance) exists

grass-patch-placement-kit:
  density > 0.55 -> near batch
  otherwise -> mid batch
  far not selected
  terrain-tint not represented

grass-clump-instancing-render-kit:
  flattens every patch instance into batch draw groups
  no camera/frustum input

meadow-mesh-builder-v2:
  iterates every grass group and instance
  appends all blade geometry into one collector
  returns one immutable static mesh

meadow-webgl-renderer-v2:
  computes camera matrix after mesh selection
  draws mesh.vertexCount twice
  no visible-set or cull result
```

## Domains in use

```txt
browser shell and fatal projection
external source-provider loading/fallback
DSK registry and install validation
immutable game state, tick, reset, snapshots and diagnostics
runtime session, RAF clock and reset epoch
camera/view/viewport observation
terrain and path generation/sampling
grass density generation and quality scaling
grass archetype and static-batch generation
grass patch-grid and instance placement
grass draw-group aggregation and wind binding
grass distance bands and frustum classification
grass LOD hysteresis and transition policy
grass instance/vertex/draw budgets
terrain-tint representation
visible-set, mesh and draw generations
wind, trees, flowers, rocks, ground cover and atmosphere
render-plan enhancement and topology caching
CPU mesh construction
WebGL context/program/buffer/uniform/draw ownership
renderer snapshots and committed-frame observation
player/input/interaction/objective/story/ecology/audio/UI/save declarations
GameHost and editor capabilities
headless editor, scenarios and artifacts
validation, build and Pages deployment
```

## Kit census

```txt
external kits: 1
local kits: 43
total declared kits: 44
grass-specific kits: 11
```

## External kit

### `meadow-area-kit`

Offers: `area normalization`, `path normalization`, `style and material normalization`, `deterministic seeded scatter`, `grass flower rock mushroom and tree descriptors`, `wind and atmosphere descriptors`, `render-plan generation`, `validation`, `snapshot`, `reset`, `optional runtime adapter`.

## Local kits and offered services

### `into-the-meadow-game-dsk`
Offers: `game-manifest`, `kit-stack-registry`, `game-state-root`, `boot-sequence`, `game-snapshot`.

### `web-host-dsk`
Offers: `document-shell`, `browser-loop`, `host-debug-surface`, `asset-loading-host`, `browser-safety`.

### `game-composition-dsk`
Offers: `dsk-registry`, `scene-composition`, `render-composition`, `simulation-composition`, `composition-validation`.

### `meadow-area-bridge-dsk`
Offers: `meadow-area-config`, `meadow-feature-config`, `meadow-area-kit-adapter`, `meadow-area-state`, `meadow-area-validation`.

### `meadow-terrain-texture-dsk`
Offers: `terrain-surface-model`, `material-layer-system`, `path-layer-system`, `terrain-sampler`, `terrain-validation`.

### `path-corridor-dsk`
Offers: `path-curve-model`, `walkable-corridor`, `path-surface-detail`, `path-progression`, `path-validation`.

### `grass-density-texture-kit`
Offers: `density-texture-model`, `density-channels`, `density-compositor`, `density-sampler`, `density-validation`.

### `grass-clump-archetype-kit`
Offers: `clump-family-registry`, `card-layout-generator`, `texture-atlas-binding`, `clump-variant-generator`, `archetype-validation`.

### `grass-static-batch-kit`
Offers: `clump-mesh-builder`, `batch-variant-cache`, `atlas-material`, `static-batch-lod`, `batch-validation`.

### `grass-patch-placement-kit`
Offers: `patch-grid`, `density-driven-placement`, `clump-instance-selection`, `patch-instance-buffer`, `placement-validation`.

### `grass-clump-instancing-render-kit`
Offers: `batch-registry`, `instance-stream`, `draw-group-builder`, `shader-binding`, `render-validation`.

### `grass-shader-wind-kit`
Offers: `wind-uniforms`, `tip-bend-model`, `phase-field`, `gust-response`, `wind-validation`.

### `grass-lod-policy-kit`
Offers: `near-lod`, `mid-lod`, `far-lod`, `terrain-tint-lod`, `lod-validation`.

### `grass-density-scaling-kit`
Offers: `quality-scale`, `budget-scale`, `density-scale`, `profile-scale`, `scale-validation`.

### `grass-debug-visualization-kit`
Offers: `density-view`, `patch-view`, `instance-view`, `lod-view`, `debug-validation`.

### `grass-patch-dsk`
Offers: `patch-grid`, `blade-distribution`, `terrain-awareness`, `wind-binding`, `grass-validation`.

### `gpu-grass-render-dsk`
Offers: `grass-instance-buffer`, `grass-blade-mesh`, `shader-wind`, `grass-lod-render`, `grass-render-validation`.

### `wind-field-dsk`
Offers: `wind-state`, `wind-sampler`, `wind-zones`, `wind-consumers`, `wind-validation`.

### `tree-object-dsk`
Offers: `focal-tree-model`, `tree-line-model`, `tree-materials`, `tree-wind-binding`, `tree-validation`.

### `meadow-scatter-dsk`
Offers: `flower-scatter`, `rock-scatter`, `mushroom-scatter`, `placement-rules`, `scatter-validation`.

### `meadow-atmosphere-dsk`
Offers: `sky-gradient`, `sun-system`, `cloud-layer`, `distant-hills`, `atmosphere-validation`.

### `meadow-player-dsk`
Offers: `player-state`, `movement-profile`, `terrain-contact`, `player-actions`, `player-validation`.

### `meadow-camera-dsk`
Offers: `camera-mode`, `camera-rig`, `camera-collision`, `camera-feel`, `camera-validation`.

### `meadow-input-dsk`
Offers: `action-map`, `device-bindings`, `input-context`, `input-normalization`, `input-validation`.

### `meadow-interaction-dsk`
Offers: `interactable-registry`, `affordance-rules`, `inspect-state`, `interaction-events`, `interaction-validation`.

### `meadow-story-dsk`
Offers: `story-state`, `story-beats`, `dialogue-text`, `sequence-runner`, `story-validation`.

### `meadow-objective-dsk`
Offers: `objective-model`, `objective-flow`, `completion-ledger`, `feedback-surface`, `objective-validation`.

### `meadow-ecology-dsk`
Offers: `ambient-life`, `ecology-zones`, `ambience-triggers`, `non-gameplay-agents`, `ecology-validation`.

### `meadow-audio-dsk`
Offers: `ambient-bed`, `spatial-audio-cues`, `audio-state`, `audio-events`, `audio-validation`.

### `meadow-ui-dsk`
Offers: `minimal-hud`, `story-text-panel`, `debug-ui`, `ui-state`, `ui-validation`.

### `meadow-save-dsk`
Offers: `save-model`, `save-slots`, `persistence-adapter`, `migration`, `save-validation`.

### `meadow-diagnostics-dsk`
Offers: `runtime-health`, `render-health`, `determinism-checks`, `smoke-tests`, `diagnostics-report`.

### `meadow-performance-dsk`
Offers: `quality-profile`, `budget-policy`, `lod-policy`, `adaptive-scaling`, `performance-validation`.

### `meadow-render-host-dsk`
Offers: `renderer-selection`, `render-plan-ingest`, `pass-order`, `renderer-state`, `renderer-validation`.

### `meadow-webgl-renderer-v2-kit`
Offers: `WebGL context acquisition`, `shader program creation`, `attribute and uniform binding`, `CPU mesh ingestion`, `GPU buffer ownership`, `draw submission`, `resize`, `snapshot`, `disposal`.

### `post-process-stack-dsk`
Offers: `pass-registry`, `render-target-system`, `sobel-outline-pass`, `color-grade-pass`, `post-validation`.

### `render-target-kit`
Offers: `scene-color-texture`, `depth-texture`, `normal-texture`, `ping-pong-buffer`, `resize-policy`.

### `sobel-outline-pass-kit`
Offers: `color-edge-threshold`, `depth-edge-threshold`, `normal-edge-threshold`, `outline-color`, `object-mask`.

### `color-grade-pass-kit`
Offers: `warmth`, `contrast`, `saturation`, `shadow-tint`, `highlight-tint`.

### `depth-fog-pass-kit`
Offers: `fog-near`, `fog-far`, `fog-color`, `distance-curve`, `horizon-haze`.

### `vignette-pass-kit`
Offers: `radius`, `softness`, `strength`, `center`, `quality-tier`.

### `final-composite-pass-kit`
Offers: `scene-input`, `post-input`, `output-target`, `debug-overlay`, `fallback-composite`.

### `static-pages-deploy-dsk`
Offers: `build-config`, `github-pages-workflow`, `release-artifacts`, `cache-invalidation`, `deploy-validation`.

## Required parent domain

```txt
meadow-grass-visibility-lod-authority-domain
```

## Candidate coordinating kits

```txt
grass-visibility-command-kit
grass-visibility-command-id-kit
camera-visibility-revision-kit
grass-patch-bounds-kit
grass-frustum-classification-kit
grass-distance-band-kit
grass-lod-transition-policy-kit
grass-lod-hysteresis-kit
grass-terrain-tint-representation-kit
grass-visibility-budget-kit
grass-visible-set-kit
grass-visibility-result-kit
grass-visible-mesh-generation-kit
grass-draw-generation-kit
stale-grass-visibility-rejection-kit
grass-visibility-observation-kit
grass-visibility-journal-kit
first-grass-visibility-frame-ack-kit
grass-distance-tier-fixture-kit
grass-frustum-cull-fixture-kit
grass-hysteresis-fixture-kit
grass-budget-fixture-kit
browser-grass-visibility-smoke-kit
```

## Required result

```txt
GrassVisibilityResult
  -> exact camera/viewport/topology/policy revisions
  -> tested, visible and culled patch counts
  -> near/mid/far/tint counts
  -> admitted instances, vertices and draws
  -> transition and hysteresis evidence
  -> budget reductions and reasons
  -> visible-set fingerprint
  -> mesh/draw generations
  -> stale/failure result
```

## Validation boundary

```txt
source inspected: yes
documentation updated: yes
runtime changed: no
tests executed: no
browser smoke executed: no
Pages smoke executed: no
visibility fixtures available: no
branch created: no
pull request created: no
```
