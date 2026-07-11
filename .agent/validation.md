# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T08-31-33-04-00`

## Plan ledger

**Goal:** separate completed source inspection from executable proof and define the exact fixtures required before claiming deterministic browser or headless stepping.

- [x] Review the complete accessible Publish inventory.
- [x] Compare every eligible repository with the central ledger.
- [x] Verify root `.agent/START_HERE.md` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow`.
- [x] Read `AGENTS.md` and current `.agent` state.
- [x] Inspect browser RAF step production.
- [x] Inspect browser editor tick and reset.
- [x] Inspect Node headless time, tick loop and reset.
- [x] Inspect state frame and last-tick conversion.
- [x] Inspect current positive-path editor command smoke.
- [x] Document runtime-step authority and required fixtures.
- [x] Change documentation only.
- [x] Push documentation to `main`.
- [ ] Execute runtime checks after implementation exists.

## Source inspection completed

```txt
browser RAF calls raw game.tick: yes
browser editor calls raw game.tick: yes
Node editor calls raw game.tick: yes
shared step admission: no
finite dt validation: no
finite time validation: no
monotonic time policy: no
integer step-count validation: no
maximum step budget: no
session and expected-frame fence: no
clock epoch: no
typed step result: no
step journal: no
step-to-render correlation: no
```

## Existing proof

Current checks prove:

```txt
required files and host wiring exist
DSK registry shape is valid
fallback source plan can be generated
render plan can be enhanced and validated
CPU mesh is substantial
positive headless editor commands route
runtime.tick with ticks=3 and dt=0.016 reaches frame 3
headless capture can be produced
```

Current checks do not prove:

```txt
Infinity cannot enter a loop
large step counts are bounded
fractional counts are rejected
negative and NaN counts are rejected truthfully
non-finite dt and time are rejected
negative dt is rejected
simulation time is monotonic
browser editor cannot bypass RAF session policy
reset retires prior commands
rejected requests preserve state
browser and Node results match
accepted steps reach a correlated visible frame
```

## Execution status

```txt
npm run check executed in this documentation pass: no
browser smoke executed: no
Pages smoke executed: no
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
```

The GitHub connector was used for this documentation audit and does not execute repository commands.

## Required pure admission fixture

Test the command preflight without entering an adapter loop.

Accepted:

```txt
requestedSteps = 1
requestedSteps = configured maximum
requestedDt = canonical 1/60
finite monotonic explicit target time
matching session, epoch and expected frame
```

Rejected:

```txt
requestedSteps = 0 according to chosen policy
requestedSteps < 0
requestedSteps = 1.5
requestedSteps = NaN
requestedSteps = Infinity
requestedSteps > configured maximum
requestedDt < 0
requestedDt = NaN
requestedDt = Infinity
requestedDt outside configured range
requestedTime = NaN or Infinity
requestedTime below committed time
stale session or clock epoch
stale or future expected frame
disposed session
```

Each rejection must assert:

```txt
state frame unchanged
simulation time unchanged
clock epoch unchanged
game state fingerprint unchanged
render lineage unchanged
one bounded rejection row appended
```

## Required adapter budget fixture

Use a fake step authority and count invocations.

```txt
browser RAF adapter submits at most one command per callback
browser editor adapter submits exactly one command per invoke
Node adapter validates before looping
Node adapter never exceeds maxStepsPerCommand
Infinity and large counts reach zero loop iterations before rejection
```

## Required monotonic clock fixture

```txt
canonical sequence advances time monotonically
explicit equal time follows documented duplicate/no-op policy
regressed time rejects
negative delta rejects
reset increments clockEpoch
old-epoch command rejects
first new-epoch step is accepted and correlated
```

## Required browser concurrency fixture

```txt
start controlled RAF session
record baseline state frame and render commit
invoke browser editor runtime.tick
assert session policy result
if accepted, assert exactly one state increment
assert one later render commit references the step sequence
repeat during stop, restart and dispose
```

## Required schema parity fixture

Browser and Node adapters must return equivalent nested fields:

```txt
commandId
sessionId
clockEpoch
status
reason
acceptedSteps
priorFrame
committedFrame
priorTime
committedTime
journalSequence
renderCommitId
```

## Future commands

```bash
npm run fixture:runtime-step-admission
npm run fixture:runtime-step-budget
npm run fixture:runtime-clock-monotonicity
npm run fixture:runtime-reset-epoch
npm run fixture:browser-editor-step
npm run check
```

## Completion boundary

Do not claim deterministic editor stepping because one positive three-step smoke passes. Completion requires finite rejection, a strict work budget, monotonic time, reset epoch fencing, truthful typed results, browser/Node parity and step-to-render correlation.