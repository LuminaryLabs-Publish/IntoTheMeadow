# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Last aligned:** `2026-07-11T19-01-08-04-00`

## Summary

`IntoTheMeadow` is a DSK-composed browser meadow with one commit-pinned external provider, 43 local DSK/kit declarations, a persistent WebGL renderer, a browser editor bridge and a Node headless-editor surface.

The current audit establishes a fatal-runtime recovery gap. Startup and frame failures are converted into visible text, but they do not enter an authoritative failure state, roll back staged state, quarantine public capabilities, clean up partially acquired resources, or require a cold replacement session before rendering resumes.

## Plan ledger

**Goal:** make startup and frame failure a typed, terminally owned transaction so the last known-good frame remains truthful, public mutation and capture are fenced, partial acquisitions are cleaned up, and recovery creates a new session and renderer generation rather than resuming a damaged graph.

- [x] Compare the ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain centrally tracked with root `.agent` state.
- [x] Select only `IntoTheMeadow` as the oldest eligible documented repository.
- [x] Trace boot rejection, host acquisition, RAF failure, fatal projection, editor capabilities, globals, stop/start and renderer disposal.
- [x] Preserve the complete interaction loop, domain map, kit inventory and service inventory.
- [x] Define startup rollback, frame quarantine, capability fencing, cold restart and terminal disposal boundaries.
- [x] Refresh the required root `.agent` state and add timestamped audits.
- [ ] Runtime implementation and executable failure-recovery fixtures remain future work.

## Current audited ledge

```txt
IntoTheMeadow Fatal Runtime Failure Recovery Authority
+ Startup Rollback / Frame Quarantine / Cold Restart Fixture Gate
```

## Main finding

```txt
startup failure
  -> boot catch writes error text
  -> no typed boot result
  -> no reverse cleanup ledger
  -> partially published globals/resources may remain

frame failure
  -> game state may already advance
  -> lastPlan may already change
  -> renderer may partially mutate buffers/canvas
  -> showFatal only sets stopped and updates text
  -> GameHost and NexusEditorEnvironment remain callable

restart
  -> start() reuses the same game, renderer, enhancer and bridge
  -> no new session, renderer or frame generation
  -> no admission proving the failed graph is safe to resume
```

## Required authority

```txt
meadow-runtime-failure-recovery-authority-domain
  -> acquisition ledger and reverse cleanup
  -> failure identity, phase and classification
  -> last-known-good committed frame retention
  -> public capability and capture quarantine
  -> typed startup/frame/cleanup results
  -> recoverable-path routing or terminal disposal
  -> cold restart with new session and renderer generations
  -> bounded observations, journal and fixtures
```

## Required implementation order

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
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
.agent/trackers/2026-07-11T19-01-08-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T19-01-08-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T19-01-08-04-00-fatal-runtime-failure-recovery-dsk-map.md
.agent/render-audit/2026-07-11T19-01-08-04-00-partial-frame-fatal-state-gap.md
.agent/gameplay-audit/2026-07-11T19-01-08-04-00-tick-plan-render-failure-loop.md
.agent/interaction-audit/2026-07-11T19-01-08-04-00-fatal-stop-restart-capability-map.md
.agent/failure-recovery-audit/2026-07-11T19-01-08-04-00-terminal-failure-quarantine-restart-contract.md
.agent/deploy-audit/2026-07-11T19-01-08-04-00-fatal-recovery-fixture-gate.md
```

## Exact inventory

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
external declared kits: 1
local declared kits: 43
total declared kits: 44
startup acquisition rollback ledgers: 0
fatal failure IDs: 0
fatal capability fences: 0
cold restart transactions: 0
last-known-good frame receipts retained by failure state: 0
```

## Guardrails

Update the existing web host, lifecycle, committed-frame, renderer, context-recovery, diagnostics and editor owners before creating overlapping packages. Keep the product-specific failure adapter local. Promote generic failure-state and cleanup contracts only after deterministic startup, mid-frame, cleanup-failure and cold-restart fixtures pass.