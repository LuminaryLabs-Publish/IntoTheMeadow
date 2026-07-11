# Stop/Start Frame Multiplication Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-11T02-28-12-04-00`

## Current gameplay tick

Every admitted browser callback calls:

```txt
game.tick({ time: now / 1000, dt: 1 / 60 })
```

`advanceGameState()` then:

```txt
increments state.frame by 1
records the supplied fixed dt
records the RAF timestamp time
```

## Race timeline

```txt
state.frame = 100
RAF A pending

stop()
  stopped = true

start() before RAF A delivery
  stopped = false
  RAF B pending

RAF A runs
  state.frame = 101
  schedules RAF A2

RAF B runs
  state.frame = 102
  schedules RAF B2
```

The browser now has two permanent chains.

## Current visible effect

The current game state is mostly static, so the defect may appear only as:

```txt
frame counter acceleration
extra plan enhancement
extra WebGL work
extra HUD work
cache-hit counter acceleration
higher power and thermal cost
```

## Future gameplay inheritance

The existing tick boundary is where future systems would naturally attach:

```txt
player movement
path progress
objective timing
interaction cooldowns
animation state
wind simulation
AI
physics
audio timing
save cadence
```

Any such system would run once per callback, not once per authoritative frame, and would immediately inherit duplicated advancement after a stop/start race.

## Fixed dt mismatch

Two callbacks can carry similar RAF timestamps while each applies `dt: 1/60`.

```txt
wall time advances about one display interval
simulation dt advances two display intervals
```

The runtime has no accumulator, clock authority, callback-admission row, or simulation-step journal to expose the mismatch.

## Required gameplay-side contract

```txt
one admitted callback produces at most one simulation tick
stale callbacks produce zero ticks
stop produces zero future ticks
restart creates a new run generation
state.frame is monotonic inside one run
state.frame advances once per admitted frame
clock input and admission source are journaled
```

## Next gate

Runtime lifecycle and RAF authority must land before movement or objective reducers are activated.
