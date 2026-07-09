# Deploy Audit — Fixture Check Wire Map

**Timestamp:** `2026-07-09T03-35-07-04-00`

## Current validation surface

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

## Current deploy stance

The app is static and Pages-friendly.

Runtime source was not changed in this pass.

No branch or PR was created.

## Missing validation gates

The next source pass should add DOM-free proof scripts before any browser-only validation dependency.

Required new scripts:

```txt
tests/render-parity-fixture-smoke.mjs
tests/gameplay-action-replay-fixture-smoke.mjs
```

Required `npm run check` extension:

```txt
node tests/render-parity-fixture-smoke.mjs
node tests/gameplay-action-replay-fixture-smoke.mjs
```

## Render parity fixture rows

```txt
renderer snapshot missing
renderer snapshot sparse
renderer vertexCount present only
grass density texture expected but unsupported
grass patch count compatible
grass patch count mismatch
legacy enhancedRenderPlan preserved
```

## Gameplay fixture rows

```txt
legacy tick no actions
path-progress accepted incomplete
path-progress accepted objective complete
path-progress rejected out of range
inspect focal-tree accepted objective complete
inspect unknown target rejected
unknown action ignored
legacy snapshot fields preserved
```

## Pages check recommendation

After fixture scripts exist and pass locally, run a static route check against:

```txt
https://luminarylabs-publish.github.io/IntoTheMeadow/
```

Do not add this route check as a hard CI dependency until the DOM-free fixture gate is stable.

## Non-goals

```txt
Do not change GitHub Pages workflow in the next pass unless check wiring requires it.
Do not add Playwright before pure fixtures exist.
Do not deploy a runtime change without first passing npm run check.
```

## Validation for this audit pass

```txt
runtime source changed: no
package.json changed: no
local npm run check: no
browser smoke: no
Pages smoke: no
branch created: no
pull request created: no
pushed to main: yes
```
