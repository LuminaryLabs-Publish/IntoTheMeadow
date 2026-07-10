# Renderer Disposal and Orphaned Context Gap

**Timestamp:** `2026-07-10T19-48-09-04-00`

## Render loop

```txt
RAF callback
  -> get cached source plan with time overlay
  -> enhance plan
  -> validate contract
  -> build or reuse topology-keyed mesh
  -> outline draw
  -> cel/fog draw
  -> save renderer snapshot
  -> schedule next RAF callback
```

## Existing disposal service

`meadow-webgl-renderer-v2` already provides `dispose()` that deletes all attribute buffers, deletes the linked WebGL program, and clears the cached mesh reference.

## Gap

The browser host never invokes `renderer.dispose()` on:

```txt
manual stop
fatal render error
restart
page-level host replacement
editor-controlled session teardown
```

The host also does not retain the RAF id, so it cannot prove that no future callback can submit work against a disposed renderer.

## Required proof rows

```txt
sessionId
renderLoopId
rafIdBefore
rafCancelled
rendererDisposeCalled
bufferCountBefore
bufferCountAfter
programDeleted
renderAfterDisposeRejected
fatalRollbackCompleted
```

## Acceptance criteria

- `stop()` prevents additional frame submission but preserves resources only when explicitly documented as a resumable stop.
- `dispose()` cancels the retained RAF before deleting renderer resources.
- Disposal is idempotent.
- Rendering after disposal returns a stable rejection instead of using deleted GPU state.
- Restart creates one new render loop, not an additional loop.
- Fatal startup/render failure records rollback and releases every resource created before the failure.
- Current topology keys, mesh output, shader output, and render snapshots remain unchanged during normal running.