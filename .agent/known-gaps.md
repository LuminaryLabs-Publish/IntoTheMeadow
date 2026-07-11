# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T21-19-36-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible documented fallback
only IntoTheMeadow changed
```

## Runtime lifecycle gaps

```txt
boot discards the resolved host controller
no session id or run id
no lifecycle state machine
RAF id is not retained
stop changes only a Boolean
start can race a pending callback
no ordered resource/global ownership
no startup rollback
no coordinated terminal dispose
```

## Atomic frame-publication gaps

```txt
game.tick mutates state before render success
lastPlan is assigned before renderer.render returns
lastRender is assigned only after renderer success
render failure can pair a new plan with an old renderer snapshot
render failure can leave advanced state with old or partial pixels
no staged frame object
no atomic commit point
no committed-frame id
no bounded committed-frame journal
no failed-frame attempt journal
```

## Observation coherence gaps

```txt
GameHost.getState reads live state
GameHost.getSnapshot builds a fresh game snapshot
GameHost getRenderPlan/getRenderSnapshot read separate retained values
editor snapshot reads runtime and renderer independently
HUD reads after render but carries no frame id
no shared state/plan/render fingerprint tuple
no guarantee that public readback describes one visible frame
```

## Editor command gaps

```txt
runtime.tick advances state without submitting a render
runtime.reset resets state without refreshing renderer/canvas observations
scene.getRenderPlan may enhance outside the normal frame path
renderer.capture returns canvas bytes and renderer snapshot without frame correlation
editor commands have no request sequence or committed-frame result
```

## Renderer evidence gaps

```txt
renderer snapshot has planId and topologyKey but no simulation frame
renderer snapshot has no render time, state fingerprint, plan fingerprint, source epoch, or frame id
canvas dimensions are not retained in the renderer snapshot
WebGL draw completion is not represented as a commit result
partial draw/clear failure has no rollback observation
```

## Timing gaps

```txt
host passes dt 1/60 regardless of actual frame duration
frame count is tied to render callback count
absolute RAF time and fixed dt use different clock authority
no visibility-gap or pause/resume policy
no cadence-parity fixture
```

## Source-provider gaps

```txt
browser requires the external CDN provider
Node/headless silently uses fallback when externalKits is omitted
provider choice and fallback policy are implicit
source URL/commit/version/fingerprint/epoch are not one immutable observation
external/fallback parity is asserted rather than measured
render observations cannot identify the source consumed
```

## Interaction and objective gaps

```txt
movement and action inputs are ignored
no typed gameplay command/result contract
no target preflight or source target index
walk-the-path and inspect-tree remain static descriptors
player.pathProgress and completedObjectiveIds never change
no gameplay journal or replay fixture
```

## Mesh and registry proof gaps

```txt
mesh builder lacks per-stage contribution rows
descriptor ids do not survive renderer readback
attempted/consumed/skipped/unsupported/fallback counts are absent
primitiveFallbackCount is hard-coded to 0
registry active status is membership rather than implementation proof
```

## Required missing fixtures

```txt
runtime-session-lifecycle-smoke
runtime-stop-restart-smoke
runtime-dispose-idempotency-smoke
runtime-fatal-rollback-smoke
committed-frame-coherence-smoke
render-failure-no-partial-publish-smoke
editor-tick-frame-commit-smoke
reset-frame-commit-smoke
capture-frame-correlation-smoke
meadow-source-provider-contract-smoke
meadow-source-fallback-parity-smoke
meadow-source-render-consumption-smoke
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
1. Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
2. Committed Frame Observation Authority + Atomic Frame Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. Mesh Contribution Ledger + Registry Truth Fixture Gate
```
