# Deploy Audit: Proof Row Check Headless Fixture Gate

**Timestamp:** `2026-07-10T09-28-40-04-00`

## Current validation state

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm test: not run
browser smoke: not run
headless editor smoke: not run
DOM-free proof fixtures: not run
```

## Existing commands

```txt
npm run check
npm test
npm run editor:smoke
npm run editor:loop
npm run editor:browser
```

These are useful reachability checks, but they do not yet prove render, grass, action, objective, GameHost, or editor proof rows.

## Next fixture commands

```txt
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
node tests/headless-editor-proof-ledger-smoke.mjs
npm run check
npm test
npm run editor:smoke
```

## Gate condition

Do not treat a passing browser route or editor bridge smoke as enough. The next deployment confidence gate needs serializable DOM-free rows for descriptor consumption, grass parity, action/objective results, GameHost proof projection, and editor observations.
