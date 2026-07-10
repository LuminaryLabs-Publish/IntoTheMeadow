# Path, Inspect, and Objective Gameplay Audit

**Timestamp:** `2026-07-10T18-22-01-04-00`

## Authored loop

```txt
start at arrival-meadow
  -> move along arrival-path
  -> reach pathProgress >= 0.35
  -> complete walk-the-path
  -> approach focal-tree
  -> inspect focal-tree
  -> complete inspect-tree
```

## Current runtime behavior

```txt
player.position remains { x: 0, y: 0, z: -36 }
player.pathProgress remains 0
activeObjectiveId remains walk-the-path
completedObjectiveIds remains []
no inspected target state exists
```

`advanceGameState()` changes only `frame` and `lastTick`, so neither objective can complete through browser, GameHost, editor, or fixture input.

## Required gameplay state

```txt
player.position
player.yaw
player.pathProgress
interaction.inspectedTargetIds
progression.activeObjectiveId
progression.completedObjectiveIds
progression.storyBeatIds
journal.lastSequence
journal.recentResults
```

## Required command behavior

```txt
move/path-progress
  -> clamp/validate value
  -> mutate player/path progress
  -> emit player.moved and path.progressed
  -> evaluate walk-the-path

inspect focal-tree
  -> validate target and range
  -> record inspected target once
  -> emit target.inspected
  -> evaluate inspect-tree

duplicate inspect
  -> explicit no-op or rejection
  -> no duplicate completion event
```

## Determinism rule

The same canonical initial state plus the same ordered command list must produce the same result rows, events, completed objectives, active objective, and state fingerprint regardless of browser versus editor versus fixture entry point.

## Scope rule

This slice does not require new animations, camera movement, audio, UI, save data, or art. It establishes gameplay authority first so later presentation layers can consume stable committed state.