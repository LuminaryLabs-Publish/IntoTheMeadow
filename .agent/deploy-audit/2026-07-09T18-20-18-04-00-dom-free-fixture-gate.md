# Deploy Audit: DOM-Free Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-09T18-20-18-04-00`

## Current validation commands

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

## Current deploy posture

The route is static and browser-hosted. This pass did not change runtime or deploy source.

## Missing validation gate

The next implementation should add DOM-free proof scripts before browser wiring:

```txt
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
npm run check
```

## Gate requirements

```txt
render expectation rows include consumed/fallback/ignored/unsupported statuses
grass rows include density/static batch/patch/draw group/shader wind/LOD readback
renderer snapshot normalizer handles missing optional snapshot
action result fixture proves accepted/rejected/skipped/unchanged rows
GameHost legacy fields remain additive-compatible
```

## Validation this pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
browser smoke: not run
fixture run: not run because fixture files do not exist yet
pushed to main: yes, docs only
```
