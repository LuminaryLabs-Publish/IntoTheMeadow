# Project Breakdown: IntoTheMeadow Grass Visibility and LOD Authority

**Timestamp:** `2026-07-12T04-11-54-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`

## Summary

This documentation pass audits the full grass path from deterministic density generation through patch placement, batch assignment, draw grouping, CPU triangle expansion, WebGL rendering and diagnostics.

The primary gap is not grass generation. It is view admission. The repository declares a four-tier distance policy, but the runtime never gives camera distance or frustum state to the grass system. Density selects near or mid batches, every instance survives into draw groups, and the complete field is expanded into a persistent CPU mesh.

## Plan ledger

**Goal:** define one reusable authority that converts committed camera state and deterministic grass patches into a bounded, revisioned visible draw plan.

- [x] Compare the complete Publish organization inventory with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and contain root `.agent` state.
- [x] Select only `IntoTheMeadow` as the oldest eligible repository.
- [x] Read repository guidance and validation scripts.
- [x] Trace the interaction loop.
- [x] Identify all active domains.
- [x] Identify all 44 declared kits and every service.
- [x] Trace grass density, archetypes, batches, patches, draw groups, wind and LOD.
- [x] Trace enhancer caching, CPU mesh construction, WebGL submission and diagnostics.
- [x] Define the missing parent domain, child kits, result contract and fixture gate.
- [x] Refresh required root `.agent` documentation.
- [x] Add timestamped architecture, render, gameplay, interaction, grass-system and deploy audits.
- [ ] Runtime implementation remains outside this documentation pass.

## Organization comparison

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

## Product interaction loop

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

## Grass data flow

```txt
source meadow plan
  -> path and area descriptors
  -> 128 x 128 density texture
  -> deterministic patch grid
  -> average patch density
  -> density-based near/mid batch selection
  -> instance transforms
  -> static draw groups
  -> cached render plan
  -> complete CPU grass triangle expansion
  -> persistent WebGL buffers
  -> total-count diagnostics
```

## Implemented domains

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

## Kit inventory and services

The full 44-kit service inventory is preserved in `.agent/current-audit.md` and `.agent/kit-registry.json`. The grass-specific services are:

```txt
grass-density-texture-kit
  deterministic RGBA density and path-suppression fields

grass-clump-archetype-kit
  five clump families, two variants each and 50-100 cards

grass-static-batch-kit
  near, mid and far card subsets

grass-patch-placement-kit
  deterministic patches and instances
  currently chooses near/mid from density

grass-clump-instancing-render-kit
  grouping by batch and wind material
  currently performs no view admission

grass-shader-wind-kit
  wind uniforms and phase/gust response descriptors

grass-lod-policy-kit
  near/mid/far/terrain-tint thresholds
  currently has no active runtime consumer

grass-density-scaling-kit
  placement density scaling from quality and budget profiles

grass-debug-visualization-kit
  density, patch, instance and LOD summaries

grass-patch-dsk
  patch grid, distribution, terrain awareness and wind binding

gpu-grass-render-dsk
  instance buffers, blade mesh, shader wind and LOD rendering declarations
  active renderer currently consumes CPU-expanded triangles instead
```

## Main architectural mismatch

```txt
declared abstraction              active implementation

distance LOD policy               density-based near/mid assignment
near/mid/far/tint tiers           near/mid only
WebGL instancing backend label    CPU-expanded static triangle mesh
visible patch concept             all patches retained
frustum admission                 absent
instance/card budgets             implicit hard-coded card slices
camera revision                   absent
typed draw-plan result            absent
visible-frame receipt             absent
```

## Required parent domain

```txt
meadow-grass-visibility-lod-authority-domain
```

## Candidate kit composition

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

## Correct dependency direction

```txt
committed camera/surface/context/quality observations
  -> patch bounds and distance evidence
  -> frustum admission
  -> one versioned LOD policy
  -> deterministic instance and card budgets
  -> immutable GrassVisibleSet
  -> immutable GrassDrawPlanResult
  -> CPU/GPU renderer adapter
  -> diagnostics and first visible frame
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

## Validation boundary

No runtime, renderer, package, dependency or deployment code was changed. Existing checks were inspected but not executed through the connector. No grass LOD, frustum, budget or visible-frame correctness claim is made.
