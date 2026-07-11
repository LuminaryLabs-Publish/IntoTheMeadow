# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T00-30-48-04-00`

## Validation performed this pass

This was a documentation-only breakdown using authenticated GitHub reads and direct updates to `main`.

```txt
full accessible Publish inventory reviewed: yes
central ledger comparison performed: yes
all eligible repositories confirmed tracked: yes
selected repository root .agent reviewed: yes
AGENTS.md reviewed: yes
index and boot entry inspected: yes
web-host frame and observation publication inspected: yes
game creation/tick/reset/snapshot inspected: yes
GameHost exposure inspected: yes
browser editor tick/reset/capture/snapshot inspected: yes
Node headless environment build/capture inspected: yes
render-plan enhancer cache/snapshot inspected: yes
WebGL render/snapshot/dispose inspected: yes
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
lifecycle fixtures: unavailable
atomic-frame fixtures: unavailable
browser/Node parity fixture: unavailable
pushed to main: yes
central ledger updated: yes
central change log added: yes
```

## Source inspection completed

```txt
AGENTS.md
index.html
package.json
src/boot/boot-game.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-state.js
src/game/game-snapshot.js
src/game/enhance-render-plan.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
src/renderers/meadow-webgl-renderer-v2-compatible.js
src/renderers/meadow-webgl-renderer-v2.js
scripts/into-the-meadow-environment.mjs
tests/headless-editor-environment-smoke.mjs
.agent lifecycle/frame/source documentation
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

Existing checks cover static structure, registry, render-plan behavior, renderer v2, deterministic scene reachability, and editor environment/command/loop reachability.

They do not prove:

```txt
one authoritative runtime session
one-active-RAF invariant
startup rollback and terminal disposal
one frame request to zero-or-one commit
no partial publication after render failure
state/raw-plan/enhanced-plan/render/canvas coherence
GameHost atomic snapshot coherence
browser editor tick/reset frame commitment
capture expected-frame correlation
browser WebGL versus Node synthetic observation parity
failed-frame pointer stability
```

## Required atomic-frame checks

```txt
node tests/committed-frame-coherence-smoke.mjs
node tests/render-failure-no-partial-publish-smoke.mjs
node tests/editor-tick-frame-commit-smoke.mjs
node tests/reset-frame-commit-smoke.mjs
node tests/capture-frame-correlation-smoke.mjs
node tests/gamehost-frame-snapshot-smoke.mjs
node tests/browser-node-frame-parity-smoke.mjs
node tests/failed-frame-pointer-stability-smoke.mjs
```

Assertions:

```txt
committedFrameId is monotonic within one run
one request produces zero or one commit
state becomes public only with its committed frame
raw and enhanced plan times match the request
renderer result carries the same frame request and topology
canvas acknowledgement carries the committed frame id
render failure preserves the previous lastCommittedFrame
GameHost and editor snapshot return the same state/plan/render tuple
editor tick/reset return a frame result and cannot silently mutate
capture reports or rejects expected-frame mismatch
Node synthetic output is marked non-browser and fingerprint-correlated
journals are bounded, immutable, and JSON-safe
```

## Validation warning

A visually rendered meadow or a successful existing smoke suite does not prove frame coherence. Current browser editor tick/reset can mutate state without rendering, and a failed renderer call can leave newer state and plan facts beside an older render snapshot and canvas.
