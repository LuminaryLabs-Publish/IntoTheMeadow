# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T15-49-49-04-00`

## Summary

`IntoTheMeadow` declares one external kit and 43 local DSK/kit entries. The registry validates descriptor shape and publishes counts, but it does not compose the active runtime. The game and render-plan enhancer import concrete implementations directly, while generated descriptors expose generic metadata that is not connected to those instances.

The result is a registry-truth gap: declared services can appear valid without being implemented or consumed, and implemented services can run without a registry binding, install result, dependency edge, consumption receipt or disposal record.

## Plan ledger

**Goal:** document the exact declaration-to-runtime gap and define one authoritative install and consumption graph shared by game composition, rendering, diagnostics, reset and validation.

- [x] Enumerate the ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare nine eligible repositories with the central ledger.
- [x] Select only `IntoTheMeadow` as the oldest eligible documented repository.
- [x] Read `AGENTS.md` and retained audits.
- [x] Inspect `dsk-registry.json` and `src/content/dsk-registry.js`.
- [x] Inspect descriptor generation in `src/dsks/index.js`.
- [x] Inspect `installDsks()`, game construction, state snapshots and diagnostics.
- [x] Inspect direct implementation imports in render-plan enhancement.
- [x] Inspect registry smoke coverage.
- [x] Inventory all domains, kits and declared services.
- [x] Add architecture, render, gameplay, registry and deploy audits.
- [x] Change documentation only.
- [ ] Runtime implementation and fixtures remain future work.

## Interaction loop

```txt
browser boot
  -> load commit-pinned meadow-area provider
  -> createIntoTheMeadowGame()
  -> installDsks()
  -> return generated local descriptors and external loaded/deferred rows
  -> instantiate meadow provider separately
  -> create initial state with a descriptor snapshot
  -> create render-plan enhancer and WebGL renderer
  -> expose GameHost and editor surfaces

render-plan composition
  -> import tree, wind, performance, post and grass factories directly
  -> instantiate concrete services outside the descriptor registry
  -> enhance render plan
  -> renderer consumes the resulting plan

RAF
  -> game.tick({ time, dt })
  -> enhance cached plan
  -> render
  -> publish diagnostics that report registry counts, not per-service consumption
```

## Domains in use

```txt
browser shell, DOM boot and fatal projection
manifest and external dependency declaration
source-provider loading, fallback and source-plan generation
DSK ID census, descriptor generation and shape validation
DSK install reporting and game-state snapshots
game state, tick, reset, snapshot and diagnostics
runtime lifecycle, RAF ownership and session authority
public host capability routing and editor adapters
headless workspace and filesystem operations
runtime-step admission and clock policy
player, input, interaction, objective and story declarations
terrain, path, materials and source feature composition
grass density, archetypes, batching, placement, instancing, wind and LOD
tree enhancement, wind field, performance and post-process composition
render-plan v2 contracts, topology identity and cache behavior
CPU mesh construction and WebGL resource ownership
renderer observation, diagnostics and GameHost readback
static checks, editor smokes, build and Pages deployment
missing dependency graph, service binding, install result and consumption authority
```

## Complete kit inventory and declared services

### External kit

```txt
meadow-area-kit
  area normalization
  path normalization
  style and material normalization
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

### Render and deployment

```txt
meadow-render-host-dsk
  renderer-selection, render-plan-ingest, pass-order, renderer-state, renderer-validation
meadow-webgl-renderer-v2-kit
  actual source-backed services exist, but the generated descriptor falls back to model/state/events/validation/snapshot because its service-map row is missing
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
  build-config, github-pages-workflow, release-artifacts, cache-invalidation, deploy-validation
```

## Main finding: the registry does not compose runtime services

### Duplicate declaration sources

```txt
dsk-registry.json
src/content/dsk-registry.js
src/dsks/index.js maps
.agent/kit-registry.json
```

There is no generated single source of truth or drift check across these surfaces.

### Descriptor generation is metadata-only

Every descriptor is generated from an ID and service-name array. The descriptor:

```txt
has no implementation module reference
has no factory or instance identity
has requires: []
has one generic provides token
has status derived from required-v0.1 membership
validates naming and minimum subdomain count only
```

### Installation is not installation

`installDsks()`:

```txt
validates generated local descriptor shape
marks the external provider loaded when a truthy value exists
returns descriptor arrays and counts
creates no local instances
resolves no dependencies
binds no services
calls no lifecycle methods
records no failures by kit
returns no disposal plan
```

### Concrete runtime bypass

`enhance-render-plan.js` imports and instantiates tree, wind, performance, post-process and nine grass factories directly. Those concrete consumers do not query a DSK service registry and do not publish a consumption receipt.

### Status is not implementation truth

```txt
active-v0.1 = ID appears in REQUIRED_V01_DSK_IDS
planned = ID is not in that list
```

This means runtime-used kits such as `tree-object-dsk` and `wind-field-dsk` can be labelled planned, while a required descriptor can validate without proving that its declared services are implemented.

### Concrete service-map drift

`meadow-webgl-renderer-v2-kit` is required for v0.1 and has a real implementation, but it is absent from the `DOMAIN_LABELS` and `SERVICES` tables. Its descriptor therefore receives the generic fallback:

```txt
model
state
events
validation
snapshot
```

The registry does not describe the renderer actually shipped.

### Tests prove shape, not consumption

The DSK smoke asserts:

```txt
registry validation passed
local descriptor count >= 26
each descriptor has five architecture layers
```

It does not assert implementation bindings, dependency admission, service resolution, runtime consumers, reset/disposal or registry/runtime parity.

## Required parent domain

```txt
meadow-dsk-runtime-consumption-authority-domain
```

Update existing owners first:

```txt
game-composition-dsk
into-the-meadow-game-dsk
meadow-diagnostics-dsk
meadow-render-host-dsk
install-dsks adapter
descriptor registry
browser and Node editor observations
static and runtime fixtures
```

Candidate coordinating kits:

```txt
dsk-definition-source-kit
dsk-implementation-binding-kit
dsk-capability-contract-kit
dsk-dependency-graph-kit
dsk-install-plan-kit
dsk-install-admission-kit
dsk-instance-registry-kit
dsk-service-registry-kit
dsk-external-provider-identity-kit
dsk-runtime-consumption-receipt-kit
dsk-status-derivation-kit
dsk-consumer-ack-kit
dsk-lifecycle-disposal-kit
dsk-diagnostics-projection-kit
dsk-registry-drift-fixture-kit
dsk-consumption-parity-fixture-kit
```

## Required transaction

```txt
canonical DSK definitions
  -> resolve implementation binding and source identity
  -> build dependency/capability graph
  -> reject missing, duplicate or cyclic requirements
  -> create ordered install plan
  -> instantiate into staged ownership
  -> validate provided services
  -> atomically publish active service registry
  -> consumers resolve services by capability
  -> each consumer records a consumption receipt
  -> diagnostics derive status from receipts and failures
  -> reset/stop retires instances in reverse dependency order
```

## Required proof

```txt
every declared active kit has one implementation binding
every binding has one source identity and version/fingerprint
every required capability resolves exactly once
missing and cyclic dependencies reject without partial activation
renderer descriptor services match the renderer implementation
runtime-used tree, wind, grass and post services produce consumption receipts
player/input/interaction/objective declarations remain declared-only until bound
external provider identity and validation are recorded
diagnostics distinguish declared, installed, active, consumed, failed and retired
reset and stop dispose in reverse dependency order
registry JSON, source IDs and generated definitions cannot drift
```

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
5. Source Provider Authority
6. Render Topology Identity Authority
7. Committed Frame Observation Authority
8. Interaction Command and Objective Authority
9. DSK Runtime Consumption Authority
```

## Validation boundary

```txt
runtime source changed: no
dependencies or manifests changed: no
gameplay/render/deployment changed: no
branch or PR created: no
npm run check: not run
browser smoke: not run
DSK consumption fixtures: unavailable
```

No claim is made that a declared DSK is operational until an executable fixture proves its implementation binding, dependency admission, service resolution, runtime consumption and lifecycle retirement.