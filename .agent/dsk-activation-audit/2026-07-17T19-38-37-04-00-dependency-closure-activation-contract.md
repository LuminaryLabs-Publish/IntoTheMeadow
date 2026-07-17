# DSK Activation Audit: Dependency Closure Contract

**Timestamp:** `2026-07-17T19-38-37-04-00`

## Contract

```txt
manifest revision
  + implementation revision
  + provider revision
  + runtime generation
  -> dependency closure
  -> accepted activation order
  -> per-capability settlement
  -> runtime capability manifest
  -> matching visible frame acknowledgement
```

## Descriptor requirements

Each executable descriptor must declare:

```txt
id
version
status
provides[]
requires[]
implementationId
implementationRevision
providerConstraints[]
activationPhase
failurePolicy
snapshot()
validate()
```

## Activation invariants

1. Planned descriptors never satisfy executable dependencies.
2. Every required capability resolves to exactly one admitted provider unless the requirement explicitly permits a set.
3. Cycles fail before side effects begin.
4. Activation follows a deterministic topological order.
5. Partial activation publishes explicit degraded or failed results.
6. Retired runtime generations cannot commit late activation results.
7. Host/editor capability lists derive from the accepted runtime manifest, not the declaration registry.
8. Render evidence binds the activation generation that produced it.

## Required fixtures

```txt
missing required capability
planned-only provider
external provider deferred
version mismatch
cycle detection
deterministic order
partial activation rollback
stale generation rejection
host/editor capability projection
first activation-bound frame
```

## Boundary

This file defines proposed invariants. No implementation or fixture was added.