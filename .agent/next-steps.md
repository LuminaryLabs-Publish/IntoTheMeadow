# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T00-30-48-04-00`

## Goal

Create one authoritative runtime session, then make every simulation, plan, render, canvas, HUD, GameHost, and editor observation derive from one immutable committed-frame row.

## Plan ledger

```txt
[ ] Preserve the external meadow source URL and commit pin.
[ ] Preserve the current render-plan schema and visible default.
[ ] Implement runtime-session-authority-domain first.
[ ] Retain and cancel the exact RAF owned by the active run.
[ ] Add reverse-order startup rollback and idempotent disposal.
[ ] Add sessionId, runId, lifecycle state, results, and bounded journal.
[ ] Add committed-frame-authority-domain inside the runtime session.
[ ] Replace direct game.tick assignment with stage-state then commit-state.
[ ] Assign no public plan or render pointer before the frame commits.
[ ] Add monotonic frameRequestId and committedFrameId.
[ ] Fingerprint state-before, staged state, raw plan, enhanced plan, and render result.
[ ] Require renderer.render to return a frame-correlated render-consumption row.
[ ] Add a canvas commit acknowledgement after both WebGL passes complete.
[ ] Publish one immutable lastCommittedFrame pointer.
[ ] Keep failed frame rows separate and never replace the committed pointer.
[ ] Route browser editor runtime.tick and runtime.reset through frame transactions.
[ ] Make renderer.capture accept or return an expected committedFrameId.
[ ] Project HUD, GameHost, and browser editor snapshots from the same frame row.
[ ] Add a Node fixture adapter that uses the same frame contract.
[ ] Mark synthetic SVG observations as non-browser and correlate them to source/frame fingerprints.
[ ] Add deterministic failure, tick, reset, capture, and parity fixtures.
[ ] Wire lifecycle and committed-frame fixtures into npm run check.
[ ] Then add source-provider provenance and parity.
[ ] Update repo-local and central ledgers after implementation lands.
```

## Phase 1: Runtime Session Lifecycle Authority

```txt
IntoTheMeadow Runtime Session Lifecycle Authority
+ Stop/Restart/Dispose/Rollback Fixture Gate
```

Suggested files:

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
```

## Phase 2: Committed Frame Observation Authority

```txt
IntoTheMeadow Committed Frame Observation Authority
+ State/Plan/Render/Canvas Coherence Fixture Gate
```

Suggested files:

```txt
src/runtime/committed-frame-authority.js
src/runtime/frame-request.js
src/runtime/frame-staging.js
src/runtime/frame-fingerprint.js
src/runtime/frame-result.js
src/runtime/frame-journal.js
src/game/create-into-the-meadow-game.js
src/game/game-snapshot.js
src/hosts/web-host.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
scripts/into-the-meadow-environment.mjs
src/renderers/meadow-webgl-renderer-v2.js
```

Suggested fixtures:

```txt
tests/committed-frame-coherence-smoke.mjs
tests/render-failure-no-partial-publish-smoke.mjs
tests/editor-tick-frame-commit-smoke.mjs
tests/reset-frame-commit-smoke.mjs
tests/capture-frame-correlation-smoke.mjs
tests/gamehost-frame-snapshot-smoke.mjs
tests/browser-node-frame-parity-smoke.mjs
tests/failed-frame-pointer-stability-smoke.mjs
```

## Staged frame

```txt
{
  sessionId,
  runId,
  frameRequestId,
  source: "raf" | "editor.tick" | "editor.reset" | "fixture",
  requestedAt,
  requestedTime,
  dt,
  stateBefore,
  stateBeforeFingerprint,
  stagedState,
  stagedStateFingerprint,
  rawPlan,
  rawPlanFingerprint,
  enhancedPlan,
  enhancedPlanFingerprint
}
```

## Committed frame

```txt
{
  sessionId,
  runId,
  committedFrameId,
  frameRequestId,
  source,
  requestedTime,
  simulationFrame,
  state,
  stateFingerprint,
  rawPlan,
  rawPlanFingerprint,
  enhancedPlan,
  enhancedPlanFingerprint,
  topologyKey,
  renderResult,
  renderFingerprint,
  canvasCommit,
  committedAt
}
```

## Failed frame

```txt
{
  sessionId,
  runId,
  frameRequestId,
  phase,
  reason,
  stateBeforeFingerprint,
  stagedStateFingerprint,
  rawPlanFingerprint,
  enhancedPlanFingerprint,
  previousCommittedFrameId,
  failedAt
}
```

## Required semantics

```txt
one frame request produces zero or one committed frame
failed requests never replace lastCommittedFrame
state becomes public only when its frame commits
raw and enhanced plans carry the same requested time
renderer result carries frameRequestId and topologyKey
canvas acknowledgement carries committedFrameId
HUD, GameHost, editor snapshot, and capture use one committed frame
editor tick/reset cannot mutate state without a frame result
capture rejects or reports an expected-frame mismatch
Node synthetic capture is explicitly non-browser and frame-correlated
journals are bounded, immutable, and JSON-safe
```

## Final implementation order

```txt
1. Runtime session identity, lifecycle states, RAF ownership, rollback, and disposal.
2. Frame request, staging, fingerprints, renderer result, canvas acknowledgement, and commit.
3. GameHost, HUD, browser editor, and Node fixture frame projections.
4. Deterministic lifecycle and atomic-frame fixtures.
5. Source provider provenance and external/fallback parity.
6. Gameplay command/objective authority.
7. Mesh contribution and registry truth.
```
