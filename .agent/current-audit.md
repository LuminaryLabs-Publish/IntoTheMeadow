# Current Audit: Runtime Reset Session Replay Authority

**Updated:** `2026-07-14T09-58-25-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `runtime-reset-session-replay-authority-audited`  
**Immediate predecessor:** `dsk-capability-dependency-admission-authority-central-reconciled`

## Summary

`runtime.reset` is available in both browser and headless editor environments, but it is not one shared reset transaction. The game recreates frame-zero state using the same `arrival-meadow:session-0` identity and retains the meadow provider and cached base plan.

Browser reset leaves RAF, last plan, last render, enhancer and renderer evidence alive. Headless reset additionally resets time and invalidates the enhancer, but retains `lastCapture`. No typed reset result or first successor-frame acknowledgement proves which participant generation is current.

## Plan ledger

**Goal:** bind reset intent, session identity, participant lifecycle, replay evidence and first-frame settlement into one authority.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only IntoTheMeadow by the oldest eligible timestamp.
- [x] Inspect game state/reset, web host, GameHost, browser editor bridge, headless environment and tests.
- [x] Preserve all 44 kit surfaces and offered services.
- [x] Add the timestamped audit family.
- [x] Change documentation only and push to `main`.
- [ ] Implement the runtime authority and failure fixtures later.

## Interaction loop

```txt
browser reset
  -> direct game.reset
  -> same session identity
  -> retained plan/render/scheduler evidence

headless reset
  -> time = 0
  -> enhancer.invalidate
  -> direct game.reset
  -> same session identity
  -> retained previous capture baseline
```

## Main findings

```txt
unique SessionGeneration: absent
ResetCommandId and expected revision: absent
browser/headless participant parity: absent
RAF and manual-tick reset barrier: absent
browser lastPlan/lastRender invalidation: absent
headless lastCapture reset policy: absent
atomic adoption or rollback: absent
replay journal and fingerprints: absent
FirstResetSessionFrameAck: absent
```

## Required parent domain

```txt
meadow-runtime-reset-session-replay-authority-domain
```

## Required transaction

```txt
RuntimeResetCommand
  -> bind predecessor session and expected revisions
  -> suspend frame and manual-tick leases
  -> prepare successor state and participant reset candidates
  -> assign a unique SessionGeneration
  -> reject duplicate, stale or superseded work
  -> atomically adopt all participants or preserve predecessor
  -> publish RuntimeResetResult and replay journal entry
  -> resume one accepted scheduler generation
  -> publish FirstResetSessionFrameAck
```

## Boundary

Documentation only. No runtime, renderer, editor, test, build or deployment code changed.