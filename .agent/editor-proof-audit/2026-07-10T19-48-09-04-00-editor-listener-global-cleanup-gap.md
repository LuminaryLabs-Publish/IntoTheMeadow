# Editor Listener and Global Cleanup Gap

**Timestamp:** `2026-07-10T19-48-09-04-00`

## Existing cleanup

The editor bridge already has `dispose()` that removes its `error` and `unhandledrejection` listeners and deletes `globalThis.NexusEditorEnvironment` when the global still points to the same bridge.

## Missing orchestration

```txt
web-host never calls editorBridge.dispose()
boot path does not retain the host controller
GameHost has no unexpose/release function
editor capabilities cannot stop or dispose the browser session
error rows are unbounded for the lifetime of the bridge
repeated host construction can replace globals while old listeners remain active
```

## Required ownership rules

- Each installed bridge belongs to one session id.
- Each global assignment is represented by a lease containing the previous value and installed value.
- Disposal removes listeners exactly once.
- Disposal deletes or restores a global only when the session still owns it.
- Repeated construction cannot leave old listeners observing the new session.
- Error and lifecycle journals are bounded and JSON-safe.

## Required editor fixtures

```txt
install -> one error listener + one rejection listener
stop -> listeners retained for resumable session
restart -> listener counts unchanged
dispose -> listeners removed
second dispose -> no-op
construct session B after disposing A -> only B observes errors
replace global externally -> disposing A does not delete foreign value
```

## Additive capabilities

```txt
runtime.getLifecycle
runtime.stop
runtime.restart
runtime.dispose
runtime.getLifecycleJournal
browser.getListenerOwnership
browser.getGlobalLeaseSnapshot
```