# Deploy Audit: Proof Row Check Fixture Gate

## Current validation scripts

```txt
npm run check
npm test
npm run editor:smoke
npm run editor:loop
npm run editor:browser
```

`npm run check` currently covers static, DSK registry, render plan, renderer v2, deterministic scene, and headless editor environment/command/loop smokes.

## Gap

Those checks prove reachability, not source-consumer proof rows.

## Next gate

After implementation, add and run:

```txt
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
node tests/headless-editor-proof-ledger-smoke.mjs
npm run check
npm test
```

## This pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm test: not run
browser smoke: not run
headless editor smoke: not run
DOM-free proof-row fixtures: not run because proof files do not exist yet
pushed to main: yes
```
