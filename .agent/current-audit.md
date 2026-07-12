# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit timestamp:** `2026-07-12T13-54-00-04-00`  
**Status:** `grass-visibility-lod-central-reconciled`

## Summary

IntoTheMeadow declares near, mid, far and terrain-tint grass LOD tiers and constructs density-driven patches, reusable static batches and draw groups. The active CPU/WebGL path does not consume camera distance or frustum evidence when choosing representations.

Placement permanently assigns near or mid batches from density, far batches are never selected, terrain-tint has no representation, and every instance is flattened into one static mesh. Camera matrices are derived after mesh selection and the renderer draws the complete mesh in outline and color passes.

The repo-local technical audit was newer than central tracking. This run reconciles root entrypoints, machine registry, central ledger and change log without changing runtime behavior.

## Plan ledger

**Goal:** preserve the complete repository breakdown while aligning one grass visibility authority from camera observation through tier continuity, budgets, draw generation and first-visible-frame proof.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central ledgers and root `.agent` state.
- [x] Select only `IntoTheMeadow` because repo-local documentation was newer than central tracking.
- [x] Reconcile the interaction loop and active domains.
- [x] Preserve one external provider plus 43 local declarations and all offered services.
- [x] Preserve the grass density, placement, LOD, mesh, render and proof findings.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent`, machine registry and central tracking.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute the authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

IntoTheMeadow      central 2026-07-12T11-29-40-04-00; repo-local 2026-07-12T13-38-52-04-00; selected
PhantomCommand     2026-07-12T11-48-43-04-00
PrehistoricRush    2026-07-12T12-08-05-04-00
HorrorCorridor     2026-07-12T12-21-38-04-00
ZombieOrchard      2026-07-12T12-39-25-04-00
MyCozyIsland       2026-07-12T12-58-08-04-00
TheUnmappedHouse   2026-07-12T13-08-15-04-00
AetherVale         2026-07-12T13-20-00-04-00
TheOpenAbove       2026-07-12T13-29-56-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was modified in the Publish organization.

## Complete interaction loop

```txt
page boot
  -> import commit-pinned meadow-area provider
  -> install 43 local declarations plus one external provider
  -> create immutable game and source render plan
  -> create performance, wind and post-process descriptors
  -> create grass density texture and clump archetypes
  -> create near, mid and far static batches
  -> create patches across the area
  -> assign near or mid batch per instance from density
  -> flatten patch instances into draw groups
  -> attach four-tier LOD policy without consuming pick(distance)
  -> build one topology key and one complete CPU mesh
  -> create WebGL renderer and start RAF

browser frame
  -> tick game
  -> reuse enhanced plan and static mesh
  -> resize canvas and derive camera matrices
  -> upload time, wind, light and outline uniforms
  -> submit complete vertex count for outline
  -> submit complete vertex count for color
  -> publish aggregate descriptor, mesh and cache counts
  -> schedule successor RAF

editor and proof
  -> editor reads aggregate renderer snapshots and captures canvas
  -> render-plan checks require patches, batches and draw groups
  -> renderer checks validate mesh size, arrays and static topology
  -> no fixture changes camera distance, frustum, tier or visible patch set
```

## Source-backed findings

### Declared policy

```txt
near <= 32
mid <= 72
far <= 128
terrain-tint <= 220
selection API: pick(distance)
active calls to pick(distance): 0
```

### Actual classification

```txt
density > 0.55 -> random near batch
density <= 0.55 -> random mid batch
far batch -> unreachable from placement
terrain-tint -> no batch or render representation
culled -> absent
```

Density currently controls both local population and permanent geometric complexity. It is not camera LOD.

### Mesh and draw behavior

Every instance is copied into a draw group keyed by batch and wind shader. The mesh builder iterates all groups and appends their geometry into the same static collector as terrain and other scene content. Camera changes do not change the topology key, patch set, batch choice or grass vertex count.

The renderer ensures/reuses the complete mesh, then derives camera matrices, uploads uniforms and draws the complete mesh twice. There is no patch bounds test, frustum plane test, camera distance result, tier transition, cull reason or visibility budget result.

### Observation gap

```txt
camera revision
viewport revision
visibility revision
patches tested/visible/culled
per-tier patch/instance/vertex counts
hysteresis transitions
budget reductions
stale-result rejections
visible-set fingerprint
first visible grass frame receipt
```

## Domains in use

```txt
browser shell, loading and fatal projection
external provider loading, validation and fallback
DSK declaration, registry validation and install snapshots
immutable game manifest, state, tick, reset, snapshot and diagnostics
runtime lifecycle, RAF clock and reset epoch
camera descriptors, viewport and browser-view observation
terrain/path generation, material layers and sampling
grass density textures and scaling
grass clump archetypes and static batches
patch-grid creation and density-driven placement
draw-group aggregation and wind shader binding
grass distance bands, frustum classification and hysteresis
grass visible-set, instance, vertex and draw-budget admission
terrain-tint representation and transition policy
wind fields and shader animation
flowers, rocks, mushrooms, ground cover, distant trees and focal tree
render-plan enhancement, validation and topology caching
CPU mesh construction and immutable vertex payloads
WebGL context, program, buffers, uniforms and draw submission
renderer snapshots and committed-frame observation
player, input, interaction, objective, story, ecology, audio, UI and persistence
GameHost publication and raw runtime reachability
browser editor capabilities, capture and error observation
Node headless editor, scenarios and artifacts
validation, static build and GitHub Pages deployment
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

The exact name and service inventory for all kits is in `.agent/kit-registry.json` and the current tracker.

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
meadow-render-plan-v2
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
committed camera, viewport, topology, policy and performance revisions
  -> create GrassVisibilityCommand
  -> classify stable patch bounds against frustum
  -> measure camera distance to admitted bounds
  -> choose near, mid, far, terrain-tint or culled
  -> apply entry/exit hysteresis
  -> enforce patch, instance, vertex and draw budgets
  -> create immutable GrassVisibilityResult
  -> reject stale revisions
  -> stage visible mesh/draw generation
  -> atomically install or preserve predecessor
  -> publish bounded observations and per-tier counts
  -> acknowledge first visible frame with matching revision
```

## Repo-local output

```txt
.agent/trackers/2026-07-12T13-54-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T13-54-00-04-00.md
.agent/architecture-audit/2026-07-12T13-54-00-04-00-grass-visibility-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-12T13-54-00-04-00-camera-visible-set-ledger-reconciliation-gap.md
.agent/gameplay-audit/2026-07-12T13-54-00-04-00-density-tagged-grass-lod-reconciliation.md
.agent/interaction-audit/2026-07-12T13-54-00-04-00-camera-grass-admission-reconciliation.md
.agent/grass-system-audit/2026-07-12T13-54-00-04-00-visibility-lod-registry-contract.md
.agent/central-sync-audit/2026-07-12T13-54-00-04-00-repo-ledger-machine-registry-contract.md
.agent/deploy-audit/2026-07-12T13-54-00-04-00-grass-visibility-fixture-central-gate.md
```

## Validation

```txt
runtime/grass/renderer/shader/gameplay source changed: no
package scripts/dependencies/deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser/Pages observation: not run
grass visibility fixtures: unavailable
```

No camera-based LOD, frustum culling, terrain-tint reachability, hysteresis, budget enforcement, stale-result rejection or visible-frame correctness claim is made.
