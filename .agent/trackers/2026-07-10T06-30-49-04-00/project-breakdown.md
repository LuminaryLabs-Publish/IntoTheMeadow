# Project Breakdown: IntoTheMeadow

**Run:** `2026-07-10T06-30-49-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

## Selection

The current public `LuminaryLabs-Publish` repository list was compared against central `LuminaryLabs-Dev/LuminaryLabs` tracking and sampled root `.agent` state.

No checked non-Cavalry repository was new, ledger-missing, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`TheCavalryOfRome` remained excluded.

`IntoTheMeadow` was selected as the oldest eligible documented fallback.

## Product read

`IntoTheMeadow` is a static DSK-composed meadow exploration route with:

```txt
local WebGL renderer v2
rich render-plan enhancer
texture-driven grass descriptors
objective and interaction descriptors
GameHost diagnostics
Nexus headless editor bridge
npm run check smoke stack
```

The route is not blocked by missing visuals. It is blocked by proof rows that connect source descriptors to renderer, grass, gameplay action, objective, GameHost, and headless editor readback.

## Current interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> startWebHost
  -> import meadow-area-kit from CDN
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
renderer-precision-compatibility
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

## Implemented kits and services

```txt
meadow-area-kit
  status: external implemented
  services: arrival meadow render plan from CDN

fallback-meadow-area-kit
  status: source fallback
  services: local source plan, snapshot, validation

DSK install kit
  status: source implemented
  services: local descriptor validation, external descriptor load state, snapshot

render-plan-enhancer-kit
  status: source implemented
  services: object tuning, outline policy, tree enhancement, grass system, wind, postprocess, performance, stats

meadow-webgl-renderer-v2-kit
  status: source implemented
  services: WebGL/WebGL2 context, mesh buffer cache, topology-key rebuild, outline pass, cel-fog pass, aggregate snapshot

renderer-precision-compat-kit
  status: source implemented
  services: shader precision normalization wrapper

grass-density-texture-kit
  status: source implemented
  services: density texture descriptor, world bounds, channel contract

grass-clump-archetype-kit
  status: source implemented
  services: reusable clump card archetypes

grass-static-batch-kit
  status: source implemented
  services: reusable static batches

grass-patch-placement-kit
  status: source implemented
  services: density-driven patch placements

grass-clump-instancing-render-kit
  status: source implemented
  services: draw group descriptors

grass-shader-wind-kit
  status: source implemented
  services: shader wind descriptor and validation

grass-lod-policy-kit
  status: source implemented
  services: LOD policy descriptor and validation

grass-density-scaling-kit
  status: source implemented
  services: quality-based density scaling

grass-debug-visualization-kit
  status: source implemented
  services: grass debug summary

objective-descriptor-kit
  status: source implemented
  services: walk-the-path and inspect-tree objective descriptors

interaction-target-kit
  status: source implemented
  services: focal-tree and arrival-path target descriptors

GameHost-diagnostics-kit
  status: source implemented
  services: getState, getSnapshot, getDiagnostics, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, game reference

headless-editor-bridge-kit
  status: source implemented
  services: runtime status/state/snapshot/tick/reset, scene statistics, renderer snapshot/capture, viewport, error list
```

## Planned next kits

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
headless-editor-proof-ledger-kit
GameHost-proof-projection-kit
central-ledger-sync-kit
```

## Main finding

`IntoTheMeadow` should not start next with visual fidelity, renderer replacement, external CDN migration, shared-kit promotion, new meadow content, grass art tuning, or camera/control rewiring.

The blocker is row-level proof.

The renderer returns useful aggregate readback, the grass source descriptors are rich, and the headless editor bridge is present. But the route still lacks source-owned rows proving which descriptors were consumed, ignored, unsupported, or rendered as fallback.

The gameplay side also has objective and interaction descriptors, but `advanceGameState()` only increments `frame` and `lastTick`. There is no action frame, target preflight, action result, or objective progress ledger.

## Next safe ledge

```txt
IntoTheMeadow Proof Row Ledger Catch-up + Headless Editor Observation Gate
```

## Next implementation files

```txt
src/render-proof/render-expectations.js
src/render-proof/renderer-snapshot-normalizer.js
src/render-proof/render-consumption-ledger.js
src/render-proof/grass-consumption-ledger.js
src/render-proof/gamehost-render-proof.js
src/gameplay/action-frame.js
src/gameplay/target-action-preflight.js
src/gameplay/action-result.js
src/gameplay/objective-progress.js
src/gameplay/gameplay-fixture-rows.js
src/editor-proof/headless-editor-proof-ledger.js
tests/render-consumption-ledger-smoke.mjs
tests/grass-consumption-ledger-smoke.mjs
tests/action-result-fixture-smoke.mjs
tests/headless-editor-proof-ledger-smoke.mjs
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
```
