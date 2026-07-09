# Known Gaps — IntoTheMeadow

**Timestamp:** `2026-07-09T09-41-24-04-00`

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

`src/hosts/web-host.js` sends the enhanced plan into `renderer.render(plan)` and exposes `renderer.getSnapshot?.()` through `GameHost.getSnapshot()`, but no repo-local consumer ledger classifies consumed, unsupported, fallback-rendered, sparse, or missing descriptors.

### 2. Grass is descriptor-rich but not readback-proven

The grass system derives density textures, clump archetypes, static batches, patch placements, draw groups, shader wind, LOD policy, density scaling, and debug summaries. That is the right structure, but there is no fixture row proving that expected patches/draw groups/instance counts line up with renderer readback.

### 3. Gameplay action descriptors are inert

`ARRIVAL_OBJECTIVES` defines `path-progress` and `inspect` requirements, and `ARRIVAL_INTERACTION_TARGETS` defines `arrival-path` and `focal-tree`. `advanceGameState()` currently increments frame and writes `lastTick`; it does not reduce actions, emit action results, complete objectives, or project gameplay proof into snapshots.

### 4. GameHost has no additive proof projection

`GameHost` exposes state, snapshot, diagnostics, and game reference. It does not expose additive `renderParity`, `grassReadback`, `gameplayAction`, or `objectiveProgress` proof records yet.

### 5. Fixture coverage is not wired into `npm run check`

`package.json` already has `npm run check` for static and render-plan smoke tests. The next fixture scripts should be pure Node/DOM-free and should be added to this existing check path after they exist.

## Non-goals for the next pass

Do not start with:

```txt
visual meadow expansion
external CDN kit changes
renderer replacement
grass renderer rewrite
new gameplay content
shared kit promotion
route/UI redesign
```

The next pass should stay narrow: source records, consumer ledgers, action-result rows, objective rows, fixture rows, and additive GameHost projection.
