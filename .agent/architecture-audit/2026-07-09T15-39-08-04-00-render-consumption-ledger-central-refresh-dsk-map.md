# Architecture Audit: Render Consumption Ledger Central Refresh

**Timestamp:** `2026-07-09T15-39-08-04-00`

## Current DSK/domain stack

```txt
static browser shell
  -> boot DOM adapter
  -> web host orchestration
  -> external meadow-area-kit
  -> external meadow-webgl-render-kit
  -> local DSK install registry
  -> arrival meadow content descriptors
  -> game state/snapshot/diagnostics
  -> render plan enhancement
  -> grass system descriptor family
  -> renderer consumer
  -> GameHost readback
```

## Domain breakdown

```txt
boot-domain
  owns canvas/hud/status/loading lookup and debug flag handoff.

external-kit-domain
  owns dynamic imports for meadow area and WebGL render factories.

dsk-install-domain
  owns local/external descriptor registration and validation counts.

meadow-area-domain
  owns arrival area render plan, objects, features, seed, style, and validation.

game-state-domain
  owns frame, active scene, active session, player position/yaw/pitch/path progress, world wind, progression, and DSK snapshot.

snapshot-domain
  owns GameHost-facing current state, diagnostics, content, and optional render snapshot.

render-enhancement-domain
  owns outline policy, clutter filtering, wind field, postprocess, performance policy, grass system, and render stats.

grass-system-domain
  owns density texture, archetypes, static batches, patch placement, draw groups, shader wind, LOD, density scaling, debug summary, and validation.

interaction-descriptor-domain
  owns target descriptors for focal tree inspect and path progress.

objective-domain
  owns objective descriptors for path progress and tree inspection.

render-consumption-ledger-domain-next
  should own expected descriptor rows, renderer snapshot normalization, consumed/ignored/unsupported descriptors, and GameHost parity projection.

action-fixture-domain-next
  should own action frames, target preflight, action result, objective progress, and DOM-free replay rows.
```

## Current service map

```txt
loadExternalKits()
  -> imports GAME_MANIFEST.externalKits[0..1]

createIntoTheMeadowGame()
  -> binds manifest/content/dsk install/meadow/state/snapshot/tick/reset

enhanceRenderPlan()
  -> emits filtered objects, grassSystem, grassPatches, windField, postProcess, performance, and stats

createGrassSystem()
  -> emits densityTexture/staticBatches/patches/drawGroups/shaderWind/lod/debug/validation

renderer.render(plan)
  -> consumes enhanced plan and returns render counts

exposeGameHost()
  -> exposes state/snapshot/diagnostics/game object
```

## Architectural finding

The architecture already has enough DSK boundaries to avoid a visual rewrite. The unresolved boundary is proof: descriptors are produced, but the repo does not yet record which descriptors the renderer consumed, which grass rows mapped to instances, and which gameplay descriptors mutated state.

## Required next DSK cut

```txt
render-expectation-collection-kit
renderer-snapshot-normalizer-kit
render-consumption-ledger-kit
grass-consumption-row-kit
action-frame-kit
target-action-preflight-kit
action-result-kit
objective-progress-kit
gameplay-snapshot-projection-kit
GameHost-proof-projection-kit
DOM-free-action-fixture-kit
```
