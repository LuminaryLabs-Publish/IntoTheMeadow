# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T19-48-39-04-00`

## Goal

Create one authoritative browser/editor runtime session, then make the selected meadow source explicit and parity-tested before gameplay commands bind to rendered path and focal-tree facts.

## Plan ledger

```txt
[ ] Preserve the current external meadow source URL and commit pin.
[ ] Preserve render-plan schema, topology keys, shaders, mesh output, screenshots, and existing read methods.
[ ] Complete Runtime Session Lifecycle Authority first.
[ ] Add a session id and run id.
[ ] Add explicit lifecycle states: created, starting, running, stopped, disposing, disposed, failed.
[ ] Retain and cancel the active requestAnimationFrame id.
[ ] Add accepted/rejected/no-op lifecycle results with stable reasons.
[ ] Prevent stop/start races and duplicate recursive frame loops.
[ ] Add resource ownership and global exposure lease ledgers.
[ ] Coordinate renderer.dispose(), editorBridge.dispose(), and enhancer invalidation.
[ ] Add reverse-order startup rollback and terminal idempotent disposal.
[ ] Project lifecycle state and bounded journals through GameHost and the editor bridge.
[ ] Add DOM-free and browser lifecycle fixtures.
[ ] Then add Source Provider Authority.
[ ] Define a common external/fallback provider contract.
[ ] Add explicit provider request, selection status, reason, and fallback policy.
[ ] Retain manifest URL, pinned commit, provider version, source plan version, source fingerprint, and source epoch.
[ ] Replace representative fallback claims with measured parity classification.
[ ] Add a canonical source target index for arrival-path and focal-tree.
[ ] Propagate source identity into enhanced plan, mesh/render observations, GameHost, and editor readback.
[ ] Add external-provider, fallback-provider, parity, source-rebuild, and source-render-consumption fixtures.
[ ] Then resume Interaction Command Authority and Objective Progress.
[ ] Bind target preflight to the selected source target index.
[ ] Keep mesh contribution and registry truth as final companion proof gates.
[ ] Wire all new fixtures into npm run check.
[ ] Update repo-local and central ledgers after implementation lands.
```

## Phase 1: Runtime Session Lifecycle Authority

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Stop/Restart/Dispose Fixture Gate
```

Suggested files:

```txt
src/runtime/create-runtime-session.js
src/runtime/lifecycle-state.js
src/runtime/lifecycle-results.js
src/runtime/resource-ownership-ledger.js
src/runtime/global-exposure-lease.js
src/hosts/web-host.js
src/boot/boot-game.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
src/game/enhance-render-plan.js
tests/runtime-session-lifecycle-smoke.mjs
tests/runtime-stop-restart-smoke.mjs
tests/runtime-dispose-idempotency-smoke.mjs
tests/runtime-fatal-rollback-smoke.mjs
tests/editor-listener-cleanup-smoke.mjs
tests/global-exposure-lease-smoke.mjs
```

Lifecycle result row:

```txt
{
  sessionId,
  runId,
  sequence,
  command,
  status,
  reason,
  stateBefore,
  stateAfter,
  rafOwned,
  disposedResources,
  releasedGlobals,
  errors
}
```

Lifecycle stop condition:

```txt
exactly one active RAF while running
zero active RAFs while stopped or disposed
renderer/editor cleanup runs once
session globals and listeners are released safely
restart cannot fork loops
normal render output is unchanged
```

## Phase 2: Source Provider Authority

```txt
IntoTheMeadow Source Provider Authority
+ External/Fallback Parity Fixture Gate
```

Suggested files:

```txt
src/source/create-source-provider.js
src/source/source-provider-contract.js
src/source/source-selection-results.js
src/source/source-fingerprint.js
src/source/source-target-index.js
src/hosts/web-host.js
src/game/create-into-the-meadow-game.js
src/game/game-snapshot.js
src/boot/install-dsks.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
tests/meadow-source-provider-contract-smoke.mjs
tests/meadow-external-provider-smoke.mjs
tests/meadow-source-fallback-parity-smoke.mjs
tests/meadow-source-render-consumption-smoke.mjs
```

Source-provider result row:

```txt
{
  sourceEpoch,
  requestedProvider,
  selectedProvider,
  status,
  reason,
  moduleUrl,
  pinnedCommit,
  providerVersion,
  planId,
  planVersion,
  planFingerprint,
  objectCounts,
  validation,
  topologyKey
}
```

Source stop condition:

```txt
browser and Node paths use the same provider contract
external import failure follows an explicit fallback policy
same provider/config produces the same source fingerprint
fallback parity is classified as exact, compatible, representative, or incompatible
render and target readback include source epoch and fingerprint
production external source is exercised by a deployment fixture
```

## Phase 3: Interaction Command Authority

Resume the existing interaction plan after lifecycle and source identity are proven:

```txt
typed move/path-progress/inspect/reset commands
target lookup and range/precondition checks
accepted/rejected/no-op results
player/path and inspection reducers
walk-the-path and inspect-tree objective completion
bounded gameplay journal and state fingerprint
GameHost/editor gameplay observations
same-command replay fixtures
```

## Implementation order

```txt
1. Session identity and lifecycle results.
2. RAF, resource, and global ownership.
3. Stop/restart/dispose/fatal rollback fixtures.
4. Provider contract and explicit source selection.
5. Source provenance, fingerprint, epoch, and target index.
6. External/fallback parity and render-consumption fixtures.
7. Interaction command and objective reducers.
8. Mesh contribution and registry truth fixtures.
9. Full npm run check and browser/editor validation.
```

## Final stop condition

Stop when lifecycle operations are idempotent, provider selection is explicit, external/fallback behavior is parity-classified, rendered frames and gameplay targets identify their source epoch, and the authored path/tree objectives can be replayed deterministically without changing the current visual default.