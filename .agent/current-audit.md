# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T23-10-51-04-00`

## Summary

`IntoTheMeadow` contains one external meadow provider, 43 local DSK/kit declarations, immutable game state, descriptor-driven scene composition, CPU mesh construction, a persistent WebGL renderer, browser `GameHost` and editor surfaces, and a Node headless-editor environment.

This pass audits persistence continuity. `meadow-save-dsk` declares save-model, save-slots, persistence-adapter, migration and save-validation, but the registry marks it as planned rather than a required v0.1 implementation. Browser startup and reset always create a default state, snapshots are live inspection packets rather than save envelopes, and no public capability can save, resolve, migrate, hydrate or verify a checkpoint.

## Plan ledger

**Goal:** define one schema-versioned and failure-safe transaction from live state through checkpoint storage, reload admission, migration, reconciliation, hydration and first visible resumed frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible central ledgers and root `.agent` states.
- [x] Skip repositories with newer unsynchronized repo-local audit work.
- [x] Select only `IntoTheMeadow` as the oldest fully synchronized eligible repository.
- [x] Inspect `AGENTS.md`, package checks, manifest, registry, state, snapshot, browser host, GameHost and editor surfaces.
- [x] Identify the interaction loop, all domains, all kits and every declared service.
- [x] Define the persistence parent domain and fixture boundary.
- [x] Change documentation only.
- [ ] Runtime implementation and executable persistence fixtures remain future work.

## Selection comparison

```txt
HorrorCorridor     central 21:21, newer repo-local audit, skipped
PhantomCommand     central 21:31, newer repo-local audit, skipped
ZombieOrchard      central 21:40, newer repo-local audit, skipped
TheUnmappedHouse   central 21:48, newer repo-local audit, skipped
AetherVale         central 22:02, newer repo-local audit, skipped
IntoTheMeadow      central 22:08, selected oldest fully synchronized
MyCozyIsland       central 22:20
PrehistoricRush    central 22:38
TheOpenAbove       central 22:58
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/IntoTheMeadow` was changed in the Publish organization.

## Interaction loop

```txt
browser boot
  -> load commit-pinned meadow-area-kit
  -> validate and install 43 local descriptors
  -> create meadow source and static render plan
  -> createInitialGameState
  -> create renderer and enhancer
  -> expose GameHost and editor bridge
  -> request RAF

browser frame
  -> game.tick
  -> replace immutable state with frame + 1 and lastTick
  -> enhance and render the plan
  -> publish game, render and diagnostic observations

reset
  -> replace state with createInitialGameState
  -> no checkpoint, reset epoch or persistence result

reload
  -> create a new default graph
  -> no slot discovery, parsing, migration, reconciliation or hydration

browser and Node editors
  -> read state/snapshot, tick, reset, inspect and capture
  -> no persistence domain or save/load command
```

## Domains in use

```txt
browser shell, DOM boot and visible failure projection
external dependency manifest and dynamic provider loading
source-provider selection, validation and fallback
DSK declaration, census, validation and install snapshots
game manifest, build and content identity
immutable game state, frame mutation and reset
game snapshot and diagnostics
runtime lifecycle, RAF scheduling and stop/start
runtime clock, step admission and reset epoch
persistence schema, slots and checkpoint identity
save envelope, serialization and integrity fingerprint
storage capability and failure classification
save command admission and atomic write verification
candidate parsing, classification and precedence
schema migration and migration history
content reconciliation
hydration planning, atomic commit and rollback
persistence journal and observation
GameHost capability projection
browser editor capability routing
Node headless editor, workspace and artifact operations
player, input, interaction, objective and story declarations
terrain, path, materials, scatter and atmosphere
grass density, archetypes, batching, placement, instancing, wind and LOD
tree, wind, performance and post-process enhancement
render-plan v2 contract and topology identity
CPU mesh construction
WebGL context, shader, buffer, draw, resize and disposal
render surface, context recovery and committed-frame observation
checkpoint-to-visible-frame and capture correlation
static checks, browser observation, build and Pages deployment
DSK implementation, dependency, consumption and retirement truth
```

## Complete kit inventory and services

### External kit

```txt
meadow-area-kit
  area/path/style/material normalization
  deterministic seeded scatter
  grass, flower, rock, mushroom and tree descriptors
  wind and atmosphere descriptors
  render-plan generation
  validation, snapshot, reset and optional runtime adapter
```

### Local game, host and composition

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

### World, player and experience

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
  context acquisition, shader program creation, attribute/uniform binding, CPU mesh ingest,
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

## Main finding: declared save services have no runtime path

### The save DSK is planned

`meadow-save-dsk` is present in `LOCAL_DSK_IDS` and its five services are generated into a descriptor. It is absent from `REQUIRED_V01_DSK_IDS`, so its descriptor status is `planned`, not an implementation-backed active capability.

### Startup and reset always construct defaults

`createIntoTheMeadowGame()` creates initial state immediately. `startWebHost()` provides no hydration input, and `game.reset()` replaces the live state with another default object.

### The snapshot is not a save envelope

`createGameSnapshot()` bundles manifest, state, render plan and diagnostics. It has no schema ID, slot, checkpoint ID, reset epoch, state revision, content revision, migration history, integrity fingerprint or hydration result.

### Persistence is absent from every public adapter

GameHost exposes raw game authority and read observations. Browser and Node editor capabilities include runtime, scene, renderer, camera, browser and workspace operations, but no persistence operation.

## Required parent domain

```txt
meadow-persistence-continuity-authority-domain
```

Planned coordinating kits:

```txt
save-schema-descriptor-kit
save-slot-registry-kit
checkpoint-id-kit
state-revision-kit
reset-epoch-kit
save-envelope-kit
save-integrity-fingerprint-kit
persistence-capability-kit
save-command-kit
save-admission-kit
save-write-result-kit
save-candidate-read-kit
save-candidate-classifier-kit
save-migration-kit
save-reconciliation-kit
hydration-plan-kit
hydration-commit-kit
hydration-rollback-kit
persistence-journal-kit
persistence-observation-kit
visible-frame-hydration-ack-kit
persistence-fixture-kit
browser-reload-continuity-smoke-kit
```

## Required transaction

```txt
SaveCommand
  -> admit session, reset epoch and expected state revision
  -> capture canonical persistable state
  -> validate current schema and content identity
  -> compute integrity fingerprint
  -> atomically write a named slot
  -> read back and verify the exact candidate
  -> publish typed SaveResult and bounded journal

startup or LoadCommand
  -> enumerate slots independently
  -> parse and classify every candidate
  -> select by one versioned precedence policy
  -> migrate supported predecessors
  -> reconcile scene, objective, story and content identities
  -> construct detached candidate state
  -> commit one state revision or preserve the predecessor
  -> rebuild derived render state
  -> render and acknowledge the first hydrated frame
  -> publish typed HydrationResult and journal
```

## Required proof

```txt
fresh boot produces an explicit no-save result
valid save survives browser reload
malformed candidates cannot crash startup or hide a valid candidate
unsupported schema and incompatible content fail explicitly
supported predecessor schema migrates deterministically
duplicate and stale commands are idempotent or rejected
quota, denial and read-back mismatch preserve the prior valid checkpoint
reset follows an explicit slot and epoch policy
hydration failure causes no partial state or frame mutation
browser and headless adapters share envelope and result semantics
state, snapshot, renderer, diagnostics and first visible frame cite one checkpoint
Pages proves deployed reload continuity
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
8. Interaction Command and Objective Authority
8a. Persistence Continuity Authority
9. DSK Runtime Consumption Authority
```

## Validation status

```txt
runtime source changed: no
persistence source changed: no
renderer source changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser reload smoke: not run
persistence fixtures: unavailable
```