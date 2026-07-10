# Lifecycle Idempotency Fixture Gate

**Timestamp:** `2026-07-10T19-48-09-04-00`

## Required new fixtures

```txt
node tests/runtime-session-lifecycle-smoke.mjs
node tests/runtime-stop-restart-smoke.mjs
node tests/runtime-dispose-idempotency-smoke.mjs
node tests/runtime-fatal-rollback-smoke.mjs
node tests/editor-listener-cleanup-smoke.mjs
node tests/global-exposure-lease-smoke.mjs
```

## Required assertions

```txt
only one RAF is owned while running
stop cancels the owned RAF
stopped sessions do not tick or render
restart cancels the old RAF before scheduling one new RAF
stop/start cannot fork recursive frame loops
dispose calls editor and renderer cleanup exactly once
dispose releases only globals owned by the session
fatal startup and first-frame failures roll back partial construction
start after dispose rejects with a stable reason
second stop/dispose returns explicit no-op results
GameHost and editor return matching lifecycle observations
normal render topology, vertex count, and screenshots remain unchanged
```

## Package gate

Add the lifecycle fixtures to `npm run check` before adding interaction-command authority or additional visual systems.

## Deployment rule

GitHub Pages deployment should remain gated by the full check command. Lifecycle fixtures must be DOM-free where possible, with a focused browser fixture for real RAF cancellation, global ownership, WebGL disposal, and listener counts.

## Stop condition

The gate is complete when repeated start/stop/restart/dispose cycles leave exactly zero orphan RAF callbacks, zero orphan editor listeners, zero session-owned globals, and zero live renderer resources after terminal disposal.