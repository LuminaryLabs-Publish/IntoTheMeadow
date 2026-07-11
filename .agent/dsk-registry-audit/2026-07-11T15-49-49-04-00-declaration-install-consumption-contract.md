# Declaration, Install and Consumption Contract

**Timestamp:** `2026-07-11T15-49-49-04-00`

## Summary

This audit defines the semantic difference between a DSK being declared, implemented, installed, active, consumed and retired. The current repository collapses those concepts into generated descriptor status and aggregate validation counts.

## Current declaration contract

```txt
id
domain
label
status from required-v0.1 membership
five layer rows
five or more service-name strings
one generic provides token
empty requires list
snapshot()
shape validate()
```

## Current install contract

```txt
installDsks()
  -> validate local descriptor shapes
  -> mark external entry loaded/deferred
  -> return local descriptors
  -> return counts and aggregate failures
```

This is an inventory snapshot, not a runtime install transaction.

## Required semantic states

### Declared

A canonical definition exists and passes schema validation.

### Bound

The definition resolves one implementation source, module/export and fingerprint.

### Install-planned

All required capabilities resolve and the dependency graph yields a deterministic order.

### Installed

The implementation instance was created and validated in staged ownership.

### Active

The staged instance was atomically published in the active instance and service registries.

### Consumed

An expected runtime consumer resolved and acknowledged at least one declared service.

### Degraded

A declared optional dependency or consumer failed under an explicit policy while required service remains valid.

### Failed

A required binding, dependency, installation, service or consumer condition failed.

### Retired

The instance was disposed, handles were revoked and no active registry entry remains.

## Required canonical definition

```txt
DskDefinition
  id
  domain
  version
  lifecyclePhase
  sourceIdentity
  implementationBinding
  providedCapabilities
  requiredCapabilities
  optionalCapabilities
  configurationSchema
  validationContract
  ownershipPolicy
  disposalPolicy
```

## Required source identity

```txt
repository
ref or commit
package path
module path
export name
version
implementation fingerprint
```

## Required dependency behavior

```txt
build provider index
reject duplicate single-provider capability
resolve required capability versions
record optional unresolved capabilities
reject dependency cycles
produce deterministic install order
produce reverse deterministic disposal order
```

## Required install behavior

```txt
create install ID and target registry revision
stage instances without exposing them to consumers
validate each instance and capability implementation
rollback all staged instances on required failure
publish instance and service registries atomically
emit immutable DskInstallResult
```

## Required consumption behavior

```txt
consumer identifies itself and requested capability
registry admits session and revision
registry resolves one active provider
registry returns an immutable/revocable handle
registry records DskConsumptionReceipt
status derivation evaluates expected consumer coverage
```

## Required diagnostics row

```txt
kitId
definitionVersion
definitionFingerprint
sourceIdentity
implementationFingerprint
installId
instanceId
providedCapabilities
requiredCapabilities
resolvedProviders
status
consumerCount
consumerReceipts
failureResults
retirementReceipt
registryRevision
```

## Current concrete mismatches

```txt
meadow-webgl-renderer-v2-kit
  implemented: yes
  required-v0.1: yes
  descriptor service-map row: no
  descriptor output: generic fallback
  runtime registry lookup: no

meadow-player-dsk
  declared: yes
  runtime implementation consumed: no
  descriptor validation: passes

wind-field-dsk
  runtime implementation consumed directly: yes
  required-v0.1 status: no
  generated status: planned
  registry consumption receipt: no
```

## Required migration sequence

```txt
1. Freeze new manual registry entries.
2. Define canonical DSK definition schema.
3. Generate current JSON and source lists from definitions.
4. Add bindings for source-backed implementations.
5. Mark inert declarations declared-only.
6. Add real capability contracts and dependency edges.
7. Stage and atomically publish instances/services.
8. Route product consumers through the service registry where appropriate.
9. Add consumption and diagnostics receipts.
10. Add reverse-order lifecycle retirement.
11. Remove duplicated manual lists after parity fixtures pass.
```

## Invariants

```txt
no active status without a validated instance
no consumed status without a consumer receipt
no required capability without exactly one provider
no direct runtime import hidden from composition diagnostics
no registry revision change without an install result
no reset completion without retirement receipts
no generated file drift from canonical definitions
```

## Boundary with direct imports

Direct ES module imports may remain as implementation loading mechanics. They must be represented by an implementation binding and activated through the composition authority. The problem is not the import syntax; it is the absence of a canonical binding, dependency result, active registry and consumer evidence.

## Completion rule

The registry becomes authoritative only when its state can reconstruct which implementation instances powered a specific game state and committed render frame, and when stop/reset can prove those instances were retired.