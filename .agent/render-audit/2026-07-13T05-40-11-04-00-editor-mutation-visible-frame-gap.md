# Render Audit: Editor Mutation Visible-Frame Gap

**Generated:** `2026-07-13T05-40-11-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Browser editor mutations complete before the renderer proves a frame derived from the successor state. `runtime.tick` and `runtime.reset` mutate game state synchronously, while `lastPlan` and `lastRender` are replaced only inside the next RAF callback. Canvas capture can therefore succeed with predecessor pixels after the editor reports a completed mutation.

## Plan ledger

**Goal:** make user-visible editor mutations publish one render requirement and one first matching frame acknowledgement.

- [x] Trace editor tick/reset to game mutation.
- [x] Trace render-plan and renderer snapshot replacement.
- [x] Trace canvas capture and snapshot readback.
- [x] Record the missing state/render correlation.
- [ ] Add executable reset/capture and tick/capture fixtures later.

## Current path

```txt
editor invoke runtime.reset
  -> game.reset()
  -> generic completed result
  -> state now cites reset successor
  -> lastPlan and lastRender remain predecessor values
  -> renderer.capture can encode predecessor canvas
  -> no correlation failure is reported
```

The same gap applies to direct editor ticks. The render plan is mostly static topology with a time overlay, but the architecture still lacks a revision proving which state and clock produced the visible frame.

## Missing evidence

```txt
state revision
render-plan revision
renderer submission revision
canvas presentation revision
editor command ID
scheduler generation
mutation-to-render requirement
first matching frame acknowledgement
capture-to-frame correlation
```

## Required frame transaction

```txt
accepted editor mutation
  -> publish state revision after mutation
  -> mark render refresh required
  -> build plan citing command and state revision
  -> submit renderer frame citing plan revision
  -> publish EditorVisibleFrameAck
  -> allow correlated capture or observation
```

## Capture rule

A capture requested against a mutation result must either:

```txt
wait for the matching visible frame
return stale/not-ready with zero false correlation
or explicitly declare that it captured the predecessor frame
```

## Boundary

No rendering code changed. No visible-frame, reset/capture, tick/capture or Pages fixture was run.
