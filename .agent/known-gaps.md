# IntoTheMeadow Known Gaps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T02-28-12-04-00`

## Selection state

```txt
10 accessible LuminaryLabs-Publish repositories observed
TheCavalryOfRome excluded by rule
9 eligible repositories centrally tracked with root .agent state
IntoTheMeadow selected as the oldest eligible documented fallback when this pass began
a concurrent registry-truth audit landed during this pass
only IntoTheMeadow changed by this pass
```

## Registry census correction retained

```txt
source local registry count: 43
external registry count: 1
total declared count: 44
required-v0.1 local count: 15
prior docs incorrectly said 44 local plus one external
```

## Runtime controller reachability gaps

```txt
boot discards the resolved host controller
GameHost does not expose lifecycle commands or state
browser editor exposes no lifecycle capabilities
no supported stop, restart, dispose, or lifecycle snapshot path
```

## RAF ownership and multiplication gaps

```txt
RAF ids are never retained
stop does not cancel the pending RAF
start can schedule while the old callback remains queued
old and new callbacks can both observe stopped=false
both callbacks tick, render, update HUD, and schedule successors
no one-active-RAF invariant
no runId or generation fence
no restart transaction
```

## Simulation cadence gaps

```txt
each callback applies fixed dt=1/60
state.frame increments per callback
duplicate RAF chains double frame advancement
RAF timestamp time and fixed dt can diverge
no clock authority or callback admission result
```

## Construction and rollback gaps

```txt
resource acquisition has no cleanup stack
startup phases have no typed results
first-frame failure has no reverse-order rollback
showFatal does not dispose renderer or editor bridge
showFatal does not release or restore globals
host controller has no dispose method
renderer.dispose and editorBridge.dispose are not coordinated
no terminal idempotency proof
```

## Global and listener ownership gaps

```txt
exposeGameHost overwrites target.GameHost without retaining the prior value
editor bridge overwrites target.NexusEditorEnvironment
editor disposal deletes its global but does not restore a prior owner
error and unhandledrejection listeners survive stop and fatal failure
no lease token, owner generation, conflict result, or release journal
```

## Renderer lifetime gaps

```txt
renderer program and buffers live until renderer.dispose
web host never coordinates renderer.dispose
fatal render failure leaves WebGL resources live
start remains available after fatal stop
renderer dispose has no disposed guard or typed result
render-after-dispose is not explicitly rejected
```

## Registry authority gaps

```txt
active-v0.1 is derived from required-list membership
membership does not prove implementation
implementation does not prove import
import does not prove invocation
invocation does not prove output
output does not prove consumer use
consumer use does not survive into a proof ledger
```

## Service-contract gaps

```txt
meadow-webgl-renderer-v2-kit lacks complete explicit domain/service truth
required renderer descriptor can diverge from the actual renderer contract
fallback and adapter surfaces are source-backed but not registry IDs
many declared gameplay/audio/save/UI kits are descriptor shells
no automated comparison checks declared services against exports and consumers
```

## Atomic frame-publication gaps

```txt
game.tick changes state before render success
lastPlan changes before renderer.render returns
lastRender changes only after renderer success
no frame request id, commit id, failed row, or canvas acknowledgement
browser editor tick/reset bypass render commitment
GameHost and capture combine independently sourced facts
```

## Source-provider gaps

```txt
browser requires the external CDN provider
Node/headless can use fallback implicitly
provider provenance is not one immutable observation
external/fallback parity is asserted rather than measured
```

## Interaction and objective gaps

```txt
movement and action inputs are ignored
no typed gameplay command/result contract
walk-the-path and inspect-tree remain descriptors
player.pathProgress and completedObjectiveIds never change
```

## Consumption-proof gaps

```txt
registry snapshot records descriptor status only
no import or invocation ledger exists
no producer-to-consumer edge list exists
mesh builder does not retain per-kit contribution rows
renderer snapshot does not retain kit or descriptor producer IDs
gameplay loop does not retain descriptor-consumption rows
editor and GameHost cannot query kit truth
```

## Required missing fixtures

```txt
runtime-controller-reachability-smoke
runtime-single-raf-smoke
runtime-stop-cancels-pending-raf-smoke
runtime-stop-start-race-smoke
runtime-restart-generation-smoke
runtime-global-lease-restore-smoke
runtime-first-frame-rollback-smoke
runtime-fatal-disposal-smoke
runtime-dispose-idempotency-smoke
runtime-listener-release-smoke
runtime-render-after-dispose-smoke
committed-frame-coherence-smoke
render-failure-no-partial-publish-smoke
editor-tick-frame-commit-smoke
capture-frame-correlation-smoke
browser-node-frame-parity-smoke
meadow-source-provider-contract-smoke
meadow-interaction-command-smoke
dsk-registry-census-smoke
dsk-service-map-completeness-smoke
dsk-implementation-resolution-smoke
dsk-import-invocation-smoke
dsk-producer-consumer-edge-smoke
renderer-kit-service-contract-smoke
mesh-contribution-ledger-smoke
gameplay-descriptor-consumption-smoke
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
1. Runtime Session Lifecycle Authority + Single-RAF / Global-Lease / Rollback Fixture Gate
2. Committed Frame Observation Authority + State/Plan/Render/Canvas Coherence Fixture Gate
3. Source Provider Authority + External/Fallback Parity Fixture Gate
4. Interaction Command Authority + Objective Progress Fixture Gate
5. DSK Registry Truth + Mesh Contribution and Consumer Proof Fixture Gate
```
