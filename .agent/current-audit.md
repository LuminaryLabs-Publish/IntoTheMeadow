# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit timestamp:** `2026-07-12T07-19-47-04-00`

## Status

```txt
status: adaptive-quality-performance-budget-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
preceding audio activation audit: preserved
preceding shader precision audit: preserved
central synchronization: paired ledger update required
```

## Summary

`meadow-performance-dsk` is a required-v0.1 declaration with quality-profile, budget-policy, LOD-policy, adaptive-scaling and performance-validation services. The implementation creates one immutable profile and defaults to `high`; `auto` is another static constant set rather than a runtime controller.

The browser host calls `game.tick({ time, dt: 1/60 })`, enhances the plan and renders once per RAF. It records no CPU/GPU frame sample, rolling percentile, deadline, capability envelope or quality decision. The enhancer accepts runtime performance options but the host does not supply them, and cache reuse depends only on source topology. The physical renderer publishes counts/cache state but no quality revision, budget result or visible-frame correlation.

## Plan ledger

**Goal:** establish one session-scoped performance authority from frame and capability observations through stable quality admission, multi-consumer prepare/commit/rollback and first-visible-frame proof.

- [x] Compare all accessible Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow` as the oldest eligible synchronized repository.
- [x] Inspect DSK registry, performance policy, render-plan enhancer, web host, game diagnostics, renderer and package scripts.
- [x] Preserve the complete 44-kit service map.
- [x] Identify logical/physical quality mismatches and cache-invalidating gaps.
- [x] Define observations, budgets, hysteresis, commands, results, revisions, rollback and proof.
- [x] Add timestamped architecture and system audits.
- [ ] Implement and execute adaptive-quality authority.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

IntoTheMeadow      2026-07-12T05-39-42-04-00 selected
PhantomCommand     2026-07-12T05-49-04-04-00
HorrorCorridor     2026-07-12T05-59-28-04-00
ZombieOrchard      2026-07-12T06-19-56-04-00
TheUnmappedHouse   2026-07-12T06-30-34-04-00
AetherVale         2026-07-12T06-41-32-04-00
MyCozyIsland       2026-07-12T06-51-27-04-00
TheOpenAbove       2026-07-12T07-00-48-04-00
PrehistoricRush    2026-07-12T07-09-49-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was modified in the Publish organization.

## Complete interaction loop

```txt
page boot
  -> query browser shell nodes
  -> import commit-pinned meadow provider
  -> install DSK descriptors
  -> create game, enhancer, renderer and editor bridge
  -> schedule RAF

frame
  -> derive absolute time from RAF timestamp
  -> tick immutable game state with fixed dt 1/60
  -> get source render plan
  -> apply static quality policy during enhancement
  -> validate contracted plan
  -> resize physical surface
  -> ensure/reuse cached mesh
  -> submit outline pass
  -> submit color pass
  -> expose counts/cache diagnostics
  -> schedule successor RAF

quality path
  -> choose static profile, default high
  -> no CPU/GPU observation
  -> no rolling window
  -> no quality decision or command
  -> no hysteresis/cooldown
  -> no consumer prepare results
  -> no quality revision or atomic commit
  -> no visible-frame acknowledgement
```

## Source-backed findings

### Required declaration, static implementation

```txt
meadow-performance-dsk required-v0.1: yes
services: quality-profile, budget-policy, lod-policy, adaptive-scaling, performance-validation
profiles: low, medium, high, ultra, auto
default: high
auto behavior: fixed constants
runtime measurement state: absent
```

### Host does not operate a performance loop

`startWebHost()` performs tick, enhancement and rendering in one RAF callback. It does not measure callback duration, renderer duration, GPU duration, deadline misses, long tasks or sustained headroom. The debug HUD reports descriptor counts, vertex count and cache labels only.

### Declared/physical mismatches

```txt
terrainResolution profile field
  -> not applied
  -> contracted terrain is hard-coded to xSegments 96, zSegments 124

postProcess profile field
  -> not consulted by the physical renderer
  -> outline and color draws always execute

maxGrassInstances budget
  -> calculated by the performance policy
  -> not passed into the inspected grass placement/draw-group creation path

runtime performance option
  -> accepted by enhancer
  -> omitted by web host
  -> excluded from cache identity
```

### Cache and transition gap

The enhancer rebuilds only when `sourceTopologyKey(renderPlan)` changes. A future runtime quality revision affecting grass density, terrain resolution or post topology needs explicit topology-impact admission and invalidation. Without it, a quality command can be accepted while the old cached plan and mesh remain active.

### Readback gap

```txt
renderer snapshot includes:
  plan/schema/topology
  vertices/triangles/descriptors
  rebuild/cache-hit counts
  cache state

renderer snapshot omits:
  performance sample/window
  quality tier and revision
  budget/deadline result
  CPU/GPU cost
  applied terrain/grass/post policy
  transition/rollback result
  first visible-frame quality receipt
```

## Domains in use

```txt
browser shell, loading and visible failure projection
external provider loading, validation and fallback
DSK declaration, registry validation and install snapshots
game manifest, immutable state, tick, reset, snapshot and diagnostics
runtime lifecycle, RAF clock and reset epoch
camera descriptors and browser view observation
terrain, path and terrain sampling
grass density, archetypes, static batches, placement, instancing, wind and LOD
trees, scatter, atmosphere and world descriptors
player, input, interaction, story, objective, ecology, audio, UI and persistence declarations
render-plan enhancement, topology identity and CPU mesh construction
WebGL context, shader, buffer, resize and draw ownership
post-process declarations and inline physical rendering
editor capability surface and browser error capture
validation, headless tools, build and Pages deployment
adaptive performance sampling, quality transition, commit and frame proof: missing
```

## Complete kit inventory and services

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local declarations: 15
```

The full per-kit service inventory is retained in `.agent/kit-registry.json` and the timestamped tracker. Core performance-related owners are:

```txt
meadow-performance-dsk: quality-profile, budget-policy, lod-policy, adaptive-scaling, performance-validation
grass-density-scaling-kit: quality-scale, budget-scale, density-scale, profile-scale, scale-validation
grass-lod-policy-kit: near-lod, mid-lod, far-lod, terrain-tint-lod, lod-validation
meadow-terrain-texture-dsk: terrain-surface-model, material-layer-system, path-layer-system, terrain-sampler, terrain-validation
post-process-stack-dsk: pass-registry, render-target-system, sobel-outline-pass, color-grade-pass, post-validation
meadow-render-host-dsk: renderer-selection, render-plan-ingest, pass-order, renderer-state, renderer-validation
meadow-webgl-renderer-v2-kit: context, shaders, bindings, CPU mesh, GPU buffers, draw, resize, snapshot, disposal
meadow-diagnostics-dsk: runtime-health, render-health, determinism-checks, smoke-tests, diagnostics-report
web-host-dsk: document-shell, browser-loop, host-debug-surface, asset-loading-host, browser-safety
```

## Required parent domain

```txt
meadow-adaptive-quality-performance-authority-domain
```

## Existing owners to update first

```txt
meadow-performance-dsk
web-host-dsk
meadow-render-host-dsk
meadow-webgl-renderer-v2-kit
meadow-diagnostics-dsk
grass-density-scaling-kit
grass-lod-policy-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
meadow-terrain-texture-dsk
post-process-stack-dsk
render-target-kit
into-the-meadow-game-dsk
game snapshot/read model
editor capability bridge
render surface authority
committed frame authority
```

## Candidate coordinating kits

```txt
performance-sample-id-kit
performance-capability-snapshot-kit
cpu-frame-time-observation-kit
gpu-timer-capability-kit
gpu-frame-time-observation-kit
frame-deadline-result-kit
rolling-performance-window-kit
performance-percentile-kit
performance-budget-policy-kit
quality-tier-id-kit
quality-revision-kit
quality-transition-command-kit
quality-transition-admission-kit
quality-hysteresis-kit
quality-cooldown-kit
quality-transition-result-kit
quality-topology-impact-plan-kit
grass-budget-adapter-kit
terrain-resolution-adapter-kit
post-process-policy-adapter-kit
surface-scale-adapter-kit
quality-plan-prepare-kit
quality-consumer-result-kit
quality-commit-kit
quality-rollback-kit
stale-quality-plan-rejection-kit
quality-frame-correlation-kit
performance-observation-kit
performance-journal-kit
adaptive-quality-fixture-kit
quality-oscillation-fixture-kit
browser-performance-profile-smoke-kit
```

## Required flow

```txt
committed frame/capability evidence
  -> normalized PerformanceSample
  -> bounded rolling percentile window
  -> named budget evaluation
  -> hysteresis and cooldown
  -> QualityTransitionCommand or typed no-op
  -> topology-impact and consumer preparation
  -> atomic QualityRevision commit or predecessor preservation
  -> renderer/enhancer cache result
  -> first visible-frame acknowledgement
  -> detached observation and bounded journal
```

## Required proof

```txt
static profile parity across logical and physical paths
auto sustained-overload downgrade
auto sustained-headroom upgrade
single-spike rejection
hysteresis and cooldown
GPU timing supported/unsupported paths
topology rebuild only when required
consumer prepare/commit failure rollback
context/surface replacement stale-plan rejection
editor/browser quality-command parity
first visible-frame quality receipt
browser and Pages performance smoke
```

## Validation

```txt
runtime source changed: no
performance source changed: no
renderer source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
performance fixtures: unavailable
browser/Pages performance smoke: unavailable
```

No runtime performance, quality, frame-rate or deployment-readiness claim is made.