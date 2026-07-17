# Next Steps

**Updated:** `2026-07-17T19-38-37-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `dsk-dependency-closure-activation-truth-authority-audited`

## Summary

Replace declaration-only composition with one deterministic dependency and activation path that publishes only admitted executable capabilities.

## Intent

Prevent planned descriptors, unresolved dependencies or deferred providers from being mistaken for active runtime capability.

## Checklist

### Descriptor schema

- [ ] Add explicit descriptor version, implementation ID and implementation revision.
- [ ] Replace generic capability tokens with stable `provides[]` contracts.
- [ ] Populate real `requires[]` edges for active DSKs and kits.
- [ ] Preserve `planned` as declaration metadata, never availability.

### Dependency closure

- [ ] Build the dependency graph before side effects begin.
- [ ] Detect missing providers, cycles and incompatible revisions.
- [ ] Resolve the external meadow provider under an explicit version policy.
- [ ] Produce deterministic topological activation order.
- [ ] Publish `DependencyClosureResult`.

### Activation settlement

- [ ] Bind activation to one runtime and provider generation.
- [ ] Verify implementation bindings before activation.
- [ ] Settle each capability exactly once.
- [ ] Propagate failed dependencies without silently exposing dependents.
- [ ] Reject stale results from retired generations.
- [ ] Publish `DskActivationResult`.

### Capability truth

- [ ] Publish `RuntimeCapabilityManifest` containing admitted executable capabilities only.
- [ ] Publish planned declarations in a separate inventory.
- [ ] Derive `GameHost` and editor capability lists from the runtime manifest.
- [ ] Bind render evidence to the accepted activation generation.
- [ ] Publish `FirstActivationBoundFrameAck`.

### Evidence

- [ ] Add missing-provider, deferred-provider and planned-only fixtures.
- [ ] Add cycle, version-mismatch and deterministic-order fixtures.
- [ ] Add partial-failure and stale-generation fixtures.
- [ ] Add browser host/editor capability-manifest parity fixtures.
- [ ] Compare source, artifact and Pages activation digests.

## Required result

```txt
DskActivationResult {
  activationId
  runtimeGeneration
  providerRevision
  manifestRevision
  orderedCapabilityIds[]
  admittedCapabilityIds[]
  excludedDeclarationIds[]
  degradedCapabilityIds[]
  failedCapabilityIds[]
  status
}
```

## Preserved dependencies

Persistence, capture correlation, adaptive quality, diagnostics, content integrity, release/cache coherence, accessibility, audio, shaders, editor settlement, startup readiness, reset/replay, viewport ownership, WebGL recovery, frame scheduling, progression and grass visibility remain separate bounded work.