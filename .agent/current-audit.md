# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit timestamp:** `2026-07-12T05-31-59-04-00`

## Status

```txt
status: shader-precision-admission-authority-audited
source revision reviewed: a4fd0701166b2d3d1c325d543cd18e3f8354043e
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central synchronization: completed by paired ledger update
```

## Summary

The active renderer is created through `meadow-webgl-renderer-v2-compatible.js`. That adapter wraps the canvas and WebGL context, tracks each shader stage, removes all existing float precision declarations and injects `precision mediump float;` before the base renderer compiles either stage.

The adapter never queries `getShaderPrecisionFormat()`, never distinguishes preferred precision from fallback, and never records original or transformed source identity. The base renderer exposes topology, vertex and cache observations, but not context identity, precision capability, shader compile results, program generation or first-frame program provenance.

## Plan ledger

**Goal:** define one stage-aware shader precision admission transaction from context capability evidence through normalized source, compile/link result, program generation and first visible frame.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible root `.agent` states and central records.
- [x] Select only `IntoTheMeadow`.
- [x] Inspect `AGENTS.md`, the compatibility wrapper, base renderer, web host and smoke surfaces.
- [x] Identify the interaction loop, domains, 44 declared kits and offered services.
- [x] Confirm both shader stages are normalized to mediump.
- [x] Confirm capability, decision, source fingerprint and program generation evidence is absent.
- [x] Confirm Node checks do not compile WebGL shaders.
- [x] Confirm browser observation proves only a non-fatal frame and screenshot size.
- [x] Define authority, coordinating kits, invariants and fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute shader precision admission.

## Selection comparison

```txt
IntoTheMeadow      2026-07-12T04-11-54-04-00 selected oldest
PhantomCommand     2026-07-12T04-18-44-04-00
HorrorCorridor     2026-07-12T04-28-03-04-00
ZombieOrchard      2026-07-12T04-38-12-04-00
TheUnmappedHouse   2026-07-12T04-44-36-04-00
AetherVale         2026-07-12T04-50-41-04-00
MyCozyIsland       2026-07-12T05-00-19-04-00
TheOpenAbove       2026-07-12T05-11-46-04-00
PrehistoricRush    2026-07-12T05-21-52-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
browser boot
  -> import web host
  -> load external meadow provider
  -> create immutable game and render plan
  -> create precision-safe canvas and WebGL proxies
  -> track stage at createShader()
  -> normalize every graphics shader at shaderSource()
  -> compile and link base renderer program
  -> install public host and editor bridge
  -> start RAF

render frame
  -> advance game frame
  -> validate enhanced render plan
  -> submit view-projection, time, wind, lighting, outline and fog uniforms
  -> draw outline and color passes
  -> publish renderer snapshot without shader precision or program identity
```

## Source-backed findings

### One policy is applied to both stages

`normalizeFloatPrecision()` removes `lowp`, `mediump` or `highp` float declarations, then prepends `precision mediump float;`. The `shaderSource` proxy applies that rewrite whenever the remembered type is vertex or fragment.

### Both stages contain precision-sensitive work

The vertex stage computes world-space wind offsets, outline extrusion, view-projection multiplication and clip-space depth. The fragment stage normalizes vectors, computes cel/rim lighting and derives fog from interpolated depth.

### Device capability is not observed

No active source calls `getShaderPrecisionFormat()`. There is no context capability snapshot, stage requirement, preferred precision, supported fallback or rejection result.

### Source and program provenance are absent

Compilation throws only a string error. Successful compilation and linking publish no source fingerprint, normalized-source fingerprint, stage result, program identity or program generation.

### Diagnostics cannot prove the policy

The renderer snapshot reports plan ID, schema, topology key, geometry counts, cache counts and contract validation. The HUD reports `gpu:` cache state. Neither identifies shader precision or the program used by the displayed frame.

### Existing tests do not exercise admission

`renderer-v2-smoke.mjs` builds CPU mesh data only. `run-browser-observation.mjs` verifies title text, editor installation, a `gpu:` marker and a screenshot larger than 10 KB in one discovered Chromium environment.

## Domains in use

```txt
browser shell, loading and visible failure projection
external provider loading, validation and fallback
DSK declaration, registry validation and install snapshots
game manifest, immutable state, tick, reset, snapshot and diagnostics
runtime lifecycle, RAF clock and reset epoch
camera descriptors and browser view observation
terrain, path and terrain sampling
grass density, archetypes, patches, draw groups, wind and LOD declarations
player, input, interaction, objective, story and persistence declarations
flowers, rocks, ground cover, trees, atmosphere and scatter
render-plan validation, topology identity and CPU mesh construction
WebGL1/WebGL2 context acquisition, shader compilation, program linking and GPU buffers
shader-stage precision normalization and compatibility policy
context, program and resource generation authority
committed render/frame observation and editor capture
validation, headless tools, build and Pages deployment
DSK implementation, dependency, consumption and retirement truth
```

## Complete kit inventory and services

```txt
meadow-area-kit: area/path/style normalization, deterministic scatter, world descriptors, render-plan generation, validation, snapshot and reset
into-the-meadow-game-dsk: game manifest, kit registry, game-state root, boot sequence and snapshot
web-host-dsk: document shell, browser loop, debug surface, asset loading and browser safety
game-composition-dsk: DSK registry, scene/render/simulation composition and validation
meadow-area-bridge-dsk: area config, feature config, source adapter, state and validation
meadow-terrain-texture-dsk: terrain model, material layers, path layers, sampler and validation
path-corridor-dsk: path curve, walkable corridor, surface detail, progression and validation
grass-density-texture-kit: density model, channels, compositor, sampler and validation
grass-clump-archetype-kit: family registry, card layout, atlas binding, variants and validation
grass-static-batch-kit: clump mesh, variant cache, atlas material, static LOD and validation
grass-patch-placement-kit: patch grid, density placement, instance selection/buffer and validation
grass-clump-instancing-render-kit: batch registry, instance stream, draw groups, shader binding and validation
grass-shader-wind-kit: wind uniforms, bend, phase, gust response and validation
grass-lod-policy-kit: near, mid, far, terrain-tint tiers and validation
grass-density-scaling-kit: quality, budget, density and profile scaling
grass-debug-visualization-kit: density, patch, instance and LOD views
grass-patch-dsk: patch grid, blade distribution, terrain awareness, wind binding and validation
gpu-grass-render-dsk: instance buffer, blade mesh, shader wind, LOD render and validation
wind-field-dsk: wind state, sampling, zones, consumers and validation
tree-object-dsk: focal tree, tree line, materials, wind binding and validation
meadow-scatter-dsk: flower, rock and mushroom scatter, rules and validation
meadow-atmosphere-dsk: sky, sun, clouds, distant hills and validation
meadow-player-dsk: player state, movement profile, terrain contact, actions and validation
meadow-camera-dsk: camera mode, rig, collision, feel and validation
meadow-input-dsk: action map, bindings, context, normalization and validation
meadow-interaction-dsk: interactables, affordances, inspect state, events and validation
meadow-story-dsk: story state, beats, dialogue, sequence runner and validation
meadow-objective-dsk: objective model, flow, completion ledger, feedback and validation
meadow-ecology-dsk: ambient life, zones, triggers, agents and validation
meadow-audio-dsk: ambient bed, spatial cues, audio state/events and validation
meadow-ui-dsk: minimal HUD, story panel, debug UI, state and validation
meadow-save-dsk: save model, slots, persistence, migration and validation
meadow-diagnostics-dsk: runtime/render health, determinism checks, smoke tests and reports
meadow-performance-dsk: quality profile, budgets, LOD, adaptive scaling and validation
meadow-render-host-dsk: renderer selection, plan ingest, pass order, state and validation
meadow-webgl-renderer-v2-kit: context acquisition, shader/program creation, bindings, CPU mesh ingestion, GPU buffers, draw, resize, snapshot and disposal
post-process-stack-dsk: pass registry, render targets, outline, grade and validation
render-target-kit: color, depth, normal, ping-pong and resize policy
sobel-outline-pass-kit: color/depth/normal thresholds, outline color and mask
color-grade-pass-kit: warmth, contrast, saturation, shadow and highlight tint
depth-fog-pass-kit: fog near/far/color, distance curve and haze
vignette-pass-kit: radius, softness, strength, center and quality tier
final-composite-pass-kit: scene/post input, output, debug overlay and fallback
static-pages-deploy-dsk: build, Pages workflow, artifacts, cache invalidation and validation
```

## Precision census

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
compatibility precision wrappers: 1
shader stages intercepted: 2
forced precision policies: 1
precision capability queries: 0
stage decision results: 0
source fingerprints: 0
program generations: 0
precision-aware frame receipts: 0
```

## Required parent domain

```txt
meadow-shader-precision-admission-authority-domain
```

Existing owners to update first:

```txt
meadow-webgl-renderer-v2-compatible.js
meadow-webgl-renderer-v2-kit
meadow-render-host-dsk
meadow-diagnostics-dsk
meadow-render-plan/v2
web host
editor bridge
renderer-v2 smoke
browser observation
WebGL Context Recovery Authority
Committed Frame Observation Authority
```

Candidate coordinating kits:

```txt
shader-stage-identity-kit
graphics-context-capability-snapshot-kit
float-precision-capability-kit
shader-precision-policy-kit
shader-source-normalization-kit
shader-source-fingerprint-kit
shader-precision-decision-kit
shader-compile-result-kit
shader-program-link-result-kit
shader-program-generation-kit
shader-precision-observation-kit
shader-precision-journal-kit
first-frame-shader-provenance-kit
shader-precision-fixture-kit
browser-shader-device-matrix-smoke-kit
```

## Required invariants

```txt
precision is selected per shader stage and context generation
capability evidence is captured before normalization
original and normalized sources have stable fingerprints
Accepted, Degraded and Rejected decisions are explicit
compile and link results cite exact normalized sources
context restoration re-runs capability and precision admission
renderer diagnostics cite context and program generation
the first visible frame cites the admitted program generation
```

## Validation boundary

No runtime, renderer, shader, dependency, package-script or deployment source changed. No WebGL capability query, shader compilation fixture, device matrix or first-frame provenance test was executed.
