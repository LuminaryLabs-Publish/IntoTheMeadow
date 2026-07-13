# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Updated:** `2026-07-12T21-40-09-04-00`

## Summary

Implement WebGL context ownership before treating renderer snapshots as visible-frame proof. The canvas must own loss/restoration events, the renderer must version every context-bound resource, and the host must suspend and resume drawing through typed results rather than generic fatal or silent no-op behavior.

## Plan ledger

**Goal:** prove one recoverable renderer lifecycle from initial context admission through loss, resource rebuild and the first visible frame of the successor context generation.

### Context identity and event ownership

- [ ] Add renderer ID, canvas ID, context ID and context generation.
- [ ] Register owned `webglcontextlost` and `webglcontextrestored` listeners.
- [ ] Define when `preventDefault()` is allowed and required.
- [ ] Bind events to the active runtime session and renderer generation.
- [ ] Remove listeners during renderer/runtime retirement.
- [ ] Reject events from retired canvases or predecessor generations.

### Draw suspension

- [ ] Add explicit `Ready`, `Lost`, `Restoring`, `Recovered`, `Terminal` renderer phases.
- [ ] Stop draw admission immediately after accepted loss.
- [ ] Stop publishing successful renderer snapshots while lost.
- [ ] Coordinate suspension with the existing frame-scheduler authority.
- [ ] Preserve a bounded last-good CPU mesh and render-plan reference.
- [ ] Publish a typed `ContextLostResult`.

### Resource manifest and rebuild

- [ ] Define one manifest for program, shader artifacts, attributes, uniforms and five buffers.
- [ ] Assign every context-bound handle a resource generation and lease.
- [ ] Build restoration resources as a detached candidate.
- [ ] Recompile/link shaders and validate locations.
- [ ] Recreate all buffers from preserved CPU mesh data.
- [ ] Restore viewport and baseline GL state.
- [ ] Validate the full candidate before installation.
- [ ] Retire partial candidate resources on failure.
- [ ] Retire predecessor resources exactly once after successful installation.

### Recovery and terminal results

- [ ] Publish `ContextRecoveryResult` with predecessor/successor generations.
- [ ] Keep rendering suspended when candidate rebuild fails.
- [ ] Define bounded retry or explicit `ReloadRequired`.
- [ ] Reject stale RAF callbacks and stale resource handles.
- [ ] Resume through the existing scheduler owner, not a second RAF chain.
- [ ] Acknowledge the first visible recovered frame.

### Diagnostics and public readback

- [ ] Add context phase and generation to renderer snapshots.
- [ ] Add lost/restored/rebuild counters and last typed result.
- [ ] Add resource-manifest fingerprint and current GPU generation.
- [ ] Add a bounded context lifecycle journal.
- [ ] Prevent `GameHost` readback from reporting completed visible rendering while lost.

### Proof

- [ ] Add a synthetic `WEBGL_lose_context` loss/restore fixture where available.
- [ ] Add loss-before-first-frame and loss-between-passes fixtures.
- [ ] Add loss-during-topology-rebuild and partial-resource rollback fixtures.
- [ ] Add repeated loss/restoration generation fixtures.
- [ ] Add unrecoverable/ReloadRequired fixture.
- [ ] Add stale callback and stale resource zero-mutation fixtures.
- [ ] Add first visible restored-frame correlation fixture.
- [ ] Run source, built-output and GitHub Pages browser observations.

## Required event envelope

```txt
WebGLContextEventEnvelope {
  eventId
  runtimeSessionId
  rendererId
  canvasId
  contextId
  expectedContextGeneration
  eventType
  observedAt
  schedulerGeneration
  expectedRenderRevision
}
```

## Required result

```txt
ContextRecoveryResult {
  commandId
  status
  reason
  rendererId
  predecessorContextGeneration
  successorContextGeneration
  predecessorResourceGeneration
  successorResourceGeneration
  resourceManifestFingerprint
  rebuiltProgram
  rebuiltBufferCount
  rollbackCompleted
  schedulerResumeResult
  renderSnapshotId
  firstVisibleFrameAckId
}
```

## Architecture order

```txt
1. Renderer/canvas/context identity
2. Owned loss/restoration listeners
3. Draw suspension and snapshot truthfulness
4. Resource manifest and generation leases
5. Detached program/buffer rebuild
6. Candidate validation, atomic install and rollback
7. Scheduler-coordinated resume
8. Context diagnostics and bounded journal
9. First visible recovered-frame acknowledgement
10. Source/build/Pages fixtures
```

## Preserved dependencies

The frame-scheduler authority remains upstream for callback ownership and resume. Grass visibility, exploration progression, editor-bridge lifecycle, audio, save, replay and WebGL recovery remain separate domains and must not silently absorb one another.
