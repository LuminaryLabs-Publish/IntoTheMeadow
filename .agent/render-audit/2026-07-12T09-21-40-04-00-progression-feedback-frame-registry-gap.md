# Progression Feedback and Visible-Frame Registry Gap

**Timestamp:** `2026-07-12T09-21-40-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The renderer can submit meadow frames and expose topology/count snapshots, but it receives no committed progression result and publishes no frame receipt tied to objective, story or feedback revisions. The machine registry also lagged the human progression audit, so automated readers could not reliably identify the expected frame-proof contract.

## Plan ledger

**Goal:** define the render boundary required to prove that committed progression is visible.

- [x] Trace progression state into the current render path.
- [x] Confirm no feedback projection result exists.
- [x] Confirm no visible progression-frame acknowledgement exists.
- [x] Synchronize the machine registry with the current audit.
- [ ] Implement frame correlation and pixel-level browser proof later.

## Current path

```txt
game.tick({time, dt})
  -> frame/lastTick bookkeeping
  -> render-plan enhancement
  -> static topology cache
  -> outline draw
  -> color draw
  -> renderer snapshot
```

## Missing inputs

```txt
progression revision
interaction result
objective completion result
story progression result
feedback revision
UI projection revision
```

## Missing outputs

```txt
frame sequence
committed progression revision
committed feedback revision
stage/pass results
canvas presentation acknowledgement
screenshot/capture correlation
stale-frame rejection
```

## Failure mode

Even after progression is implemented, state could report a completed objective while the latest visible frame still reflects a predecessor revision. Without one frame receipt, GameHost, editor capture, diagnostics and screenshots cannot prove that the player saw the committed result.

## Required render transaction

```txt
committed ProgressionResult
  -> immutable feedback/render input
  -> render admission under current runtime/surface generations
  -> scene and post draws
  -> canvas presentation observation
  -> VisibleProgressionFrameResult
  -> detached diagnostics and capture correlation
```

## Required proof

```txt
path progress below 0.25 produces no story feedback
crossing 0.25 produces exactly one story feedback revision
crossing 0.35 produces exactly one objective completion revision
inspect rejection produces typed non-mutating feedback
inspect admission produces exactly one story/objective result
first visible frame cites the committed progression and feedback revisions
browser capture cites the same frame result
```

## Validation boundary

```txt
render source changed: no
render output changed: no
browser frame smoke run: no
visible progression-frame fixture available: no
```
