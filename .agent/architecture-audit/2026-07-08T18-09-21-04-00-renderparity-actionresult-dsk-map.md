# Architecture Audit — RenderParity + ActionResult DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-08T18-09-21-04-00`

## Architecture read

`IntoTheMeadow` is already organized as a thin publish repo with local descriptors and DSK-style modules around an external meadow area kit and external meadow WebGL renderer kit.

The current architecture is strongest in render descriptor production and weakest in source-owned readback/authority records.

## Current boot architecture

```txt
index.html
  -> src/boot/boot-game.js
  -> src/hosts/web-host.js
  -> GAME_MANIFEST.externalKits
  -> external meadow-area-kit
  -> external meadow-webgl-render-kit
  -> createIntoTheMeadowGame
  -> enhanceRenderPlan
  -> renderer.render
  -> exposeGameHost
```

## Current source seams

```txt
src/hosts/web-host.js:
  host seam
  imports manifest, game factory, host exposure, and render-plan enhancement
  creates external kits
  owns animation frame loop
  currently has the exact splice point for render parity

src/game/enhance-render-plan.js:
  render descriptor seam
  creates grass system, wind field, post-process, performance, outline, and stats descriptors
  does not know if the external renderer consumed those descriptors

src/game/game-state.js:
  state seam
  creates player/world/progression state
  advanceGameState is still tick-only

src/game/game-snapshot.js:
  snapshot seam
  exposes manifest, state, renderPlan, diagnostics
  does not yet expose renderParity or gameplay branches

src/content/objectives/arrival-objectives.js:
  objective descriptor seam
  defines walk-the-path and inspect-tree completion requirements

src/content/interaction-targets/arrival-targets.js:
  target descriptor seam
  defines focal-tree and arrival-path action targets
```

## Domain map

```txt
IntoTheMeadow
├─ route-domain
│  ├─ static-route-domain
│  ├─ browser-boot-domain
│  └─ pages-deploy-domain
├─ host-domain
│  ├─ web-host-domain
│  ├─ external-kit-loading-domain
│  ├─ gamehost-diagnostics-domain
│  ├─ renderparity-host-projection-domain        missing next
│  └─ gameplay-host-projection-domain            missing next
├─ manifest-domain
│  ├─ game-manifest descriptor
│  ├─ external-kit-url descriptor
│  └─ local-dsk-registry
├─ meadow-content-domain
│  ├─ arrival-meadow content descriptor
│  ├─ story-beats descriptor
│  ├─ arrival-objectives descriptor
│  └─ arrival-interaction-targets descriptor
├─ render-domain
│  ├─ render-plan-domain
│  ├─ render-plan-enhancement-domain
│  ├─ renderer-host-domain
│  ├─ render-snapshot-domain
│  ├─ expected-render-descriptor-domain          missing next
│  ├─ renderer-snapshot-consumption-domain       missing next
│  └─ render-descriptor-parity-domain            missing next
├─ grass-system-domain
│  ├─ grass-density-texture-domain
│  ├─ grass-clump-archetype-domain
│  ├─ grass-static-batch-domain
│  ├─ grass-patch-placement-domain
│  ├─ grass-instancing-render-domain
│  ├─ grass-shader-wind-domain
│  ├─ grass-lod-policy-domain
│  ├─ grass-density-scaling-domain
│  ├─ grass-debug-visualization-domain
│  └─ grass-consumption-readback-domain          missing next
├─ gameplay-domain
│  ├─ game-state-domain
│  ├─ player-state-domain
│  ├─ world-state-domain
│  ├─ progression-domain
│  ├─ objective-domain
│  ├─ interaction-target-domain
│  ├─ action-frame-domain                        missing next
│  ├─ action-result-domain                       missing next
│  ├─ action-journal-domain                      missing next
│  └─ objective-completion-reducer-domain        missing next
└─ validation-domain
   ├─ current syntax/smoke check
   ├─ render-parity-fixture-smoke-domain         missing next
   └─ gameplay-authority-fixture-smoke-domain    missing next
```

## DSK/service map

| Kit | Status | Service |
|---|---:|---|
| `meadow-area-kit` | external | creates base meadow render plan |
| `meadow-webgl-render-kit` | external | renders plan and may expose snapshot |
| `game-manifest descriptor` | implemented | records app identity and external kit URLs |
| `local-dsk-registry` | implemented | exposes local DSK install snapshot |
| `arrival-meadow content descriptor` | implemented | provides current playable scene descriptor |
| `arrival-objectives descriptor` | implemented | defines `walk-the-path` and `inspect-tree` |
| `arrival-interaction-targets descriptor` | implemented | defines `arrival-path` and `focal-tree` |
| `tree-object-dsk` | implemented | enhances focal-tree outline/style |
| `wind-field-dsk` | implemented | produces wind state descriptor |
| `meadow-performance-dsk` | implemented | produces render budgets and outline policy |
| `post-process-stack-dsk` | implemented | produces post-process descriptor |
| `grass-density-texture-kit` | implemented | produces density texture descriptor |
| `grass-clump-archetype-kit` | implemented | produces reusable clump archetypes |
| `grass-static-batch-kit` | implemented | produces reusable static batches |
| `grass-patch-placement-kit` | implemented | places grass patches from texture and batches |
| `grass-clump-instancing-render-kit` | implemented | creates grass draw groups |
| `grass-shader-wind-kit` | implemented | creates shader wind descriptor |
| `grass-lod-policy-kit` | implemented | creates grass LOD descriptor |
| `grass-density-scaling-kit` | implemented | scales density by quality |
| `grass-debug-visualization-kit` | implemented | summarizes grass density/batch/patch/draw facts |
| `render-parity-reason-kit` | next | stable parity reason constants |
| `expected-render-descriptor-kit` | next | collects expected descriptor rows from enhanced plan |
| `renderer-snapshot-consumption-kit` | next | normalizes renderer readback |
| `render-descriptor-parity-kit` | next | compares expected descriptors to renderer consumption |
| `render-parity-diagnostics-projection-kit` | next | projects report into GameHost |
| `grass-consumption-row-kit` | next | specializes parity rows for grass stack |
| `action-frame-kit` | next | normalizes optional input actions |
| `action-result-kit` | next | returns accepted/rejected/no_mutation objective records |
| `action-journal-kit` | next | stores recent action result records |
| `path-progress-reducer-kit` | next | reduces path-progress actions against `walk-the-path` |
| `inspect-target-reducer-kit` | next | reduces inspect actions against `inspect-tree` |
| `objective-completion-resolver-kit` | next | resolves objective completion idempotently |
| `gameplay-snapshot-kit` | next | exposes snapshot.gameplay |
| `render-parity-fixture-smoke-kit` | next | tests parity rows without DOM |
| `gameplay-authority-fixture-smoke-kit` | next | tests action reducers without DOM |

## Target source order

```txt
src/render-parity/render-parity-reasons.js
src/render-parity/collect-expected-render-descriptors.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/compare-render-descriptor-parity.js
src/render-parity/create-gamehost-render-parity.js
src/gameplay-authority/action-reasons.js
src/gameplay-authority/action-frame.js
src/gameplay-authority/action-result.js
src/gameplay-authority/action-journal.js
src/gameplay-authority/reduce-path-progress.js
src/gameplay-authority/reduce-inspect-target.js
src/gameplay-authority/resolve-objective-completion.js
src/gameplay-authority/create-gameplay-snapshot.js
src/game/game-state.js
src/game/game-snapshot.js
src/hosts/web-host.js
tests/render-parity-fixture-smoke.mjs
tests/gameplay-authority-fixture-smoke.mjs
package.json
```

## Host splice rule

Do not replace the host.

Add records at the existing seam:

```txt
const plan = enhanceRenderPlan(rawPlan, { performance: rawPlan.style?.performance });
lastPlan = plan;
const render = renderer.render(plan);
```

After that point, the host has the enhanced descriptors, the renderer result, and the renderer snapshot source needed to create readback records.

## Keep stable

```txt
index.html route
boot-game.js route
GAME_MANIFEST external kit URLs
createIntoTheMeadowGame public shape
renderer.render(plan) public shape
existing GameHost fields
existing enhancedRenderPlan field
game.tick({ time, dt }) compatibility
current meadow visuals
```
