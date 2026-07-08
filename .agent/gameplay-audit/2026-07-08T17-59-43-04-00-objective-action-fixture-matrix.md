# Gameplay Audit — Objective Action Fixture Matrix

**Timestamp:** `2026-07-08T17-59-43-04-00`

## Current gameplay source

Initial state already has enough structure for a small deterministic gameplay loop:

```txt
player.position
player.yaw
player.pitch
player.pathProgress
progression.activeObjectiveId
progression.completedObjectiveIds
progression.storyBeatIds
world.meadowAreaId
world.wind
```

The first authored objectives are:

```txt
walk-the-path
  requiredAction: path-progress
  targetId: arrival-path
  completion.progressAtLeast: 0.35

inspect-tree
  requiredAction: inspect
  targetId: focal-tree
  completion.inspected: true
```

The first authored interaction targets are:

```txt
arrival-path
  type: path
  requiredAction: path-progress
  radius: 32

focal-tree
  type: inspectable
  requiredAction: inspect
  radius: 4.5
```

## Current gap

`advanceGameState(state, input)` only increments the frame and writes `lastTick`.

It does not consume:

```txt
actions[]
ActionFrame
path-progress
inspect
objective completion
result journals
snapshot.gameplay
```

## ActionFrame contract

```txt
ActionFrame
  id
  frame
  time
  dt
  action
  targetId
  value
  source
  player
```

## ActionResult contract

```txt
ActionResult
  id
  actionFrameId
  accepted
  changed
  action
  targetId
  reason
  completedObjectiveIds[]
  statePatch
  events[]
```

## Required reason constants

```txt
accepted-path-progress
accepted-inspect
unchanged-below-threshold
unchanged-already-complete
rejected-unknown-target
rejected-wrong-action-for-target
rejected-invalid-progress
rejected-invalid-action
```

## Required fixture matrix

```txt
1. tick-only compatibility
   input: { time, dt }
   expected: frame increments, no action results, existing call shape preserved

2. path progress below threshold
   input: path-progress arrival-path value 0.2
   expected: accepted, changed, pathProgress updated, walk-the-path not completed

3. path progress reaches threshold
   input: path-progress arrival-path value 0.35
   expected: accepted, changed, walk-the-path completed once

4. repeated path progress after completion
   input: path-progress arrival-path value 0.5 after walk-the-path complete
   expected: accepted or unchanged idempotent, no duplicate completion

5. inspect focal tree before active objective changes
   input: inspect focal-tree
   expected: accepted, changed, inspected target recorded; inspect-tree may complete when resolver allows target objective

6. inspect focal tree completes objective
   input: inspect focal-tree with inspect-tree active or resolver allowing queued completion
   expected: accepted, inspect-tree completed once

7. repeat inspect focal tree
   input: inspect focal-tree twice
   expected: second result unchanged-already-complete or unchanged-already-inspected

8. unknown target
   input: inspect missing-target
   expected: rejected-unknown-target, no state mutation

9. wrong action for target
   input: inspect arrival-path
   expected: rejected-wrong-action-for-target, no state mutation

10. invalid progress
   input: path-progress arrival-path value NaN or negative
   expected: rejected-invalid-progress, no state mutation

11. action journal projection
   input: accepted + rejected action sequence
   expected: lastActionResults and actionJournal preserve result metadata

12. snapshot.gameplay projection
   input: completed walk-the-path and inspect-tree
   expected: snapshot.gameplay exposes activeObjectiveId, completedObjectiveIds, storyBeatIds, lastActionResults, and actionJournal
```

## Source files for next implementation

```txt
src/gameplay-authority/action-reasons.js
src/gameplay-authority/action-frame.js
src/gameplay-authority/action-result.js
src/gameplay-authority/action-journal.js
src/gameplay-authority/reduce-path-progress.js
src/gameplay-authority/reduce-inspect-target.js
src/gameplay-authority/resolve-objective-completion.js
src/gameplay-authority/create-gameplay-snapshot.js
src/game/game-state.js
src/game/game-snapshot.js
tests/gameplay-authority-fixture-smoke.mjs
```

## Acceptance gate

The next gameplay implementation pass is complete when a DOM-free fixture proves the first two objectives can be completed idempotently and invalid action rows are rejected with stable reasons.
