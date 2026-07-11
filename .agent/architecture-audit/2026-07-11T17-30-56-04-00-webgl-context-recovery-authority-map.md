# WebGL Context Recovery Authority Map

**Timestamp:** `2026-07-11T17-30-56-04-00`

## Summary

`meadow-webgl-renderer-v2-kit` creates context-bound GPU resources once and has no context-generation model. This audit defines a composed authority that fences rendering during loss, rebuilds resources against the restored context and publishes success only after a new-generation frame commits.

## Plan ledger

**Goal:** assign context events, GPU-resource ownership, rebuild admission, frame commitment, diagnostics and capture freshness to explicit DSK and kit boundaries.

- [x] Trace existing context acquisition and shader compilation.
- [x] Trace topology and mesh cache ownership.
- [x] Trace GPU buffer creation and disposal.
- [x] Trace frame scheduling and fatal handling.
- [x] Trace renderer snapshots and editor capture.
- [x] Identify missing context state, generation and recovery results.
- [x] Define parent-domain composition.
- [x] Define existing owners to update before adding reusable packages.
- [ ] Implement after lifecycle and render-topology ownership are available.

## Existing ownership map

```txt
web-host-dsk
  -> creates renderer
  -> calls renderer.render() each RAF
  -> stores lastRender
  -> publishes HUD and GameHost observations

meadow-webgl-renderer-v2-kit
  -> acquires WebGL context
  -> creates program
  -> resolves attribute/uniform locations
  -> builds CPU mesh through meadow mesh builder
  -> creates and replaces GPU buffers
  -> submits draw calls
  -> stores renderer snapshot
  -> deletes buffers and program on explicit dispose

browser editor adapter
  -> calls canvas.toDataURL()
  -> attaches latest renderer snapshot

current missing owner
  -> context loss
  -> context restoration
  -> context generation
  -> resource-generation invalidation
  -> recovered-frame commitment
```

## Required parent domain

```txt
meadow-webgl-context-recovery-authority-domain
```

## DSK composition

```txt
meadow-webgl-context-recovery-authority-domain
  -> webgl-context-state-kit
  -> webgl-context-generation-kit
  -> webgl-context-event-adapter-kit
  -> webgl-render-admission-kit
  -> webgl-resource-registry-kit
  -> webgl-resource-generation-kit
  -> webgl-resource-rebuild-plan-kit
  -> webgl-context-loss-result-kit
  -> webgl-context-restore-transaction-kit
  -> webgl-recovered-frame-ack-kit
  -> webgl-capture-freshness-kit
  -> webgl-context-observation-kit
  -> webgl-context-recovery-journal-kit
  -> webgl-context-recovery-fixture-kit
```

## Existing owners to update first

```txt
meadow-webgl-renderer-v2-kit
  own WebGL object creation, readback and deletion

meadow-render-host-dsk
  own render admission and recovered-frame publication

web-host-dsk
  own RAF suspension/resumption and visible failure projection

meadow-diagnostics-dsk
  own detached context/recovery observations

committed-frame observation authority
  correlate context generation, resource generation and visible frame

runtime session lifecycle authority
  own listener leases and ordered disposal

browser editor adapter
  reject capture without an active recovered frame
```

## Context state model

```txt
uninitialized
ready
lost
restoring
recovered
failed
disposing
disposed
```

Required identity:

```txt
runtimeSessionId
rendererInstanceId
contextGeneration
resourceGeneration
lossSequence
restoreSequence
activeTopologyKey
candidateFrameId
committedFrameId
```

## Loss transaction

```txt
receive webglcontextlost event
  -> verify renderer/session ownership
  -> call preventDefault()
  -> increment loss sequence
  -> transition ready/recovered -> lost
  -> reject new render and capture success
  -> revoke active GPU-resource generation
  -> preserve canonical CPU plan/mesh only if still valid
  -> invalidate committed-frame eligibility
  -> publish WebglContextLossResult
  -> journal one bounded observation
```

## Restore transaction

```txt
receive webglcontextrestored event
  -> verify renderer/session ownership
  -> allocate next context generation
  -> enter restoring
  -> recreate shader program
  -> re-resolve attributes and uniforms
  -> create a staged resource registry
  -> force buffer rebuild even when topology key is unchanged
  -> validate all required objects and locations
  -> submit candidate frame
  -> inspect context-loss state and GL errors
  -> atomically commit resource generation and frame
  -> retire prior staged references
  -> publish WebglContextRestoreResult
  -> enter recovered
```

## Required results

```txt
WebglContextLossResult
  rendererInstanceId
  previousContextGeneration
  lossSequence
  previousCommittedFrameId
  invalidatedResourceGeneration
  status
  reason

WebglContextRestoreResult
  rendererInstanceId
  contextGeneration
  resourceGeneration
  topologyKey
  rebuiltProgram
  rebuiltBufferCount
  candidateFrameId
  committedFrameId
  status
  failures
```

## Invariants

```txt
render success requires context phase ready or recovered
resource generation belongs to exactly one context generation
same topology does not bypass GPU reconstruction after restoration
committed frame cites the active context and resource generations
capture success cites the latest committed recovered frame
loss and restoration events from stale sessions cannot mutate current state
failed restoration cannot expose partially rebuilt resources
disposal removes listeners and revokes all handles exactly once
```

## Promotion boundary

Keep browser- and meadow-specific adapters in `IntoTheMeadow`. A generic context-generation, resource-registry or recovery-transaction contract may move to NexusEngine only after this product fixture proves repeated loss/restore cycles, rollback and capture correlation.
