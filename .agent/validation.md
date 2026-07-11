# IntoTheMeadow Validation

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T19-01-08-04-00`

## Plan ledger

**Goal:** distinguish visible error reporting from executable proof that startup and frame failures clean partial acquisitions, preserve the prior committed frame, quarantine public mutation/capture and recover only through an admitted new-generation path.

- [x] Review the full accessible Publish inventory.
- [x] Compare every eligible repository with the central ledger.
- [x] Verify central and root `.agent` coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `IntoTheMeadow`.
- [x] Read `AGENTS.md` and retained audits.
- [x] Inspect boot and host startup ordering.
- [x] Inspect frame mutation, plan publication and renderer submission order.
- [x] Inspect fatal projection, stop/start behavior and retained globals.
- [x] Inspect editor capabilities, listeners and capture.
- [x] Inspect renderer mutation and disposal surfaces.
- [x] Document failure identity, rollback, quarantine, cleanup and cold-restart requirements.
- [x] Change documentation only.
- [ ] Execute fixtures after implementation exists.

## Source inspection completed

```txt
startup acquisition ledger count: 0
reverse cleanup stack count: 0
startup result types: 0
fatal failure IDs: 0
fatal lifecycle states: 0
fatal capability fences: 0
fatal capture fences: 0
cold restart transactions: 0
last-known-good failure frame receipts: 0
renderer dispose methods: 1
editor bridge dispose methods: 1
fatal paths invoking those disposers: 0
```

## Proven from source

```txt
boot catch writes visible status and logs the error
startWebHost acquires provider, game, renderer, enhancer, GameHost and editor in sequence
GameHost is published before editor installation and before the first rendered frame
game.tick mutates state before render-plan validation and draw success
lastPlan is assigned before renderer.render completes
renderer.render can resize canvas, replace buffers, clear and issue draws before snapshot commit
showFatal sets stopped and writes text only
GameHost raw game remains exposed after fatal
editor runtime.tick, reset, renderer reads and capture remain registered after fatal
stop changes only a Boolean
start schedules the same callback on the same runtime graph
renderer and editor disposers exist but fatal paths do not call them
```

## Existing proof

Current checks prove:

```txt
required files exist
render-plan descriptors validate
CPU mesh is substantial and internally aligned
animation time does not change static topology
browser route can boot in an available Chromium
one screenshot can be created
editor bridge and GPU HUD marker can be observed
headless editor commands and loop can execute in their existing happy paths
```

Current checks do not prove:

```txt
reverse cleanup after startup failure
absence of leaked globals/listeners after failed boot
state/plan/render rollback after frame failure
last-known-good committed frame retention
fatal capability and capture quarantine
cleanup failure reporting
recoverable versus terminal failure classification
in-place restart rejection after fatal
cold replacement-session creation
new session/renderer/context/resource/frame generations
first replacement frame before readiness
repeated failure/restart without RAF/listener/global leaks
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
fatal recovery fixtures available: no
```

## Required DOM-free startup fixture

Construct fake acquisition adapters with:

```txt
startup attempt and candidate session IDs
provider acquisition
fake game factory
fake renderer factory
fake enhancer factory
global publication adapter
editor/listener lease adapter
reverse cleanup stack
cleanup failure injection
typed startup and cleanup results
bounded journal
```

Acceptance assertions:

```txt
failure at every acquisition phase invokes reverse cleanup exactly once
cleanup order is reverse acquisition order
no failed candidate publishes ready status
no global or listener from a failed candidate remains active
cleanup failure is reported but does not restore readiness
successful startup publishes globals only at final commit
```

## Required frame-failure fixture

Construct staged state, plan and renderer adapters with failure injection at:

```txt
game tick
source plan derivation
plan enhancement
contract validation
canvas resize
mesh construction
buffer replacement
outline draw
color draw
HUD projection
```

Acceptance assertions:

```txt
prior committed public frame remains authoritative
failed candidate receives one failure ID
mutation and capture capabilities are quarantined
no candidate is presented as committed
resource impact is classified
recoverable WebGL failure routes to context recovery
terminal failure retires the graph
```

## Required browser fixture

```txt
boot baseline and wait for committed frame
inject a controlled frame failure
assert visible fatal projection
assert GameHost mutation and editor capture reject with typed failure state
assert no additional automatic ticks occur
assert in-place start is rejected for terminal failure
perform cold restart
assert new session and renderer identities
wait for first replacement committed frame
assert canvas, renderer, GameHost and editor cite the replacement frame
repeat three times and inspect listener/RAF/global counts
```

## Failure injection matrix

```txt
external module import rejection
missing createMeadowAreaKit export
game construction exception
renderer context acquisition failure
shader compilation or program link failure
editor installation exception
plan contract failure
CPU mesh build exception
buffer creation/upload exception
first or second draw exception
HUD projection exception
cleanup callback exception
late predecessor callback after cold restart
```

Each case must assert:

```txt
no false ready state
no unowned active resource/global/listener
one typed failure result
one cleanup result
one bounded journal row
no stale successful capture
```

## Future commands

```bash
npm run fixture:startup-rollback
npm run fixture:frame-failure-quarantine
npm run fixture:fatal-capability-fence
npm run fixture:fatal-cleanup-failure
npm run smoke:cold-restart
npm run smoke:repeated-failure-recovery
npm run check
```

## Completion boundary

Do not claim fatal recovery because an error is visible or the RAF stopped. Recovery requires either a proven WebGL recovery transaction or complete predecessor disposal followed by a new session and renderer generation whose first committed frame is acknowledged across canvas, renderer, GameHost and editor observations.