# Finite Monotonic Step Budget Contract

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T08-31-33-04-00`

## Goal

Define the canonical simulation clock contract shared by browser RAF, browser editor, Node headless editor, reset and future replay.

## Canonical clock state

```js
{
  sessionId: "arrival-meadow:session-0",
  clockEpoch: 0,
  stepSequence: 12,
  stateFrame: 12,
  simulationTime: 0.2,
  canonicalDt: 1 / 60,
  maxStepsPerCommand: 8,
  running: true,
  disposed: false
}
```

## Invariants

```txt
all numeric clock values are finite
stateFrame and stepSequence are non-negative integers
accepted step count is a positive integer within budget
simulationTime never decreases inside one clockEpoch
one accepted step increments stateFrame exactly once
one rejected request increments nothing
reset increments clockEpoch and returns simulationTime to its defined origin
commands from retired epochs are stale
stopped and disposed sessions reject steps
```

## Time policy

RAF wall timestamps should be sampled by an adapter and converted into a bounded simulation request. They should not become simulation authority directly.

```txt
wall time -> sample
sample -> bounded elapsed estimate
elapsed estimate -> zero or more canonical steps under budget
canonical steps -> monotonic simulation time
```

For the current route, the simplest first contract is one canonical `1/60` step per admitted RAF callback. Catch-up and frame-rate-independent accumulation should be a later explicit policy, not implicit caller behavior.

## Step-count policy

```txt
minimum accepted count: 1
maximum accepted count: configurable deterministic budget
fractional count: reject
NaN or infinite count: reject
negative count: reject
zero count: typed no-op or reject, chosen once and documented
```

## Delta policy

```txt
canonical browser dt: 1 / 60
finite custom headless dt: allowed only under explicit test profile
negative dt: reject
zero dt: reject or typed no-op
NaN or infinity: reject
out-of-range dt: reject
```

## Reset transaction

```txt
preflight reset
  -> fence old step commands
  -> stop or suspend step producer
  -> increment clockEpoch
  -> reset game state
  -> reset simulationTime
  -> clear or segment step journal
  -> invalidate render lineage as required
  -> commit reset result
  -> admit first post-reset step
  -> correlate first post-reset render
```

## Observation

Expose clone-safe state only:

```txt
clock state
last accepted result
last rejected result
bounded result journal
source-specific request counts
accepted step counts
rejection counts by reason
last correlated render commit
```

## Fixture cases

```txt
canonical browser sequence
headless multi-step within budget
budget rejection
all non-finite values
all negative values
fractional count
explicit time regression
duplicate command
stale expected frame
retired reset epoch
stopped session
disposed session
browser and Node result-schema parity
```

This contract should be deterministic before movement, wind simulation, objective timing or replay consumes runtime time.