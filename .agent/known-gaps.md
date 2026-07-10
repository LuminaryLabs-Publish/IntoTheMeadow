# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T19-48-09-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as oldest eligible documented fallback
```

## Runtime lifecycle gaps

```txt
boot-game.js discards the resolved host controller
no session id or run id exists
no lifecycle state machine exists
requestAnimationFrame id is not retained
stop() only changes a boolean
start() can schedule while an older callback remains pending
no coordinated restart operation exists
no ordered resource ownership ledger exists
no startup rollback exists
no terminal idempotent dispose exists
```

## Cleanup and ownership gaps

```txt
renderer.dispose() exists but web-host never calls it
editorBridge.dispose() exists but web-host never calls it
planEnhancer.invalidate() exists but terminal cleanup does not call it
GameHost assignment has no lease/release service
NexusEditorEnvironment cleanup is not coordinated by the host
manual stop and render failure leave resources and globals unaccounted for
repeated host construction can leave old listeners active
```

## Lifecycle proof gaps

```txt
no result contract for start, stop, restart, or dispose
no bounded lifecycle journal
no GameHost lifecycle snapshot
no editor lifecycle commands
no one-RAF invariant fixture
no stop/start race fixture
no renderer/editor disposal fixture
no listener/global cleanup fixture
no fatal-start rollback fixture
no start-after-dispose rejection fixture
```

## Interaction authority gaps

```txt
web-host submits only time and fixed dt to game.tick
advanceGameState ignores movement and action inputs
no typed gameplay command contract
no browser input adapter
no target lookup or preflight
no accepted/rejected/no-op gameplay result contract
no ordered gameplay journal
```

## Objective authority gaps

```txt
walk-the-path and inspect-tree remain static descriptors
player.pathProgress never changes
no inspected-target state exists
completedObjectiveIds never changes
activeObjectiveId never advances
no reducer links actions to objective completion
```

## Timing gaps

```txt
web-host passes dt: 1/60 regardless of actual frame duration
frame count is tied to render callback count
absolute RAF time and fixed dt use different clock authority
no pause/resume or visibility-gap policy
no cadence-parity fixture
```

## External source, mesh, and registry proof gaps

```txt
external source provenance is dropped after import
fallback parity is not proven
source plan remains cached at time 0 with a time-only overlay
mesh builder lacks per-stage contribution rows
descriptor ids do not survive renderer readback
primitiveFallbackCount is hard-coded to 0
registry active status is not implementation proof
```

## Do not solve first

```txt
visual fidelity or asset expansion
renderer replacement or WebGPU migration
new meadow content
postprocess expansion
shared-kit promotion
CDN migration
audio/save/UI expansion
interaction reducers before lifecycle idempotency
```

## Current ledge

```txt
IntoTheMeadow Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
```

After lifecycle proof, resume `IntoTheMeadow Interaction Command Authority + Objective Progress Fixture Gate`. External-source provenance/fallback parity, mesh contribution, and registry truth remain required companion gates.