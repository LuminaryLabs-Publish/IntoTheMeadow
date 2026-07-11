# Atomic Committed Frame Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T00-30-48-04-00`

## State machine

```txt
requested
  -> admitted
  -> staging-state
  -> deriving-raw-plan
  -> enhancing-plan
  -> rendering
  -> acknowledging-canvas
  -> committed

any non-terminal phase
  -> failed
```

Only `committed` moves the public `lastCommittedFrame` pointer.

## Frame request

```txt
{
  sessionId,
  runId,
  frameRequestId,
  source,
  commandId,
  requestedAt,
  requestedTime,
  dt
}
```

## Committed frame

```txt
{
  sessionId,
  runId,
  committedFrameId,
  frameRequestId,
  source,
  commandId,
  requestedTime,
  simulationFrame,
  state,
  stateFingerprint,
  rawPlan,
  rawPlanFingerprint,
  enhancedPlan,
  enhancedPlanFingerprint,
  topologyKey,
  renderResult,
  renderFingerprint,
  canvasCommit,
  committedAt
}
```

## Invariants

```txt
frameRequestId is monotonic within one run
committedFrameId is monotonic within one run
one request produces zero or one commit
failed requests never replace lastCommittedFrame
public state equals committedFrame.state
raw and enhanced plan requested times match
renderer topology matches enhanced plan topology
renderer plan fingerprint matches enhanced plan fingerprint
canvas commit points to the same frame request
HUD, GameHost, editor snapshot, and capture identify the same committed frame
reset produces a committed frame or explicit failure/no-op
journals are bounded, immutable, detached, and JSON-safe
```

## Failure policy

A failure row must preserve:

```txt
failed phase
stable reason
previous committed frame ID
staged fingerprints already produced
renderer/canvas partial-completion facts
timestamp
```

The failure row may be observed, but it must not be presented as a committed visual frame.
