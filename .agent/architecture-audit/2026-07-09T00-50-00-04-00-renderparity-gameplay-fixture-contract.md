# Architecture Audit — RenderParity + Gameplay Fixture Contract

**Timestamp:** `2026-07-09T00-50-00-04-00`

## Selected repo

```txt
LuminaryLabs-Publish/IntoTheMeadow
```

## Selection basis

The full accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked non-Cavalry repo was new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

`IntoTheMeadow` was the oldest eligible tracked fallback by central alignment timestamp.

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

| Domain | Source anchor | Current responsibility | Gap |
| --- | --- | --- | --- |
| Static route | `index.html` | Browser entry shell | No direct issue this pass |
| Boot | `src/boot/boot-game.js` | Starts web host | No proof fixture branch |
| Web host | `src/hosts/web-host.js` | Loads kits, owns frame loop, exposes host | No render parity projection |
| Manifest | `src/content/game-manifest.js` | Product ID, route, external CDN kit URLs | Uses old NexusRealtime ProtoKits CDN naming |
| External meadow area | `meadow-area-kit` | Provides base meadow render plan | Consumption proof lives outside repo |
| External meadow renderer | `meadow-webgl-render-kit` | Renders enhanced plan | Snapshot readback is not normalized |
| Game factory | `src/game/create-into-the-meadow-game.js` | Installs DSKs, owns state/render/snapshot API | Gameplay action API missing |
| State | `src/game/game-state.js` | Initial state and tick reducer | Action replay missing |
| Snapshot | `src/game/game-snapshot.js` | Manifest/state/renderPlan/diagnostics | `renderParity` and `gameplay` missing |
| Render enhancement | `src/game/enhance-render-plan.js` | Adds tree/wind/performance/post/grass descriptors | Consumer parity missing |
| Objectives | `src/content/objectives/arrival-objectives.js` | Defines walk-path and inspect-tree goals | Not reduced into ActionResult |
| Interaction targets | `src/content/interaction-targets/arrival-targets.js` | Defines focal-tree and arrival-path targets | No command preflight |

## Services that kits offer

| Kit or service | Offered service |
| --- | --- |
| `createMeadowAreaKit` | Builds the base meadow area render-plan provider |
| `createMeadowWebglRenderKit` | Builds the renderer adapter with `render(plan)` and optional `getSnapshot()` |
| `installDsks` | Registers local/external DSK install state and validation |
| `createIntoTheMeadowGame` | Produces game API, diagnostics, tick/reset, content, snapshot |
| `createFallbackMeadowAreaKit` | Provides static fallback render plan, snapshot, validation |
| `createTreeObjectDsk` | Enhances focal tree descriptors |
| `createWindFieldDsk` | Produces wind state for render plans and grass shader wind |
| `createMeadowPerformancePolicy` | Produces profile, budgets, and outline policies |
| `createPostProcessStack` | Produces post-process descriptors |
| `createGrassDensityTextureKit` | Produces density texture descriptor and validation |
| `createGrassClumpArchetypeKit` | Produces clump/card archetypes and validation |
| `createGrassStaticBatchKit` | Creates static grass batches and validation |
| `createGrassPatchPlacementKit` | Places patch descriptors from density texture and static batches |
| `createGrassClumpInstancingRenderKit` | Produces draw groups and validation |
| `createGrassShaderWindKit` | Produces shader wind descriptor and validation |
| `createGrassLodPolicyKit` | Produces grass LOD policy |
| `createGrassDensityScalingKit` | Produces density scaling policy |
| `createGrassDebugVisualizationKit` | Produces grass debug summary |

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

## Architecture finding

The repo has enough domain separation to build fixture-proof boundaries without changing visuals.

The next work should splice source-owned proof records beside current host/snapshot fields, not replace the render loop or external kits.

## Next safe ledge

```txt
IntoTheMeadow RenderParity Consumer Snapshot + Gameplay Replay Fixture Gate
```
