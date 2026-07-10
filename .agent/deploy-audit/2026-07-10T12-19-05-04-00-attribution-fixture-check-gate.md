# Deploy Audit: Attribution Fixture Check Gate

**Timestamp:** `2026-07-10T12-19-05-04-00`

## Current validation commands

```txt
npm run check
npm test
npm run editor:smoke
npm run editor:loop
npm run editor:browser
```

## Current pass

```txt
runtime source changed: no
npm run check: not run
npm test: not run
browser smoke: not run
headless editor smoke: not run
DOM-free attribution fixtures: not run because proof files do not exist yet
```

## Next fixture commands to add

```txt
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
node tests/headless-editor-proof-ledger-smoke.mjs
```

## Gate requirement

`npm run check` should not be treated as complete for this slice until it covers render descriptor attribution, grass source/render parity, action/objective results, GameHost proof projection, and headless editor observation rows.

## Recommendation

Add DOM-free proof fixtures first. Browser/editor smoke should come after the source-owned proof rows exist.
