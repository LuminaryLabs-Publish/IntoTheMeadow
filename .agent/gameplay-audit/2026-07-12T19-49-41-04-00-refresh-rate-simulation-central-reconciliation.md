# Refresh-Rate Simulation Central Reconciliation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-49-41-04-00`

## Summary

The current game advances one hard-coded `1/60` step for every browser RAF callback. Today this increments only a frame counter, but any future player, path, objective, story, ecology, audio or save consumer would run according to callback count rather than elapsed admitted time.

## Plan ledger

**Goal:** prevent the first playable loop from inheriting display-refresh and stall-dependent simulation behavior.

- [x] Confirm one tick per RAF callback.
- [x] Confirm `dt` is always `1 / 60` in the browser host.
- [x] Confirm `advanceGameState()` records caller values without admission.
- [x] Quantify 30/60/120 Hz behavior.
- [x] Map affected declared gameplay domains.
- [x] Define fixed-step and overflow policy requirements.
- [ ] Implement parity fixtures before gameplay consumes dt.

## Current rate behavior

```txt
30 callbacks/sec  * 1/60 sec = 0.5 simulated sec/sec
60 callbacks/sec  * 1/60 sec = 1.0 simulated sec/sec
120 callbacks/sec * 1/60 sec = 2.0 simulated sec/sec
```

## Affected declared services

```txt
meadow-player-dsk movement and terrain contact
path-corridor-dsk path progression
meadow-interaction-dsk range and cooldown semantics
meadow-objective-dsk timed or threshold progress
meadow-story-dsk sequence timing
meadow-ecology-dsk ambient agents and triggers
meadow-audio-dsk event and fade timing
meadow-save-dsk autosave cadence
meadow-performance-dsk adaptive decisions
```

## Required policy

```txt
stepSeconds: fixed and authored
elapsedSource: admitted monotonic clock
maxAccumulatedSeconds: bounded
maxStepsPerFrame: bounded
maxStepCpuMs: bounded
overflowPolicy: explicit drop or defer result
pausePolicy: explicit accumulator handling
resumePolicy: new generation or admitted continuation
```

## Required proof

```txt
same ten seconds at 30, 60 and 120 Hz -> same simulation revision/time
same command stream under callback jitter -> same gameplay snapshot
five-second stall -> bounded steps plus explicit overflow result
negative/NaN/Infinity dt -> typed rejection and zero mutation
pause/resume -> no accidental catch-up
```

## Dependency note

Implement this authority before activating the previously documented exploration/progression loop. Otherwise movement, path thresholds and objective timing would be nondeterministic across displays.