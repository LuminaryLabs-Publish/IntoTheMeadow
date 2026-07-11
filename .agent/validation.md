# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T22-58-36-04-00`

## Validation performed this pass

This was a documentation-only breakdown using authenticated GitHub reads and direct updates to `main`.

```txt
full accessible Publish inventory reviewed: yes
central ledger comparison performed: yes
all eligible repositories confirmed tracked: yes
selected repository root .agent reviewed: yes
AGENTS.md reviewed: yes
index and boot entry inspected: yes
web-host construction/frame/stop/start inspected: yes
game creation/tick/reset inspected: yes
GameHost global exposure inspected: yes
editor capabilities/listeners/dispose inspected: yes
WebGL renderer allocation/render/snapshot/dispose inspected: yes
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
lifecycle fixtures: not run because they do not exist yet
pushed to main: yes
central ledger updated: yes
central change log updated: yes
```

## Source inspection completed

```txt
AGENTS.md
index.html
package.json
src/boot/boot-game.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
src/renderers/meadow-webgl-renderer-v2-compatible.js
src/renderers/meadow-webgl-renderer-v2.js
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

Existing checks cover static structure, registry, render-plan behavior, renderer v2, deterministic-scene reachability, and editor environment/command/loop reachability.

They do not prove:

```txt
resolved host controller retention
one authoritative runtime session
one-active-RAF invariant
stop cancellation
restart generation fencing
startup rollback
first-frame failure cleanup
global lease restoration
listener release
terminal idempotent disposal
render rejection after disposal
lifecycle projection parity across controller/GameHost/editor
```

## Required lifecycle checks

```txt
node tests/runtime-session-lifecycle-smoke.mjs
node tests/runtime-single-raf-smoke.mjs
node tests/runtime-stop-cancels-raf-smoke.mjs
node tests/runtime-restart-generation-smoke.mjs
node tests/runtime-dispose-idempotency-smoke.mjs
node tests/runtime-fatal-rollback-smoke.mjs
node tests/runtime-global-lease-smoke.mjs
node tests/runtime-listener-release-smoke.mjs
node tests/runtime-render-after-dispose-smoke.mjs
```

Assertions:

```txt
start produces one owned RAF
repeated start while running is a no-op
stop cancels the exact owned RAF
stop then start cannot revive an old run callback
restart cancels old ownership before scheduling a new run
runId increments exactly once per restart
construction failure releases every acquired resource in reverse order
first-frame failure leaves no successor RAF, global, listener, or WebGL resource
only the owning session may remove or restore GameHost/NexusEditorEnvironment
dispose is terminal and idempotent
post-dispose commands are rejected with stable reasons
lifecycle journal is bounded and JSON-safe
controller, GameHost, and editor lifecycle snapshots match
normal render output and source selection remain unchanged
```

## Later required checks

```txt
committed-frame-coherence-smoke
render-failure-no-partial-publish-smoke
editor-tick-frame-commit-smoke
reset-frame-commit-smoke
capture-frame-correlation-smoke
meadow-source-provider-contract-smoke
meadow-source-fallback-parity-smoke
meadow-interaction-command-smoke
meadow-objective-progress-smoke
mesh-contribution-ledger-smoke
dsk-registry-truth-smoke
npm run check
npm test
npm run editor:smoke
```

## Validation warning

The current `stop()` result does not prove that animation work stopped. A pending callback remains registered, and `start()` can schedule another callback before the old one executes. Treat stop/restart, fatal failure, global cleanup, and disposal as unproven until deterministic lifecycle fixtures exist.
