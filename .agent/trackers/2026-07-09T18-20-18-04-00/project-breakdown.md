# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Run timestamp:** `2026-07-09T18-20-18-04-00`

## Selection result

The current public `LuminaryLabs-Publish` repository list was compared against `LuminaryLabs-Dev/LuminaryLabs` central ledger state and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry repo was new, missing from the central ledger, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest eligible documented fallback among checked public non-Cavalry repos. Its central ledger was at `2026-07-09T15-39-08-04-00`, older than the other checked eligible central entries.

## Public Publish repos observed

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T17-48-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T16-58-52-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T16-38-14-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T16-29-23-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T18-11-58-04-00
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible documented fallback / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T17-58-53-04-00
```

## Current interaction loop

```txt
index.html
  -> canvas#scene, HUD, loading panel, and status DOM
  -> src/boot/boot-game.js captures DOM nodes and debug query flag
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports meadow-area-kit and meadow-webgl-render-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks() validates local and external DSK descriptors
  -> create arrival meadow area kit from ARRIVAL_MEADOW_CONFIG
  -> create external meadow WebGL renderer
  -> exposeGameHost({ game, renderer, getRenderPlan, getSnapshot })
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and records lastTick only
  -> meadow.getRenderPlan({ time }) emits the raw arrival meadow plan
  -> enhanceRenderPlan(rawPlan) filters clutter and adds grass, wind, postprocess, performance, and stats
  -> renderer.render(enhancedPlan)
  -> optional debug HUD reports validation/object/patch/vertex counts
  -> GameHost exposes state, snapshot, diagnostics, enhanced render plan, and optional renderer snapshot
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
render-plan-enhancement
object-outline-policy
tiny-clutter-reduction
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
state-snapshot-diagnostics
objective-descriptor-domain
interaction-target-domain
frame-tick-domain
GameHost-debug-surface
render-consumption-ledger-next
grass-consumption-row-next
action-frame-next
target-action-preflight-next
action-result-next
objective-progress-next
DOM-free-fixture-next
central-ledger-sync
```

## Kit services

```txt
external meadow area service: dynamic import, render plan factory, fallback meadow area kit, area validation, area snapshot
external meadow renderer service: dynamic import, WebGL renderer creation, render(plan), optional getSnapshot readback
DSK install service: local descriptor validation, external descriptor validation, install snapshot
state service: initial game state, frame increment, lastTick record, reset
snapshot service: manifest/state/renderPlan/diagnostics snapshot and validation
render enhancement service: object filtering, outline policy, grass system, wind field, postprocess stack, performance profile, stats
active grass service: density texture, archetypes, static batches, patch placements, draw groups, shader wind, LOD, density scaling, debug summary, validation
content service: story beats, arrival objectives, and interaction targets
GameHost service: getState, getSnapshot, getDiagnostics, game reference, renderer and enhanced plan through web-host wrapper
planned render proof service: render expectation rows, renderer snapshot normalization, render consumption ledger, GameHost projection
planned gameplay proof service: ActionFrame, target/action preflight, ActionResult, objective progress rows, DOM-free fixture replay
central ledger service: repo-local .agent pointers, central repo ledger, internal change log
```

## Kits identified

### Implemented / active kits

```txt
meadow-area-kit
meadow-webgl-render-kit
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
fallback-meadow-area-kit
GameHost-diagnostics-kit
static-smoke-kit
dsk-registry-smoke-kit
render-plan-smoke-kit
deterministic-scene-smoke-kit
```

### Next-cut kits

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
DOM-free-action-fixture-kit
central-ledger-readback-kit
```

## Main finding

`IntoTheMeadow` should not start next with visual fidelity, renderer replacement, external CDN changes, shared-kit promotion, new meadow content, or camera/control work.

The durable blocker is proof readback. The route emits rich enhanced render descriptors and already has objective/target descriptors, but it does not prove which descriptors the renderer consumed, does not normalize optional renderer snapshots, and does not have ActionResult rows for path-progress or inspect objective progression.

## Next safe ledge

```txt
IntoTheMeadow Render Action Readback + DOM-Free Fixture Gate
```

## Validation

This was a documentation-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
browser smoke: not run
render/action fixture: not run because fixture files do not exist yet
pushed to main: yes, docs only
```
