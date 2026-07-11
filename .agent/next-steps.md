# IntoTheMeadow Next Steps

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Updated:** `2026-07-11T17-30-56-04-00`

## Goal

Preserve the current meadow composition while making context loss, GPU-resource reconstruction, restored-frame commitment and capture freshness explicit. Do not add recovery as an isolated renderer flag; integrate it with lifecycle, topology, committed-frame and diagnostics ownership.

## Plan ledger

- [ ] Preserve current render-plan and visual composition.
- [ ] Complete Runtime Session Lifecycle Authority first.
- [ ] Complete Host Capability Gateway and raw runtime quarantine.
- [ ] Complete workspace path containment and typed filesystem results.
- [ ] Complete runtime-step admission and monotonic clock policy.
- [ ] Complete source-provider identity and admission.
- [ ] Complete render-topology identity and transactional rebuild ownership.
- [ ] Add renderer instance identity and canvas ownership.
- [ ] Register leased `webglcontextlost` and `webglcontextrestored` listeners.
- [ ] Add context phase and strictly increasing context generation.
- [ ] Add a complete GPU resource registry and resource generation.
- [ ] Fence render submission and capture during lost/restoring/failed phases.
- [ ] Invalidate current committed-frame eligibility on loss.
- [ ] Recreate program, locations and buffers after every restoration.
- [ ] Force GPU buffer upload even when topology is unchanged.
- [ ] Stage and validate rebuilt resources before publication.
- [ ] Submit and commit a first recovered frame.
- [ ] Correlate renderer, HUD, GameHost and capture with frame/context/resource generations.
- [ ] Add typed loss, restore, failure and stale-event results.
- [ ] Add bounded recovery observations and diagnostics.
- [ ] Add DOM-free state and resource-generation fixtures.
- [ ] Add real-browser `WEBGL_lose_context` coverage.
- [ ] Add capture-freshness and repeated-recovery fixtures.
- [ ] Wire recovery fixtures into `npm run check` or an explicit browser gate.
- [ ] Continue with committed-frame, interaction/objective and DSK-consumption gates.

## Existing owners to update first

```txt
meadow-webgl-renderer-v2-kit
meadow-render-host-dsk
web-host-dsk
meadow-diagnostics-dsk
browser editor renderer.capture adapter
runtime session lifecycle authority
render topology identity authority
committed frame observation authority
browser observation and deployment fixtures
```

## Candidate coordinating kits

```txt
1. webgl-context-state-kit
2. webgl-context-generation-kit
3. webgl-context-event-adapter-kit
4. webgl-render-admission-kit
5. webgl-resource-registry-kit
6. webgl-resource-generation-kit
7. webgl-resource-rebuild-plan-kit
8. webgl-context-loss-result-kit
9. webgl-context-restore-transaction-kit
10. webgl-recovered-frame-ack-kit
11. webgl-capture-freshness-kit
12. webgl-context-observation-kit
13. webgl-context-recovery-journal-kit
14. webgl-context-recovery-fixture-kit
```

## Required context record

```txt
WebglContextState
  runtimeSessionId
  rendererInstanceId
  canvasId
  phase
  contextGeneration
  resourceGeneration
  lossSequence
  restoreSequence
  latestCommittedFrameId
  latestRecoveredFrameId
  lastResult
```

## Required resource record

```txt
WebglResourceRegistry
  rendererInstanceId
  contextGeneration
  resourceGeneration
  topologyKey
  meshKey
  programReady
  requiredAttributes
  requiredUniforms
  bufferCount
  validation
  status
```

Raw WebGL handles must remain private to the renderer.

## Required loss result

```txt
WebglContextLossResult
  rendererInstanceId
  previousContextGeneration
  invalidatedResourceGeneration
  invalidatedFrameId
  lossSequence
  status
  reason
```

## Required restore result

```txt
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

## Acceptance cases

```txt
loss before first frame
loss after first frame
loss after repeated topology cache hits
restore with unchanged topology
restore with changed topology
loss during staged rebuild
loss during candidate draw
capture during lost state rejected
capture before recovered frame rejected
capture after recovered frame correlated
three repeated recovery cycles without leaks
stop/dispose during lost or restoring state
```

## Rejection cases

```txt
stale renderer or session event
duplicate event sequence
restore without accepted loss
program from prior context generation
buffer from prior context generation
partial staged registry
GL error during upload or draw
capture with stale frame/context generation
render after dispose
late restore after disposal
```

Every rejected transition must assert:

```txt
no partial active resource registry
no false renderer readiness
no successful capture receipt
one typed result
one bounded journal row
```

## Ordered architecture queue

```txt
1. Runtime Session Lifecycle Authority
2. Host Capability Gateway and Raw Runtime Quarantine
3. Headless Workspace Path Authority and Filesystem Containment
4. Runtime Step Admission and Clock Integrity
5. Source Provider Authority
6. Render Topology Identity Authority
6a. WebGL Context Recovery Authority
7. Committed Frame Observation Authority
8. Interaction Command and Objective Authority
9. DSK Runtime Consumption Authority
```

## Deferred until after this gate

```txt
renderer hot replacement
multi-canvas renderer negotiation
new post-process render targets
new visual feature families
promotion of generic recovery contracts into NexusEngine
```

Do not mark the renderer recovered because the browser emitted `webglcontextrestored`. Recovery requires a complete new-generation resource registry and a committed visible frame.
