# Known Gaps — IntoTheMeadow

**Timestamp:** `2026-07-08T18-09-21-04-00`

## Highest-priority gaps

### 1. Renderer descriptor-consumption parity is still missing

`src/game/enhance-render-plan.js` emits rich descriptors:

```txt
grassSystem
windField
postProcess
performance
outlinePolicy / renderStyle
grassPatches
grass drawGroups
grass staticBatches
stats.estimatedGrassInstances
stats.estimatedGrassCards
```

`src/hosts/web-host.js` sends the enhanced plan into `renderer.render(plan)` and exposes a renderer snapshot through `GameHost`, but there is no normalized parity report showing which descriptors were consumed, unconsumed, unsupported, fallback-rendered, or missing.

### 2. The GameHost render parity splice point is known but not implemented

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
GameHost.getSnapshot().renderParity
GameHost.getState?.().renderParity
```

Existing `enhancedRenderPlan` and `render` fields must remain stable.

### 3. Grass readback rows are not proven

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

### 4. Renderer snapshot absence is not handled as a first-class result

The external renderer may not expose a complete consumption snapshot.

That should not block readback.

A missing or sparse renderer snapshot must produce a stable failed report with specific reason rows, not an exception and not a silent pass.

### 5. Gameplay action authority is still inert

`createInitialGameState()` has player, progression, world, session, and DSK state.

`advanceGameState()` only increments `frame` and records `lastTick`.

There is no typed action frame, action result journal, path-progress reducer, inspect reducer, or idempotent objective completion resolver.

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
- do not replace the external renderer just to make parity pass
- do not make renderer parity depend on browser-only WebGL state
```

## Next safe ledge

```txt
IntoTheMeadow GameHost RenderParity Consumer + Objective ActionResult Fixture Gate
```
