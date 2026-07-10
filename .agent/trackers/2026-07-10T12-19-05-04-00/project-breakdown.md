# Project Breakdown: IntoTheMeadow Consumer Proof Attribution Ledger

**Timestamp:** `2026-07-10T12-19-05-04-00`

**Repo:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

## Selection

The current public `LuminaryLabs-Publish` list was compared against central `LuminaryLabs-Dev/LuminaryLabs` ledger recency and sampled root `.agent` state.

No checked non-Cavalry repository was new, central-ledger absent, missing root `.agent`, recently added, or otherwise undocumented.

`IntoTheMeadow` was selected as the oldest eligible documented fallback after `PrehistoricRush` advanced.

`TheCavalryOfRome` remained excluded by rule.

## Current product read

`IntoTheMeadow` is a DSK-composed static meadow route with a local WebGL renderer v2, grass descriptor stack, aggregate `GameHost` diagnostics, and a Nexus headless editor bridge.

The route has rich descriptors and useful aggregate readback, but it still lacks source-owned attribution rows proving which descriptors, actions, objectives, and editor observations were consumed, ignored, unsupported, fallback-rendered, accepted, rejected, skipped, or completed.

## Interaction loop

```txt
index.html
  -> boot-game.js
  -> startWebHost
  -> load external meadow-area-kit
  -> createIntoTheMeadowGame
  -> install local/external DSK descriptors
  -> create cached arrival meadow render plan
  -> create local WebGL renderer v2 adapter
  -> expose GameHost
  -> install NexusEditorEnvironment bridge
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> get raw render plan
  -> enhance render plan with grass/wind/postprocess/performance/stats
  -> renderer.render(enhancedPlan)
  -> renderer snapshot reports aggregate topology/cache/count/fallback facts
  -> optional debug HUD writes counts
  -> editor bridge exposes runtime/scene/renderer/capture/viewport/error commands
```

## Domains in use

```txt
static-browser-shell
boot-dom-adapter
web-host-orchestration
external-kit-imports
dsk-install-validation
arrival-meadow-source-config
meadow-area-render-plan
render-plan-enhancement
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
webgl-renderer-v2
state-snapshot-diagnostics
objective-descriptor-domain
interaction-target-domain
GameHost-debug-surface
headless-editor-runtime
render-consumption-proof-next
grass-source-render-parity-next
action-result-proof-next
objective-progress-proof-next
headless-editor-proof-row-next
consumer-attribution-ledger-next
```

## Kit services

```txt
meadow-area-kit: external arrival meadow render plan factory
fallback-meadow-area-kit: local fallback render plan factory
install-dsks: local/external descriptor validation and snapshot
meadow-render-plan-enhancer: filtered source objects, grass system, wind field, postprocess, performance, stats, cache snapshot
meadow-webgl-renderer-v2: WebGL context, shader program, buffer cache, outline pass, cel-fog pass, aggregate renderer snapshot
grass-density-texture-kit: density texture descriptor and validation
grass-clump-archetype-kit: clump card archetypes and validation
grass-static-batch-kit: static grass batches and validation
grass-patch-placement-kit: patch placement rows and validation
grass-clump-instancing-render-kit: draw groups and validation
grass-shader-wind-kit: shader wind descriptor and validation
grass-lod-policy-kit: LOD policy and validation
grass-density-scaling-kit: quality-based density scale
grass-debug-visualization-kit: debug summary rows
GameHost-diagnostics-kit: getState, getSnapshot, getDiagnostics, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, game reference
headless-editor-bridge-kit: runtime status/tick/reset, scene stats, renderer snapshot/capture, viewport/errors, command invocation
```

## Kits

```txt
meadow-area-kit
fallback-meadow-area-kit
install-dsks
meadow-render-plan-enhancer
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
GameHost-diagnostics-kit
headless-editor-bridge-kit
render-expectation-row-kit planned
renderer-snapshot-normalizer-kit planned
render-consumption-ledger-kit planned
grass-consumption-row-kit planned
consumer-attribution-row-kit planned
action-frame-kit planned
target-action-preflight-kit planned
action-result-kit planned
objective-progress-kit planned
headless-editor-proof-ledger-kit planned
GameHost-proof-projection-kit planned
```

## Main finding

`IntoTheMeadow` should not start next with visual fidelity, renderer replacement, external CDN migration, shared-kit promotion, new meadow content, grass art tuning, camera/control rewiring, or editor command expansion.

The blocker is source-to-consumer attribution. `advanceGameState()` still increments only frame and `lastTick`, while renderer, grass, `GameHost`, and headless editor surfaces report aggregate snapshots rather than source-owned proof rows.

## Next safe ledge

```txt
IntoTheMeadow Consumer Proof Attribution Ledger Refresh + Headless Editor Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm test: not run
browser smoke: not run
headless editor smoke: not run
DOM-free attribution fixtures: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: pending at repo-local write time
```
