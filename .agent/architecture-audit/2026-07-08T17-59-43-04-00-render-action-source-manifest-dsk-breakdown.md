# Architecture Audit — Render Consumption + Action Source Manifest

**Timestamp:** `2026-07-08T17-59-43-04-00`

## Current architecture

`IntoTheMeadow` is a static publish-game shell that composes external meadow kits with repo-local descriptor and enhancement kits.

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> src/content/game-manifest.js
  -> src/game/create-into-the-meadow-game.js
  -> src/game/game-state.js
  -> src/game/game-snapshot.js
  -> src/game/enhance-render-plan.js
  -> external meadow-area-kit
  -> external meadow-webgl-render-kit
```

## Source-backed architecture read

```txt
src/content/game-manifest.js
  owns route/build identity and external CDN kit URLs

src/hosts/web-host.js
  owns runtime kit import, renderer creation, animation frame loop, enhanced-plan render call, debug HUD string, and GameHost splice point

src/game/create-into-the-meadow-game.js
  owns game factory, fallback meadow area kit, DSK install snapshot, current state, content bundle, diagnostics, tick, reset, and snapshot entry

src/game/game-state.js
  owns deterministic initial state and tick-only frame advancement

src/game/game-snapshot.js
  owns manifest/state/renderPlan/diagnostics snapshot shape

src/game/enhance-render-plan.js
  owns render-plan descriptor enhancement and grass-system descriptor construction

src/content/objectives/arrival-objectives.js
  owns first objective descriptors

src/content/interaction-targets/arrival-targets.js
  owns first target descriptors
```

## Current DSK/domain breakdown

```txt
route shell:
  static-route-domain
  boot-domain
  web-host-domain
  GameHost-exposure-domain

source identity:
  manifest-domain
  cdn-kit-source-domain
  build-route-domain

composition:
  dsk-install-domain
  external-kit-loading-domain
  meadow-area-domain
  fallback-meadow-area-domain

render:
  render-plan-domain
  render-plan-enhancement-domain
  renderer-host-domain
  renderer-snapshot-domain
  render-consumption-domain
  render-parity-domain

visual systems:
  tree-object-domain
  wind-field-domain
  performance-policy-domain
  post-process-domain
  grass-density-domain
  grass-archetype-domain
  grass-static-batch-domain
  grass-patch-placement-domain
  grass-instancing-domain
  grass-shader-wind-domain
  grass-lod-domain
  grass-debug-domain

gameplay authority:
  game-state-domain
  player-state-domain
  progression-domain
  objective-domain
  interaction-target-domain
  action-frame-domain
  action-result-domain
  action-journal-domain
  objective-completion-domain
  gameplay-snapshot-domain

validation:
  static-smoke-domain
  dsk-registry-smoke-domain
  render-plan-smoke-domain
  deterministic-scene-smoke-domain
  render-parity-fixture-domain
  gameplay-authority-fixture-domain
```

## Services offered today

```txt
- route booting
- CDN kit import from manifest
- DSK install validation snapshot
- fallback meadow-area render plan service
- current state creation
- frame tick advancement
- raw render-plan generation
- enhanced render-plan generation
- grass descriptor generation
- WebGL renderer invocation
- GameHost snapshot and diagnostics exposure
- static smoke test entry through npm run check
```

## Missing services to add next

```txt
- collectExpectedRenderDescriptors(plan)
- normalizeRendererSnapshotConsumption(rendererSnapshot)
- compareRenderConsumptionRows(expected, actual)
- createRenderParityReport(plan, rendererSnapshot)
- projectRenderParityToGameHost(report)
- createActionFrame(input, context)
- reducePathProgress(state, frame, objectives, targets)
- reduceInspectTarget(state, frame, objectives, targets)
- resolveObjectiveCompletion(state, actionResults)
- appendActionJournal(state, actionResults)
- createGameplaySnapshot(state)
```

## Exact source file manifest for next implementation

```txt
src/render-parity/render-parity-reasons.js
src/render-parity/collect-expected-render-descriptors.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/compare-render-descriptor-parity.js
src/render-parity/create-render-parity-report.js
src/render-parity/project-render-parity.js
src/gameplay-authority/action-reasons.js
src/gameplay-authority/action-frame.js
src/gameplay-authority/action-result.js
src/gameplay-authority/action-journal.js
src/gameplay-authority/reduce-path-progress.js
src/gameplay-authority/reduce-inspect-target.js
src/gameplay-authority/resolve-objective-completion.js
src/gameplay-authority/create-gameplay-snapshot.js
tests/render-parity-fixture-smoke.mjs
tests/gameplay-authority-fixture-smoke.mjs
```

## Adapter splice points

```txt
src/hosts/web-host.js
  after renderer.render(plan)
  read renderer.getSnapshot?.()
  compute renderParity
  expose renderParity additively through GameHost snapshot/state

src/game/game-state.js
  keep tick-only compatibility
  optionally accept actions[]
  return state with lastActionResults/actionJournal/progression updates

src/game/game-snapshot.js
  keep manifest/state/renderPlan/diagnostics
  add renderParity and gameplay branches additively
```

## Stop line

Do not move these new kits to NexusEngine or ProtoKits until `IntoTheMeadow` proves the contracts locally with DOM-free fixtures.
