# Next Steps — IntoTheMeadow

**Timestamp:** `2026-07-09T00-50-00-04-00`

## Goal

Move `IntoTheMeadow` from descriptor-rich prototype toward a fixture-proven meadow game without turning the publish repo into the permanent home for reusable renderer systems.

The immediate path is:

```txt
GameHost render parity consumer boundary
-> grass descriptor consumption rows
-> DOM-free render parity fixture
-> optional ActionFrame support
-> first objective ActionResult reducers
-> snapshot.gameplay projection
-> DOM-free gameplay action replay fixture
-> then visual/gameplay expansion
```

## Current ledge name

```txt
IntoTheMeadow RenderParity Consumer Snapshot + Gameplay Replay Fixture Gate
```

## Ordered next implementation ledges

### 1. Render parity reason catalog

Add stable reason constants.

Target file:

```txt
src/render-parity/render-parity-reasons.js
```

Reasons:

```txt
consumed
unconsumed
unsupported
fallback-rendered
missing-renderer-snapshot
missing-renderer-field
invalid-plan-descriptor
count-mismatch
not-applicable
```

### 2. Expected descriptor collector

Collect expected descriptors from an enhanced render plan.

Target file:

```txt
src/render-parity/collect-expected-render-descriptors.js
```

Expected groups:

```txt
base objects
outline policy / renderStyle
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

Return a stable unsupported/readback-absent shape when `renderer.getSnapshot?.()` is missing or sparse.

### 4. Descriptor parity report

Compare expected descriptors to normalized renderer readback.

Target file:

```txt
src/render-parity/create-render-parity-report.js
```

Output:

```txt
RenderParityReport {
  id
  passed
  summary
  rows
  reasons
}
```

### 5. Grass consumption rows

Create grass-specific parity rows from expected descriptors and renderer snapshot consumption.

Target file:

```txt
src/render-parity/create-grass-consumption-rows.js
```

### 6. GameHost render parity projection

Wire additively in `src/hosts/web-host.js` after:

```txt
const render = renderer.render(plan);
```

Expose:

```txt
GameHost.getSnapshot().renderParity
```

Do not remove existing snapshot/readback fields.

### 7. Action frame and result contracts

Add pure action/result contracts.

Target files:

```txt
src/gameplay/create-action-frame.js
src/gameplay/create-action-result.js
src/gameplay/action-result-reasons.js
```

### 8. Path progress and inspect reducers

Add the first two gameplay reducers.

Target files:

```txt
src/gameplay/reduce-path-progress-action.js
src/gameplay/reduce-inspect-target-action.js
src/gameplay/resolve-objective-completion.js
```

### 9. Snapshot gameplay projection

Additively expose:

```txt
snapshot.gameplay
```

Do not remove:

```txt
manifest
state
renderPlan
diagnostics
```

### 10. Fixture scripts

Add DOM-free smokes:

```txt
tests/render-parity-fixture-smoke.mjs
tests/gameplay-action-replay-fixture-smoke.mjs
```

Then append both to `npm run check`.

### 11. Fixture manifest rows

Add explicit fixture rows for:

```txt
renderer snapshot absent
renderer snapshot sparse
grass density texture expected but not consumed
grass draw group count mismatch
path-progress accepted
path-progress rejected out of range
inspect accepted for focal-tree
inspect rejected for unknown target
objective completion after accepted actions
legacy snapshot compatibility preserved
```

## Stop condition

Stop when:

```txt
npm run check covers render parity and gameplay replay fixture rows
GameHost snapshot has additive renderParity
game snapshot has additive gameplay branch
missing/sparse renderer snapshots are explicit reason rows
path-progress and inspect-tree produce ActionResult rows
legacy snapshot fields remain stable
```
