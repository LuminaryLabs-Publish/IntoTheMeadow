# Frame Callback and Step Admission Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-49-41-04-00`

## Summary

Browser callbacks and public `GameHost.game.tick()` calls currently reach game state without session, scheduler, lease, sequence or temporal-value admission.

## Plan ledger

**Goal:** define one exact admission path for callback-driven and diagnostic simulation steps.

- [x] Identify browser callback ingress.
- [x] Identify raw public tick/reset ingress.
- [x] Identify lifecycle and stale-callback races.
- [x] Define command identities and rejection reasons.
- [x] Define zero-mutation rejection behavior.
- [ ] Implement the gateway and fixtures later.

## Current ingress

```txt
browser RAF
  -> frame(now)
  -> game.tick({ time: now / 1000, dt: 1 / 60 })

public host
  -> window.GameHost.game.tick(arbitraryInput)
  -> window.GameHost.game.reset()
```

## Missing admission evidence

```txt
runtimeSessionId
clockGeneration
schedulerGeneration
rafLeaseId
callbackSequence
expectedSimulationRevision
finite/nonnegative/bounded time values
monotonic sample proof
duplicate/stale callback detection
pause/stop/fatal phase
caller capability
```

## Required command

```txt
FrameCallbackCommand {
  frameId
  runtimeSessionId
  clockGeneration
  schedulerGeneration
  rafLeaseId
  callbackSequence
  rawNow
  expectedSimulationRevision
}
```

## Required rejection reasons

```txt
runtime-retired
wrong-session
stale-clock-generation
stale-scheduler-generation
retired-raf-lease
duplicate-callback
out-of-order-callback
invalid-time
clock-regression
step-budget-exhausted
paused
stopped
fatal
unauthorized-direct-tick
```

## Admission rule

A rejected command performs zero game-state, accumulator, renderer, journal or successor-scheduling mutation. An accepted callback produces exactly one `FrameResult`, and only that result may authorize a successor callback.

## Reset rule

`reset()` must allocate a new simulation and clock generation or execute within a typed reset transaction. It cannot silently retain predecessor callbacks or accumulated time.