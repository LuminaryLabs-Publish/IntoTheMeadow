# Deploy Audit: Check Fixture Wire Map

**Timestamp:** `2026-07-09T22-40-25-04-00`

## Current validation scripts

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
node tests/renderer-v2-smoke.mjs
node tests/deterministic-scene-smoke.mjs
```

## Missing fixture gates

```txt
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
```

## Deployment finding

The repo already has a usable check command, but the command does not yet prove render consumption rows or action-result rows.

Do not change deployment or Pages before the proof files exist.

## Next safe package.json change

Only after source files and tests exist, extend check to:

```txt
node tests/static-smoke.mjs
node tests/dsk-registry-smoke.mjs
node tests/render-plan-smoke.mjs
node tests/renderer-v2-smoke.mjs
node tests/deterministic-scene-smoke.mjs
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
```

## Validation this pass

```txt
runtime source changed: no
package.json changed: no
npm run check: not run
browser smoke: not run
fixture run: not run because fixture files do not exist yet
```
