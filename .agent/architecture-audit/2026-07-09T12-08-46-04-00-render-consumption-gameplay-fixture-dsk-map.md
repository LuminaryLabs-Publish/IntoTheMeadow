# Architecture Audit — Render Consumption + Gameplay Fixture DSK Map

**Timestamp:** `2026-07-09T12-08-46-04-00`

## Architecture summary

`IntoTheMeadow` currently uses a clean source/render split at a high level, but the proof boundary is incomplete.

```txt
content descriptors
  -> external meadow-area-kit
  -> raw meadow render plan
  -> local enhanceRenderPlan()
  -> enhanced descriptor-rich render plan
  -> external meadow-webgl-render-kit
  -> optional renderer snapshot
```

The missing architecture piece is a source-owned ledger that explains which descriptors were expected, which descriptors were consumed, which descriptors were unsupported, and which gameplay commands changed the source state.

## Current domain stack

```txt
Route domain:
- static HTML route
- boot DOM adapter
- loading/error/debug HUD adapter

Source authority domain:
- GAME_MANIFEST
- ARRIVAL_MEADOW_CONFIG
- STORY_BEATS
- ARRIVAL_OBJECTIVES
- ARRIVAL_INTERACTION_TARGETS
- DSK registry

Kit composition domain:
- external kit dynamic import
- local DSK install validation
- fallback meadow area kit
- game factory
- web host

State domain:
- immutable initial state
- frame and lastTick advancement
- progression descriptor projection
- reset

Render domain:
- raw meadow render plan
- render plan enhancement
- object filtering
- tree style policy
- wind descriptors
- postprocess descriptors
- performance budgets
- renderer consumer boundary
- optional renderer snapshot readback

Grass domain:
- density texture
- clump archetype
- static batch
- patch placement
- instanced draw groups
- shader wind
- LOD policy
- density scaling
- debug summary

Gameplay/interaction domain:
- objective descriptors
- interaction target descriptors
- planned ActionFrame rows
- planned ActionResult rows
- planned objective progress resolver

Validation/deploy domain:
- static smoke
- DSK registry smoke
- render-plan smoke
- deterministic scene smoke
- planned render/action fixture gate
```

## Implemented kits

```txt
meadow-area-kit                    external CDN area/render-plan producer
meadow-webgl-render-kit            external CDN renderer consumer
game-manifest descriptor           route/build/external kit source record
local DSK registry                 local DSK identity list
installDsks                        DSK validation and snapshot service
into-the-meadow-game composition   source/runtime composition surface
web-host kit                       browser DOM/render loop adapter
fallback-meadow-area-kit           local fallback render-plan producer
arrival-meadow descriptor          area/content/source descriptor
story-beats descriptor             narrative beat source descriptors
arrival-objectives descriptor      objective source descriptors
arrival-interaction-targets        target/action source descriptors
tree-object-dsk                    focal tree render-style enhancement
wind-field-dsk                     wind descriptor normalization
meadow-performance-dsk             budgets and outline policy
post-process-stack-dsk             postprocess descriptor stack
grass-density-texture-kit          texture-driven grass density source
grass-clump-archetype-kit          reusable grass card archetypes
grass-static-batch-kit             static clump batches
grass-patch-placement-kit          world patch placement rows
grass-clump-instancing-render-kit  draw group descriptors
grass-shader-wind-kit              wind uniform/descriptor surface
grass-lod-policy-kit               grass LOD descriptors
grass-density-scaling-kit          quality-dependent density scale
grass-debug-visualization-kit      grass debug summary descriptors
```

## Services that need extraction next

```txt
collectRenderExpectations(plan)
normalizeRendererSnapshot(snapshot)
classifyRenderConsumption(expectations, snapshot)
classifyGrassConsumption(grassSystem, snapshot)
createRenderConsumptionLedger(plan, rendererSnapshot)
createActionFrame(input)
targetActionPreflight(state, target, action)
reduceMeadowAction(state, actionFrame)
resolveObjectiveProgress(state, actionResult)
projectGameplaySnapshot(state, journal)
projectRenderParitySnapshot(plan, rendererSnapshot)
runIntoTheMeadowFixtureRows()
```

## Required next-cut modules

```txt
src/render-consumption/collect-render-expectations.js
src/render-consumption/normalize-renderer-snapshot.js
src/render-consumption/classify-render-consumption.js
src/render-consumption/classify-grass-consumption.js
src/render-consumption/create-render-consumption-ledger.js
src/gameplay/action-frame.js
src/gameplay/action-result.js
src/gameplay/target-action-preflight.js
src/gameplay/reduce-meadow-action.js
src/gameplay/resolve-objective-progress.js
src/gameplay/project-gameplay-snapshot.js
scripts/into-the-meadow-render-action-fixture.mjs
```

## Architecture rule for the next code pass

Keep the renderer and meadow visuals stable. Add proof rows around the existing consumer boundary before changing any visual fidelity, object placement, renderer internals, or external kits.
