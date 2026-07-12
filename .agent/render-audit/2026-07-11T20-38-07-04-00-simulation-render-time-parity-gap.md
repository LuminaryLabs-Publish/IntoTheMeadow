# Simulation and Render Time Parity Gap

**Timestamp:** `2026-07-11T20-38-07-04-00`

## Current path

```txt
RAF now
  -> time = now / 1000
  -> game.tick({ dt: 1/60, time })
  -> renderPlan.time = time
  -> WebGL uTime = renderPlan.time
  -> wind shader phase
```

State advances one nominal step while presentation follows absolute page time. A delayed callback, pause/resume or reset can therefore move the visual wind phase far ahead without equivalent simulation steps.

## Missing evidence

```txt
clock ID
clock revision
step ID
reset epoch
accepted delta
simulation time
render-time derivation receipt
committed-frame clock receipt
```

The renderer snapshot records topology and geometry counts but not time, step or epoch provenance.

## Required render contract

```txt
accepted SimulationStepResult
  -> committed RuntimeClockState
  -> render plan with clockRevision, stepId and simulationTime
  -> shader uTime derived from simulationTime
  -> renderer result citing the same values
  -> committed frame acknowledgement
```

## Acceptance

```txt
pause does not jump uTime
reset establishes new epoch and declared time origin
same accepted command stream gives browser/headless render-time parity
failed or rejected step produces no new render-time commit
canvas capture cites the current clock and step receipt
```

Do not infer render-time correctness from unchanged topology or continuous animation.