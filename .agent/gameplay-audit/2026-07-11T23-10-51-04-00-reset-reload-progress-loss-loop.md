# Reset, Reload and Progress-Loss Loop

**Timestamp:** `2026-07-11T23-10-51-04-00`

## Authored progression state

The initial state already contains persistence-relevant fields:

```txt
activeSceneId
activeSessionId
player.position, yaw, pitch and pathProgress
world.meadowAreaId and wind
progression.activeObjectiveId
progression.completedObjectiveIds
progression.storyBeatIds
frame and lastTick
```

## Current loop

```txt
boot
  -> create default state
  -> expose state and snapshot
  -> advance frame counter

future gameplay mutation
  -> would exist only in memory

reset
  -> replace state with default values

reload or navigation away
  -> browser discards the in-memory graph
  -> next boot creates default values again
```

## Main gap

The repository declares objectives, interactions, story beats and a save DSK, but there is no checkpoint policy connecting them. When gameplay mutation becomes active, progress will remain session-local and reset/reload semantics will be accidental.

## Required gameplay policy

```txt
autosave triggers
  objective completion
  story transition
  explicit interaction checkpoint
  clean route exit

manual save
  optional product policy

reset
  explicit choice among restart-current-run, clear-slot or create-new-epoch

reload
  resolve and admit the latest compatible checkpoint

new game
  never silently hydrate an old checkpoint
```

## Required gameplay result

```txt
ProgressContinuityResult
  mode: new | resume | reset | clear
  checkpointId
  stateRevision
  activeSceneId
  activeObjectiveId
  completedObjectiveIds
  storyBeatIds
  playerTransform
  committedFrameId
```

## Acceptance cases

```txt
walk-path progress survives reload when policy permits
completed objective does not duplicate after resume
story beat order remains canonical after migration
reset advances epoch and follows the declared slot policy
new game cannot accidentally consume a resume candidate
malformed or incompatible saves do not erase the prior valid checkpoint
resume produces the same visible progression state in browser and headless observation
```

## Completion boundary

Gameplay continuity is not proven by retaining a frame count. It requires canonical objective, story and player state to survive an admitted save/load transaction with explicit reset and new-game semantics.