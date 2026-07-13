# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T05-40-11-04-00`  
**Status:** `browser-editor-capability-admission-authority-central-reconciled`

## Summary

IntoTheMeadow is a DSK-composed browser meadow with deterministic provider data, immutable game state, render-plan enhancement, persistent WebGL presentation, browser editor readback, and a NexusEngine-backed Node headless editor.

The current audit isolates browser editor capability admission. `window.NexusEditorEnvironment` exposes direct `runtime.tick` and `runtime.reset` mutation while the RAF loop independently ticks the same state root. Mutations have no command identity, expected revision, scheduler lease, environment generation, or matching visible-frame acknowledgement. The immediately preceding web-host lifecycle audit remains active because host stop and fatal handling also leave the bridge globally installed and mutation-capable.

## Plan ledger

**Goal:** make every editor observation or mutation a typed, generation-bound transaction and prove user-visible mutations with a matching frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow` after detecting its repo-local host-lifecycle audit newer than central tracking.
- [x] Preserve the `2026-07-13T05-31-58-04-00` web-host lifecycle audit as the immediate predecessor.
- [x] Trace GameHost, editor capabilities, RAF mutation, capture, error observation, stop/start, and disposal.
- [x] Preserve all 44 kit surfaces and offered services.
- [x] Add the `2026-07-13T05-40-11-04-00` tracker and audit family.
- [x] Refresh required root `.agent` documents and machine state.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement editor admission, lifecycle, and visible-frame fixtures later.

## Read this pass first

```txt
.agent/trackers/2026-07-13T05-40-11-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T05-40-11-04-00.md
.agent/architecture-audit/2026-07-13T05-40-11-04-00-browser-editor-capability-admission-dsk-map.md
.agent/render-audit/2026-07-13T05-40-11-04-00-editor-mutation-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T05-40-11-04-00-direct-tick-reset-mutation-loop.md
.agent/interaction-audit/2026-07-13T05-40-11-04-00-editor-command-admission-map.md
.agent/editor-bridge-audit/2026-07-13T05-40-11-04-00-capability-generation-lifecycle-contract.md
.agent/deploy-audit/2026-07-13T05-40-11-04-00-editor-capability-fixture-gate.md
.agent/central-sync-audit/2026-07-13T05-40-11-04-00-repo-ledger-editor-capability-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The preceding host-lifecycle family remains required:

```txt
.agent/trackers/2026-07-13T05-31-58-04-00/project-breakdown.md
.agent/web-host-lifecycle-audit/2026-07-13T05-31-58-04-00-pause-resume-retire-resource-contract.md
```

## Complete interaction loop

```txt
browser boot
  -> load pinned meadow provider
  -> create game, renderer, and enhancer
  -> expose raw GameHost
  -> install browser editor bridge
  -> start recursive RAF loop

RAF
  -> direct game.tick
  -> enhance and validate render plan
  -> render and update lastPlan / lastRender

editor
  -> invoke observation or direct tick/reset mutation
  -> return generic completed/failed wrapper
  -> no scheduler lease or expected state revision
  -> no matching visible-frame receipt

stop or fatal
  -> pause RAF through one boolean
  -> leave editor bridge and mutation capabilities active
```

## Domain and kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total kit surfaces: 44
required-v0.1 local declarations: 15
planned local declarations: 28
planned browser editor authority including parent: 26
```

The complete kit-by-kit service map is in `.agent/current-audit.md`, the latest tracker, and `.agent/kit-registry.json`.

## Required parent domain

```txt
meadow-browser-editor-capability-admission-authority-domain
```

## Next safe ledge

Classify editor capabilities as observation or mutation, remove raw public mutation as a supported path, bind commands to environment/state/scheduler revisions, acquire an exclusive scheduler lease for tick/reset, publish terminal results, retire the bridge with the host lifecycle, bound error storage, and prove the first matching frame before correlated capture.

## Retained priorities

Web-host lifecycle retirement, workspace containment, provider-source parity, WebGL recovery, single-chain scheduling, executable DSK consumption, playable exploration, grass visibility, audio lifecycle, save/migration, and replay remain active dependencies.
