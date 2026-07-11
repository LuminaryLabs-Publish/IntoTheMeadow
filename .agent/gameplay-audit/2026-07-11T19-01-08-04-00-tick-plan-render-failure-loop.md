# Tick, Plan and Render Failure Loop

**Timestamp:** `2026-07-11T19-01-08-04-00`

## Current loop

```txt
RAF
  -> game.tick increments state.frame
  -> plan derives from the advanced state/time
  -> lastPlan publishes
  -> render attempts
  -> failure stops future RAF callbacks
```

## Gameplay risk

The simulation step is committed before the route knows whether the resulting frame can be validated and rendered. When rendering fails:

```txt
state.frame can advance without a visible frame
lastTick can describe work never presented
future objective or interaction state could advance invisibly
save/replay could retain an unpresented mutation
manual runtime.tick can continue after fatal state
runtime.reset can replace state while the canvas remains failed or stale
```

The current game is mostly descriptor-backed and frame-only, but this ordering becomes a direct progression defect once path movement, inspection, objectives, story or persistence become active.

## Required gameplay transaction

```txt
frame request
  -> admitted simulation candidate
  -> candidate state and gameplay results
  -> candidate render plan
  -> successful render submission
  -> committed frame
  -> gameplay/public observation commit
```

On failure:

```txt
candidate gameplay result rejected or explicitly retained as unpresented
previous committed gameplay/frame observation remains authoritative
mutation commands quarantined
recovery policy selected
```

## Required result fields

```txt
frameRequestId
inputCommandIds
previousStateRevision
candidateStateRevision
previousCommittedFrameId
candidatePlanRevision
renderStatus
gameplayCommitStatus
presentationStatus
failureId
```

## Fixture cases

```txt
render failure after tick does not silently commit gameplay progression
manual tick during fatal state is rejected
reset during fatal state is rejected or enters an explicit replacement transaction
future path-progress/inspection actions cannot commit without frame policy
cold restart retires predecessor pending gameplay work
replay distinguishes committed from rejected candidate steps
```

No gameplay behavior changed in this pass.