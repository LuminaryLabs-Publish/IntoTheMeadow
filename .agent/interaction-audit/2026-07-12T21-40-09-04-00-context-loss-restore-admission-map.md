# Context Loss and Restore Admission Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Timestamp:** `2026-07-12T21-40-09-04-00`

## Summary

Browser context events currently bypass the runtime because no listener owns them. This map defines the command/result path required before context loss, restoration or repeated events can alter draw admission, GPU resources, scheduler state or visible status.

## Plan ledger

**Goal:** make context lifecycle events explicit, generation-bound and zero-mutation when stale, duplicate or invalid.

- [x] Identify browser event sources and current missing consumers.
- [x] Define event envelope and predecessor evidence.
- [x] Define Lost, Restored, Stale, Duplicate and Terminal results.
- [x] Define scheduler and renderer coordination.
- [x] Define stale-event and stale-callback rejection.
- [ ] Implement event listeners and command admission later.

## Current path

```txt
browser emits webglcontextlost/webglcontextrestored
  -> no owned listener
  -> no command
  -> no result
  -> no runtime state transition
```

## Required path

```txt
DOM event
  -> WebGLContextEventEnvelope
  -> ContextEventAdmission
  -> validate runtimeSessionId
  -> validate rendererId and canvasId
  -> validate expected context generation
  -> validate event sequence and duplicate identity
  -> classify
```

### Loss result

```txt
AcceptedLost
  -> optional preventDefault under explicit recovery policy
  -> phase READY -> LOST
  -> close draw admission
  -> invalidate context-bound resource leases
  -> notify scheduler and visible status
  -> publish ContextLostResult

StaleLost / DuplicateLost / RejectedLost
  -> zero runtime, renderer and scheduler mutation
  -> bounded rejection observation
```

### Restoration result

```txt
AcceptedRestored
  -> require phase LOST or RESTORING
  -> allocate successor context/resource generations
  -> execute detached rebuild
  -> validate and install candidate
  -> publish Recovered or RecoveryFailed

StaleRestored / DuplicateRestored / RejectedRestored
  -> zero resource installation
  -> zero scheduler resume
  -> bounded rejection observation
```

## Event envelope

```txt
WebGLContextEventEnvelope {
  eventId
  eventSequence
  eventType
  runtimeSessionId
  schedulerGeneration
  rendererId
  canvasId
  predecessorContextId
  expectedContextGeneration
  expectedResourceGeneration
  observedAt
}
```

## Result set

```txt
ContextLostResult
ContextRestorationStartedResult
ContextRecoveredResult
ContextRecoveryFailedResult
ContextReloadRequiredResult
StaleContextEventResult
DuplicateContextEventResult
RejectedContextEventResult
```

## Interaction invariants

```txt
only one listener lease per active canvas/renderer generation
only READY can accept first loss
only LOST/RESTORING can accept restoration
accepted loss closes draw admission before successor frame work
accepted recovery installs one complete resource manifest
scheduler resume is exactly once and generation-bound
late RAF callbacks cannot draw with predecessor resources
visible status clears only after first restored-frame acknowledgement
```

## Cleanup

```txt
runtime stop or renderer disposal
  -> remove context listeners
  -> cancel candidate recovery work
  -> retire resource leases
  -> revoke event admission
  -> reject all late events
```
