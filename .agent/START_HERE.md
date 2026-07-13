# IntoTheMeadow Agent Start

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T05-31-58-04-00`  
**Status:** `web-host-lifecycle-retirement-authority-audited`

## Summary

IntoTheMeadow is a DSK-composed browser meadow with deterministic provider data, immutable game state, render-plan enhancement, persistent WebGL presentation, browser editor readback, and a NexusEngine-backed Node headless editor.

The current audit isolates web-host lifecycle ownership. `startWebHost()` returns `stop()` and `start()`, but `stop()` only flips a boolean and fatal handling does the same. Neither path owns RAF cancellation, renderer disposal, editor-bridge disposal, listener detachment, global `GameHost` revocation, duplicate-start retirement, or a typed terminal result.

## Plan ledger

**Goal:** separate non-destructive pause/resume from terminal host retirement and make RAF, WebGL, editor listeners, global capabilities, and fatal cleanup one generation-bound transaction.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm nine eligible central ledgers and nine root `.agent` folders.
- [x] Confirm no new, missing, undocumented, or unsynchronized repository took priority.
- [x] Select only `LuminaryLabs-Publish/IntoTheMeadow` as the oldest eligible central entry.
- [x] Identify the browser, render, editor, headless, and deployment loops.
- [x] Identify all domains, 44 kit surfaces, and offered services.
- [x] Trace RAF, fatal, renderer, editor-bridge, and global-capability ownership.
- [x] Add the timestamped tracker and audit family.
- [x] Refresh required root `.agent` documents and machine state.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement lifecycle authority and executable fixtures later.

## Read this first

```txt
.agent/trackers/2026-07-13T05-31-58-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T05-31-58-04-00.md
.agent/architecture-audit/2026-07-13T05-31-58-04-00-web-host-lifecycle-retirement-dsk-map.md
.agent/render-audit/2026-07-13T05-31-58-04-00-stopped-host-live-webgl-visible-state-gap.md
.agent/gameplay-audit/2026-07-13T05-31-58-04-00-stop-start-fatal-host-loop.md
.agent/interaction-audit/2026-07-13T05-31-58-04-00-host-lifecycle-command-admission-map.md
.agent/web-host-lifecycle-audit/2026-07-13T05-31-58-04-00-pause-resume-retire-resource-contract.md
.agent/deploy-audit/2026-07-13T05-31-58-04-00-web-host-lifecycle-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The workspace-containment, provider-source, WebGL recovery, frame-scheduler, exploration/progression, DSK-consumption, and grass-visibility audits remain active bounded dependencies.

## Complete interaction loop

```txt
index.html
  -> boot-game.js
  -> startWebHost()
  -> load pinned meadow provider
  -> create game, renderer, plan enhancer, GameHost, and editor bridge
  -> requestAnimationFrame(frame)

frame
  -> game.tick({ time, dt: 1/60 })
  -> build and validate render plan
  -> renderer.render(plan)
  -> project debug state
  -> request next frame

stop
  -> set stopped = true
  -> queued frame returns when it runs
  -> resources, listeners, and globals remain installed

start
  -> set stopped = false
  -> schedule another frame

fatal
  -> set stopped = true
  -> show error
  -> resources, listeners, and globals remain installed
```

## Main gap

```txt
host session identity and generation: absent
explicit lifecycle phase: absent
RAF handle and cancellation receipt: absent
pause versus terminal-retire contract: absent
renderer disposal composition: absent
editor-bridge disposal composition: absent
global GameHost capability lease/revocation: absent
duplicate host-start admission: absent
fatal cleanup transaction: absent
typed lifecycle result and journal: absent
first stopped/retired visible-state acknowledgement: absent
lifecycle fixtures: absent
```

## Kit census

```txt
external provider kits: 1
local declared DSK/kits: 43
total source-backed kit surfaces: 44
required-v0.1 local declarations: 15
planned local declarations: 28
implemented host-lifecycle authority kits: 0
```

## Required parent domain

```txt
meadow-web-host-lifecycle-retirement-authority-domain
```

## Validation boundary

Documentation only. Runtime, gameplay, provider, renderer, editor, package, dependency, and deployment behavior are unchanged. No browser lifecycle, duplicate-start, fatal-cleanup, GPU-retirement, listener-detachment, or Pages fixture was executed.
