# IntoTheMeadow Project Breakdown

**Timestamp:** `2026-07-09T22-40-25-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Mode:** docs-only `.agent` breakdown refresh

## Selection result

The current public `LuminaryLabs-Publish` organization page lists 9 repositories.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

No checked public non-Cavalry repository was new, absent from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`IntoTheMeadow` was selected as the oldest eligible documented fallback because its central ledger still pointed at `2026-07-09T18-20-18-04-00`.

## Public repo comparison

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T19-09-44-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T19-00-15-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T18-49-13-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T18-41-55-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T18-30-30-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T19-29-23-04-00
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible documented fallback / central latest 2026-07-09T18-20-18-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T19-21-19-04-00
```

## Source files inspected

```txt
package.json
index.html
src/boot/boot-game.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/enhance-render-plan.js
src/game/game-snapshot.js
src/boot/expose-game-host.js
src/content/game-manifest.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
src/renderers/meadow-webgl-renderer-v2.js
.agent/START_HERE.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/*.md sampled for current selection state
```

## Current interaction loop

```txt
index.html
  -> canvas#scene, #hud, #status, and #loading mount
  -> src/boot/boot-game.js captures DOM nodes and ?debug flag
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports meadow-area-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks() validates local and external DSK descriptors
  -> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG)
  -> baseRenderPlan is cached from meadow.getRenderPlan({ time: 0 })
  -> createMeadowWebglRendererV2({ canvas })
  -> createRenderPlanEnhancer()
  -> exposeGameHost({ game, renderer, planEnhancer, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, getSnapshot })
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and records lastTick only
  -> raw render plan is read from game.getRenderPlan(time)
  -> planEnhancer.enhance(rawPlan) adds grass, wind, postprocess, performance, and stats descriptors
  -> renderer.render(plan) builds or reuses mesh data by topology key
  -> renderer snapshot records vertex count, primitive fallback count, descriptor counts, cache state, postProcessMode, and validation
  -> optional debug HUD writes validation, schema, grass, flowers, rocks, vertices, GPU cache, and enhancer cache state
  -> GameHost exposes state, snapshot, diagnostics, render plan, renderer snapshot, enhancer snapshot, and game reference
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
webgl-renderer-v2
mesh-builder-v2
renderer-topology-cache
shader-wind-vertex-offset
inline-cel-fog-render-pass
state-snapshot-diagnostics
objective-descriptor-domain
interaction-target-domain
frame-tick-domain
GameHost-debug-surface
render-proof-next
grass-proof-next
action-fixture-next
objective-progress-next
central-ledger-sync
```

## Kit services in use

```txt
meadow-area service:
  external import, area render plan factory, fallback kit, validation, snapshot

DSK install service:
  local descriptor validation, external descriptor validation, install snapshot

game state service:
  initial state, frame tick, lastTick record, reset

snapshot service:
  manifest, build, state, raw render plan, diagnostics

render enhancer service:
  source topology key, object filtering, outline policy, focal tree enhancement, grass system creation, wind state, postprocess stack, performance policy, stats

grass system service:
  density texture, clump archetypes, static batches, patches, draw groups, shader wind, LOD policy, density scaling, debug summary, validation groups

renderer service:
  WebGL context, shader program, mesh buffer cache, viewport resize, topology-key mesh rebuild, render pass, renderer snapshot, dispose

content service:
  story beats, arrival objectives, arrival interaction targets

GameHost service:
  getState, getSnapshot, getDiagnostics, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, game reference

planned render proof service:
  render expectation rows, renderer snapshot normalization, render consumption ledger, GameHost render proof projection

planned action fixture service:
  ActionFrame, target/action preflight, ActionResult, objective progress rows, DOM-free replay rows
```

## Kit inventory

### Implemented and source-backed

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
GameHost-debug-surface-kit
static-smoke-kit
dsk-registry-smoke-kit
render-plan-smoke-kit
renderer-v2-smoke-kit
deterministic-scene-smoke-kit
```

### Next-cut proof kits

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
central-ledger-sync-kit
```

## Main finding

`IntoTheMeadow` now has a stronger local v2 renderer than earlier ledgers implied. The blocker is no longer simply renderer readback existing. The blocker is that readback is not normalized into proof rows and gameplay intent is still inert.

The renderer returns useful snapshot facts such as descriptor counts, topology key, primitive fallback count, cache state, and validation. The route still has no source-owned render consumption ledger to classify each descriptor as consumed, ignored, unsupported, or fallback.

The gameplay descriptors are also present but unused by state mutation. `ARRIVAL_OBJECTIVES` declares `walk-the-path` and `inspect-tree`, and `ARRIVAL_INTERACTION_TARGETS` declares `arrival-path` and `focal-tree`. `advanceGameState()` still only increments frame and writes `lastTick`.

## Do not start with

```txt
visual rewrite
renderer replacement
external CDN migration
new meadow content
grass art tuning
camera/control wiring
shared-kit promotion
browser-only action wiring
```

## Next safe ledge

```txt
IntoTheMeadow Render Proof + Action Fixture Refresh
```

First source cut should convert existing renderer snapshot and gameplay descriptors into DOM-free proof rows, then wire those rows into `npm run check`.

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free render/action fixture: not run because fixture files do not exist yet
pushed to main: documentation only
central ledger sync required: yes
```
