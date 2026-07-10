# Deploy Audit: Proof Row Fixture Check Gate

**Timestamp:** `2026-07-10T10-49-23-04-00`

## Current validation commands

From `package.json`:

```txt
npm run check
npm test
npm run editor:smoke
npm run editor:loop
npm run editor:browser
```

`npm run check` currently covers static, DSK registry, render plan, renderer v2, deterministic scene, and headless editor environment/command/loop smoke scripts.

## Validation not run this pass

```txt
npm run check: not run
npm test: not run
browser smoke: not run
headless editor smoke: not run
DOM-free proof-row fixtures: not run because proof files do not exist yet
```

## Next gate

Add proof fixture scripts before claiming proof-row coverage:

```txt
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
node tests/headless-editor-proof-ledger-smoke.mjs
npm run check
npm test
npm run editor:smoke
```

## Deployment stance

No branch or PR. Push documentation directly to `main` only.
