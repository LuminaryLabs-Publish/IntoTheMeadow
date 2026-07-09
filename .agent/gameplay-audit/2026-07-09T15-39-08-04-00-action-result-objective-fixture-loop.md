# Gameplay Audit: Action Result Objective Fixture Loop

**Timestamp:** `2026-07-09T15-39-08-04-00`

## Current gameplay source

```txt
createInitialGameState()
  -> frame 0
  -> activeSceneId arrival meadow
  -> player position/yaw/pitch/pathProgress
  -> world wind
  -> progression activeObjectiveId walk-the-path
  -> completedObjectiveIds []
  -> storyBeatIds [arrival]

advanceGameState(state, input)
  -> frame + 1
  -> lastTick { dt, time }
```

## Current objective descriptors

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

## Gameplay gap

The content descriptors exist, but the current state loop does not consume action frames. Path-progress and inspect actions do not mutate player progress, completed objectives, active objective, story beats, or diagnostics.

## Target proof loop

```txt
ActionFrame
  -> target lookup
  -> target/action preflight
  -> ActionResult
  -> ObjectiveProgressResult
  -> next game state
  -> gameplay snapshot projection
  -> DOM-free fixture row
```

## Required rows

```txt
path progress below threshold -> accepted changed, objective incomplete
path progress at threshold -> accepted changed, walk-the-path complete
inspect wrong target -> rejected, no state mutation
inspect focal tree before path objective -> accepted changed or deferred by policy
inspect focal tree after path objective -> accepted changed, inspect-tree complete
unknown action -> skipped unknown action
missing target -> rejected missing target
```

## Implementation guardrail

The next cut should be pure and fixture-first under `src/gameplay-proof/*` or `src/game/actions/*`. It should not alter route shell, renderer, meadow content, or external kit URLs during the proof pass.
