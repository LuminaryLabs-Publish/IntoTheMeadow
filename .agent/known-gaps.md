# Known Gaps — IntoTheMeadow

**Timestamp:** `2026-07-08T17-59-43-04-00`

## Highest-priority gaps

### 1. Renderer descriptor-consumption parity is still missing

`src/game/enhance-render-plan.js` emits rich descriptors:

```txt
grassSystem
windField
postProcess
performance
outlinePolicy
grassPatches
grass drawGroups
grass staticBatches
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

`src/hosts/web-host.js` sends the enhanced plan into `renderer.render(plan)` and exposes a renderer snapshot through `GameHost`, but there is no normalized parity report showing which descriptors were consumed, unconsumed, unsupported, fallback-rendered, or missing.

### 2. The render consumption source manifest is missing

The next implementation needs a small pure `src/render-parity/` layer before the browser host consumes it.

Required source files:

```txt
src/render-parity/render-parity-reasons.js
src/render-parity/collect-expected-render-descriptors.js
src/render-parity/normalize-renderer-snapshot-consumption.js
src/render-parity/compare-render-descriptor-parity.js
src/render-parity/create-render-parity-report.js
src/render-parity/project-render-parity.js
```

### 3. The GameHost splice point is known but not implemented

The exact next splice point is `src/hosts/web-host.js` after:

```txt
const render = renderer.render(plan);
```

The source should compute a parity record from:

```txt
expected: enhanced plan descriptors
actual: renderer.getSnapshot?.() consumption readback
```

Then expose it additively through:

```txt
GameHost.getState().renderParity
GameHost.getSnapshot().renderParity
```

Existing `enhancedRenderPlan` and `render` fields must remain stable.

### 4. Grass readback rows are not proven

The game has a texture-driven grass descriptor stack, but renderer-facing readback is not yet stable.

The next pass must prove or explicitly classify:

```txt
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassPatches
stats.grassPatchCount
stats.grassStaticBatchCount
stats.grassDrawGroupCount
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

Silent descriptor drop is the main render failure mode.

### 5. Gameplay action authority is still inert

`createInitialGameState()` has player, progression, world, session, and DSK state.

`advanceGameState()` only increments `frame` and records `lastTick`.

There is no typed action frame, no action result journal, no path-progress reducer, no inspect reducer, and no idempotent objective completion resolver.

### 6. Snapshot gameplay branch is absent

`createGameSnapshot()` returns manifest, state, render plan, and diagnostics.

It does not expose:

```txt
snapshot.renderParity
snapshot.gameplay.activeObjectiveId
snapshot.gameplay.completedObjectiveIds
snapshot.gameplay.storyBeatIds
snapshot.gameplay.lastActionResults
snapshot.gameplay.actionJournal
```

### 7. The first objective proof set exists but is not wired

The data already contains the right first proof targets:

```txt
walk-the-path -> arrival-path -> path-progress -> progressAtLeast 0.35
inspect-tree  -> focal-tree   -> inspect       -> inspected true
```

The gap is not content.

The gap is a deterministic reducer path from optional actions into objective completion and snapshot projection.

### 8. Fixture smoke coverage is not yet wired

`npm run check` currently runs the existing smoke suite, but it does not include render-parity or gameplay-authority fixtures.

Needed next:

```txt
tests/render-parity-fixture-smoke.mjs
tests/gameplay-authority-fixture-smoke.mjs
package.json check script inclusion
```

### 9. Public route should stay backward-compatible

`game.tick({ time, dt })` is already used by the host loop.

Any action input upgrade must preserve that call shape and only add optional support for:

```txt
game.tick({ time, dt, actions })
```

## Do not do yet

```txt
- do not add new authored meadow locations
- do not add inventory
- do not add first-person controls
- do not add audio
- do not add more grass visuals without renderer readback
- do not move kits to NexusEngine or ProtoKits until local proof is fixture-stable
```

## Next safe ledge

```txt
IntoTheMeadow Render Consumption Source Manifest + Objective Action Fixture Matrix
```
