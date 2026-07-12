# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T19-41-13-04-00`

## Summary

The leading infrastructure gap is frame-clock ownership. The browser loop has no RAF lease, scheduler generation, elapsed-time policy, fixed-step accumulator, catch-up budget, lifecycle result or render/simulation correlation.

## Plan ledger

**Goal:** close timing and callback ownership gaps before activating dt-dependent gameplay.

- [x] Record refresh-rate dependency.
- [x] Record stall and render/simulation divergence.
- [x] Record stop/start duplicate-chain risk.
- [x] Record raw tick and invalid temporal input exposure.
- [x] Record proof and deployment gaps.
- [x] Preserve exploration, DSK, lifecycle, rendering, grass, audio, save and replay gaps.
- [ ] Implement in dependency order.

## Clock gaps

```txt
runtime clock id and generation
monotonic sample result
prior-sample revision
first/normal/stalled/regressed classification
finite and nonnegative time admission
maximum elapsed policy
wall-time metadata separation
```

## Scheduler gaps

```txt
scheduler generation
RAF request handle
RAF lease identity
callback sequence
single-successor invariant
cancel result
stale callback rejection
typed start/stop/fatal results
ordered disposal
```

## Fixed-step gaps

```txt
fixed-step policy
accumulator
maximum accumulated seconds
maximum steps per frame
maximum step CPU budget
deferred-time result
dropped-time result
pause/resume accumulator policy
```

## Render correlation gaps

```txt
simulation time
interpolation alpha
render-time projection
clock revision in render snapshot
simulation revision in render snapshot
frame result
first visible clocked-frame acknowledgement
```

## Capability gaps

```txt
raw GameHost.game exposes tick and reset
tick accepts caller-owned time and dt
negative/NaN/Infinity values are not rejected
reset allocates no clock or scheduler generation
editor capability does not express frame authority
```

## Proof gaps

```txt
30/60/120 Hz parity
jitter parity
long-stall bounded catch-up
stop/start single-chain
late callback zero mutation
invalid-time rejection
pause/resume
fatal lease retirement
render/simulation correlation
source/build/Pages parity
```

## Preserved product gaps

```txt
executable DSK provider binding and readiness
playable input, movement and path progression
focal-tree inspection and exactly-once objective/story progression
camera-bound grass visibility and LOD
audio user-gesture lifecycle
atomic save and migration continuity
independent deterministic replay
WebGL context loss and restoration
```

## Completion boundary

A healthy screenshot or increasing frame counter is not timing proof. Completion requires admitted monotonic samples, bounded fixed-step batches, exactly one live RAF chain, correlated render snapshots and executable parity fixtures.
