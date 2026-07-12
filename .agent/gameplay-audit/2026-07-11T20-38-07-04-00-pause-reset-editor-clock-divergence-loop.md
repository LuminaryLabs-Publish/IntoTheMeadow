# Pause, Reset and Editor Clock Divergence Loop

**Timestamp:** `2026-07-11T20-38-07-04-00`

## Reachable divergence

```txt
browser runs
  -> state frame advances with dt 1/60
  -> render time follows RAF page time
stop host
  -> no admitted state steps
  -> wall clock continues
start host
  -> one state frame advances
  -> render time jumps by the whole stopped interval
```

Reset diverges separately:

```txt
browser editor runtime.reset
  -> game state returns to frame 0
  -> no browser clock reset or epoch advance
next RAF
  -> frame 1 state
  -> large absolute render time
```

Direct editor stepping can also mutate state with caller-selected time without rendering. The Node environment resets its own private clock to zero, so equivalent reset commands do not have equivalent time semantics.

## Gameplay risk

Current state only records `lastTick`; future movement, objectives, ecology, audio or interaction timers could inherit whichever adapter invoked the game. Once those systems become active, browser rate, paused duration or editor commands could change gameplay outcomes.

## Required policy

```txt
pause: reject/defer steps and freeze simulation time
resume: rebase source timestamp
reset: advance reset epoch and define new time origin
editor step: require expected session/epoch/revision
headless multi-step: bounded deterministic batch
render: consume accepted simulation time only
```

## Fixtures

```txt
pause for 30 seconds then resume
reset after long-running browser session
editor step during active RAF
stale editor step after reset
same reset/step script in browser and Node
```

No gameplay-timing claim is valid until these cases produce typed and matching results.