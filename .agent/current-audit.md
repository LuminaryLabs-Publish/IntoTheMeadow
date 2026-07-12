# IntoTheMeadow Current Audit

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Audit timestamp:** `2026-07-12T19-41-13-04-00`  
**Status:** `frame-scheduler-step-admission-authority-audited`

## Summary

IntoTheMeadow declares 44 kit surfaces and renders a deterministic meadow, but its browser frame loop has no clock or callback authority. Simulation receives a constant `1/60` step once per RAF callback, visual wind consumes absolute RAF time, stop/start does not retire a pending callback, and raw host access can bypass scheduler ownership.

## Plan ledger

**Goal:** define the authoritative frame transaction required before playable movement, path progress, objectives, story, audio or persistence can safely consume time.

- [x] Compare the full Publish inventory and central ledger.
- [x] Select only IntoTheMeadow under the oldest eligible synchronized rule.
- [x] Inspect boot, scheduler, state, renderer, host exposure and tests.
- [x] Preserve all domains, kits and offered services.
- [x] Define clock, RAF lease, fixed-step, lifecycle and render-correlation contracts.
- [x] Add a new timestamped tracker and audit family.
- [x] Refresh root `.agent` state and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute the authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

IntoTheMeadow      2026-07-12T17-58-43-04-00 selected
PhantomCommand     2026-07-12T18-11-53-04-00
PrehistoricRush    2026-07-12T18-18-59-04-00
HorrorCorridor     2026-07-12T18-38-51-04-00
ZombieOrchard      2026-07-12T18-48-07-04-00
MyCozyIsland       2026-07-12T19-00-22-04-00
TheUnmappedHouse   2026-07-12T19-11-01-04-00
AetherVale         2026-07-12T19-21-29-04-00
TheOpenAbove       2026-07-12T19-31-06-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
boot
  -> load external meadow provider
  -> validate local DSK descriptors
  -> create game, renderer, enhancer, GameHost and editor bridge
  -> request RAF

frame(now)
  -> derive time = now / 1000
  -> tick exactly once with dt = 1/60
  -> commit frame and lastTick without input validation
  -> enhance static-topology render plan
  -> pass absolute time to wind shader
  -> draw outline and color passes
  -> publish mesh/cache snapshot without clock provenance
  -> request successor RAF

lifecycle
  -> stop sets stopped = true
  -> start sets stopped = false and requests RAF
  -> no RAF handle, lease, generation or stale callback rejection
```

## Domains in use

```txt
browser shell, loading and fatal projection
provider import, fallback and validation
DSK identity, descriptors and declaration snapshots
game state, tick, reset and snapshots
authored story, objectives and interaction targets
terrain, path, grass, trees, scatter, wind and atmosphere
render enhancement, mesh generation and WebGL drawing
camera and visual-frame projection
GameHost, browser editor and headless editor
checks, build and Pages deployment

declared but inert:
input, player, interaction, objective, story, ecology, audio, UI, save and performance adaptation

missing:
runtime clock, frame scheduler, RAF lease, fixed-step accumulator,
step budgets, lifecycle results, stale callback rejection,
render-time projection and frame-clock acknowledgement
```

## Source-backed findings

```txt
host dt: constant 1/60 per callback
host time: absolute RAF timestamp / 1000
state validation: Number conversion only
RAF handle retained: no
cancelAnimationFrame used: no
scheduler generation: no
step accumulator: no
step budget: no
overflow result: no
render snapshot clock fields: no
raw game mutation exposed: yes
```

## Failure modes

```txt
30 Hz -> future dt consumers run at half authored speed
120 Hz -> future dt consumers run at double authored speed
long stall -> visual wind jumps while simulation advances one step
stop then immediate start -> predecessor and successor RAF chains can coexist
raw tick with negative/NaN/Infinity -> unadmitted temporal state
render success -> cannot prove matching simulation revision
```

## Kit and service census

```txt
external provider kits: 1
local declared kits: 43
total kit surfaces: 44
required-v0.1 declarations: 15
planned declarations: 28
runtime frame authorities: 0
```

The exact inventory is in:

```txt
.agent/trackers/2026-07-12T19-41-13-04-00/project-breakdown.md
.agent/trackers/2026-07-12T17-49-51-04-00/project-breakdown.md
.agent/kit-registry.json
```

## Required authority

```txt
meadow-frame-scheduler-step-admission-authority-domain
```

## Required transaction

```txt
RAF callback
  -> validate current runtime session, scheduler generation and RAF lease
  -> sample monotonic time
  -> classify first, normal, stalled, regressed, cancelled or stale
  -> accumulate bounded elapsed time
  -> admit zero or more fixed simulation steps under count and CPU budgets
  -> publish SimulationStepBatchResult
  -> publish explicit deferred-time or dropped-time result
  -> derive render time from committed simulation and interpolation evidence
  -> render one frame citing clock, step and render revisions
  -> schedule exactly one successor callback or commit an explicit stop
  -> publish FrameClockCorrelation and FrameObservation
  -> acknowledge the first visible frame citing the accepted frame result
```

## Current output

```txt
.agent/trackers/2026-07-12T19-41-13-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T19-41-13-04-00.md
.agent/architecture-audit/2026-07-12T19-41-13-04-00-frame-scheduler-step-admission-dsk-map.md
.agent/render-audit/2026-07-12T19-41-13-04-00-render-simulation-clock-correlation-gap.md
.agent/gameplay-audit/2026-07-12T19-41-13-04-00-refresh-rate-dependent-simulation-loop.md
.agent/interaction-audit/2026-07-12T19-41-13-04-00-stop-start-frame-admission-map.md
.agent/frame-clock-audit/2026-07-12T19-41-13-04-00-raf-lease-fixed-step-contract.md
.agent/deploy-audit/2026-07-12T19-41-13-04-00-frame-clock-fixture-gate.md
```

## Validation

Documentation only. No runtime, gameplay, render, package, dependency or deployment behavior was changed. Existing checks were inspected but not run.
