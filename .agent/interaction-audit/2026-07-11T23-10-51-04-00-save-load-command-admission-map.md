# Save and Load Command Admission Map

**Timestamp:** `2026-07-11T23-10-51-04-00`

## Current command surface

```txt
GameHost
  getState
  getSnapshot
  getDiagnostics
  getRenderPlan
  getRenderSnapshot
  getRenderEnhancerSnapshot
  raw game

browser editor
  runtime.status
  runtime.getState
  runtime.getSnapshot
  runtime.tick
  runtime.reset
  scene and renderer observations

Node headless editor
  runtime, scene, renderer, camera, browser and workspace capabilities
```

Persistence commands are absent from every ingress.

## Required command map

```txt
persistence.listSlots
  -> PersistenceListCommand
  -> capability and session admission
  -> independent slot observations
  -> PersistenceListResult

persistence.save
  -> SaveCommand
  -> session, reset epoch and expected state revision admission
  -> canonical envelope and atomic write
  -> SaveResult

persistence.load
  -> LoadCommand
  -> candidate parse, schema admission, migration and reconciliation
  -> detached hydration plan
  -> atomic state commit and first-frame acknowledgement
  -> HydrationResult

persistence.delete
  -> DeleteCheckpointCommand
  -> policy and checkpoint identity admission
  -> atomic deletion or typed failure
  -> DeleteCheckpointResult

persistence.clear
  -> ClearPersistenceCommand
  -> explicit product-policy admission
  -> bounded multi-slot result
```

## Required admission fields

```txt
commandId
runtimeSessionId
resetEpoch
expectedStateRevision
sourceAdapter
slotId or checkpointId
saveSchemaVersion
contentManifestId
contentManifestVersion
```

## Required rejection classes

```txt
unavailable persistence capability
stale session
stale reset epoch
stale state revision
duplicate command
unknown slot
malformed payload
unsupported schema
migration unavailable
content mismatch
integrity mismatch
quota exceeded
storage denied
read-back mismatch
hydration validation failure
visible-frame timeout
```

## Adapter parity

Browser UI, GameHost, browser editor and Node headless commands must all create the same domain command envelopes and receive the same typed result shapes. No adapter should call raw storage or mutate game state directly.

## Required journal row

```txt
commandId
sourceAdapter
operation
slotId
checkpointId
predecessorStateRevision
resultStateRevision
status
reason
startedAt
completedAt
committedFrameId
```

## Completion boundary

A save/load button or editor command is not authoritative by itself. Every ingress must route through the same persistence command admission, transaction and result contract.