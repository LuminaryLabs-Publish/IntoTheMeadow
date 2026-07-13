# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T10-59-22-04-00`  
**Status:** `render-surface-viewport-authority-central-reconciled`

## Summary

IntoTheMeadow is a DSK-composed browser meadow with deterministic provider data, immutable game state, render-plan enhancement, persistent WebGL presentation, browser editor readback, and a NexusEngine-backed Node headless editor.

The current audit isolates render-surface viewport authority. The renderer samples CSS size and global DPR during every render, treats zero-size measurements as a reason to fall back to global window dimensions, mutates the canvas backing store before the frame succeeds, and publishes no viewport-bearing renderer or visible-frame result. Browser viewport readback and canvas capture independently sample layout, backing, renderer and pixel state without one revision.

The browser editor capability and web-host lifecycle audits remain direct dependencies because capture, pause, resume, failure and retirement must consume the same surface generation.

## Plan ledger

**Goal:** make every CSS-size or DPR transition a validated, budgeted, atomic viewport commit and prove the first matching visible frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible central-ledger entries and nine root `.agent` states.
- [x] Find no new, missing, undocumented, or locally-ahead eligible repository.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow` by the oldest documented timestamp.
- [x] Trace page layout, DPR sampling, canvas backing mutation, WebGL viewport, camera projection, renderer snapshot, viewport readback and capture.
- [x] Preserve all 44 kit surfaces and offered services.
- [x] Add the `2026-07-13T10-59-22-04-00` tracker and audit family.
- [x] Refresh required root `.agent` documents and machine state.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement viewport authority and executable source/build/Pages fixtures later.

## Read this pass first

```txt
.agent/trackers/2026-07-13T10-59-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T10-59-22-04-00.md
.agent/architecture-audit/2026-07-13T10-59-22-04-00-render-surface-viewport-authority-dsk-map.md
.agent/render-audit/2026-07-13T10-59-22-04-00-viewport-backing-store-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T10-59-22-04-00-resize-render-capture-loop.md
.agent/interaction-audit/2026-07-13T10-59-22-04-00-viewport-change-commit-result-map.md
.agent/viewport-audit/2026-07-13T10-59-22-04-00-host-measurement-dpr-pixel-budget-contract.md
.agent/deploy-audit/2026-07-13T10-59-22-04-00-viewport-fixture-gate.md
.agent/central-sync-audit/2026-07-13T10-59-22-04-00-repo-ledger-viewport-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Retained predecessor audits

```txt
browser editor capability admission
web-host lifecycle retirement
headless workspace path containment
provider-source parity
WebGL context/resource recovery
single-chain frame scheduling
exploration progression
DSK runtime consumption
grass visibility and LOD
```

## Complete interaction loop

```txt
browser boot
  -> create fixed full-screen canvas, game, enhancer, renderer, GameHost and editor bridge
  -> start recursive RAF

RAF
  -> tick game
  -> enhance and validate render plan
  -> renderer samples CSS size and DPR
  -> renderer mutates backing store
  -> renderer sets WebGL viewport and camera aspect
  -> renderer draws and publishes metadata

editor/readback
  -> independently sample browser dimensions and canvas backing size
  -> independently read last renderer snapshot
  -> capture current canvas pixels without a shared viewport/frame identity

layout or DPR transition
  -> no viewport command, budget, rollback or first-frame acknowledgement
```

## Domain and kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total kit surfaces: 44
required-v0.1 local declarations: 15
planned local declarations: 28
planned viewport authority surfaces including parent: 27
```

The complete kit-by-kit service map is in the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
meadow-render-surface-viewport-authority-domain
```

## Next safe ledge

Add render-surface identity, actual host-box measurement, explicit zero-size handling, effective-DPR and pixel-budget policy, GPU-limit admission, detached backing/WebGL/camera candidates, atomic commit or rollback, viewport-bearing frame/readback/capture evidence, and `FirstViewportFrameAck`.

## Claim boundary

This documentation pass does not claim viewport convergence, bounded allocation, rollback, readback parity, capture correctness, browser parity or production readiness.