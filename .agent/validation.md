# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T20-38-07-04-00`

## Plan ledger

**Goal:** distinguish a visually animated meadow from executable proof that browser RAF, browser editor and Node headless execution share one monotonic, bounded and reset-aware runtime clock.

- [x] Review the complete accessible Publish inventory.
- [x] Compare every eligible repository with central tracking.
- [x] Verify central and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow` after skipping active unsynchronized `AetherVale` work.
- [x] Inspect browser RAF time and delta construction.
- [x] Inspect game state tick and reset behavior.
- [x] Inspect render-plan time propagation and shader consumption.
- [x] Inspect browser editor tick/reset capabilities.
- [x] Inspect Node headless tick/reset and multi-step behavior.
- [x] Document clock identity, admission, reset epoch, work budget and parity requirements.
- [x] Change documentation only.
- [ ] Execute fixtures after implementation exists.

## Source inspection completed

```txt
browser authoritative clock objects: 0
runtime clock IDs: 0
clock revisions: 0
step command IDs: 0
step admission policies: 0
reset epochs: 0
step work budgets: 0
typed step results: 0
clock journals: 0
clock/frame correlation receipts: 0
raw game.tick public paths: browser RAF, GameHost.game, browser editor, Node headless
```

## Proven from source

```txt
browser RAF converts now to seconds
browser RAF always passes dt = 1/60
game state increments frame by exactly one per tick
game state stores caller dt and time without validation
render plan overlays caller time
render-plan enhancer preserves dynamic time over cached topology
WebGL renderer uploads renderPlan.time to uTime
wind vertex shader uses uTime to calculate phase
stop changes only a Boolean
start schedules a later RAF on the same clock source
browser editor runtime.tick accepts arbitrary dt and time
browser editor runtime.reset does not reset an owned browser clock
Node headless maintains a separate private accumulated time
Node headless loops over caller-provided ticks without an explicit budget
Node reset sets its private time to zero and invalidates the enhancer
```

## Existing proof

Current checks prove:

```txt
required files exist
render-plan descriptors validate
CPU mesh data is internally aligned
changing time does not change static topology
renderer can consume dynamic time
headless editor commands execute in happy paths
an available browser can produce a screenshot
```

Current checks do not prove:

```txt
browser RAF rate independence
monotonic simulation-time ownership
large-delay clamp or rejection
pause/resume rebasing
reset-epoch fencing
browser editor step admission
finite delta and integer tick validation
bounded multi-step execution
browser/headless parity
clock-to-render-frame correlation
stale session, epoch, revision or sequence rejection
```

## Execution status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check executed: no
browser smoke executed: no
runtime clock fixtures available: no
```

## Required DOM-free clock fixture

Construct a fake runtime clock with adapters for RAF, browser editor and headless commands.

Acceptance assertions:

```txt
30 Hz, 60 Hz and 144 Hz source events can produce the same admitted step sequence
negative, NaN and infinite delta reject without mutation
large delta follows explicit clamp, split, defer or reject policy
non-integer or over-budget tick counts reject
stale session, reset epoch, clock revision and step sequence reject
accepted step advances clock revision and sequence exactly once
result includes accepted delta, simulation time and game-state frame
bounded journal records one row per accepted or rejected command
```

## Required pause/resume fixture

```txt
advance baseline steps
pause clock
advance wall clock without admitted simulation steps
resume through source-adapter rebase
assert simulation and render time do not include paused wall duration
assert first resumed step has one new revision and bounded delta
```

## Required reset fixture

```txt
advance baseline clock
capture predecessor session, epoch, revision and step
reset
assert reset epoch advances
assert simulation time follows declared reset origin
assert predecessor commands reject
assert first post-reset state, plan and frame cite the new epoch
```

## Required browser/headless parity fixture

Run an identical accepted command stream through browser and Node adapters.

Assert equality for:

```txt
clock revision
step sequence
simulation time
game state frame
last accepted delta
render-plan time
wind phase inputs
committed-frame clock receipt
```

## Required browser smoke

```txt
boot and wait for a committed frame
record clock and frame receipt
simulate delayed RAF callback
assert explicit delay policy
pause and resume
assert no presentation-time jump
reset through public admitted capability
assert new reset epoch
invoke stale editor step
assert typed rejection and no state/render mutation
compare browser observation with headless replay
```

## Future commands

```bash
npm run fixture:runtime-clock
npm run fixture:runtime-step-admission
npm run fixture:pause-resume-clock
npm run fixture:reset-epoch-clock
npm run fixture:browser-headless-clock-parity
npm run smoke:runtime-clock-frame-correlation
npm run check
```

## Completion boundary

Do not claim deterministic stepping because state stores `dt`, or clock correctness because wind animates. Completion requires one accepted clock revision and step identity to propagate through state, render-plan time, shader input and committed-frame evidence across browser and headless execution.