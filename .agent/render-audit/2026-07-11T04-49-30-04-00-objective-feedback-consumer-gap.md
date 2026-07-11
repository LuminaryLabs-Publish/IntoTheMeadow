# Objective Feedback Consumer Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T04-49-30-04-00`

## Finding

The render pipeline can draw the meadow and publish renderer statistics, but it has no committed gameplay feedback input.

```txt
current render consumer inputs:
  cached source plan
  enhanced meadow-render-plan/v2
  time overlay
  renderer cache state

missing gameplay consumer inputs:
  active objective progress
  accepted/rejected interaction result
  story beat activation
  target affordance state
  command/tick/frame correlation
```

`GameHost.getSnapshot()` includes game state, but the canvas renderer consumes only the render plan. The HUD is used for debug/fatal status, not objective or interaction feedback.

## Risk

A future command implementation could mutate state correctly while the user receives no visible confirmation, or a UI could show optimistic feedback before the command commits.

## Required consumer contract

```txt
committed InteractionResult
  -> feedback projection
  -> objective/story UI snapshot
  -> optional target affordance descriptor
  -> committed frame observation
```

## Rules

```txt
renderer does not determine command success
feedback is derived only from committed results
rejected commands can project reasons without mutating gameplay
story text appears once per committed story transition
objective progress is clone-safe and frame-correlated
visual meadow topology remains unchanged for this slice
```

## Fixture gate

The browser fixture should dispatch path and inspect commands, observe the committed result through GameHost/editor state and then prove the next feedback projection references the same command ID and committed state fingerprint.
