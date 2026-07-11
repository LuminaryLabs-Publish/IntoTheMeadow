# Lifecycle Control Reachability Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-28-12-04-00`

## Current control surfaces

### Boot caller

```txt
startWebHost(...).catch(...)
```

The resolved controller is not assigned, returned, or exposed.

### Returned host controller

```txt
game
renderer
planEnhancer
editorBridge
stop()
start()
```

This surface exists only for a direct importer that retains the resolved promise value.

### GameHost

```txt
build
getState
getSnapshot
getDiagnostics
getRenderPlan
getRenderSnapshot
getRenderEnhancerSnapshot
game
```

No lifecycle state or command is exposed.

### Browser editor bridge

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

No stop, start, restart, dispose, or lifecycle-journal capability exists.

## Reachability result

```txt
normal route:
  lifecycle controller unreachable

GameHost:
  lifecycle controller unreachable

browser editor:
  lifecycle controller unreachable

fatal screen:
  no dispose/retry transaction

direct module importer:
  stop/start reachable
  restart/dispose/state/result unreachable
```

## Result-model gap

Current `stop()` and `start()` return `undefined`. They expose no:

```txt
commandId
status
reason
stateBefore
stateAfter
runId
cancelledRafId
scheduledRafId
resource changes
```

## Required command surface

GameHost and editor should delegate to the same session authority:

```txt
runtime.lifecycle.get
runtime.lifecycle.start
runtime.lifecycle.stop
runtime.lifecycle.restart
runtime.lifecycle.dispose
runtime.lifecycle.getJournal
```

Each command must return a detached typed result.

## Admission rules

```txt
start while running     -> no_op
start while stopped     -> completed
start after disposed    -> rejected
stop while running      -> completed
stop while stopped      -> no_op
restart while running   -> completed
restart while stopped   -> completed
dispose while live      -> completed
dispose while disposed  -> no_op
command during teardown -> rejected
```

## Global conflict rules

If another owner replaces `GameHost` or `NexusEditorEnvironment`, session disposal must not delete or overwrite the newer owner. It must publish `lost_ownership`.

## Fixture requirement

The same fake session must be driven through:

```txt
direct controller
GameHost adapter
browser editor capability
```

All three paths must produce equivalent terminal statuses and reason codes.
