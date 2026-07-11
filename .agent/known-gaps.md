# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T00-30-48-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible documented fallback
only IntoTheMeadow changed
```

## Runtime session ownership gaps

```txt
boot discards the resolved host controller
no sessionId or runId
no lifecycle state machine
no lifecycle command/result contract
no bounded lifecycle journal
no current owner snapshot
```

## RAF and restart gaps

```txt
RAF id is never retained
stop does not call cancelAnimationFrame
start can schedule while an old callback remains pending
old and new callbacks can both resume and fork the loop
no restart transaction or run-generation fence
```

## Construction and disposal gaps

```txt
resource acquisition has no cleanup stack
startup and first-frame failure have no reverse-order rollback
host controller has no dispose method
renderer.dispose and editorBridge.dispose are not coordinated
GameHost has no lease/release operation
no terminal idempotency proof
```

## Atomic frame-publication gaps

```txt
game.tick changes the live state pointer before render success
lastPlan changes before renderer.render returns
lastRender changes only after renderer success
render failure can expose new state/new plan/old render
no frame request id, committed frame id, or failed frame row
no staged state or commitState boundary
no canonical state, raw-plan, enhanced-plan, render, or canvas fingerprints
no canvas commit acknowledgement
```

## Raw and enhanced plan coherence gaps

```txt
createGameSnapshot calls game.getRenderPlan() with default time 0
web-host adds lastPlan from the latest RAF time
one GameHost snapshot can contain rawPlan.time=0 and enhancedPlan.time=current
topology keys exist but no full plan fingerprint tuple exists
rebuildRenderPlan has no source epoch or frame commit result
```

## Browser editor mutation gaps

```txt
runtime.tick calls game.tick directly
runtime.reset calls game.reset directly
neither capability enhances, renders, updates HUD, or commits a frame
subsequent scene/render/capture reads can describe different moments
no mutation command id, result, target frame, or expected frame
```

## Capture and public-readback gaps

```txt
renderer.capture reads canvas bytes and renderer snapshot independently
capture has no frame id or expected-frame admission
GameHost.getState reads live state
GameHost.getRenderPlan reads retained or on-demand plan
GameHost.getRenderSnapshot reads retained or renderer-local snapshot
GameHost.getSnapshot combines independently sourced facts
editor snapshot independently reads runtime and renderer
HUD has no session/run/frame identity
```

## Browser versus Node observation gaps

```txt
browser uses actual WebGL canvas and external source provider
Node environment normally uses fallback source
Node build recomputes plan, mesh, and metrics on demand
Node capture emits a synthetic SVG, not the browser canvas
capability calls do not share one committed frame row
browser/Node parity has no source or frame fingerprint contract
```

## Source-provider gaps

```txt
browser requires the external CDN provider
Node/headless silently uses fallback when externalKits is omitted
provider selection and fallback policy are implicit
source URL/commit/version/fingerprint/epoch are not one observation
external/fallback parity is asserted rather than measured
```

## Interaction and objective gaps

```txt
movement and action inputs are ignored
no typed gameplay command/result contract
walk-the-path and inspect-tree remain descriptors
player.pathProgress and completedObjectiveIds never change
```

## Mesh and registry proof gaps

```txt
mesh builder lacks per-stage contribution rows
descriptor ids do not survive renderer readback
attempted/consumed/skipped/unsupported/fallback counts are absent
registry active status is membership rather than implementation proof
```

## Required missing fixtures

```txt
runtime-session-lifecycle-smoke
runtime-single-raf-smoke
runtime-stop-cancels-raf-smoke
runtime-restart-generation-smoke
runtime-dispose-idempotency-smoke
runtime-fatal-rollback-smoke
committed-frame-coherence-smoke
render-failure-no-partial-publish-smoke
editor-tick-frame-commit-smoke
reset-frame-commit-smoke
capture-frame-correlation-smoke
gamehost-frame-snapshot-smoke
browser-node-frame-parity-smoke
failed-frame-pointer-stability-smoke
meadow-source-provider-contract-smoke
meadow-source-fallback-parity-smoke
meadow-interaction-command-smoke
meadow-objective-progress-smoke
mesh-contribution-ledger-smoke
dsk-registry-truth-smoke
```

## Do not solve first

```txt
visual fidelity or asset expansion
renderer replacement or WebGPU migration
new meadow content
postprocess expansion
CDN migration before provider authority
shared-kit promotion before proof
audio/save/UI expansion
gameplay reducers before lifecycle and frame commitment
```

## Current order

```txt
1. Runtime Session Lifecycle Authority + Stop/Restart/Dispose/Rollback Fixture Gate
2. Committed Frame Observation Authority + State/Plan/Render/Canvas Coherence Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. Mesh Contribution Ledger + Registry Truth Fixture Gate
```
