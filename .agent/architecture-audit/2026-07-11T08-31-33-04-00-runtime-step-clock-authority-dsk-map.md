# Runtime Step and Clock Authority DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T08-31-33-04-00`

## Goal

Assign browser RAF, browser editor and Node headless stepping to one explicit authority without moving game-specific state, rendering or editor transport into a monolithic runtime.

## Current ownership

| Surface | Current owner | Current behavior | Missing authority |
|---|---|---|---|
| Browser frame request | `web-host-dsk` implementation | RAF callback calls `game.tick({ dt: 1/60, time: now/1000 })` | session generation, request identity, accepted-step result |
| Game tick | `into-the-meadow-game-dsk` implementation | increments frame and records numeric dt/time | finite checks, monotonic clock, expected frame, journal |
| Browser editor tick | browser editor bridge | calls `GameHost.game.tick()` directly | scheduler admission, work budget, render acknowledgement |
| Node editor tick | headless editor environment | loops `Number(ticks)` times and owns local `time` | integer count, cap, finite dt, termination guarantee |
| Reset | game plus editor adapters | browser resets state; Node also resets local time and enhancer | shared clock epoch and first-step result |
| Render correlation | web host and renderer | RAF renders after its own tick only | step ID and committed-frame identity |
| Observation | GameHost and editor snapshots | exposes state and renderer separately | bounded step journal and accepted/rejected result rows |

## Existing DSKs to update first

```txt
into-the-meadow-game-dsk
  own canonical step application and state frame sequence

web-host-dsk
  adapt RAF timestamps into authority commands
  never call raw tick outside admission

meadow-render-host-dsk
  correlate accepted step sequence with render submission and frame commit

meadow-diagnostics-dsk
  expose bounded step results, clock state and rejection reasons
```

The browser and Node editor bridges should remain adapters. They must not own independent clock policy.

## Coordinating parent domain

```txt
meadow-runtime-step-authority-domain
```

The parent owns only cross-surface orchestration:

```txt
receive step command
  -> validate session and expected frame
  -> validate requested step count
  -> validate finite non-negative delta
  -> derive or validate monotonic target time
  -> enforce deterministic work budget
  -> apply accepted steps exactly once
  -> return typed result
  -> append bounded journal row
  -> publish clone-safe observation
  -> correlate future render commit
```

## Candidate kits

```txt
runtime-step-command-kit
runtime-step-admission-kit
finite-delta-policy-kit
monotonic-simulation-clock-kit
step-budget-kit
step-sequence-kit
step-result-kit
step-journal-kit
session-frame-fence-kit
browser-raf-step-adapter-kit
browser-editor-step-adapter-kit
headless-editor-step-adapter-kit
reset-clock-transaction-kit
step-frame-correlation-kit
runtime-step-fixture-kit
```

## Ownership constraints

```txt
RAF timestamps are inputs, not authoritative state
editor adapters never call raw game.tick
renderers never decide step admission
rejected requests mutate no state
one accepted step increments frame once
step count is a bounded non-negative integer
simulation time is finite and monotonic within an epoch
reset retires the prior epoch
browser and Node adapters share one result schema
journals are bounded and clone-safe
```

## Dependency order

```txt
Runtime Session Lifecycle Authority
  -> Runtime Step Admission and Clock Integrity
  -> Source Provider and Render Identity
  -> Committed Frame Observation
  -> Interaction Commands and Objective Progress
```

Session lifecycle must establish session ID, run generation and disposal before the step authority can reject stale callbacks and out-of-epoch editor commands.