# Deploy Audit: Headless Editor Check Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T03-01-42-04-00`

## Current package scripts

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

`npm run check` currently runs static, DSK registry, render plan, renderer v2, deterministic scene, and headless editor environment/command/loop smoke scripts.

## Current validation value

The existing checks are useful for:

```txt
static repo structure
DSK registry reachability
render plan contract reachability
renderer v2 aggregate behavior
deterministic scene output
headless editor environment presence
headless editor command path
headless editor loop path
```

## Missing gate value

The existing checks do not yet prove:

```txt
render expectation rows
renderer snapshot normalization rows
render consumption rows
grass consumption parity rows
ActionFrame rows
target/action preflight rows
ActionResult rows
objective progress rows
GameHost proof projection rows
headless editor proof ledger rows
```

## Next validation gate

After proof modules exist, extend `npm run check` with:

```txt
node tests/render-consumption-ledger-smoke.mjs
node tests/grass-consumption-ledger-smoke.mjs
node tests/action-result-fixture-smoke.mjs
node tests/headless-editor-proof-ledger-smoke.mjs
```

Then run:

```txt
npm run check
npm test
npm run editor:smoke
```

## Deployment posture

This pass did not change runtime source, package scripts, deployment config, or hosted output.

## Deferral boundary

Do not change publish/deploy configuration or visual runtime until the proof checks exist and pass locally.
