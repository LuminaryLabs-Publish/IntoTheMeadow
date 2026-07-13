# Architecture audit: web-host lifecycle retirement DSK map

**Timestamp:** `2026-07-13T05-31-58-04-00`

## Summary

The existing `web-host-dsk` declares browser-loop and browser-safety services but does not own lifecycle generations or participant retirement. The missing authority should be a bounded host-lifecycle domain, not a renderer-only concern, because it coordinates RAF, public capabilities, editor listeners, renderer resources, fatal policy, and future game participants.

## Plan ledger

**Goal:** place lifecycle ownership at the correct domain boundary and define composable kits without moving game or render semantics into the host.

- [x] Identify current participant construction.
- [x] Identify current participant cleanup surfaces.
- [x] Separate host lifecycle from frame scheduling, rendering, and gameplay meaning.
- [x] Define the parent domain and subdomains.
- [x] Define candidate kit boundaries and service contracts.
- [x] Define required dependencies and exclusions.
- [ ] Implement the DSK later.

## Current architecture

```txt
IntoTheMeadow browser route
  web-host-dsk
    document shell
    external kit loading
    game construction
    renderer construction
    plan enhancer construction
    GameHost projection
    editor bridge installation
    RAF loop
    boolean stop/start
    fatal projection

  meadow-webgl-renderer-v2-kit
    GPU resource construction
    render
    dispose

  browser editor bridge
    capability registry
    error/rejection listeners
    global NexusEditorEnvironment
    dispose

  expose-game-host
    global GameHost assignment
    no revoke
```

The host composes startup but not terminal ownership.

## Correct separation

```txt
Web Host Lifecycle Authority
  owns participant generations, lifecycle phases, scheduling admission, cleanup order, public leases, and terminal results

Frame Scheduler Authority
  owns wall-time samples, fixed-step policy, RAF cadence, and frame temporal provenance

Render Host / WebGL Renderer
  owns render-plan ingest, GPU resources, drawing, snapshots, and renderer-local disposal

Editor Bridge
  owns capability dispatch, error observations, browser capture, and its listener/global disposal

Game Composition
  owns gameplay state and DSK composition, not browser resource retirement
```

## Required parent domain

```txt
meadow-web-host-lifecycle-retirement-authority-domain
```

## Subdomains

```txt
host session identity
host generation and revision
lifecycle phase machine
start admission and readiness
pause/resume admission
RAF request ownership
participant registry
ordered cleanup
public capability leases
fatal transition policy
duplicate-start and stale-generation rejection
typed results
bounded observations and journal
visible lifecycle acknowledgements
fixture orchestration
```

## Candidate kits and offered services

- `web-host-session-id-kit`: allocate and validate one browser-host session identity.
- `web-host-generation-kit`: allocate successor generations and reject predecessor callbacks.
- `web-host-lifecycle-phase-kit`: own `Created`, `Starting`, `Running`, `Paused`, `Stopping`, `Stopped`, `Failed`, and `Retired`.
- `web-host-lifecycle-revision-kit`: revision every accepted lifecycle transition.
- `web-host-start-command-kit`: normalize and admit startup requests.
- `web-host-pause-command-kit`: admit non-destructive frame suspension.
- `web-host-resume-command-kit`: validate retained participants and resume one RAF chain.
- `web-host-retire-command-kit`: coordinate idempotent terminal retirement.
- `web-host-participant-registry-kit`: register participants, dependencies, cleanup order, and terminal requirements.
- `raf-request-ownership-kit`: retain the active RAF ID and generation.
- `raf-cancel-receipt-kit`: publish whether a scheduled frame was cancelled, already consumed, or stale.
- `host-duplicate-start-admission-kit`: reject or explicitly replace an active host generation.
- `host-stale-generation-rejection-kit`: quarantine late callbacks and capability invocations.
- `game-host-capability-lease-kit`: install and conditionally revoke `globalThis.GameHost`.
- `editor-bridge-capability-lease-kit`: bind `NexusEditorEnvironment` to the active host generation.
- `renderer-retirement-kit`: call renderer-local disposal once and record a receipt.
- `editor-bridge-retirement-kit`: detach listeners, revoke the bridge, and record a receipt.
- `fatal-host-transition-kit`: classify fatal errors and select retire or degraded-retention policy.
- `host-lifecycle-result-kit`: publish typed terminal results.
- `host-lifecycle-observation-kit`: expose bounded diagnostics without retaining mutation capability.
- `host-lifecycle-journal-kit`: retain immutable transition evidence.
- `first-resumed-frame-ack-kit`: correlate the first post-resume visible frame.
- `first-retired-state-ack-kit`: correlate the terminal public state after cleanup.
- `web-host-stop-resume-fixture-kit`: test pause/resume cadence and resource retention.
- `web-host-retirement-fixture-kit`: test exactly-once participant cleanup.
- `web-host-duplicate-start-fixture-kit`: test duplicate admission and predecessor replacement.
- `web-host-fatal-cleanup-fixture-kit`: test fatal transition and capability revocation.
- `web-host-stale-callback-fixture-kit`: test predecessor RAF and capability quarantine.

## Required participant contract

```txt
HostParticipantDescriptor {
  id
  generation
  requiredForRunning
  retainAcrossPause
  retireOrder
  retire(): HostParticipantRetireResult
  snapshot(): immutable descriptor
}
```

Existing adapters:

```txt
renderer participant
  -> retire calls renderer.dispose()

editor bridge participant
  -> retire calls editorBridge.dispose()

GameHost lease participant
  -> retire conditionally deletes global only when lease identity matches

RAF participant
  -> retire cancels retained request or records already-consumed/stale
```

Future adapters can cover game state, provider leases, plan enhancer caches, observers, audio, input, and persistence without changing the lifecycle coordinator.

## Required lifecycle results

```txt
Started
Paused
Resumed
Retired
Degraded
Failed
RejectedDuplicate
RejectedStale
AlreadyPaused
AlreadyRetired
```

Every result must carry:

```txt
hostSessionId
hostGeneration
previousPhase
nextPhase
lifecycleRevision
participantReceipts
activeRafId or null
publicCapabilityLeaseRevision
error summary when applicable
```

## Dependency rules

```txt
lifecycle authority may call participant-local dispose methods
renderer must not own editor or GameHost cleanup
editor bridge must not own renderer cleanup
frame scheduler must not decide terminal resource policy
gameplay DSKs must not directly manipulate browser globals
global deletion must be conditional on generation/lease ownership
rejected or stale commands must perform zero cleanup against a successor generation
```

## Promotion criteria

The lifecycle domain should remain repo-local until a second browser-host composition proves the same phase, participant, lease, and result contracts. Only fiction-neutral interfaces should be promoted into NexusEngine core or reusable ProtoKits.
