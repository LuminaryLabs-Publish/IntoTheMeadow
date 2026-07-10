# Gameplay Audit: Objective Action Headless Loop

**Timestamp:** `2026-07-10T01-38-16-04-00`

## Gameplay state read

`IntoTheMeadow` has objective and interaction target descriptors.

The current reducer does not consume them yet.

`advanceGameState()` increments `frame` and records `lastTick` only.

## Current state loop

```txt
createInitialGameState
  -> player pathProgress starts at 0
  -> active objective is walk-the-path
  -> completed objectives empty
  -> storyBeatIds contains arrival

advanceGameState(state, input)
  -> frame + 1
  -> lastTick dt/time
  -> no action frame
  -> no target preflight
  -> no objective progress
  -> no ActionResult
```

## Current content descriptors

```txt
ARRIVAL_OBJECTIVES
  -> walk-the-path requires path-progress on arrival-path with progressAtLeast 0.35
  -> inspect-tree requires inspect on focal-tree with inspected true

ARRIVAL_INTERACTION_TARGETS
  -> focal-tree inspectable at { x: 0, y: 1.4, z: 24 }, radius 4.5
  -> arrival-path path target at { x: 0, y: 0, z: -8 }, radius 32
```

## Missing gameplay rows

```txt
ActionFrame
TargetActionPreflight
ActionResult
ObjectiveProgressRow
GameplaySnapshotProjection
GameHostGameplayProof
DOM-free action fixture rows
headless editor action observation rows
```

## Fixture rows needed

```txt
path progress below threshold
path progress complete objective
inspect focal tree accepted
inspect repeated unchanged
missing target rejected
wrong action rejected
unknown action rejected
GameHost legacy shape preserved
headless editor inspect command row
headless editor capture row with gameplay proof
```

## Next safe gameplay work

```txt
src/gameplay/action-frame.js
src/gameplay/target-action-preflight.js
src/gameplay/action-result.js
src/gameplay/objective-progress.js
src/gameplay/gameplay-fixture-rows.js
tests/action-result-fixture-smoke.mjs
```

## Do not do next

```txt
browser input wiring before DOM-free rows
new objectives
new meadow content
camera/control changes
visual rewrite
```
