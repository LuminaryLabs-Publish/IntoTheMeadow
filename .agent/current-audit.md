# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Audit timestamp:** `2026-07-10T10-49-23-04-00`

## Summary

`IntoTheMeadow` is a static DSK-composed meadow route with a local WebGL renderer v2, aggregate `GameHost` diagnostics, and a Nexus headless editor bridge.

This pass refreshed repo-local `.agent` docs and central tracking around the next proof cut: additive source-owned rows that connect render descriptors, grass descriptors, objective/action outcomes, `GameHost` projection, and headless editor observations.

Runtime source was not changed.

## Current interaction loop

```txt
index.html
-> boot-game.js
-> startWebHost
-> load external meadow-area-kit
-> createIntoTheMeadowGame
-> install local/external DSK descriptors
-> create cached arrival meadow render plan
-> create local WebGL renderer v2 compatible adapter
-> expose GameHost
-> install editor bridge
-> requestAnimationFrame
-> game.tick({ time, dt })
-> advanceGameState increments frame and writes lastTick only
-> get raw render plan
-> enhance render plan with grass/wind/postprocess/performance/stats
-> renderer.render(enhancedPlan)
-> renderer snapshot reports aggregate topology/cache/count/fallback facts
-> optional debug HUD writes validation/object/grass/render/editor counts
-> editor bridge commands can read runtime, scene, renderer, capture, viewport, and error state
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
```

## Main finding

The route has rich descriptors and aggregate readback, but not consumer proof-row readback.

`advanceGameState()` still only increments `frame` and `lastTick`. `GameHost` and `NexusEditorEnvironment` expose useful aggregate state, render, scene, and editor snapshots, but not source-owned rows that prove descriptor consumption, fallback, action, objective, or editor observation outcomes.

## Current ledge

```txt
IntoTheMeadow GameHost Proof Row Consumer Ledger Refresh + Headless Editor Fixture Gate
```
