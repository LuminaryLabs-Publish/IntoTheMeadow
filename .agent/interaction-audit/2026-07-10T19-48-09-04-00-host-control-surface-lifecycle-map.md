# Host Control Surface Lifecycle Map

**Timestamp:** `2026-07-10T19-48-09-04-00`

## Existing control surfaces

```txt
boot-game.js
  starts host and projects startup failure

returned web-host object
  stop()
  start()
  game
  renderer
  planEnhancer
  editorBridge

GameHost
  getState
  getSnapshot
  getDiagnostics
  getRenderPlan
  getRenderSnapshot
  getRenderEnhancerSnapshot
  raw game reference

NexusEditorEnvironment
  runtime.status
  runtime.getState
  runtime.getSnapshot
  runtime.tick
  runtime.reset
  scene.getRenderPlan
  scene.getStatistics
  renderer.getSnapshot
  renderer.getEnhancerSnapshot
  renderer.capture
  browser.getViewport
  browser.getErrors
```

## Gap

The only surface with `stop()` and `start()` is the object returned by `startWebHost`, but `boot-game.js` does not retain or publish it. GameHost and the editor bridge can inspect and tick the game while lacking session status, stop, restart, dispose, or teardown observations.

## Required additive commands

```txt
runtime.getLifecycle
runtime.stop
runtime.start
runtime.restart
runtime.dispose
runtime.getLifecycleJournal
```

## Result contract

```txt
{
  sessionId,
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

## Compatibility rule

Keep all existing GameHost and editor capabilities. Add lifecycle commands and JSON-safe observations without exposing additional mutable renderer or game internals.