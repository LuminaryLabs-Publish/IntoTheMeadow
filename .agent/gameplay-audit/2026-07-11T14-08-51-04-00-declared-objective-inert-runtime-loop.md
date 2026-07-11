# Declared Objective, Inert Runtime Loop

## Summary

The authored gameplay loop is visible in content files but absent from runtime mutation.

## Intended loop

```txt
walk along arrival-path
  -> increase path progress
  -> complete walk-the-path at 0.35
  -> activate inspect-tree
  -> inspect focal-tree
  -> complete objective
  -> advance story beat
```

## Actual loop

```txt
RAF or editor tick
  -> add 1 to frame
  -> store dt and time
  -> preserve player.pathProgress = 0
  -> preserve completedObjectiveIds = []
  -> preserve activeObjectiveId = walk-the-path
  -> preserve storyBeatIds = [arrival]
```

## Gameplay impact

```txt
no movement progression
no target interaction
no completion feedback
no objective ordering
no story transition
no replayable action receipts
```

## Required behavior

- Path progress must be derived or submitted through a typed command.
- Progress must be finite, bounded and policy-controlled.
- Target inspection must resolve the canonical active-scene target.
- Objective completion must be exactly-once.
- Story transitions must cite completion receipts.
- Reset must restore the initial objective state and retire stale commands.

Do not add more objectives until the current two are executable and fixture-backed.
