# Lost Context Visible-Frame Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T21-40-09-04-00`

## Summary

Renderer readback is currently a command-completion snapshot, not visible-frame evidence. After two `drawArrays` calls, the renderer publishes plan, topology, vertex and cache fields without context phase, context generation, draw result or compositor acknowledgement.

## Plan ledger

**Goal:** require renderer snapshots and visible-frame acknowledgements to remain truthful through context loss and restoration.

- [x] Trace draw submission and snapshot publication.
- [x] Confirm no `gl.isContextLost()` admission exists.
- [x] Confirm no context generation appears in renderer readback.
- [x] Confirm no restored-frame acknowledgement exists.
- [x] Define fail-closed snapshot rules.
- [ ] Implement and execute visible recovery fixtures later.

## Current projection

```txt
render(plan)
  -> use program
  -> bind/reuse mesh
  -> set uniforms
  -> draw outline pass
  -> draw color pass
  -> publish snapshot {
       planId, schema, topologyKey,
       vertexCount, triangleCount,
       cache stats, validation
     }
```

Missing from that snapshot:

```txt
renderer generation
context ID and generation
resource generation
context phase
draw admission result
outline-pass result
color-pass result
context-lost observation
restoration result
visible-frame receipt
```

## Gap

During context loss, WebGL calls may become ineffective or report context-related state without throwing a normal JavaScript exception. The current function still constructs and returns its success-shaped snapshot because snapshot publication is unconditional after the draw calls.

This audit does not claim a reproduced blank frame. It records that source cannot prove the public snapshot matches the visible canvas.

## Required projection contract

```txt
RenderAttemptResult {
  renderAttemptId
  rendererId
  contextGeneration
  resourceGeneration
  renderRevision
  status: Drawn | Suspended | Stale | Failed
  outlinePassResult
  colorPassResult
  contextPhase
  snapshotPublished
}
```

```txt
FirstRestoredFrameAck {
  acknowledgementId
  contextRecoveryResultId
  contextGeneration
  resourceGeneration
  renderRevision
  visibleSurfaceRevision
  observedAt
}
```

## Fail-closed rules

```txt
context phase != READY
  -> no draw calls
  -> no success-shaped snapshot
  -> publish suspended result

context changes during frame
  -> discard candidate success
  -> publish stale/lost result

restoration rebuild succeeds
  -> rendering may resume
  -> recovery is not complete until first matching visible-frame acknowledgement
```

## Proof required

```txt
loss before first frame
loss between two passes
snapshot suppression while lost
stale frame rejection after generation change
first visible frame after restoration
readback and screenshot parity
built-output and Pages parity
```
