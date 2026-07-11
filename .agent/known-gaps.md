# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T22-58-36-04-00`

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
stop changes only a Boolean
start can schedule while the stopped run still owns a pending RAF
pending old and new callbacks can both resume and fork the loop
no restart transaction or run-generation fence
no visibility-gap or cadence policy
```

## Construction and rollback gaps

```txt
resource acquisition has no cleanup stack
external import, game, renderer, enhancer, globals, editor listeners, and RAF are not one transaction
GameHost can remain exposed if editor installation fails
renderer resources can remain live after later construction failure
first-frame failure leaves globals, listeners, renderer, and references active
boot catch can display failure but cannot dispose partial ownership
```

## Disposal gaps

```txt
host controller has no dispose method
renderer.dispose exists but the host never calls it
editorBridge.dispose exists but the host never calls it
GameHost has no lease or release operation
enhancer cache invalidation is not coordinated
game and retained plans remain reachable through globals
no reverse-order disposal result
no idempotency proof
no render-after-dispose rejection
```

## Fatal-state gaps

```txt
showFatal only sets stopped and updates DOM
fatal state has no typed reason or failed phase
fatal state does not cancel an owned RAF
fatal state does not clean up resources or global exposures
fatal startup and fatal frame paths do not converge on one terminal policy
```

## Atomic frame-publication gaps

```txt
game.tick mutates state before render success
lastPlan is assigned before renderer.render returns
lastRender is assigned only after renderer success
render failure can pair a new plan with an old renderer snapshot
no staged frame object or atomic commit point
no committed-frame id or bounded frame journals
```

## Observation coherence gaps

```txt
GameHost reads live state and separately retained render facts
editor snapshot reads runtime and renderer independently
HUD carries no session/run/frame identity
no shared state/plan/render fingerprint tuple
no guarantee that public readback describes one live session generation
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
no target preflight or source target index
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
runtime-global-lease-smoke
runtime-listener-release-smoke
runtime-render-after-dispose-smoke
committed-frame-coherence-smoke
render-failure-no-partial-publish-smoke
editor-tick-frame-commit-smoke
reset-frame-commit-smoke
capture-frame-correlation-smoke
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
2. Committed Frame Observation Authority + Atomic Frame Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. Mesh Contribution Ledger + Registry Truth Fixture Gate
```
