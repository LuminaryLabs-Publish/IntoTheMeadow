# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T19-01-08-04-00`

## Summary

`IntoTheMeadow` contains one external meadow provider, 43 local DSK/kit declarations, a descriptor-driven render plan, a CPU mesh builder, a persistent WebGL renderer, browser `GameHost` and editor surfaces, and Node headless-editor operations.

This pass isolates fatal-runtime failure recovery. The host can fail during external provider loading, game construction, renderer construction, editor installation, simulation, plan enhancement, validation, mesh/buffer work, draw submission or debug projection. Current failure handling displays text and stops the RAF chain, but does not own failure identity, partial acquisition cleanup, state/plan/render rollback, public capability quarantine, terminal disposal or a safe cold restart.

## Plan ledger

**Goal:** document the exact startup and frame failure paths and define one authoritative failure lifecycle that preserves the last known-good frame, blocks stale mutation/capture, retires partial resources and creates a fresh runtime generation before success resumes.

- [x] Enumerate all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible central ledgers and root `.agent` states.
- [x] Select only `IntoTheMeadow` as the oldest eligible documented repository.
- [x] Read `AGENTS.md`, current agent state and retained audits.
- [x] Inspect boot rejection, host acquisitions, frame order, fatal projection and restart.
- [x] Inspect renderer mutation/disposal and editor capability/error ownership.
- [x] Preserve every active domain, kit and offered service.
- [x] Add architecture, render, gameplay, interaction, failure-recovery and deployment audits.
- [x] Change documentation only.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
IntoTheMeadow      2026-07-11T17-30-56-04-00  selected
PrehistoricRush    2026-07-11T17-39-47-04-00
MyCozyIsland       2026-07-11T17-50-37-04-00
TheOpenAbove       2026-07-11T18-01-38-04-00
HorrorCorridor     2026-07-11T18-11-21-04-00
PhantomCommand     2026-07-11T18-21-09-04-00
ZombieOrchard      2026-07-11T18-28-40-04-00
TheUnmappedHouse   2026-07-11T18-38-45-04-00
AetherVale         2026-07-11T18-48-21-04-00
TheCavalryOfRome   excluded
```

No eligible repository was new, central-ledger-missing or root-`.agent`-missing. Only `IntoTheMeadow` was changed in the Publish organization.

## Interaction loop

```txt
browser boot
  -> import commit-pinned meadow-area provider
  -> create game and DSK report
  -> create WebGL renderer
  -> create render-plan enhancer
  -> publish GameHost
  -> install NexusEditorEnvironment
  -> schedule RAF

RAF
  -> game.tick mutates frame and lastTick
  -> get source plan with time overlay
  -> enhance and validate plan
  -> publish lastPlan
  -> resize, build/reuse mesh and buffers
  -> submit outline and color passes
  -> publish renderer snapshot and lastRender
  -> update debug HUD
  -> schedule next RAF

fatal path today
  -> catch error
  -> set stopped = true
  -> expose text and console error
  -> retain game, renderer, enhancer, editor bridge and globals
  -> retain last successful or partially advanced observations

manual/editor path after fatal
  -> runtime.tick and runtime.reset remain available
  -> scene and renderer reads remain available
  -> renderer.capture still serializes the canvas

restart today
  -> start() sets stopped = false
  -> schedule RAF on the same graph
```

## Domains in use

```txt
browser shell, DOM boot and visible fatal projection
external dependency manifest and dynamic provider loading
source-provider selection, fallback and source-plan generation
DSK census, descriptor generation, validation and install reporting
game state, tick, reset, snapshots and diagnostics
runtime session lifecycle, RAF ownership and restart
startup acquisition, partial-construction rollback and terminal cleanup
GameHost capability exposure and browser editor adapters
Node headless editor, workspace and artifact operations
runtime-step admission, clock and reset epochs
player, input, interaction, objective and story declarations
terrain, path, materials, scatter and atmosphere
grass density, archetypes, batching, placement, instancing, wind and LOD
tree, wind, performance and post-process enhancement
render-plan v2 contract, topology identity and cache policy
CPU mesh construction
WebGL context, program, locations, buffers, draw and disposal
WebGL context-loss/restoration and resource-generation recovery
committed-frame staging, last-known-good observation and capture freshness
fatal failure identity, classification, quarantine, cleanup and cold restart
static checks, browser observation, build and Pages deployment
DSK implementation, dependency, service-consumption and retirement truth
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
  context acquisition, shader program, attributes/uniforms, CPU mesh ingest,
  GPU buffers, two-pass draw, resize, snapshot and disposal
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

## Main finding: failure is visible but not authoritative

### Startup has no acquisition ledger

`startWebHost()` acquires the external provider, game, renderer, enhancer, global `GameHost` and editor bridge in sequence. Cleanup callbacks are not registered as each resource is acquired. A failure after renderer or global creation can escape to the boot catch without reverse-order disposal or global retirement.

### Frame mutation precedes success

The RAF advances game state, enhances the plan and assigns `lastPlan` before renderer success. The renderer may resize the canvas, replace buffers, clear and issue one or both draws before a later error is thrown. No staged transaction restores the prior state, plan, cache, canvas or renderer observation.

### Fatal projection is not a lifecycle state

`showFatal()` sets one local Boolean and writes text. It does not publish a failure ID, phase, source, frame request, previous committed frame, resource impact, cleanup result or recovery eligibility.

### Public authority survives failure

`GameHost` retains the raw game. `NexusEditorEnvironment` retains `runtime.tick`, `runtime.reset`, read and capture capabilities. Their listeners and globals remain installed, and capture can pair current canvas bytes with an older renderer snapshot.

### Restart is an unsafe in-place resume

`start()` schedules the same callback against the same game, renderer, enhancer, bridge and observations. It does not create a new session ID, renderer instance, context/resource generation, capability lease or first-frame acknowledgement.

### Disposal is disconnected

The renderer provides `dispose()` and the editor bridge provides `dispose()`, but neither fatal path invokes them. Boot rejection also has no partially constructed host controller through which to retire resources.

## Required parent domain

```txt
meadow-runtime-failure-recovery-authority-domain
```

## Existing owners to update first

```txt
web-host-dsk
into-the-meadow-game-dsk
runtime session lifecycle authority
Host Capability Gateway and Raw Runtime Quarantine
Source Provider Authority
Render Topology Identity Authority
WebGL Context Recovery Authority
Committed Frame Observation Authority
meadow-webgl-renderer-v2-kit
meadow-diagnostics-dsk
browser editor bridge
browser boot projection
browser and deployment fixtures
```

## Candidate coordinating kits

```txt
runtime-failure-id-kit
runtime-failure-state-kit
startup-acquisition-ledger-kit
reverse-cleanup-stack-kit
failure-classification-kit
fatal-event-admission-kit
frame-failure-result-kit
last-known-good-frame-kit
failure-quarantine-kit
failure-capability-fence-kit
failure-capture-fence-kit
rollback-or-retire-plan-kit
cleanup-result-kit
failure-observation-kit
restart-admission-kit
cold-restart-transaction-kit
terminal-disposal-kit
fatal-recovery-journal-kit
fatal-recovery-fixture-kit
```

## Required startup transaction

```txt
prepare startup
  -> allocate runtime/session candidate
  -> acquire provider, game, renderer, enhancer and editor leases
  -> register reverse cleanup after every acquisition
  -> validate complete candidate
  -> publish globals only at final commit
  -> commit ready result

startup failure
  -> classify acquisition phase
  -> execute reverse cleanup
  -> retire candidate identity
  -> guarantee no public globals or active listeners remain
  -> publish typed failed result
```

## Required frame-failure transaction

```txt
stage frame request
  -> stage state, plan and render candidate
  -> retain prior committed frame
  -> submit draw

failure
  -> reject candidate commit
  -> enter quarantined failure state
  -> stop automatic scheduling
  -> fence mutation and capture capabilities
  -> classify resource impact
  -> roll back safe staged state or retire the graph
  -> publish one failure result and cleanup result
```

## Required recovery

```txt
recoverable context/resource failure
  -> route through WebGL Context Recovery Authority
  -> require first recovered committed frame

terminal or unknown failure
  -> dispose editor, renderer and globals
  -> allocate new runtime/session/renderer/frame generations
  -> cold boot and validate
  -> publish only after first committed frame
```

The existing in-place `start()` must not be considered fatal recovery.

## Required proof

```txt
provider-load failure leaves no globals or resources
renderer-construction failure cleans prior acquisitions
editor-install failure disposes renderer and removes GameHost
failure after tick preserves the prior committed public frame
failure after buffer replacement produces a classified resource result
fatal state rejects tick, reset, rebuild and capture
cleanup failure is reported without restoring readiness
in-place start after fatal is rejected
cold restart uses new session, renderer and frame generations
first new-generation committed frame precedes ready status
three failure/restart cycles do not duplicate RAFs, listeners or globals
terminal disposal is idempotent
```

## Validation state

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
startup rollback fixture: unavailable
frame failure quarantine fixture: unavailable
cold restart fixture: unavailable
```
