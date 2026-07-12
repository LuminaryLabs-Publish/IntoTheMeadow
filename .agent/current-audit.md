# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit timestamp:** `2026-07-12T13-38-52-04-00`  
**Status:** `grass-visibility-lod-authority-audited`

## Summary

IntoTheMeadow declares a four-tier grass LOD policy and constructs density-driven patches, reusable static batches and draw groups. The active CPU/WebGL path does not consume camera distance or frustum evidence when choosing grass representations.

Placement permanently assigns near or mid batches from local density, far batches are never selected, terrain-tint has no batch representation, and all instances are flattened into one static mesh. The renderer computes the camera matrix after the mesh has already been selected and then draws every vertex in both outline and color passes. Repo-local documentation is updated; runtime behavior is unchanged.

## Plan ledger

**Goal:** establish one authoritative grass visibility transaction from camera observation through patch classification, tier continuity, budget admission, draw generation and first-visible-frame proof.

- [x] Compare the ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Detect unsynchronized `TheOpenAbove` documentation at `2026-07-12T13-29-56-04-00` and avoid concurrent modification.
- [x] Select only `IntoTheMeadow` as the next-oldest stable repository.
- [x] Inspect the grass density texture, archetypes, static batches, patch placement, draw grouping, LOD policy and debug services.
- [x] Inspect render-plan topology, CPU mesh creation, renderer camera use, draw submission and tests.
- [x] Preserve all 44 declared kits and every offered service.
- [x] Define the parent authority, command/result model, observations and fixture gates.
- [x] Add timestamped architecture and system audits.
- [x] Change documentation only on `main`.
- [x] Create no branch or pull request.
- [ ] Implement and execute visibility/LOD authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       central 2026-07-12T11-15-16-04-00
                   repo-local 2026-07-12T13-29-56-04-00, skipped
IntoTheMeadow      2026-07-12T11-29-40-04-00 selected
PhantomCommand     2026-07-12T11-48-43-04-00
PrehistoricRush    2026-07-12T12-08-05-04-00
HorrorCorridor     2026-07-12T12-21-38-04-00
ZombieOrchard      2026-07-12T12-39-25-04-00
MyCozyIsland       2026-07-12T12-58-08-04-00
TheUnmappedHouse   2026-07-12T13-08-15-04-00
AetherVale         2026-07-12T13-20-00-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is modified in the Publish organization by this audit.

## Complete interaction loop

```txt
page boot
  -> import commit-pinned meadow-area provider
  -> install 43 local declarations plus one external provider
  -> create immutable game and source render plan
  -> create performance, wind and post-process descriptors
  -> create density texture, archetypes and near/mid/far static batches
  -> create patches across the full area
  -> select near or mid batch per instance from density
  -> flatten patch instances into batch draw groups
  -> attach the unused four-tier LOD policy
  -> build one topology key and one complete CPU mesh
  -> create WebGL renderer and start RAF

browser frame
  -> tick game
  -> reuse enhanced plan and static mesh
  -> resize the canvas
  -> derive view/projection matrices from camera
  -> upload time, wind, light and outline uniforms
  -> submit the full vertex count for outline pass
  -> submit the full vertex count for color pass
  -> publish total descriptor and mesh counts
  -> schedule successor RAF

editor and proof
  -> editor reads aggregate render snapshots and captures the canvas
  -> render-plan smoke requires grass patches and draw groups
  -> renderer smoke checks mesh size, array lengths and time-invariant topology
  -> no fixture changes camera position, frustum, LOD tier or visible patch set
```

## Source-backed findings

### Declared LOD policy

```txt
near:         <= 32
mid:          <= 72
far:          <= 128
terrain-tint: <= 220
selection API: pick(distance)
```

`createGrassLodPolicyKit()` defines these tiers, but no active source calls `pick()`.

### Actual instance classification

```txt
density > 0.55
  -> choose a random near batch

density <= 0.55
  -> choose a random mid batch

far batch selection
  -> unreachable from patch placement

terrain-tint selection
  -> no static batch exists
```

Density controls geometric complexity before camera observation. This is not distance LOD.

### Draw grouping and mesh construction

Every patch instance is copied into a draw group keyed by batch and wind shader. The mesh builder iterates every group, every instance and every selected card, then appends grass to the same collector as terrain, flowers, rocks, distant trees and the focal tree.

The completed collector becomes one immutable mesh keyed by static topology. Camera changes do not alter the topology key, patch set, batch selection or vertex count.

### Renderer behavior

The renderer:

```txt
1. ensures or reuses the complete mesh
2. derives camera matrices
3. uploads uniforms
4. draws mesh.vertexCount for outline
5. draws mesh.vertexCount for color
```

There is no patch bounds test, frustum plane test, camera distance calculation, tier transition, cull reason, visibility budget or per-tier draw result.

### Observation gap

Current snapshots record total descriptor counts, vertex/triangle counts and cache state. They omit:

```txt
camera revision
visibility revision
patches tested
patches visible
patches culled
per-tier patch/instance/vertex counts
hysteresis transitions
budget reductions
stale-result rejections
first visible grass-visibility frame receipt
```

## Domains in use

```txt
browser shell, loading and fatal projection
external provider loading, validation and fallback
DSK declaration, registry validation and install snapshots
game manifest, immutable state, tick, reset, snapshot and diagnostics
runtime lifecycle, RAF clock and reset epoch
camera descriptors and browser-view observation
terrain/path surface generation and sampling
grass density textures and density scaling
grass clump archetypes and static batch generation
patch-grid creation and density-driven instance placement
draw-group aggregation and wind shader binding
grass visibility, distance LOD, frustum culling and hysteresis
grass instance/vertex/draw budget admission
terrain-tint representation and transition policy
wind fields and shader animation
flowers, rocks, ground cover, distant trees and focal-tree generation
render-plan enhancement, validation and topology caching
CPU mesh construction and immutable vertex payloads
WebGL context, program, buffers, uniforms and draw submission
renderer snapshots and committed-frame observation
player, input, interaction, objective, story, ecology, audio, UI and persistence declarations
GameHost publication and raw game reachability
browser editor capabilities, capture and error observation
Node headless editor, scenarios and artifacts
validation, build and GitHub Pages deployment
```

## Kit and service census

```txt
external provider kits: 1
local declared kits: 43
total declared kits: 44
grass-specific local kits: 11
required-v0.1 local declarations: 15
planned local declarations: 28
```

The exact name and offered-service inventory for every kit is preserved in `.agent/kit-registry.json` and the current tracker.

## Required authority

```txt
meadow-grass-visibility-lod-authority-domain
```

### Existing owners to update first

```txt
grass-lod-policy-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-debug-visualization-kit
grass-patch-dsk
gpu-grass-render-dsk
meadow-camera-dsk
meadow-performance-dsk
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
meadow-render-plan-v2 contract
meadow-mesh-builder-v2
renderer snapshot/read model
browser editor renderer capability
browser observation and renderer smoke
```

### Candidate coordinating kits

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

## Required transaction

```txt
committed camera, viewport, topology and performance revisions
  -> create GrassVisibilityCommand
  -> classify patch bounds against current frustum
  -> measure admitted distance to patch bounds
  -> choose near, mid, far, terrain-tint or culled tier
  -> apply entry/exit hysteresis against predecessor tier
  -> enforce patch, instance, vertex and draw budgets
  -> create immutable GrassVisibilityResult
  -> reject stale camera, viewport, topology or policy revisions
  -> build/install visible mesh or draw generation
  -> preserve predecessor after candidate failure
  -> publish bounded observations and per-tier counts
  -> acknowledge first visible frame with matching visibility revision
```

## Repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-12T13-38-52-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T13-38-52-04-00.md
.agent/architecture-audit/2026-07-12T13-38-52-04-00-grass-visibility-lod-authority-dsk-map.md
.agent/render-audit/2026-07-12T13-38-52-04-00-static-grass-mesh-camera-visibility-gap.md
.agent/gameplay-audit/2026-07-12T13-38-52-04-00-density-tagged-lod-always-drawn-loop.md
.agent/interaction-audit/2026-07-12T13-38-52-04-00-camera-grass-visibility-admission-map.md
.agent/grass-system-audit/2026-07-12T13-38-52-04-00-distance-frustum-hysteresis-budget-contract.md
.agent/deploy-audit/2026-07-12T13-38-52-04-00-grass-visibility-lod-fixture-gate.md
```

## Validation

```txt
runtime source changed: no
grass source changed: no
renderer source changed: no
shader source changed: no
gameplay source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser observation: not run
Pages observation: not run
grass visibility fixtures: unavailable
```

No camera-based LOD, frustum culling, terrain-tint reachability, hysteresis, budget enforcement, stale-result rejection or visible-frame correctness claim is made.
