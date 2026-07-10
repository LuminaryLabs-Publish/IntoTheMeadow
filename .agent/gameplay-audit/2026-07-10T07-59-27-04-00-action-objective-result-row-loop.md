# Gameplay Audit: Action Objective Result Row Loop

## Current gameplay loop

```txt
createInitialGameState
  -> frame 0, active scene/session, player pathProgress 0
  -> progression activeObjectiveId walk-the-path
  -> game.tick({ time, dt })
  -> advanceGameState(state, input)
  -> frame + 1
  -> lastTick = { dt, time }
```

## Existing descriptors

```txt
ARRIVAL_OBJECTIVES
ARRIVAL_INTERACTION_TARGETS
STORY_BEATS
ARRIVAL_MEADOW_CONFIG
```

## Gap

Gameplay descriptors exist, but the runtime does not yet produce typed action rows. `advanceGameState()` does not process path progress, inspection, target policy, objective completion, or rejection reasons.

## Needed loop

```txt
ActionFrame
  -> target/action preflight
  -> ActionResult accepted/rejected/skipped/unchanged
  -> objective progress mutation
  -> gameplay fixture rows
  -> GameHost proof projection
  -> headless editor proof observation
```

## Deferral

Do not wire browser controls or add new meadow content before the DOM-free action/objective rows exist.
