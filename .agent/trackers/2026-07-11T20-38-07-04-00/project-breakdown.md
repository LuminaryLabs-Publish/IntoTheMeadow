# IntoTheMeadow Project Breakdown

**Timestamp:** `2026-07-11T20-38-07-04-00`

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

## Summary

This documentation-only pass audits runtime clock and step admission. Browser RAF, browser editor and Node headless execution currently use different time contracts while mutating the same game model.

## Plan ledger

**Goal:** establish one session-scoped monotonic clock, reset epoch and bounded step transaction before state or render time advances.

- [x] Enumerate the ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare the nine eligible repos with central ledger and root `.agent` state.
- [x] Skip actively unsynchronized `AetherVale` work.
- [x] Select only `IntoTheMeadow` as the oldest stable eligible repo.
- [x] Trace browser RAF, game tick/reset, render time, shader time, browser editor and Node headless paths.
- [x] Identify the interaction loop, domains, 44 declared kits and all offered services.
- [x] Define the runtime clock/step authority and fixture gate.
- [x] Refresh required root `.agent` docs and add timestamped audits.
- [x] Push directly to `main` without a branch or PR.
- [ ] Runtime implementation and fixtures remain future work.

## Interaction loop

```txt
RAF absolute timestamp + fixed dt
  -> raw game.tick
  -> state frame/lastTick
  -> render-plan time overlay
  -> shader wind phase

browser editor caller time/dt
  -> raw game.tick without frame commit

Node private accumulated time
  -> caller-controlled multi-step loop
  -> independent reset-to-zero behavior
```

## Domains

```txt
browser host and RAF
runtime session and lifecycle
runtime clock, step admission and reset epochs
game state and snapshots
browser editor capabilities
Node headless editor and workspace
source provider and DSK composition
terrain/path/grass/tree/wind/atmosphere
render-plan, CPU mesh and WebGL presentation
committed frame, diagnostics, validation and deploy
```

## Kit census

```txt
external declared kits: 1
local declared kits: 43
total declared kits: 44
```

The complete kit-to-service map remains in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Main finding

State advances by one nominal `1/60` step per browser callback while visual wind phase consumes absolute page time. Pauses, resets and delayed callbacks can therefore jump presentation without an equivalent simulation transition. Editor and headless paths add more unadmitted time sources.

## Required parent domain

```txt
meadow-runtime-clock-and-step-authority-domain
```

## Output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-11T20-38-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T20-38-07-04-00.md
.agent/architecture-audit/2026-07-11T20-38-07-04-00-runtime-clock-step-authority-dsk-map.md
.agent/render-audit/2026-07-11T20-38-07-04-00-simulation-render-time-parity-gap.md
.agent/gameplay-audit/2026-07-11T20-38-07-04-00-pause-reset-editor-clock-divergence-loop.md
.agent/interaction-audit/2026-07-11T20-38-07-04-00-step-command-admission-map.md
.agent/runtime-clock-audit/2026-07-11T20-38-07-04-00-monotonic-clock-reset-epoch-contract.md
.agent/deploy-audit/2026-07-11T20-38-07-04-00-runtime-clock-parity-fixture-gate.md
```

## Validation boundary

No runtime, dependency, render or deployment behavior changed. Existing checks were not run because this pass changed documentation only and the required clock fixtures do not exist.