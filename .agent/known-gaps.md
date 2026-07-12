# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T20-38-07-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
AetherVale skipped because repo-local audit state was newer than its central ledger
IntoTheMeadow selected as the oldest stable eligible repository
only IntoTheMeadow changed in the Publish organization for this pass
```

## Current runtime clock and step gaps

### RAF time and delta disagree

The browser uses absolute RAF page time but always passes `dt = 1/60`. State and presentation therefore do not share one elapsed-time model when callbacks are delayed, throttled or resumed.

### Stop/start injects wall-clock pause into presentation

`stop()` only blocks callbacks. The next `start()` schedules a RAF whose timestamp includes the entire stopped interval, so wind phase jumps even though the game advances one nominal state step.

### Browser reset does not reset render time

`runtime.reset` recreates game state but does not establish a new clock origin or reset epoch. The next browser frame can pair frame-zero-like state with a large absolute render time.

### Browser editor bypasses clock ownership

`runtime.tick` directly accepts caller-provided `dt` and `time`. It has no finite-value validation, monotonicity check, session/epoch fence, expected revision, step sequence or work budget.

### Node headless uses an independent time model

The Node environment accumulates caller delta in a private variable and resets it to zero. It is not the same clock used by the browser route and cannot prove browser/headless parity.

### Multi-step work is unbounded

Node `runtime.tick` loops over caller-controlled `ticks`. There is no integer validation, maximum tick count, total delta limit, execution budget or partial-result classification.

### Step results and journals are absent

There is no typed accepted/clamped/deferred/rejected result, clock revision, step ID, reset epoch, source adapter ID or bounded journal row.

### Visible-frame correlation is absent

State `lastTick`, render-plan time, shader `uTime`, renderer snapshot and canvas frame do not cite one shared clock revision or step identity.

## Missing clock fixtures

```txt
RAF rate parity fixture
large callback delay fixture
hidden-tab throttle fixture
stop/resume rebase fixture
browser reset epoch fixture
browser editor stale-step fixture
non-finite and negative delta fixture
headless multi-step budget fixture
browser/headless parity fixture
clock-to-render-frame correlation fixture
```

## Retained fatal-runtime recovery gaps

```txt
startup acquisitions are not transactional
public globals can publish before full readiness
frame state mutates before frame success
renderer mutation is not staged
fatal handling is only presentation
capabilities survive fatal state
capture remains stale-capable
in-place restart reuses the damaged graph
disposal is disconnected from failure
late predecessor callbacks are not fenced
```

## Retained WebGL context recovery gaps

```txt
context events are unowned
context and resource generations are absent
same topology can conceal invalid GPU resources
renderer readiness and capture are not fenced
restoration is not transactional
repeated restoration and late-event fixtures are absent
```

## Retained DSK registry truth gaps

```txt
multiple declaration sources can drift
descriptor status is policy rather than runtime evidence
dependency requirements are empty
implementation and service bindings are absent
installDsks() creates no local instances
runtime consumers bypass registry lookup
renderer descriptor services drift from implementation
runtime diagnostics report counts rather than consumption truth
registry-owned reverse disposal is absent
registry tests prove shape rather than runtime consumption
```

## Retained interaction and objective gaps

```txt
path-progress and inspect commands absent
player path progress remains zero
inspection receipts absent
objective predicates and completion results absent
story transitions absent
browser/editor interaction parity absent
committed-frame progression acknowledgement absent
```

## Retained workspace path gaps

```txt
segment-aware containment absent
symlink escape policy absent
new-write ancestor containment absent
root/session/revision identity absent
operation budgets and typed filesystem results absent
```

## Retained host capability gaps

```txt
GameHost exposes raw game authority
capability registration remains bypassable
session and lifecycle fences absent
transport success can conceal domain failure
public observations are not revisioned
fatal capability quarantine is absent
```

## Retained lifecycle gaps

```txt
RAF request handles not retained
stop does not cancel pending callbacks
stop/start can create duplicate RAF chains
boot discards the host controller
fatal handling does not coordinate disposal
cold replacement-session ownership is absent
```

## Retained source-provider gaps

```txt
provider selection has no typed admission result
external and fallback plans lack parity classification
production import/export failure cannot reach the local fallback
provider failure cleanup and retry policy are absent
```

## Retained render and committed-frame gaps

```txt
render-affecting cache projection incomplete
rebuild is not transactional
enhancer and renderer invalidation are uncoordinated
state, plan, renderer and canvas lack one commit identity
editor tick and reset bypass visible rendering
WebGL context and resource generation are absent
fatal candidate rollback and last-known-good frame ownership are absent
```

## Deployment risk

A successful Pages frame can still combine a fixed nominal state delta with a wall-clock render phase. Pause, reset, browser editor calls and Node headless calls can produce different time histories without any typed rejection or visible proof. A moving wind shader is not evidence of a valid simulation clock.