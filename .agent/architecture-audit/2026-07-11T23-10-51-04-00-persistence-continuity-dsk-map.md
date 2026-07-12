# Persistence Continuity DSK Map

**Timestamp:** `2026-07-11T23-10-51-04-00`

## Parent domain

```txt
meadow-persistence-continuity-authority-domain
```

## Current ownership map

```txt
into-the-meadow-game-dsk
  owns manifest, state root and game snapshot

meadow-save-dsk
  declares save-model, save-slots, persistence-adapter, migration and save-validation
  status: planned descriptor
  runtime implementation: absent

web-host-dsk
  creates a fresh game on browser startup
  owns no storage discovery or hydration path

GameHost
  exposes state, snapshots, diagnostics, render state and raw game
  exposes no persistence capability

browser editor bridge
  exposes runtime, scene, renderer and browser commands
  exposes no save/load commands

Node headless environment
  exposes runtime, scene, renderer, camera, browser and workspace commands
  exposes no persistence domain
```

## Required layers

### Layer 1: identity and schema

```txt
save-schema-descriptor-kit
save-slot-registry-kit
checkpoint-id-kit
state-revision-kit
reset-epoch-kit
save-envelope-kit
save-integrity-fingerprint-kit
```

### Layer 2: storage capability and commands

```txt
persistence-capability-kit
save-command-kit
save-admission-kit
save-write-result-kit
save-candidate-read-kit
save-candidate-classifier-kit
```

### Layer 3: compatibility and hydration

```txt
save-migration-kit
save-reconciliation-kit
hydration-plan-kit
hydration-commit-kit
hydration-rollback-kit
```

### Layer 4: observation and proof

```txt
persistence-journal-kit
persistence-observation-kit
visible-frame-hydration-ack-kit
persistence-fixture-kit
browser-reload-continuity-smoke-kit
```

## Persistable state boundary

The save envelope should persist canonical gameplay state, not live render plans, renderer resources, editor objects, functions or diagnostics caches.

```txt
persist
  active scene identity
  player transform and progression-relevant state
  objective completion ledger
  story beat state
  world state that is not derivable from canonical content
  state revision and reset epoch

rebuild after hydration
  external provider instance
  DSK descriptors and install report
  static render plan
  render enhancer caches
  WebGL context, programs and buffers
  browser editor bridge
  diagnostics derived from the committed live graph
```

## Required command/result contracts

```txt
SaveCommand
  commandId
  runtimeSessionId
  resetEpoch
  expectedStateRevision
  slotId
  reason

SaveResult
  commandId
  status
  reason
  slotId
  checkpointId
  schemaVersion
  stateRevision
  fingerprint
  writeVerified

LoadCommand
  commandId
  runtimeSessionId
  resetEpoch
  slotId or candidateId

HydrationResult
  commandId
  status
  reason
  checkpointId
  sourceSchemaVersion
  migratedSchemaVersion
  predecessorStateRevision
  committedStateRevision
  committedFrameId
```

## Required transaction order

```txt
save
  -> admit command
  -> capture canonical persistable state
  -> validate envelope
  -> fingerprint
  -> atomic slot write
  -> read-back verification
  -> typed result and bounded journal

load
  -> enumerate/read candidates
  -> parse and classify
  -> migrate supported schema
  -> reconcile content identity
  -> prepare detached state
  -> atomically commit state revision
  -> rebuild derived render state
  -> acknowledge first visible frame
  -> publish typed result and journal
```

## Existing owners to update first

```txt
meadow-save-dsk
into-the-meadow-game-dsk
web-host-dsk
meadow-diagnostics-dsk
GameHost capability gateway
browser editor bridge
Node headless environment
Runtime Session Lifecycle Authority
Runtime Clock and Step Admission Authority
Committed Frame Observation Authority
```

## Acceptance boundary

Persistence is not complete when JSON can be written. It is complete when an admitted checkpoint survives reload, migration and hydration, failed candidates cannot partially mutate the live graph, and the first visible frame cites the same checkpoint identity.