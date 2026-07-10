# IntoTheMeadow Project Breakdown

**Timestamp:** `2026-07-10T07-59-27-04-00`

## Selection

`LuminaryLabs-Publish/IntoTheMeadow` was selected after comparing the current public `LuminaryLabs-Publish` list against central ledger state. No checked non-Cavalry repo was new, missing from the central ledger, missing sampled root `.agent`, recently added, or undocumented. `TheCavalryOfRome` stayed excluded. After `PrehistoricRush` advanced, `IntoTheMeadow` was the oldest eligible documented fallback.

## Current route

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost
  -> import external meadow-area-kit
  -> createIntoTheMeadowGame
  -> install local and external DSK descriptors
  -> create meadow render plan
  -> create render plan enhancer
  -> create meadow-webgl-renderer-v2 adapter
  -> expose GameHost
  -> install NexusEditorEnvironment bridge
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> enhanceRenderPlan emits grass/wind/postprocess/performance/stats descriptors
  -> renderer.render(enhancedPlan)
  -> renderer/editor/GameHost expose aggregate snapshots
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
source-topology-cache
object-outline-policy
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
renderer-topology-cache
state-snapshot-diagnostics
objective-descriptor-domain
interaction-target-domain
frame-tick-domain
GameHost-debug-surface
headless-editor-runtime
editor-bridge
render-proof-row-next
grass-proof-row-next
action-result-proof-next
objective-progress-proof-next
headless-editor-proof-row-next
central-ledger-sync
```

## Kit services

Implemented kits provide external meadow source import, local fallback meadow source, DSK validation, render-plan enhancement, texture-driven grass descriptors, wind/postprocess/performance descriptors, WebGL renderer v2 rendering, aggregate renderer snapshots, GameHost diagnostics, and Nexus headless editor command access.

The planned proof kits should provide source expectation rows, renderer snapshot normalization, render consumption rows, grass parity rows, target/action preflight rows, ActionResult rows, objective progress rows, GameHost proof projection rows, and headless editor proof observations.

## Kits identified

```txt
meadow-area-kit
fallback-meadow-area-kit
meadow-webgl-renderer-v2
renderer-precision-compat-kit
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
headless-editor-bridge-kit
GameHost-diagnostics-kit
render-expectation-row-kit-next
renderer-snapshot-normalizer-kit-next
render-consumption-ledger-kit-next
grass-consumption-row-kit-next
action-frame-kit-next
target-action-preflight-kit-next
action-result-kit-next
objective-progress-kit-next
headless-editor-proof-ledger-kit-next
GameHost-proof-projection-kit-next
```

## Main finding

Do not start next with visual fidelity, renderer replacement, external CDN migration, shared-kit promotion, new meadow content, grass art tuning, camera/control rewiring, or editor command expansion.

The blocker is proof-row readback through GameHost and the headless editor. The current route has rich descriptors and useful aggregate renderer/editor snapshots, but no source-owned ledger proving which render, grass, action, objective, and editor rows were consumed, ignored, unsupported, fallback-rendered, or completed.

## Next safe ledge

```txt
IntoTheMeadow GameHost Proof Row Readback Refresh + Headless Fixture Gate
```

## Validation

Docs-only pass. Runtime source was not changed. No branch or PR was created. Local/browser validation was not run because proof fixture files do not exist yet.
