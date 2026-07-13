# Gameplay audit: stop, restart, and fatal host loop

**Timestamp:** `2026-07-13T05-31-58-04-00`

## Summary

IntoTheMeadow currently has minimal active gameplay, but its immutable game state still advances once per accepted frame. Host pause, resume, fatal, and duplicate boot therefore define whether simulation time advances, resets, repeats, or becomes observable through stale public capabilities. Those decisions are not yet represented in game-state provenance.

## Plan ledger

**Goal:** ensure host lifecycle commands cannot create hidden simulation advancement, duplicate frame chains, or stale game-state readback.

- [x] Trace game tick ownership.
- [x] Trace host stop/start/fatal behavior.
- [x] Identify public state readback after stop/failure.
- [x] Define gameplay-facing lifecycle boundaries.
- [ ] Add deterministic fixtures later.

## Current loop

```txt
accepted RAF frame
  -> time = now / 1000
  -> game.tick({ time, dt: 1/60 })
  -> immutable state advances
  -> render plan receives time overlay
  -> frame renders
```

The game exposes `getState`, `getSnapshot`, `getDiagnostics`, `tick`, and `reset`. The editor bridge also exposes `runtime.tick` and `runtime.reset`, independent of the host's `stopped` boolean.

## Reachable lifecycle inconsistencies

### Editor tick after host stop

```txt
host.stop()
  -> RAF work stops
  -> NexusEditorEnvironment remains installed
  -> runtime.tick capability can still advance game state
  -> no lifecycle admission distinguishes intentional headless stepping from stale browser mutation
```

### Reset after fatal

```txt
frame fails
  -> host marks stopped
  -> GameHost and editor bridge remain callable
  -> runtime.reset can replace game state
  -> renderer remains stopped
  -> visible canvas can show predecessor state while public snapshot shows reset state
```

### Duplicate boot

```txt
startWebHost A
  -> game A and RAF A
startWebHost B
  -> game B and RAF B
  -> globals point to B
  -> A can continue advancing if its RAF chain remains active
```

### Stop then resume

```txt
stop
  -> no lifecycle discontinuity recorded
resume
  -> one new RAF requested
  -> game tick uses fixed dt and current wall-time overlay
  -> no first-resumed-state or generation acknowledgement
```

## Required gameplay-facing policy

```txt
Paused host
  -> browser RAF game ticks rejected
  -> editor stepping either rejected or admitted through an explicit debug/headless capability

Failed host
  -> gameplay mutation capabilities revoked by default
  -> diagnostics remain read-only and bounded

Retired host
  -> all game mutation commands rejected
  -> public snapshot identifies retired generation

Duplicate host
  -> one generation is authoritative
  -> predecessor ticks and resets perform zero successor mutation
```

## Required provenance

```txt
hostSessionId
hostGeneration
lifecycleRevision
simulationRevision
lastAcceptedFrameId
lastMutationSource: raf | editor | reset | boot
pausedAtFrameId
resumedAtFrameId
retiredAtRevision
```

## Required fixtures

```txt
stop then editor tick
fatal then reset
pause then resume
start host twice
stale predecessor frame
stale predecessor editor invocation
retire then getSnapshot
retire then tick/reset
```

## Validation boundary

No gameplay behavior changed and no simulation fixture was executed. The described paths are source-derived authority gaps, not evidence of observed state corruption.
