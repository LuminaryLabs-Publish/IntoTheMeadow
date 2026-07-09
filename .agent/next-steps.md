# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-09T18-20-18-04-00`

## Current next build slice

```txt
IntoTheMeadow Render Action Readback + DOM-Free Fixture Gate
```

## Build checklist

```txt
[ ] Preserve current route shell, external kit URLs, renderer behavior, grass visuals, and GameHost legacy shape.
[ ] Add render expectation row helpers for objects, grassSystem, grassPatches, windField, postProcess, performance, and stats.
[ ] Add renderer snapshot normalizer that tolerates missing optional renderer.getSnapshot.
[ ] Add render consumption ledger rows with consumed / ignored / unsupported / fallback status.
[ ] Add grass consumption rows for density texture, static batches, patches, draw groups, shader wind, and LOD.
[ ] Add GameHost render proof projection additively without replacing existing getState/getSnapshot/getDiagnostics.
[ ] Add ActionFrame contract for path-progress and inspect actions.
[ ] Add target/action preflight helper for arrival-path and focal-tree.
[ ] Add ActionResult contract with accepted/rejected/skipped/unchanged statuses.
[ ] Add objective progress helper for walk-the-path and inspect-tree.
[ ] Add DOM-free fixture rows before wiring browser input.
[ ] Extend npm run check only after new fixture scripts exist.
[ ] Update central LuminaryLabs ledger after implementation lands.
[ ] Defer visual rewrite, renderer replacement, shared-kit promotion, external CDN changes, and new content.
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
tests/render-consumption-ledger-smoke.mjs
tests/grass-consumption-ledger-smoke.mjs
tests/action-result-fixture-smoke.mjs
package.json
src/boot/expose-game-host.js
src/game/game-snapshot.js
```

## Implementation order

```txt
1. render-expectations.js
2. renderer-snapshot-normalizer.js
3. render-consumption-ledger.js
4. grass-consumption-ledger.js
5. render ledger smoke test
6. action-frame.js
7. target-action-preflight.js
8. action-result.js
9. objective-progress.js
10. gameplay fixture rows and smoke test
11. additive GameHost/game snapshot proof fields
12. package.json check wiring
13. central ledger implementation log
```

## Stop condition

Stop the implementation slice when DOM-free rows prove descriptor consumption and action/objective mutation. Do not continue into visual fidelity or renderer extraction in the same cut.
