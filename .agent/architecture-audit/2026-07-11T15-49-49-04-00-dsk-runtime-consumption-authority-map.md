# DSK Runtime Consumption Authority Map

**Timestamp:** `2026-07-11T15-49-49-04-00`

## Summary

The repository has a DSK declaration layer and a runtime implementation layer, but no authority binds them. This audit defines the parent domain and transaction required to turn declarations into installed, consumed and retired runtime services.

## Current architecture

```txt
Layer 1: IntoTheMeadow product
Layer 2: game, host, world, experience, rendering and deployment domains
Layer 3: 43 local DSK/kit IDs plus one external kit ID
Layer 4: generated service-name strings
Layer 5: generated <service>:service labels
```

The current five-layer descriptor is documentation metadata. It does not carry executable implementation, dependency, instance, consumer or lifecycle authority.

## Current split

```txt
Declaration side
  dsk-registry.json
  src/content/dsk-registry.js
  src/dsks/index.js
  installDsks()
  state.dsk snapshot
  diagnostics counts

Implementation side
  createIntoTheMeadowGame()
  external meadow provider
  enhance-render-plan.js direct imports
  tree/wind/performance/post factories
  grass factories
  WebGL renderer
  browser and editor hosts
```

No typed binding connects the two sides.

## Required parent domain

```txt
meadow-dsk-runtime-consumption-authority-domain
```

## Existing domains to update

```txt
game-composition-dsk
  owns canonical composition and dependency admission

into-the-meadow-game-dsk
  consumes the activated service registry and records the game-root receipt

meadow-render-host-dsk
  consumes renderer, plan and post capabilities

meadow-diagnostics-dsk
  projects declaration, install, consumption, failure and retirement evidence

web-host-dsk
  owns session admission and runtime lifecycle integration

static-pages-deploy-dsk
  requires executable composition fixtures before release
```

## Planned kit map

### Canonical definitions

```txt
dsk-definition-source-kit
  canonical definition schema
  generated JSON/source views
  definition fingerprint

dsk-implementation-binding-kit
  module/export/factory binding
  source repository/ref/version
  implementation fingerprint

dsk-capability-contract-kit
  typed provided, required and optional capabilities
  version compatibility
```

### Planning and admission

```txt
dsk-dependency-graph-kit
  provider index
  dependency edges
  cycle and duplicate detection

dsk-install-plan-kit
  deterministic topological order
  staged ownership plan
  reverse retirement order

dsk-install-admission-kit
  session/revision checks
  definition and source validation
  typed accepted/rejected result
```

### Runtime ownership

```txt
dsk-instance-registry-kit
  staged and active instance IDs
  lifecycle state
  ownership and disposal handles

dsk-service-registry-kit
  capability-to-instance binding
  active registry revision
  immutable service lookup

dsk-external-provider-identity-kit
  repository, ref, export, validation and fallback identity
```

### Consumption and diagnostics

```txt
dsk-runtime-consumption-receipt-kit
  consumer ID
  capability ID
  provider/instance ID
  registry revision
  consumption revision

dsk-status-derivation-kit
  declared, bound, installed, active, consumed, degraded, failed, retired

dsk-consumer-ack-kit
  expected consumer set
  acknowledgement barrier

dsk-diagnostics-projection-kit
  immutable install graph and failure read model
```

### Lifecycle and proof

```txt
dsk-lifecycle-disposal-kit
  reverse-order stop/reset
  disposal receipts
  leak classification

dsk-registry-drift-fixture-kit
  canonical definition parity
  generated-file parity

dsk-consumption-parity-fixture-kit
  implementation, service and consumer proof
```

## Required install transaction

```txt
DskDefinitionSet D
  -> validate schema and definition fingerprint
  -> resolve implementation bindings
  -> validate source identity and exports
  -> build capability provider index
  -> build dependency graph
  -> reject missing, duplicate or cyclic requirements
  -> produce deterministic install plan
  -> instantiate every kit into staged ownership
  -> validate instances and provided services
  -> atomically publish service and instance registries
  -> emit DskInstallResult
```

## Required consumption transaction

```txt
consumer requests capability C
  -> admit session and registry revision
  -> resolve exactly one active provider
  -> return immutable service handle
  -> record DskConsumptionReceipt
  -> update derived status
  -> project diagnostics
```

## Required retirement transaction

```txt
stop/reset/session replacement
  -> freeze new service requests
  -> identify active dependency graph
  -> retire consumers
  -> dispose providers in reverse dependency order
  -> publish per-kit retirement receipts
  -> clear service registry
  -> advance registry revision
```

## Status derivation

```txt
declared
  definition exists

bound
  implementation and source identity validated

installed
  instance created and validated in staged ownership

active
  instance published in the active registry

consumed
  at least one required consumer receipt exists

degraded
  optional capability or consumer failed under declared policy

failed
  required binding, install, capability or consumer failed

retired
  instance disposed and no active handle remains
```

## Architecture invariants

```txt
one canonical definition per kit ID
one active implementation binding per active kit
one provider per non-multi capability
no dependency cycle
no active registry publication before all required instances validate
no direct consumer access to staged instances
no status derived from list membership alone
no reset completion before reverse-order retirement receipts
no diagnostics row without session and registry revision
```

## Product-specific proof set

```txt
external meadow-area provider
game root
render host
WebGL renderer v2
tree object
wind field
performance policy
post-process stack
grass density, archetype, static batch, placement, instancing, shader wind, LOD, scaling and debug
```

Player, input, interaction, objective and story definitions must remain `declared` until their implementation gates are completed.

## Promotion rule

The generic definition, dependency, install and consumption contracts may be promoted to NexusEngine or ProtoKits only after this product fixture proves deterministic install order, rollback, consumer receipts and lifecycle retirement across at least two implementation configurations.