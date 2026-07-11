# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-11T08-31-33-04-00`

## Current ledge

```txt
IntoTheMeadow Runtime Step Admission and Clock Integrity
+ Finite / Monotonic / Work-Budget Fixture Gate
```

## Required implementation order

```txt
1. Runtime Session Lifecycle Authority
2. Runtime Step Admission and Clock Integrity
3. Source Provider Authority
4. Render Topology Identity Authority
5. Committed Frame Observation Authority
6. Interaction Command Authority
7. DSK Registry Consumption Proof
```

## Read first

```txt
.agent/trackers/2026-07-11T08-31-33-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T08-31-33-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T08-31-33-04-00-runtime-step-clock-authority-dsk-map.md
.agent/render-audit/2026-07-11T08-31-33-04-00-out-of-band-step-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-11T08-31-33-04-00-unbounded-editor-step-loop.md
.agent/interaction-audit/2026-07-11T08-31-33-04-00-runtime-tick-command-admission-map.md
.agent/clock-authority-audit/2026-07-11T08-31-33-04-00-finite-monotonic-step-budget-contract.md
.agent/headless-editor-audit/2026-07-11T08-31-33-04-00-tick-budget-poisoning-contract.md
.agent/deploy-audit/2026-07-11T08-31-33-04-00-runtime-step-fixture-gate.md
```

Retained companion context:

```txt
.agent/lifecycle-audit/2026-07-11T02-28-12-04-00-single-raf-global-lease-rollback-contract.md
.agent/source-provider-audit/2026-07-11T04-39-58-04-00-external-fallback-contract.md
.agent/render-cache-audit/2026-07-11T06-38-59-04-00-source-key-mutation-contract.md
.agent/frame-authority-audit/2026-07-11T00-30-48-04-00-atomic-committed-frame-contract.md
.agent/objective-system-audit/2026-07-11T04-49-30-04-00-objective-story-transition-contract.md
.agent/registry-truth-audit/2026-07-11T02-20-44-04-00-declared-runtime-consumption-contract.md
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories have central ledger entries and root `.agent/START_HERE.md` state.

```txt
IntoTheMeadow       selected / 2026-07-11T06-38-59-04-00
MyCozyIsland         tracked  / 2026-07-11T07-01-49-04-00
PrehistoricRush      tracked  / 2026-07-11T07-08-45-04-00
TheOpenAbove         tracked  / 2026-07-11T07-18-44-04-00
HorrorCorridor       tracked  / 2026-07-11T07-30-40-04-00
PhantomCommand       tracked  / 2026-07-11T07-38-25-04-00
ZombieOrchard        tracked  / 2026-07-11T07-59-08-04-00
TheUnmappedHouse     tracked  / 2026-07-11T08-11-14-04-00
AetherVale           tracked  / 2026-07-11T08-18-31-04-00
TheCavalryOfRome     excluded by rule
```

Only `LuminaryLabs-Publish/IntoTheMeadow` is in scope for this pass.

## Product read

`IntoTheMeadow` has three independent step producers around one raw `game.tick()` function:

```txt
browser RAF
browser editor bridge
Node headless editor
```

No shared authority validates finite values, monotonic time, integer step counts, work limits, session identity, expected frame or reset epoch.

## Current failure path

```txt
browser editor runtime.tick
  -> defaults time to 0
  -> calls raw game.tick while RAF may be active
  -> state frame advances outside scheduler
  -> recorded time can regress
  -> no render acknowledgement

Node runtime.tick
  -> Number(ticks)
  -> unbounded synchronous loop
  -> Infinity can never terminate
  -> fractional, negative and NaN counts return misleading success
  -> non-finite dt can poison time and state
```

## Exact inventory retained

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
required-v0.1 local kits: 15
runtime source-backed surfaces cataloged: 24
```

## Next implementation boundary

Update existing `into-the-meadow-game-dsk`, `web-host-dsk`, `meadow-render-host-dsk` and `meadow-diagnostics-dsk` first. Add one coordinating `meadow-runtime-step-authority-domain` only for cross-surface admission, clock sequencing, work budgeting, result journaling and render correlation.

Do not add movement timing, wind simulation, objective timers or replay on top of raw editor tick calls. First prove finite rejection, monotonic time, bounded work, reset epoch retirement and browser/Node result parity.