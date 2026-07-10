# Project Breakdown: IntoTheMeadow

**Timestamp:** `2026-07-10T04-58-56-04-00`

**Repo:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

## Selection

The current public `LuminaryLabs-Publish` repository list was compared against central ledger state and sampled root `.agent` state.

No checked public non-Cavalry repo was fully new, missing from central tracking, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`IntoTheMeadow` was selected as the oldest eligible documented fallback after `PrehistoricRush` advanced to `2026-07-10T04-50-40-04-00`.

## Public Publish repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        selected / prior central latest 2026-07-10T03-01-42-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T03-49-48-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T03-59-57-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T04-11-36-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T04-22-00-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T04-29-10-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T04-40-52-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T04-50-40-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Current product read

`IntoTheMeadow` is a static DSK-composed meadow route operated through the NexusEngine Headless Editor Runtime.

The repo already has:

```txt
local WebGL renderer v2
render plan enhancer
rich grass descriptor stack
arrival objectives
interaction targets
GameHost diagnostics
headless editor bridge
npm run check with editor smokes
```

The useful next step is proof-row coverage, not a visual rewrite.

## Current interaction loop

```txt
index.html
  -> canvas#scene, HUD, loading panel, and status DOM
  -> src/boot/boot-game.js?v=0.3.0-headless-editor
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports external meadow-area-kit from GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks() validates local and external DSK descriptors
  -> create arrival meadow area render plan
  -> create local WebGL renderer v2 compatible adapter
  -> createRenderPlanEnhancer()
  -> exposeGameHost with state, snapshot, diagnostics, render plan, renderer snapshot, enhancer snapshot, and game reference
  -> installIntoTheMeadowEditorBridge({ gameHost, canvas })
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and writes lastTick only
  -> game.getRenderPlan(time)
  -> planEnhancer.enhance(rawPlan)
  -> createGrassSystem() produces density, batch, patch, draw group, shader wind, LOD, density scale, and debug descriptors
  -> renderer.render(enhancedPlan)
  -> renderer snapshot reports aggregate topology/cache/count/fallback facts
  -> optional debug HUD reports validation, schema, grass, flowers, rocks, vertices, GPU cache, plan cache, and editor protocol state
  -> editor bridge can invoke runtime, scene, renderer, capture, viewport, and error capabilities
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

## Services that kits offer

```txt
external-kit-service: dynamic import and meadow area factory
DSK-install-service: descriptor validation and install snapshot
game-state-service: initial state, frame tick, lastTick, reset
snapshot-service: manifest, state, render plan, diagnostics, validation
render-enhancement-service: filtered objects, outline policy, grass system, wind field, postprocess, performance, stats
grass-system-service: density texture, archetypes, static batches, patches, draw groups, shader wind, LOD, debug, validation
renderer-v2-service: WebGL context, shader program, mesh buffer cache, topology-key rebuild, outline pass, cel-fog pass, aggregate snapshot
content-service: story beats, arrival objectives, interaction targets
GameHost-service: getState, getSnapshot, getDiagnostics, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, game reference
headless-editor-service: runtime status, runtime tick/reset, scene stats, renderer snapshots, canvas capture, viewport/errors, environment smoke, command smoke, loop smoke
planned-proof-service: render rows, grass rows, action rows, objective rows, editor observation rows, additive GameHost proof projection
```

## Implemented kits

```txt
meadow-area-kit                  external-implemented domain kit
fallback-meadow-area-kit         source fallback render-plan kit
meadow-webgl-renderer-v2         source renderer kit
tree-object-dsk                  source object enhancement kit
wind-field-dsk                   source environment kit
meadow-performance-dsk           source performance/policy kit
post-process-stack-dsk           source render descriptor kit
grass-density-texture-kit        source grass kit
grass-clump-archetype-kit        source grass kit
grass-static-batch-kit           source grass kit
grass-patch-placement-kit        source grass kit
grass-clump-instancing-render-kit source grass render descriptor kit
grass-shader-wind-kit            source grass wind kit
grass-lod-policy-kit             source grass policy kit
grass-density-scaling-kit        source grass scaling kit
grass-debug-visualization-kit    source diagnostic kit
headless-editor-bridge-kit       source editor kit
GameHost-diagnostics-kit         source diagnostic kit
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
headless-editor-proof-ledger-kit
GameHost-proof-projection-kit
package-check-proof-gate-kit
central-ledger-sync-kit
```

## Main finding

`IntoTheMeadow` should not start next with visual fidelity, renderer replacement, external CDN migration, shared-kit promotion, new meadow content, grass art tuning, or camera/control rewiring.

The blocker is proof rows across renderer, grass, gameplay, `GameHost`, and headless editor surfaces.

The source already emits rich descriptors and aggregate renderer snapshots. `npm run check` already includes useful headless editor smokes. But the checks still do not prove descriptor consumption, grass parity, action results, objective progress, or editor observation rows.

`advanceGameState()` still only increments `frame` and `lastTick`.

## Next safe ledge

```txt
IntoTheMeadow Proof Row Ledger Refresh + Headless Editor Fixture Gate
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
src/boot/expose-game-host.js
src/game/game-snapshot.js
src/editor/install-editor-bridge.js
package.json
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm test: not run
browser smoke: not run
headless editor smoke: not run in this docs-only pass
DOM-free proof-row fixtures: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: yes
```
