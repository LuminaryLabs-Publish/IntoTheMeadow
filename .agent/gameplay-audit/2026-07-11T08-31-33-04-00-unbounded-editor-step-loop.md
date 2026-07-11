# Unbounded Editor Step Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T08-31-33-04-00`

## Gameplay loop

```txt
editor requests runtime.tick
  -> adapter converts ticks and dt with Number(...)
  -> loop applies game.tick repeatedly
  -> game increments frame
  -> game records dt and time
  -> adapter returns success
```

## Exact defects

### Step count is not a bounded integer

```txt
ticks = Infinity
  -> for-loop never terminates

ticks = 1.5
  -> loop executes at indices 0 and 1
  -> two steps are applied

ticks = -1 or NaN
  -> zero steps are applied
  -> capability still returns a completed response

ticks = very large finite value
  -> synchronous work is unbounded
```

### Delta and time are not finite or monotonic

```txt
dt = Infinity or NaN
  -> local headless time becomes non-finite
  -> state.lastTick receives non-finite values

dt < 0
  -> local time moves backward
browser editor time omitted
  -> time defaults to zero
  -> recorded time can regress while RAF is active
```

### Frame count is not a trusted simulation sequence

Every raw `game.tick()` increments `state.frame`, regardless of source, session, expected frame, accepted time or render consumption. A caller can therefore advance frame count independently of the browser scheduler and visible output.

## Gameplay consequences

The current state has minimal simulation behavior, but future movement, wind, objectives, story triggers and interaction commands are expected to consume the same tick path. Without step admission:

```txt
large editor requests can skip progression thresholds
negative delta can reverse time-dependent systems
non-finite values can poison deterministic calculations
concurrent RAF and editor calls can interleave state transitions
reset can be followed by a stale or out-of-epoch step
replay cannot reconstruct which source advanced each frame
```

## Required policy

```txt
requestedSteps must be an integer in [1, maxStepsPerCommand]
requestedDt must be finite and within the configured range
committedTime must be finite and monotonic within clockEpoch
source must be identified
session and expected frame must match
one command returns one typed terminal result
one accepted step produces one journal row or one bounded aggregate row
```

## Required fixture matrix

```txt
1 step at canonical dt -> accepted
maximum budget -> accepted
maximum + 1 -> rejected
0, negative, fractional, NaN and Infinity ticks -> rejected
negative, NaN and Infinity dt -> rejected
regressed explicit time -> rejected
stale expected frame -> rejected
duplicate command ID -> duplicate without mutation
step after reset using old epoch -> stale
browser editor step during disallowed RAF ownership -> rejected
```

Gameplay progression must not be built on raw editor loop counts.