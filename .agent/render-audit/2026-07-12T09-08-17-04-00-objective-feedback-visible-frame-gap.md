# Objective Feedback and Visible-Frame Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T09-08-17-04-00`

## Summary

The renderer can draw the meadow, but no committed interaction, objective or story state reaches a visible feedback surface. A screenshot or rendered frame cannot prove that path progress, inspection or objective completion occurred.

## Plan ledger

**Goal:** correlate committed progression state with the first frame that visibly communicates it.

- [x] Trace game state to render-plan enhancement and WebGL submission.
- [x] Inspect diagnostics, GameHost snapshot and editor capture surfaces.
- [x] Identify missing progression and frame identities.
- [x] Define render-proof requirements.
- [ ] Implement after progression and committed-frame authorities exist.

## Current render path

```txt
RAF
  -> game.tick({time,dt})
  -> game.getRenderPlan(time)
  -> planEnhancer.enhance(rawPlan)
  -> renderer.render(plan)
  -> optional debug text with descriptor counts
```

The path consumes no interaction result, objective ledger, story result or feedback state.

## Missing visible state

```txt
interaction prompt
canonical target identity
action admitted/rejected state
path-progress feedback
inspection feedback
active objective label/progress
objective completion event
successor objective activation
story text progression
progression revision
completion-ledger revision
story revision
first visible progression-frame ID
```

## Readback gap

```txt
renderer snapshot:
  topology and mesh counts
  cache state
  no progression state

GameHost snapshot:
  state and render plan
  no command/result receipts
  no feedback projection
  no committed frame correlation

editor capture:
  canvas dimensions and image
  renderer snapshot
  no progression or frame revision
```

## Required frame receipt

```txt
VisibleProgressionFrameAck {
  frameId
  runtimeSessionId
  resetGeneration
  progressionRevision
  completionLedgerRevision
  storyRevision
  feedbackRevision
  surfaceRevision
  topologyKey
  presentedAt
}
```

## Required render adapters

```txt
progression-feedback-plan-kit
objective-hud-projection-kit
story-text-projection-kit
interaction-affordance-projection-kit
progression-render-revision-kit
visible-progression-frame-ack-kit
capture-progression-correlation-kit
```

## Required proof matrix

```txt
walk-the-path active at initial frame
path-discovery story appears only after admitted 0.25 progress
walk-the-path completes only after admitted 0.35 progress
inspect-tree becomes active according to successor policy
focal-tree inspection feedback appears after admitted inspect result
duplicate inspect does not duplicate story or completion feedback
reset frame restores initial objective/story projection
capture cites the exact committed progression and feedback revisions
```

## Claim boundary

A tree and path being visible is not interaction proof. A state object containing `activeObjectiveId` is not visible progression proof. Completion requires a committed progression transaction and a rendered frame that cites that exact revision.