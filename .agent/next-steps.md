# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T19-48-09-04-00`

## Goal

Create one authoritative browser/editor runtime session that can start, stop, restart, fail, and dispose deterministically while preserving the current source plan, renderer output, GameHost legacy reads, and editor protocol.

## Current next build slice

```txt
IntoTheMeadow Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
```

## Plan ledger

```txt
[ ] Preserve the current external meadow source URL and commit pin.
[ ] Preserve render-plan schema, topology keys, shaders, mesh output, screenshots, and existing read methods.
[ ] Add a session id and run id.
[ ] Add explicit lifecycle states: created, starting, running, stopped, disposing, disposed, failed.
[ ] Retain the active requestAnimationFrame id.
[ ] Make start, stop, restart, and dispose return accepted/rejected/no-op results with stable reasons.
[ ] Cancel the retained RAF before stop/dispose/restart transitions complete.
[ ] Prevent stop/start races from creating multiple recursive frame loops.
[ ] Add a resource ownership ledger for game, enhancer, renderer, and editor bridge.
[ ] Add a global lease ledger for GameHost and NexusEditorEnvironment.
[ ] Add ordered reverse cleanup for partial startup and first-frame failure.
[ ] Invoke editorBridge.dispose() and renderer.dispose() from the session owner.
[ ] Invalidate enhancer cache during terminal disposal.
[ ] Make disposal idempotent and terminal.
[ ] Add lifecycle status and bounded result-journal readback through GameHost.
[ ] Add runtime.getLifecycle, runtime.stop, runtime.restart, runtime.dispose, and runtime.getLifecycleJournal editor capabilities.
[ ] Add DOM-free lifecycle state/result fixtures.
[ ] Add focused browser fixtures for RAF cancellation, listener cleanup, global ownership, and WebGL disposal.
[ ] Prove repeated restart produces exactly one active frame loop.
[ ] Wire lifecycle fixtures into npm run check.
[ ] Keep interaction-command/objective-progress work queued immediately after lifecycle proof.
[ ] Preserve external-source, mesh-contribution, and registry-truth companion gates.
[ ] Update repo-local and central ledgers after implementation lands.
```

## Suggested files

```txt
src/runtime/create-runtime-session.js
src/runtime/lifecycle-state.js
src/runtime/lifecycle-results.js
src/runtime/resource-ownership-ledger.js
src/runtime/global-exposure-lease.js
src/hosts/web-host.js
src/boot/boot-game.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
src/game/enhance-render-plan.js
tests/runtime-session-lifecycle-smoke.mjs
tests/runtime-stop-restart-smoke.mjs
tests/runtime-dispose-idempotency-smoke.mjs
tests/runtime-fatal-rollback-smoke.mjs
tests/editor-listener-cleanup-smoke.mjs
tests/global-exposure-lease-smoke.mjs
package.json
```

## Lifecycle result row

```txt
{
  sessionId,
  runId,
  sequence,
  command,
  status: accepted | rejected | no-op,
  reason,
  stateBefore,
  stateAfter,
  rafOwned,
  disposedResources,
  releasedGlobals,
  errors
}
```

## Implementation order

```txt
1. Define session identity, lifecycle states, and result schemas.
2. Retain and cancel RAF ownership.
3. Add resource and global lease ledgers.
4. Add idempotent stop and terminal dispose.
5. Add reverse-order startup rollback.
6. Add coordinated restart.
7. Project lifecycle readback through GameHost and the editor bridge.
8. Add DOM-free and browser lifecycle fixtures.
9. Wire fixtures into npm run check.
10. Resume the interaction-command/objective-progress slice.
```

## Stop condition

Stop when repeated start/stop/restart/dispose cycles prove one active RAF while running, zero active RAFs while stopped/disposed, one-time renderer/editor cleanup, no session-owned globals or listeners after disposal, stable lifecycle result rows, and unchanged normal render output.