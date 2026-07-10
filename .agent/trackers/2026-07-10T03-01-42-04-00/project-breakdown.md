# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T03-01-42-04-00`

**Selection:** oldest eligible documented fallback after comparing the current public Publish repo list against central tracking.

## Plan ledger

```txt
[x] Checked current public LuminaryLabs-Publish repository list.
[x] Excluded LuminaryLabs-Publish/TheCavalryOfRome.
[x] Compared central ledger state for public non-Cavalry repos.
[x] Selected one repo only: LuminaryLabs-Publish/IntoTheMeadow.
[x] Read current repo-local .agent state.
[x] Read central repo ledger state.
[x] Read package.json, index.html, boot-game, web host, game state, render enhancer, GameHost, renderer v2, objectives, interaction targets, and editor bridge paths.
[x] Identified the interaction loop.
[x] Identified domains in use.
[x] Identified kit services.
[x] Identified implemented, runtime, and next-cut proof kits.
[x] Added timestamped tracker and turn-ledger entries.
[x] Added architecture, render, grass, gameplay, interaction, and deploy audits.
[x] Refreshed root .agent docs and kit registry.
[x] Prepared central ledger and internal change-log sync.
[ ] Runtime source changed.
[ ] Local npm validation run.
[ ] Browser/editor validation run.
```

## Current Publish repo comparison

```txt
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present
LuminaryLabs-Publish/IntoTheMeadow        selected fallback
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

No checked public non-Cavalry repo was new, absent from central tracking, missing root `.agent` state, recently added but undocumented, or otherwise undocumented. `IntoTheMeadow` was selected as the oldest eligible documented fallback after recent central-ledger advancement by other repos.

## Product read

`IntoTheMeadow` is a static DSK-composed meadow route running through a browser host, local render-plan enhancement DSKs, a WebGL renderer v2 adapter, `GameHost` diagnostics, and a Nexus headless editor bridge.

The repo now has useful smokes for static structure, DSK registry, render plan, renderer v2, deterministic scene, and headless editor environment/command/loop reachability. The missing layer is row-level source-to-consumer proof.

## Current interaction loop

```txt
index.html
  -> canvas#scene, HUD, status, and loading DOM
  -> src/boot/boot-game.js?v=0.3.0-headless-editor
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports meadow-area-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks() validates local and external DSK descriptors
  -> create arrival meadow render plan
  -> create local meadow WebGL renderer v2 compatible adapter
  -> create render plan enhancer
  -> exposeGameHost publishes state, snapshot, diagnostics, render plan, renderer snapshot, enhancer snapshot, and game reference
  -> installIntoTheMeadowEditorBridge publishes runtime/scene/renderer/browser capabilities
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and records lastTick only
  -> game.getRenderPlan(time)
  -> planEnhancer.enhance(rawPlan)
  -> enhanceRenderPlan emits tuned objects, grass system, wind field, postprocess, performance, stats, and contract data
  -> renderer.render(enhancedPlan)
  -> meadow-webgl-renderer-v2 builds/caches mesh, draws outline/main passes, and stores aggregate snapshot
  -> optional debug HUD reports validation, schema, grass, flower, rock, vertex, GPU cache, plan cache, and editor protocol state
```

## Headless/editor loop

```txt
NexusEditorEnvironment.invoke(action, args)
  -> runtime.status / runtime.getState / runtime.getSnapshot / runtime.tick / runtime.reset
  -> scene.getRenderPlan / scene.getStatistics
  -> renderer.getSnapshot / renderer.getEnhancerSnapshot / renderer.capture
  -> browser.getViewport / browser.getErrors
  -> returns completed / unavailable / failed bridge result
  -> bridge snapshot exposes runtime, renderer, capabilities, and errors
```

The bridge proves reachability and command shape, but not source-backed render, grass, action, objective, or observation rows.

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
GameHost-debug-surface
headless-editor-runtime
editor-bridge
render-consumption-proof-next
grass-consumption-proof-next
action-result-proof-next
objective-progress-proof-next
headless-editor-observation-proof-next
central-ledger-sync
```

## Services that kits offer

```txt
external-kit-service: dynamic import, meadow area factory, fallback area factory
DSK-install-service: local descriptor validation, external descriptor validation, install snapshot
game-state-service: initial state, frame tick, lastTick write, reset
snapshot-service: manifest/state/renderPlan/diagnostics snapshot and validation
render-enhancement-service: object filtering, outline policy, grass system, wind field, postprocess, performance, stats
grass-system-service: density texture, archetypes, static batches, patches, draw groups, shader wind, LOD, density scaling, debug, validation
renderer-v2-service: WebGL context, shader program, mesh buffer cache, topology-key rebuild, outline pass, main cel-fog pass, aggregate renderer snapshot
content-service: story beats, arrival objectives, arrival interaction targets
GameHost-service: getState, getSnapshot, getDiagnostics, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, game reference
headless-editor-service: runtime status, runtime tick/reset, scene statistics, renderer snapshot, canvas capture, browser viewport/errors, command/loop smoke reachability
planned-render-proof-service: expectation rows, renderer snapshot normalization, render consumption ledger, GameHost projection
planned-grass-proof-service: density/static/patch/draw-group/wind/LOD parity rows
planned-action-proof-service: ActionFrame, target/action preflight, ActionResult, objective progress, DOM-free rows
planned-headless-proof-service: editor command proof rows, editor loop observation rows, GameHost headless proof projection
central-ledger-service: repo-local tracker, root docs, central repo ledger, internal change log
```

## Kits identified

### Implemented kits

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
DSK-install-registry-kit
static-smoke-kit
dsk-registry-smoke-kit
render-plan-smoke-kit
renderer-v2-smoke-kit
deterministic-scene-smoke-kit
headless-editor-environment-smoke-kit
headless-editor-command-smoke-kit
headless-editor-loop-smoke-kit
```

### Planned next proof kits

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

Do not start next with visual fidelity, renderer replacement, external CDN migration, shared-kit promotion, new meadow content, grass art tuning, or camera/control rewiring.

The route already has a coherent descriptor pipeline and useful headless editor reachability. The blocker is proof ledger authority: renderer v2 snapshots are aggregate facts, grass descriptors are not normalized into parity rows, objectives and interaction targets exist without an action/result reducer, and editor commands are not tied to source-backed observation rows.

`advanceGameState()` still increments `frame` and writes `lastTick` only. `GameHost` exposes snapshots and render readback, but not additive proof projections that explain which descriptors, targets, actions, and editor observations were consumed.

## Next safe ledge

```txt
IntoTheMeadow Headless Editor Render Action Ledger Refresh + GameHost Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
npm test: not run
browser smoke: not run
headless editor smoke: not run in this docs-only pass
DOM-free render/action fixture: not run because proof files do not exist yet
pushed to main: yes, documentation only
central ledger sync: pending at repo-local write time
```
