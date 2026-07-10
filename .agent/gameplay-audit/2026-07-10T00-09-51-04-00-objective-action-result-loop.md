# Gameplay Audit: Objective Action Result Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T00-09-51-04-00`

## Gameplay state today

`src/game/game-state.js` creates initial state with:

```txt
frame: 0
activeSceneId: arrival-meadow
player.pathProgress: 0
progression.activeObjectiveId: walk-the-path
progression.completedObjectiveIds: []
progression.storyBeatIds: [arrival]
```

`advanceGameState(state, input)` currently returns a frozen copy with only:

```txt
frame + 1
lastTick.dt
lastTick.time
```

## Objective descriptors

`src/content/objectives/arrival-objectives.js` defines:

```txt
walk-the-path -> requiredAction path-progress -> targetId arrival-path -> progressAtLeast 0.35
inspect-tree -> requiredAction inspect -> targetId focal-tree -> inspected true
```

## Interaction target descriptors

`src/content/interaction-targets/arrival-targets.js` defines:

```txt
focal-tree -> type inspectable -> requiredAction inspect -> radius 4.5
arrival-path -> type path -> requiredAction path-progress -> radius 32
```

## Missing gameplay proof

```txt
no ActionFrame contract
no target lookup row
no preflight reason row
no ActionResult contract
no objective-progress mutation row
no replayable fixture rows
no GameHost action proof projection
```

## Next-cut files

```txt
src/gameplay/action-frame.js
src/gameplay/target-action-preflight.js
src/gameplay/action-result.js
src/gameplay/objective-progress.js
src/gameplay/gameplay-fixture-rows.js
tests/action-result-fixture-smoke.mjs
src/game/game-state.js
src/game/game-snapshot.js
src/boot/expose-game-host.js
```

## First fixture rows

```txt
path-progress below threshold -> accepted/no completion
path-progress at threshold -> accepted/walk-the-path complete
inspect focal-tree -> accepted/inspect-tree complete
missing target -> rejected/stable reason
wrong action for target -> rejected/stable reason
unknown action -> rejected/stable reason
legacy tick with no action -> unchanged frame-only compatibility row
```

## Finding

The state loop is deterministic and simple, but it is not yet gameplay-authoritative.

Source-owned action rows should land before browser input wiring, new objectives, or visual work.
