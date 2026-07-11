# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T02-28-12-04-00`

## Goal

Create one authoritative runtime session that owns exactly one RAF chain, all global/listener/resource leases, startup rollback, fatal teardown, and typed lifecycle results. Then place committed-frame, source-provider, gameplay-command, and registry-consumption authority under that session.

## Plan ledger

```txt
[ ] Preserve the external meadow provider URL and commit pin.
[ ] Preserve the current render-plan schema and visible output.
[ ] Introduce runtime-session-authority-domain as the first gate.
[ ] Add sessionId, runId, lifecycle state, command sequence, and bounded journal.
[ ] Replace Boolean-only stop/start with typed command and result contracts.
[ ] Retain the exact RAF id for every active run.
[ ] Cancel the pending RAF during stop, restart, fatal, and dispose.
[ ] Fence callbacks by sessionId, runId, and owned rafId.
[ ] Add a clock-admission row for every accepted callback.
[ ] Add a resource ledger and reverse-order cleanup stack.
[ ] Acquire GameHost and NexusEditorEnvironment through global leases.
[ ] Restore prior global values during normal release.
[ ] Never clobber a newer global owner during stale disposal.
[ ] Track error and unhandledrejection listeners through listener leases.
[ ] Roll back every completed startup acquisition after construction failure.
[ ] Treat first-frame failure as a terminal session failure with complete teardown.
[ ] Add idempotent dispose and stable render-after-dispose rejection.
[ ] Expose lifecycle state, commands, results, and journal through GameHost.
[ ] Expose equivalent lifecycle capabilities through the browser editor bridge.
[ ] Add fake RAF, global, event-target, renderer, enhancer, and game adapters.
[ ] Add deterministic stop/start race, restart, rollback, global-lease, listener, fatal, and disposal fixtures.
[ ] Wire lifecycle fixtures into npm run check.
[ ] Implement committed-frame authority second.
[ ] Implement source-provider provenance and parity third.
[ ] Implement interaction/objective command authority fourth.
[ ] Preserve the corrected registry census: 43 local plus one external.
[ ] Implement DSK registry truth and consumer proof fifth.
[ ] Update repo-local and central ledgers after runtime implementation lands.
```

## Phase 1: Runtime Session Lifecycle Authority

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Single-RAF / Global-Lease / Rollback Fixture Gate
```

Suggested files:

```txt
src/runtime/runtime-session-authority.js
src/runtime/runtime-lifecycle-state.js
src/runtime/runtime-lifecycle-command.js
src/runtime/runtime-lifecycle-result.js
src/runtime/runtime-lifecycle-journal.js
src/runtime/raf-owner.js
src/runtime/run-generation-fence.js
src/runtime/runtime-clock-admission.js
src/runtime/resource-ownership-ledger.js
src/runtime/cleanup-stack.js
src/runtime/global-exposure-lease.js
src/runtime/listener-lease.js
src/runtime/startup-rollback.js
src/runtime/fatal-transition.js
src/runtime/runtime-disposal.js
src/hosts/web-host.js
src/boot/boot-game.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
src/renderers/meadow-webgl-renderer-v2.js
```

Required lifecycle result:

```txt
{
  commandId,
  command,
  status: "completed" | "no_op" | "rejected" | "failed",
  reason,
  sessionId,
  runIdBefore,
  runIdAfter,
  stateBefore,
  stateAfter,
  cancelledRafId,
  scheduledRafId,
  resourceChanges,
  leaseChanges,
  journalSequence,
  completedAt
}
```

Required fixture files:

```txt
tests/runtime-controller-reachability-smoke.mjs
tests/runtime-single-raf-smoke.mjs
tests/runtime-stop-cancels-pending-raf-smoke.mjs
tests/runtime-stop-start-race-smoke.mjs
tests/runtime-restart-generation-smoke.mjs
tests/runtime-global-lease-restore-smoke.mjs
tests/runtime-first-frame-rollback-smoke.mjs
tests/runtime-fatal-disposal-smoke.mjs
tests/runtime-dispose-idempotency-smoke.mjs
tests/runtime-listener-release-smoke.mjs
tests/runtime-render-after-dispose-smoke.mjs
```

Required semantics:

```txt
running owns exactly one pending RAF
stopped, failed, and disposed own zero RAFs
stale callbacks produce zero tick, plan, render, HUD, or successor effects
stop cancels the exact pending RAF
restart increments runId and creates exactly one new chain
dispose releases listeners, globals, renderer, enhancer, game, and module references
fatal first-frame failure performs reverse-order cleanup
prior globals are restored only when the lease still owns the property
newer global owners are never clobbered
all paths return detached JSON-safe results
```

## Phase 2: Committed Frame Observation Authority

```txt
IntoTheMeadow Committed Frame Observation Authority
+ State/Plan/Render/Canvas Coherence Fixture Gate
```

After lifecycle authority exists:

```txt
stage state rather than publishing immediately
bind raw plan, enhanced plan, render result, and canvas acknowledgement to one frame request
publish state only when the frame commits
keep failed frame rows separate
route editor tick/reset through frame transactions
project HUD, GameHost, capture, and editor snapshots from one committed frame
```

## Phase 3: Source Provider Authority

```txt
IntoTheMeadow Source Provider Authority
+ External/Fallback Parity Fixture Gate
```

Record source URL, commit, version, provider kind, fallback policy, fingerprint, epoch, and measured parity.

## Phase 4: Interaction Command Authority

```txt
IntoTheMeadow Interaction Command Authority
+ Objective Progress Fixture Gate
```

Turn movement, interaction, story, and objective descriptors into typed admitted commands only after lifecycle and frame commitment are stable.

## Phase 5: DSK Registry Truth

```txt
IntoTheMeadow DSK Registry Truth
+ Mesh Contribution and Consumer Proof Fixture Gate
```

Preserve the exact census and add implementation, import, invocation, output, consumer, consumption-status, and proof rows for every kit.

## Final implementation order

```txt
1. Runtime session identity, lifecycle states, exact RAF ownership, rollback, leases, and disposal.
2. Atomic committed-frame staging and projection.
3. Source-provider provenance and external/fallback parity.
4. Gameplay command and objective authority.
5. Registry truth, mesh contribution, and consumer proof.
```
