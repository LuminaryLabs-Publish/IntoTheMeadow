# Interaction and Objective Fixture Deploy Gate

**Timestamp:** `2026-07-10T18-22-01-04-00`

## Current gate

`npm run check` validates static structure, registry, render plan, renderer, deterministic scene reachability, and editor bridge reachability. It does not prove that the authored gameplay actions mutate state or complete objectives.

## Required new fixtures

```txt
tests/meadow-interaction-command-smoke.mjs
tests/meadow-target-preflight-smoke.mjs
tests/meadow-objective-progress-smoke.mjs
tests/meadow-command-replay-smoke.mjs
```

## Required assertions before deploy

```txt
command schema rejects malformed inputs deterministically
target preflight returns stable status/reason codes
path progress mutates player state and completes walk-the-path
focal-tree inspection mutates interaction state and completes inspect-tree
duplicate commands do not duplicate events or completion
reset restores canonical initial state
same command list produces the same final fingerprint
GameHost and editor expose equivalent bounded observations
legacy render-plan and renderer smoke tests still pass
no renderer/topology regression is introduced
```

## Package gate

Add the four fixtures to `npm run check` after implementation. Keep `npm test` as the same aggregate gate unless a separate browser-only check is explicitly introduced.

## Deployment policy

```txt
interaction fixtures fail -> do not deploy
objective fixture fails -> do not deploy
replay fingerprint diverges -> do not deploy
legacy render checks fail -> do not deploy
source provenance or mesh truth work remains pending -> document explicitly, do not claim those gates complete
```

## Validation this pass

```txt
runtime source changed: no
package scripts changed: no
workflow changed: no
npm run check: not run
browser smoke: not run
new fixtures: not run because they do not exist yet
pushed to main: yes
central ledger updated: pending central sync
central change log updated: pending central sync
```