# IntoTheMeadow Project Breakdown

**Timestamp:** `2026-07-10T01-38-16-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

**Mode:** documentation-only repo breakdown

## Selection

`IntoTheMeadow` was selected after comparing the current public `LuminaryLabs-Publish` repository list against the central ledger in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry repository was new, missing from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remained excluded.

`IntoTheMeadow` was the oldest eligible documented fallback after `PrehistoricRush` advanced to `2026-07-10T01-31-29-04-00`.

## Current interaction loop

```txt
index.html
  -> canvas#scene, HUD, loading panel, and status DOM
  -> src/boot/boot-game.js
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports meadow-area-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks() validates local and external DSK descriptors
  -> create arrival meadow area render plan
  -> create local meadow WebGL renderer v2 compatible adapter
  -> create render plan enhancer
  -> exposeGameHost with state, snapshot, diagnostics, render plan, renderer snapshot, enhancer snapshot, and game reference
  -> installIntoTheMeadowEditorBridge({ gameHost, canvas })
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and records lastTick only
  -> game.getRenderPlan(time)
  -> planEnhancer.enhance(rawPlan)
  -> createGrassSystem() produces density, batch, patch, draw group, wind, LOD, and debug descriptors
  -> renderer.render(enhancedPlan)
  -> renderer snapshot reports aggregate topology/cache/count/fallback facts
  -> optional debug HUD reports validation, schema, grass, flowers, rocks, vertices, GPU cache, plan cache, and editor protocol state
```

## Domains in use

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
headless-editor-runtime
editor-bridge
GameHost-debug-surface
render-proof-next
grass-proof-next
action-fixture-next
objective-progress-next
headless-observation-proof-next
central-ledger-sync
```

## Kit services

```txt
external-kit-service: dynamic import and meadow area factory.
dsk-install-service: local descriptor validation, external descriptor validation, snapshot.
game-state-service: initial state, frame tick, last tick, reset.
snapshot-service: manifest, state, render plan, diagnostics, validation.
render-enhancement-service: filtered objects, outline policy, grass system, wind field, postprocess, performance, stats.
grass-system-service: density texture, archetypes, static batches, patches, draw groups, shader wind, LOD, debug, validation.
renderer-v2-service: WebGL context, shader program, mesh buffer cache, topology-key rebuild, outline pass, main cel-fog pass, aggregate renderer snapshot.
content-service: story beats, arrival objectives, arrival interaction targets.
GameHost-service: getState, getSnapshot, getDiagnostics, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, game reference.
headless-editor-service: editor command surface, status/inspect/capture/loop/browser observation scripts.
planned-render-proof-service: expectation rows, snapshot normalization, consumption ledger, GameHost projection.
planned-action-fixture-service: ActionFrame, preflight, ActionResult, objective progress, fixture rows.
planned-headless-observation-service: run route through editor harness and collect proof rows without relying on visual claims.
```

## Implemented kits

```txt
meadow-area-kit
fallback-meadow-area-kit
meadow-webgl-renderer-v2
meadow-webgl-renderer-v2-compatible
headless-editor-runtime bridge
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
GameHost exposure kit
DSK install registry kit
headless editor command scripts
static/render/deterministic/headless editor smoke tests
```

## Next-cut kits

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
headless-editor-proof-row-kit
headless-editor-observation-ledger-kit
central-ledger-sync-kit
```

## Main finding

`IntoTheMeadow` should not start next with visual fidelity, renderer replacement, external CDN migration, shared-kit promotion, new meadow content, grass art tuning, or camera/control wiring.

The blocker is proof rows across the existing renderer, grass, gameplay, and headless editor surfaces.

The repo now has a richer `npm run check` that includes headless editor environment, command, and loop smokes. That is useful, but it still does not prove descriptor consumption, grass source/render parity, action/objective results, or headless observation rows tied to `GameHost` readback.

## Next safe ledge

```txt
IntoTheMeadow Headless Render Action Proof Catch-up + GameHost Ledger Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free render/action fixture: not run because proof files do not exist yet
headless editor smoke: not run in this docs-only pass
pushed to main: yes, documentation only
```
