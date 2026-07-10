# Gameplay Audit: Action Objective Consumer Proof Loop

**Timestamp:** `2026-07-10T10-49-23-04-00`

## Current gameplay loop

```txt
createInitialGameState
  -> state stores manifest, dsk install, scene id, frame, and lastTick
  -> tick(input)
  -> advanceGameState(state, input)
  -> frame increments
  -> lastTick updates
  -> createGameSnapshot(game)
```

## Content domains present

```txt
story beats
arrival objectives
arrival interaction targets
render plan source
state snapshot diagnostics
```

## Gameplay gap

`advanceGameState()` does not yet produce action or objective proof rows.

Missing rows:

```txt
ActionFrame
TargetActionPreflight
ActionResult
ObjectiveProgress
accepted / rejected / skipped / unchanged reason
path progress result
inspect focal tree result
missing target result
wrong action result
unknown action result
DOM-free fixture row
GameHost gameplay proof projection
```

## Do not solve first

```txt
new meadow content
camera/control rewiring
editor command expansion
visual polish
```

## Next target

Add small source-owned gameplay proof helpers first, then expose their rows through `GameHost` and a headless fixture before wiring browser input or expanding content.
