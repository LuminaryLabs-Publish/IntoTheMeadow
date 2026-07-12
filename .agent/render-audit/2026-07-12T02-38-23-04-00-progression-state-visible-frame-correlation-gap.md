# Render Audit: Progression State and Visible-Frame Correlation Gap

**Timestamp:** `2026-07-12T02-38-23-04-00`

## Current rendering loop

```txt
tick frame counter
  -> create time-overlaid source plan
  -> enhance plan
  -> render WebGL frame
  -> expose renderer snapshot
```

The render loop has no progression result, progression revision, objective transition, story transition or interaction receipt.

## Current gap

A future command could change state while the last rendered frame still describes the predecessor. Current observations independently read game state, render plan and renderer snapshot without one shared commit identity.

```txt
state frame: present
lastTick: present
progression revision: absent
last interaction result ID: absent
objective transition IDs: absent
story transition IDs: absent
render frame ID: absent
visible progression receipt: absent
```

## Required frame contract

```txt
CommittedMeadowFrame
  renderFrameId
  runtimeSessionId
  sceneId
  progressionEpoch
  progressionRevision
  lastProgressionResultId
  stateRevision
  sourcePlanRevision
  enhancedPlanRevision
  rendererGeneration
  presentedAt
```

## Required behavior

- Render only from an immutable committed state projection.
- Keep predecessor pixels if progression commit fails.
- Publish frame acknowledgement only after successful draw submission.
- Correlate HUD/story text with the same progression revision.
- Expose the receipt through clone-safe public and editor observations.
- Fence stale post-reset frame acknowledgements.

## Fixture gate

```txt
commit walk-the-path transition
render successor frame
assert snapshot, HUD, render observation and capture cite one revision
repeat for focal-tree inspection
fail a staged progression commit and preserve predecessor frame
reset and reject predecessor-frame acknowledgement
```
