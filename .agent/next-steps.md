# Next steps

**Updated:** `2026-07-13T05-31-58-04-00`

## Summary

Implement one web-host lifecycle coordinator before adding more browser control surfaces. The first implementation should separate pause/resume from terminal retirement, retain the RAF handle, compose existing renderer and editor-bridge disposal, and revoke public globals by generation.

## Plan ledger

**Goal:** convert the documented lifecycle gap into a small, testable authority without changing gameplay or meadow composition.

- [ ] Add `HostSessionId`, `HostGeneration`, `HostLifecyclePhase`, and `HostLifecycleRevision`.
- [ ] Replace the free `stopped` boolean with a lifecycle state machine.
- [ ] Retain the active RAF ID and cancel it during pause and retirement.
- [ ] Return typed `StartHostResult`, `PauseHostResult`, `ResumeHostResult`, and `RetireHostResult` values.
- [ ] Register renderer, editor bridge, public globals, and future participants in ordered lifecycle ownership.
- [ ] Compose `editorBridge.dispose()` into terminal retirement.
- [ ] Compose `renderer.dispose()` into terminal retirement.
- [ ] Add conditional revocation for `globalThis.NexusEditorEnvironment` and `globalThis.GameHost`.
- [ ] Reject duplicate starts or explicitly retire the predecessor generation.
- [ ] Route fatal frame errors through the lifecycle coordinator.
- [ ] Preserve bounded diagnostics after failure without retaining mutating capabilities.
- [ ] Add first-resumed-frame and first-retired-state acknowledgements.
- [ ] Add deterministic tests for stop, resume, retire, fatal, duplicate boot, and stale callbacks.
- [ ] Add browser instrumentation for RAF count, global listener count, and WebGL disposal receipts.
- [ ] Run the complete existing test suite before and after implementation.
- [ ] Run a deployed GitHub Pages lifecycle smoke.

## Recommended implementation order

1. Introduce lifecycle identities, phases, typed commands, and results in a small host-lifecycle module.
2. Retain `requestAnimationFrame()` IDs and route scheduling through one owner.
3. Add a `revokeGameHost()` or generation-bound public capability lease.
4. Register existing `renderer.dispose()` and `editorBridge.dispose()` as terminal participants.
5. Make `stop()` an explicit pause alias only if compatibility requires it; add a separate terminal `dispose()` or `retire()` method.
6. Route `showFatal()` through a typed failure transition and cleanup policy.
7. Add fixtures before exposing additional editor mutation capabilities.

## Required proof matrix

```txt
start once                       -> one RAF chain, one bridge, one GameHost
start twice                      -> rejected or predecessor retired exactly once
pause                            -> zero admitted frames, resources retained
resume                           -> one RAF chain, first resumed frame acknowledged
retire                           -> RAF cancelled, listeners detached, globals revoked, WebGL disposed
retire twice                     -> idempotent terminal result, no duplicate disposal
fatal before first frame         -> bounded failure, no stale capabilities
fatal after rendered frame       -> same terminal ownership rules
stale predecessor callback       -> zero successor mutation
debug bridge after retirement    -> unavailable or typed retired result
page navigation / hot reload     -> no orphan listener or renderer generation
```

## Non-goals for the first patch

```txt
first-person movement
story or objective implementation
new meadow assets
renderer visual changes
workspace-containment implementation
provider migration
post-processing expansion
```
