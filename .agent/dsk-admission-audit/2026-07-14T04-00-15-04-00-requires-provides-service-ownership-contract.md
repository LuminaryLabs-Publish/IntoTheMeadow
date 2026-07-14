# DSK Admission Audit: Requires, Provides and Service Ownership Contract

## Current contract

```txt
provides: [game:<domain>]
requires: []
services: five labels embedded in architecture layers
status: active-v0.1 or planned
```

This contract is useful documentation, but it cannot resolve a runtime graph.

## Required manifest

```txt
DskCapabilityManifest {
  kitId
  kitVersion
  status
  implementationRevision
  provides[] {
    token
    apiVersion
    lifecycle
    ownerPolicy
  }
  requires[] {
    token
    versionRange
    optional
  }
  prepare
  probe
  snapshot
  reset
  dispose
}
```

## Service ownership rules

1. One concrete service token has one owner unless a named multi-provider policy exists.
2. A planned kit cannot satisfy an active requirement.
3. Deferred external providers require an explicit degraded or rejected result.
4. Versions are validated before preparation.
5. Dependency cycles are rejected before initialization.
6. Prepared candidates remain detached until every required probe passes.
7. Adoption is atomic across all participants.
8. Failed candidates are disposed and predecessors remain authoritative.
9. Capability readback is immutable and revisioned.
10. Runtime commands declare and verify their required service tokens.

## Required composition result

```txt
DskCompositionResult {
  status
  compositionRevision
  registryRevision
  providerRevision
  dependencyOrder
  serviceOwners
  preparationReceipts
  adoptionReceipts
  rejectedCapabilities
  rollbackReceipt
}
```

## Current gap classification

```txt
manifest metadata: partial
concrete service tokens: absent
dependency graph: absent
executable providers: absent
atomic adoption: absent
runtime readback: absent
visible-frame acknowledgement: absent
```

## Boundary

This contract is planned documentation. No new DSK implementation is introduced by this audit.