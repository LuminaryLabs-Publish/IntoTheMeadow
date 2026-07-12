# Render Audit: Gameplay State Visible-Frame Provenance

**Timestamp:** `2026-07-12T15-49-09-04-00`

## Summary

The visual renderer can prove a static meadow frame, but there is no gameplay mutation to correlate with that frame. Render plans are sourced from the external meadow provider and time overlay, while player, objective, story and interaction state do not affect topology, materials, feedback or HUD projection.

## Plan ledger

**Goal:** make the first frame after an accepted gameplay command cite the consumed DSK capability generation and committed gameplay revision.

- [x] Trace game state into render-plan construction.
- [x] Trace authored interaction/objective/story data into rendering.
- [x] Confirm the renderer receives no committed gameplay result.
- [x] Define required projection and frame receipts.
- [ ] Implement after DSK provider and gameplay command authority exists.

## Current frame path

```txt
RAF time
  -> game.tick({ time, dt: 1/60 })
  -> frame counter and lastTick change
  -> getRenderPlan(time)
  -> static base render plan + time overlay
  -> plan enhancer
  -> WebGL render
  -> renderer snapshot
```

The following state is not consumed by the render path:

```txt
player.position
player.yaw
player.pitch
player.pathProgress
progression.activeObjectiveId
progression.completedObjectiveIds
progression.storyBeatIds
interaction target state
inspection state
feedback state
```

## Missing frame provenance

```txt
gameplay command id
DSK capability generation
DSK consumption receipts
gameplay state revision
objective revision
story revision
interaction result id
feedback projection result
camera/player transform revision
first visible gameplay frame acknowledgement
```

## Required frame transaction

```txt
Accepted GameplayResult
  -> cite capability generation and service receipts
  -> commit gameplay state revision
  -> derive camera/world/feedback projection plan
  -> reject stale render plan or state revision
  -> render the accepted projection
  -> publish PresentedGameplayFrameReceipt {
       frameId,
       gameplayCommandId,
       capabilityGeneration,
       gameplayRevision,
       objectiveRevision,
       storyRevision,
       renderPlanFingerprint,
       rendererGeneration
     }
```

## Proof matrix

```txt
walk command changes player transform and camera frame
path progress updates objective projection
inspect-tree removes/changes affordance and emits feedback
objective completion updates HUD and story trigger
stale capability generation is rejected
failed gameplay commit produces no successor frame claim
first visible frame cites accepted command and state revision
local browser and Pages behavior match
```

No runtime or rendering source was changed by this audit.