# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T08-31-33-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as oldest eligible central-ledger entry
only IntoTheMeadow changed in the Publish organization
```

## Runtime step and clock gaps

### Multiple step producers share raw mutation

```txt
browser RAF -> game.tick
browser editor -> GameHost.game.tick
Node headless editor -> repeated game.tick
```

There is no shared admission owner.

### Numeric values are coerced, not validated

`advanceGameState()` stores `Number(dt)` and `Number(time)`.

Missing checks:

```txt
finite dt
finite time
non-negative dt
configured dt range
monotonic time
expected prior frame
session and clock epoch
```

### Browser editor can regress time

`runtime.tick` defaults `time` to zero. It can run while RAF is active and advance `state.frame` outside the RAF path without enhancing or rendering a frame.

### Node step count is unbounded

```txt
Infinity -> non-terminating loop
fractional count -> implicit extra iteration
negative count -> zero work with completed response
NaN count -> zero work with completed response
very large count -> unbounded synchronous work
```

### Headless local time can be poisoned

```txt
dt = Infinity -> time becomes Infinity
dt = NaN -> time becomes NaN
dt < 0 -> time regresses
```

### Reset ownership diverges

```txt
browser reset -> game state only
Node reset -> game state + local time + enhancer invalidation
```

No shared clock epoch or first-post-reset result exists.

### Capability success is not domain acceptance

The editor protocol reports whether execution threw. It does not return semantic accepted, rejected, stale or duplicate step results.

### No bounded journal or frame correlation

Missing:

```txt
step command ID
step sequence
source identity
accepted count
rejection reason
clock epoch
bounded journal
render commit ID
first post-reset frame acknowledgement
```

## Required fixture gaps

```txt
finite dt and time rejection
negative and out-of-range dt rejection
integer step-count validation
step budget enforcement
monotonic time enforcement
browser RAF/editor concurrency
session and expected-frame fencing
duplicate command handling
reset epoch retirement
browser/Node result-schema parity
step-to-render correlation
```

## Retained lifecycle gaps

```txt
RAF request handles are not retained
stop does not cancel a pending callback
stop/start can create duplicate RAF chains
boot discards the returned host controller
GameHost and editor globals have incomplete lease ownership
fatal handling does not coordinate disposal
```

Runtime Session Lifecycle Authority remains the prerequisite for the step clock.

## Retained source-provider gaps

```txt
production fallback is unreachable after external import or export failure
tests use the local fallback instead of the deployed external provider
provider selection has no typed admission result
external and fallback plans lack parity classification
```

## Retained render-cache gaps

```txt
source revision absent
render-affecting projection incomplete
cache key schema implicit
rebuild not transactional
enhancer and renderer invalidation uncoordinated
mesh and GPU buffer lineage incomplete
```

## Retained committed-frame gaps

```txt
state changes before render success
lastPlan changes before renderer completion
editor tick and reset bypass rendering
state, plan, renderer and canvas lack one commit identity
```

## Retained interaction command gaps

```txt
path-progress and inspect commands are authored but cannot be dispatched
player and path mutation absent
objective predicates and story triggers not executed
accepted/rejected result authority absent
```

## Registry truth gap

The DSK registry declares clock-adjacent responsibilities through game, host, player, input, diagnostics and render-host DSKs, but declaration does not prove a finite, monotonic or bounded runtime-step service exists.

## Deployment risk

A headless automation request can hang the Node process with an infinite step count or poison time with a non-finite delta. A browser editor request can regress recorded time and advance state outside the RAF-render path while still returning a successful capability response. Current CI cannot detect these failures.