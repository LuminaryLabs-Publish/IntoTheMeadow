# Gameplay Authority Audit — ActionFrame Objective Reducer Gate

**Timestamp:** `2026-07-08T07:41:52-04:00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Purpose

Define the first real gameplay authority gate for `IntoTheMeadow` without skipping the renderer parity gate.

The game already has objective and interaction descriptors. The state runtime does not yet reduce player actions into objective/story progression.

## Source readback

Current state root:

```txt
state.frame
state.activeSceneId
state.activeSessionId
state.player.position
state.player.yaw
state.player.pitch
state.player.pathProgress
state.world.wind
state.progression.activeObjectiveId
state.progression.completedObjectiveIds
state.progression.storyBeatIds
state.lastTick
```

Current reducer behavior:

```txt
advanceGameState(state, input)
  -> frame + 1
  -> lastTick.dt
  -> lastTick.time
```

Objective descriptors:

```txt
walk-the-path
  requiredAction: path-progress
  targetId: arrival-path
  completion: progressAtLeast 0.35

inspect-tree
  requiredAction: inspect
  targetId: focal-tree
  completion: inspected true
```

Interaction target descriptors:

```txt
focal-tree
  type: inspectable
  requiredAction: inspect
  radius: 4.5

arrival-path
  type: path
  requiredAction: path-progress
  radius: 32
```

## Target input contract

Keep existing calls valid:

```txt
game.tick({ time, dt })
```

Add optional action support:

```txt
game.tick({ time, dt, actions })
```

Target action frame:

```txt
ActionFrame
  frame
  time
  dt
  actions[]
```

Target action:

```txt
Action
  id
  type
  targetId
  value
  source
```

## Target result contract

```txt
ActionResult
  id
  actionId
  actionType
  targetId
  accepted
  reason
  stateDelta
  objectiveDelta
  storyDelta
  diagnostics
```

Reason catalog:

```txt
accepted
unknown-action-type
unknown-target
target-not-interactable
wrong-objective-action
path-progress-too-low
already-completed
missing-action-frame
invalid-action-payload
```

## First reducer pipeline

```txt
normalize-action-frame
-> reduce-path-progress-action
-> reduce-inspect-action
-> resolve-objective-completion
-> resolve-story-trigger
-> append-action-journal-entry
-> project-gameplay-snapshot
```

## Fixture acceptance matrix

```txt
case-01 no-actions-frame-only
  input: game.tick({ time, dt })
  expected: backward-compatible frame increment, no gameplay error

case-02 path-progress-accepted
  input: path-progress on arrival-path with value >= 0.35
  expected: walk-the-path completed, accepted reason

case-03 path-progress-too-low
  input: path-progress on arrival-path with value < 0.35
  expected: accepted false or incomplete result with path-progress-too-low

case-04 inspect-focal-tree-accepted
  input: inspect on focal-tree
  expected: inspect-tree completed when current objective allows it

case-05 unknown-target
  input: inspect on missing target
  expected: accepted false, reason unknown-target

case-06 unknown-action-type
  input: action type dance
  expected: accepted false, reason unknown-action-type

case-07 already-completed
  input: repeat completed objective action
  expected: stable already-completed result, no duplicate completion

case-08 replay-parity
  input: same seed + same action frames
  expected: same state.progression and same snapshot.gameplay
```

## Snapshot target

Add without breaking existing snapshot shape:

```txt
snapshot.gameplay
  activeObjectiveId
  completedObjectiveIds[]
  storyBeatIds[]
  actionJournal[]
  lastActionResults[]
  player.pathProgress
```

Add diagnostics without breaking existing validation:

```txt
GameHost.getDiagnostics().gameplay
  actionFrameSupported
  reducerCount
  lastActionResultCount
  objectiveCompletionCount
  replayFixtureReady
```

## Implementation order

```txt
1. Finish renderer parity fixture or keep it as the first check in npm run check.
2. Add action/result types as plain JS modules.
3. Preserve game.tick({ time, dt }) behavior.
4. Add optional actions array processing.
5. Implement path-progress and inspect reducers only.
6. Project snapshot.gameplay.
7. Add DOM-free gameplay replay fixture.
8. Only then add camera/input/hit testing.
```

## Stop condition

Stop after the action reducer fixture proves the first objective loop:

```txt
walk path -> inspect tree -> story/objective state changes deterministically
```

Do not add more story scenes, UI, save slots, or movement complexity before this reducer gate exists.