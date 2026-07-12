# Render and Simulation Clock Correlation Gap

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-41-13-04-00`

## Summary

The renderer animates shader wind from absolute RAF time while simulation advances by one constant step per callback. Its snapshot proves mesh and draw statistics but cannot prove which simulation or clock revision produced the visible frame.

## Plan ledger

**Goal:** require every rendered frame to cite one admitted clock sample and committed simulation-step batch.

- [x] Trace RAF time into render-plan time.
- [x] Trace fixed dt into game state.
- [x] Trace render snapshot fields.
- [x] Record hidden-tab and long-stall divergence.
- [x] Define render-time projection and correlation receipts.
- [ ] Add executable frame-correlation proof later.

## Current flow

```txt
RAF now
  -> time = now / 1000
  -> game.tick({ time, dt: 1/60 })
  -> render plan time = absolute RAF time
  -> shader uTime = render plan time
  -> wind animation jumps with RAF time
  -> renderer snapshot omits time and game revision
```

## Gap

After a stall of `S` seconds:

```txt
simulation advance: 1/60 second
visual wind advance: approximately S seconds
correlation receipt: none
```

The renderer snapshot contains plan ID, schema, topology key, vertex/triangle counts, cache counts and validation. It does not contain clock identity, frame sequence, simulation revision, simulation time, interpolation alpha or presentation acknowledgement.

## Required projection

```txt
RenderTimeProjection {
  frameId
  clockRevision
  stepBatchId
  simulationRevision
  simulationTime
  interpolationAlpha
  renderTime
  source: "simulation-plus-interpolation"
}
```

## Required invariants

```txt
render time never derives independently from unadmitted callback time
visible wind, camera and future gameplay projection cite one simulation revision
a failed render does not acknowledge a visible frame
a stale callback cannot publish a render snapshot
renderer snapshots expose frame and clock correlation
first-visible-frame proof cites the accepted FrameResult
```

## Proof gate

```txt
normal cadence parity
long-stall parity
pause/resume first frame
stop/start stale callback
render failure no-ack
WebGL2 and WebGL fallback
source, built output and Pages
```
