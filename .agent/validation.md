# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T19-48-09-04-00`

## Validation performed this pass

This was a documentation-only breakdown using authenticated GitHub reads and direct updates to `main`.

```txt
full accessible Publish inventory reviewed: yes
central ledger comparison performed: yes
selected repository root .agent reviewed: yes
browser boot and host lifecycle sources inspected: yes
game construction and reset sources inspected: yes
GameHost global exposure inspected: yes
editor listener/global cleanup inspected: yes
renderer disposal inspected: yes
plan-enhancer invalidation inspected: yes
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
WebGL smoke: not run
headless editor smoke: not run
lifecycle fixtures: not run because they do not exist yet
```

## Source inspection completed

```txt
package.json
index.html
src/boot/boot-game.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/enhance-render-plan.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
src/renderers/meadow-webgl-renderer-v2-compatible.js
src/renderers/meadow-webgl-renderer-v2.js
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

Existing checks cover static structure, DSK registry, render-plan behavior, renderer v2, deterministic-scene reachability, and editor environment/command/loop reachability. They do not prove lifecycle state, RAF uniqueness, stop/restart behavior, cleanup ordering, global ownership, fatal rollback, or disposal idempotency.

## Required next checks

```txt
node tests/runtime-session-lifecycle-smoke.mjs
node tests/runtime-stop-restart-smoke.mjs
node tests/runtime-dispose-idempotency-smoke.mjs
node tests/runtime-fatal-rollback-smoke.mjs
node tests/editor-listener-cleanup-smoke.mjs
node tests/global-exposure-lease-smoke.mjs
npm run check
npm test
npm run editor:smoke
```

## Required fixture assertions

```txt
one session owns at most one RAF
stop cancels RAF and blocks tick/render submission
restart cancels the old RAF before scheduling one new RAF
stop/start race cannot fork recursive loops
dispose calls renderer and editor cleanup exactly once
dispose invalidates enhancer cache and releases retained references
session-owned GameHost and NexusEditorEnvironment values are released safely
foreign/replaced global values are not removed
fatal construction and first-frame errors roll back partial resources
second stop/dispose returns explicit no-op results
start after dispose rejects with a stable reason
GameHost and editor lifecycle journals agree
normal render topology, vertex counts, and captures remain unchanged
```

## Validation warning

The existence of `stop()` and lower-level `dispose()` methods is not proof of lifecycle authority. The boot path currently discards the host controller, RAF ownership is not retained, and the host never composes the existing cleanup methods. The next gate must prove lifecycle state and resource/global cleanup through deterministic results and fixtures.