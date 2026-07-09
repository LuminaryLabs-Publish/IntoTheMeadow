# Deploy Audit — npm Check Fixture Wire Plan

**Timestamp:** `2026-07-09T12-08-46-04-00`

## Current validation path

`package.json` currently exposes:

```txt
npm run check
npm test
```

`npm run check` runs:

```txt
node tests/static-smoke.mjs
node tests/dsk-registry-smoke.mjs
node tests/render-plan-smoke.mjs
node tests/deterministic-scene-smoke.mjs
```

## Deploy posture

The repo is a static browser route intended for GitHub Pages. The next proof work should be DOM-free and Node-runnable so it can be wired into `npm run check` before any browser route or Pages artifact assumptions.

## Missing fixture gate

```txt
scripts/into-the-meadow-render-action-fixture.mjs does not exist yet.
No render-consumption fixture rows exist yet.
No grass-readback fixture rows exist yet.
No action-result fixture rows exist yet.
No objective-progress fixture rows exist yet.
No check-script fixture wire exists yet.
```

## Required next validation contract

```txt
npm run check
  -> static smoke
  -> DSK registry smoke
  -> render-plan smoke
  -> deterministic scene smoke
  -> into-the-meadow render/action fixture smoke
```

Wire the future fixture only after its source files exist and pass independently.

## Validation result for this pass

```txt
runtime source changed: no
package.json changed: no
npm run check: not run
browser smoke: not run
Pages smoke: not run
branch created: no
pull request created: no
.agent docs pushed to main: yes
```
