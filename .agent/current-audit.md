# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-12T00-58-12-04-00`

## Summary

`IntoTheMeadow` contains one external meadow provider, 43 local DSK/kit declarations, immutable game state, descriptor-driven scene composition, CPU mesh construction, a persistent WebGL renderer, browser `GameHost` and editor surfaces, and a Node headless-editor environment.

This pass audits deterministic replay validation. The source includes `stableStringify()` and `validateDeterminism()`, while `npm run check` runs `deterministic-scene-smoke.mjs`. The test constructs one game with the local fallback provider, does not tick or reset it, reads the same snapshot twice and compares the serialized strings. This proves read stability only, not deterministic construction, simulation, replay, provider parity or rendered-frame agreement.

## Plan ledger

**Goal:** define one canonical and provider-aware replay transaction from independent construction through command/tick execution, reset, checkpoint comparison, exact divergence and first visible frame proof.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible central ledgers and root `.agent` states.
- [x] Select only `IntoTheMeadow` because newer repo-local work required reconciliation and it remained the oldest central entry.
- [x] Inspect `AGENTS.md`, package checks, deterministic validator, game construction, state, snapshot and render-plan smoke.
- [x] Identify the interaction loop, all domains, all kits and every declared service.
- [x] Define canonical value, provider, seed, replay, reset, cadence, divergence and frame-proof boundaries.
- [x] Change documentation only.
- [ ] Runtime implementation and executable replay fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent states: 9

IntoTheMeadow      central 2026-07-11T23-10-51-04-00, newer repo-local audit, selected
HorrorCorridor     central 2026-07-11T23-18-16-04-00
PhantomCommand     central 2026-07-11T23-28-29-04-00
ZombieOrchard      central 2026-07-11T23-48-14-04-00
TheUnmappedHouse   central 2026-07-12T00-01-25-04-00
AetherVale         central 2026-07-12T00-10-23-04-00
MyCozyIsland       central 2026-07-12T00-20-01-04-00
PrehistoricRush    central 2026-07-12T00-30-49-04-00
TheOpenAbove       central 2026-07-12T00-39-05-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is changed in the Publish organization.

## Interaction loop

```txt
browser boot
  -> load commit-pinned meadow-area-kit
  -> validate and install 43 local descriptors
  -> create arrival-meadow source plan
  -> create render-plan enhancer and WebGL renderer
  -> expose GameHost and editor bridge
  -> request RAF

browser frame
  -> game.tick({ dt: 1/60, time: RAF absolute time })
  -> immutable frame increments
  -> lastTick records dt and time
  -> enhancer and renderer submit the meadow frame
  -> host/editor observations update

deterministic check
  -> validateSceneFlow()
  -> createIntoTheMeadowGame()
  -> no externalKits, so local fallback provider
  -> validateDeterminism(() => game.getSnapshot())
  -> snapshot A from unchanged game
  -> snapshot B from unchanged game
  -> stable string comparison
  -> Boolean pass/fail
```

## Domains in use

```txt
browser shell, DOM boot and visible failure projection
external dependency manifest and dynamic provider loading
source-provider selection, validation and fallback
provider, seed and content identity
DSK declaration, census, validation and install snapshots
game manifest, build and content identity
immutable game state, frame mutation and reset
game snapshot and diagnostics
runtime lifecycle, RAF scheduling and stop/start
runtime clock, step admission and reset epoch
canonical value schema and serialization
determinism fingerprints and checkpoint projections
replay scenario, command sequence and tick schedule
independent runtime construction and replay execution
reset replay and cadence normalization
first divergence and bounded replay journal
browser/headless deterministic parity
player, input, interaction, objective, story and persistence declarations
terrain, path, materials, scatter and atmosphere
grass density, archetypes, batching, placement, instancing, wind and LOD
tree, wind, performance and post-process enhancement
render-plan v2 contract and topology identity
CPU mesh construction
WebGL context, shader, buffer, draw, resize and disposal
render surface, context recovery and committed-frame observation
state/render-plan/visible-frame replay correlation
static checks, browser observation, build and Pages deployment
DSK implementation, dependency, consumption and retirement truth
```

## Complete kit inventory and services

### External provider

```txt
meadow-area-kit
  area/path/style/material normalization
  deterministic seeded scatter
  grass, flower, rock, mushroom and tree descriptors
  wind and atmosphere descriptors
  render-plan generation
  validation, snapshot, reset and optional runtime adapter
```

### Local game and host

```txt
into-the-meadow-game-dsk
  game-manifest, kit-stack-registry, game-state-root, boot-sequence, game-snapshot
web-host-dsk
  document-shell, browser-loop, host-debug-surface, asset-loading-host, browser-safety
game-composition-dsk
  dsk-registry, scene-composition, render-composition, simulation-composition, composition-validation
meadow-area-bridge-dsk
  meadow-area-config, meadow-feature-config, meadow-area-kit-adapter, meadow-area-state, meadow-area-validation
```

### Terrain, path and grass

```txt
meadow-terrain-texture-dsk
  terrain-surface-model, material-layer-system, path-layer-system, terrain-sampler, terrain-validation
path-corridor-dsk
  path-curve-model, walkable-corridor, path-surface-detail, path-progression, path-validation
grass-density-texture-kit
  density-texture-model, density-channels, density-compositor, density-sampler, density-validation
grass-clump-archetype-kit
  clump-family-registry, card-layout-generator, texture-atlas-binding, clump-variant-generator, archetype-validation
grass-static-batch-kit
  clump-mesh-builder, batch-variant-cache, atlas-material, static-batch-lod, batch-validation
grass-patch-placement-kit
  patch-grid, density-driven-placement, clump-instance-selection, patch-instance-buffer, placement-validation
grass-clump-instancing-render-kit
  batch-registry, instance-stream, draw-group-builder, shader-binding, render-validation
grass-shader-wind-kit
  wind-uniforms, tip-bend-model, phase-field, gust-response, wind-validation
grass-lod-policy-kit
  near-lod, mid-lod, far-lod, terrain-tint-lod, lod-validation
grass-density-scaling-kit
  quality-scale, budget-scale, density-scale, profile-scale, scale-validation
grass-debug-visualization-kit
  density-view, patch-view, instance-view, lod-view, debug-validation
grass-patch-dsk
  patch-grid, blade-distribution, terrain-awareness, wind-binding, grass-validation
gpu-grass-render-dsk
  grass-instance-buffer, grass-blade-mesh, shader-wind, grass-lod-render, grass-render-validation
```

### World and experience

```txt
wind-field-dsk
  wind-state, wind-sampler, wind-zones, wind-consumers, wind-validation
tree-object-dsk
  focal-tree-model, tree-line-model, tree-materials, tree-wind-binding, tree-validation
meadow-scatter-dsk
  flower-scatter, rock-scatter, mushroom-scatter, placement-rules, scatter-validation
meadow-atmosphere-dsk
  sky-gradient, sun-system, cloud-layer, distant-hills, atmosphere-validation
meadow-player-dsk
  player-state, movement-profile, terrain-contact, player-actions, player-validation
meadow-camera-dsk
  camera-mode, camera-rig, camera-collision, camera-feel, camera-validation
meadow-input-dsk
  action-map, device-bindings, input-context, input-normalization, input-validation
meadow-interaction-dsk
  interactable-registry, affordance-rules, inspect-state, interaction-events, interaction-validation
meadow-story-dsk
  story-state, story-beats, dialogue-text, sequence-runner, story-validation
meadow-objective-dsk
  objective-model, objective-flow, completion-ledger, feedback-surface, objective-validation
meadow-ecology-dsk
  ambient-life, ecology-zones, ambience-triggers, non-gameplay-agents, ecology-validation
meadow-audio-dsk
  ambient-bed, spatial-audio-cues, audio-state, audio-events, audio-validation
meadow-ui-dsk
  minimal-hud, story-text-panel, debug-ui, ui-state, ui-validation
meadow-save-dsk
  save-model, save-slots, persistence-adapter, migration, save-validation
meadow-diagnostics-dsk
  runtime-health, render-health, determinism-checks, smoke-tests, diagnostics-report
meadow-performance-dsk
  quality-profile, budget-policy, lod-policy, adaptive-scaling, performance-validation
```

### Rendering and deployment

```txt
meadow-render-host-dsk
  renderer-selection, render-plan-ingest, pass-order, renderer-state, renderer-validation
meadow-webgl-renderer-v2-kit
  context acquisition, shader programs, attribute/uniform binding, CPU mesh ingest,
  GPU buffer ownership, draw submission, resize, snapshot and disposal
post-process-stack-dsk
  pass-registry, render-target-system, sobel-outline-pass, color-grade-pass, post-validation
render-target-kit
  scene-color-texture, depth-texture, normal-texture, ping-pong-buffer, resize-policy
sobel-outline-pass-kit
  color-edge-threshold, depth-edge-threshold, normal-edge-threshold, outline-color, object-mask
color-grade-pass-kit
  warmth, contrast, saturation, shadow-tint, highlight-tint
depth-fog-pass-kit
  fog-near, fog-far, fog-color, distance-curve, horizon-haze
vignette-pass-kit
  radius, softness, strength, center, quality-tier
final-composite-pass-kit
  scene-input, post-input, output-target, debug-overlay, fallback-composite
static-pages-deploy-dsk
  build-config, GitHub Pages workflow, release-artifacts, cache-invalidation, deploy-validation
```

## Main findings

### Same-instance read stability only

`validateDeterminism()` invokes the supplied callback twice and compares the two serialized results. The smoke passes the same live `game.getSnapshot()` callback without any intervening tick, reset or mutation.

### Fallback-only test path

`deterministic-scene-smoke.mjs` calls `createIntoTheMeadowGame()` without `externalKits`, so it exercises the local fallback provider rather than the commit-pinned provider used by production boot.

### No independent construction

The check does not create runtime A and runtime B. Constructor nondeterminism, shared mutable provider state, cache residue and process-order dependencies are outside the test.

### No simulation or reset replay

The test executes no tick sequence, interaction command, objective transition, story trigger, stop/start or reset/replay cycle.

### Canonicalization contract absent

`stableStringify()` sorts plain object keys but admits arbitrary JavaScript values. `NaN`, `Infinity`, `-0`, sparse arrays, unsupported prototypes, typed values, cycles and accessor behavior have no explicit policy.

### No diagnostic divergence

The result contains only `passed` and a generic failure string. It does not identify checkpoint, tick, domain, path, provider, seed or left/right fingerprints.

### No presentation proof

Game snapshots include the base render plan, but deterministic validation does not compare enhanced plans, renderer generations, committed frames, captures or the production visible surface.

## Required parent domain

```txt
meadow-deterministic-replay-validation-authority-domain
```

Planned coordinating kits:

```txt
canonical-value-schema-kit
canonical-serializer-kit
determinism-fingerprint-kit
provider-identity-kit
provider-fingerprint-kit
seed-policy-kit
replay-run-id-kit
replay-scenario-schema-kit
replay-input-sequence-kit
replay-tick-schedule-kit
independent-runtime-construction-kit
replay-execution-kit
reset-replay-kit
cadence-normalization-kit
state-projection-fingerprint-kit
render-plan-fingerprint-kit
visible-frame-determinism-ack-kit
first-divergence-kit
replay-result-kit
determinism-journal-kit
same-seed-independent-build-fixture-kit
fallback-external-parity-fixture-kit
tick-reset-replay-fixture-kit
cadence-parity-fixture-kit
browser-headless-replay-fixture-kit
```

## Required proof

```txt
canonical-value rejection and versioning
same provider/seed/content across independent builds
fallback and external provider replay classification
same sequenced commands and normalized ticks
reset and replay parity
30/60/120 Hz committed-tick parity
browser/headless result parity
negative controls for seed/provider/input/content changes
exact first-divergence reporting
state, render-plan and first visible frame correlation
```

## Validation status

```txt
runtime source changed: no
determinism source changed: no
package scripts changed: no
dependencies changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
new replay fixtures: unavailable
browser replay smoke: unavailable
```