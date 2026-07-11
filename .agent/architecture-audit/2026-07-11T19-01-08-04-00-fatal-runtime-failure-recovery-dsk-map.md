# Fatal Runtime Failure Recovery DSK Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-11T19-01-08-04-00`

## Summary

The runtime has independent owners for startup, game state, plan enhancement, WebGL rendering, globals and editor capabilities, but no owner composes their failure behavior. A fatal condition currently changes presentation only.

## Plan ledger

**Goal:** add one parent authority that consumes existing lifecycle, renderer, committed-frame and editor owners and turns startup/frame errors into deterministic rollback, quarantine, cleanup and cold-restart results.

- [x] Map current owners.
- [x] Map startup acquisition order.
- [x] Map frame mutation and publication order.
- [x] Map public capabilities and cleanup surfaces.
- [x] Identify missing authority.
- [x] Define coordinating kits and transaction phases.
- [ ] Implement after upstream lifecycle and committed-frame gates.

## Current owner map

```txt
boot-game
  owns top-level start rejection projection

web-host-dsk
  owns startup orchestration, RAF, stopped Boolean, lastPlan and lastRender

into-the-meadow-game-dsk
  owns mutable state, tick, reset and base source plan

render-plan enhancer
  owns enhanced-plan cache and snapshot

meadow-webgl-renderer-v2-kit
  owns context, program, locations, buffers, canvas submission, snapshot and disposal

GameHost exposure
  owns public global read and raw game authority

browser editor bridge
  owns capability registry, error listeners, canvas capture, global publication and disposal

meadow-diagnostics-dsk
  owns aggregate source/validation counts but no failure lifecycle
```

No owner controls the whole failure transaction.

## Current startup graph

```txt
load external provider
  -> create game
  -> create renderer
  -> create enhancer
  -> expose GameHost global
  -> install editor/listeners/global
  -> hide loading state
  -> request RAF
```

Each completed step should register a cleanup lease. Current code does not retain such a ledger.

## Current frame graph

```txt
frame request
  -> game.tick
  -> source plan
  -> enhanced plan
  -> contract validation
  -> lastPlan assignment
  -> renderer resize/mesh/buffer/draw
  -> renderer snapshot
  -> lastRender assignment
  -> HUD projection
```

Failure can occur after one or more live owners have mutated.

## Missing parent domain

```txt
meadow-runtime-failure-recovery-authority-domain
```

Responsibilities:

```txt
allocate startup/frame/failure identity
record phase and acquisition/resource impact
maintain reverse cleanup stack
stage frame work and retain previous commit
classify recoverable versus terminal failures
quarantine public mutation and capture
publish typed failure and cleanup results
route context-specific failures to WebGL recovery
retire terminal graphs
admit cold replacement-session startup
publish readiness only after first replacement frame
```

## Proposed kit map

```txt
meadow-runtime-failure-recovery-authority-domain
  -> runtime-failure-id-kit
  -> runtime-failure-state-kit
  -> startup-acquisition-ledger-kit
  -> reverse-cleanup-stack-kit
  -> failure-classification-kit
  -> fatal-event-admission-kit
  -> frame-failure-result-kit
  -> last-known-good-frame-kit
  -> failure-quarantine-kit
  -> failure-capability-fence-kit
  -> failure-capture-fence-kit
  -> rollback-or-retire-plan-kit
  -> cleanup-result-kit
  -> failure-observation-kit
  -> restart-admission-kit
  -> cold-restart-transaction-kit
  -> terminal-disposal-kit
  -> fatal-recovery-journal-kit
  -> fatal-recovery-fixture-kit
```

## Existing domains to compose

```txt
Runtime Session Lifecycle Authority
Host Capability Gateway and Raw Runtime Quarantine
Runtime Step Admission and Clock Integrity
Source Provider Authority
Render Topology Identity Authority
WebGL Context Recovery Authority
Committed Frame Observation Authority
DSK Runtime Consumption Authority
```

Do not create duplicate game, renderer, editor, context or frame owners.

## Startup contract

```txt
prepareStartup(attempt)
  -> candidate session
  -> acquisition ledger

acquire(step)
  -> lease + cleanup callback

commitStartup(candidate)
  -> publish globals
  -> request first frame
  -> commit ready only after first frame

failStartup(error)
  -> typed classification
  -> reverse cleanup
  -> failed candidate retirement
  -> no published ready state
```

## Frame contract

```txt
prepareFrame(request)
  -> staged state/plan/render lineage

submitFrame(stage)
  -> renderer candidate result

commitFrame(stage, result)
  -> public immutable frame row

failFrame(stage, error)
  -> preserve previous committed row
  -> quarantine graph
  -> classify rollback/recovery/retirement
```

## Recovery contract

```txt
recoverable GPU failure
  -> WebGL Context Recovery Authority
  -> new resource generation
  -> first recovered frame

terminal failure
  -> terminal disposal
  -> predecessor generation fencing
  -> cold startup candidate
  -> new session/renderer/frame generation
  -> first committed replacement frame
```

## Promotion boundary

Keep the browser adapter and product-specific policy local. Generic acquisition-ledger, cleanup-stack, failure-state and cold-restart contracts may be promoted into NexusEngine or ProtoKits only after this repo proves failure at every acquisition/frame phase, cleanup failure, repeated restart and stale predecessor rejection.