# IntoTheMeadow Project Breakdown

**Timestamp:** `2026-07-10T10-49-23-04-00`

## Selected repo

`LuminaryLabs-Publish/IntoTheMeadow`

## Selection reason

The public `LuminaryLabs-Publish` repo list was checked and compared with central ledger state. No checked non-Cavalry repo was new, missing from the central ledger, missing sampled root `.agent` state, recently added, or otherwise undocumented.

`TheCavalryOfRome` stayed excluded by rule. `IntoTheMeadow` was the oldest eligible documented fallback after `PrehistoricRush` advanced to `2026-07-10T10-38-55-04-00`.

## Current interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost
  -> import external meadow-area-kit
  -> createIntoTheMeadowGame
  -> install local and external DSK descriptors
  -> create cached arrival meadow render plan
  -> create meadow-webgl-renderer-v2 compatible adapter
  -> create render plan enhancer
  -> expose GameHost
  -> install NexusEditorEnvironment bridge
  -> requestAnimationFrame
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan adds grass, wind, postprocess, performance, and stats descriptors
  -> renderer.render(enhancedPlan)
  -> renderer snapshot reports aggregate topology/cache/count/fallback facts
  -> debug HUD writes aggregate validation/object/grass/render/editor counts
  -> headless editor bridge exposes runtime, scene, renderer, capture, viewport, and error commands
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
central-ledger-sync
```

## Services kits offer

```txt
external meadow-area-kit: arrival meadow render plan source
fallback meadow-area-kit: local fallback render plan
DSK install service: local/external descriptor validation and install snapshot
game-state service: initial state, frame tick, lastTick, reset
render enhancement service: object filtering, outline policy, grass, wind, postprocess, performance, stats
renderer v2 service: WebGL context, shader program, mesh buffer cache, topology-key rebuild, outline pass, cel-fog pass, aggregate renderer snapshot
GameHost service: getState, getSnapshot, getDiagnostics, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, game reference
headless editor service: runtime status/tick/reset, scene stats, renderer snapshots, canvas capture, viewport/errors, command/loop smoke reachability
planned proof service: render rows, grass rows, action rows, objective rows, editor observation rows, additive GameHost proof projection
```

## Kits

Current kits:

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
headless-editor-bridge-kit
GameHost-diagnostics-kit
```

Next-cut kits:

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
gameplay-fixture-row-kit
headless-editor-proof-ledger-kit
GameHost-proof-projection-kit
```

## Main finding

`IntoTheMeadow` should not start next with visual fidelity, renderer replacement, external CDN migration, shared-kit promotion, new meadow content, grass art tuning, camera/control rewiring, or editor command expansion.

The blocker is still proof-row consumer readback. `renderer.render(enhancedPlan)` and the headless editor bridge expose useful aggregate snapshots, but there are no source-owned rows that prove which render descriptors, grass descriptors, action targets, objectives, or editor observations were consumed, ignored, unsupported, fallback-rendered, accepted, rejected, or skipped.

`advanceGameState()` remains a thin frame/lastTick updater, so gameplay and objective proof are still not first-class.

## Next safe ledge

```txt
IntoTheMeadow GameHost Proof Row Consumer Ledger Refresh + Headless Editor Fixture Gate
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
DOM-free proof-row fixtures: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: pending in this pass
```
