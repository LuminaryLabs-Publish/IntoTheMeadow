# Committed Frame Observation DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T00-30-48-04-00`

## Current ownership map

```txt
game
  owns mutable state pointer through immutable state replacement

plan enhancer
  owns cached enhanced plan and cache counters

renderer
  owns WebGL resources, mesh cache, and latest renderer snapshot

web host
  owns lastPlan and lastRender references

GameHost
  projects independently sourced state, raw plan, enhanced plan, renderer, and enhancer facts

browser editor
  can mutate game state directly and capture the current canvas

Node editor
  rebuilds plan, mesh, metrics, and synthetic capture on demand
```

No owner commits those facts as one frame.

## Required parent domain

```txt
committed-frame-authority-domain
```

Owns only coordination metadata:

```txt
sessionId
runId
nextFrameRequestId
nextCommittedFrameId
lastCommittedFrame
bounded committed journal
bounded failed-frame journal
frame admission and terminal publication policy
```

It must not permanently own terrain, grass, mesh, WebGL buffers, or source-provider state.

## Candidate kits

```txt
frame-request-kit
frame-source-adapter-kit
frame-sequence-kit
frame-staging-kit
staged-state-kit
state-fingerprint-kit
raw-plan-fingerprint-kit
enhanced-plan-fingerprint-kit
render-submission-kit
render-consumption-row-kit
canvas-commit-ack-kit
frame-commit-kit
frame-result-kit
frame-failure-row-kit
frame-journal-kit
frame-observation-projection-kit
GameHost-frame-observation-kit
browser-editor-frame-command-kit
browser-editor-capture-correlation-kit
node-frame-fixture-adapter-kit
browser-node-frame-parity-kit
atomic-frame-fixture-kit
```

## Provider contracts

```txt
game provider
  stageTick(previousState, input) -> stagedState
  stageReset(previousState) -> stagedState
  commitState(stagedState, committedFrameId)

plan provider
  deriveRawPlan(stagedState, requestedTime) -> rawPlan
  enhance(rawPlan) -> enhancedPlan

renderer provider
  render({ frameRequestId, enhancedPlan }) -> renderConsumptionRow
  acknowledgeCanvas({ frameRequestId }) -> canvasCommitAck

projection providers
  publishHUD(committedFrame)
  publishGameHost(committedFrame)
  publishEditor(committedFrame)
```

## Commit rule

```txt
stage state
  -> derive raw plan
  -> derive enhanced plan
  -> render
  -> acknowledge canvas
  -> create immutable committed frame
  -> commit game state
  -> move lastCommittedFrame pointer
  -> project HUD/GameHost/editor
```

Any failure before commit creates a failed-frame row and leaves `lastCommittedFrame` unchanged.

## Boundary rule

Lifecycle authority owns when a frame may run. Frame authority owns whether a requested frame commits. Source, game, enhancer, renderer, HUD, GameHost, and editor remain providers or consumers.
