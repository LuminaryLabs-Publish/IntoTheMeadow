# Snapshot Read Versus Replay Loop

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-12T00-58-12-04-00`

## Goal

Separate a stable read of current state from deterministic construction, simulation, reset and progression replay.

## Current game loop

```txt
createIntoTheMeadowGame()
  -> choose external provider when supplied, otherwise local fallback
  -> install DSK descriptors
  -> build base render plan at time 0
  -> create initial immutable state

tick(input)
  -> frame += 1
  -> lastTick = { dt, time }

reset()
  -> replace state with another initial state

getSnapshot()
  -> manifest + current state + base render plan + diagnostics
```

## Current deterministic smoke

```txt
one game
  -> no tick
  -> no command
  -> no reset
  -> snapshot A
  -> snapshot B
  -> compare serialized values
```

This cannot exercise:

```txt
constructor independence
provider differences
seed differences
frame/tick order
absolute-time differences
stop/start behavior
reset residue
objective or story progression
future interaction commands
browser/headless scheduling
```

## Replay matrix required

```txt
A. two independent fallback-backed constructions
B. two independent production-provider constructions
C. fallback versus external provider parity classification
D. same normalized tick schedule
E. same sequenced interaction commands
F. reset then replay
G. stop/start then replay
H. 30/60/120 Hz presentation schedules mapped to equal committed ticks
I. browser versus Node headless execution
J. altered seed/input/provider negative controls
```

## Checkpoints

At minimum compare after:

```txt
construction
tick 1
path-progress command
objective transition
inspect command
story transition
reset
replayed terminal checkpoint
first visible frame
```

## Required invariant

```txt
same admitted scenario
  -> same committed state and progression at every checkpoint

different admitted cause
  -> expected, localized and explainable divergence
```

## Completion boundary

Deterministic gameplay is not proven until independent runtimes reach the same checkpoint fingerprints after the same admitted scenario and reset/replay cycle.