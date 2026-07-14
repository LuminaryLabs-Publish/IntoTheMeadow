# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-14T09-58-25-04-00`  
**Status:** `runtime-reset-session-replay-authority-audited`

## Summary

IntoTheMeadow exposes reset through browser and headless editor environments, but reset does not create a unique successor session or settle all state, scheduler, render and observation participants together.

The browser path resets game state only while retaining last render evidence and active RAF ownership. The headless path also resets local time and invalidates the enhancer, but retains the previous capture baseline. Both recreate `arrival-meadow:session-0`, so predecessor and successor work cannot be reliably distinguished.

## Plan ledger

**Goal:** make reset one atomic, replay-verifiable session transition with participant receipts and a first matching successor frame.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Confirm no eligible repository is new, missing, undocumented or runtime-ahead.
- [x] Select only IntoTheMeadow by the oldest synchronized timestamp.
- [x] Inspect browser and headless reset paths.
- [x] Preserve all 44 declared kit surfaces and offered services.
- [x] Add the `2026-07-14T09-58-25-04-00` audit family.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement reset/replay authority and fixtures later.

## Read this pass first

```txt
.agent/trackers/2026-07-14T09-58-25-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T09-58-25-04-00.md
.agent/architecture-audit/2026-07-14T09-58-25-04-00-runtime-reset-session-replay-dsk-map.md
.agent/render-audit/2026-07-14T09-58-25-04-00-reset-state-render-evidence-coherence-gap.md
.agent/gameplay-audit/2026-07-14T09-58-25-04-00-reset-session-replay-loop.md
.agent/interaction-audit/2026-07-14T09-58-25-04-00-runtime-reset-command-result-map.md
.agent/reset-replay-audit/2026-07-14T09-58-25-04-00-session-generation-participant-reset-contract.md
.agent/deploy-audit/2026-07-14T09-58-25-04-00-reset-replay-fixture-gate.md
.agent/central-sync-audit/2026-07-14T09-58-25-04-00-repo-ledger-reset-replay-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Complete interaction loop

```txt
browser RAF and editor commands advance one mutable game instance
  -> runtime.reset recreates frame-zero state
  -> session identity remains arrival-meadow:session-0
  -> browser render evidence and scheduler remain live

headless editor
  -> runtime.reset resets time and enhancer
  -> same session identity is recreated
  -> prior capture baseline remains available to compare
```

## Domain and kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total declared kit surfaces: 44
active-v0.1 local descriptors: 15
planned local descriptors: 28
planned reset/replay authority surfaces: 21
```

The complete kit-by-kit service map is in the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
meadow-runtime-reset-session-replay-authority-domain
```

## Next safe ledge

Introduce `RuntimeResetCommand`, a unique `SessionGeneration`, an explicit reset participant registry, scheduler suspension, atomic adoption/rollback, replay journaling and `FirstResetSessionFrameAck` shared by browser and headless environments.

## Claim boundary

This pass does not claim reset atomicity, unique session identity, browser/headless parity, stale work rejection, replay equivalence, first reset-frame convergence or production readiness.