# Deploy Audit: Check Headless Fixture Gate

**Timestamp:** `2026-07-10T01-38-16-04-00`

## Current validation surface

`package.json` exposes a useful check stack:

```txt
npm run check
npm test
npm run editor
npm run editor:status
npm run editor:inspect
npm run editor:capture
npm run editor:loop
npm run editor:browser
npm run editor:smoke
```

`npm run check` currently runs static, DSK registry, render plan, renderer v2, deterministic scene, and headless editor environment/command/loop smokes.

## Current validation gap

The check stack still does not prove:

```txt
render consumption ledger rows
grass consumption ledger rows
action result fixture rows
objective progress rows
GameHost proof projection rows
headless editor observation ledger rows tied to render/action proof
```

## Required next tests

```txt
tests/render-consumption-ledger-smoke.mjs
tests/grass-consumption-ledger-smoke.mjs
tests/action-result-fixture-smoke.mjs
tests/headless-editor-proof-ledger-smoke.mjs
```

## Required check wiring next

After proof modules exist, extend `npm run check` with:

```txt
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
node tests/headless-editor-proof-ledger-smoke.mjs
```

## Validation status for this pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm test: not run
browser smoke: not run
DOM-free render/action fixture: not run because proof files do not exist yet
headless editor smoke: not run in this docs-only pass
pushed to main: yes, documentation only
```
