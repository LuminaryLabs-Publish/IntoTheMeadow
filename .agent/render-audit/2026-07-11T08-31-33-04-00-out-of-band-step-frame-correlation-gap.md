# Out-of-Band Step and Frame Correlation Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T08-31-33-04-00`

## Finding

The visible browser frame is produced only by the RAF path, but the browser editor can mutate game state through `runtime.tick` and `runtime.reset` without invoking render-plan enhancement, WebGL rendering, HUD projection or a frame commit.

## Current paths

```txt
RAF path
  -> game.tick
  -> get raw render plan
  -> enhance plan
  -> assign lastPlan
  -> renderer.render
  -> assign lastRender
  -> update HUD

browser editor runtime.tick
  -> GameHost.game.tick
  -> return state
  -> no plan enhancement
  -> no renderer call
  -> no lastPlan update
  -> no lastRender update
  -> no canvas acknowledgement
```

The next RAF may later render, but there is no step ID or frame identity proving that it consumed the editor mutation.

## Clock-specific divergence

The RAF supplies wall-clock `time: now / 1000`. The editor capability defaults `time` to zero. A successful editor tick can therefore expose:

```txt
state.frame: advanced
state.lastTick.time: regressed to 0
lastPlan: from prior RAF
lastRender: from prior RAF
canvas: prior committed pixels
```

The renderer does not consume gameplay state today, but the architecture already advertises player, objective, story, camera and interaction DSKs. Once those services become visual, the divergence becomes directly observable.

## Required render contract

Each rendered frame must include:

```txt
sessionId
clockEpoch
stepCommandId
stepSequence
stateFrame
simulationTime
sourceRevision
topologyKey
bufferGeneration
renderCommitId
canvasCommitAcknowledged
```

## Required rejection behavior

```txt
out-of-band editor step while session policy forbids it -> rejected
stale expected state frame -> rejected
regressed target time -> rejected
non-finite delta or time -> rejected
render after disposed session -> rejected
```

## Fixture gate

```txt
1. Commit one RAF frame.
2. Invoke one browser-editor step.
3. Assert the step returns a typed accepted or rejected result.
4. If accepted, require exactly one subsequent render commit to reference its step sequence.
5. Capture state, plan, renderer snapshot and canvas under the same renderCommitId.
6. Repeat with time regression, stale expected frame, reset epoch and disposed session.
```

Do not treat a successful editor capability response as visible-frame proof.