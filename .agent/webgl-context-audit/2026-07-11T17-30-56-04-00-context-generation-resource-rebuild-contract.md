# WebGL Context Generation and Resource Rebuild Contract

**Timestamp:** `2026-07-11T17-30-56-04-00`

## Summary

A render topology key identifies CPU geometry composition, not the lifetime of WebGL objects. Every restored context needs a new resource generation even when the plan and topology are unchanged.

## Plan ledger

**Goal:** separate CPU topology identity from GPU context/resource identity and define atomic rebuild, rollback and observation rules.

- [x] Identify CPU mesh cache ownership.
- [x] Identify context-bound program, location and buffer ownership.
- [x] Identify the same-topology restoration failure.
- [x] Define context and resource generations.
- [x] Define staged rebuild and atomic commit.
- [x] Define rollback and disposal.
- [x] Define diagnostics and capture correlation.
- [ ] Implement after lifecycle listener leases and frame identity exist.

## Identity separation

```txt
topologyKey
  -> identifies descriptor topology and CPU mesh compatibility

contextGeneration
  -> identifies one browser WebGL context lifetime

resourceGeneration
  -> identifies one complete program/location/buffer set

frameId
  -> identifies one submitted and committed visible frame
```

Required relationship:

```txt
resourceGeneration.contextGeneration == activeContextGeneration
committedFrame.resourceGeneration == activeResourceGeneration
capture.frameId == latestCommittedRecoveredFrameId
```

## Resource registry

```txt
WebglResourceRegistry
  rendererInstanceId
  contextGeneration
  resourceGeneration
  program
  attributes
  uniforms
  buffers
  topologyKey
  meshKey
  createdAt
  validation
  status
```

The registry must be staged and unpublished until all required objects exist and a candidate frame succeeds.

## Forced rebuild rule

```txt
if topologyKey changed
  -> rebuild CPU mesh and GPU buffers

if contextGeneration changed
  -> recreate program, locations and every GPU buffer
  -> reuse CPU mesh only when its topology and source revisions remain valid

if neither changed
  -> normal resource cache hit is permitted
```

A context-generation change always overrides the topology cache hit.

## Rebuild transaction

```txt
allocate candidate resource generation
  -> compile vertex shader
  -> compile fragment shader
  -> link program
  -> resolve required attributes
  -> resolve required uniforms
  -> allocate all attribute buffers
  -> upload current mesh data
  -> validate required handles and GL errors
  -> submit candidate draw
  -> confirm context remains active
  -> atomically swap candidate registry into active ownership
  -> commit first recovered frame
  -> retire previous registry references
```

## Rollback

Any failure must:

```txt
keep context phase failed or lost
keep render and capture success fenced
never publish a partial registry
release candidate buffers and program when possible
retain CPU mesh only as detached reusable data
publish one typed restoration failure
record one bounded journal row
```

## Disposal

```txt
enter disposing
remove context listeners
fence new renders, restores and captures
retire active candidate or committed registry
delete buffers
delete program
clear CPU/GPU cache association
revoke renderer instance
enter disposed
```

Disposal is idempotent and cannot be reversed by a late restore event.

## Required observation

```txt
contextPhase
contextGeneration
resourceGeneration
activeTopologyKey
programReady
requiredAttributeCount
requiredUniformCount
bufferCount
latestLossSequence
latestRestoreSequence
latestRecoveredFrameId
lastRecoveryStatus
```

Do not expose raw WebGL handles through GameHost or editor surfaces.

## Acceptance cases

```txt
loss before first frame
loss after persistent cache hit
restore with unchanged topology
restore with changed topology
loss during staged buffer upload
loss during candidate draw
repeated loss/restore cycles
stop during lost state
dispose during restoring state
capture after recovered frame
```

## Rejection cases

```txt
resource generation from prior context
candidate registry missing required attribute
candidate registry missing required uniform
GL error during upload or draw
restore event from stale renderer
capture before recovered frame
render after dispose
```
