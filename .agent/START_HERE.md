# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-14T15-38-28-04-00`  
**Status:** `browser-startup-readiness-first-frame-authority-audited`

## Summary

The browser host publishes `GameHost`, `NexusEditorEnvironment`, editor listeners, and loading completion before one validated meadow frame exists. A first-frame failure occurs after `startWebHost()` has resolved and leaves partially adopted public and renderer ownership without a typed startup failure or rollback receipt.

## Plan ledger

**Goal:** make browser construction, first-frame validation, public capability publication, readiness, and failure rollback one atomic boot transaction.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Confirm all eligible heads match their recorded documentation heads.
- [x] Select only IntoTheMeadow by the oldest synchronized timestamp.
- [x] Inspect browser startup, host publication, editor bridge, render and failure paths.
- [x] Preserve all 44 declared kit surfaces and offered services.
- [x] Add the `2026-07-14T15-38-28-04-00` audit family.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement startup admission and executable fixtures later.

## Read this pass first

```txt
.agent/trackers/2026-07-14T15-38-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T15-38-28-04-00.md
.agent/architecture-audit/2026-07-14T15-38-28-04-00-browser-startup-readiness-first-frame-dsk-map.md
.agent/render-audit/2026-07-14T15-38-28-04-00-pre-ready-public-frame-gap.md
.agent/gameplay-audit/2026-07-14T15-38-28-04-00-boot-to-first-frame-loop.md
.agent/interaction-audit/2026-07-14T15-38-28-04-00-startup-command-result-map.md
.agent/startup-audit/2026-07-14T15-38-28-04-00-candidate-adoption-failure-rollback-contract.md
.agent/deploy-audit/2026-07-14T15-38-28-04-00-browser-startup-fixture-gate.md
.agent/central-sync-audit/2026-07-14T15-38-28-04-00-repo-ledger-startup-readiness-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Complete interaction loop

```txt
provider import
  -> game, renderer and enhancer construction
  -> GameHost publication
  -> editor bridge publication and listeners
  -> loading hidden
  -> first RAF tick
  -> plan validation
  -> renderer submission

first-frame failure
  -> showFatal stops future frames
  -> host promise has already resolved
  -> public globals and participant ownership remain
```

## Domain and kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned startup authority surfaces: 18
```

The complete kit-by-kit service map is in the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

`meadow-browser-startup-readiness-first-frame-authority-domain`

## Next safe ledge

Add `BrowserStartupCommand`, private candidate participants, `BootAttemptId`, first-frame validation, atomic public adoption, typed Ready/Failed results, complete rollback, stale-attempt rejection, and `FirstVisibleMeadowFrameAck`.

## Claim boundary

This pass does not claim accurate loading readiness, atomic startup, first-frame convergence, failed-candidate retirement, source/build/Pages parity, or production readiness.