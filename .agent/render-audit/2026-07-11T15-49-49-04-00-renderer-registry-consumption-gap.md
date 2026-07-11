# Renderer Registry Consumption Gap

**Timestamp:** `2026-07-11T15-49-49-04-00`

## Summary

The browser has a concrete WebGL renderer v2, render-plan enhancer, grass stack, tree, wind, performance and post-process implementations. None of those consumers resolve services through the DSK registry, and the required renderer kit's generated descriptor does not describe the renderer implementation.

## Current render flow

```txt
source meadow plan
  -> enhanceRenderPlan()
  -> direct tree-object-dsk factory
  -> direct wind-field-dsk factory
  -> direct performance factory
  -> direct post-process factory
  -> direct nine-kit grass composition
  -> meadow-render-plan/v2
  -> CPU mesh builder
  -> WebGL renderer v2
  -> canvas
```

## Registry flow

```txt
meadow-webgl-renderer-v2-kit ID
  -> createDskDescriptor(id)
  -> no service-map entry
  -> fallback services:
       model
       state
       events
       validation
       snapshot
  -> descriptor validates
```

The renderer descriptor therefore passes while failing to name the actual render capabilities used by the host.

## Missing render capabilities

The canonical renderer binding should identify at least:

```txt
WebGL context ownership
shader program compilation
mesh buffer cache
render-plan v2 admission
camera and viewport state
main scene pass
outline/cel-fog behavior
resource resize
frame submission result
renderer snapshot
resource disposal
```

## Missing consumer receipts

Expected consumers include:

```txt
web host -> renderer capability
render host -> render-plan ingest and frame submission
plan enhancer -> tree, wind, performance, post and grass services
renderer -> mesh builder and post-process capabilities
diagnostics -> renderer snapshot and resource status
committed-frame authority -> render submission acknowledgement
```

No immutable receipt currently proves which provider instance, registry revision or service version each consumer used.

## Consequences

```txt
renderer code can change without descriptor drift detection
descriptor services can change without consumer compatibility checks
multiple consumers can import different implementations silently
render status cannot distinguish declared from consumed
reset/stop cannot retire render dependencies from a registry plan
committed frames cannot cite the service graph that produced them
```

## Required render consumption result

```txt
RenderServiceConsumptionReceipt
  sessionId
  registryRevision
  consumerId
  capabilityId
  providerKitId
  providerInstanceId
  implementationFingerprint
  renderPlanContractVersion
  consumedAtRevision
```

## Required frame correlation

```txt
CommittedFrameReceipt
  -> registryRevision
  -> rendererInstanceId
  -> renderPlanRevision
  -> topologyKey
  -> meshCacheRevision
  -> postProcessInstanceId
  -> required render consumer receipts
```

## Required fixture

```txt
bind actual renderer implementation
assert canonical renderer capability list
resolve renderer through service registry
render one deterministic plan
record host and frame consumer receipts
compare descriptor, binding, instance and diagnostics
reset and assert renderer plus dependencies retire in reverse order
```

## Release rule

Do not report the renderer DSK as active or consumed until the browser host obtains it through the active service registry and a committed frame cites the same renderer instance and registry revision.