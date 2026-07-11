# Partial Frame Fatal-State Gap

**Timestamp:** `2026-07-11T19-01-08-04-00`

## Current render path

```txt
game.tick
  -> plan enhancer
  -> lastPlan assignment
  -> renderer.resize
  -> ensureMesh and optional buffer replacement
  -> clear
  -> outline draw
  -> color draw
  -> renderer snapshot replacement
  -> lastRender assignment
  -> HUD projection
```

## Gap

The route does not stage these operations under one frame commit. A failure can occur after state, plan, canvas dimensions, buffers or pixels have changed but before the renderer snapshot, host observation or HUD advances.

Possible mixed states include:

```txt
new game frame + old canvas
new game frame + new lastPlan + old renderer snapshot
new buffers + cleared canvas + old public render observation
outline pass only + no committed frame result
successful draw + HUD exception + stopped host
current canvas bytes + stale renderer metadata
```

`showFatal()` does not invalidate or preserve one explicit committed-frame row. `renderer.capture` can still return canvas bytes and the latest independent renderer snapshot.

## Required frame failure boundary

```txt
previous committed frame
  -> immutable and retained

candidate frame
  -> state result
  -> raw/enhanced plan
  -> topology/mesh/resource candidate
  -> draw result
  -> HUD/readback candidate

success
  -> one atomic public commit

failure
  -> candidate rejected
  -> prior committed frame remains authoritative
  -> resource impact classified
  -> render/capture capabilities quarantined
```

## Required observation

```txt
FatalRenderObservation
  failureId
  sessionId
  rendererInstanceId
  frameRequestId
  previousCommittedFrameId
  candidateStateFrame
  candidatePlanId
  candidateTopologyKey
  rendererPhase
  resourceImpact
  canvasTrust
  captureAdmission
  recoveryPolicy
```

## Required proof

```txt
failure before draw preserves prior public frame
failure after buffer replacement identifies resource impact
failure after clear cannot be reported as the prior visible frame without canvas trust classification
failure between passes never commits a complete frame
failure after draw but before HUD keeps one consistent public decision
capture rejects ambiguous or stale canvas lineage
cold restart advances all frame and renderer identities
```

No render output changed in this documentation pass.