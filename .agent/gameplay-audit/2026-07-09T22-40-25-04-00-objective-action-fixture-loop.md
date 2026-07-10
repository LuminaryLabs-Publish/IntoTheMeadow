# Gameplay Audit: Objective Action Fixture Loop

**Timestamp:** `2026-07-09T22-40-25-04-00`

## Current gameplay source

```txt
createInitialGameState
  -> frame
  -> activeSceneId
  -> activeSessionId
  -> player position/yaw/pitch/pathProgress
  -> world wind strength
  -> progression activeObjectiveId/completedObjectiveIds/storyBeatIds
  -> dsk install snapshot
```

## Current tick loop

```txt
game.tick({ time, dt })
  -> advanceGameState(state, input)
  -> frame += 1
  -> lastTick = { dt, time }
```

## Current objective source

```txt
walk-the-path:
  requiredAction path-progress
  targetId arrival-path
  completion progressAtLeast 0.35

inspect-tree:
  requiredAction inspect
  targetId focal-tree
  completion inspected true
```

## Gap

The route has content descriptors but no action authority.

Missing:

```txt
ActionFrame
preflight target lookup
accepted / rejected / unchanged ActionResult
objective progress mutation
completedObjectiveIds update
story beat update
fixture rows for deterministic replay
GameHost gameplay proof projection
```

## Main finding

Gameplay should not move to browser input yet. First add DOM-free action rows for the two declared gameplay intents: `path-progress` and `inspect`.

## Required next kits

```txt
action-frame-kit
target-action-preflight-kit
action-result-kit
objective-progress-kit
gameplay-fixture-row-kit
DOM-free-action-fixture-kit
```

## Next validation target

```txt
node tests/action-result-fixture-smoke.mjs
```
