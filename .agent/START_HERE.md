# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T04-11-54-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one commit-pinned external provider, 43 local declarations, immutable game state, a persistent WebGL renderer, browser/editor surfaces and a descriptor-driven grass stack.

This pass isolates grass visibility and LOD authority. A four-tier distance policy is declared, but the active grass pipeline chooses near or mid batches from density, retains every instance, expands the field into one static CPU mesh and never consumes camera distance or frustum visibility.

## Plan ledger

**Goal:** make grass work proportional to the visible camera region through one revisioned patch-admission, LOD-selection and draw-plan transaction whose result reaches diagnostics and the first visible frame.

- [x] Compare the complete accessible Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledgers and root `.agent` state.
- [x] Select only `IntoTheMeadow` as the oldest eligible repository.
- [x] Read `AGENTS.md`, the render contract, grass kits, enhancer, CPU mesh builder, web host and smoke tests.
- [x] Identify the interaction loop, all domains, all 44 declared kits and every offered service.
- [x] Trace density, batch selection, patches, draw groups, CPU expansion, cache behavior and diagnostics.
- [x] Define distance/frustum admission, budgets, typed results and visible-frame proof.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and the kit registry.
- [ ] Runtime implementation and executable grass-visibility fixtures remain future work.

## Selection

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

## Current interaction loop

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

## Main finding

```txt
declared near tier: <= 32
declared mid tier: <= 72
declared far tier: <= 128
declared terrain-tint tier: <= 220

camera-distance tier selection in runtime: absent
frustum patch admission: absent
visible-set revision: absent
runtime far-tier selection: absent
runtime terrain-tint transition: absent
instance/card budget result: absent
visible grass-frame receipt: absent
```

Density controls near-versus-mid batch assignment. Camera distance does not. The renderer expands every draw-group instance into the persistent CPU mesh, so the declared LOD policy is currently descriptive rather than authoritative.

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

## Kits and services

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
grass-specific implemented kits: 11
```

The complete per-kit service map is in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Required parent domain

```txt
meadow-grass-visibility-lod-authority-domain
```

Core composition:

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

## Required transaction

```txt
camera, surface and frame observation
  -> validate runtime session, context and camera revision
  -> derive patch bounds, distance and frustum evidence
  -> select near, mid, far or terrain-tint through one policy
  -> enforce instance and card budgets
  -> build an immutable grass visible-set and draw plan
  -> commit one visible-set revision and typed result
  -> update render resources without stale-plan mutation
  -> render one frame
  -> publish grass diagnostics and visible-frame acknowledgement
```

## Ordered implementation gates

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

## Read this pass first

```txt
.agent/trackers/2026-07-12T04-11-54-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T04-11-54-04-00.md
.agent/architecture-audit/2026-07-12T04-11-54-04-00-grass-visibility-lod-dsk-map.md
.agent/render-audit/2026-07-12T04-11-54-04-00-static-grass-mesh-camera-lod-gap.md
.agent/gameplay-audit/2026-07-12T04-11-54-04-00-camera-traversal-grass-cost-loop.md
.agent/interaction-audit/2026-07-12T04-11-54-04-00-camera-observation-grass-plan-result-map.md
.agent/grass-system-audit/2026-07-12T04-11-54-04-00-distance-frustum-budget-contract.md
.agent/deploy-audit/2026-07-12T04-11-54-04-00-grass-lod-visibility-fixture-gate.md
```

A declared LOD table is not runtime proof. Completion requires camera-derived patch admission, reachable far/tint tiers, bounded work, typed draw-plan results and a visible frame citing the committed grass visible-set revision.
