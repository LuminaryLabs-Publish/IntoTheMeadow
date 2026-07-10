# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T06-30-49-04-00`

## Current next build slice

```txt
IntoTheMeadow Proof Row Ledger Catch-up + Headless Editor Observation Gate
```

## Build checklist

```txt
[ ] Preserve the current route shell, external meadow-area URL, local renderer v2 adapter, grass visuals, GameHost legacy shape, and headless editor bridge.
[ ] Add render expectation row helpers for source objects, grassSystem, grassPatches, windField, postProcess, performance, stats, and editor-visible render facts.
[ ] Add renderer snapshot normalization for meadow-webgl-renderer-v2 aggregate snapshots.
[ ] Add render consumption ledger rows with consumed / ignored / unsupported / fallback status.
[ ] Tie primitiveFallbackCount back to descriptor ids or fallback classes.
[ ] Add grass consumption rows for density texture, static batches, patches, draw groups, shader wind, LOD, and debug summaries.
[ ] Add additive GameHost render/action/headless proof projection without replacing existing getState/getSnapshot/getDiagnostics.
[ ] Add ActionFrame contract for path-progress and inspect actions.
[ ] Add target/action preflight helper for arrival-path and focal-tree.
[ ] Add ActionResult contract with accepted/rejected/skipped/unchanged statuses.
[ ] Add objective progress helper for walk-the-path and inspect-tree.
[ ] Add DOM-free fixture rows before wiring browser input.
[ ] Add headless editor proof rows so editor command/loop smokes can assert source-backed proof, not just bridge reachability.
[ ] Extend npm run check after the new fixture scripts exist.
[ ] Update central LuminaryLabs ledger after implementation lands.
[ ] Defer visual rewrite, renderer replacement, shared-kit promotion, external CDN changes, new content, grass art tuning, camera/control rewiring, and editor command expansion.
```

## Suggested file targets

```txt
src/render-proof/render-expectations.js
src/render-proof/renderer-snapshot-normalizer.js
src/render-proof/render-consumption-ledger.js
src/render-proof/grass-consumption-ledger.js
src/render-proof/gamehost-render-proof.js
src/gameplay/action-frame.js
src/gameplay/target-action-preflight.js
src/gameplay/action-result.js
src/gameplay/objective-progress.js
src/gameplay/gameplay-fixture-rows.js
src/editor-proof/headless-editor-proof-ledger.js
tests/render-consumption-ledger-smoke.mjs
tests/grass-consumption-ledger-smoke.mjs
tests/action-result-fixture-smoke.mjs
tests/headless-editor-proof-ledger-smoke.mjs
package.json
src/boot/expose-game-host.js
src/game/game-snapshot.js
src/editor/install-editor-bridge.js
```

## Implementation order

```txt
1. Add render-expectations.js.
2. Add renderer-snapshot-normalizer.js.
3. Add render-consumption-ledger.js.
4. Add grass-consumption-ledger.js.
5. Add render and grass ledger smoke tests.
6. Add action-frame.js.
7. Add target-action-preflight.js.
8. Add action-result.js.
9. Add objective-progress.js.
10. Add gameplay fixture rows and smoke test.
11. Add headless-editor-proof-ledger.js and smoke test.
12. Add additive GameHost/game snapshot proof fields.
13. Tie editor bridge observations to proof ledger rows.
14. Wire package.json check commands after proof tests exist.
15. Log implementation centrally.
```

## Stop condition for the next implementation slice

Stop when DOM-free rows prove renderer descriptor consumption, grass source/render parity, path/inspect action results, objective progress, additive GameHost proof projection, and headless editor proof observation.

Do not continue into visual fidelity, renderer extraction, route/content expansion, camera/control rewiring, or shared-kit promotion in the same cut.
