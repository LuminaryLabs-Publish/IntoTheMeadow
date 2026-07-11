# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T21-19-36-04-00`

## Validation performed this pass

This was a documentation-only breakdown using authenticated GitHub reads and direct updates to `main`.

```txt
full accessible Publish inventory reviewed: yes
central ledger comparison performed: yes
all eligible repositories confirmed tracked: yes
selected repository root .agent reviewed: yes
AGENTS.md reviewed: yes
browser boot and web-host frame loop inspected: yes
game state/tick/reset inspected: yes
game snapshot inspected: yes
render-plan enhancer cache inspected: yes
WebGL renderer cache/render/snapshot/dispose inspected: yes
GameHost exposure inspected: yes
editor tick/reset/capture/snapshot capabilities inspected: yes
package validation scripts inspected: yes
runtime source changed: no
dependencies changed: no
package scripts changed: no
deploy workflow changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
npm test: not run
browser/WebGL smoke: not run
committed-frame fixtures: not run because they do not exist yet
pushed to main: pending this documentation commit
central ledger update: pending this documentation commit
central change log: pending this documentation commit
```

## Source inspection completed

```txt
AGENTS.md
README.md
package.json
src/boot/boot-game.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/game/enhance-render-plan.js
src/renderers/meadow-webgl-renderer-v2-compatible.js
src/renderers/meadow-webgl-renderer-v2.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
.agent current lifecycle/source-provider documentation
central repo ledger and current Publish selection sequence
```

## Existing checks

```txt
npm run check
npm test
npm run editor:smoke
npm run editor:loop
npm run editor:browser
```

Existing checks cover static structure, registry, render-plan behavior, renderer v2, deterministic-scene reachability, and editor environment/command/loop reachability.

They do not prove:

```txt
one authoritative runtime session
one RAF invariant
atomic frame staging and commit
no partial publication on render failure
state/plan/render/canvas frame correlation
editor tick/reset render coherence
capture-to-frame correlation
source identity inside committed frames
```

## Required committed-frame checks

```txt
node tests/committed-frame-coherence-smoke.mjs
node tests/render-failure-no-partial-publish-smoke.mjs
node tests/editor-tick-frame-commit-smoke.mjs
node tests/reset-frame-commit-smoke.mjs
node tests/capture-frame-correlation-smoke.mjs
```

Assertions:

```txt
successful frame publishes one immutable frame row
state, plan, renderer, HUD, GameHost, and editor expose the same frame id
state/plan/render fingerprints agree with the committed row
lastPlan and lastRender cannot advance independently
render failure preserves the previous committed frame
failed frame attempts retain phase and reason without becoming visible state
runtime.tick either commits a frame or reports uncommitted/staged status
runtime.reset commits a reset frame before public projections advance
capture returns the frame id represented by the canvas
frame journals are bounded and JSON-safe
normal topology, counts, shaders, and visual output remain unchanged
```

## Later required checks

```txt
runtime-session-lifecycle-smoke
runtime-stop-restart-smoke
runtime-dispose-idempotency-smoke
runtime-fatal-rollback-smoke
meadow-source-provider-contract-smoke
meadow-external-provider-smoke
meadow-source-fallback-parity-smoke
meadow-source-render-consumption-smoke
meadow-interaction-command-smoke
meadow-objective-progress-smoke
mesh-contribution-ledger-smoke
dsk-registry-truth-smoke
npm run check
npm test
npm run editor:smoke
```

## Validation warning

A green renderer snapshot does not prove that the live state, enhanced plan, canvas, and editor observation describe the same frame. The current host publishes those facts in separate phases and editor commands can advance state without a draw. Treat all current aggregate readback as non-atomic until committed-frame fixtures exist.
