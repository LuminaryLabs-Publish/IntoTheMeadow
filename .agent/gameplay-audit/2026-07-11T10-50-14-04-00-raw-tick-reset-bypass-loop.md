# Raw Tick and Reset Bypass Loop

**Timestamp:** `2026-07-11T10-50-14-04-00`

## Current gameplay mutation routes

```txt
RAF -> game.tick
browser editor runtime.tick -> GameHost.game.tick
page script -> GameHost.game.tick
browser editor runtime.reset -> GameHost.game.reset
page script -> GameHost.game.reset
page script -> GameHost.game.rebuildRenderPlan
```

## Gameplay risk

The same public object can advance state, reset state and rebuild world source data without a common authority.

Consequences:

```txt
state can advance outside scheduler ownership
reset can occur while RAF is active
old commands are not retired
objective or interaction commands added later can bypass admission
replay cannot prove which public path caused a state frame
save/load cannot distinguish admitted from direct mutations
rendered output can lag behind state mutation
```

## Required gameplay contract

All state-changing operations must be internal domain services reached only after host capability admission.

```txt
host command
  -> session and lifecycle fence
  -> command-specific admission
  -> state transaction
  -> typed result
  -> state observation
  -> optional render commit
```

## Fixture cases

```txt
direct GameHost.game access is absent
one admitted step changes frame exactly once
raw page-script tick is impossible
reset retires prior session or clock epoch
rebuild source plan requires capability admission
rejected commands leave state and render lineage unchanged
accepted gameplay commands retain command and session identity
```

This boundary is a prerequisite for the existing Runtime Step and Interaction Command audits.