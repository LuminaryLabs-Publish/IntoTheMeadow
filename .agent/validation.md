# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T00-09-51-04-00`

## Validation performed this pass

This was a documentation-only breakdown pass through authenticated GitHub file updates.

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
npm test: not run
browser smoke: not run
DOM-free fixture: not run because render/action fixture files do not exist yet
pushed to main: yes
central ledger updated: yes
```

## Existing validation commands

From `package.json`:

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

## Required next validation commands

After the next source slice exists, add and run:

```txt
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
npm run check
```

## Required fixture coverage

```txt
render object descriptor consumed / ignored / unsupported rows
grass density texture readback rows
grass static batch and draw group rows
windField and postProcess rows
primitive fallback attribution row
missing renderer snapshot fallback row
path progress below threshold row
path progress complete objective row
inspect focal tree row
missing target row
unknown action row
GameHost legacy shape preserved row
```
