# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T18-22-01-04-00`

## Validation performed this pass

This was a documentation-only breakdown using authenticated GitHub reads and direct updates to `main`.

```txt
full accessible Publish inventory reviewed: yes
central ledger comparison performed: yes
selected repository root .agent reviewed: yes
runtime interaction/state/host/editor sources inspected: yes
runtime source changed: no
dependencies changed: no
package scripts changed: no
deploy workflow changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
npm test: not run
browser smoke: not run
headless editor smoke: not run
interaction command fixture: not run because it does not exist yet
objective progress fixture: not run because it does not exist yet
command replay fixture: not run because it does not exist yet
pushed to main: yes
central ledger updated: pending central sync
central change log updated: pending central sync
```

## Source inspection completed

```txt
package.json
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/content/interaction-targets/arrival-targets.js
src/content/objectives/arrival-objectives.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
.agent current audit set
central repo ledger and latest AetherVale selection sequence
```

## Existing checks

```txt
npm run check
npm test
npm run editor:smoke
npm run editor:loop
npm run editor:browser
```

Existing checks cover static structure, DSK registry, render plan, renderer v2, deterministic scene reachability, and editor environment/command/loop reachability. They do not prove gameplay command dispatch, target preflight, objective mutation, result retention, duplicate behavior, or replay fingerprints.

## Required next checks

```txt
node tests/meadow-interaction-command-smoke.mjs
node tests/meadow-target-preflight-smoke.mjs
node tests/meadow-objective-progress-smoke.mjs
node tests/meadow-command-replay-smoke.mjs
node tests/meadow-source-provenance-smoke.mjs
node tests/meadow-source-fallback-parity-smoke.mjs
node tests/mesh-contribution-ledger-smoke.mjs
node tests/dsk-registry-truth-smoke.mjs
npm run check
npm test
npm run editor:smoke
```

## Required fixture assertions

```txt
move/path-progress commands use stable status and reason codes
unknown target and unsupported action reject without mutation
out-of-range inspect rejects without mutation
successful path progress updates player and completes walk-the-path at 0.35
successful focal-tree inspection records inspected state and completes inspect-tree
duplicate inspect is an explicit no-op or rejection
command sequence and frame ids are ordered and bounded
reset restores canonical initial progression
same initial state plus same commands produces identical results and fingerprint
GameHost and editor return the same gameplay observation rows
renderer behavior and topology remain unchanged by gameplay authority work
source provenance, fallback parity, mesh contribution, and registry truth remain additive
```

## Validation warning

The current route can render and report frames while never executing its authored gameplay actions. A frame counter and editor `runtime.tick` capability are not evidence of an interaction loop. The next gate must prove command acceptance/rejection, state mutation, objective completion, replay stability, and bounded readback without depending on DOM input.