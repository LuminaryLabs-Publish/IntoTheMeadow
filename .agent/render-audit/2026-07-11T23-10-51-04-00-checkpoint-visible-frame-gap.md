# Checkpoint to Visible Frame Gap

**Timestamp:** `2026-07-11T23-10-51-04-00`

## Finding

The runtime can produce game snapshots and renderer snapshots, but no checkpoint identity is carried into render-plan construction, GPU state, canvas capture or a committed visible frame.

Current projection:

```txt
fresh game state
  -> static render plan
  -> enhancer
  -> renderer
  -> canvas
  -> independent game/render snapshots
```

Missing hydrated projection:

```txt
admitted checkpoint
  -> committed state revision
  -> derived render plan identity
  -> renderer commit
  -> first visible hydrated frame
  -> capture and diagnostics citing the same checkpoint
```

## Current gaps

```txt
checkpoint ID in game state: absent
checkpoint ID in render plan: absent
checkpoint ID in renderer snapshot: absent
checkpoint ID in browser capture: absent
hydration frame acknowledgement: absent
predecessor frame retention policy: absent
failed hydration rollback frame: absent
```

`createGameSnapshot()` includes manifest, state, render plan and diagnostics, but it is a live inspection packet rather than a persistence envelope or visible-frame receipt.

## Risk

A future load implementation could mutate state and report success before the render plan, renderer cache and canvas have projected that state. Capture or diagnostics could therefore describe different revisions.

## Required render contract

```txt
HydrationCommit
  checkpointId
  committedStateRevision
  renderInvalidationReason

HydratedFrameReceipt
  checkpointId
  stateRevision
  renderPlanRevision
  topologyKey
  rendererGeneration
  frameId
  captureEligible
```

## Required proof

```txt
load does not report visible success before a frame commits
failed hydration preserves the predecessor visible frame
render-plan rebuild or reuse is explicit and deterministic
renderer snapshot cites checkpoint and state revision
browser capture rejects pre-hydration or stale frames
reset and load cannot race to publish conflicting visible state
```

## Completion boundary

A parsed save is not visibly resumed until one committed canvas frame and its renderer/capture observations cite the admitted checkpoint and committed state revision.