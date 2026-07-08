# Next Steps — IntoTheMeadow

**Timestamp:** `2026-07-08T12-21-20-04-00`

## Goal

Move `IntoTheMeadow` from descriptor-rich prototype toward a fixture-proven meadow game without letting the publish repo become the permanent home for reusable renderer systems.

The immediate path is:

```txt
renderer parity proof
-> grass descriptor consumption readback
-> GameHost renderParity diagnostics
-> ActionFrame / ActionResult gameplay reducer gate
-> snapshot.gameplay projection
-> first objective loop proof
-> then visual/gameplay expansion
```

## Ordered next implementation ledges

### 1. Renderer parity reason catalog

Add stable reason constants for renderer parity classification.

Target files:

```txt
src/render-parity/render-parity-reasons.js
```

### 2. Expected descriptor collector

Collect expected descriptors from an enhanced render plan.

Target files:

```txt
src/render-parity/collect-expected-render-descriptors.js
```

### 3. Renderer snapshot consumption normalizer

Normalize renderer snapshot fields without requiring a specific renderer version.

Target files:

```txt
src/render-parity/normalize-renderer-snapshot-consumption.js
```

### 4. Descriptor parity comparator

Compare expected plan descriptors against consumed snapshot descriptors.

Target files:

```txt
src/render-parity/compare-render-descriptor-parity.js
```

### 5. GameHost renderParity projection

Keep existing GameHost fields and add parity diagnostics additively.

Target file:

```txt
src/hosts/web-host.js
```

### 6. Gameplay action contracts

Add optional action input while preserving `game.tick({ time, dt })`.

Target files:

```txt
src/gameplay-authority/action-reasons.js
src/gameplay-authority/action-frame.js
src/gameplay-authority/action-result.js
```

### 7. Objective reducers

Reduce existing descriptors into deterministic results.

Target files:

```txt
src/gameplay-authority/reduce-path-progress.js
src/gameplay-authority/reduce-inspect-target.js
src/gameplay-authority/resolve-objective-completion.js
```

### 8. Snapshot gameplay projection

Expose gameplay proof through snapshots.

Target files:

```txt
src/gameplay-authority/create-gameplay-snapshot.js
src/game/game-state.js
src/game/game-snapshot.js
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

- [ ] Renderer descriptors classify as consumed, unconsumed, unsupported, fallback, or missing.
- [ ] Grass descriptor readback has stable report shape.
- [ ] Renderer parity failures are visible through `GameHost`.
- [ ] `game.tick({ time, dt })` remains compatible.
- [ ] `game.tick({ time, dt, actions })` produces deterministic action results.
- [ ] `walk-the-path` completes idempotently.
- [ ] `inspect-tree` completes idempotently.
- [ ] Invalid action and unknown target return stable rejected results.
- [ ] `snapshot.gameplay` exists.
- [ ] `npm run check` includes the new fixtures.
