# ActionResult Fixture Splice Map — IntoTheMeadow

**Timestamp:** `2026-07-08T15-28-13-04-00`

## Finding

The first playable objective loop is already present as data, but the runtime does not reduce actions into durable results.

Current state reducer:

```txt
advanceGameState(state, input)
  -> frame + 1
  -> lastTick
```

Needed reducer path:

```txt
game.tick({ time, dt, actions })
  -> normalize ActionFrame[]
  -> reduce path-progress / inspect actions
  -> emit ActionResult[]
  -> resolve objective completion
  -> append action journal
  -> expose snapshot.gameplay
```

## Current proof data

Objectives:

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

Interaction targets:

```txt
arrival-path
  type: path
  radius: 32
  requiredAction: path-progress

focal-tree
  type: inspectable
  radius: 4.5
  requiredAction: inspect
```

## Required ActionFrame shape

```txt
ActionFrame
  id
  frame
  time
  source
  action
  targetId
  value
  metadata
```

Initial allowed actions:

```txt
path-progress
inspect
```

## Required ActionResult shape

```txt
ActionResult
  id
  actionFrameId
  status
  reason
  action
  targetId
  changed
  completedObjectiveIds
  statePatchSummary
```

Allowed statuses:

```txt
accepted
rejected
unchanged
```

Reason families:

```txt
path-progress-applied
path-progress-below-threshold
objective-completed
inspect-applied
already-completed
unknown-action
unknown-target
action-target-mismatch
invalid-value
```

## Required fixture rows

```txt
initial snapshot has walk-the-path active
path-progress 0.2 accepted, objective not complete
path-progress 0.35 accepted, walk-the-path complete
path-progress 0.7 accepted/idempotent after completion
inspect focal-tree accepted, inspect-tree complete
inspect focal-tree repeated unchanged/already-completed
inspect unknown target rejected
wrong action for arrival-path rejected
malformed action rejected
snapshot.gameplay exposes activeObjectiveId
snapshot.gameplay exposes completedObjectiveIds
snapshot.gameplay exposes lastActionResults
snapshot.gameplay exposes actionJournal
```

## Source edit order

```txt
1. Add action reason constants.
2. Add ActionFrame normalizer.
3. Add ActionResult constructors.
4. Add action journal helper.
5. Add path-progress reducer.
6. Add inspect-target reducer.
7. Add objective completion resolver.
8. Update advanceGameState to consume optional actions while preserving tick-only behavior.
9. Add createGameplaySnapshot.
10. Add snapshot.gameplay projection.
11. Add DOM-free gameplay-authority fixture smoke.
```

## Stop line

Do not add authored objectives beyond `walk-the-path` and `inspect-tree` until these first two objectives have deterministic accepted, rejected, unchanged, and repeated-action fixture proof.