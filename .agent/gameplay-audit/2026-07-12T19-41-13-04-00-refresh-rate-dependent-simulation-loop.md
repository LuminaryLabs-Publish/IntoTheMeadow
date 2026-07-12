# Refresh-Rate-Dependent Simulation Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-41-13-04-00`

## Summary

The host advances one `1/60` simulation step per RAF callback. The current game only increments a frame counter, but every future dt-based gameplay consumer would run at display refresh rate rather than elapsed monotonic time.

## Plan ledger

**Goal:** prevent player, path, objective, ecology, audio and save behavior from inheriting callback-count timing.

- [x] Confirm one tick occurs per RAF callback.
- [x] Confirm dt is always `1 / 60`.
- [x] Confirm no elapsed-time accumulator exists.
- [x] Quantify 30/60/120 Hz behavior.
- [x] Define fixed-step parity and long-stall budgets.
- [ ] Execute gameplay timing fixtures after implementation.

## Current rate behavior

```txt
30 callbacks/sec  * 1/60 sec = 0.5 simulated sec/sec
60 callbacks/sec  * 1/60 sec = 1.0 simulated sec/sec
120 callbacks/sec * 1/60 sec = 2.0 simulated sec/sec
```

## Affected future consumers

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
elapsed source: admitted monotonic clock
maxAccumulatedSeconds: bounded
maxStepsPerFrame: bounded
maxStepCpuMs: bounded
overflow: explicit drop or defer result
pause: accumulator policy explicit
resume: new generation or admitted continuation
```

## Required fixtures

```txt
same ten seconds at 30, 60 and 120 Hz -> same simulation revision/time
same command stream under jitter -> same gameplay snapshot
five-second stall -> bounded steps plus explicit overflow result
negative/NaN/Infinity dt -> zero mutation and typed rejection
pause/resume -> no accidental catch-up
```
