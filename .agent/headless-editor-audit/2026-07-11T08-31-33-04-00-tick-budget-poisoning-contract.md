# Headless Editor Tick Budget and Clock Poisoning Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T08-31-33-04-00`

## Current implementation

The Node environment owns a mutable local `time` value and exposes:

```txt
runtime.tick({ dt = 1/60, ticks = 1 })
  -> for index < Number(ticks)
  -> time += Number(dt)
  -> game.tick({ dt, time })
```

The environment marks itself `permissive: true`, but permissive command routing must not mean unbounded or non-terminating execution.

## Failure classes

### Non-termination

```txt
ticks = Infinity
```

The loop condition remains true forever. A malformed editor call can hang the process instead of returning a typed failure.

### Silent coercion

```txt
ticks = 1.5 -> two iterations
ticks = "3" -> three iterations
ticks = NaN -> zero iterations and success
ticks = -1 -> zero iterations and success
```

The returned capability status does not describe what was accepted.

### Clock poisoning

```txt
dt = Infinity -> time becomes Infinity
dt = NaN -> time becomes NaN
dt = -1 -> time regresses
```

Once poisoned, later captures and observations inherit invalid time until reset.

### Unbounded synchronous work

A very large finite tick count blocks the Node process and can generate excessive state transitions before any observation or cancellation boundary.

## Required adapter contract

```txt
parse without applying
validate requestedSteps as an integer
validate requestedSteps against maxStepsPerCommand
validate dt as finite and policy-allowed
submit one immutable authority command
return one typed result
never loop before admission
never report completed when zero or partial work was silently applied
```

## Required timeout-independent proof

The fixture must not rely on waiting for an infinite loop. Test the pure admission function directly:

```txt
Infinity -> rejected before loop
very large count -> rejected before loop
fractional -> rejected before loop
NaN -> rejected before loop
negative -> rejected before loop
```

Then test the adapter with a fake step authority and assert the maximum number of calls.

## Browser parity

The Node environment and browser bridge should expose equivalent nested results:

```js
{
  ok: true,
  status: "completed",
  action: "runtime.tick",
  data: {
    stepResult: {
      status: "accepted" | "rejected" | "duplicate" | "stale",
      reason: "..."
    }
  }
}
```

Protocol completion is not domain acceptance.

## Reset parity

Node reset currently also sets local time to zero and invalidates the enhancer, while browser reset only resets game state. Both should delegate to one reset-clock transaction and return the same reset result schema.