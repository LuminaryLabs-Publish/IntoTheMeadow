# Known Gaps — IntoTheMeadow

**Timestamp:** `2026-07-08T22-38-17-04-00`

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

`src/hosts/web-host.js` sends the enhanced plan into `renderer.render(plan)` and exposes a renderer snapshot through `GameHost`, but there is still no normalized parity report showing which descriptors were consumed, unconsumed, unsupported, fallback-rendered, or missing.

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

Existing `enhancedRenderPlan`, `render`, `state`, `snapshot`, and `diagnostics` fields must remain stable.

### 3. Grass readback rows are not proven

The game has a texture-driven grass descriptor stack, but renderer-facing readback is not stable.

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

Silent descriptor drop remains the main render failure mode.

### 4. Renderer snapshot absence is not handled as a first-class result

The external renderer may not expose a complete consumption snapshot.

A missing or sparse renderer snapshot must produce a stable report with specific reason rows, not an exception and not a silent pass.

### 5. Gameplay descriptors are inert

`ARRIVAL_OBJECTIVES` and `ARRIVAL_INTERACTION_TARGETS` define the first gameplay loop:

```txt
path-progress -> arrival-path -> walk-the-path
inspect -> focal-tree -> inspect-tree
```

`advanceGameState()` does not consume actions, so those descriptors never become `ActionResult`, `completedObjectiveIds`, or `snapshot.gameplay` records.

### 6. The check script does not cover the next proof seam

`npm run check` currently covers static, registry, render-plan, and deterministic-scene smokes.

It does not yet run:

```txt
render-parity-fixture-smoke
gameplay-action-replay-fixture-smoke
```

## Non-goals for the next pass

```txt
Do not rewrite renderer visuals.
Do not change meadow content placement.
Do not change external CDN kit URLs.
Do not move reusable renderer systems into this publish repo permanently.
Do not add browser-only test dependencies before pure fixture coverage exists.
```
