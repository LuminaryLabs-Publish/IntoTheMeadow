# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-08T12-21-20-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Mode:** documentation-only breakdown pass

## Plan ledger

**Goal:** Refresh the repo-local `.agent` operating docs for `IntoTheMeadow` after comparing the accessible `LuminaryLabs-Publish` repo list against central ledger state, then log the result centrally.

**Checklist**

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared checked Publish repos against central `LuminaryLabs-Dev/LuminaryLabs` ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Read repo-local `.agent/START_HERE.md`.
- [x] Read central `repo-ledger/LuminaryLabs-Publish/IntoTheMeadow.md`.
- [x] Read `package.json`.
- [x] Read `src/hosts/web-host.js`.
- [x] Read `src/game/create-into-the-meadow-game.js`.
- [x] Read `src/game/enhance-render-plan.js`.
- [x] Read `src/game/game-state.js`.
- [x] Read `src/game/game-snapshot.js`.
- [x] Read arrival objective and interaction target descriptors.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services the kits offer.
- [x] Identified current and next-cut kits.
- [x] Added architecture audit.
- [x] Added render audit.
- [x] Added grass system audit.
- [x] Added gameplay authority audit.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Updated root `.agent` docs.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Did not run local npm/browser validation.
- [ ] Did not edit runtime/source implementation files.

## Selection result

```txt
selected: LuminaryLabs-Publish/IntoTheMeadow
excluded: LuminaryLabs-Publish/TheCavalryOfRome
reason: no checked non-Cavalry Publish repo was fully new, absent from central tracking, undocumented, or missing sampled root .agent/START_HERE.md state. IntoTheMeadow was selected as the oldest eligible fallback because the renderer parity plus gameplay action-result seam remains unresolved.
```

## Publish repositories observed

```txt
HorrorCorridor
AetherVale
TheOpenAbove
TheCavalryOfRome
PhantomCommand
PrehistoricRush
ZombieOrchard
IntoTheMeadow
MyCozyIsland
TheUnmappedHouse
```

## Current read

`IntoTheMeadow` is a static browser DSK-composed meadow exploration game. It owns the publish route, web host, game factory, local DSK descriptor registry, arrival meadow content, story/objective/interaction descriptors, enhanced render-plan layer, GameHost projection, static smoke scripts, and Pages surface.

The repo consumes external meadow infrastructure from `NexusRealtime-ProtoKits`:

```txt
meadow-area-kit
meadow-webgl-render-kit
```

## Current interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> load external meadow-area-kit and meadow-webgl-render-kit
  -> createIntoTheMeadowGame()
  -> install local DSK descriptors
  -> create ARRIVAL_MEADOW_CONFIG area kit
  -> requestAnimationFrame frame loop
  -> game.tick({ time, dt: 1 / 60 })
  -> advanceGameState increments frame and lastTick only
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> expose GameHost state/snapshot/diagnostics/render snapshot
```

## Domains identified

```txt
static-browser-shell
github-pages-deployment
browser-boot-runtime
web-host-runtime
external-kit-loading
cdn-kit-import-manifest
animation-frame-loop
debug-hud-runtime
canvas-surface
GameHost-state-contract
GameHost-snapshot-contract
GameHost-diagnostics-contract
GameHost-render-snapshot-contract
runtime-compatibility-contract
static-smoke-validation
manifest-authority
game-factory
content-pack-authority
local-dsk-registry
local-dsk-descriptor-installer
local-dsk-validation
external-meadow-area-bridge
external-webgl-render-bridge
fallback-meadow-area-kit
scene-identity
session-identity
deterministic-state-root
tick-clock
last-tick-diagnostics
player-state
path-progress-state
progression-ledger
snapshot-root
arrival-meadow-area
arrival-path-content
focal-tree-content
terrain-material-palette
golden-hour-style
grass-content
flower-content
rock-content
mushroom-content
tree-line-content
wind-state
story-beat-ledger
objective-ledger
interaction-target-registry
render-plan-generation
render-plan-enhancement
outline-policy
small-object-clutter-reduction
focal-tree-enhancement
grass-density-texture
grass-clump-archetype
grass-static-batch
grass-patch-placement
grass-clump-instancing-render
grass-shader-wind
grass-lod-policy
grass-density-scaling
grass-debug-visualization
wind-field-render-metadata
post-process-stack-metadata
render-stats-diagnostics
webgl-renderer-snapshot
renderer-descriptor-consumption-parity-needed
ActionFrame-contract-needed
ActionResult-contract-needed
objective-reducer-needed
gameplay-snapshot-needed
```

## Services identified

```txt
createMeadowAreaKit
meadow.getRenderPlan
meadow.getSnapshot
meadow.validate
createMeadowWebglRenderKit
renderer.render
renderer.getSnapshot
installDsks
createIntoTheMeadowGame
createInitialGameState
advanceGameState
createGameSnapshot
validateGameSnapshot
enhanceRenderPlan
createFallbackMeadowAreaKit
exposeGameHost
createGrassDensityTextureKit
createGrassClumpArchetypeKit
createGrassStaticBatchKit
createGrassPatchPlacementKit
createGrassClumpInstancingRenderKit
createGrassShaderWindKit
createGrassLodPolicyKit
createGrassDensityScalingKit
createGrassDebugVisualizationKit
createWindFieldDsk
createTreeObjectDsk
createMeadowPerformancePolicy
createPostProcessStack
```

Needed services:

```txt
collectExpectedRenderDescriptors
normalizeRendererSnapshotConsumption
compareRenderDescriptorParity
createRenderParityReport
projectRenderParityDiagnostics
createActionFrame
normalizeActionFrame
createActionResult
reducePathProgressAction
reduceInspectTargetAction
resolveObjectiveCompletion
createGameplaySnapshot
runRendererGameplayFixture
```

## Kits identified

Existing kits:

```txt
meadow-area-kit
meadow-webgl-render-kit
game-manifest descriptor
local-dsk-registry
arrival-meadow content descriptor
story-beats descriptor
arrival-objectives descriptor
arrival-interaction-targets descriptor
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
```

Next-cut kits:

```txt
render-parity-reason-kit
expected-render-descriptor-kit
renderer-snapshot-consumption-kit
render-descriptor-parity-kit
render-parity-diagnostics-projection-kit
action-frame-kit
action-result-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-resolver-kit
gameplay-snapshot-kit
renderer-gameplay-fixture-smoke-kit
```

## Main finding

The renderer and gameplay descriptor seams are ready for a fixture gate, not more visual content.

`enhanceRenderPlan()` emits a high-value grass/render system, but `web-host.js` does not yet classify which enhanced descriptors the external renderer consumed.

`createInitialGameState()` already includes player, progression, world, and DSK state, and the content descriptors define `walk-the-path` plus `inspect-tree`, but `advanceGameState()` only increments frame/lastTick and `createGameSnapshot()` has no `snapshot.gameplay` branch.

## Next safe ledge

```txt
IntoTheMeadow Renderer/GamePlay Contract Fixture Gate
```

Implement in this order:

```txt
1. render parity reason constants
2. expected descriptor collector
3. renderer snapshot consumption normalizer
4. descriptor parity comparator
5. GameHost renderParity diagnostics projection
6. ActionFrame and ActionResult contracts
7. path-progress reducer
8. inspect-target reducer
9. objective completion resolver
10. snapshot.gameplay projection
11. DOM-free renderer/gameplay fixture smoke
12. package.json check expansion
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T12-21-20-04-00-renderer-gameplay-contract-map.md
.agent/render-audit/2026-07-08T12-21-20-04-00-render-parity-contract-map.md
.agent/grass-system-audit/2026-07-08T12-21-20-04-00-grass-render-readback-ledger.md
.agent/gameplay-authority-audit/2026-07-08T12-21-20-04-00-action-result-fixture-ledger.md
.agent/trackers/2026-07-08T12-21-20-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T12-21-20-04-00.md
```

## Validation

Performed:

```txt
GitHub repo-list read
central ledger readback
repo-local .agent readback
repo-local source readback
repo-local .agent write
central ledger write
central internal change-log write
```

Not performed:

```txt
local checkout
npm install
npm run check
browser smoke
GitHub Pages smoke
runtime source edit
```
