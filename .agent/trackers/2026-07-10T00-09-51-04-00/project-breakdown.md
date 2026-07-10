# IntoTheMeadow Project Breakdown

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T00-09-51-04-00`

**Mode:** documentation-only repo breakdown

## Selection result

`IntoTheMeadow` was selected after comparing the current public `LuminaryLabs-Publish` repo list with central ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry repo was new, missing from the ledger, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`TheCavalryOfRome` remained excluded by rule.

`IntoTheMeadow` was the oldest eligible central-ledger fallback at `2026-07-09T22-40-25-04-00`.

## Public Publish repos checked

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T23-41-15-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T23-28-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T23-20-43-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T23-02-05-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T22-50-53-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T23-58-41-04-00
LuminaryLabs-Publish/IntoTheMeadow        selected / oldest eligible central-ledger fallback / central latest 2026-07-09T22-40-25-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T23-51-04-04-00
```

## Evidence checked

```txt
public LuminaryLabs-Publish GitHub repository page
LuminaryLabs-Dev/LuminaryLabs repo-ledger entries for checked non-Cavalry repos
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
package.json
src/hosts/web-host.js
src/game/enhance-render-plan.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/boot/expose-game-host.js
src/renderers/meadow-webgl-renderer-v2.js
src/content/objectives/arrival-objectives.js
src/content/interaction-targets/arrival-targets.js
```

## Current interaction loop

```txt
index.html
  -> src/boot/boot-game.js captures canvas, HUD, status, loading, and debug flag
  -> startWebHost({ canvas, hud, statusEl, loadingEl, debug })
  -> loadExternalKits() imports GAME_MANIFEST meadow-area-kit
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks() validates local and external DSK descriptors
  -> create arrival meadow area render plan from ARRIVAL_MEADOW_CONFIG
  -> createMeadowWebglRendererV2({ canvas })
  -> createRenderPlanEnhancer()
  -> exposeGameHost with state, snapshot, diagnostics, render plan, renderer snapshot, and enhancer snapshot
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState() increments frame and writes lastTick only
  -> game.getRenderPlan(time)
  -> planEnhancer.enhance(rawPlan)
  -> createGrassSystem() emits density, archetype, batch, patch, draw group, shader wind, LOD, density scale, and debug descriptors
  -> renderer.render(enhancedPlan)
  -> renderer snapshot returns aggregate topology/cache/count/fallback/readback facts
  -> optional debug HUD reports validation, schema, grass, flowers, rocks, vertices, GPU cache, and plan cache state
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
render-proof-next
grass-proof-next
action-fixture-next
objective-progress-next
central-ledger-sync
```

## Services the kits offer

```txt
external-kit-service: dynamic import and meadow area render-plan factory
DSK-install-service: local/external descriptor validation and install snapshot
state-service: initial state, frame increment, lastTick, reset
snapshot-service: manifest, state, render plan, diagnostics, validation
render-enhancement-service: object filtering, outline policy, grass system, wind field, postprocess, performance, stats
grass-system-service: density texture, archetypes, static batches, patches, draw groups, shader wind, LOD, density scaling, debug summary, validation
renderer-v2-service: WebGL context, shader program, mesh buffer cache, topology-key rebuild, outline pass, main cel-fog pass, aggregate renderer snapshot
content-service: story beats, arrival objectives, arrival interaction targets
GameHost-service: getState, getSnapshot, getDiagnostics, getRenderPlan, getRenderSnapshot, getRenderEnhancerSnapshot, game reference
planned-render-proof-service: expectation rows, renderer snapshot normalization, consumption ledger, GameHost proof projection
planned-action-fixture-service: ActionFrame, target/action preflight, ActionResult, objective progress, fixture rows
central-ledger-service: repo-local pointers, central repo ledger, internal change log
```

## Kits identified

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
central-ledger-sync-kit
```

## Main finding

`IntoTheMeadow` should not get a visual rewrite next.

The renderer already returns useful aggregate readback: topology key, descriptor counts, primitive fallback count, vertex and triangle counts, cache state, post-process mode, and validation.

The missing boundary is row-level proof: renderer snapshot normalization, descriptor consumption rows, grass source/render parity rows, and DOM-free objective/action rows.

`ARRIVAL_OBJECTIVES` declares `walk-the-path` and `inspect-tree`, and `ARRIVAL_INTERACTION_TARGETS` declares `arrival-path` and `focal-tree`, but `advanceGameState()` still only increments `frame` and writes `lastTick`.

## Next safe ledge

```txt
IntoTheMeadow Renderer Snapshot Action Fixture Catch-up + DOM-Free Proof Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm test: not run
browser smoke: not run
DOM-free fixture: not run because the proof files do not exist yet
pushed to main: yes, documentation only
central ledger updated: yes
```
