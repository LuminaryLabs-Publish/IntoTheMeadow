# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T21-19-36-04-00`

## Goal

Create one authoritative runtime session and one atomic committed-frame observation so state, source plan, enhanced plan, renderer result, canvas evidence, GameHost, and editor readback cannot disagree about which frame is visible.

## Plan ledger

```txt
[ ] Preserve the external meadow source URL and commit pin.
[ ] Preserve the current render-plan schema and visible default.
[ ] Complete Runtime Session Lifecycle Authority first.
[ ] Add session id, run id, lifecycle states, RAF ownership, cleanup, rollback, and idempotent disposal.
[ ] Add a frame request sequence owned by the runtime session.
[ ] Stage simulation, source-plan, enhancement, render, and capture metadata without publishing partial results.
[ ] Commit one immutable frame row only after renderer success.
[ ] Retain the last successful committed frame and bounded frame journal.
[ ] Record rejected/failed frame attempts separately from committed frames.
[ ] Prevent lastPlan and lastRender from advancing independently.
[ ] Make runtime.tick and runtime.reset either submit a frame transaction or return an explicit uncommitted/staged result.
[ ] Correlate renderer.capture with a committed frame id.
[ ] Project the same committed row through HUD, GameHost, and NexusEditorEnvironment.
[ ] Add state, source, plan, render, and optional pixel fingerprints.
[ ] Add render-failure rollback and stale-canvas fixtures.
[ ] Then add Source Provider Authority fields to the committed-frame row.
[ ] Then bind gameplay commands and objectives to committed source/target facts.
[ ] Keep mesh contribution and registry truth as final proof gates.
[ ] Wire all fixtures into npm run check.
[ ] Update repo-local and central ledgers after implementation lands.
```

## Phase 1: Runtime Session Lifecycle Authority

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Stop/Restart/Dispose Fixture Gate
```

Required outcomes:

```txt
one session owns at most one RAF
stop cancels scheduling
restart cannot fork loops
dispose is terminal and idempotent
renderer/editor/enhancer/global cleanup is coordinated
fatal startup and first-frame failure roll back partial ownership
```

## Phase 2: Committed Frame Observation Authority

```txt
IntoTheMeadow Committed Frame Observation Authority
+ Atomic Frame Fixture Gate
```

Suggested files:

```txt
src/runtime/frame-request.js
src/runtime/frame-staging.js
src/runtime/frame-commit.js
src/runtime/frame-journal.js
src/runtime/state-fingerprint.js
src/runtime/plan-fingerprint.js
src/runtime/render-consumption-row.js
src/hosts/web-host.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
src/game/game-snapshot.js
src/renderers/meadow-webgl-renderer-v2.js
tests/committed-frame-coherence-smoke.mjs
tests/render-failure-no-partial-publish-smoke.mjs
tests/editor-tick-frame-commit-smoke.mjs
tests/reset-frame-commit-smoke.mjs
tests/capture-frame-correlation-smoke.mjs
```

Committed-frame row:

```txt
{
  sessionId,
  runId,
  frameId,
  requestSequence,
  status,
  reason,
  simulationFrame,
  requestTime,
  dt,
  stateFingerprint,
  sourceEpoch,
  sourceFingerprint,
  planId,
  planFingerprint,
  topologyKey,
  rendererVersion,
  renderFingerprint,
  vertexCount,
  triangleCount,
  canvasWidth,
  canvasHeight,
  enhancerCache,
  rendererCache,
  committedAt,
  errors
}
```

Failure row:

```txt
{
  requestSequence,
  status: "failed",
  phase,
  reason,
  previousCommittedFrameId,
  stagedStateFingerprint,
  stagedPlanFingerprint,
  errors
}
```

Stop condition:

```txt
no state/plan/render field is published before commit
render failure preserves the previous committed frame
GameHost and editor return the same frame id and fingerprints
runtime.tick/reset cannot silently desynchronize state from pixels
capture metadata identifies the frame represented by the canvas
all public readback is JSON-safe and bounded
normal visual output is unchanged
```

## Phase 3: Source Provider Authority

Add provider URL, pinned commit, provider version, source epoch, source fingerprint, selection reason, and parity classification to the committed-frame row.

## Phase 4: Interaction Command Authority

Bind movement, path progress, inspection, and objective results to the committed source epoch and frame id. Reject stale target references.

## Final implementation order

```txt
1. Session lifecycle and ownership.
2. Frame request/staging/commit contracts.
3. GameHost/editor/capture frame projections.
4. Atomic-frame and failure fixtures.
5. Source provider provenance and parity.
6. Gameplay command/objective authority.
7. Mesh contribution and registry truth.
8. Full npm run check and browser/editor validation.
```
