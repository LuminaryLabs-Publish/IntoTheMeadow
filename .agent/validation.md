# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T19-48-39-04-00`

## Validation performed this pass

This was a documentation-only breakdown using authenticated GitHub reads and direct updates to `main`.

```txt
full accessible Publish inventory reviewed: yes
central ledger comparison performed: yes
all eligible root .agent timestamps compared: yes
selected repository root .agent reviewed: yes
browser boot and host lifecycle sources inspected: yes
external manifest and dynamic-import path inspected: yes
external meadow-area-kit pinned source inspected: yes
local fallback source inspected: yes
DSK install and provider-selection behavior inspected: yes
game source-plan caching and rebuild inspected: yes
game snapshot readback inspected: yes
Node render-plan and deterministic smoke paths inspected: yes
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
external provider fixture: not run because it does not exist yet
fallback parity fixture: not run because it does not exist yet
source render-consumption fixture: not run because it does not exist yet
pushed to main: yes
central ledger updated: yes
central change log updated: yes
```

## Source inspection completed

```txt
package.json
index.html
src/boot/boot-game.js
src/hosts/web-host.js
src/content/game-manifest.js
src/content/meadow-areas/arrival-meadow.js
src/content/meadow-areas/create-local-meadow-source-plan.js
src/game/create-into-the-meadow-game.js
src/game/game-snapshot.js
src/boot/install-dsks.js
tests/render-plan-smoke.mjs
tests/deterministic-scene-smoke.mjs
LuminaryLabs-Agents/NexusEngine-ProtoKits/protokits/meadow-area-kit/index.js
.agent current lifecycle and source-authority audit sets
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

Existing checks cover static structure, DSK registry, render-plan behavior, renderer v2, deterministic-scene reachability, and editor environment/command/loop reachability.

They do not prove:

```txt
lifecycle state and RAF uniqueness
stop/restart/dispose behavior
cleanup ordering and global ownership
fatal rollback
production external provider loading
explicit fallback policy
external/fallback parity
source-plan fingerprints and epochs
source identity propagation into renderer/GameHost/editor
source-aware gameplay target resolution
```

## Required lifecycle checks

```txt
node tests/runtime-session-lifecycle-smoke.mjs
node tests/runtime-stop-restart-smoke.mjs
node tests/runtime-dispose-idempotency-smoke.mjs
node tests/runtime-fatal-rollback-smoke.mjs
node tests/editor-listener-cleanup-smoke.mjs
node tests/global-exposure-lease-smoke.mjs
```

Assertions:

```txt
one session owns at most one RAF
stop cancels RAF and blocks tick/render submission
restart cancels the old RAF before scheduling one new RAF
stop/start race cannot fork recursive loops
dispose calls renderer and editor cleanup exactly once
session-owned GameHost and NexusEditorEnvironment values are released safely
fatal construction and first-frame errors roll back partial resources
second stop/dispose returns an explicit no-op
start after dispose rejects with a stable reason
normal render topology, counts, and captures remain unchanged
```

## Required source-provider checks

```txt
node tests/meadow-source-provider-contract-smoke.mjs
node tests/meadow-external-provider-smoke.mjs
node tests/meadow-source-fallback-parity-smoke.mjs
node tests/meadow-source-render-consumption-smoke.mjs
node tests/meadow-source-target-index-smoke.mjs
```

Assertions:

```txt
browser and Node adapters use the same provider contract
external provider URL, pinned commit, version, and selection reason are retained
external import/export/validation failures produce stable results
fallback policy is explicit
same provider/config produces the same source fingerprint
source epoch changes only on provider reselection or rebuild
fallback parity is classified rather than asserted
external and fallback plans pass the same enhancer/mesh/render consumer contract
render snapshots identify the consumed source epoch and fingerprint
arrival-path and focal-tree target facts come from the selected source
stale source target references reject without mutation
production external provider is exercised separately from offline deterministic fallback checks
```

## Later gameplay and proof checks

```txt
node tests/meadow-interaction-command-smoke.mjs
node tests/meadow-objective-progress-smoke.mjs
node tests/meadow-command-replay-smoke.mjs
node tests/mesh-contribution-ledger-smoke.mjs
node tests/dsk-registry-truth-smoke.mjs
npm run check
npm test
npm run editor:smoke
```

## Validation warning

A working `stop()` method does not prove lifecycle authority, and a green Node render-plan smoke does not prove the production external source. The current Node checks construct the local fallback while the deployed browser requires the CDN provider. Lifecycle and source-provider gates must both become explicit before interaction, deployment, or renderer evidence is considered complete.