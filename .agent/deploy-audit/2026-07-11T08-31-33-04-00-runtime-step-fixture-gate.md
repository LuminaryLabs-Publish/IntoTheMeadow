# Runtime Step Fixture Gate

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T08-31-33-04-00`

## Goal

Prevent deployment and editor automation from treating permissive raw tick calls as deterministic runtime control.

## Existing validation

`npm run check` currently includes static, DSK registry, render-plan, renderer, deterministic-scene and headless-editor smoke scripts.

The headless command smoke proves only:

```txt
runtime.tick --ticks 3 --dt 0.016
  -> capability reports ok
  -> state.frame becomes 3
```

It does not prove semantic admission or termination safety.

## Required scripts

```json
{
  "fixture:runtime-step-admission": "node tests/runtime-step-admission-fixture.mjs",
  "fixture:runtime-step-budget": "node tests/runtime-step-budget-fixture.mjs",
  "fixture:runtime-clock-monotonicity": "node tests/runtime-clock-monotonicity-fixture.mjs",
  "fixture:runtime-reset-epoch": "node tests/runtime-reset-epoch-fixture.mjs",
  "fixture:browser-editor-step": "node tests/browser-editor-step-fixture.mjs"
}
```

Wire all fixtures into `npm run check` after implementation.

## Admission matrix

```txt
canonical one-step request -> accepted
maximum allowed multi-step request -> accepted
zero steps -> documented typed no-op or rejection
negative steps -> rejected
fractional steps -> rejected
NaN steps -> rejected
Infinity steps -> rejected
budget + 1 -> rejected
negative dt -> rejected
NaN dt -> rejected
Infinity dt -> rejected
regressed target time -> rejected
stale expected frame -> rejected
duplicate command ID -> duplicate without mutation
retired reset epoch -> stale
stopped session -> rejected
disposed session -> rejected
```

## State invariants

For every rejected request:

```txt
frame unchanged
simulation time unchanged
clock epoch unchanged
game state fingerprint unchanged
render lineage unchanged
step journal receives one bounded rejection row
```

For every accepted request:

```txt
frame increments by accepted step count
simulation time advances monotonically
accepted count is within budget
one terminal result is returned
browser and Node schemas match
```

## Browser correlation proof

```txt
start one controlled session
commit one baseline frame
submit browser editor step with expected frame
require one accepted or rejected result
if accepted, require one later render commit referencing the step sequence
capture state, plan, renderer and canvas under one commit identity
repeat after reset, stop and restart
```

## Deployment rule

Do not claim deterministic headless control, replay-ready time, safe editor stepping or browser/editor parity until these fixtures are part of the required check command and pass on `main`.