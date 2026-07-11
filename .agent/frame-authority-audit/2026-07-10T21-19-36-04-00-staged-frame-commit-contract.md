# Staged Frame Commit Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-10T21-19-36-04-00`

## Required state machine

```txt
requested
  -> simulating
  -> planning
  -> enhancing
  -> rendering
  -> committed

any non-terminal phase
  -> failed
```

Only `committed` updates the public last-frame pointer.

## Staged frame

```txt
{
  sessionId,
  runId,
  requestSequence,
  requestedAt,
  dt,
  stateBeforeFingerprint,
  stagedState,
  stagedStateFingerprint,
  sourceObservation,
  rawPlan,
  enhancedPlan,
  planFingerprint
}
```

## Committed frame

```txt
{
  frameId,
  requestSequence,
  simulationFrame,
  stateFingerprint,
  sourceEpoch,
  sourceFingerprint,
  planId,
  planFingerprint,
  topologyKey,
  renderResult,
  renderFingerprint,
  canvas,
  committedAt
}
```

## Invariants

```txt
one request produces zero or one committed frame
frame ids are monotonic within a run
failed requests never replace lastCommittedFrame
public state defaults to committed state, not staged state
plan and renderer topology keys match
capture frame id equals renderer and committed frame ids
journals are bounded and immutable
reset creates a new committed frame or returns an explicit non-commit result
```

## Ownership

The runtime session owns frame sequencing. The game produces staged state. The enhancer produces staged plans. The renderer produces a render-consumption result. The frame authority performs commit and publication.
