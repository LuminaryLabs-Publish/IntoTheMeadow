# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T20-38-07-04-00`

## Goal

Make browser RAF, browser editor and Node headless execution consume one session-scoped monotonic clock and one typed step-admission transaction before any game state or render time advances.

## Plan ledger

- [ ] Preserve the current meadow descriptors, topology and visual composition.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete Host Capability Gateway and remove raw `GameHost.game` mutation authority.
- [ ] Introduce `RuntimeClockState` with session ID, reset epoch, clock revision, step sequence, simulation time and pause state.
- [ ] Convert RAF, browser editor and Node headless calls into typed `SimulationStepCommand` values.
- [ ] Validate finite non-negative delta, expected session/epoch/revision and monotonic step sequence.
- [ ] Add maximum delta, maximum ticks and per-command work budgets.
- [ ] Derive render time only from accepted simulation clock state.
- [ ] Rebase RAF source time on resume so paused wall time is not injected.
- [ ] Advance reset epoch and retire stale commands on reset.
- [ ] Return typed accepted, clamped, deferred, rejected and failed step results.
- [ ] Add bounded clock/step journals and clone-safe observations.
- [ ] Correlate state, render plan, renderer snapshot and committed frame with one step ID and clock revision.
- [ ] Add browser/headless parity, pause/resume, reset-epoch and work-budget fixtures.
- [ ] Wire fixtures into `npm run check` or an explicit browser gate.

## Existing owners to update first

```txt
web-host-dsk
into-the-meadow-game-dsk
Host Capability Gateway and Raw Runtime Quarantine
browser editor bridge
Node headless editor environment
meadow-diagnostics-dsk
Committed Frame Observation Authority
meadow-webgl-renderer-v2-kit
```

## Candidate coordinating kits

```txt
runtime-clock-id-kit
runtime-clock-state-kit
runtime-clock-revision-kit
simulation-step-command-kit
simulation-step-id-kit
simulation-step-admission-kit
finite-delta-policy-kit
step-work-budget-kit
monotonic-time-policy-kit
pause-resume-clock-kit
reset-epoch-kit
clock-source-adapter-kit
browser-raf-step-adapter-kit
browser-editor-step-adapter-kit
headless-step-adapter-kit
simulation-step-result-kit
clock-step-journal-kit
clock-observation-kit
clock-render-frame-correlation-kit
runtime-clock-parity-fixture-kit
pause-resume-clock-fixture-kit
reset-epoch-clock-fixture-kit
step-budget-fixture-kit
```

## Required state

```txt
RuntimeClockState
  runtimeSessionId
  resetEpoch
  clockId
  clockRevision
  stepSequence
  simulationTime
  lastAcceptedDelta
  pauseState
  sourceAdapterRevision
  lastResult
```

## Required step command

```txt
SimulationStepCommand
  commandId
  runtimeSessionId
  resetEpoch
  expectedClockRevision
  expectedStepSequence
  source
  requestedDelta
  requestedTicks
  sourceTimestamp
  workBudget
```

## Required result

```txt
SimulationStepResult
  commandId
  status
  reason
  acceptedDelta
  acceptedTicks
  predecessorClockRevision
  committedClockRevision
  committedStepSequence
  simulationTime
  gameStateFrame
  renderPlanTime
  committedFrameId
```

## Acceptance cases

```txt
normal 60 Hz RAF
30 Hz and 144 Hz RAF sources
large callback delay
hidden-tab interval
stop then resume
reset then first step
browser editor single step
browser editor multi-step rejection or bounded execution
Node headless multi-step
stale session, epoch, revision and sequence
negative, NaN and infinite delta
work-budget overflow
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Clock and Step Admission Authority
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
7. Committed Frame Observation Authority
7a. Fatal Runtime Failure Recovery Authority
8. Interaction Command and Objective Authority
9. DSK Runtime Consumption Authority
```

Do not fix the split by merely replacing `1/60` with measured RAF delta. The required boundary is an admitted, bounded and revisioned clock transaction shared by every execution surface.