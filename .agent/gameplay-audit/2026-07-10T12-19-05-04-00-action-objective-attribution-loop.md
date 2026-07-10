# Gameplay Audit: Action Objective Attribution Loop

**Timestamp:** `2026-07-10T12-19-05-04-00`

## Current gameplay state

```txt
createInitialGameState
  -> frame
  -> lastTick
  -> sceneId
  -> manifest/dsk install snapshot
  -> objectives and interaction targets from content

advanceGameState
  -> increments frame
  -> writes lastTick
```

## Current gameplay proof gap

```txt
no ActionFrame contract
no TargetActionPreflight contract
no ActionResult contract
no ObjectiveProgress contract
no reason rows for accepted/rejected/skipped/unchanged outcomes
no DOM-free action fixture
no GameHost proof projection for gameplay rows
```

## Required attribution loop

```txt
ActionFrame
  -> TargetActionPreflight
  -> ActionResult
  -> ObjectiveProgress
  -> GameplayFixtureRow
  -> GameHost proof projection
  -> Headless editor observation
```

## Recommendation

Do not add new meadow interactions first. Add deterministic action/objective attribution rows for path progress and focal-tree inspection, then fixture-prove them without the DOM.
