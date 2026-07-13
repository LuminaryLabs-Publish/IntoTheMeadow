# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T21-40-09-04-00`

## Summary

The leading render-surface gap is WebGL context and GPU-resource recovery. The renderer owns one context generation implicitly, has no loss/restoration listeners, and can publish a normal snapshot after draw calls without proving the canvas displayed the frame.

## Plan ledger

**Goal:** close context-lifecycle and resource-rebuild gaps without merging them into frame scheduling, grass visibility or product gameplay domains.

- [x] Record missing context event ownership.
- [x] Record missing draw suspension and snapshot truthfulness.
- [x] Record missing program/location/buffer generation.
- [x] Record missing restoration rebuild and rollback.
- [x] Record stale callback/resource and repeated-loss risks.
- [x] Record browser, built-output and Pages proof gaps.
- [x] Preserve scheduler, progression, DSK, grass, audio, save and replay gaps.
- [ ] Implement in dependency order.

## Context identity gaps

```txt
renderer ID
canvas ID
context ID
context generation
context phase
expected predecessor generation
loss event ID and sequence
restoration command/result identity
```

## Event ownership gaps

```txt
owned webglcontextlost listener
owned webglcontextrestored listener
preventDefault policy
listener lease and removal result
stale canvas/event rejection
repeated-loss classification
unrecoverable context result
```

## Draw and snapshot gaps

```txt
draw admission while Ready only
ContextLostResult
ContextSuspendedResult
gl.isContextLost evidence
typed draw result
snapshot context phase
snapshot context/resource generation
snapshot visible-frame correlation
first visible restored-frame acknowledgement
```

## GPU-resource gaps

```txt
resource manifest
resource generation
program lease
shader artifact identity
attribute/uniform binding manifest
buffer lease and role
candidate rebuild ownership
partial-resource rollback
atomic resource-generation install
exact-once predecessor retirement
stale resource rejection
```

## Recovery gaps

```txt
preserved detached CPU mesh
preserved last-good render-plan evidence
candidate shader/program rebuild
candidate buffer rebuild
baseline GL-state restoration
viewport restoration
candidate validation
bounded retry or ReloadRequired policy
scheduler-coordinated resume
recovery journal
```

## Public capability gaps

```txt
GameHost readback can report a completed renderer snapshot while context state is unknown
renderer exposes dispose but no suspend/recover operation
host stop does not retire renderer or context listeners
editor bridge has no context-loss/recovery capability contract
fatal projection only covers thrown errors
```

## Proof gaps

```txt
loss before first frame
loss between outline and color passes
loss during topology rebuild
program rebuild failure
buffer rebuild failure
partial candidate rollback
repeated loss/restoration
stale event and callback zero mutation
unrecoverable context / ReloadRequired
first visible recovered frame
source/build/Pages parity
```

## Preserved product and infrastructure gaps

```txt
runtime clock and single-chain RAF ownership
executable DSK provider binding and readiness
playable input, movement and path progression
focal-tree inspection and exactly-once objective/story progression
camera-bound grass visibility and LOD
audio user-gesture lifecycle
atomic save and migration continuity
independent deterministic replay
editor-bridge lifecycle and bounded error journal
```

## Completion boundary

A healthy renderer snapshot, increasing frame counter or successful `drawArrays` call is not recovery proof. Completion requires an admitted context event, context/resource generations, a validated detached rebuild, atomic installation, stale-handle rejection and the first visible frame citing the successor generation.
