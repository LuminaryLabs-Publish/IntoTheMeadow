# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Branch:** `main`

**Last aligned:** `2026-07-11T20-38-07-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one pinned external provider, 43 local declarations, a persistent WebGL renderer, a browser editor bridge and a Node headless-editor surface.

This audit isolates a split runtime-clock contract. Browser RAF passes absolute page time with a hard-coded `dt = 1/60`, browser editor commands can inject any `time` and `dt` directly into the same game, and the Node environment owns a separate accumulated clock. Stop/start, reset and editor stepping can therefore produce different state, wind phase and frame evidence from the same logical command history.

## Plan ledger

**Goal:** establish one monotonic, session-scoped simulation clock and step-admission boundary shared by RAF, browser editor and Node headless execution before state or render time mutates.

- [x] Compare the complete accessible Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Skip `AetherVale` because its repo-local audit advanced to `2026-07-11T20-30-33-04-00` while the central ledger still showed `18-48-21`, indicating active unsynchronized work.
- [x] Select only `IntoTheMeadow` as the oldest stable eligible repository.
- [x] Trace browser RAF, game state, render-time propagation, shader time, browser editor tick/reset and Node headless tick/reset.
- [x] Preserve the complete interaction loop, domain map, kit inventory and kit-service map.
- [x] Define clock identity, step admission, pause/resume, reset epoch, bounded work, receipts, journals and parity fixtures.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh required root `.agent` files.
- [ ] Runtime implementation and executable clock fixtures remain future work.

## Current interaction loops

```txt
browser RAF
  -> requestAnimationFrame(now)
  -> time = now / 1000
  -> game.tick({ time, dt: 1/60 })
  -> getRenderPlan(time)
  -> shader uTime = renderPlan.time

browser editor
  -> runtime.tick({ dt, time })
  -> raw game.tick bypasses RAF ownership and render commit
  -> runtime.reset resets game state only

Node headless editor
  -> private time starts at 0
  -> each requested tick adds caller dt
  -> game.tick({ dt, time })
  -> reset sets private time to 0 and invalidates enhancer
```

## Main finding

```txt
browser simulation frame count: advances by one per RAF callback
browser dt: always 1/60, regardless of actual callback delay
browser render time: absolute RAF page time
browser stop/start: render time jumps across the pause
browser reset: state resets but absolute render time does not
browser editor tick: caller controls arbitrary time and dt
Node headless time: independently accumulated caller dt
step identity, clock revision and reset epoch: absent
```

The wind shader consumes `renderPlan.time`, so presentation can jump after a pause or reset while state records only one additional fixed step. Direct editor stepping can also move state without producing the corresponding visible frame.

## Required parent domain

```txt
meadow-runtime-clock-and-step-authority-domain
```

Core composition:

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

## Ordered implementation gates

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

## Read this pass first

```txt
.agent/trackers/2026-07-11T20-38-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T20-38-07-04-00.md
.agent/architecture-audit/2026-07-11T20-38-07-04-00-runtime-clock-step-authority-dsk-map.md
.agent/render-audit/2026-07-11T20-38-07-04-00-simulation-render-time-parity-gap.md
.agent/gameplay-audit/2026-07-11T20-38-07-04-00-pause-reset-editor-clock-divergence-loop.md
.agent/interaction-audit/2026-07-11T20-38-07-04-00-step-command-admission-map.md
.agent/runtime-clock-audit/2026-07-11T20-38-07-04-00-monotonic-clock-reset-epoch-contract.md
.agent/deploy-audit/2026-07-11T20-38-07-04-00-runtime-clock-parity-fixture-gate.md
```

A frame counter, absolute RAF timestamp and caller-provided delta are not one simulation clock. Success requires a session-scoped monotonic clock, admitted step commands, bounded work, explicit pause/reset epochs and visible-frame evidence that cites the same accepted step.