# Editor Mutation and Capture Correlation Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T00-30-48-04-00`

## Browser editor capabilities

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

## Current mutation asymmetry

```txt
runtime.tick -> game.tick -> returns state
runtime.reset -> game.reset -> returns state
```

Neither path requests a plan, render, HUD update, or frame commit.

## Current capture asymmetry

```txt
renderer.capture
  -> reads canvas dimensions
  -> calls canvas.toDataURL
  -> separately reads renderer snapshot
```

There is no guarantee that canvas bytes, renderer snapshot, GameHost state, or requested mutation refer to the same frame.

## Required correlation fields

```txt
editorCommandId
editorCapability
sessionId
runId
frameRequestId
committedFrameId
expectedCommittedFrameId
stateFingerprint
planFingerprint
renderFingerprint
canvasCommitId
```

## Required behavior

```txt
runtime.tick/reset:
  invoke frame authority
  return terminal command and frame result

scene/render reads:
  default to lastCommittedFrame

renderer.capture:
  accept optional expectedCommittedFrameId
  capture only after canvas acknowledgement
  report mismatch rather than silently pairing facts

snapshot:
  return one detached committed-frame projection
```

## Rejection cases

```txt
session stopped
session disposed
frame currently committing and policy disallows overlap
expected frame does not match
canvas acknowledgement unavailable
requested frame failed
```
