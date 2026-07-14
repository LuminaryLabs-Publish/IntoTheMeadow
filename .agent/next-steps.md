# Next Steps

**Updated:** `2026-07-14T04-00-15-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`  
**Status:** `dsk-capability-dependency-admission-authority-audited`

## Summary

Move from descriptor inventory to executable capability composition. Keep manifests and diagnostics, but require every active kit to declare concrete service tokens, dependencies, ownership, lifecycle and proof.

## Plan ledger

**Goal:** create the smallest reliable path from the checked-in DSK catalog to one immutable, executable and observable capability graph.

### Manifest truth

- [ ] Add a versioned `DskCapabilityManifest` for every local and external kit.
- [ ] Distinguish `active`, `planned`, `experimental`, `deferred` and `unavailable` as admission states.
- [ ] Expand the five service labels into concrete `provides` tokens.
- [ ] Add explicit `requires`, optional dependencies and version ranges.
- [ ] Identify the source module or adapter implementing each provided service.

### Graph admission

- [ ] Validate unique service ownership unless an explicit multi-provider policy exists.
- [ ] Reject duplicate tokens, missing requirements and incompatible versions.
- [ ] Detect dependency cycles before initialization.
- [ ] Topologically order preparation and adoption.
- [ ] Prevent planned descriptors from satisfying active runtime requirements.
- [ ] Treat a deferred required external provider as an admission failure or explicit degraded mode.

### Executable services

- [ ] Give each active kit a `prepare`, `install`, `snapshot`, `reset` and `dispose` contract where relevant.
- [ ] Return immutable service handles rather than descriptor labels.
- [ ] Probe every required service before publishing readiness.
- [ ] Record per-kit preparation and adoption receipts.
- [ ] Roll back all prepared candidates if any participant fails.

### Game and render correlation

- [ ] Bind `GameState.dsk` to one accepted `DskCompositionRevision`.
- [ ] Expose a capability manifest through `GameHost` and the editor bridge.
- [ ] Include capability revision and degraded-state flags in diagnostics.
- [ ] Reject gameplay commands whose required capability is unavailable.
- [ ] Publish `FirstCapabilityRevisionFrameAck` after the renderer displays the accepted revision.

### Fixtures

- [ ] Add missing-requirement and duplicate-provider fixtures.
- [ ] Add dependency-cycle and incompatible-version fixtures.
- [ ] Add planned-kit-cannot-satisfy-active-requirement fixture.
- [ ] Add external-provider deferred/failure fixtures.
- [ ] Add preparation failure and rollback fixtures.
- [ ] Add capability readback and first-visible-frame fixtures.
- [ ] Run the same proof against source, built output and GitHub Pages.

## Required result

```txt
DskCompositionResult {
  commandId
  compositionRevision
  registryRevision
  providerRevision
  status
  reason
  activeKitIds
  plannedKitIds
  serviceOwners
  dependencyOrder
  preparationReceipts
  adoptionReceipts
  rejectedCapabilities
  warnings
  errors
}
```

## Dependency order

```txt
versioned manifests
  -> concrete provides/requires tokens
  -> ownership and compatibility validation
  -> acyclic graph resolution
  -> executable service preparation
  -> atomic adoption or rollback
  -> immutable capability readback
  -> gameplay admission
  -> visible-frame acknowledgement
```

## Preserved dependencies

Browser observation, render cache coherence, viewport authority, editor capability admission, host retirement, workspace containment, provider parity, WebGL recovery, frame scheduling, playable progression, grass visibility, audio lifecycle, save/migration and replay remain separate bounded work.