# Render Resource Lifecycle Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T22-58-36-04-00`

## Current renderer ownership

`createMeadowWebglRendererV2()` allocates:

```txt
WebGL/WebGL2 context
shader program
attribute buffers for the active mesh
mesh cache
renderer snapshot
precision-safe proxy/context cache
```

The base renderer exposes `dispose()` which deletes active buffers, deletes the program, and clears mesh cache references.

## Host gap

`startWebHost()` never calls `renderer.dispose()`.

```txt
stop
  -> only sets stopped = true

fatal frame
  -> only sets stopped = true and updates DOM

boot caller
  -> discards host controller

returned controller
  -> has no dispose method
```

The renderer can therefore remain reachable through the returned controller, `GameHost.game`, retained closures, and editor/render readback after the animation loop is considered stopped.

## Disposal-state gap

The renderer itself has no explicit lifecycle state.

```txt
dispose can be called repeatedly without a typed result
render after dispose is not rejected by contract
getSnapshot after dispose still returns the last active snapshot
canvas/context ownership is not represented
precision proxy context cache has no release observation
```

## Fatal-render gap

If `renderer.render(plan)` throws:

```txt
showFatal marks stopped
no successor RAF is scheduled by that callback
renderer resources remain allocated
editor listeners remain installed
GameHost and editor globals remain exposed
lastPlan may already represent the failed attempt
lastRender remains the previous snapshot
```

## Required render-lifecycle row

```txt
{
  sessionId,
  runId,
  rendererId,
  rendererVersion,
  state: "created" | "active" | "disposing" | "disposed" | "failed",
  programOwned,
  bufferCount,
  topologyKey,
  lastSuccessfulFrameId,
  disposedAt,
  disposeStatus,
  errors
}
```

## Fixture requirements

```txt
renderer cleanup is called exactly once by terminal host disposal
all active buffers and program ownership are released
fatal first render triggers rollback
render after disposal is rejected
snapshot exposes disposed state without claiming an active frame
normal render topology, counts, and visible output remain unchanged
```
