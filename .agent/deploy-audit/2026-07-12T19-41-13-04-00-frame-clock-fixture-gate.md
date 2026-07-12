# Frame Clock Fixture and Deployment Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-41-13-04-00`

## Summary

Current Node and browser checks prove static structure, render-plan validity, mesh behavior, editor operation and a completed browser render. They do not prove scheduler uniqueness, elapsed-time parity, catch-up budgets, pause/resume behavior or render/simulation clock correlation.

## Plan ledger

**Goal:** prevent deployment readiness from being inferred from a healthy but temporally unproven frame loop.

- [x] Inspect declared package scripts.
- [x] Inspect deterministic-scene smoke.
- [x] Inspect renderer-v2 smoke.
- [x] Inspect browser observation script.
- [x] Record missing scheduler and clock fixtures.
- [ ] Add controlled fake-RAF Node fixtures.
- [ ] Add source and built-output browser fixtures.
- [ ] Add Pages observation after implementation.

## Existing proof

```txt
static required files and descriptor ids
DSK registry structure
render-plan contract
CPU mesh and topology stability across time overlays
headless editor environment, commands and loops
browser boot, editor marker, completed renderer frame and screenshot size
```

## Existing proof does not establish

```txt
one live RAF chain
start/stop idempotency
pending callback cancellation
refresh-rate-independent simulation
monotonic clock admission
negative/NaN/Infinity input rejection
bounded long-stall catch-up
pause/resume accumulator policy
render/simulation time correlation
frame result and visible acknowledgement
source/build/Pages timing parity
```

## Required fixture set

```txt
tests/frame-clock-sample-smoke.mjs
tests/frame-scheduler-single-chain-smoke.mjs
tests/fixed-step-refresh-parity-smoke.mjs
tests/fixed-step-long-stall-budget-smoke.mjs
tests/frame-clock-invalid-input-smoke.mjs
tests/frame-render-correlation-smoke.mjs
tests/frame-stop-fatal-retirement-smoke.mjs
scripts/run-browser-frame-clock-observation.mjs
Pages frame-clock observation artifact
```

## Deployment gate

Do not mark the frame loop timing-safe until the source host, built output and GitHub Pages produce matching clock, step-batch and visible-frame receipts for the required matrix.
