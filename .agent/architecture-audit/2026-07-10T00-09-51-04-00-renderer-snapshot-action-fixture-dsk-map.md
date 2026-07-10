# Architecture Audit: Renderer Snapshot + Action Fixture DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T00-09-51-04-00`

## Architecture read

`IntoTheMeadow` is a static browser meadow route with source descriptors, DSK validation, render-plan enhancement, a local WebGL renderer, and a GameHost debug surface.

The architecture is healthy enough for proof work; it should not start with visual replacement.

## DSK/domain flow

```txt
static browser shell
  -> boot DOM adapter
  -> web host orchestration
  -> external meadow-area-kit import
  -> createIntoTheMeadowGame
  -> DSK install validation
  -> arrival meadow source config
  -> meadow area render plan
  -> render plan enhancer
  -> grass DSK family
  -> wind/postprocess/performance DSKs
  -> meadow render contract v2
  -> meadow-webgl-renderer-v2
  -> aggregate renderer snapshot
  -> GameHost debug surface
```

## Gameplay/action flow today

```txt
initial state
  -> active objective walk-the-path
  -> objectives and interaction targets are content descriptors
  -> requestAnimationFrame tick
  -> advanceGameState(state, input)
  -> frame increments
  -> lastTick records dt/time
  -> no action frame, preflight, action result, or objective progress row
```

## Current domains

```txt
static-browser-shell
boot-dom-adapter
web-host-orchestration
external-kit-imports
dsk-install-validation
manifest-and-build-metadata
arrival-meadow-source-config
meadow-area-render-plan
fallback-meadow-area-render-plan
render-plan-enhancement
source-topology-cache
object-outline-policy
tiny-clutter-reduction
tree-object-enhancement
grass-density-texture
grass-clump-archetype
grass-static-batch
grass-patch-placement
grass-instancing-render-descriptor
grass-shader-wind
grass-lod-policy
grass-density-scaling
grass-debug-visualization
wind-field
postprocess-stack
meadow-performance-policy
mesh-builder-v2
webgl-renderer-v2
renderer-topology-cache
inline-cel-fog-render-pass
state-snapshot-diagnostics
objective-descriptor-domain
interaction-target-domain
frame-tick-domain
GameHost-debug-surface
render-proof-next
grass-proof-next
action-fixture-next
objective-progress-next
central-ledger-sync
```

## Service map

```txt
external-kit-service: imports meadow-area-kit and provides createMeadowAreaKit
DSK-install-service: validates local and external descriptors
render-plan-service: emits static arrival meadow plan and fallback plan
render-enhancer-service: adds grass, wind, postprocess, performance, stats, and contract metadata
grass-service: emits density, archetype, static batch, placement, draw group, wind, LOD, scale, debug, validation
renderer-service: consumes render contract and reports aggregate snapshot
GameHost-service: exposes state, snapshot, diagnostics, render plan, renderer snapshot, enhancer snapshot
action-proof-service: planned ActionFrame, target/action preflight, ActionResult, objective progress, fixture rows
central-ledger-service: repo-local .agent and LuminaryLabs central repo ledger
```

## Kit inventory

Current implemented and external kits:

```txt
meadow-area-kit
fallback-meadow-area-kit
meadow-webgl-renderer-v2
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
```

Planned proof kits:

```txt
render-expectation-row-kit
renderer-snapshot-normalizer-kit
render-consumption-ledger-kit
grass-consumption-row-kit
gamehost-render-proof-kit
action-frame-kit
target-action-preflight-kit
action-result-kit
objective-progress-kit
DOM-free-action-fixture-kit
central-ledger-sync-kit
```

## Architecture finding

The durable seam is row-level proof.

Renderer v2 has enough aggregate readback to normalize, and the content layer has enough objective/target descriptors to fixture, but the repo does not yet prove source descriptor consumption or action/objective mutation in DOM-free rows.
