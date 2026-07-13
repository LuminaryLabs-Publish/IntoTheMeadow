# Web-host lifecycle audit: pause, resume, retire, and resource contract

**Timestamp:** `2026-07-13T05-31-58-04-00`

## Summary

The browser host needs two distinct terminal semantics: pause/resume retains valid participants; retire disposes and revokes them. The current `stop()` method conflates these concerns by stopping frame work while leaving every participant installed, and fatal handling silently applies the same behavior.

## Plan ledger

**Goal:** define a lifecycle contract that is deterministic, idempotent, generation-safe, and composable with current renderer and editor-bridge disposal methods.

- [x] Define lifecycle phases.
- [x] Define participant ownership.
- [x] Define pause/resume semantics.
- [x] Define terminal retirement semantics.
- [x] Define fatal and duplicate-start policy.
- [x] Define typed results and proof.
- [ ] Implement later.

## Lifecycle phases

```txt
Created
Starting
Running
Pausing
Paused
Resuming
Stopping
Stopped
Failed
Retired
```

Terminal phases:

```txt
Stopped   -> terminal clean stop when compatibility requires a stopped state
Failed    -> terminal or degraded state with bounded diagnostics
Retired   -> all mandatory participants retired and public leases revoked
```

## Participant ownership table

| Participant | Created by | Retain across pause | Terminal action | Current action |
|---|---|---:|---|---|
| RAF request | web host | no active request | `cancelAnimationFrame` or consumed receipt | untracked |
| game aggregate | web host | yes | future `dispose/retire` contract | none |
| render-plan enhancer | web host | yes | future cache retirement | none |
| WebGL renderer | web host | yes | `renderer.dispose()` | not called |
| browser editor bridge | web host | yes | `editorBridge.dispose()` | not called |
| error/rejection listeners | editor bridge | yes | detached by bridge dispose | not detached |
| `NexusEditorEnvironment` | editor bridge | yes | conditional revoke | not revoked |
| `GameHost` | expose-game-host | yes | generation-bound conditional revoke | no revoke surface |
| HUD/loading projection | document shell | yes | project terminal state or detach | partial error text only |

## Pause contract

```txt
PauseWebHostCommand
  -> require Running
  -> allocate lifecycle revision
  -> retain active host generation
  -> cancel or account for pending RAF
  -> reject new browser-frame admission
  -> retain game, enhancer, renderer, bridge, listeners, and public read capabilities
  -> classify editor mutation policy explicitly
  -> publish Paused
```

Pause must not call renderer or bridge disposal.

## Resume contract

```txt
ResumeWebHostCommand
  -> require Paused
  -> validate participant generations and readiness
  -> reset scheduler wall-time/discontinuity state
  -> allocate exactly one RAF request
  -> enter Running
  -> publish first resumed frame acknowledgement
```

## Retirement contract

```txt
RetireWebHostCommand
  -> accept from Created, Starting, Running, Paused, Failed, or Stopped
  -> idempotently enter Stopping
  -> reserve terminal lifecycle revision
  -> cancel/account for active RAF
  -> block new editor mutation and capture
  -> retire editor bridge and detach listeners
  -> revoke NexusEditorEnvironment lease
  -> revoke GameHost lease
  -> dispose renderer buffers and program once
  -> retire future game/enhancer participants in dependency order
  -> project terminal state
  -> publish Retired, Degraded, or Failed
```

## Fatal contract

A fatal frame exception must not merely set `stopped`.

```txt
FatalHostResult
  -> bind frame and host generation
  -> record bounded error evidence
  -> reject stale predecessor fatal callbacks
  -> choose policy:
       terminal-retire
       or explicit degraded-retention for diagnostics
  -> revoke mutating capabilities
  -> publish terminal/degraded result
```

If degraded retention is allowed, the retained renderer and last-good frame must be read-only, revisioned, and explicitly marked failed.

## Duplicate-start contract

```txt
StartWebHostCommand while active
  -> RejectedDuplicate
  or
  -> atomically retire predecessor and allocate successor generation
```

Silent global overwrite is not an accepted policy.

## Typed result shape

```txt
HostLifecycleResult {
  commandId
  sessionId
  hostGeneration
  previousPhase
  nextPhase
  lifecycleRevision
  status
  rafReceipt
  participantReceipts[]
  publicLeaseRevision
  firstVisibleAckId?
  errors[]
}
```

## Exactly-once rules

```txt
renderer.dispose() at most once per renderer generation
editorBridge.dispose() at most once per bridge generation
global deletion only when current value matches the retiring lease
late RAF callback cannot mutate a successor generation
late fatal callback cannot retire a successor generation
repeated retire returns AlreadyRetired with prior receipts
failed participant retirement does not hide successful receipts
```

## Required proof

```txt
participant registration snapshot
lifecycle transition journal
RAF cancel/consume receipt
listener detach receipt
global revoke receipt
WebGL resource dispose receipt
first resumed frame acknowledgement
terminal state acknowledgement
duplicate and stale rejection fixtures
```

## Validation boundary

No runtime lifecycle contract was implemented or executed. This file specifies the bounded authority required by the current source surfaces.
