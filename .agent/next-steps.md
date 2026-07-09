# Next Steps — IntoTheMeadow

**Timestamp:** `2026-07-09T09-41-24-04-00`

## Goal

Move `IntoTheMeadow` from descriptor-rich prototype toward a fixture-proven meadow game without turning the publish repo into the permanent home for reusable renderer systems.

## Immediate ledge

```txt
IntoTheMeadow Render Consumption Ledger + Action Replay Fixture Gate
```

## Implementation checklist for the next code pass

- [ ] Add pure `src/render-consumption/` modules for expected descriptor collection.
- [ ] Add pure `src/render-consumption/` modules for renderer snapshot normalization.
- [ ] Add render consumption row classification: `consumed`, `unsupported`, `missing`, `sparse`, `fallback-rendered`.
- [ ] Add grass consumption row classification for density texture, static batches, patches, draw groups, estimated instances, and estimated cards.
- [ ] Add pure `src/gameplay/` modules for `ActionFrame`, `ActionResult`, and target/action reason catalog.
- [ ] Add `path-progress` reducer using the existing `arrival-path` target and `walk-the-path` objective.
- [ ] Add `inspect` reducer using the existing `focal-tree` target and `inspect-tree` objective.
- [ ] Add objective completion projection without changing current route visuals.
- [ ] Add additive `GameHost.getSnapshot().renderParity` and `GameHost.getSnapshot().gameplay` proof records.
- [ ] Add DOM-free fixture rows for empty renderer snapshot, sparse renderer snapshot, grass count parity, valid path progress, valid inspect, repeated inspect/no-op, and objective completion.
- [ ] Wire fixture script into `npm run check` only after the fixture exists.

## First files to edit next

```txt
src/render-consumption/collect-render-expectations.js
src/render-consumption/normalize-renderer-snapshot.js
src/render-consumption/classify-render-consumption.js
src/render-consumption/classify-grass-consumption.js
src/gameplay/action-frame.js
src/gameplay/action-result.js
src/gameplay/reduce-meadow-action.js
src/gameplay/resolve-objective-progress.js
scripts/into-the-meadow-render-action-fixture.mjs
src/hosts/web-host.js
src/game/game-state.js
src/game/game-snapshot.js
package.json
```

## Stop condition for the next pass

Stop when `npm run check` proves DOM-free fixture rows for render consumption and gameplay action replay, while the browser route still boots through the existing external meadow kits and the existing visual output path.
