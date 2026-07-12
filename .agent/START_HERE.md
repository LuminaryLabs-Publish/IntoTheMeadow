# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T19-41-13-04-00`  
**Status:** `frame-scheduler-step-admission-authority-audited`

## Summary

IntoTheMeadow is a deterministic meadow and editor proof with one pinned external provider, 43 local DSK/kit declarations, a persistent WebGL renderer, `GameHost`, browser editor bridge and Node headless-editor tooling.

The current audit isolates browser frame ownership. The host advances one fixed `1/60` step per RAF callback, renders from absolute RAF time, retains no RAF handle or scheduler generation, and exposes raw `game.tick()`. Future gameplay would therefore vary by refresh rate, long stalls can desynchronize simulation and visuals, and stop/start can create multiple recursive frame chains.

## Plan ledger

**Goal:** preserve all 44 kit surfaces while defining one monotonic, single-chain, budgeted frame transaction with simulation/render correlation and visible-frame proof.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `IntoTheMeadow` as the oldest eligible synchronized repository.
- [x] Identify the complete interaction loop, domains, all kits and offered services.
- [x] Add the `2026-07-12T19-41-13-04-00` frame-scheduler audit family.
- [x] Refresh root `.agent` routing and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement the clock, RAF lease, fixed-step budget and fixtures later.

## Read this first

```txt
.agent/trackers/2026-07-12T19-41-13-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T19-41-13-04-00.md
.agent/architecture-audit/2026-07-12T19-41-13-04-00-frame-scheduler-step-admission-dsk-map.md
.agent/render-audit/2026-07-12T19-41-13-04-00-render-simulation-clock-correlation-gap.md
.agent/gameplay-audit/2026-07-12T19-41-13-04-00-refresh-rate-dependent-simulation-loop.md
.agent/interaction-audit/2026-07-12T19-41-13-04-00-stop-start-frame-admission-map.md
.agent/frame-clock-audit/2026-07-12T19-41-13-04-00-raf-lease-fixed-step-contract.md
.agent/deploy-audit/2026-07-12T19-41-13-04-00-frame-clock-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The exploration/progression reconciliation at `2026-07-12T17-58-43-04-00` remains the immediate predecessor. Its playable-loop authority should consume admitted fixed steps rather than owning browser time.

## Current loop

```txt
RAF now
  -> game.tick({ time: now / 1000, dt: 1 / 60 })
  -> frame increments once
  -> render wind from absolute RAF time
  -> schedule another RAF callback

stop/start
  -> boolean only
  -> no RAF cancellation, lease or generation fencing

raw host
  -> window.GameHost.game exposes direct tick/reset
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kits: 44
required-v0.1 declarations: 15
planned declarations: 28
```

The complete kit and service inventory is in the current tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
meadow-frame-scheduler-step-admission-authority-domain
```

## Required flow

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

## Validation boundary

Documentation only. Runtime, gameplay, render, package, dependency and deployment files are unchanged. No scheduler, timing or Pages fixture was executed.
