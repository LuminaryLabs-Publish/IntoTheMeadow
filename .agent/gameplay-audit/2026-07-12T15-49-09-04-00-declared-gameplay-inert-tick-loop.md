# Gameplay Audit: Declared Gameplay and Inert Tick Loop

**Timestamp:** `2026-07-12T15-49-09-04-00`

## Summary

The game state contains player and progression fields, and the repository contains authored story beats, objectives and interaction targets. The active tick does not evaluate or mutate any of them.

## Plan ledger

**Goal:** define the missing gameplay loop from normalized input through player movement, target evidence, objective/story mutation and feedback.

- [x] Inspect initial player and progression state.
- [x] Inspect `advanceGameState()`.
- [x] Inspect authored story, objective and target descriptors.
- [x] Compare those descriptors with the browser host loop.
- [x] Define command and state-transition boundaries.
- [ ] Implement and prove interactive gameplay later.

## Current state

```txt
player.position = { x: 0, y: 0, z: -36 }
player.yaw = 0
player.pitch = 0
player.pathProgress = 0
activeObjectiveId = walk-the-path
completedObjectiveIds = []
storyBeatIds = [arrival]
```

## Current tick

```txt
advanceGameState(state, input)
  -> preserve every existing field
  -> increment frame
  -> write lastTick.dt and lastTick.time
```

There is no branch for input actions, player velocity, terrain contact, path projection, target proximity, inspection, objective completion or story triggers.

## Authored but unreachable transitions

```txt
path-discovery story beat
  trigger: path-progress:0.25
  runtime evaluator: absent

focal-tree story beat
  trigger: inspect:focal-tree
  runtime evaluator: absent

walk-the-path objective
  completion: path progress >= 0.35
  runtime progress service: absent

inspect-tree objective
  completion: focal-tree inspected
  runtime inspection ledger: absent
```

## Required gameplay loop

```txt
browser/editor input
  -> normalized GameplayInputSample
  -> GameplayCommand with expected gameplay and capability revisions
  -> player movement and terrain-contact service
  -> path-progress evidence
  -> interaction target query and affordance result
  -> optional InspectCommand
  -> objective progress and story trigger evaluation
  -> atomic gameplay commit
  -> typed feedback and audio events
  -> render/HUD projection
  -> first-visible-frame acknowledgement
```

## Required results

```txt
PlayerMotionResult
InteractionQueryResult
InspectResult
ObjectiveProgressResult
StoryTriggerResult
GameplayCommitResult
GameplayFeedbackResult
PresentedGameplayFrameReceipt
```

## Acceptance examples

```txt
W input changes player position deterministically
movement projected onto the authored path changes pathProgress
crossing 0.25 emits path-discovery once
crossing 0.35 completes walk-the-path once
inspecting focal-tree requires admitted target evidence
inspect emits focal-tree beat and completes inspect-tree once
duplicate command ids are idempotent
stale capability or gameplay revisions are rejected
```

The current product remains a valid environment and editor proof, but it is not yet an interactive exploration loop.