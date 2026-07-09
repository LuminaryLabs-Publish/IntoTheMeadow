# Project Breakdown — IntoTheMeadow

**Timestamp:** `2026-07-09T00-50-00-04-00`

## Plan ledger

**Goal:** Refresh `LuminaryLabs-Publish/IntoTheMeadow` internal `.agent` docs, keep the central ledger aligned, and identify the next safe implementation ledge without changing runtime source.

**Checklist:**

- [x] Read the accessible `LuminaryLabs-Publish` repository list.
- [x] Compared the Publish list against `LuminaryLabs-Dev/LuminaryLabs` repo ledger files.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected only one repo: `LuminaryLabs-Publish/IntoTheMeadow`.
- [x] Read repo-local `.agent` state.
- [x] Read source anchors for host, game factory, game state, snapshot, render enhancement, manifest, objectives, targets, and package scripts.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by kits.
- [x] Identified current and next-cut kits.
- [x] Updated required root `.agent` files.
- [x] Added timestamped architecture, render, grass-system, gameplay, and deploy audits.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Updated central ledger and internal change log.
- [x] Pushed only to `main`.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest central 2026-07-09T00-30-24-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central 2026-07-09T00-09-22-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/IntoTheMeadow       selected / oldest eligible central alignment 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central 2026-07-08T23-19-33-04-00
```

## Selection finding

No non-Cavalry Publish repo was found that was fully new, absent from the ledger, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`IntoTheMeadow` was selected as the oldest eligible tracked fallback by central ledger timestamp.

## Interaction loop

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js:startWebHost
  -> loadExternalKits imports GAME_MANIFEST.externalKits
  -> createIntoTheMeadowGame({ externalKits })
  -> installDsks registers local and external DSKs
  -> createMeadowAreaKit(ARRIVAL_MEADOW_CONFIG)
  -> requestAnimationFrame(frame)
  -> game.tick({ time, dt })
  -> advanceGameState increments frame and lastTick
  -> game.getRenderPlan(time)
  -> enhanceRenderPlan(rawPlan)
  -> renderer.render(enhancedPlan)
  -> exposeGameHost exposes game, renderer, enhancedRenderPlan, and renderer snapshot
```

## Domains in use

```txt
static route
boot host
web host
manifest/product source
external CDN meadow area kit
external CDN meadow renderer kit
local DSK registry
game factory
game state
snapshot projection
render-plan enhancement
performance policy
post-process stack
wind field
tree object enhancement
grass density texture
grass clump archetype
grass static batch
grass patch placement
grass instancing draw groups
grass shader wind
grass LOD policy
grass density scaling
grass debug visualization
story beats
arrival objectives
arrival interaction targets
future render parity consumer snapshot
future gameplay action replay
future fixture manifest
```

## Services that kits offer

```txt
createMeadowAreaKit -> base meadow render-plan provider
createMeadowWebglRenderKit -> renderer adapter with render(plan) and optional getSnapshot()
installDsks -> local/external DSK validation and snapshot
createIntoTheMeadowGame -> game API, diagnostics, state, render plan, tick/reset, snapshot
createFallbackMeadowAreaKit -> fallback render plan, snapshot, validation
createTreeObjectDsk -> focal tree enhancement
createWindFieldDsk -> wind state
createMeadowPerformancePolicy -> performance profile, budgets, outline policy
createPostProcessStack -> post-process descriptor stack
createGrassDensityTextureKit -> density texture descriptor and validation
createGrassClumpArchetypeKit -> card/clump archetypes and validation
createGrassStaticBatchKit -> static grass batches and validation
createGrassPatchPlacementKit -> patch descriptors from density and batches
createGrassClumpInstancingRenderKit -> draw groups and validation
createGrassShaderWindKit -> grass wind shader descriptor and validation
createGrassLodPolicyKit -> grass LOD policy
createGrassDensityScalingKit -> grass density quality scale
createGrassDebugVisualizationKit -> grass debug summary
```

## Kits identified

### Current kits

```txt
meadow-area-kit
meadow-webgl-render-kit
game-manifest descriptor
local-dsk-registry
arrival-meadow content descriptor
story-beats descriptor
arrival-objectives descriptor
arrival-interaction-targets descriptor
fallback-meadow-area-kit
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
```

### Next-cut kits

```txt
render-parity-reason-kit
expected-render-descriptor-kit
renderer-snapshot-consumption-kit
render-descriptor-parity-kit
render-parity-report-kit
render-parity-diagnostics-projection-kit
grass-consumption-row-kit
action-frame-kit
action-result-kit
action-journal-kit
path-progress-reducer-kit
inspect-target-reducer-kit
objective-completion-resolver-kit
gameplay-snapshot-kit
fixture-manifest-row-kit
render-parity-fixture-smoke-kit
gameplay-authority-fixture-smoke-kit
```

## Main finding

`IntoTheMeadow` is descriptor-rich but proof-limited.

The render path produces grass, wind, post-process, performance, outline, and stats descriptors, but there is no consumer snapshot/parity report proving renderer consumption.

The gameplay path defines `walk-the-path` and `inspect-tree`, but `advanceGameState()` only increments frame and `lastTick`.

## Next safe ledge

```txt
IntoTheMeadow RenderParity Consumer Snapshot + Gameplay Replay Fixture Gate
```

## Files updated in repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T00-50-00-04-00-renderparity-gameplay-fixture-contract.md
.agent/render-audit/2026-07-09T00-50-00-04-00-render-consumption-diagnostic-snapshot.md
.agent/grass-system-audit/2026-07-09T00-50-00-04-00-grass-descriptor-consumer-matrix.md
.agent/gameplay-audit/2026-07-09T00-50-00-04-00-action-replay-snapshot-loop.md
.agent/deploy-audit/2026-07-09T00-50-00-04-00-check-script-fixture-gate.md
.agent/trackers/2026-07-09T00-50-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T00-50-00-04-00.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm run check: no
browser smoke: no
pushed to main: yes
```
