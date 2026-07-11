# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-11T02-20-44-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed static meadow route with a commit-pinned external meadow provider, local render-plan enhancement, a combined CPU/WebGL renderer, and browser plus Node headless-editor surfaces.

This documentation-only pass reconciles the complete DSK census and maps the gap between declared kits, source-backed implementations, runtime imports, outputs, and consumers.

## Plan ledger

**Goal:** Establish an exact kit and service inventory, distinguish declarations from implementations and consumption, and define the fixture gate needed before the registry can be treated as runtime truth.

```txt
[x] Enumerate the complete LuminaryLabs-Publish inventory.
[x] Exclude TheCavalryOfRome.
[x] Compare all eligible repositories with the central ledger.
[x] Select only the oldest eligible repository.
[x] Read repository instructions and current .agent state.
[x] Trace browser and editor interaction loops.
[x] Identify all domains in use.
[x] Enumerate every declared local and external kit.
[x] Enumerate every declared kit service.
[x] Separate source-backed, descriptor-only, required, planned, imported, and consumed states.
[x] Identify the renderer registry fallback mismatch.
[x] Add timestamped architecture and system audits.
[x] Refresh required root .agent files.
[x] Push only to main.
[x] Update the central ledger and internal change log.
```

## Repository selection

```txt
IntoTheMeadow       selected / 2026-07-11T00-30-48-04-00
PrehistoricRush      tracked  / 2026-07-11T00-39-25-04-00
TheOpenAbove         tracked  / 2026-07-11T00-49-45-04-00
HorrorCorridor       tracked  / 2026-07-11T01-10-28-04-00
PhantomCommand       tracked  / 2026-07-11T01-20-51-04-00
ZombieOrchard        tracked  / 2026-07-11T01-31-15-04-00
TheUnmappedHouse     tracked  / 2026-07-11T01-38-28-04-00
MyCozyIsland         tracked  / 2026-07-11T02-02-59-04-00
AetherVale           tracked  / 2026-07-11T02-10-13-04-00
TheCavalryOfRome     excluded by rule
```

All nine eligible repositories were tracked and had root `.agent` state. `IntoTheMeadow` was the oldest eligible fallback.

## Interaction loop

```txt
browser boot
  -> external kit import
  -> DSK descriptor install and validation
  -> game/source-plan construction
  -> renderer/enhancer/GameHost/editor construction
  -> RAF tick
  -> render-plan derivation and enhancement
  -> WebGL render
  -> HUD and diagnostic projection
  -> successor RAF

browser editor
  -> direct runtime tick/reset or read/capture capability

Node editor
  -> fallback-backed on-demand plan, mesh, metrics, and synthetic SVG
```

## Domains in use

```txt
browser shell and DOM boot
runtime session construction and RAF lifecycle
external kit resolution and source-provider selection
DSK registry, descriptor creation, validation, installation, and snapshots
game manifest, content, state, tick, reset, and snapshot
source-plan cache, time overlay, and rebuild
story, objective, and interaction-target descriptors
terrain, path, materials, scatter, atmosphere, tree, and grass composition
wind, performance, and postprocess enhancement
render-plan validation and topology hashing
CPU mesh construction
WebGL context, shaders, buffers, cache, resize, draw, snapshot, and disposal
GameHost diagnostics and global exposure
browser editor capability routing, errors, viewport, and canvas capture
Node editor plan, mesh, metrics, artifacts, and workspace
HUD/loading/fatal projection
Node smoke checks and static Pages deployment
```

Declared but not runtime-authoritative:

```txt
player movement
camera control
browser input mapping
interaction preflight and gameplay commands
story/objective mutation
audio
save/load
UI progression
```

## Exact declared kit census

```txt
external: meadow-area-kit
local declared: 43
total declared: 44
required-v0.1 local: 15
```

### All local kits and declared services

```txt
into-the-meadow-game-dsk: game-manifest, kit-stack-registry, game-state-root, boot-sequence, game-snapshot
web-host-dsk: document-shell, browser-loop, host-debug-surface, asset-loading-host, browser-safety
game-composition-dsk: dsk-registry, scene-composition, render-composition, simulation-composition, composition-validation
meadow-area-bridge-dsk: meadow-area-config, meadow-feature-config, meadow-area-kit-adapter, meadow-area-state, meadow-area-validation
meadow-terrain-texture-dsk: terrain-surface-model, material-layer-system, path-layer-system, terrain-sampler, terrain-validation
path-corridor-dsk: path-curve-model, walkable-corridor, path-surface-detail, path-progression, path-validation
grass-density-texture-kit: density-texture-model, density-channels, density-compositor, density-sampler, density-validation
grass-clump-archetype-kit: clump-family-registry, card-layout-generator, texture-atlas-binding, clump-variant-generator, archetype-validation
grass-static-batch-kit: clump-mesh-builder, batch-variant-cache, atlas-material, static-batch-lod, batch-validation
grass-patch-placement-kit: patch-grid, density-driven-placement, clump-instance-selection, patch-instance-buffer, placement-validation
grass-clump-instancing-render-kit: batch-registry, instance-stream, draw-group-builder, shader-binding, render-validation
grass-shader-wind-kit: wind-uniforms, tip-bend-model, phase-field, gust-response, wind-validation
grass-lod-policy-kit: near-lod, mid-lod, far-lod, terrain-tint-lod, lod-validation
grass-density-scaling-kit: quality-scale, budget-scale, density-scale, profile-scale, scale-validation
grass-debug-visualization-kit: density-view, patch-view, instance-view, lod-view, debug-validation
grass-patch-dsk: patch-grid, blade-distribution, terrain-awareness, wind-binding, grass-validation
gpu-grass-render-dsk: grass-instance-buffer, grass-blade-mesh, shader-wind, grass-lod-render, grass-render-validation
wind-field-dsk: wind-state, wind-sampler, wind-zones, wind-consumers, wind-validation
tree-object-dsk: focal-tree-model, tree-line-model, tree-materials, tree-wind-binding, tree-validation
meadow-scatter-dsk: flower-scatter, rock-scatter, mushroom-scatter, placement-rules, scatter-validation
meadow-atmosphere-dsk: sky-gradient, sun-system, cloud-layer, distant-hills, atmosphere-validation
meadow-player-dsk: player-state, movement-profile, terrain-contact, player-actions, player-validation
meadow-camera-dsk: camera-mode, camera-rig, camera-collision, camera-feel, camera-validation
meadow-input-dsk: action-map, device-bindings, input-context, input-normalization, input-validation
meadow-interaction-dsk: interactable-registry, affordance-rules, inspect-state, interaction-events, interaction-validation
meadow-story-dsk: story-state, story-beats, dialogue-text, sequence-runner, story-validation
meadow-objective-dsk: objective-model, objective-flow, completion-ledger, feedback-surface, objective-validation
meadow-ecology-dsk: ambient-life, ecology-zones, ambience-triggers, non-gameplay-agents, ecology-validation
meadow-audio-dsk: ambient-bed, spatial-audio-cues, audio-state, audio-events, audio-validation
meadow-ui-dsk: minimal-hud, story-text-panel, debug-ui, ui-state, ui-validation
meadow-save-dsk: save-model, save-slots, persistence-adapter, migration, save-validation
meadow-diagnostics-dsk: runtime-health, render-health, determinism-checks, smoke-tests, diagnostics-report
meadow-performance-dsk: quality-profile, budget-policy, lod-policy, adaptive-scaling, performance-validation
meadow-render-host-dsk: renderer-selection, render-plan-ingest, pass-order, renderer-state, renderer-validation
meadow-webgl-renderer-v2-kit: webgl-context, shader-programs, mesh-buffer-cache, outline-pass, cel-fog-pass
post-process-stack-dsk: pass-registry, render-target-system, sobel-outline-pass, color-grade-pass, post-validation
render-target-kit: scene-color-texture, depth-texture, normal-texture, ping-pong-buffer, resize-policy
sobel-outline-pass-kit: color-edge-threshold, depth-edge-threshold, normal-edge-threshold, outline-color, object-mask
color-grade-pass-kit: warmth, contrast, saturation, shadow-tint, highlight-tint
depth-fog-pass-kit: fog-near, fog-far, fog-color, distance-curve, horizon-haze
vignette-pass-kit: radius, softness, strength, center, quality-tier
final-composite-pass-kit: scene-input, post-input, output-target, debug-overlay, fallback-composite
static-pages-deploy-dsk: build-config, github-pages-workflow, release-artifacts, cache-invalidation, deploy-validation
```

### Runtime source-backed surfaces

```txt
meadow-area-kit (external, commit-pinned)
fallback-meadow-area-kit
install-dsks
meadow-render-plan-v2
meadow-render-plan-enhancer-v2
meadow-mesh-builder-v2
meadow-webgl-renderer-v2
precision-safe WebGL compatibility adapter
tree-object-dsk
wind-field-dsk
meadow-performance-dsk
post-process-stack-dsk
grass-density-texture-kit
grass-clump-archetype-kit
grass-static-batch-kit
grass-patch-placement-kit
grass-clump-instancing-render-kit
grass-shader-wind-kit
grass-lod-policy-kit
grass-density-scaling-kit
grass-debug-visualization-kit
GameHost diagnostics surface
browser editor bridge
Node headless-editor environment
```

The runtime-backed list is not identical to the declared registry. Some concrete adapters are not registry entries, while many declared gameplay, audio, save, UI, and postprocess kits are descriptor shells.

## Registry truth finding

`src/content/dsk-registry.js` declares 43 local IDs. `src/dsks/index.js` converts each ID into a descriptor and marks required IDs `active-v0.1`. The install path validates descriptor shape, duplicates, and required membership.

It does not prove:

```txt
source file exists
implementation was imported
service was invoked
output was produced
consumer accepted output
renderer consumed descriptor
gameplay reducer consumed descriptor
observation can identify the producing kit
```

`meadow-webgl-renderer-v2-kit` appears in `LOCAL_DSK_IDS` and `REQUIRED_V01_DSK_IDS`, but has no explicit label or service mapping. The descriptor falls back to:

```txt
model
state
events
validation
snapshot
```

That generic row does not match the actual renderer contract.

## Required authority boundary

Add a registry truth ledger that records, per kit:

```txt
kitId
declarationStatus
requiredStatus
implementationStatus
implementationModule
importStatus
invocationStatus
outputKinds
consumerIds
consumptionStatus
proofRows
lastObservedFrameId
validationResult
```

Allowed implementation statuses:

```txt
external
source-backed
descriptor-shell
planned
unresolved
```

Allowed consumption statuses:

```txt
not-applicable
not-observed
produced
partially-consumed
consumed
rejected
unsupported
fallback-consumed
```

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority + Stop/Restart/Dispose/Rollback Fixture Gate
2. Committed Frame Observation Authority + State/Plan/Render/Canvas Coherence Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. DSK Registry Truth + Mesh Contribution and Consumer Proof Fixture Gate
```
