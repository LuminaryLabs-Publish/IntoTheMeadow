# Frame Clock Fixture Central Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T19-49-41-04-00`

## Summary

Current static, render-plan, renderer and headless-editor checks do not prove browser callback ownership, refresh-rate parity, bounded stall recovery or source/build/Pages timing parity.

## Plan ledger

**Goal:** define the executable proof gate required before the scheduler authority can be marked ready.

- [x] Inspect declared package scripts.
- [x] Separate existing structural/render checks from missing browser-clock proof.
- [x] Define deterministic fake-RAF fixtures.
- [x] Define real browser and Pages observations.
- [x] Define acceptance criteria.
- [ ] Add and execute the fixtures after implementation.

## Existing checks cover

```txt
static source structure
DSK descriptor registry
render-plan contract
renderer v2 contract
scene determinism
headless-editor environment, command and loop surfaces
```

## Existing checks do not cover

```txt
one live RAF chain
retained/cancelled RAF handles
stale callback rejection
30/60/120 Hz simulation parity
jitter parity
bounded long-stall catch-up
dropped/deferred time results
invalid time rejection
pause/resume accumulator policy
fatal scheduler retirement
raw GameHost tick quarantine
render/simulation clock correlation
first visible clocked-frame acknowledgement
source/build/Pages timing parity
```

## Required deterministic fixtures

```txt
fake-raf-single-chain
refresh-rate-parity-30-60-120
callback-jitter-parity
long-stall-step-budget
invalid-time-zero-mutation
clock-regression-zero-mutation
pause-resume-no-accidental-catch-up
stop-start-generation-retirement
fatal-retirement
render-clock-correlation
```

## Required browser matrix

```txt
source host
built static output
GitHub Pages
60 Hz nominal callback stream
throttled 30 Hz stream
synthetic 120 Hz stream
hidden-tab or injected long stall
stop/start/reset lifecycle
WebGL2 and WebGL fallback
```

## Acceptance criteria

```txt
same admitted command stream and elapsed duration -> same simulation revision/time
one scheduler generation owns one live callback chain
long stalls remain within step and CPU budgets
invalid/stale callbacks cause zero mutation
render snapshot and visible acknowledgement cite accepted clock/simulation revisions
source, build and Pages expose equivalent results
```

## Current execution status

No scheduler fixtures, browser timing observations or Pages timing observations were executed in this documentation run.