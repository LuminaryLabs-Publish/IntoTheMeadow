# Interaction Audit: Bridge Install, Query and Dispose Command Map

**Generated:** `2026-07-12T09-06-38-04-00`

## Current interaction surface

```txt
installIntoTheMeadowEditorBridge
  -> implicit install
  -> no command ID or predecessor check

bridge.invoke(action, arguments)
  -> clone arguments
  -> execute registered capability
  -> return completed/unavailable/failed
  -> failure appends an unsequenced journal entry

browser.getErrors
  -> clone complete error array

bridge.snapshot
  -> clone complete error array
  -> include runtime and renderer readback

bridge.dispose
  -> remove two listeners
  -> delete global only when pointer equality matches
  -> no result, idempotence proof or retained-journal policy
```

## Required command/result map

```txt
EditorBridgeInstallCommand
  -> installed | replaced | rejected | failed

EditorCapabilityInvokeCommand
  -> completed | unavailable | rejected-stale | failed

BrowserErrorQueryCommand
  -> page of entries + next cursor + dropped-entry summary

BrowserErrorAckCommand
  -> acknowledged sequence/cursor result

EditorBridgeStopCommand
  -> suspended | already-suspended | rejected

EditorBridgeDisposeCommand
  -> disposed | already-disposed | rejected-stale | failed
```

## Admission evidence

Every command must carry or resolve:

```txt
runtimeSessionId
hostGeneration
bridgeId
bridgeGeneration
predecessorBridgeGeneration
capabilityLeaseId when applicable
error cursor when applicable
```

## Boundary

Browser globals and event listeners are adapters. They must not decide ownership or replacement by assignment alone. The lifecycle authority must return typed results and preserve one current bridge generation.
