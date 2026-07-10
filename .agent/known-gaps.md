# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-10T19-48-39-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow remained the single selected product repository
near-simultaneous audits stayed scoped to the same repository
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

## Source-provider selection gaps

```txt
browser startup requires the external CDN provider
external import failure stops before local fallback selection
Node/headless construction silently selects the local fallback when externalKits is omitted
provider choice has no accepted/rejected/fallback result row
fallback policy is implicit and differs by host path
install status proves function presence only
no source epoch or provider-selection journal exists
```

## Source provenance gaps

```txt
external module URL and pinned commit are not retained in runtime source observations
external factory version and plan version are not normalized into one contract
local fallback uses local-source-plan-v1 and a different snapshot shape
source plan fingerprint is absent
rebuildRenderPlan has no source lineage or reason row
GameHost/editor snapshots cannot identify the selected provider
render snapshots cannot identify the source plan consumed
```

## External/fallback parity gaps

```txt
external and fallback placement algorithms differ
object ID formats differ
normalization rules differ
validation strength differs
feature coverage and snapshot fields differ
fallback validate() claims representative without measured evidence
no schema, semantic, count, topology, visual, or gameplay parity classification exists
no external-provider smoke is wired into npm run check
current Node render/determinism checks primarily exercise the fallback path
```

## Gameplay source-binding gaps

```txt
arrival-path and focal-tree targets are separate content descriptors
no canonical source target index binds gameplay ids to rendered source objects
no source epoch invalidates stale target references
no command result can prove which path/tree facts were used
browser and Node fixtures could preflight against different provider geometry
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

## Mesh and registry proof gaps

```txt
mesh builder lacks per-stage contribution rows
descriptor ids do not survive renderer readback
attempted/consumed/skipped/unsupported/fallback counts are absent
primitiveFallbackCount is hard-coded to 0
registry active status is list membership rather than implementation proof
```

## Required missing fixtures

```txt
runtime-session-lifecycle-smoke
runtime-stop-restart-smoke
runtime-dispose-idempotency-smoke
runtime-fatal-rollback-smoke
editor-listener-cleanup-smoke
global-exposure-lease-smoke
meadow-source-provider-contract-smoke
meadow-external-provider-smoke
meadow-source-fallback-parity-smoke
meadow-source-render-consumption-smoke
meadow-source-target-index-smoke
meadow-interaction-command-smoke
meadow-objective-progress-smoke
meadow-command-replay-smoke
mesh-contribution-ledger-smoke
dsk-registry-truth-smoke
```

## Do not solve first

```txt
visual fidelity or asset expansion
renderer replacement or WebGPU migration
new meadow content
postprocess expansion
shared-kit promotion
CDN migration before provider authority
source-kit promotion before parity evidence
audio/save/UI expansion
interaction reducers before lifecycle idempotency and source target identity
```

## Current order

```txt
1. IntoTheMeadow Runtime Session Lifecycle Authority + Stop/Restart/Dispose Fixture Gate
2. IntoTheMeadow Source Provider Authority + External/Fallback Parity Fixture Gate
3. IntoTheMeadow Interaction Command Authority + Objective Progress Fixture Gate
4. Mesh Contribution Ledger + Registry Truth Fixture Gate
```