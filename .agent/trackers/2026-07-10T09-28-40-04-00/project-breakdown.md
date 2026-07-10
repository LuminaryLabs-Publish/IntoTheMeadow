# Project Breakdown: IntoTheMeadow

**Timestamp:** `2026-07-10T09-28-40-04-00`

**Repo:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

## Selection

Selected as the oldest eligible non-Cavalry documented fallback after comparing the public `LuminaryLabs-Publish` repo list with the central ledger.

No checked non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent`, recently added, or otherwise undocumented.

## Current product

`IntoTheMeadow` is a static DSK-composed meadow route with a local WebGL renderer v2, rich render-plan enhancer, texture-driven grass descriptors, objective and interaction descriptors, `GameHost` diagnostics, and a Nexus headless editor bridge.

## Interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost
  -> import external meadow-area-kit
  -> createIntoTheMeadowGame
  -> install local and external DSK descriptors
  -> create arrival meadow render plan
  -> create meadow-webgl-renderer-v2 compatible adapter
  -> create render plan enhancer
  -> expose GameHost
  -> install NexusEditorEnvironment bridge
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan adds grass/wind/postprocess/performance/stats descriptors
  -> renderer.render(enhancedPlan)
  -> renderer snapshot returns aggregate topology/cache/count/fallback facts
  -> debug HUD writes aggregate validation/object/grass/render/editor counts
  -> headless editor commands read runtime, scene, renderer, capture, viewport, and errors
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
render-proof-row-next
grass-proof-row-next
action-result-proof-next
objective-progress-proof-next
headless-editor-proof-row-next
```

## Kits and services

```txt
meadow-area-kit: external arrival meadow render plan
fallback-meadow-area-kit: fallback local render plan
meadow-webgl-renderer-v2: WebGL render consumer, aggregate renderer snapshot
tree-object-dsk: focal tree enhancement
wind-field-dsk: wind state
meadow-performance-dsk: quality, budgets, outline policy
post-process-stack-dsk: postprocess descriptors
grass-density-texture-kit: density texture
grass-clump-archetype-kit: clump card archetypes
grass-static-batch-kit: static batches
grass-patch-placement-kit: patch placements
grass-clump-instancing-render-kit: draw groups
grass-shader-wind-kit: shader wind descriptor
grass-lod-policy-kit: LOD policy
headless-editor-bridge-kit: environment, command, loop, browser smoke reachability
GameHost-diagnostics-kit: state, snapshot, render, enhancer, game reference
```

## Planned proof kits

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
headless-editor-proof-ledger-kit
GameHost-proof-projection-kit
```

## Main finding

Do not start next with visual fidelity, renderer replacement, external CDN migration, shared-kit promotion, new meadow content, grass art tuning, camera/control rewiring, or editor command expansion.

The blocker is GameHost/headless-editor proof-row readback. `advanceGameState()` still only increments `frame` and `lastTick`, while `GameHost` and `NexusEditorEnvironment` expose aggregate snapshots without source-owned rows proving descriptor consumption, grass parity, action results, objective progress, or editor observations.

## Next safe ledge

```txt
IntoTheMeadow GameHost Proof Row Ledger Refresh + Headless Editor Fixture Gate
```

## Validation

Docs-only pass. Runtime source was not changed. No branch or PR was created. Local `npm run check`, browser smoke, editor smoke, and proof fixtures were not run.
