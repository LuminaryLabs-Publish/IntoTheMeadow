# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T22-58-36-04-00`

## Goal

Create one authoritative runtime session that owns construction, RAF scheduling, stop, restart, failure, global leases, cleanup, and terminal disposal before adding atomic committed-frame publication.

## Plan ledger

```txt
[ ] Preserve the external meadow source URL and commit pin.
[ ] Preserve the current render-plan schema and visible default.
[ ] Add runtime-session-authority-domain as the only lifecycle owner.
[ ] Add sessionId, runId, lifecycle state, command sequence, and bounded journal.
[ ] Retain every RAF id and enforce one-active-RAF per run.
[ ] Make stop cancel the owned RAF before reporting stopped.
[ ] Make restart one fenced transaction that increments runId.
[ ] Add an acquisition ledger with immediate cleanup registration.
[ ] Add reverse-order rollback for construction and first-frame failures.
[ ] Add GameHost and NexusEditorEnvironment lease/release operations.
[ ] Coordinate renderer.dispose, editorBridge.dispose, enhancer invalidation, and retained-reference release.
[ ] Make dispose terminal, idempotent, and observable.
[ ] Reject start, tick, render, and editor mutation commands after disposal.
[ ] Return typed accepted/no-op/rejected/failed lifecycle results.
[ ] Expose the same lifecycle snapshot through the controller, GameHost, and editor bridge.
[ ] Add deterministic fake-RAF and fake-resource fixtures.
[ ] Wire lifecycle fixtures into npm run check.
[ ] Then add committed-frame staging and atomic publication.
[ ] Then add source provider identity and parity to committed frames.
[ ] Update repo-local and central ledgers after implementation lands.
```

## Phase 1: Runtime Session Lifecycle Authority

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Stop/Restart/Dispose/Rollback Fixture Gate
```

Suggested source files:

```txt
src/runtime/runtime-session-authority.js
src/runtime/runtime-lifecycle-result.js
src/runtime/raf-owner.js
src/runtime/resource-ownership-ledger.js
src/runtime/global-exposure-lease.js
src/runtime/runtime-lifecycle-journal.js
src/hosts/web-host.js
src/boot/boot-game.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
src/game/enhance-render-plan.js
src/renderers/meadow-webgl-renderer-v2.js
```

Suggested fixtures:

```txt
tests/runtime-session-lifecycle-smoke.mjs
tests/runtime-single-raf-smoke.mjs
tests/runtime-stop-cancels-raf-smoke.mjs
tests/runtime-restart-generation-smoke.mjs
tests/runtime-dispose-idempotency-smoke.mjs
tests/runtime-fatal-rollback-smoke.mjs
tests/runtime-global-lease-smoke.mjs
tests/runtime-listener-release-smoke.mjs
tests/runtime-render-after-dispose-smoke.mjs
```

## Session snapshot

```txt
{
  sessionId,
  runId,
  state,
  commandSequence,
  rafId,
  activeRafCount,
  frameCount,
  startedAt,
  stoppedAt,
  disposedAt,
  failurePhase,
  failureReason,
  ownedResources,
  globalLeases,
  cleanupCount,
  journalSize
}
```

## Lifecycle result

```txt
{
  commandId,
  command,
  status: "accepted" | "completed" | "no-op" | "rejected" | "failed",
  reason,
  sessionId,
  previousRunId,
  runId,
  stateBefore,
  stateAfter,
  rafCancelled,
  rafScheduled,
  cleanupCount,
  errors
}
```

## Required lifecycle semantics

```txt
start while created/stopped  -> one RAF scheduled
start while running          -> no-op
stop while running           -> owned RAF cancelled, state stopped
stop while stopped           -> no-op
restart while running        -> old RAF cancelled before new RAF, runId increments
restart while stopped        -> runId increments, one RAF scheduled
fatal during construction    -> reverse rollback, state failed, no globals/listeners/RAF
fatal during frame           -> terminal policy, no successor RAF
dispose while running        -> cancel RAF, release resources in reverse order
dispose while disposed       -> no-op
start after disposed         -> rejected
render after disposed        -> rejected
```

## Stop condition

```txt
one session owns zero or one RAF
no old run can schedule work after restart
all acquired resources have one registered cleanup
fatal construction and first-frame failure leave no leaked global/listener/RAF/WebGL ownership
dispose is terminal and idempotent
GameHost and editor expose the same session/run/state
normal visual output is unchanged
```

## Phase 2: Committed Frame Observation Authority

After session ownership exists, add one staged frame transaction and publish state, plan, renderer, canvas, HUD, GameHost, and editor facts only from an immutable committed-frame row.

## Final implementation order

```txt
1. Runtime session identity, lifecycle states, and results.
2. RAF ownership and restart generation fence.
3. Resource ledger, global leases, rollback, and disposal.
4. Lifecycle projections through boot, GameHost, and editor.
5. Deterministic lifecycle fixtures and npm run check integration.
6. Committed-frame staging and atomic publication.
7. Source provider provenance and parity.
8. Gameplay command/objective authority.
9. Mesh contribution and registry truth.
```
