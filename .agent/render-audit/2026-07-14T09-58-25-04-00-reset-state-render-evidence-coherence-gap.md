# Render Audit: Reset State and Render Evidence Coherence

**Timestamp:** `2026-07-14T09-58-25-04-00`

## Summary

A browser reset replaces game state but leaves `lastPlan`, `lastRender`, the enhancer, renderer caches and active RAF loop in place. A headless reset invalidates the enhancer but leaves `lastCapture`. Immediate post-reset readback can therefore combine successor state with predecessor presentation evidence.

## Plan ledger

**Goal:** require every reset to settle render and observation participants before successor readiness is exposed.

- [x] Trace browser plan and render retention.
- [x] Trace headless capture retention.
- [x] Identify the missing first-reset-frame acknowledgement.
- [ ] Add browser and headless reset-frame fixtures later.

## Current divergence

```txt
browser runtime.reset
  state.frame -> 0
  activeSessionId -> unchanged
  lastPlan -> predecessor retained
  lastRender -> predecessor retained
  enhancer cache -> retained
  renderer cache -> retained
  RAF -> continues

headless runtime.reset
  state.frame -> 0
  time -> 0
  enhancer -> invalidated
  lastCapture -> predecessor retained
```

## Required evidence

```txt
ResetPresentationReceipt {
  resetCommandId
  predecessorSessionGeneration
  successorSessionGeneration
  stateRevision
  renderPlanRevision
  enhancerRevision
  rendererRevision
  observationBaselineRevision
  firstFrameId
  status
}
```

A first reset-session frame must be accepted only when state, plan, renderer and editor evidence cite the same successor session generation.

## Boundary

No rendering behavior was changed or executed.