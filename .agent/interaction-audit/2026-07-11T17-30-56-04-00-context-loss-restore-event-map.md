# WebGL Context Loss and Restore Event Map

**Timestamp:** `2026-07-11T17-30-56-04-00`

## Summary

The canvas receives browser-owned WebGL context events, but no runtime domain currently admits, sequences or correlates them. Context loss and restoration must become typed external events fenced by runtime session and renderer identity.

## Plan ledger

**Goal:** make browser context events deterministic inputs to renderer lifecycle rather than implicit changes to hidden browser state.

- [x] Identify the canvas as the context-event source.
- [x] Identify the renderer instance and web host as consumers.
- [x] Identify missing session, generation and sequence fields.
- [x] Define loss and restore admission.
- [x] Define stale-event rejection.
- [x] Define render, diagnostics and capture consequences.
- [ ] Implement only after runtime listener ownership is explicit.

## Current event path

```txt
browser dispatches webglcontextlost
  -> no registered consumer
  -> runtime state unchanged
  -> RAF continues until a separate error or stop

browser dispatches webglcontextrestored
  -> no registered consumer
  -> program and buffers remain previous-generation references
  -> no candidate rebuild or recovered-frame proof
```

## Required event envelopes

```txt
WebglContextLostEvent
  runtimeSessionId
  rendererInstanceId
  canvasId
  eventSequence
  observedAt
  cancelable
  statusMessage

WebglContextRestoredEvent
  runtimeSessionId
  rendererInstanceId
  canvasId
  eventSequence
  observedAt
  previousContextGeneration
```

## Admission rules

```txt
canvas belongs to the active renderer instance
renderer belongs to the active runtime session
event sequence is newer than the last accepted event
loss accepted only from ready or recovered
restore accepted only from lost or failed-recoverable
stale renderer/session events return typed rejection
repeated duplicate browser events are idempotent
```

## Required interaction flow

```txt
loss event
  -> preventDefault
  -> admit event
  -> pause renderer submissions
  -> revoke capture success
  -> publish lost diagnostics
  -> retain browser loop only as lifecycle policy permits

restore event
  -> admit event
  -> enter restoring
  -> rebuild staged GPU resources
  -> render candidate frame
  -> commit recovered generation
  -> restore capture and renderer readiness
```

## Event/result correlation

```txt
loss event sequence
  -> WebglContextLossResult
  -> resource-generation invalidation
  -> committed-frame invalidation

restore event sequence
  -> WebglContextRestoreResult
  -> resource-generation commit
  -> first recovered frame receipt
  -> readiness transition
```

## Stale and duplicate cases

```txt
loss from disposed renderer
restore from prior runtime session
duplicate loss sequence
restore without accepted loss
second restore while already recovered
loss during candidate recovery frame
stop/dispose racing with restore
```

Each case must produce one typed result and no partial GPU-resource publication.

## Listener ownership

The runtime session lifecycle authority must lease and retire:

```txt
webglcontextlost listener
webglcontextrestored listener
error projection listener if used
context recovery journal subscription
```

Disposal must remove listeners before releasing renderer and canvas ownership so late events cannot reanimate a retired renderer.
