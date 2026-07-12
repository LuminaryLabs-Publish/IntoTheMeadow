# Runtime Clock and Step Authority DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T20-38-07-04-00`

## Summary

Three adapters currently create time independently and call the same mutable game directly. No parent domain owns clock identity, step admission, reset epochs, work budgets or frame correlation.

## Current owner map

```txt
web-host-dsk
  RAF source, fixed dt, absolute browser time, stop/start

into-the-meadow-game-dsk
  state frame and unvalidated lastTick

browser editor bridge
  arbitrary caller dt/time and raw reset

Node headless environment
  private accumulated time and caller-controlled tick loop

render-plan enhancer
  dynamic time overlay over cached topology

meadow-webgl-renderer-v2-kit
  uTime shader consumption
```

## Missing parent domain

```txt
meadow-runtime-clock-and-step-authority-domain
```

## Proposed kit map

```txt
meadow-runtime-clock-and-step-authority-domain
  -> runtime-clock-id-kit
  -> runtime-clock-state-kit
  -> runtime-clock-revision-kit
  -> simulation-step-command-kit
  -> simulation-step-id-kit
  -> simulation-step-admission-kit
  -> finite-delta-policy-kit
  -> step-work-budget-kit
  -> monotonic-time-policy-kit
  -> pause-resume-clock-kit
  -> reset-epoch-kit
  -> clock-source-adapter-kit
  -> browser-raf-step-adapter-kit
  -> browser-editor-step-adapter-kit
  -> headless-step-adapter-kit
  -> simulation-step-result-kit
  -> clock-step-journal-kit
  -> clock-observation-kit
  -> clock-render-frame-correlation-kit
  -> runtime-clock-parity-fixture-kit
  -> pause-resume-clock-fixture-kit
  -> reset-epoch-clock-fixture-kit
  -> step-budget-fixture-kit
```

## Required transaction

```txt
source event
  -> adapter creates SimulationStepCommand
  -> admit session, reset epoch, expected revision and sequence
  -> validate finite delta and bounded ticks/work
  -> apply pause/resume policy
  -> advance monotonic clock once
  -> advance game state once per accepted step
  -> derive render time from committed clock
  -> render and commit matching frame
  -> publish typed result, observation and bounded journal row
```

## Ownership rule

`game.tick()` becomes an internal consumer of accepted steps. RAF, browser editor, Node editor and `GameHost` must not retain direct mutation authority.

## Promotion boundary

Keep browser and product adapters local. Generic clock state, step command/result, delta policy, reset epoch and work-budget contracts may move into NexusEngine only after browser/headless parity and stale-command fixtures pass.