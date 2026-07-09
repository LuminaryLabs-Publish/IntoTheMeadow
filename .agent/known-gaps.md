# Known Gaps — IntoTheMeadow

**Timestamp:** `2026-07-09T03-50-12-04-00`

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

`src/hosts/web-host.js` sends the enhanced plan into `renderer.render(plan)` and exposes a renderer snapshot through `GameHost`, but there is still no normalized parity report showing which descriptors were consumed, unconsumed, unsupported, fallback-rendered, sparse, or missing.

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
grassSystem.debug
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

A missing or sparse renderer snapshot must produce stable reason rows, not an exception and not a silent pass.

### 5. Gameplay descriptors are inert

`ARRIVAL_OBJECTIVES` and `ARRIVAL_INTERACTION_TARGETS` define the first gameplay loop:

```txt
path-progress -> arrival-path -> walk-the-path
inspect -> focal-tree -> inspect-tree
```

`advanceGameState()` does not consume actions, so those descriptors never become `ActionResult`, `completedObjectiveIds`, or `snapshot.gameplay` records.

### 6. Interaction target authority has no reducer

`arrival-targets.js` knows which target accepts which action, but the runtime has no pure reducer that validates target/action pairs.

Missing rows:

```txt
unknown-target
wrong-action-for-target
invalid-progress
objective-already-complete
accepted
no-state-change
```

### 7. The check script does not cover the next proof seam

`npm run check` currently covers static, registry, render-plan, and deterministic-scene smokes.

It does not yet run:

```txt
render-parity-fixture-smoke
gameplay-action-replay-fixture-smoke
```

### 8. Consumer snapshot compatibility needs an explicit adapter

The external `meadow-webgl-render-kit` may return renderer readback with sparse fields, no grass-specific rows, or no `getSnapshot` at all.

The next implementation should add a source-side compatibility adapter that classifies sparse consumer data as explicit parity rows instead of assuming the renderer is wrong or complete.

### 9. Central/docs freshness can drift from repo-local state

A same-hour repo-local pointer had advanced beyond the central ledger. Keep the central `LuminaryLabs-Dev/LuminaryLabs` ledger updated in the same pass whenever root `.agent` files are refreshed.

## Non-goals for the next pass

```txt
Do not rewrite renderer visuals.
Do not change meadow content placement.
Do not change external CDN kit URLs.
Do not move reusable renderer systems into this publish repo permanently.
Do not add browser-only test dependencies before pure fixture coverage exists.
```
