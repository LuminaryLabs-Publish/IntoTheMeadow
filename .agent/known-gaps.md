# Known Gaps — IntoTheMeadow

**Timestamp:** `2026-07-08T13-50-37-04-00`

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

### 2. Renderer snapshot normalization is absent

The host currently trusts whatever `renderer.getSnapshot?.()` returns.

Needed next:

```txt
normalize absent snapshot without crash
normalize renderer id/version when available
normalize grass consumption fields when available
normalize fallback/unsupported rows when fields are unavailable
```

### 3. Grass readback is not proven

The game has a texture-driven grass descriptor stack, but the renderer-facing readback is not yet stable.

The next pass must prove or explicitly classify:

```txt
densityTexture
staticBatches
patches
drawGroups
shaderWind
lodPolicy
densityScale
estimated instances/cards
```

Silent descriptor drop is the main render failure mode.

### 4. Gameplay action authority is still inert

`createInitialGameState()` has player, progression, world, session, and DSK state.

`advanceGameState()` only increments frame and records `lastTick`.

There is no typed action frame, no action result journal, no path-progress reducer, no inspect reducer, and no idempotent objective completion resolver.

### 5. Snapshot gameplay branch is absent

`createGameSnapshot()` returns manifest, state, render plan, and diagnostics.

It does not expose:

```txt
snapshot.gameplay.activeObjectiveId
snapshot.gameplay.completedObjectiveIds
snapshot.gameplay.storyBeatIds
snapshot.gameplay.lastActionResults
snapshot.gameplay.actionJournal
snapshot.renderParity
```

### 6. Fixture smoke coverage is not yet wired

`npm run check` currently runs the existing smoke suite, but it does not include render-parity or gameplay-authority fixtures.

Needed next:

```txt
tests/render-parity-fixture-smoke.mjs
tests/gameplay-authority-fixture-smoke.mjs
package.json check script inclusion
```

### 7. Public route should stay backward-compatible

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
IntoTheMeadow Render Parity Consumer Snapshot + Gameplay Action Fixture Gate
```
