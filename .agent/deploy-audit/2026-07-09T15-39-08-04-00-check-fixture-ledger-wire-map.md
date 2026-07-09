# Deploy Audit: Check Fixture Ledger Wire Map

**Timestamp:** `2026-07-09T15-39-08-04-00`

## Current validation surface

`package.json` exposes:

```txt
npm run check
npm test
```

`npm run check` currently runs:

```txt
node tests/static-smoke.mjs
node tests/dsk-registry-smoke.mjs
node tests/render-plan-smoke.mjs
node tests/deterministic-scene-smoke.mjs
```

## Missing validation gates

```txt
render-consumption-ledger smoke
  should prove descriptor rows and renderer readback normalization.

grass-consumption-row smoke
  should prove grass source descriptors map to renderer readback or explicit fallback rows.

action-result fixture smoke
  should prove path-progress and inspect action rows without DOM.

GameHost proof smoke
  should prove additive state/snapshot projections preserve existing GameHost shape.
```

## Next package script target

After fixture files exist, extend `npm run check` with:

```txt
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
```

## Deploy rule

Do not change deployment, external CDN kit URLs, build artifact shape, or route shell during the proof-only fixture gate.
