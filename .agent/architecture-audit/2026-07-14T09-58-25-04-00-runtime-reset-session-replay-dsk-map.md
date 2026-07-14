# Architecture Audit: Runtime Reset Session Replay DSK Map

**Timestamp:** `2026-07-14T09-58-25-04-00`  
**Status:** `runtime-reset-session-replay-authority-audited`

## Summary

Reset is currently a direct method call, not a composed domain transaction. The browser and headless environments reset different participants, while the state reuses the same session identity and no service owns atomic successor adoption.

## Plan ledger

**Goal:** map the smallest DSK authority that can make reset deterministic, atomic and observable.

- [x] Map current reset callers and participants.
- [x] Map retained predecessor state.
- [x] Define command, preparation, adoption, rollback and evidence surfaces.
- [x] Preserve the existing 44-kit catalog.
- [ ] Implement the authority later.

## Current graph

```txt
browser editor bridge
  -> game.reset
  -> createInitialGameState

headless environment
  -> time = 0
  -> enhancer.invalidate
  -> game.reset

retained outside reset
  -> browser RAF lease
  -> browser lastPlan and lastRender
  -> renderer cache and GPU resources
  -> browser error ledger
  -> headless lastCapture
  -> meadow provider and cached base render plan
```

## Required parent domain

```txt
meadow-runtime-reset-session-replay-authority-domain
```

## Required service graph

```txt
RuntimeResetCommand
  requires: current session, state revision, scheduler generation
  provides: admitted reset intent

reset participant registry
  provides: state, provider, plan, enhancer, renderer,
            editor, capture, error-ledger and scheduler policies

session generation
  provides: unique successor session identity

reset preparation
  provides: detached candidates and participant receipts

atomic adoption and rollback
  provides: one accepted successor or preserved predecessor

replay journal
  provides: command/result/state/render fingerprints

first reset frame
  provides: successor state and presentation convergence evidence
```

## Planned surfaces

```txt
runtime-reset-command-kit
session-generation-kit
expected-state-revision-admission-kit
frame-submission-suspension-kit
manual-tick-admission-kit
state-reset-candidate-kit
provider-reset-participant-kit
render-plan-reset-participant-kit
enhancer-cache-reset-kit
renderer-cache-reset-kit
browser-observation-reset-kit
headless-capture-baseline-reset-kit
error-ledger-reset-policy-kit
reset-atomic-adoption-kit
reset-rollback-kit
runtime-reset-result-kit
reset-replay-journal-kit
reset-diagnostics-kit
first-reset-session-frame-ack-kit
reset-fixture-matrix-kit
```

## Boundary

This map does not claim the authority is implemented.