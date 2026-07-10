# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T04-58-56-04-00`

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
DOM-free proof-row fixtures: not run because proof files do not exist yet
headless editor smoke: not run in this pass
pushed to main: yes
central ledger updated: yes
```

## Existing validation commands

From `package.json`:

```txt
npm run check
npm test
npm run editor:smoke
npm run editor:loop
npm run editor:browser
```

`npm run check` currently covers static, DSK registry, render plan, renderer v2, deterministic scene, and headless editor environment/command/loop smoke scripts. That is useful reachability coverage, but it is not yet proof-row coverage.

## Required next validation commands

After the next source slice exists, add and run:

```txt
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
node tests/headless-editor-proof-ledger-smoke.mjs
npm run check
npm test
npm run editor:smoke
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
wrong action for target row
unknown action row
GameHost legacy shape preserved row
GameHost proof projection row
headless editor command proof row
headless editor loop proof row
```

## Validation warning

Do not treat a passing browser route or editor bridge smoke as proof that renderer descriptors, grass descriptors, objectives, actions, or editor observations were consumed correctly. The next gate needs serializable rows that can be compared without the DOM.
