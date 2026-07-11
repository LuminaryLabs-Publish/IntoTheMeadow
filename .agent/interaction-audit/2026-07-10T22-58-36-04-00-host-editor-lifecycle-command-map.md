# Host and Editor Lifecycle Command Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T22-58-36-04-00`

## Current command surfaces

### Returned web-host controller

```txt
stop()
start()
```

Both return `undefined`. They expose no accepted/no-op/rejected/failed status, session identity, run identity, or cleanup result.

### GameHost

```txt
getState
getSnapshot
getDiagnostics
getRenderPlan
getRenderSnapshot
getRenderEnhancerSnapshot
game
```

GameHost exposes raw game access but no lifecycle commands or lifecycle snapshot.

### NexusEditorEnvironment

```txt
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

The editor bridge can dispose itself locally, but `dispose` is not registered as an invokable capability and is not coordinated with host/session disposal.

## Missing lifecycle command map

```txt
runtime.start
runtime.stop
runtime.restart
runtime.dispose
runtime.getLifecycleSnapshot
runtime.getLifecycleJournal
runtime.getResourceLedger
runtime.getGlobalLeases
```

Each command requires:

```txt
commandId
sessionId
expectedRunId
status
reason
stateBefore
stateAfter
runId before/after
RAF cancellation/scheduling facts
cleanup facts
errors
```

## Cross-surface parity requirement

The returned controller, GameHost, and editor must route through the same session authority.

```txt
controller.stop()
GameHost.stop()
editor invoke runtime.stop
```

must produce equivalent lifecycle results and the same final snapshot. No surface may directly mutate the stopped Boolean, schedule RAF work, delete globals, or dispose resources outside that authority.

## Post-disposal policy

```txt
read lifecycle snapshot/journal -> allowed
tick/reset/render/capture       -> rejected
start/restart                   -> rejected
stop/dispose again              -> no-op
browser error read              -> optional retained detached snapshot
```
