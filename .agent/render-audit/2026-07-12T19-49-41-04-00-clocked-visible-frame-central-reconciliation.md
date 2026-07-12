# Clocked Visible Frame Central Reconciliation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-49-41-04-00`

## Summary

The renderer consumes `renderPlan.time` as the shader wind clock and publishes mesh/cache statistics, but no frame, clock, scheduler, simulation or presentation identity. A visible meadow frame cannot be correlated with the simulation step that supposedly produced it.

## Plan ledger

**Goal:** make every accepted draw cite one admitted callback, one simulation batch and one render-time projection.

- [x] Trace RAF time into the render plan.
- [x] Trace render-plan time into `uTime`.
- [x] Inspect the renderer snapshot.
- [x] Confirm no simulation/clock correlation fields exist.
- [x] Define a visible-frame acknowledgement boundary.
- [ ] Implement and observe it in browser and Pages fixtures.

## Current flow

```txt
RAF now
  -> now / 1000
  -> game.getRenderPlan(time)
  -> planEnhancer.enhance(plan)
  -> renderer.render(plan)
  -> gl.uniform1f(uTime, renderPlan.time)
  -> outline draw
  -> color draw
  -> snapshot mesh/cache statistics
```

## Current snapshot fields

```txt
renderer id and version
plan id and schema
topology key
vertex/triangle/fallback counts
descriptor counts
rebuild and cache-hit counts
cache state
post-process mode
render-plan validation
```

## Missing provenance

```txt
runtimeSessionId
clockId and clockGeneration
schedulerGeneration
rafLeaseId and callbackSequence
frameId
clockSampleId and clockRevision
simulationStepBatchId
simulationRevision
simulationTime
interpolationAlpha
renderTimeProjectionId
droppedSeconds and deferredSeconds
presentation result
first visible frame acknowledgement
```

## Failure mode

After a long stall, absolute RAF time and wind animation jump immediately while simulation advances only one `1/60` step. The frame can look temporally current while gameplay truth remains nearly unchanged.

## Required projection

```txt
FrameResult
  -> RenderTimeProjection
  -> RenderCommand
  -> RenderSnapshot(frameId, clockRevision, simulationRevision)
  -> presentation observation
  -> FirstClockedFrameAck
```

## Validation gate

Required proof includes normal frames, first frame, long stalls, dropped/deferred time, pause/resume, stop/start and source/build/Pages parity. No such fixture currently exists.