# Current Audit: Render-Plan and Mesh Cache Coherence Authority

**Updated:** `2026-07-13T16-01-05-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `render-plan-mesh-cache-coherence-authority-central-reconciled`  
**Immediate predecessor:** `render-surface-viewport-authority-central-reconciled` at `2026-07-13T10-59-22-04-00`

## Summary

IntoTheMeadow uses one persistent cache in `createRenderPlanEnhancer()` and another in `meadow-webgl-renderer-v2`. The enhancer reuses a contracted render plan based on `sourceTopologyKey`. The renderer reuses CPU mesh data and GPU buffers based on `contract.topologyKey`.

Both fingerprints omit values that their downstream stages consume. A render-affecting source or policy change can therefore be accepted while the browser keeps a predecessor contracted plan or predecessor static mesh. No aggregate render revision, typed cache decision, candidate preparation receipt, rollback result or first visible cache-revision acknowledgement exists.

## Plan ledger

**Goal:** define one cache-coherence transaction that classifies every dependency, rebuilds only the required stages and proves the accepted generation in the visible frame.

- [x] Compare the complete Publish inventory against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repositories have central and root `.agent` coverage.
- [x] Confirm all eligible repo heads match their recorded documentation heads.
- [x] Select only IntoTheMeadow by the oldest eligible central timestamp.
- [x] Trace source fingerprint, contracted-plan generation, topology fingerprint, CPU mesh and GPU-buffer reuse.
- [x] Identify all active domains.
- [x] Preserve all 44 declared kit surfaces and services.
- [x] Define the cache-coherence authority and 24 candidate surfaces.
- [x] Add the timestamped tracker and system audits.
- [x] Change no runtime source, dependency, script, test or workflow.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute invalidation, failure, build and Pages fixtures later.

## Complete interaction loop

```txt
browser frame
  -> game.tick({ time, dt })
  -> get raw render plan
  -> calculate sourceTopologyKey
  -> reuse or rebuild contracted plan
  -> calculate contract.topologyKey
  -> reuse or rebuild CPU mesh and GPU attribute buffers
  -> apply camera, light, sky and wind uniforms
  -> draw outline and color passes
  -> publish enhancer and renderer cache counters
  -> editor reads snapshots or captures pixels without one revision
```

## Domains in use

```txt
browser document, canvas, RAF, loading and fatal projection
external provider and deterministic fallback generation
immutable game state, snapshots, reset and diagnostics
DSK declarations, composition and validation
meadow terrain, path, scatter, trees, grass, wind and atmosphere
source render-plan and runtime-policy revisions
render-plan enhancement, normalization and quality policy
contracted descriptor graph and contract validation
enhancer cache identity and lifecycle
CPU mesh dependency classification and generation
renderer mesh cache and GPU-buffer lifecycle
dynamic camera, light, sky and wind uniforms
GameHost and editor cache/readback/capture observations
visible frame provenance and acknowledgement
headless editor scenarios, loops and artifacts
static checks, build and Pages deployment
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total kit surfaces: 44
required-v0.1 local declarations: 15
planned local declarations: 28
implemented cache-coherence authorities: 0
planned cache-coherence surfaces including parent: 24
```

## Implemented kit families

```txt
provider/composition:
  meadow-area-kit
  into-the-meadow-game-dsk
  web-host-dsk
  game-composition-dsk
  meadow-area-bridge-dsk

world:
  meadow-terrain-texture-dsk
  path-corridor-dsk
  wind-field-dsk
  tree-object-dsk
  meadow-scatter-dsk
  meadow-atmosphere-dsk

grass:
  grass-density-texture-kit
  grass-clump-archetype-kit
  grass-static-batch-kit
  grass-patch-placement-kit
  grass-clump-instancing-render-kit
  grass-shader-wind-kit
  grass-lod-policy-kit
  grass-density-scaling-kit
  grass-debug-visualization-kit
  grass-patch-dsk
  gpu-grass-render-dsk

planned gameplay/application:
  meadow-player-dsk
  meadow-camera-dsk
  meadow-input-dsk
  meadow-interaction-dsk
  meadow-story-dsk
  meadow-objective-dsk
  meadow-ecology-dsk
  meadow-audio-dsk
  meadow-ui-dsk
  meadow-save-dsk
  meadow-diagnostics-dsk
  meadow-performance-dsk

render/deploy:
  meadow-render-host-dsk
  meadow-webgl-renderer-v2-kit
  post-process-stack-dsk
  render-target-kit
  sobel-outline-pass-kit
  color-grade-pass-kit
  depth-fog-pass-kit
  vignette-pass-kit
  final-composite-pass-kit
  static-pages-deploy-dsk
```

The complete per-kit service table is preserved in `.agent/trackers/2026-07-13T16-01-05-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Offered service groups

```txt
provider/composition:
  deterministic area generation, provider adaptation, manifests, registry,
  boot, state, snapshots and validation

world/grass:
  terrain and path models, deterministic scatter, density fields, clump
  archetypes, placement, instancing, wind, LOD, trees and atmosphere

planned gameplay:
  player, camera, input, interaction, story, objectives, ecology, audio,
  UI, persistence, diagnostics and adaptive performance contracts

render/deploy:
  render-plan ingest, contract normalization, CPU mesh generation, WebGL
  buffers and submission, post-process descriptors, resize, snapshots,
  disposal, static build and Pages validation

editor/headless:
  public state/render/cache observations, direct tick/reset, canvas capture,
  browser errors, terminal/scenario/loop execution and artifacts
```

## Source-backed findings

```txt
sourceTopologyKey omits consumed object colors and accents
sourceTopologyKey omits atmosphere hill descriptors
sourceTopologyKey omits path rutCount and pebbleCount
sourceTopologyKey omits multiple focal-tree geometry and presentation fields
runtime.performance is outside the enhancer cache key
topologySummary omits atmosphere and static material inputs
topologySummary omits focal-tree materials and outline weight
ensureMesh trusts contract.topologyKey as the sole mesh/GPU cache authority
mesh builder bakes omitted values into static vertex arrays
existing tests prove time-only reuse but not positive invalidation
aggregate cache decision and visible-frame acknowledgement are absent
```

## Main failure paths

```txt
source field omitted from enhancer key
  -> enhancer returns previous contracted plan
  -> renderer never sees the accepted source change

contract rebuild changes an omitted mesh dependency
  -> contract.topologyKey stays unchanged
  -> renderer reuses predecessor CPU mesh and GPU buffers

candidate mesh or buffer preparation fails
  -> no aggregate result or rollback receipt exists

editor captures after an accepted source mutation
  -> no revision proves the pixels adopted that mutation
```

## Required parent domain

```txt
meadow-render-cache-coherence-authority-domain
```

## Required transaction

```txt
RenderRevisionCommand
  -> bind source, policy, contract, mesh and GPU predecessor revisions
  -> normalize the complete source descriptor graph
  -> classify dynamic, contract and mesh dependencies
  -> calculate exhaustive fingerprints
  -> decide reuse, partial rebuild, full rebuild or rejection
  -> prepare contracted plan, CPU mesh and GPU candidates
  -> atomically adopt every required participant or preserve predecessors
  -> publish RenderCacheDecisionResult and participant receipts
  -> render a revision-bearing frame
  -> acknowledge FirstCacheRevisionFrameAck
```

## Planned coordinating kits

```txt
meadow-render-cache-coherence-authority-domain
source-render-plan-revision-kit
render-policy-revision-kit
render-dependency-manifest-kit
descriptor-dependency-classification-kit
enhancement-dependency-fingerprint-kit
contract-descriptor-fingerprint-kit
mesh-dependency-fingerprint-kit
dynamic-uniform-fingerprint-kit
render-cache-command-kit
render-cache-decision-kit
stale-render-revision-rejection-kit
duplicate-render-revision-suppression-kit
enhancer-cache-admission-kit
contract-cache-admission-kit
mesh-cache-admission-kit
gpu-buffer-generation-kit
mesh-candidate-preparation-kit
gpu-buffer-candidate-preparation-kit
render-cache-atomic-adoption-kit
render-cache-rollback-kit
render-cache-journal-kit
render-cache-public-readback-kit
first-cache-revision-frame-ack-kit
render-cache-fixture-gate-kit
```

## Retained architecture priorities

```txt
render-surface viewport authority
browser editor capability admission
web-host lifecycle retirement
workspace canonical containment
provider-source parity
WebGL context/resource recovery
single-chain fixed-step scheduling
executable DSK provider consumption
playable exploration and progression
camera-bound grass visibility and LOD
audio user-gesture lifecycle
atomic save/migration and independent replay
```

## Validation boundary

Documentation only. No runtime cache identity, dependency manifest, positive invalidation fixture, candidate preparation, rollback, public cache readback, visible-frame fixture, build fixture or Pages fixture was executed.