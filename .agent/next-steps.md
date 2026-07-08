# Next Steps — IntoTheMeadow

**Timestamp:** `2026-07-08T15-28-13-04-00`

## Goal

Move `IntoTheMeadow` from descriptor-rich prototype toward a fixture-proven meadow game without turning the publish repo into the permanent home for reusable renderer systems.

The immediate path is:

```txt
GameHost render parity splice
-> grass descriptor consumption row contract
-> DOM-free render parity fixture
-> optional ActionFrame support
-> first objective ActionResult reducers
-> snapshot.gameplay projection
-> DOM-free gameplay authority fixture
-> then visual/gameplay expansion
```

## Ordered next implementation ledges

### 1. Render parity reason catalog

Add stable reason constants for renderer parity classification.

Target file:

```txt
src/render-parity/render-parity-reasons.js
```

Reason families:

```txt
consumed
unconsumed
unsupported
fallback-rendered
missing-renderer-snapshot
missing-renderer-field
invalid-plan-descriptor
```

### 2. Expected descriptor collector

Collect expected descriptors from an enhanced render plan.

Target file:

```txt
src/render-parity/collect-expected-render-descriptors.js
```

Expected descriptor groups:

```txt
base objects
outline policy
windField
postProcess
performance
grassSystem.densityTexture
grassSystem.staticBatches
grassSystem.patches
grassSystem.drawGroups
grassSystem.shaderWind
grassSystem.lodPolicy
grassSystem.densityScale
grassPatches
stats grass counts
```

### 3. Renderer snapshot consumption normalizer

Normalize renderer snapshot fields without requiring a specific renderer version.

Target file:

```txt
src/render-parity/normalize-renderer-snapshot-consumption.js
```

The normalizer must return a stable unsupported/readback-absent shape when `renderer.getSnapshot?.()` is missing or sparse.

### 4. Descriptor parity comparator

Compare expected plan descriptors against consumed snapshot descriptors.

Target file:

```txt
src/render-parity/compare-render-descriptor-parity.js
```

Output shape:

```txt
RenderParityReport
  id
  passed
  generatedAtFrame
  expectedCount
  consumedCount
  unsupportedCount
  fallbackCount
  missingCount
  rows[]
```

### 5. GameHost renderParity projection

Keep existing GameHost fields and add parity diagnostics additively.

Target file:

```txt
src/hosts/web-host.js
```

Splice point:

```txt
const render = renderer.render(plan);
const rendererSnapshot = renderer.getSnapshot?.();
const renderParity = compareRenderDescriptorParity(plan, rendererSnapshot);
```

Expose through `GameHost.getSnapshot()` and any existing `GameHost.getState()` path without removing `enhancedRenderPlan` or `render`.

### 6. Gameplay action contracts

Add optional action input while preserving `game.tick({ time, dt })`.

Target files:

```txt
src/gameplay-authority/action-reasons.js
src/gameplay-authority/action-frame.js
src/gameplay-authority/action-result.js
src/gameplay-authority/action-journal.js
```

### 7. Objective reducers

Reduce existing descriptors into deterministic results.

Target files:

```txt
src/gameplay-authority/reduce-path-progress.js
src/gameplay-authority/reduce-inspect-target.js
src/gameplay-authority/resolve-objective-completion.js
```

First fixture rows:

```txt
path-progress accepted below threshold
path-progress accepted and completes walk-the-path
inspect focal-tree accepted and completes inspect-tree
repeat inspect focal-tree returns unchanged/idempotent
unknown target returns rejected
wrong action for target returns rejected
```

### 8. Snapshot gameplay projection

Expose gameplay proof through snapshots.

Target files:

```txt
src/gameplay-authority/create-gameplay-snapshot.js
src/game/game-state.js
src/game/game-snapshot.js
```

Required branch:

```txt
snapshot.gameplay.activeObjectiveId
snapshot.gameplay.completedObjectiveIds
snapshot.gameplay.storyBeatIds
snapshot.gameplay.lastActionResults
snapshot.gameplay.actionJournal
```

### 9. Fixture smoke tests

Add DOM-free fixtures before runtime visuals.

Target files:

```txt
tests/render-parity-fixture-smoke.mjs
tests/gameplay-authority-fixture-smoke.mjs
package.json
```

## Acceptance checklist

- [ ] Renderer descriptors classify as consumed, unconsumed, unsupported, fallback-rendered, missing-renderer-snapshot, or missing-renderer-field.
- [ ] Grass descriptor readback has stable report rows.
- [ ] Renderer parity failures are visible through `GameHost`.
- [ ] `game.tick({ time, dt })` remains compatible.
- [ ] `game.tick({ time, dt, actions })` produces deterministic action results.
- [ ] `walk-the-path` completes idempotently.
- [ ] `inspect-tree` completes idempotently.
- [ ] Invalid action and unknown target return stable rejected results.
- [ ] `snapshot.gameplay` exists.
- [ ] `npm run check` includes the new fixtures.

## Stop conditions

Do not proceed into new art, new areas, audio, inventory, first-person controls, or DSK extraction until the fixture gate above is passing.